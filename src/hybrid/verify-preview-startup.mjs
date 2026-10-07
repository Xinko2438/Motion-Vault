// Product-path startup regression: delayed HTTP, natural visible preparation, real hover.
// Never calls a product warm-up API, disables cache, or starts a hidden media player.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {performance as nodePerformance} from 'node:perf_hooks';
import {project,root,sha,guard} from '../../scripts/build-hybrid.mjs';
import {withBrowser,withStage,until} from './browser-tools.mjs';

const args=process.argv.slice(2),option=(key,fallback)=>{const n=args.indexOf(key);return n<0?fallback:args[n+1];};
if(args.includes('--live')&&args.includes('--stage'))throw Error('Choose --live or --stage');
const live=!args.includes('--stage'),runId=randomUUID(),runStartedAt=new Date().toISOString();
const label=option('--label','startup-'+runStartedAt.replace(/[-:.]/g,'').slice(0,16)+'-'+runId.slice(0,8));
if(!/^[a-zA-Z0-9_-]{1,70}$/.test(label))throw Error('Use a simple new --label');
const evidence='lineage/current/preview-playback',baseRoot=live?path.join(project,'web'):root;
await guard('src/hybrid/verify-preview-startup.mjs','automation');await guard(evidence,'evidence');
const verifierPath=fileURLToPath(import.meta.url),verifierSha256=sha(await readFile(verifierPath));
const mainPath=path.join(baseRoot,'index.html'),redirectPath=live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html');
const catalogPath=path.join(baseRoot,'candidate-catalog.json'),catalogBytes=await readFile(catalogPath),catalog=JSON.parse(catalogBytes);
const formalHash=sha(await readFile(mainPath)),redirectSha256=sha(await readFile(redirectPath)),catalogueHash=sha(catalogBytes);
const assets=await Promise.all(catalog.items.map(async item=>({id:item.id,video:item.asset.video,videoRevision:item.asset.videoRevision,sha256:sha(await readFile(path.join(baseRoot,item.asset.video)))})));
const output=path.join(project,evidence,label+'.json'),runOutput=path.join(project,evidence,label+'-'+runId+'.json');
try{await readFile(output);throw Error('Report label already exists; choose a fresh --label');}catch(e){if(e.code!=='ENOENT')throw e;}
const limits={entries:9,bytes:24*1024*1024,singleBytes:4*1024*1024,concurrent:1};
const injectionDocuments=[];
const checks=[],scenarios=[],network=[],interceptions=[],errors=[],delayedIds=['curated-reaction-diffusion','curated-webgpu-route'];
const ck=(scenario,name,pass,detail)=>{const c={scenario,name,pass:!!pass,...(detail===undefined?{}:{detail})};checks.push(c);if(!c.pass)console.error('FAIL '+scenario+' '+name);};
let browserCompleted=false,deadlineHit=false;

function instrument(){
  const urls=new Map(),videos=new Set(),seen=new WeakSet(),attempts=[],errors=[];
  const fetchTasks=[],responses=new WeakMap(),streams=new WeakMap(),background=new Set();let maxBackground=0;
  let armed=null,maxVideos=0,maxLayers=0,maxURLs=0,maxBytes=0,largestBlob=0;
  const create=URL.createObjectURL.bind(URL),revoke=URL.revokeObjectURL.bind(URL);
  URL.createObjectURL=function(blob){const url=create(blob);urls.set(url,{url,bytes:blob.size,type:blob.type,createdAt:performance.now(),revokedAt:null});largestBlob=Math.max(largestBlob,blob.size);const live=[...urls.values()].filter(x=>x.revokedAt===null);maxURLs=Math.max(maxURLs,live.length);maxBytes=Math.max(maxBytes,live.reduce((s,x)=>s+x.bytes,0));return url;};
  URL.revokeObjectURL=function(url){const row=urls.get(String(url));if(row)row.revokedAt=performance.now();return revoke(url);};
  // Observe existing reads only: never clone a response or consume an extra byte.
  const nativeFetch=window.fetch.bind(window),nativeGetReader=ReadableStream.prototype.getReader;
  const endTask=(task,reason)=>{if(task.endedAt!==null)return;task.endedAt=performance.now();task.endReason=reason;background.delete(task);task.removeAbort?.();delete task.removeAbort;};
  const consumed=(task,method,operation)=>{
    task.consumeMethod=method;task.consumeStartedAt??=performance.now();
    let result;try{result=operation();}catch(error){endTask(task,'consume-error');throw error;}
    return Promise.resolve(result).then(value=>{task.bodyConsumedAt=performance.now();endTask(task,'body-consumed');return value;},error=>{endTask(task,task.abortAt!==null?'aborted':'consume-error');throw error;});
  };
  for(const method of ['arrayBuffer','blob','text','json','formData']){
    const native=Response.prototype[method];Response.prototype[method]=function(...args){const task=responses.get(this);return task?consumed(task,method,()=>Reflect.apply(native,this,args)):Reflect.apply(native,this,args);};
  }
  ReadableStream.prototype.getReader=function(...args){
    const reader=Reflect.apply(nativeGetReader,this,args),task=streams.get(this);if(!task)return reader;
    const nativeRead=reader.read.bind(reader),nativeCancel=reader.cancel.bind(reader);
    reader.read=function(...readArgs){
      task.consumeMethod='reader.read';task.consumeStartedAt??=performance.now();task.readCalls=(task.readCalls||0)+1;
      let result;try{result=nativeRead(...readArgs);}catch(error){endTask(task,'consume-error');throw error;}
      return result.then(value=>{if(value.done){task.bodyConsumedAt=performance.now();endTask(task,'body-consumed');}return value;},error=>{endTask(task,task.abortAt!==null?'aborted':'consume-error');throw error;});
    };
    reader.cancel=function(...cancelArgs){task.cancelAt=performance.now();endTask(task,'reader-canceled');return nativeCancel(...cancelArgs);};
    return reader;
  };
  const nativeStreamCancel=ReadableStream.prototype.cancel;
  ReadableStream.prototype.cancel=function(...args){const task=streams.get(this);if(task){task.cancelAt=performance.now();endTask(task,'stream-canceled');}return Reflect.apply(nativeStreamCancel,this,args);};
  window.fetch=function(input,init){
    const url=new URL(input instanceof Request?input.url:String(input),location.href),headers=new Headers(init?.headers||(input instanceof Request?input.headers:undefined));
    if(url.origin!==location.origin||!url.pathname.includes('/motion-vault-assets/')||!url.pathname.endsWith('.mp4'))return nativeFetch(input,init);
    const role=headers.get('X-Vault-Verification-Read')==='preview-startup'?'test-byte-read':'product';
    const signal=init?.signal||(input instanceof Request?input.signal:undefined);
    const task={sequence:fetchTasks.length+1,url:url.href,role,startedAt:performance.now(),headersAt:null,consumeStartedAt:null,bodyConsumedAt:null,abortAt:null,cancelAt:null,endedAt:null,endReason:null};fetchTasks.push(task);
    const onAbort=()=>{task.abortAt=performance.now();endTask(task,'aborted');};
    if(signal?.aborted)onAbort();else{
      if(role==='product'){background.add(task);maxBackground=Math.max(maxBackground,background.size);}
      if(signal){signal.addEventListener('abort',onAbort,{once:true});task.removeAbort=()=>signal.removeEventListener('abort',onAbort);}
    }
    let result;try{result=nativeFetch(input,init);}catch(error){endTask(task,'fetch-error');throw error;}
    return result.then(response=>{task.headersAt=performance.now();responses.set(response,task);if(response.body)streams.set(response.body,task);else endTask(task,'no-body');return response;},error=>{endTask(task,task.abortAt!==null?'aborted':'fetch-error');throw error;});
  };
  const state=v=>({connected:v.isConnected,paused:v.paused,src:v.getAttribute('src'),currentSrc:v.currentSrc,networkState:v.networkState,card:v.closest('.card')?.dataset.id??null});
  function scan(){
    const all=[...document.querySelectorAll('video')],layers=document.querySelectorAll('.preview-layer').length;
    maxVideos=Math.max(maxVideos,all.length);maxLayers=Math.max(maxLayers,layers);
    for(const v of all){
      videos.add(v);if(seen.has(v))continue;seen.add(v);
      const a=armed;if(!a||v.closest('.card')?.dataset.id!==a.id)continue;
      a.createdAt=performance.now();
      const frame=(now,m)=>{if(!v.isConnected||armed!==a)return;a.frames++;if(a.firstAt===null){a.firstAt=performance.now();a.rvfcNow=now;a.firstMediaTime=m.mediaTime;a.source=v.currentSrc||v.src;}a.lastMediaTime=m.mediaTime;if(a.frames<12)v.requestVideoFrameCallback(frame);};
      v.requestVideoFrameCallback(frame);
    }
  }
  new MutationObserver(scan).observe(document,{subtree:true,childList:true});
  document.addEventListener('pointerover',event=>{if(armed&&armed.hoverAt===null&&event.target.closest?.('.card')?.dataset.id===armed.id){armed.hoverAt=performance.now();armed.trusted=event.isTrusted;}},true);
  addEventListener('error',e=>errors.push(e.message));addEventListener('unhandledrejection',e=>errors.push(String(e.reason)));
  window.__startupProbe={
    arm(id,name){armed={id,name,armedAt:performance.now(),hoverAt:null,trusted:false,createdAt:null,firstAt:null,source:null,frames:0};attempts.push(armed);return armed.armedAt;},
    current(){return armed?{...armed,firstFrameMs:armed.firstAt===null||armed.hoverAt===null?null:armed.firstAt-armed.hoverAt}:null;},
    snapshot(){scan();return {now:performance.now(),timeOrigin:performance.timeOrigin,videoCount:document.querySelectorAll('video').length,layerCount:document.querySelectorAll('.preview-layer').length,active:window.HybridVault?.active(),maxVideos,maxLayers,maxURLs,maxBytes,largestBlob,urls:[...urls.values()],videoStates:[...videos].map(state),preparationAudit:{basis:'same-document-fetch-body-or-cancel',maxBackground,currentBackground:background.size,tasks:fetchTasks.map(({removeAbort,...task})=>task)},attempts:attempts.map(a=>({...a,firstFrameMs:a.firstAt===null||a.hoverAt===null?null:a.firstAt-a.hoverAt})),errors};}
  };
}
const run=async origin=>withBrowser(async b=>{
  const requestMap=new Map(),fetchInFlight=new Set(),documentAudits=new Map(),off=[],timers=new Set();
  const documentsByLoader=new Map(),heldKeys=new Set(),continuations=new Set();
  let maxConcurrent=0,phase='navigation',timeout,currentLoaderId=null,currentDocument=null,pendingDocument=null;
  const mediaURL=id=>{const asset=assets.find(a=>a.id===id);if(!asset)throw Error('Unknown target '+id);const u=new URL(asset.video,origin+'/');u.searchParams.set('v',asset.videoRevision);return u.href;};
  const targets=new Map(delayedIds.map(id=>[mediaURL(id),id]));
  const requestIsMedia=url=>url.startsWith(origin+'/motion-vault-assets/')&&new URL(url).pathname.endsWith('.mp4');
  try{
    timeout=setTimeout(()=>{deadlineHit=true;errors.push('60 second browser budget exceeded');b.send('Browser.close').catch(()=>{});},60000);
    await b.call('Network.enable');
    off.push(b.onEvent('Page.frameNavigated',p=>{
      if(p.frame.parentId)return;currentLoaderId=p.frame.loaderId;
      if(pendingDocument){currentDocument=pendingDocument;pendingDocument=null;Object.assign(currentDocument,{loaderId:currentLoaderId,frameId:p.frame.id,committedAt:Date.now(),committedMonoMs:nodePerformance.now()});documentsByLoader.set(currentLoaderId,currentDocument);}
      for(const requestId of [...fetchInFlight]){
        const row=requestMap.get(requestId);if(row&&row.loaderId!==currentLoaderId){row.retired={reason:'navigation-ended',at:Date.now(),nextLoaderId:currentLoaderId};fetchInFlight.delete(requestId);}
      }
    }));
    off.push(b.onEvent('Network.requestWillBeSent',p=>{
      if(!requestIsMedia(p.request.url))return;
      const testRead=Object.entries(p.request.headers||{}).some(([k,v])=>k.toLowerCase()==='x-vault-verification-read'&&v==='preview-startup');
      const row={event:'request',requestId:p.requestId,loaderId:p.loaderId,documentId:documentsByLoader.get(p.loaderId)?.id??null,url:p.request.url,resourceType:p.type,role:testRead?'test-byte-read':'product',timestamp:p.timestamp,wallTime:p.wallTime,receivedAt:Date.now(),phase,finished:false};
      requestMap.set(p.requestId,row);network.push(row);
      if(p.type==='Fetch'&&!testRead){if(currentLoaderId&&p.loaderId!==currentLoaderId)row.retired={reason:'navigation-ended',at:Date.now(),nextLoaderId:currentLoaderId};else{fetchInFlight.add(p.requestId);maxConcurrent=Math.max(maxConcurrent,fetchInFlight.size);}}
    }));
    off.push(b.onEvent('Network.loadingFinished',p=>{const row=requestMap.get(p.requestId);if(row){row.finished=true;row.finishedTimestamp=p.timestamp;row.finishedAt=Date.now();row.encodedDataLength=p.encodedDataLength;}fetchInFlight.delete(p.requestId);}));
    off.push(b.onEvent('Network.loadingFailed',p=>{const row=requestMap.get(p.requestId);if(row){row.failed=p.errorText;row.canceled=p.canceled;row.failedTimestamp=p.timestamp;row.finishedAt=Date.now();row.terminalObservedMonoMs=nodePerformance.now();}fetchInFlight.delete(p.requestId);}));
    off.push(b.onEvent('Fetch.requestPaused',p=>{
      const target=targets.get(p.request.url);if(!target){b.call('Fetch.continueRequest',{requestId:p.requestId}).catch(e=>errors.push(String(e)));return;}
      const request=requestMap.get(p.networkId),document=documentsByLoader.get(request?.loaderId)||(currentDocument?.frameId===p.frameId?currentDocument:null);
      const key=(document?.id||'unresolved')+'|'+p.request.url,held=!heldKeys.has(key);if(held)heldKeys.add(key);
      const pausedMonoMs=nodePerformance.now(),row={id:target,url:p.request.url,requestId:p.requestId,networkId:p.networkId,
        resourceType:p.resourceType,frameId:p.frameId,documentId:document?.id??null,loaderId:request?.loaderId||document?.loaderId||null,
        identityBasis:request?'network-loader':'committed-frame',pausedAt:Date.now(),pausedMonoMs,phase:document?.phase||phase,
        decision:held?'held':'passthrough',reason:held?'first-target-request-in-document':'first-request-fault-already-consumed',
        delayMs:held?1000:0,scheduledDueMonoMs:held?pausedMonoMs+1000:null,callbackMonoMs:null,earlyCallbackMonoMs:[],
        continueSendMonoMs:null,ackMonoMs:null,actualHoldMs:null,timingValid:null};interceptions.push(row);
      let complete;const completion=new Promise(resolve=>{complete=resolve;});continuations.add(completion);
      const release=()=>{
        row.continueSendMonoMs=nodePerformance.now();row.continuedAt=Date.now();
        row.actualHoldMs=row.continueSendMonoMs-row.pausedMonoMs;row.actualDelayMs=row.actualHoldMs;
        row.timingValid=held?row.actualHoldMs>=1000&&row.actualHoldMs<=1250:null;
        b.call('Fetch.continueRequest',{requestId:p.requestId}).then(()=>{row.ackMonoMs=nodePerformance.now();row.ackAt=Date.now();},
          e=>{row.ackMonoMs=nodePerformance.now();row.ackAt=Date.now();row.continueError=String(e);})
          .finally(()=>{continuations.delete(completion);complete();});
      };
      if(!held){release();return;}
      const wake=()=>{
        const now=nodePerformance.now();
        if(now<row.scheduledDueMonoMs){row.earlyCallbackMonoMs.push(now);arm(row.scheduledDueMonoMs-now);return;}
        row.callbackMonoMs=now;release();
      };
      const arm=remaining=>{const timer=setTimeout(()=>{timers.delete(timer);wake();},remaining);timers.add(timer);};
      arm(1000);
    }));
    await b.call('Fetch.enable',{patterns:[...targets.keys()].map(urlPattern=>({urlPattern,requestStage:'Request'}))});
    await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'('+instrument.toString()+')()'});
    async function load(){
      await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});
      pendingDocument={id:'document-'+(injectionDocuments.length+1),phase,requestedAt:Date.now(),requestedMonoMs:nodePerformance.now(),loaderId:null,frameId:null};injectionDocuments.push(pendingDocument);
      await b.goto(origin+'/motion-vault.html?view=pending',350);await until(b,'!!window.CandidateVault&&!!window.__startupProbe',4000);
    }
    async function position(id){
      await b.evaluate('document.querySelector('+JSON.stringify('.card[data-id="'+id+'"]')+').scrollIntoView({block:"center",behavior:"instant"})');
      await b.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
      return b.evaluate('(()=>{const card=document.querySelector('+JSON.stringify('.card[data-id="'+id+'"]')+'),r=card.querySelector(".stage").getBoundingClientRect(),p={x:r.x+r.width*.44,y:r.y+r.height*.46};return {...p,visible:r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth,hit:card.contains(document.elementFromPoint(p.x,p.y)),at:performance.now()};})()');
    }
    async function enter(id,name,point){
      ck(name,'Real hover target is visible and hit tested',point.visible&&point.hit,point);
      await b.evaluate('__startupProbe.arm('+JSON.stringify(id)+','+JSON.stringify(name)+')');
      await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});
    }
    async function firstFrame(name){
      const started=Date.now();while(Date.now()-started<3500&&!deadlineHit){const current=await b.evaluate('__startupProbe.current()');if(current?.firstAt!==null&&current?.firstAt!==undefined)return current;await b.delay(40);}
      const current=await b.evaluate('__startupProbe.current()');ck(name,'A real frame arrived within bounded observation',false,current);return current;
    }
    async function leave(){await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(60);}
    async function identity(id){
      return b.evaluate('(async()=>{const v=document.querySelector('+JSON.stringify('.card[data-id="'+id+'"] video')+');if(!v)return {exists:false};const url=v.currentSrc||v.src,bytes=await fetch(url,{signal:AbortSignal.timeout(4000),headers:new URL(url).protocol==="http:"?{"X-Vault-Verification-Read":"preview-startup"}:undefined}).then(r=>{if(!r.ok)throw Error("Playback byte fetch "+r.status);return r.arrayBuffer()});const hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)),x=>x.toString(16).padStart(2,"0")).join("");return {exists:true,url,protocol:new URL(url).protocol,sha256:hash,bytes:bytes.byteLength,sameSource:(v.currentSrc||v.src)===url,connected:v.isConnected};})()');
    }
    function released(snapshot){return snapshot.videoCount===0&&snapshot.layerCount===0&&snapshot.active===null&&snapshot.videoStates.every(v=>v.paused&&v.src===null&&!v.connected);}
    function resourceChecks(name,snapshot){
      documentAudits.set(snapshot.timeOrigin,{timeOrigin:snapshot.timeOrigin,scenario:name,...snapshot.preparationAudit});
      ck(name,'No background or simultaneous player',snapshot.maxVideos<=1&&snapshot.maxLayers<=1,snapshot);
      ck(name,'No page errors in this scenario',snapshot.errors.length===0,snapshot.errors);
      ck(name,'Object URLs stay within the declared cache budget',snapshot.maxURLs<=limits.entries&&snapshot.maxBytes<=limits.bytes&&snapshot.largestBlob<=limits.singleBytes,{maxURLs:snapshot.maxURLs,maxBytes:snapshot.maxBytes,largestBlob:snapshot.largestBlob,limits});
    }
    async function clickView(view){
      const selector='#viewTabs [data-view="'+view+'"]';
      await b.evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"center",behavior:"instant"})');
      await b.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
      const p=await b.evaluate('(()=>{const el=document.querySelector('+JSON.stringify(selector)+'),r=el.getBoundingClientRect(),p={x:r.x+r.width/2,y:r.y+r.height/2};if(!el.contains(document.elementFromPoint(p.x,p.y)))throw Error("State tab not hittable");return p;})()');
      await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',buttons:1,clickCount:1});await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',buttons:0,clickCount:1});
      if(await b.evaluate('document.body.dataset.view')!==view)throw Error('Real state tab click did not switch view');
    }
    async function scenario(name,task){if(deadlineHit)return;phase=name;try{await task();}catch(e){ck(name,'Scenario completed',false,String(e.stack||e));errors.push(name+': '+String(e));try{await leave();}catch{}}}

    await scenario('A',async()=>{
      await load();const id=delayedIds[0],point=await position(id),visibleAt=point.at;
      await b.delay(1500);const before=await b.evaluate('__startupProbe.snapshot()'),prior=network.filter(r=>r.url===mediaURL(id)),beforeCount=prior.length;
      ck('A','Visible reading starts no video',before.videoCount===0&&before.layerCount===0&&before.active===null,before);
      await enter(id,'A',point);const frame=await firstFrame('A'),afterCount=network.filter(r=>r.url===mediaURL(id)).length;
      const prepared=prior.filter(r=>r.resourceType==='Fetch'&&r.role==='product');
      ck('A','Preparation starts before hover and reuses one result',prepared.length===1&&prepared[0].wallTime*1000<=before.timeOrigin+frame.hoverAt&&frame.source?.startsWith('blob:'),{visibleAt,readMs:before.now-visibleAt,requests:prepared,hoverAt:frame?.hoverAt,actualSource:frame?.source});
      ck('A','First real frame is below the existing 800ms limit',frame?.trusted===true&&Number.isFinite(frame.firstFrameMs)&&frame.firstFrameMs<800,frame);
      ck('A','Hover does not initiate another target HTTP request',beforeCount>0&&afterCount===beforeCount,{beforeCount,afterCount});
      const bytes=await identity(id),asset=assets.find(x=>x.id===id);
      ck('A','Actual Blob playback bytes match the current source',bytes.exists&&bytes.protocol==='blob:'&&bytes.sameSource&&bytes.connected&&bytes.sha256===asset.sha256&&asset.videoRevision===asset.sha256.slice(0,16),{...bytes,expectedSha256:asset.sha256});
      await leave();const after=await b.evaluate('__startupProbe.snapshot()');ck('A','Leaving releases the player',released(after),after);resourceChecks('A',after);
      const blob=after.urls.find(entry=>entry.url===bytes.url),request=prepared[0];
      const preparation={stateAtHover:blob?blob.createdAt<=frame.hoverAt?'complete':'in-flight':prepared.length?'unknown':'not-started',blobCreatedAt:blob?.createdAt??null,hoverAt:frame?.hoverAt??null,completedBeforeHover:blob?blob.createdAt<=frame.hoverAt:null,httpFinishedAtPageMs:request?.finishedTimestamp===undefined?null:request.wallTime*1000+(request.finishedTimestamp-request.timestamp)*1000-before.timeOrigin,httpCompletionObservedAt:request?.finishedAt??null};
      scenarios.push({name:'A',id,visibleAt,fixedReadMs:1500,before,frame,preparation,identity:bytes,after});
    });
    await scenario('B',async()=>{
      await load();const id=delayedIds[1],point=await position(id);await enter(id,'B-cold',point);await b.delay(150);await leave();
      const left=await b.evaluate('__startupProbe.snapshot()');
      ck('B','Cold hover was abandoned while its delayed request was outstanding',left.attempts.some(a=>a.name==='B-cold'&&a.trusted&&a.firstAt===null)&&released(left)&&interceptions.some(x=>x.id===id&&x.phase==='B'&&x.documentId===currentDocument?.id&&x.decision==='held'&&x.pausedAt<=left.timeOrigin+left.now&&(!x.continuedAt||x.continuedAt>left.timeOrigin+left.now)),{left,requests:interceptions.filter(x=>x.id===id&&x.phase==='B')});
      await b.delay(1500);const late=await b.evaluate('__startupProbe.snapshot()');
      ck('B','Late media completion does not resurrect a departed preview',released(left)&&released(late),{left,late});
      const again=await position(id);await enter(id,'B-recover',again);const frame=await firstFrame('B');
      ck('B','A later real hover resumes playback',frame?.trusted===true&&Number.isFinite(frame.firstFrameMs)&&frame.frames>0,frame);
      const bytes=await identity(id),asset=assets.find(x=>x.id===id);
      ck('B','Recovered player uses the correct media bytes',bytes.exists&&bytes.sameSource&&bytes.sha256===asset.sha256,{...bytes,expectedSha256:asset.sha256});
      await leave();const after=await b.evaluate('__startupProbe.snapshot()');ck('B','Recovered player is released',released(after),after);resourceChecks('B',after);
      scenarios.push({name:'B',id,coldFirstFrameLimitClaimed:false,leaveAfterMs:150,left,late,frame,identity:bytes,after});
    });
    await scenario('C',async()=>{
      await load();await position(delayedIds[0]);await b.delay(1500);
      const points=await b.evaluate('[...document.querySelectorAll(".card")].map(card=>{const r=card.querySelector(".stage").getBoundingClientRect(),p={id:card.dataset.id,x:r.x+r.width*.44,y:r.y+r.height*.46};return {...p,visible:r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth,hit:card.contains(document.elementFromPoint(p.x,p.y)),distance:Math.abs(r.y+r.height/2-innerHeight/2)};}).filter(p=>p.visible&&p.hit).sort((a,b)=>a.distance-b.distance).slice(0,2)');
      if(points.length!==2)throw Error('Two fully visible cards are required for switching');
      const steps=[];for(let n=0;n<4;n++){const p=points[n%2];await enter(p.id,'C-switch-'+n,p);await b.delay(220);steps.push(await b.evaluate('__startupProbe.snapshot()'));}
      ck('C','Fast card switches never overlap players',steps.every(s=>s.maxVideos<=1&&s.maxLayers<=1&&s.videoCount<=1),steps);
      ck('C','Two naturally prepared cards really produced frames',steps.some(s=>s.attempts.some(a=>a.id===points[0].id&&a.firstAt!==null))&&steps.some(s=>s.attempts.some(a=>a.id===points[1].id&&a.firstAt!==null)),steps.map(s=>s.attempts));
      // A real state-tab click invokes the product render path.
      await clickView('library');await b.delay(1100);
      const rendered=await b.evaluate('__startupProbe.snapshot()');ck('C','Render releases old players and late tasks stay detached',released(rendered),rendered);
      await clickView('pending');const resumedPoint=await position(delayedIds[0]);await b.delay(1500);await enter(delayedIds[0],'C-before-pagehide',resumedPoint);const pagehideFrame=await firstFrame('C');
      ck('C','Pagehide begins with a genuinely playing preview',pagehideFrame?.trusted===true&&pagehideFrame.firstAt!==null,pagehideFrame);
      // Exercise the actual registered lifecycle handler; this is explicitly synthetic.
      await b.evaluate('dispatchEvent(new PageTransitionEvent("pagehide",{persisted:false}))');await b.delay(1100);
      const hidden=await b.evaluate('__startupProbe.snapshot()');
      ck('C','Pagehide releases players and object URLs',released(hidden)&&hidden.urls.every(x=>x.revokedAt!==null),hidden);
      resourceChecks('C',hidden);scenarios.push({name:'C',points,fixedReadMs:1500,steps,rendered,pagehide:{syntheticLifecycleEvent:true,frame:pagehideFrame,snapshot:hidden}});
    });
    await Promise.allSettled([...continuations]);
    for(const row of interceptions){const request=requestMap.get(row.networkId);row.networkCanceled=request?.canceled===true;row.networkError=request?.failed??null;row.networkDocumentId=request?.documentId??null;row.networkLoaderId=request?.loaderId??null;}
    const audits=[...documentAudits.values()];
    ck('all','Preparation fetch concurrency stays bounded',audits.length===3&&audits.every(a=>a.maxBackground<=limits.concurrent),{basis:'same-document uncanceled product fetch through body consumption',limit:limits.concurrent,documents:audits,cdpObservation:{maxOutstandingRequests:maxConcurrent,currentLoaderId,pending:[...fetchInFlight],retiredRequests:[...requestMap.values()].filter(r=>r.retired),interpretation:'Diagnostic only: terminal event delivery may follow in-page abort. Navigation retires old loaders; test byte reads are excluded.'}});
    const held=interceptions.filter(row=>row.decision==='held'),groups=new Map();
    for(const row of interceptions){const key=row.documentId+'|'+row.id;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(row);}
    ck('all','Injected requests were actually held for at least 1000ms',delayedIds.every(id=>held.some(x=>x.id===id&&x.actualHoldMs>=1000)),interceptions);
    ck('all','Each document target receives only its first request fault',injectionDocuments.length===3&&new Set(injectionDocuments.map(d=>d.loaderId)).size===3&&
      interceptions.every(row=>row.documentId&&row.loaderId&&row.networkDocumentId===row.documentId&&row.networkLoaderId===row.loaderId)&&
      [...groups.values()].every(rows=>rows[0].decision==='held'&&rows.slice(1).every(row=>row.decision==='passthrough')),
      {scope:'first matching request per loaded document and target, including a subsequently canceled request',documents:injectionDocuments,groups:[...groups].map(([key,rows])=>({key,decisions:rows.map(row=>row.decision)}))});
    ck('all','A and B each received their required first-request delay',[['A',delayedIds[0]],['B',delayedIds[1]]].every(([scenario,id])=>
      held.filter(row=>row.phase===scenario&&row.id===id&&row.actualHoldMs>=1000).length===1),held);
    ck('all','Fault timing stays within the declared 1000–1250ms range',held.length>0&&held.every(row=>row.timingValid===true)&&
      interceptions.every(row=>Number.isFinite(row.ackMonoMs)&&(!row.continueError||row.networkCanceled)),
      {clock:'Node performance.now; pause receipt through continue send, without subtraction from product timing',minimumMs:1000,maximumMs:1250,decisions:interceptions});
    const pageErrors=await b.evaluate('__startupProbe.snapshot().errors');ck('all','No page errors',pageErrors.length===0,pageErrors);
    browserCompleted=!deadlineHit;
  }finally{
    clearTimeout(timeout);for(const timer of timers)clearTimeout(timer);for(const remove of off)remove();
    try{await b.call('Fetch.disable');}catch{}
  }
},{gpu:true});
try{if(live)await run('http://127.0.0.1:4380/app/assets');else await withStage(root,s=>run(s.url));}catch(e){ck('all','Browser suite completed',false,String(e.stack||e));errors.push(String(e));}
let sourceUnchanged=sha(await readFile(verifierPath))===verifierSha256&&sha(await readFile(mainPath))===formalHash&&sha(await readFile(redirectPath))===redirectSha256&&sha(await readFile(catalogPath))===catalogueHash;
for(const asset of assets)if(sha(await readFile(path.join(baseRoot,asset.video)))!==asset.sha256)sourceUnchanged=false;
ck('all','Measured source remained unchanged',sourceUnchanged);
const passed=checks.filter(c=>c.pass).length;
const report={schema:'motion-vault.preview-startup.v1',runId,runStartedAt,at:new Date().toISOString(),label,live,formalHash,redirectSha256,candidateHash:redirectSha256,verifierSha256,catalogueHash,sourceUnchanged,browserCompleted,browserClosed:true,allPassed:passed===checks.length&&browserCompleted,passed,total:checks.length,limits,contract:{requestDelayMs:1000,requestDelayMaximumMs:1250,requestFaultScope:'first matching request per loaded document and target',canceledFirstRequestConsumesFault:true,subsequentTargetRequests:'passthrough',faultClock:'Node performance.now: pause receipt to continue send',timingFidelityRequired:true,fixedVisibleReadingMs:1500,firstFrameLimitMs:800,usesProductPreparationOnly:true,cacheDisabled:false,backgroundPlayersAllowed:0,liveFPSClaimed:false,preparationMayStillBeInFlightAtHover:true,backgroundConcurrencyClock:'same-document fetch start through body-consume/cancel/abort',testByteReadsExcluded:true},assets,scenarios,network,injectionDocuments,interceptions,errors,checks};
await mkdir(path.dirname(output),{recursive:true});
const text=JSON.stringify(report,null,2)+'\n';await writeFile(runOutput,text,{flag:'wx'});await writeFile(output,text,{flag:'wx'});
console.log(JSON.stringify({runId,label,live,passed,total:report.total,allPassed:report.allPassed,formalHash,verifierSha256,sourceUnchanged,browserCompleted,report:output,runReport:runOutput,failures:checks.filter(c=>!c.pass).map(c=>({scenario:c.scenario,name:c.name}))},null,2));
if(!report.allPassed)process.exitCode=1;
