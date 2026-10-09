// Exercise the user's actual preview -> local interactive -> preview path.
// The browser is disposable. No user browser storage, permissions or source code is changed.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {project,root,put,sha,guard} from './build-hybrid.mjs';
import {withStage,withBrowser,until} from '../src/hybrid/browser-tools.mjs';
const live=process.argv.includes('--live'),baseRoot=live?path.join(project,'web'):root;
const runId=randomUUID(),startedAt=new Date().toISOString(),checks=[];
const initialHash=sha(await readFile(path.join(baseRoot,'index.html')));
await guard('lineage/current/interaction-switch','evidence');
const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});if(!pass)console.error('FAIL '+name);};
async function sourceContext(b,url){
 const contexts=new Map(),off=b.onEvent('Runtime.executionContextCreated',(p,s)=>{if(p.context.auxData?.isDefault)contexts.set(s+':'+p.context.id,{...p.context,sessionId:s});});
 let attached=null;
 try{
  const deadline=Date.now()+12000;let session=b.sessionId,enabled=false;
  while(Date.now()<deadline){
   const target=(await b.send('Target.getTargets')).targetInfos.find(t=>t.type==='iframe'&&t.url===url);
   if(target&&!attached){attached=(await b.send('Target.attachToTarget',{targetId:target.targetId,flatten:true})).sessionId;session=attached;enabled=false;}
   if(!enabled){await b.send('Page.enable',{},session);if(!attached)await b.send('Runtime.disable',{},session);await b.send('Runtime.enable',{},session);enabled=true;}
   const find=t=>{if(t?.frame?.url===url)return t.frame;for(const c of t?.childFrames||[]){const r=find(c);if(r)return r;}return null;};
   const f=find((await b.send('Page.getFrameTree',{},session)).frameTree),c=f&&[...contexts.values()].find(c=>c.sessionId===session&&c.auxData.frameId===f.id);
   if(c){
    const evaluate=async expression=>{const r=await b.send('Runtime.evaluate',{expression,contextId:c.id,awaitPromise:true,returnByValue:true},session);if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value;};
    if(await evaluate('location.href')!==url)throw Error('Wrong source document');
    return{evaluate,close:async()=>{off();if(attached)await b.send('Target.detachFromTarget',{sessionId:attached});}};
   }
   await b.delay(80);
  }
  throw Error('Source context unavailable');
 }catch(e){off();if(attached)await b.send('Target.detachFromTarget',{sessionId:attached}).catch(()=>{});throw e;}
}
const run=server=>withBrowser(async b=>{
 const base=server.url+(live?'/app/assets':''),url=base+'/motion-vault.html?view=pending';
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__switchErrors=[];addEventListener("error",e=>__switchErrors.push(e.message));addEventListener("unhandledrejection",e=>__switchErrors.push(String(e.reason)));'});
 await b.goto(url,600);await until(b,'!!window.HybridVault');
 const click=async selector=>{
  await b.evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})');await b.delay(70);
  const r=await b.evaluate('(()=>{const e=document.querySelector('+JSON.stringify(selector)+'),r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;return{x,y,hit:e.contains(document.elementFromPoint(x,y)),width:r.width,height:r.height};})()');
  if(!r.hit||!r.width||!r.height)throw Error('Unhittable button '+selector);
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:r.x,y:r.y});
  await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:r.x,y:r.y,button:'left',buttons:1,clickCount:1});
  await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:r.x,y:r.y,button:'left',buttons:0,clickCount:1});await b.delay(70);
 };
 const hover=async id=>{
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});
  await b.evaluate('document.querySelector('+JSON.stringify('.card[data-id="'+id+'"]')+').scrollIntoView({block:"center",behavior:"instant"})');await b.delay(90);
  const r=await b.evaluate('(()=>{const r=document.querySelector('+JSON.stringify('.card[data-id="'+id+'"] .stage')+').getBoundingClientRect();return{x:r.x+r.width*.6,y:r.y+r.height*.75}})()');
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...r});return r;
 };
 const privateKeys=['motion_vault_bookmarks','motion_vault_curation_v1','motion-vault-curated-originals-30-v1'];
 const snapshot=()=>b.evaluate('JSON.stringify('+JSON.stringify(privateKeys)+'.map(k=>[k,localStorage.getItem(k)]))');
 const beforePrivate=await snapshot();
 check('Both gallery mode buttons are visible',await b.evaluate('[...document.querySelectorAll("#previewModes button")].length===2&&[...document.querySelectorAll("#previewModes button")].every(b=>b.getClientRects().length>0)'));
 check('Lightweight preview is the default',await b.evaluate('document.body.dataset.previewMode==="preview"'));
 await hover('curated-tooltip-gallery');await until(b,'document.querySelector(".preview-layer video")?.currentTime>0',9000);
 check('Preview hover plays a video without a source iframe',await b.evaluate('document.querySelectorAll(".preview-layer video").length===1&&document.querySelectorAll("iframe").length===0'));
 await click('#previewModes [data-preview-mode=interactive]');
 check('Switching to real mode releases the video',await b.evaluate('document.body.dataset.previewMode==="interactive"&&document.querySelectorAll(".preview-layer video").length===0'));
 await hover('curated-tooltip-gallery');await until(b,'!!document.querySelector(".card[data-id=curated-tooltip-gallery] iframe")');
 const frameURL=await b.evaluate('document.querySelector(".local-source-frame").src');
 const source=await sourceContext(b,frameURL);
 try{
  let ready=false;for(let i=0;i<80;i++){if(await source.evaluate('!!(window.SourceDemo?.ready||window.assetReady)&&!document.body.classList.contains("loading")')){ready=true;break;}await b.delay(150);}
  check('Real source document becomes ready inside the card',ready);
  check('Real mode keeps the source isolated',await source.evaluate('(()=>{let p=false,s=false;try{void parent.document.body}catch{p=true}try{void localStorage}catch{s=true}return p&&s;})()'));
  await source.evaluate('window.__nativeInput=[];for(const type of ["pointermove","mouseover","click"])document.addEventListener(type,e=>{if(window.__nativeInput.length<100)__nativeInput.push({type,trusted:e.isTrusted,target:!!e.target.closest?.("[data-tooltip]")});},true)');
  const sourcePoint=async selector=>{
   const r=await source.evaluate('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
   const outer=await b.evaluate('(()=>{const r=document.querySelector(".local-source-frame").getBoundingClientRect();return{x:r.x,y:r.y,s:r.width/1100}})()');
   return{x:outer.x+r.x*outer.s,y:outer.y+r.y*outer.s};
  };
  // A move to the existing pointer coordinates need not produce a native event.
  const away=await b.evaluate('(()=>{const r=document.querySelector(".local-source-frame").getBoundingClientRect();return{x:r.x+8,y:r.y+8}})()');
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...away});await b.delay(100);
  const tipBefore=await source.evaluate('(()=>{const s=getComputedStyle(document.querySelector(".tooltip"));return{opacity:s.opacity,visibility:s.visibility,transform:s.transform}})()');
  const p=await sourcePoint('[data-tooltip]');await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await b.delay(1000);
  const tipAfter=await source.evaluate('(()=>{const s=getComputedStyle(document.querySelector(".tooltip"));return{opacity:s.opacity,visibility:s.visibility,transform:s.transform}})()');
  const events=await source.evaluate('window.__nativeInput');
  check('Native trusted mouse hover reaches the real source',events.some(e=>e.trusted&&e.target&&['pointermove','mouseover'].includes(e.type)),events);
  check('The actual tooltip responds to hover',JSON.stringify(tipBefore)!==JSON.stringify(tipAfter),{before:tipBefore,after:tipAfter});
  await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',buttons:1,clickCount:1});await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',buttons:0,clickCount:1});await b.delay(800);
  check('A real source click does not open the gallery detail',await b.evaluate('!document.getElementById("modal").open&&document.querySelectorAll("iframe").length===1')&&await source.evaluate('__nativeInput.some(e=>e.type==="click"&&e.trusted&&e.target)'));
  check('Real card runs code rather than a video',await b.evaluate('document.querySelectorAll(".preview-layer video").length===0&&HybridVault.active()?.kind==="local-source-interactive"'));
 }finally{await source.close();}
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(120);
 check('Leaving the real card releases its source iframe',await b.evaluate('document.querySelectorAll("iframe,.preview-layer").length===0'));
 await hover('curated-liquid-grid');await until(b,'!!document.querySelector(".card[data-id=curated-liquid-grid] iframe")');await b.delay(2200);
 const grid=await sourceContext(b,await b.evaluate('document.querySelector(".local-source-frame").src'));
 try{
  await grid.evaluate('window.__dragInput=[];for(const type of ["pointerdown","pointermove","pointerup"])document.addEventListener(type,e=>{if(__dragInput.length<100)__dragInput.push({type,trusted:e.isTrusted,buttons:e.buttons,x:e.clientX,y:e.clientY});},true)');
  const r=await b.evaluate('(()=>{const r=document.querySelector(".local-source-frame").getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}})()');
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:r.x+r.w*.4,y:r.y+r.h*.6});
  await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:r.x+r.w*.4,y:r.y+r.h*.6,button:'left',buttons:1,clickCount:1});
  for(let i=1;i<=8;i++){await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:r.x+r.w*(.4+.035*i),y:r.y+r.h*.6,button:'left',buttons:1});await b.delay(35);}
  await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:r.x+r.w*.68,y:r.y+r.h*.6,button:'left',buttons:0,clickCount:1});
  const e=await grid.evaluate('__dragInput');check('Trusted drag is delivered to the real source',e.some(x=>x.type==='pointerdown'&&x.trusted)&&e.some(x=>x.type==='pointermove'&&x.buttons===1&&x.trusted)&&e.some(x=>x.type==='pointerup'&&x.trusted),e);
  check('Dragging does not select parent-page text or open detail',await b.evaluate('getSelection().toString()===""&&!document.getElementById("modal").open'));
 }finally{await grid.close();}
 await click('#previewModes [data-preview-mode=preview]');await hover('curated-tooltip-gallery');await until(b,'document.querySelector(".preview-layer video")?.currentTime>0');
 check('Switching back restores hover video and releases code',await b.evaluate('document.querySelectorAll("iframe").length===0&&document.querySelectorAll(".preview-layer video").length===1'));
 await click('.card[data-id=curated-tooltip-gallery] .detail-btn');await until(b,'document.getElementById("modal").open&&document.querySelector("#modalStage video")?.currentTime>0');
 check('Detail exposes both modes and starts the selected preview',await b.evaluate('document.getElementById("runPreview").getClientRects().length>0&&document.getElementById("runLocal").getClientRects().length>0&&document.getElementById("runPreview").getAttribute("aria-pressed")==="true"'));
 await b.evaluate('window.__detailVideo=document.querySelector("#modalStage video")');await click('#modalDesc');await b.delay(150);
 check('Clicking detail text preserves the same running video',await b.evaluate('document.querySelector("#modalStage video")===__detailVideo&&!__detailVideo.paused&&!!HybridVault.active()'));
 await click('#runLocal');await until(b,'!!document.querySelector("#modalStage iframe")');
 check('Detail switch runs the local asset instead of video',await b.evaluate('document.querySelectorAll("#modalStage video").length===0&&document.getElementById("runLocal").getAttribute("aria-pressed")==="true"'));
 await b.evaluate('window.__detailFrame=document.querySelector("#modalStage iframe")');await click('#modalSource');await b.delay(150);
 check('Clicking outside detail code preserves its active source frame',await b.evaluate('document.querySelector("#modalStage iframe")===__detailFrame&&!!HybridVault.active()'));
 await click('#runPreview');await until(b,'document.querySelector("#modalStage video")?.currentTime>0');
 check('Detail switch can return from code to video',await b.evaluate('document.querySelectorAll("iframe").length===0'));
 await click('#closeBtn');await b.delay(100);
 check('Closing detail clears its preview',await b.evaluate('!document.getElementById("modal").open&&document.querySelectorAll("#modalStage video,#modalStage iframe").length===0'));
 await b.evaluate('HybridVault.open(39)');await until(b,'!!HybridVault.active()');await click('#modalSource');
 check('Formal detail stays active after an outside-preview click',await b.evaluate('document.getElementById("modal").open&&String(HybridVault.active()?.id)==="39"'));
 await b.call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await b.call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await b.delay(150);
 check('Escape still closes detail and releases its preview',await b.evaluate('!document.getElementById("modal").open&&document.querySelectorAll("#modalStage .preview-layer").length===0'));
 await click('#previewModes [data-preview-mode=interactive]');await b.goto(url,500);await until(b,'!!window.HybridVault');
 check('The UI mode survives refresh without another entry URL',await b.evaluate('document.body.dataset.previewMode==="interactive"&&location.search==="?view=pending"'));
 check('Mode changes do not alter collection, review or bookmark storage',(await snapshot())===beforePrivate);
 await click('#previewModes [data-preview-mode=preview]');
 for(const width of [1440,1024,768,390]){await b.call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await b.delay(100);check('Mode controls remain visible without horizontal overflow '+width,await b.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&[...document.querySelectorAll("#previewModes button")].every(b=>{const r=b.getBoundingClientRect();return r.width>0&&r.left>=0&&r.right<=innerWidth})'));}
 await b.call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await b.delay(100);
 const iconChecks=await b.evaluate('(async()=>{const results=[];for(const link of document.querySelectorAll("link[rel=icon]")){const image=new Image();image.src=link.href;await image.decode();const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");x.drawImage(image,0,0,64,64);const d=x.getImageData(0,0,64,64).data;results.push({href:link.href,corners:[0,63,4032,4095].map(i=>d[i*4+3]),center:d[(32*64+32)*4+3]});}return results})()');
 check('Both served favicon formats decode with rounded transparent corners',iconChecks.length===2&&iconChecks.every(i=>i.corners.every(a=>a===0)&&i.center===255&&i.href.includes('?v=')&&!i.href.includes('__ICON_REVISION__')),iconChecks);
 check('No gallery errors in the complete switch journey',await b.evaluate('__switchErrors.length===0'),await b.evaluate('__switchErrors'));
 const shot=await b.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await put(project,'lineage/current/interaction-switch/'+(live?'live':'stage')+'.png',Buffer.from(shot.data,'base64'));
},{gpu:true});
try{if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);}catch(e){check('Complete real-user switch journey',false,e.stack);}
const formalHash=sha(await readFile(path.join(baseRoot,'index.html')));check('Measured application bytes remained unchanged',formalHash===initialHash);
const report={runId,startedAt,at:new Date().toISOString(),live,formalHash,passed:checks.filter(c=>c.pass).length,total:checks.length,checks};
await put(project,'lineage/current/interaction-switch/'+(live?'live':'stage')+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify({runId,live,formalHash,passed:report.passed,total:report.total,failures:checks.filter(c=>!c.pass)}));if(report.passed!==report.total)process.exitCode=1;
