// Only lifecycle acknowledgements from the current opaque source instance count.
function createSourceLifecycle(frame,channel,{onReady,onError,onEscape,timeoutMs=30000,disposeGraceMs=300}={}){
 let generation=null,timer=null,grace=null,closed=false,disposing=false,resolveDispose=null;
 const clear=()=>{clearTimeout(timer);timer=null;};
 const post=command=>frame.contentWindow?.postMessage({type:'vault-source-command',channel,generation,command},'*');
 const finish=()=>{if(closed)return;closed=true;clear();clearTimeout(grace);removeEventListener('message',receive);resolveDispose?.();};
 const fail=message=>{if(closed||disposing)return;clear();onError?.(message);};
 const receive=e=>{
  const d=e.data;if(closed||!generation||e.source!==frame.contentWindow||e.origin!=='null'||d?.type!=='vault-source-state'||d.channel!==channel||d.generation!==generation)return;
  if(d.phase==='disposed'&&disposing){finish();return;}
  if(disposing)return;
  if(d.phase==='ready'){clear();onReady?.();}
  else if(d.phase==='error')fail(typeof d.message==='string'?d.message.slice(0,240):'Source initialization failed');
  else if(d.phase==='escape')onEscape?.();
 };
 addEventListener('message',receive);
 return{
  begin(){if(closed||disposing)return;clear();generation=crypto.randomUUID();timer=setTimeout(()=>fail('Source initialization timed out'),timeoutMs);post('init');},
  dispose(){if(closed)return Promise.resolve();if(disposing)return this.disposed;disposing=true;clear();generation=crypto.randomUUID();this.disposed=new Promise(resolve=>{resolveDispose=resolve;});if(!frame.isConnected){finish();return this.disposed;}grace=setTimeout(finish,disposeGraceMs);post('dispose');return this.disposed;},
  close:finish,
  get state(){return{closed,disposing,generation};}
 };
}
