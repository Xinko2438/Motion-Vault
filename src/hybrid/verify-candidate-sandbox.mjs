import {readFile} from 'node:fs/promises';import path from 'node:path';import {project,root,put,sha} from '../../scripts/build-hybrid.mjs';import {withStage,withBrowser,until} from './browser-tools.mjs';
const requested=process.argv[2]?.startsWith('--')?null:process.argv[2]?.split(','),live=process.argv.includes('--live'),reports=[];

const documentURL=value=>{const url=new URL(value);url.hash='';return url.href;};
const invalidContext=error=>/Cannot find context with specified id|Execution context was destroyed|Inspected target navigated or closed|Session with given id not found|No target with given id found|Target closed|SANDBOX_DOCUMENT_CHANGED/.test(error.message);
function sandboxBinding(b,expectedURL,history){
 const contexts=new Map(),sessions=new Map(),enabled=new Set(),ownSessions=new Set();
 const key=(session,id)=>session+':'+id,expected=documentURL(expectedURL);
 let current=null;
 const off=[
  b.onEvent('Runtime.executionContextCreated',(p,session)=>{if(p.context.auxData?.isDefault)contexts.set(key(session,p.context.id),p.context);}),
  b.onEvent('Runtime.executionContextDestroyed',(p,session)=>contexts.delete(key(session,p.executionContextId))),
  b.onEvent('Runtime.executionContextsCleared',(_,session)=>{for(const [k]of contexts)if(k.startsWith(session+':'))contexts.delete(k);}),
  b.onEvent('Target.detachedFromTarget',p=>{for(const [k]of contexts)if(k.startsWith(p.sessionId+':'))contexts.delete(k);for(const [target,session]of sessions)if(session===p.sessionId)sessions.delete(target);enabled.delete(p.sessionId);})
 ];
 const findFrame=tree=>{if(tree?.frame?.url&&documentURL(tree.frame.url)===expected)return tree.frame;for(const child of tree?.childFrames||[]){const frame=findFrame(child);if(frame)return frame;}return null;};
 const command=(session,method,params={})=>b.send(method,params,session);
 return {
  async bind(deadline){
   current=null;
   while(Date.now()<deadline){
    const targets=(await b.send('Target.getTargets')).targetInfos;
    const target=targets.find(t=>t.type==='iframe'&&t.url&&documentURL(t.url)===expected);
    let session=b.sessionId;
    if(target){
     session=sessions.get(target.targetId);
     if(!session){session=(await b.send('Target.attachToTarget',{targetId:target.targetId,flatten:true})).sessionId;sessions.set(target.targetId,session);ownSessions.add(session);}
    }
    if(!enabled.has(session)){
     await command(session,'Page.enable');
     if(session===b.sessionId)await command(session,'Runtime.disable');
     await command(session,'Runtime.enable');enabled.add(session);
    }
    const frame=findFrame((await command(session,'Page.getFrameTree')).frameTree);
    const context=frame&&[...contexts].filter(([k,c])=>k.startsWith(session+':')&&c.auxData?.frameId===frame.id).map(([,c])=>c).at(-1);
    if(frame&&context){
     current={sessionId:session,targetId:target?.targetId||null,frameId:frame.id,loaderId:frame.loaderId,contextId:context.id,uniqueContextId:context.uniqueId,timeOrigin:null};
     history.push({event:'bound',at:new Date().toISOString(),url:frame.url,...current});
     return;
    }
    await b.delay(Math.min(50,Math.max(0,deadline-Date.now())));
   }
   throw new Error('Default context for the committed sandbox run document unavailable within ready budget');
  },
  async evaluate(expression){
   if(!current||!contexts.has(key(current.sessionId,current.contextId)))throw new Error('SANDBOX_DOCUMENT_CHANGED: tracked default context was destroyed');
   const bound=current;
   const wrapped='(()=>{const url=new URL(location.href);url.hash="";if(url.href!=='+JSON.stringify(expected)+')return {changed:true,href:location.href};return {href:location.href,timeOrigin:performance.timeOrigin,value:('+expression+')};})()';
   const r=await command(bound.sessionId,'Runtime.evaluate',{expression:wrapped,contextId:bound.contextId,returnByValue:true,awaitPromise:true});
   if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);
   const result=r.result?.value;
   if(result?.changed||!contexts.has(key(bound.sessionId,bound.contextId)))throw new Error('SANDBOX_DOCUMENT_CHANGED: run document changed during evaluation');
   if(!result||!Number.isFinite(result.timeOrigin))throw new Error('Sandbox evaluation did not return a document identity');
   if(bound.timeOrigin!==null&&bound.timeOrigin!==result.timeOrigin)throw new Error('SANDBOX_DOCUMENT_CHANGED: document time origin changed');
   if(bound.timeOrigin===null){bound.timeOrigin=result.timeOrigin;history.push({event:'identity',at:new Date().toISOString(),href:result.href,timeOrigin:result.timeOrigin,contextId:bound.contextId,sessionId:bound.sessionId});}
   return result.value;
  },
  async close(){
   for(const remove of off)remove();
   for(const sessionId of ownSessions){try{await b.send('Target.detachFromTarget',{sessionId});}catch(error){if(!invalidContext(error)&&!/not attached|No session/.test(error.message))history.push({event:'detach-error',error:error.message});}}
  }
 };
}

const run=s=>withBrowser(async b=>{
 const base=s.url+(live?'/app/assets':'');await b.goto(base+'/motion-vault.html?view=pending',450);await until(b,'!!window.CandidateVault');const ids=await b.evaluate('CandidateVault.items().filter(i=>i.asset).map(i=>i.id)');
 for(const id of ids.filter(id=>!requested||requested.includes(id))){
  const bindingHistory=[];let binding;
  try{
   await b.evaluate('HybridVault.open('+JSON.stringify(id)+');document.getElementById("runLocal").click()');await b.delay(1200);
   const expectedURL=await b.evaluate('document.querySelector(".local-source-frame")?.src');
   if(!expectedURL||!new URL(expectedURL).pathname.includes('/'+id+'/run/'))throw new Error('Expected local sandbox iframe missing');
   binding=sandboxBinding(b,expectedURL,bindingHistory);
   const readyDeadline=Date.now()+70*150;
   let secure,final,rebindings=0,complete=false;
   while(!complete){
    try{
     await binding.bind(readyDeadline);
     // Expansion entries publish a resource/first-render-gated Promise;
     // await fulfillment instead of treating the Promise object's truthiness as readiness.
     await binding.evaluate('(window.SourceDemo?.ready&&typeof SourceDemo.ready.then==="function")?SourceDemo.ready.then(()=>true):true');
     let ready=false,last;
     while(Date.now()<readyDeadline){
      last=await binding.evaluate('({ready:!!(window.SourceDemo?.ready||window.assetReady),errors:[...(window.sourceErrors||[]),...(window.assetErrors||[])],images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute("src")),gpu:!!navigator.gpu,canvases:[...document.querySelectorAll("canvas")].map(c=>[c.width,c.height])})');
      if(last.errors.length)throw new Error(last.errors.join('\n'));
      if(last.ready&&!last.images.length){ready=true;break;}
      await b.delay(Math.min(150,Math.max(0,readyDeadline-Date.now())));
     }
     if(!ready)throw new Error('Sandbox did not become ready '+JSON.stringify(last));
     await b.delay(1300);
     secure=await binding.evaluate('(()=>{let parentBlocked=false,storageBlocked=false;try{void parent.document.body}catch{parentBlocked=true}try{void localStorage}catch{storageBlocked=true}return{parentBlocked,storageBlocked}})()');
     if(!secure.parentBlocked||!secure.storageBlocked)throw new Error('Source isolation was lost');
     final=await binding.evaluate('({errors:[...(window.sourceErrors||[]),...(window.assetErrors||[])],canvas:[...document.querySelectorAll("canvas")].map(c=>[c.width,c.height]),images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),gpu:!!navigator.gpu})');
     if(final.errors.length)throw new Error(final.errors.join('\n'));
     if(!final.images)throw new Error('Sandbox images became incomplete after readiness');
     complete=true;
    }catch(error){
     if(!invalidContext(error)||rebindings>=2||Date.now()>=readyDeadline)throw error;
     rebindings++;bindingHistory.push({event:'rebind',at:new Date().toISOString(),attempt:rebindings,reason:error.message});
    }
   }
   const shot=await b.call('Page.captureScreenshot',{format:'jpeg',quality:80,captureBeyondViewport:false});await put(project,'lineage/current/sandbox-frames/'+id+(live?'-live':'')+'.jpg',Buffer.from(shot.data,'base64'));
   const report={id,passed:true,live,...secure,...final,bindingHistory};reports.push(report);console.log(JSON.stringify(report));
  }catch(e){reports.push({id,passed:false,live,error:e.message,bindingHistory});console.error(JSON.stringify(reports.at(-1)));}
  finally{
   if(binding)await binding.close();
   await b.evaluate('document.getElementById("modal").close()');await until(b,'document.querySelectorAll("iframe").length===0');
  }
 }
},{gpu:true});
if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);
await put(project,'lineage/current/sandbox'+(live?'-live':'')+(requested?'-'+requested.join('_'):'')+'.json',JSON.stringify({at:new Date().toISOString(),formalHash:sha(await readFile(path.join(live?path.join(project,'web'):root,'index.html'))),redirectSha256:sha(await readFile(live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html'))),candidateHash:sha(await readFile(live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html'))),reports,passed:reports.filter(r=>r.passed).length,total:reports.length},null,2));if(reports.some(r=>!r.passed))process.exitCode=1;
