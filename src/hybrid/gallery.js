const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TAX=Object.fromEntries(CATALOG.taxonomy.map(s=>[s.id,s]));
const SHORT={brand:'品牌发布',product:'产品展示',portfolio:'作品案例',editorial:'阅读叙事',workspace:'应用工具',journey:'流程反馈'};
const BOOKMARK_KEY='motion_vault_bookmarks',CURATION_KEY='motion_vault_curation_v1',REVIEW_KEY='motion-vault-curated-originals-30-v1';
const candidateItems=CANDIDATES.items,candidateIds=new Set(candidateItems.map(i=>String(i.id)));
const baseItems=[...CATALOG.items,...candidateItems];
const isCandidate=it=>candidateIds.has(String(it.id));
const emptyCuration=()=>({schemaVersion:'motion-vault.manual-curation.v1',events:[]});
const emptyReview=()=>({hidden:[],notes:{},events:[],accepted:[]});
let saved=new Set(),curation=emptyCuration(),review=emptyReview(),curationError='';
let items=[...baseItems],scene='all',task='all',query='',savedOnly=false,view='library';
let active=null,detail=null,opener=null,epoch=0,pending=0,docEpoch=0,lastPoint=null,gridDirty=false;
const PREVIEW_MODE_KEY='motion_vault_preview_mode';
let previewMode='preview',detailMode='preview';
try{if(localStorage.getItem(PREVIEW_MODE_KEY)==='interactive')previewMode='interactive';}catch{}
const hasImplementation=it=>!!it.asset?.run;
function previewHint(it){return hasImplementation(it)&&previewMode==='interactive'?'实时交互':it.asset?.video?'视频预览':({auto:'悬停播放',pointer:'移动鼠标接管',drag:'按住拖拽接管',click:'悬停自动演示',scroll:'悬停自动演示'}[it.preview_mode]||'本地预览');}
function updatePreviewMode(){
 document.body.dataset.previewMode=previewMode;
 for(const b of $('previewModes').querySelectorAll('[data-preview-mode]'))b.setAttribute('aria-pressed',String(b.dataset.previewMode===previewMode));
 for(const card of $('grid').querySelectorAll('.card')){const it=items.find(i=>String(i.id)===card.dataset.id);if(!it)continue;const badge=card.querySelector('.preview-badge'),stage=card.querySelector('.stage');if(badge)badge.textContent=previewHint(it);stage?.setAttribute('aria-label',it.title+'，'+(hasImplementation(it)&&previewMode==='interactive'?'悬停运行真实网页，可移动鼠标、点击或拖拽':'悬停预览，详情可查看实现'));}
}
function setPreviewMode(mode){
 if(!['preview','interactive'].includes(mode)||mode===previewMode)return;
 stop();previewMode=mode;updatePreviewMode();
 if(mode==='interactive')previewMedia.suspend();else resumePreviewMedia();
 try{localStorage.setItem(PREVIEW_MODE_KEY,mode);}catch{notice('当前模式已切换，但未能保存偏好。');}
}
const noteDrafts=new Map(),moduleCache=new Map(),documentCache=new Map();
const notice=t=>{$('notice').textContent=t;};window.VaultNotice=notice;
const localURL=(p,revision)=>{
 const u=new URL(p,location.href),base=new URL('./motion-vault-assets/',location.href),decoded=decodeURIComponent(u.pathname);
 if(u.origin!==base.origin||!u.pathname.startsWith(base.pathname)||decoded.split('/').some(v=>v==='..'))throw new Error('Non-local asset path');
 if(revision)u.searchParams.set('v',revision);return u.href;
};
const local=p=>localURL(p);
function uses(it){return(it.uses||[]).map(u=>({scene:SHORT[u.scene]||TAX[u.scene]?.label,task:TAX[u.scene]?.tasks[u.task],placement:u.placement,goal:u.goal}));}
function readBookmarks(){
 const raw=localStorage.getItem(BOOKMARK_KEY);
 if(raw!==null){const list=JSON.parse(raw);if(!Array.isArray(list))throw new Error('书签格式异常');return new Set(list.map(String));}
 const old=JSON.parse(localStorage.getItem('motion-vault-online-20261005-15')||'null');
 return new Set((old?.saved||[]).map(String).filter(id=>baseItems.some(i=>String(i.id)===id)));
}
function parseCuration(raw){
 if(!raw)return emptyCuration();const v=JSON.parse(raw);
 if(v?.schemaVersion!=='motion-vault.manual-curation.v1'||!Array.isArray(v.events)||v.events.some(e=>!e||!e.item||typeof e.item.id!=='string'||!['hide','restore','note'].includes(e.action)))throw new Error('下架记录格式异常');
 return v;
}
function readCuration(){return parseCuration(localStorage.getItem(CURATION_KEY));}
function parseReview(raw){
 if(!raw)return emptyReview();const v=JSON.parse(raw);
 if(!Array.isArray(v.hidden)||!v.notes||typeof v.notes!=='object'||Array.isArray(v.notes)||!Array.isArray(v.events)||v.events.some(e=>!e||typeof e.id!=='string'||!['hide','restore','note','accept','unaccept'].includes(e.action))||(v.accepted!==undefined&&!Array.isArray(v.accepted)))throw new Error('私人审查记录格式异常');
 return{...v,accepted:v.accepted||[]};
}
function readReview(){return parseReview(localStorage.getItem(REVIEW_KEY));}
for(const load of [()=>{saved=readBookmarks()},()=>{curation=readCuration()},()=>{review=readReview()}]){
 try{load()}catch(e){curationError+=(curationError?' ':'')+e.message+'，原记录没有覆盖。';}
}
function hiddenIds(value=curation,candidateState=review){
 const known=new Set(items.filter(i=>!isCandidate(i)).map(i=>String(i.id))),hidden=new Set();
 for(const e of value.events||[]){const id=e.item?.id;if(!known.has(id))continue;if(e.action==='hide')hidden.add(id);else if(e.action==='restore')hidden.delete(id);}
 for(const id of candidateState.hidden||[])if(candidateIds.has(String(id)))hidden.add(String(id));
 return hidden;
}
const accepted=it=>!isCandidate(it)||review.accepted.includes(String(it.id));
function snapshot(it){return{id:String(it.id),title:it.title||'',desc:it.desc||'',tech:it.tech||'',source:it.source_name||it.source_kind||'本地设计参考'};}
function saveReview(id,action,note){
 try{
  const current=readReview(),next={...current,hidden:[...current.hidden],notes:{...current.notes},events:[...current.events],accepted:[...current.accepted]};
  if(action==='hide')next.hidden=[...new Set([...next.hidden,id])];
  if(action==='restore')next.hidden=next.hidden.filter(x=>x!==id);
  if(action==='accept')next.accepted=[...new Set([...next.accepted,id])];
  if(action==='unaccept')next.accepted=next.accepted.filter(x=>x!==id);
  if(action==='note')next.notes[id]=note;
  const event={id,action,at:new Date().toISOString()},last=next.events.at(-1);
  if(action==='note'&&last?.action==='note'&&last.id===id)next.events[next.events.length-1]=event;else next.events.push(event);
  localStorage.setItem(REVIEW_KEY,JSON.stringify(next));review=next;
  if(action==='note')noteDrafts.delete(id);
  $('storageStatus').textContent='已保存';return true;
 }catch(e){
  if(action==='note')noteDrafts.set(id,note);
  const message='未保存：'+e.message+'。原状态不变'+(action==='note'?'，备注草稿可导出。':'。');
  $('storageStatus').textContent=message;notice(message);return false;
 }
}
function setHidden(it,next){
 const id=String(it.id);
 try{
  if(isCandidate(it)){
   const current=readReview(),wasHidden=current.hidden.includes(id);if(next===undefined)next=!wasHidden;
   if(next!==wasHidden&&!saveReview(id,next?'hide':'restore'))return false;
   if(next===wasHidden)review=current;
  }else{
   const current=readCuration(),wasHidden=hiddenIds(current).has(id);if(next===undefined)next=!wasHidden;
   if(next!==wasHidden){const event={id:crypto.randomUUID(),at:new Date().toISOString(),action:next?'hide':'restore',source:'gallery_ui',item:snapshot(it)},updated={...current,events:[...current.events,event]};localStorage.setItem(CURATION_KEY,JSON.stringify(updated));curation=updated;}else curation=current;
  }
  render();notice(next?'已下架「'+it.title+'」。':'已恢复「'+it.title+'」。');
  if(next){const b=document.createElement('button');b.className='quiet';b.textContent='撤销';b.onclick=()=>setHidden(it,false);$('notice').append(b);}
  return true;
 }catch(e){notice('未保存下架操作：'+e.message+'。原状态未改变。');return false;}
}
const toggleHidden=it=>setHidden(it);
function collect(it,next){
 if(!isCandidate(it))return false;const id=String(it.id);
 try{if(next===undefined)next=!readReview().accepted.includes(id);}catch(e){notice('收录状态未保存：'+e.message);return false;}
 if(!saveReview(id,next?'accept':'unaccept'))return false;
 render();notice(next?'已收录「'+it.title+'」，可在「已收录」中查看。':'已移回新增待审。');return true;
}
function toggleBookmark(it){
 try{const next=readBookmarks(),id=String(it.id);next.has(id)?next.delete(id):next.add(id);localStorage.setItem(BOOKMARK_KEY,JSON.stringify([...next]));saved=next;
  if(savedOnly)render();else document.querySelectorAll('.card').forEach(c=>c.querySelector('.bookmark')?.setAttribute('aria-pressed',String(saved.has(c.dataset.id))));
 }catch(e){notice('书签未保存：'+e.message+'。原状态未改变。');}
}
function belongs(it,state,hidden){
 const id=String(it.id);if(state==='hidden')return hidden.has(id);
 if(hidden.has(id))return false;return state==='pending'?isCandidate(it)&&!accepted(it):accepted(it);
}
function filtered(state=view){
 const hidden=hiddenIds();
 return items.filter(it=>belongs(it,state,hidden)&&(scene==='all'||(it.uses||[]).some(u=>u.scene===scene))&&(task==='all'||(it.uses||[]).some(u=>u.task===task&&(scene==='all'||u.scene===scene)))&&(!savedOnly||saved.has(String(it.id)))&&(!query||[it.title,it.desc,it.design_value,it.source_name,...uses(it).map(u=>Object.values(u).join(' '))].join(' ').toLowerCase().includes(query)));
}
function publicItems(){return filtered('library').map(it=>isCandidate(it)?{...it,status:'user_collected_reference'}:it);}
function productionExport(){return{schema:'motion-vault.production-reference-list.v2',taskSelectionRequired:true,items:publicItems()};}
function exportReview(){
 return{schema:'motion-vault.original-review.v1',batch:'curated-originals-30',audience:'private_curator',exported_at:new Date().toISOString(),
  items:candidateItems.map(i=>({id:i.id,title:i.title,source:i.source_url,hidden:review.hidden.includes(i.id),accepted:review.accepted.includes(i.id),note:noteDrafts.get(i.id)??review.notes[i.id]??'',unsaved_draft:noteDrafts.has(i.id),production_selection:null})),events:review.events};
}
function setView(next,writeHistory=true){
 if(!['library','pending','hidden'].includes(next))next='library';
 if($('modal').open)$('modal').close();view=next;savedOnly=false;
 if(writeHistory){const url=new URL(location.href);url.searchParams.delete('v');if(view==='library')url.searchParams.delete('view');else url.searchParams.set('view',view);if(url.href!==location.href)history.pushState({view},'',url);}
 notice('');tabs();render();
}
function tabs(){
 $('sceneTabs').innerHTML=[['all','全部用途'],...Object.entries(SHORT)].map(([id,t])=>'<button class="filter-pill '+(id===scene?'active':'')+'" data-scene="'+id+'" aria-pressed="'+(id===scene)+'">'+t+'</button>').join('');
 $('taskTabs').hidden=scene==='all';$('taskTabs').innerHTML=scene==='all'?'':[['all','全部任务'],...Object.entries(TAX[scene].tasks)].map(([id,t])=>'<button data-task="'+id+'" class="'+(id===task?'active':'')+'" aria-pressed="'+(id===task)+'">'+t+'</button>').join('');
}
function stop(){epoch++;clearTimeout(pending);pending=0;const old=active;active=null;if(!old)return;try{old.dispose?.()}finally{old.layer?.remove();old.stage.dataset.playing='false';}}
async function getModule(it){const url=localURL(it.asset.entry,it.asset.version);if(!moduleCache.has(url))moduleCache.set(url,import(url).catch(e=>{moduleCache.delete(url);throw e}));return moduleCache.get(url);}
async function runLocal(stage,it,event,options={}){
 const ticket=++epoch,layer=document.createElement('div');layer.className='preview-layer';const shadow=layer.attachShadow({mode:'open'}),link=document.createElement('link'),host=document.createElement('div');
 link.rel='stylesheet';link.href=localURL('motion-vault-assets/shared/runtime.css',CATALOG.runtimeRevision||it.asset.version);host.style.cssText='position:absolute;inset:0;width:100%;height:100%';
 const vars=document.createElement('style');vars.textContent=':host{--paper:#fafaf7;--text:#20211e;--text-sub:#55594f;--text-muted:#70756a;--line:#e1e3db;--card-border:#cdd1c7;--card-bg:#fffefa;--input-bg:#e8ebe3;--accent:#375844;--viewport-bg:#e5e9df}';
 let timer=0;const loaded=new Promise((resolve,reject)=>{link.onload=resolve;link.onerror=()=>reject(new Error('Local runtime stylesheet unavailable'));timer=setTimeout(()=>reject(new Error('Local runtime stylesheet timeout')),6000)});
 const record={stage,it,layer,held:false,down:null,dispose:()=>{clearTimeout(timer);link.onload=link.onerror=null;layer.remove()}};active=record;shadow.append(vars,link,host);stage.append(layer);stage.dataset.playing='loading';
 try{const [mod]=await Promise.all([getModule(it),loaded]);clearTimeout(timer);if(ticket!==epoch||active!==record||!layer.isConnected)return;const effect=mod.mount(host,{event,preview:options.preview,motionIntent:options.motionIntent||(options.preview?'hover':undefined),playbackRate:options.playbackRate||1});record.effect=effect;record.dispose=()=>{clearTimeout(timer);effect.dispose()};stage.dataset.playing='true';stage.dataset.previewKind=options.preview&&it.key!=='radial'?'local-autoplay':'local-interactive';
  // Only a still-held, trusted human drag can be delivered after a cold local module load.
  // Autoplay never enters this path and never manufactures a pointer id.
  queueMicrotask(()=>{const down=record.down;if(active!==record||!record.held||!down?.isTrusted||it.preview_mode!=='drag')return;effect.takeControl(down);const target=shadow.elementFromPoint(down.clientX,down.clientY);if(!target||target===host)return;target.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,composed:true,cancelable:true,pointerId:down.pointerId,pointerType:down.pointerType,button:down.button,buttons:down.buttons,clientX:down.clientX,clientY:down.clientY,isPrimary:down.isPrimary}));});
 }catch(e){clearTimeout(timer);if(active===record){stop();notice('本地预览未能加载：'+e.message);}}
}
function poster(stage,it){
 stage.replaceChildren();if(!it.asset?.poster)return;
 const img=document.createElement('img');img.className='poster';img.src=localURL(it.asset.poster,it.asset.posterRevision||it.asset.version);img.alt=it.title+'本地实现画面';img.draggable=false;stage.append(img);
}
function interactive(stage,it){
 if(!isCandidate(it)||!hasImplementation(it))return;stop();
 const layer=document.createElement('div');layer.className='preview-layer';
 const frame=document.createElement('iframe');frame.title=it.title+'本地交互';frame.sandbox='allow-scripts';frame.referrerPolicy='no-referrer';frame.className='local-source-frame';
 const channel=crypto.randomUUID(),url=new URL(localURL(it.asset.run));url.searchParams.set('vaultSession',channel);
 const disposeBroker=createSourceBroker(frame,it,channel);
 const fit=()=>{const s=Math.min(stage.clientWidth/1100,stage.clientHeight/670);frame.style.transform='translate('+((stage.clientWidth-1100*s)/2)+'px,'+((stage.clientHeight-670*s)/2)+'px) scale('+s+')';};
 const ro=new ResizeObserver(fit),loading=document.createElement('span');loading.className='source-loading';loading.textContent='加载本地效果…';loading.setAttribute('role','status');
 const record={stage,it,layer,held:false,interactive:true,dispose:()=>{clearTimeout(timer);ro.disconnect();disposeBroker();frame.onload=frame.onerror=null;frame.removeAttribute('src');frame.remove();}};
 const timer=setTimeout(()=>{if(active===record)loading.textContent='加载较慢，可切回预览';},12000);
 frame.onload=()=>{if(active!==record)return;clearTimeout(timer);loading.remove();stage.dataset.playing='true';};
 frame.onerror=()=>{if(active===record){clearTimeout(timer);loading.textContent='本地效果未加载，可切回预览';}};
 active=record;frame.src=url.href;layer.append(frame,loading);stage.append(layer);ro.observe(stage);fit();
 stage.dataset.playing='loading';stage.dataset.previewKind='local-source-interactive';
 if(stage===$('modalStage'))$('previewLabel').textContent='实时网页';
}
// Keep only compressed bytes for nearby candidates; no background video/decoder.
const previewMedia=(()=>{
 const MAX_ITEMS=9,MAX_BYTES=24*1024*1024,MAX_ITEM_BYTES=4*1024*1024,MAX_CONCURRENT=2;
 const entries=new Map(),watched=new Map(),retryAfter=new Map(),directUses=new Map(),jobs=new Map();
 const reservedBytes=()=>[...jobs.values()].reduce((sum,job)=>sum+job.reservedBytes,0);
 const reservedItems=()=>[...jobs.values()].reduce((sum,job)=>sum+job.reservedItems,0);
 let wanted=[],bytes=0,generation=0,suspended=false,scheduled=0;
 const pointer=matchMedia('(any-hover: hover)');
 const usable=()=>!suspended&&!document.hidden&&!document.querySelector('dialog[open]')&&!navigator.connection?.saveData&&(!navigator.maxTouchPoints||pointer.matches);
 const keyFor=it=>localURL(it.asset.video,it.asset.videoRevision||it.asset.version);
 function drop(key,entry){if(entry.pins||entries.get(key)!==entry)return;entries.delete(key);bytes-=entry.bytes;URL.revokeObjectURL(entry.url);}
 function schedule(){if(!scheduled&&!suspended)scheduled=requestAnimationFrame(()=>{scheduled=0;refresh();});}
 function take(key){
  const entry=entries.get(key);if(!entry)return null;
  entries.delete(key);entries.set(key,entry);entry.pins++;let released=false;
  return{url:entry.url,release(){if(released)return;released=true;entry.pins--;if(suspended||entry.generation!==generation)drop(key,entry);schedule();}};
 }
 function direct(key){
  let entry=directUses.get(key);if(!entry){entry={users:0};directUses.set(key,entry);}entry.users++;let released=false;
  return{url:key,release(){if(released)return;released=true;if(--entry.users===0&&directUses.get(key)===entry)directUses.delete(key);schedule();}};
 }
 async function fill(job,limit){
  const timer=setTimeout(()=>{job.timedOut=true;job.controller.abort();},6000);
  try{
   const response=await fetch(job.key,{signal:job.controller.signal,priority:'low'});
   if(!response.ok||Number(response.headers.get('content-length'))>limit){await response.body?.cancel();throw new Error('Preview preparation unavailable');}
   if(!response.body)throw new Error('Preview response has no body');
   const reader=response.body.getReader(),chunks=[];let size=0;
   try{for(;;){const part=await reader.read();if(part.done)break;size+=part.value.byteLength;if(size>limit){await reader.cancel();throw new Error('Preview preparation budget exceeded');}chunks.push(part.value);}}
   finally{reader.releaseLock();}
   if(!size||job.generation!==generation||!usable()||!wanted.includes(job.key))return;
   const blob=new Blob(chunks,{type:'video/mp4'}),entry={url:URL.createObjectURL(blob),bytes:size,pins:0,generation:job.generation};
   entries.set(job.key,entry);bytes+=size;job.reservedBytes=0;job.reservedItems=0;
  }catch{if(job.generation===generation&&(job.timedOut||!job.controller.signal.aborted))retryAfter.set(job.key,performance.now()+6000);}
  finally{clearTimeout(timer);if(jobs.get(job.key)===job)jobs.delete(job.key);job.resolve();schedule();}
 }
 function pump(){
  while(jobs.size<MAX_CONCURRENT&&usable()){
   const key=wanted.find(key=>!entries.has(key)&&!jobs.has(key)&&!directUses.has(key)&&(retryAfter.get(key)||0)<=performance.now());if(!key)return;
   for(const [old,entry]of entries){
    if(entries.size+reservedItems()<MAX_ITEMS&&MAX_BYTES-bytes-reservedBytes()>=MAX_ITEM_BYTES)break;
    if(!entry.pins&&!wanted.includes(old))drop(old,entry);
   }
   const limit=Math.min(MAX_ITEM_BYTES,MAX_BYTES-bytes-reservedBytes());if(entries.size+reservedItems()>=MAX_ITEMS||limit<=0)return;
   const job={key,generation,controller:new AbortController(),reservedBytes:limit,reservedItems:1};
   job.done=new Promise(resolve=>{job.resolve=resolve;});jobs.set(key,job);void fill(job,limit);
  }
 }
 function refresh(){
  if(!usable())wanted=[];
  else{
   const near=[];
   for(const [stage,entry]of watched){if(!entry.near||!stage.isConnected)continue;const r=stage.getBoundingClientRect();if(r.width&&r.height)near.push({key:entry.key,distance:Math.max(0,-r.bottom,r.top-innerHeight),top:r.top});}
   near.sort((a,b)=>a.distance-b.distance||a.top-b.top);wanted=[...new Set(near.map(x=>x.key))].slice(0,MAX_ITEMS);
  }
  for(const job of jobs.values())if(!wanted.includes(job.key))job.controller.abort();pump();
 }
 const observer=new IntersectionObserver(records=>{for(const record of records){const item=watched.get(record.target);if(item)item.near=record.isIntersecting;}refresh();},{rootMargin:'400px 0px'});
 function discard(clearTargets){
  generation++;wanted=[];for(const job of jobs.values())job.controller.abort();retryAfter.clear();
  if(scheduled){cancelAnimationFrame(scheduled);scheduled=0;}
  for(const [key,entry]of entries)drop(key,entry);
  if(clearTargets){observer.disconnect();watched.clear();}
 }
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 navigator.connection?.addEventListener?.('change',schedule);pointer.addEventListener?.('change',schedule);
 return{
  observe(stage,it){if(!isCandidate(it)||!it.asset?.video)return;watched.set(stage,{key:keyFor(it),near:false});observer.observe(stage);},
  acquire(it){
   const key=keyFor(it),hit=take(key);if(hit)return hit;
   const job=jobs.get(key);if(job&&job.generation===generation&&!job.controller.signal.aborted)return job.done.then(()=>take(key)||direct(key));
   return direct(key);
  },
  clear(){suspended=false;discard(true);},
  suspend(){suspended=true;discard(false);},
  resume(){suspended=false;refresh();}
 };
})();
function resumePreviewMedia(){if(previewMode==='preview')previewMedia.resume();else previewMedia.suspend();}
function playVideo(stage,it,event){
 const layer=document.createElement('div');layer.className='preview-layer';
 const ticket=epoch,source=localURL(it.asset.video,it.asset.videoRevision||it.asset.version);let v=null,release=null;
 const record={stage,it,layer,held:false,dispose:()=>{if(v){v.pause();v.removeAttribute('src');v.load();}release?.();release=null;}};active=record;stage.append(layer);
 stage.dataset.playing='loading';stage.dataset.previewKind='local-recording';
 const fallback=()=>{if(active!==record)return;stop();if(isCandidate(it))notice('本地预览未能加载，可在详情体验。');else runLocal(stage,it,event,{preview:true});};
 const show=prepared=>{
  if(active!==record||ticket!==epoch||!stage.isConnected){prepared.release();return;}
  release=prepared.release;v=document.createElement('video');v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload='none';
  v.dataset.previewSource=source;v.src=prepared.url;v.style.opacity='0';
  v.addEventListener('playing',()=>{if(active===record){v.style.opacity='';stage.dataset.playing='true';}});
  v.addEventListener('error',fallback,{once:true});layer.append(v);v.play().catch(fallback);
 };
 Promise.resolve(previewMedia.acquire(it)).then(show).catch(fallback);
}
function start(stage,it,event,{force=false,detailView=false}={}){
 if(active?.stage===stage||document.hidden||!stage.isConnected||!detailView&&document.querySelector('dialog[open]'))return;stop();
 if(it.asset){
  if(isCandidate(it)&&detailView){poster(stage,it);return;}
  if(!detailView&&previewMode==='interactive'&&hasImplementation(it)){
   if(isCandidate(it))interactive(stage,it);else runLocal(stage,it,event,{preview:false,motionIntent:'hover'});
  }else if(it.asset.video&&!detailView)playVideo(stage,it,event);
  else if(!isCandidate(it))runLocal(stage,it,event,{playbackRate:detailView?Number($('playbackRate').value):1,preview:!detailView});
 }else if(it.media_url){
  const layer=document.createElement('div');layer.className='preview-layer';const v=document.createElement(it.media_kind==='image'?'img':'video');
  v.src=it.media_url;v.style.cssText='width:100%;height:100%;object-fit:contain';
  if(v.tagName==='VIDEO'){v.muted=true;v.loop=true;v.playsInline=true;v.controls=detailView;v.play().catch(()=>{});}else v.alt=it.title;
  layer.append(v);stage.append(layer);active={stage,it,layer,dispose:()=>{v.pause?.();v.removeAttribute('src');v.load?.();},held:false};
 }
}
const visibility=new IntersectionObserver(es=>{for(const e of es)if(active?.stage===e.target&&e.intersectionRatio<.15)stop();},{threshold:[0,.15]});
function render(){
 stop();previewMedia.clear();visibility.disconnect();$('grid').replaceChildren();const list=filtered(),hidden=hiddenIds();
 document.body.dataset.view=view;
 for(const button of $('viewTabs').querySelectorAll('[data-view]'))button.setAttribute('aria-pressed',String(button.dataset.view===view));
 $('pendingCount').textContent=candidateItems.filter(i=>!accepted(i)&&!hidden.has(String(i.id))).length;
 $('hiddenCount').textContent=hidden.size;$('resultCount').textContent=list.length+' 项';
 $('savedToggle').setAttribute('aria-pressed',String(savedOnly));$('exportReview').hidden=view==='library';
 const order=[39,22,25,'online-ring','online-spot','online-book'];
 list.sort((a,b)=>{const x=order.indexOf(a.id),y=order.indexOf(b.id);return(x<0?99:x)-(y<0?99:y);});
 for(const it of list){
  const candidate=isCandidate(it),id=String(it.id),isHidden=hidden.has(id);
  const card=document.createElement('article');card.className='card';card.dataset.id=id;
  const stage=document.createElement('div');stage.className='stage';stage.tabIndex=0;stage.setAttribute('role','group');
  stage.setAttribute('aria-label',it.title+'，'+(candidate?'悬停播放，点击查看资料与交互':({auto:'悬停播放',pointer:'实时跟随鼠标',drag:'悬停演示，按住拖拽接管',click:'悬停自动演示',scroll:'悬停自动演示，可手动滚动'}[it.preview_mode]||'预览')));
  stage.dataset.playing='false';stage.dataset.mode=it.preview_mode;
  if(it.asset?.poster||it.media_kind==='image'&&it.media_url){
   const img=document.createElement('img');img.className='poster';img.loading='lazy';img.decoding='async';img.src=it.asset?.poster?localURL(it.asset.poster,it.asset.posterRevision||it.asset.version):it.media_url;img.alt=it.title+'实际实现画面';img.draggable=false;stage.append(img);
  }else{const p=document.createElement('div');p.className='poster-missing';p.textContent=it.asset?'本地效果，可直接体验':'待补视觉片段';stage.append(p);}
  const badge=document.createElement('span');badge.className='preview-badge';badge.textContent=it.asset?.video?'悬停播放':({auto:'悬停播放',pointer:'移动鼠标接管',drag:'按住拖拽接管',click:'悬停自动演示',scroll:'悬停自动演示'}[it.preview_mode]||'本地预览');stage.append(badge);
  const captions=document.createElement('div'),u=uses(it)[0];
  captions.innerHTML='<div class="caption"><h2>'+esc(it.title)+'</h2><button class="detail-btn" aria-label="查看'+esc(it.title)+'详情">详情 ↗</button></div><div class="meta"><span>'+esc(u?u.scene+' · '+u.task:'实际采集')+'</span>'+
   (candidate&&!accepted(it)&&!isHidden?'<button class="quiet collect-btn" aria-label="收录 '+esc(it.title)+'">收录</button>':'')+
   '<button class="quiet archive-btn'+(candidate?' hide-btn':'')+'" aria-label="'+(isHidden?'恢复':'下架')+' '+esc(it.title)+'">'+(isHidden?'恢复':'下架')+'</button>'+
   '<button class="bookmark" aria-pressed="'+saved.has(id)+'" aria-label="书签 '+esc(it.title)+'"><svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg></button></div>';
  captions.querySelector('.detail-btn').onclick=e=>openDetail(it,e.currentTarget);
  captions.querySelector('.archive-btn').onclick=()=>toggleHidden(it);
  captions.querySelector('.bookmark').onclick=()=>toggleBookmark(it);
  const collectButton=captions.querySelector('.collect-btn');if(collectButton)collectButton.onclick=()=>collect(it,true);
  // In real mode clicks belong to the source, never to the gallery's detail shortcut.
  if(candidate)stage.onclick=()=>{if(previewMode!=='interactive'&&!active?.interactive)openDetail(it,stage);};
  let pausedUntilLeave=false;
   const enter=e=>{if(e.pointerType==='touch'||e.buttons||pausedUntilLeave||card.dataset.previewPaused==='true')return;lastPoint={x:e.clientX,y:e.clientY};if(document.querySelector('dialog[open]')||active?.stage===stage)return;clearTimeout(pending);pending=setTimeout(()=>{pending=0;const hit=document.elementFromPoint(lastPoint.x,lastPoint.y);if(card.isConnected&&hit&&card.contains(hit)&&!pausedUntilLeave)start(stage,it,e)},45)};
   card.addEventListener('pointerenter',enter);card.addEventListener('mouseenter',enter);
   card.addEventListener('pointermove',e=>{if(active?.stage!==stage&&!pending)enter(e)});
   card.addEventListener('pointerleave',()=>{pausedUntilLeave=false;delete card.dataset.previewPaused;clearTimeout(pending);pending=0;if(active?.stage===stage&&!active.held)stop()});
   card.addEventListener('keydown',e=>{if(e.key==='Escape'){pausedUntilLeave=true;stop()}});
  stage.addEventListener('dragstart',e=>e.preventDefault());stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;clearTimeout(pending);if(active?.stage!==stage)start(stage,it,e,{force:true});if(active?.stage===stage){active.held=true;if(!active.effect)active.down=e;}},true);
  stage.addEventListener('focus',e=>{if(stage.matches(':focus-visible')&&!$('modal').open)start(stage,it,e)});
  stage.addEventListener('keydown',e=>{if(e.key==='Escape'){stop();stage.blur();}else if(e.key==='Enter'&&e.target===stage){e.preventDefault();if(candidate){if(previewMode==='interactive'){start(stage,it,e,{force:true});active?.layer?.querySelector('iframe')?.focus();}else openDetail(it,stage);return;}start(stage,it,e,{force:true});setTimeout(()=>active?.layer?.shadowRoot?.querySelector('.asset-host button:not([inert]),.asset-host input')?.focus(),100)}});
  card.append(stage,captions);$('grid').append(card);visibility.observe(stage);previewMedia.observe(stage,it);
 }
 updatePreviewMode();if(previewMode==='interactive')previewMedia.suspend();
 if(!list.length){
  const p=document.createElement('p');p.className='empty';p.textContent=query||scene!=='all'||savedOnly?'没有匹配的参考。':view==='pending'?'新增内容已审查完。':view==='hidden'?'没有已下架的参考。':'还没有已收录的参考。';$('grid').append(p);
 }
}
function markdown(text){const frag=document.createDocumentFragment();let code=false,lines=[];for(const line of text.split('\n')){if(line.startsWith('```')){if(code){const pre=document.createElement('pre');pre.textContent=lines.join('\n');frag.append(pre);lines=[];}code=!code;continue;}if(code){lines.push(line);continue;}if(!line.trim()||line.startsWith('# '))continue;const el=document.createElement(line.startsWith('##')?'h3':'p');el.textContent=line.replace(/^#{1,6}\s*/,'').replace(/`/g,'').replace(/^- /,'· ');frag.append(el);}return frag;}
async function showDoc(section){
 if(!detail)return;const it=detail,ticket=++docEpoch;
 document.querySelectorAll('[data-section]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.section===section)));$('docContent').textContent='读取本地资料…';
 if(!it.asset){$('docContent').textContent=it.desc||'该采集尚无本地实现资料。';return;}
 const path=section==='provenance'?it.asset.manifest.replace('asset.json','provenance.json'):section==='implementation'?it.asset.implementation:it.asset.design;
 try{
  const u=localURL(path);if(!documentCache.has(u))documentCache.set(u,fetch(u).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.text();}).catch(e=>{documentCache.delete(u);throw e;}));
  const t=await documentCache.get(u);if(ticket!==docEpoch)return;$('docContent').replaceChildren();
  if(section==='provenance'){
   const p=JSON.parse(t),kind=p.implementation_kind==='independent_code'?'独立实现，非原作者代码':isCandidate(it)?'基于作者源码进行本地适配':p.implementation_kind;
   $('docContent').append(markdown('## 实现性质\n'+kind+'\n## 来源\n'+[p.reference_title,p.reference_author||p.author,p.repository||p.source||it.source_url].filter(Boolean).join('\n')+'\n## 实现差异\n'+(p.differences||[]).join('\n')+'\n## 原作验证\n'+(p.upstream_visual_verified?'已有原作视觉验证':'当前封面和视频代表对应的本地实现。')+'\n## 版本\n'+p.version+'\n## 权利与素材\n'+p.rights));
  }else $('docContent').append(markdown(t));
 }catch(e){if(ticket===docEpoch)$('docContent').textContent='资料未读取：'+e.message;}
}
function updateDetailState(){
 if(!detail)return;const candidate=isCandidate(detail),id=String(detail.id),isHidden=hiddenIds().has(id);
 $('modalArchiveBtn').textContent=isHidden?'恢复':'下架';$('modalCollectBtn').hidden=!candidate||isHidden;
 $('modalCollectBtn').textContent=accepted(detail)?'移回待审':'收录';
 $('privateReview').hidden=!candidate||view==='library';
 $('reviewNote').value=candidate&&view!=='library'?(noteDrafts.get(id)??review.notes[id]??''):'';
}
function openDetail(it,trigger){
 stop();detail=it;opener=trigger;docEpoch++;const candidate=isCandidate(it);
 $('modalTitle').textContent=it.title;$('modalScene').textContent=uses(it).map(u=>u.scene+' / '+u.task).join(' · ');$('modalDesc').textContent=it.desc||'';
 $('modalSource').textContent=candidate?(it.source_kind==='independent_code'?'独立实现':'作者源码适配'):it.asset?'本地可运行设计参考':'实际采集';
 $('modalRevision').textContent='';$('modalRevision').hidden=true;updateDetailState();
 const safeSource=/^https:\/\//.test(it.source_url||'');$('sourceLink').hidden=!safeSource;$('sourceLink').href=safeSource?it.source_url:'#';
 $('runAlone').hidden=!it.asset||candidate;$('runAlone').href=it.asset&&!candidate?localURL(it.asset.run):'#';
 detailMode=candidate?previewMode:'interactive';$('detailModes').hidden=!it.asset;
 $('runLocal').hidden=false;$('runLocal').disabled=!hasImplementation(it);$('runLocal').textContent='实时交互';
 $('replayBtn').hidden=!it.asset;$('playbackRate').value='1';$('rateValue').textContent='1×';$('playbackRate').closest('label').hidden=candidate||it.preview_mode!=='auto';
 $('copyAgent').textContent='复制 Agent 读取指令';
 $('storageStatus').textContent=noteDrafts.has(String(it.id))?'有未保存的备注草稿。':'自动保存';
 $('modalStage').replaceChildren();$('modal').showModal();renderDetailPreview();showDoc('design');
}
function renderDetailPreview(){
 if(!detail)return;const it=detail,stage=$('modalStage');stop();poster(stage,it);
 const real=detailMode==='interactive'&&hasImplementation(it);
 $('runLocal').setAttribute('aria-pressed',String(real));$('runPreview').setAttribute('aria-pressed',String(!real));
 $('previewLabel').textContent=real?'实时网页':it.asset?.video?'视频预览':'代码演示';
 if(!it.asset){start(stage,it,null,{force:true,detailView:true});return;}
 if(real){if(isCandidate(it))interactive(stage,it);else runLocal(stage,it,null,{preview:false,playbackRate:Number($('playbackRate').value)});}
 else if(it.asset.video)playVideo(stage,it,null);
 else runLocal(stage,it,null,{preview:true,playbackRate:Number($('playbackRate').value)});
}
function setDetailMode(mode){if(!detail||!['preview','interactive'].includes(mode))return;detailMode=mode;renderDetailPreview();}
function replay(){renderDetailPreview();}
const dialogsObserver=new MutationObserver(()=>{const open=!!document.querySelector('dialog[open]');if(active&&active.stage!==$('modalStage')&&open)stop();if(open)previewMedia.suspend();else resumePreviewMedia();});
document.querySelectorAll('dialog').forEach(d=>dialogsObserver.observe(d,{attributes:true,attributeFilter:['open']}));
$('viewTabs').onclick=e=>{const b=e.target.closest('[data-view]');if(b)setView(b.dataset.view);};
$('sceneTabs').onclick=e=>{const b=e.target.closest('[data-scene]');if(b){scene=b.dataset.scene;task='all';tabs();render();}};
$('taskTabs').onclick=e=>{const b=e.target.closest('[data-task]');if(b){task=b.dataset.task;tabs();render();}};
$('searchInput').oninput=e=>{query=e.target.value.trim().toLowerCase();render();};
$('savedToggle').onclick=()=>{savedOnly=!savedOnly;render();};
$('modalArchiveBtn').onclick=()=>{if(detail&&toggleHidden(detail))$('modal').close();};
$('modalCollectBtn').onclick=()=>{if(detail&&collect(detail))$('modal').close();};
$('closeBtn').onclick=()=>$('modal').close();
$('modal').addEventListener('close',()=>{
 stop();detail=null;docEpoch++;$('modalStage').replaceChildren();$('reviewNote').value='';$('privateReview').hidden=true;
 if(gridDirty){gridDirty=false;render();}
 if(opener?.isConnected)opener.focus({preventScroll:true});else $('viewTabs').querySelector('[aria-pressed="true"]')?.focus({preventScroll:true});
});
$('modal').onclick=e=>{if(e.target===$('modal')){const r=e.target.getBoundingClientRect();if(e.clientX<r.x||e.clientX>r.right||e.clientY<r.y||e.clientY>r.bottom)e.target.close();}};
document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>showDoc(b.dataset.section));
$('replayBtn').onclick=replay;$('playbackRate').oninput=e=>{$('rateValue').textContent=e.target.value+'×';replay();};
$('previewModes').onclick=e=>{const b=e.target.closest('[data-preview-mode]');if(b)setPreviewMode(b.dataset.previewMode);};
$('runPreview').onclick=()=>setDetailMode('preview');$('runLocal').onclick=()=>setDetailMode('interactive');$('runAlone').onclick=()=>stop();
$('reviewNote').oninput=e=>{if(detail&&isCandidate(detail)&&view!=='library')saveReview(String(detail.id),'note',e.target.value);};
$('copyAgent').onclick=async()=>{
 if(!detail)return;const text='node scripts/query-vault.mjs inspect '+detail.id+(isCandidate(detail)?' --scope candidates':'')+' --section all --json';
 try{await navigator.clipboard.writeText(text);$('copyAgent').textContent='已复制读取指令';setTimeout(()=>$('copyAgent').textContent='复制 Agent 读取指令',1800);}catch{$('docContent').textContent=text;}
};
$('themeBtn').onclick=()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('motion_vault_theme',theme);}catch{}};
try{document.documentElement.dataset.theme=localStorage.getItem('motion_vault_theme')==='dark'?'dark':'light';}catch{}
function downloadJSON(payload,name){
 const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
$('exportPublic').onclick=()=>downloadJSON(productionExport(),'motion-vault-production-references.json');
$('exportReview').onclick=()=>{stop();$('exportText').value=JSON.stringify(exportReview(),null,2);$('exportDialog').showModal();};
$('closeExport').onclick=()=>$('exportDialog').close();
$('downloadReview').onclick=()=>downloadJSON(JSON.parse($('exportText').value),'motion-vault-private-review.json');
window.addEventListener('pointerup',e=>{
 const p=active;if(!p)return;p.held=false;p.down=null;
 queueMicrotask(()=>{if(active!==p)return;const r=(p.stage.closest('.card')||p.stage).getBoundingClientRect();if(e.pointerType==='mouse'&&(e.clientX<r.x||e.clientX>r.right||e.clientY<r.y||e.clientY>r.bottom))stop();});
},true);
window.addEventListener('pointercancel',stop);
window.addEventListener('pointermove',e=>{if(e.pointerType==='mouse')lastPoint={x:e.clientX,y:e.clientY};},{passive:true});
document.addEventListener('focusin',e=>{if(active&&active.stage!==$('modalStage')&&!e.composedPath().includes(active.stage))stop();});
window.addEventListener('storage',e=>{
 try{
  if(e.key===CURATION_KEY)curation=parseCuration(e.newValue);
  else if(e.key===REVIEW_KEY)review=parseReview(e.newValue);
  else if(e.key===BOOKMARK_KEY)saved=readBookmarks();else return;
  if($('modal').open){gridDirty=true;updateDetailState();if(e.key===REVIEW_KEY&&detail&&document.activeElement===$('reviewNote')&&noteDrafts.has(String(detail.id)))$('reviewNote').value=noteDrafts.get(String(detail.id));}
  else render();
 }catch{notice('记录更新未能读取，保留当前内容。');}
});
window.addEventListener('blur',()=>{if(!(active?.interactive&&document.activeElement?.tagName==='IFRAME'))stop();});
window.addEventListener('pagehide',()=>{stop();previewMedia.suspend();});
window.addEventListener('pageshow',()=>resumePreviewMedia());
document.addEventListener('visibilitychange',()=>{
 if(document.hidden){stop();previewMedia.suspend();return;}resumePreviewMedia();if(detail&&$('modal').open){replay();return;}
 if(lastPoint&&!document.querySelector('dialog[open]')){
  const card=document.elementFromPoint(lastPoint.x,lastPoint.y)?.closest('.card'),stage=card?.querySelector('.stage'),it=items.find(i=>String(i.id)===card?.dataset.id);
  if(it)start(stage,it,{clientX:lastPoint.x,clientY:lastPoint.y,pointerType:'mouse'});
 }
});
window.addEventListener('focus',()=>{
 if(!lastPoint||document.hidden||document.querySelector('dialog[open]'))return;
 const card=document.elementFromPoint(lastPoint.x,lastPoint.y)?.closest('.card'),it=items.find(i=>String(i.id)===card?.dataset.id);
 if(it)start(card.querySelector('.stage'),it,{clientX:lastPoint.x,clientY:lastPoint.y,pointerType:'mouse'});
});
window.VaultRefreshHub=async()=>{
 try{
  const r=await fetch('http://127.0.0.1:4380/api/design-references',{signal:AbortSignal.timeout(4000)});if(!r.ok)throw new Error('Hub unavailable');
  const d=await r.json(),extra=(d.items||[]).map(x=>{
   const id=x.media?.previewAssetId||x.media?.originalAssetId;
   return{id:'hub-'+x.id,title:x.title,uses:[],source_kind:'capture',source_url:x.sourceUrl,desc:x.media?.message||'保留来源的媒体参考',media_kind:x.media?.mediaKind||'video',media_url:id?'http://127.0.0.1:4380/api/design-references/'+encodeURIComponent(x.id)+'/media/'+encodeURIComponent(id):'',preview_mode:'auto'};
  });
  items=[...baseItems,...extra];$('hubStatus').textContent='Workspace 已连接';if(extra.length){if($('modal').open)gridDirty=true;else render();}
 }catch{$('hubStatus').textContent='本地参考目录';}
};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')&&active){const card=active.stage.closest('.card');if(card)card.dataset.previewPaused='true';stop();}});
window.addEventListener('popstate',()=>setView(new URL(location.href).searchParams.get('view'),false));
function openById(id){const i=items.find(i=>String(i.id)===String(id));if(i)openDetail(i,null);}
window.HybridVault={release:'formal',items:()=>items,stop,open:openById,active:()=>active?{id:active.it.id,kind:active.stage.dataset.previewKind}:null};
window.CandidateVault={release:'formal',items:()=>candidateItems,exportReview,stop,open:id=>{const it=candidateItems.find(i=>String(i.id)===String(id));if(it){if(view==='library'&&!accepted(it))setView('pending');openDetail(it,null);}}};
window.VaultPublic={items:publicItems,export:productionExport,stopPreview:stop};
const initialURL=new URL(location.href);view=['pending','hidden'].includes(initialURL.searchParams.get('view'))?initialURL.searchParams.get('view'):'library';
if(initialURL.searchParams.has('v')){initialURL.searchParams.delete('v');history.replaceState({view},'',initialURL);}
tabs();render();if(curationError)notice(curationError);window.VaultRefreshHub();
