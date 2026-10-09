// Bounded lifecycle transport only; no business API, storage, or synthetic input.
(()=>{
 const channel=new URLSearchParams(location.search).get('vaultSession');if(parent===window||!channel)return;
 const events=new AbortController();let generation=null,disposed=false,firstError=null;
 const send=(phase,extra={})=>parent.postMessage({type:'vault-source-state',channel,generation,phase,...extra},'*');
 const reportError=value=>{if(disposed)return;const message=String(value?.message||value||'Source resource failed').slice(0,240);firstError??=message;if(generation)send('error',{message});};
 addEventListener('error',e=>reportError(e.error||e.message||'Source resource failed'),{capture:true,signal:events.signal});
 addEventListener('unhandledrejection',e=>reportError(e.reason),{signal:events.signal});
 const close=async()=>{if(disposed)return;disposed=true;try{await window.SourceDemo?.dispose?.();}finally{dispatchEvent(new Event('vault-source-dispose'));events.abort();send('disposed');}};
 addEventListener('message',async e=>{
  const d=e.data;if(e.source!==parent||d?.type!=='vault-source-command'||d.channel!==channel||typeof d.generation!=='string'||d.generation.length>100)return;
  if(d.command==='init'){
   if(disposed)return;generation=d.generation;const current=generation;
   try{if(firstError)throw new Error(firstError);const api=window.SourceDemo;if(!api||typeof api.ready?.then!=='function'||typeof api.dispose!=='function')throw new Error('This source has no verified lifecycle adapter');await api.ready;if(!disposed&&generation===current)send('ready');}
   catch(error){if(!disposed&&generation===current)send('error',{message:String(error?.message||error).slice(0,240)});}
  }else if(d.command==='dispose'){
   generation=d.generation;try{await close();}catch(error){send('disposed',{cleanupError:String(error?.message||error).slice(0,240)});}
  }
 },{signal:events.signal});
 // Let the author's own Escape handlers finish first. Consumed keys stay inside it.
 addEventListener('keydown',e=>{if(!e.isTrusted||e.key!=='Escape')return;queueMicrotask(()=>{if(!disposed&&!e.defaultPrevented&&generation)send('escape');});},{signal:events.signal});
 addEventListener('pagehide',()=>{void close();},{once:true,signal:events.signal});
})();
