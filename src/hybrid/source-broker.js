// The opaque source frame can request only its own manifest-listed public files.
// No API requests, credentials, private review records or other workspace paths are forwarded.
function createSourceBroker(frame,it,channel){
 const ctrl=new AbortController(),cache=new Map(),rootURL=new URL('./',local(it.asset.manifest));let closed=false,requests=0;
 const permitted=fetch(local(it.asset.manifest),{signal:ctrl.signal,credentials:'omit'}).then(async r=>{if(!r.ok)throw new Error('Reference manifest unavailable');const a=await r.json();if(a.id!==it.id||a.version!==it.asset.version)throw new Error('Reference manifest identity mismatch');return new Set(Object.keys(a.hashes).filter(p=>p.startsWith('run/')&&!p.includes('..')&&!p.includes('\\')).map(p=>new URL(p,rootURL)).filter(u=>u.origin===rootURL.origin&&u.pathname.startsWith(rootURL.pathname+'run/')).map(u=>u.pathname));});
 permitted.catch(()=>{});
 const onMessage=async e=>{
  const m=e.data;if(closed||e.source!==frame.contentWindow||e.origin!=='null'||m?.channel!==channel||m.type!=='vault-asset-request')return;
  if(!Number.isSafeInteger(m.id)||typeof m.url!=='string'||m.url.length>3000)return;
  const reply=value=>{if(closed||!frame.isConnected)return;frame.contentWindow.postMessage({type:'vault-asset-response',channel,id:m.id,...value},'*',value.bytes?[value.bytes]:[]);};
  try{const u=new URL(m.url),allowed=await permitted;if(closed)return;if(u.origin!==rootURL.origin||!allowed.has(u.pathname)||++requests>4000)throw new Error('File is outside this reference package');
   const key=u.origin+u.pathname;if(!cache.has(key))cache.set(key,fetch(key,{signal:ctrl.signal,credentials:'omit',redirect:'error'}).then(async r=>{if(!r.ok)throw new Error('Local asset HTTP '+r.status);const size=Number(r.headers.get('content-length')||0);if(size>512*1024*1024)throw new Error('Asset exceeds transport limit');const bytes=await r.arrayBuffer();if(bytes.byteLength>512*1024*1024)throw new Error('Asset exceeds transport limit');return{bytes,mime:r.headers.get('content-type')||'application/octet-stream'};}).catch(e=>{cache.delete(key);throw e}));
   const data=await cache.get(key);reply({bytes:data.bytes.slice(0),mime:data.mime});
  }catch(error){reply({error:error.name==='AbortError'?'Reference closed':error.message});}
 };
 addEventListener('message',onMessage);return()=>{closed=true;ctrl.abort();removeEventListener('message',onMessage);cache.clear()};
}
