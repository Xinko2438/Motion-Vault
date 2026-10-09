// Owned local transport for an opaque Motion Vault source frame.
// Async image assignment preserves the img.src -> img.decode() ordering contract.
(()=>{
 const channel=new URLSearchParams(location.search).get('vaultSession');if(parent===window||!channel)return;
 const policy=document.createElement('meta');policy.httpEquiv='Content-Security-Policy';policy.content="connect-src blob: data:";document.head.append(policy);
 const root=new URL('./',location.href),pending=new Map(),nativeFetch=window.fetch.bind(window),objectURLs=new Set(),images=new WeakMap(),imageTasks=new WeakMap();let sequence=0,disposed=false;
 const events=new AbortController();
 const assetURL=value=>{try{const u=new URL(value,document.baseURI);return u.origin===root.origin&&u.pathname.startsWith(root.pathname)?u:null}catch{return null}};
 const abortError=()=>new DOMException('Source transport closed','AbortError');
 addEventListener('message',e=>{if(disposed||e.source!==parent||e.data?.channel!==channel||e.data?.type!=='vault-asset-response')return;const task=pending.get(e.data.id);if(!task)return;pending.delete(e.data.id);clearTimeout(task.timer);task.removeAbort?.();if(e.data.error)task.reject(new Error(e.data.error));else task.resolve(e.data);},{signal:events.signal});
 function bytes(url,signal){return new Promise((resolve,reject)=>{
  if(disposed||signal?.aborted){reject(abortError());return;}
  const id=++sequence,timer=setTimeout(()=>{const task=pending.get(id);pending.delete(id);task?.removeAbort?.();reject(new Error('Local reference asset timed out'));},20000);
  const abort=()=>{if(!pending.has(id))return;pending.delete(id);clearTimeout(timer);signal?.removeEventListener('abort',abort);reject(abortError());};
  pending.set(id,{resolve,reject,timer,removeAbort:()=>signal?.removeEventListener('abort',abort)});signal?.addEventListener('abort',abort,{once:true});
  parent.postMessage({type:'vault-asset-request',channel,id,url:url.href},'*');
 });}
 window.fetch=async(input,options={})=>{if(disposed)throw abortError();const request=input instanceof Request?input:null,u=assetURL(request?.url||String(input));if(!u){const value=request?.url||String(input);if(/^(blob:|data:)/.test(value))return nativeFetch(input,options);throw new Error('Reference fetch is restricted to its own local package');}const method=options.method||request?.method||'GET';if(method!=='GET')throw new Error('Reference transport permits only GET');const data=await bytes(u,options.signal||request?.signal);const response=new Response(data.bytes,{status:200,headers:{'content-type':data.mime,'content-length':String(data.bytes.byteLength)}});Object.defineProperty(response,'url',{value:u.href});return response;};
 const src=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src'),nativeDecode=HTMLImageElement.prototype.decode,nativeSetAttribute=HTMLImageElement.prototype.setAttribute;
 function localImage(img,value){
  const u=assetURL(value);if(!u)return null;const key=u.href;images.set(img,key);
  const task=bytes(u).then(data=>{if(disposed||images.get(img)!==key)throw abortError();const blob=URL.createObjectURL(new Blob([data.bytes],{type:data.mime}));objectURLs.add(blob);src.set.call(img,blob);});
  imageTasks.set(img,task);task.catch(error=>{if(!disposed&&images.get(img)===key){console.error('Local reference image:',error.message);img.dispatchEvent(new Event('error'));}});return task;
 }
 Object.defineProperty(HTMLImageElement.prototype,'src',{configurable:true,enumerable:src.enumerable,get:src.get,set(value){if(assetURL(value)){localImage(this,value);return;}images.delete(this);imageTasks.delete(this);if(disposed)throw abortError();src.set.call(this,value);}});
 // React and direct DOM consumers often assign attributes, then immediately decode.
 HTMLImageElement.prototype.setAttribute=function(name,value){if(String(name).toLowerCase()==='src'){this.src=value;return;}return nativeSetAttribute.call(this,name,value);};
 if(nativeDecode)HTMLImageElement.prototype.decode=function(...args){const task=imageTasks.get(this);return task?task.then(()=>nativeDecode.apply(this,args)):nativeDecode.apply(this,args);};
 const inspect=node=>{if(!(node instanceof Element)||disposed)return;const list=node.matches('img')?[node]:[...node.querySelectorAll('img')];for(const img of list){const value=img.getAttribute('src');if(value&&assetURL(value)&&images.get(img)!==new URL(value,document.baseURI).href)localImage(img,value);}};
 const observer=new MutationObserver(records=>{for(const record of records){if(record.type==='attributes')inspect(record.target);else for(const node of record.addedNodes)inspect(node);}});observer.observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
 addEventListener('click',e=>{const a=e.target.closest?.('a[href]');if(!a)return;const u=assetURL(a.href);if(u){u.searchParams.set('vaultSession',channel);a.href=u.href;}},{capture:true,signal:events.signal});
 function dispose(){if(disposed)return;disposed=true;events.abort();observer.disconnect();for(const task of pending.values()){clearTimeout(task.timer);task.removeAbort?.();task.reject(abortError());}pending.clear();for(const url of objectURLs)URL.revokeObjectURL(url);objectURLs.clear();}
 window.SourceAssetTransport={dispose,inspect:()=>({disposed,pending:pending.size,objectURLs:objectURLs.size})};
 addEventListener('pagehide',dispose,{once:true,signal:events.signal});addEventListener('vault-source-dispose',dispose,{once:true,signal:events.signal});
})();
