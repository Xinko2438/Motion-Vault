// Private browser state is an overlay, never a field on production catalogue records.
// The two legacy keys remain authoritative; consolidation does not migrate or erase them.
function createVaultReview(formalItems,candidateItems,onMessage){
 const formalKey='motion_vault_curation_v1',candidateKey='motion-vault-curated-originals-30-v1';
 const candidateIDs=new Set(candidateItems.map(i=>String(i.id))),known=new Set([...formalItems,...candidateItems].map(i=>String(i.id)));
 const drafts=new Map();let formal={schemaVersion:'motion-vault.manual-curation.v1',events:[]},candidates={hidden:[],notes:{},events:[]};
 let queue=Promise.resolve();
 const isCandidate=id=>candidateIDs.has(String(id));
 function parseFormal(raw){if(!raw)return{schemaVersion:'motion-vault.manual-curation.v1',events:[]};const v=JSON.parse(raw);if(v?.schemaVersion!=='motion-vault.manual-curation.v1'||!Array.isArray(v.events)||v.events.some(e=>!e||!e.item||!['string','number'].includes(typeof e.item.id)||!['hide','restore','note'].includes(e.action)))throw new Error('已有审查记录格式异常');return v;}
 function parseCandidate(raw){if(!raw)return{hidden:[],notes:{},events:[]};const v=JSON.parse(raw);if(!Array.isArray(v.hidden)||!v.notes||typeof v.notes!=='object'||Array.isArray(v.notes)||!Array.isArray(v.events)||v.events.some(e=>!e||typeof e.id!=='string'||!['hide','restore','note'].includes(e.action)))throw new Error('新增审查记录格式异常');return v;}
 function reload(){for(const [key,parse,set]of [[formalKey,parseFormal,v=>formal=v],[candidateKey,parseCandidate,v=>candidates=v]]){try{set(parse(localStorage.getItem(key)));}catch(e){onMessage('审查记录未读取：'+e.message+'。原记录未覆盖。');}}}
 function hidden(id){id=String(id);if(isCandidate(id))return candidates.hidden.includes(id);let value=false;for(const e of formal.events)if(String(e.item.id)===id){if(e.action==='hide')value=true;else if(e.action==='restore')value=false;}return value;}
 function note(id){id=String(id);if(drafts.has(id))return drafts.get(id);if(isCandidate(id))return typeof candidates.notes[id]==='string'?candidates.notes[id]:'';let value='';for(const e of formal.events)if(e.action==='note'&&String(e.item.id)===id&&typeof e.note==='string')value=e.note;return value;}
 async function change(item,action,value){
  const id=String(item.id);if(!known.has(id)&&!id.startsWith('hub-'))throw new Error('Unknown reference');
  const candidate=isCandidate(id),key=candidate?candidateKey:formalKey;
  const apply=()=>{
   const now=candidate?parseCandidate(localStorage.getItem(key)):parseFormal(localStorage.getItem(key));
   let next;if(candidate){next={...now,hidden:[...now.hidden],notes:{...now.notes},events:[...now.events]};if(action==='hide')next.hidden=[...new Set([...next.hidden,id])];else if(action==='restore')next.hidden=next.hidden.filter(x=>x!==id);else if(action==='note')next.notes[id]=value;
    const event={id,action,at:new Date().toISOString()},last=next.events.at(-1);if(action==='note'&&last?.action==='note'&&last.id===id)next.events[next.events.length-1]=event;else next.events.push(event);
   }else{const event={id:crypto.randomUUID(),at:new Date().toISOString(),action,source:'gallery_ui',item:{id,title:item.title||'',desc:item.desc||'',tech:item.tech||'',source:item.source_name||item.source_kind||'本地设计参考'},...(action==='note'?{note:value}:{})};next={...now,events:[...now.events,event]};}
   localStorage.setItem(key,JSON.stringify(next));if(candidate)candidates=next;else formal=next;
   if(action==='note'&&drafts.get(id)===value)drafts.delete(id);return true;
  };
  try{return navigator.locks?.request?await navigator.locks.request('motion-vault-private:'+key,apply):apply();}
  catch(e){onMessage('未保存：'+e.message+'。原状态未改变'+(action==='note'?'，备注草稿仍可导出。':'。'));return false;}
 }
 function serialize(task){const next=queue.then(task,task);queue=next.catch(()=>{});return next;}
 const setHidden=(it,value)=>serialize(()=>change(it,value?'hide':'restore'));
 const saveNote=(it,text)=>{const value=String(text).slice(0,3000);drafts.set(String(it.id),value);return serialize(()=>change(it,'note',value));};
 function exportCandidates(){return{schema:'motion-vault.original-review.v1',batch:'curated-originals-30',audience:'private_curator',exported_at:new Date().toISOString(),items:candidateItems.map(i=>({id:i.id,title:i.title,source:i.source_url,hidden:hidden(i.id),note:note(i.id),unsaved_draft:drafts.has(String(i.id)),production_selection:null})),events:candidates.events};}
 function exportAll(){return{schema:'motion-vault.private-review.v1',audience:'private_curator',exported_at:new Date().toISOString(),formal:{schemaVersion:formal.schemaVersion,items:formalItems.map(i=>({id:String(i.id),title:i.title,hidden:hidden(i.id),note:note(i.id),unsaved_draft:drafts.has(String(i.id))})),events:formal.events},candidates:exportCandidates()};}
 reload();return{keys:[formalKey,candidateKey],reload,hidden,note,setHidden,saveNote,exportAll,exportCandidates,hasDrafts:()=>drafts.size>0,flush:()=>queue};
}
