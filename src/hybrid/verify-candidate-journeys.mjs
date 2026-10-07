// Real pointer journeys through the project's local reference demos.
// This verifier uses one fresh project-owned browser and never attaches to user sessions.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {project,root,sha,put,guard} from '../../scripts/build-hybrid.mjs';
import {withStage,withBrowser,until} from './browser-tools.mjs';

const live=process.argv.includes('--live'),sandboxFixture=process.argv.includes('--sandbox-fixture'),gallerySandbox=process.argv.includes('--gallery-sandbox');
if(sandboxFixture&&gallerySandbox)throw new Error('Choose either the fixture or the real gallery entry');
const idsArg=process.argv.find(a=>a.startsWith('--ids='));
const allowed=['curated-webgpu-route','curated-persistent-gallery'];
const ids=idsArg?idsArg.slice(6).split(','):((sandboxFixture||gallerySandbox)?['curated-webgpu-route']:allowed);
if(gallerySandbox&&ids.some(id=>id!=='curated-webgpu-route'))throw new Error('The real gallery journey is scoped to WebGPU');
if(!ids.length||ids.some(id=>!allowed.includes(id)))throw new Error('Journeys are limited to '+allowed.join(','));
const baseRoot=live?path.join(project,'web'):root;
const runId=randomUUID(),runStartedAt=new Date().toISOString(),verifierPath=fileURLToPath(import.meta.url);
const verifierSha256=sha(await readFile(verifierPath));
const evidence='lineage/current/preview-playback';
await guard(evidence,'evidence');
const files=['index.html',...ids.flatMap(id=>['asset.json','run/index.html','run/effect.js'].map(f=>'motion-vault-assets/'+id+'/'+f))];
const snapshot=async()=>Object.fromEntries(await Promise.all(files.map(async f=>[f,sha(await readFile(path.join(baseRoot,f)))])));
const initialFiles=await snapshot();
const redirectPath=live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html');
const redirectSha256=sha(await readFile(redirectPath));
const brokerSource=await readFile(path.join(project,'src/hybrid/source-broker.js'),'utf8'),brokerSha256=sha(brokerSource);
const reports=[],checks=[];
const ck=(id,name,passed,detail)=>{const c={id,name,passed:!!passed,...(detail===undefined?{}:{detail})};checks.push(c);if(!passed)console.error('FAIL '+id+' '+name);return c;};
const probeScript=String.raw`
window.__journeyErrors=[];window.__journeyCSP=[];
addEventListener('error',e=>__journeyErrors.push(e.error?.stack||e.message));
addEventListener('unhandledrejection',e=>__journeyErrors.push(String(e.reason)));
addEventListener('securitypolicyviolation',e=>__journeyCSP.push({rule:e.violatedDirective,url:e.blockedURI}));
for(const type of ['pointerdown','pointerup','click'])document.addEventListener(type,e=>{
 const p=window.__journeyClick;if(!p)return;
 const expected=document.querySelector(p.selector);
 p.events.push({type,isTrusted:e.isTrusted,match:!!expected&&e.composedPath().includes(expected),target:e.target.id||e.target.tagName,x:e.clientX,y:e.clientY});
},true);
`;

const run=server=>withBrowser(async host=>{
 const base=server.url+(live?'/app/assets':'');
 await host.call('Emulation.setDeviceMetricsOverride',{width:1100,height:670,deviceScaleFactor:1,mobile:false});
 await host.call('Network.enable');
 await host.call('Page.addScriptToEvaluateOnNewDocument',{source:probeScript});
 for(const id of ids){
  let b=host;
  const report={id,passed:false,actions:[],states:[],screenshots:[]},network=[];
  const off=b.onEvent('Network.responseReceived',p=>{if(p.response.status>=400)network.push({url:p.response.url,status:p.response.status})});
  const state=()=>b.evaluate(String.raw`({
   url:location.href,pages:[...document.querySelectorAll('#app > [data-page]')].map(e=>({page:e.dataset.page,image:e.dataset.image})),
   templates:[...document.querySelectorAll('[data-page-template]')].map(e=>e.dataset.pageTemplate),
   containers:document.querySelectorAll('[data-barba="container"]').length,
   scroll:{window:scrollY,smoother:String(window.ScrollSmoother?.get()?.scrollTop()),before:String(window.__journeyScrollBefore),range:document.documentElement.scrollHeight-innerHeight},
   nav:[...document.querySelectorAll('#nav a[data-nav-key]')].map(a=>({key:a.dataset.navKey,href:a.getAttribute('href'),active:a.classList.contains('is-active')})),
   canvasSame:!!window.__journeyCanvas&&document.querySelector('canvas')===window.__journeyCanvas,
   documentSame:window.__journeyToken===`+JSON.stringify(runId)+String.raw`,
   errors:[...(window.__journeyErrors||[]),...(window.sourceErrors||[]),...(window.assetErrors||[])],
   csp:window.__journeyCSP||[],
   images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src'))
  })`);
  const capture=async label=>{
   const rel=evidence+'/'+id+'-'+(live?'live':'stage')+'-'+runId+'-'+label+'.jpg';
   const shot=await host.call('Page.captureScreenshot',{format:'jpeg',quality:85,captureBeyondViewport:false});
   await put(project,rel,Buffer.from(shot.data,'base64'));report.screenshots.push(rel);
  };
  const step=async(name,expression,timeout=6500)=>{
   try{await until(b,expression,timeout);}catch(e){const s=await state();report.states.push({name,...s});ck(id,name,false,s);throw e;}
   const s=await state();report.states.push({name,...s});ck(id,name,true,s);
  };
  const click=async selector=>{
   const q=JSON.stringify(selector);
   const geometry='(()=>{const e=document.querySelector('+q+');if(!e)return null;const r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2,h=document.elementFromPoint(x,y);return{x,y,width:r.width,height:r.height,visible:r.width>0&&r.height>0&&x>=0&&x<innerWidth&&y>=0&&y<innerHeight,hit:!!h&&(h===e||e.contains(h)),disabled:!!e.disabled}})()';
   const same=(a,z)=>a&&z&&['x','y','width','height'].every(k=>Math.abs(a[k]-z[k])<.5);
   const end=Date.now()+6500;let last;
   while(Date.now()<end){
    const p=await b.evaluate(geometry);if(!p)throw new Error('Missing control '+selector);
    if(!p.visible){await b.evaluate('document.querySelector('+q+').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})');continue;}
    const pair=await b.evaluate('new Promise(resolve=>{const a='+geometry+';requestAnimationFrame(()=>requestAnimationFrame(()=>resolve({a,z:'+geometry+'})))})');
    last=pair;if(!pair.z?.visible||!pair.z.hit||pair.z.disabled||!same(pair.a,pair.z))continue;
    const point={x:pair.z.x,y:pair.z.y};
    await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
    const moved=await b.evaluate(geometry);if(!moved?.hit||!same(pair.z,moved))continue;
    await b.evaluate('window.__journeyClick={selector:'+q+',events:[]}');
    await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});
    await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});
    const proof=await b.evaluate('window.__journeyClick');
    if(!proof?.events.some(e=>e.type==='click'&&e.isTrusted&&e.match))throw new Error('Trusted click missed '+selector+': '+JSON.stringify(proof));
    report.actions.push({action:'real_pointer_click',selector,...point,proof});
    return;
   }
   throw new Error('Control did not become stable and hittable '+selector+': '+JSON.stringify(last));
  };
  const webgpuState=(page,image)=>'(()=>{const p=[...document.querySelectorAll("#app > [data-page]")];return p.length===1&&p[0].dataset.page==='+JSON.stringify(page)+(image===undefined?'':'&&p[0].dataset.image==='+JSON.stringify(String(image)))+'})()';
  try{
   if(sandboxFixture||gallerySandbox){
    const frameSelector=gallerySandbox?'#modalStage iframe.local-source-frame':'#journeySource';
    let manifest;
    await host.goto(base+'/motion-vault.html?view=pending',350);
    if(gallerySandbox){
     await until(host,'!!window.HybridVault&&!!window.CandidateVault&&document.querySelector("#viewTabs [data-view=pending]").getAttribute("aria-pressed")==="true"',9000);
     await click('.card[data-id="'+id+'"] .detail-btn');
     await until(host,'document.getElementById("modal").open&&document.getElementById("docContent").textContent.length>0&&!document.getElementById("docContent").textContent.startsWith("读取本地资料")',9000);
     await click('#runLocal');
     await until(host,'document.querySelectorAll("#modalStage iframe.local-source-frame").length===1',9000);
     report.galleryEntry=await host.evaluate('(()=>{const f=document.querySelector("#modalStage iframe.local-source-frame");window.__journeyGalleryFrame=f;return{url:location.href,frameURL:f.src,sandbox:f.getAttribute("sandbox"),referrerPolicy:f.referrerPolicy,frames:document.querySelectorAll("iframe").length}})()');
     ck(id,'Actual gallery clicks create exactly one opaque local source frame',report.galleryEntry.frames===1&&report.galleryEntry.sandbox==='allow-scripts'&&report.galleryEntry.referrerPolicy==='no-referrer'&&report.galleryEntry.frameURL.includes('/'+id+'/run/index.html'),report.galleryEntry);
     if(checks.at(-1).passed!==true)throw new Error('Real gallery source frame contract failed');
     await host.evaluate('document.querySelector("#modalStage iframe.local-source-frame").scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})');
     await host.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
    }else{
    // A new staged package cannot yet pass the old gallery catalogue's version guard.
    // Exercise the unchanged production broker with the fresh manifest, without altering that guard.
    manifest=JSON.parse(await readFile(path.join(baseRoot,'motion-vault-assets',id,'asset.json'),'utf8'));
    const asset={id,asset:{manifest:base+'/motion-vault-assets/'+id+'/asset.json',version:manifest.version}};
    await host.evaluate('(()=>{const local=p=>new URL(p,location.href).href;'+brokerSource+';const it='+JSON.stringify(asset)+';const frame=document.createElement("iframe");frame.id="journeySource";frame.sandbox="allow-scripts";frame.style="position:fixed;inset:0;width:100vw;height:100vh;border:0;z-index:2147483647;background:white";const channel=crypto.randomUUID(),u=new URL('+JSON.stringify(base+'/motion-vault-assets/'+id+'/run/index.html')+');u.searchParams.set("vaultSession",channel);window.__journeyBrokerDispose=createSourceBroker(frame,it,channel);frame.src=u.href;document.body.append(frame)})()');
    }
    await host.delay(800);
    const targets=(await host.send('Target.getTargets')).targetInfos;
    const target=targets.find(t=>t.type==='iframe'&&t.url.includes('/'+id+'/run/'));
    let send;
    if(target){
     const {sessionId}=await host.send('Target.attachToTarget',{targetId:target.targetId,flatten:true});
     send=(m,p)=>host.send(m,p,sessionId);await send('Runtime.enable',{});await send('Network.enable',{});
    }else{
     const tree=await host.call('Page.getFrameTree'),frameId=tree.frameTree.childFrames?.find(f=>f.frame.url.includes('/'+id+'/run/'))?.frame.id;
     if(!frameId)throw new Error('Opaque source iframe did not initialize');
     const contexts=[],offContext=host.onEvent('Runtime.executionContextCreated',p=>contexts.push(p.context));
     await host.call('Runtime.disable');await host.call('Runtime.enable');await host.delay(50);offContext();
     const context=contexts.find(c=>c.auxData?.frameId===frameId&&c.auxData?.isDefault);
     if(!context)throw new Error('Opaque source context is unavailable');
     send=(m,p)=>host.call(m,{...p,...(m==='Runtime.evaluate'?{contextId:context.id}:{})});
    }
    const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value;};
    b={...host,evaluate,call:async(m,p={})=>{
     if(m==='Input.dispatchMouseEvent'){
      // The real gallery fits its 1100x670 iframe with a CSS transform.
      const offset=await host.evaluate('(()=>{const f=document.querySelector('+JSON.stringify(frameSelector)+'),r=f.getBoundingClientRect(),sx=r.width/f.offsetWidth,sy=r.height/f.offsetHeight;return{x:r.x+f.clientLeft*sx,y:r.y+f.clientTop*sy,sx,sy}})()');
      const point={x:p.x*offset.sx+offset.x,y:p.y*offset.sy+offset.y};
      const hit=await host.evaluate('document.elementFromPoint('+point.x+','+point.y+')===document.querySelector('+JSON.stringify(frameSelector)+')');
      if(!hit)throw new Error('Source input point is obscured in the parent viewport: '+JSON.stringify(point));
      return host.call(m,{...p,...point});
     }
     return send(m,p);
    }};
    await evaluate(probeScript);
    report.sandboxFixture=sandboxFixture;report.gallerySandbox=gallerySandbox;if(manifest)report.manifestVersion=manifest.version;
   }else await b.goto(base+'/motion-vault-assets/'+id+'/run/index.html',400);
   await until(b,'document.readyState==="complete"&&window.SourceDemo?.ready===true',16000);
   if(id==='curated-webgpu-route'){
    await until(b,'!!document.querySelector("canvas")&&getComputedStyle(document.getElementById("preloader")).display==="none"',20000);
    await b.delay(900);
   }else{
    await until(b,'!!window.ScrollSmoother?.get()&&[...document.images].every(i=>i.complete&&i.naturalWidth>0)',16000);
    await b.delay(1700);
   }
   await b.evaluate('window.__journeyCanvas=document.querySelector("canvas");window.__journeyToken='+JSON.stringify(runId));
   if(id==='curated-webgpu-route'){
    await step('Initial main page is ready',webgpuState('main'));
    await capture('before');
    await click('#nav [data-nav-key="index"]');
    await step('Main to Index finishes after a real nav click',webgpuState('index'));
    // Index has no HTML image links. Its supported interaction is a drag, then the existing Selected nav.
    await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:700,y:350});
    await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:700,y:350,button:'left',buttons:1,clickCount:1});
    for(let n=1;n<=12;n++){await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:700-n*16,y:350-n*5,button:'left',buttons:1});await b.delay(25);}
    await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:508,y:290,button:'left',buttons:0,clickCount:1});
    report.actions.push({action:'real_index_drag',from:[700,350],to:[508,290],steps:12});
    await b.delay(350);
    await click('#nav [data-nav-key="main"]');
    await step('Index returns to Main',webgpuState('main'));
    await click('[data-page="main"] .slot-2[data-link]');
    await step('Main selected image enters its matching detail',webgpuState('inner',2));
    await capture('detail');
    await click('#nav [data-nav-key="main"]');
    await step('Detail returns to Main',webgpuState('main'));
   }else{
    await step('Initial gallery is ready','document.querySelectorAll("[data-barba=container]").length===1&&document.querySelector("[data-page-template]")?.dataset.pageTemplate==="home"');
    await b.evaluate('window.__journeyImage=document.querySelector(".grid a[href=\\"./1.html\\"] img")');
    await capture('before');
    await click('.grid a[href="./1.html"]');
    await step('Gallery image enters its detail route','document.querySelectorAll("[data-barba=container]").length===1&&document.querySelector("[data-page-template]")?.dataset.pageTemplate==="detail"&&location.pathname.endsWith("/run/1.html")');
    await step('The selected image persists and settles in detail','document.querySelector(".details-container img")===window.__journeyImage&&!window.gsap.isTweening(window.__journeyImage)');
    await capture('detail');
    await click('.details-data a[href="./index.html"]');
    await step('Detail returns to gallery through its Index link','document.querySelectorAll("[data-barba=container]").length===1&&document.querySelector("[data-page-template]")?.dataset.pageTemplate==="home"&&location.pathname.endsWith("/run/index.html")');
    await until(b,'!!window.ScrollSmoother?.get()',7000);
    await until(b,'Number.isFinite(window.ScrollSmoother.get().scrollTop())',6500);
   await b.evaluate('window.__journeyScrollBefore=window.ScrollSmoother.get().scrollTop()');
    await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:740,y:410});
    await b.call('Input.dispatchMouseEvent',{type:'mouseWheel',x:740,y:410,deltaX:0,deltaY:450});
    await step('Returned gallery accepts actual wheel scrolling','Number.isFinite(window.__journeyScrollBefore)&&Number.isFinite(window.ScrollSmoother.get().scrollTop())&&window.ScrollSmoother.get().scrollTop()>window.__journeyScrollBefore+40');
    report.actions.push({action:'real_wheel',deltaY:450});
   }
   const final=await state(),localPrefix=new URL(base+'/motion-vault-assets/'+id+'/run/').pathname;
   ck(id,'The original canvas and document survive the complete journey',final.canvasSame&&final.documentSame,final);
   if(sandboxFixture||gallerySandbox){
    const security=await b.evaluate('(()=>{let parentBlocked=false,storageBlocked=false;try{void parent.document.body}catch{parentBlocked=true}try{void localStorage}catch{storageBlocked=true}return{parentBlocked,storageBlocked,origin:self.origin}})()');
    ck(id,'The entire route journey preserves the opaque storage and parent boundary',security.parentBlocked&&security.storageBlocked&&security.origin==='null',security);
   }
   ck(id,'The final location stays within the local reference package',new URL(final.url).pathname.startsWith(localPrefix),{url:final.url,localPrefix});
   const external=await b.evaluate('performance.getEntriesByType("resource").filter(r=>!r.name.startsWith(location.origin)&&!r.name.startsWith("blob:")&&!r.name.startsWith("data:")).map(r=>r.name)');
   ck(id,'Journey has no script, CSP, HTTP, image or external-resource errors',!final.errors.length&&!final.csp.length&&!final.images.length&&!network.length&&!external.length,{errors:final.errors,csp:final.csp,images:final.images,network,external});
   await capture('after');
   if(gallerySandbox){
    const startURL=new URL(report.states[0].url);
    ck(id,'Every route preserves the actual iframe resource base and session',!!startURL.searchParams.get('vaultSession')&&report.states.every(s=>{const u=new URL(s.url);return u.origin===startURL.origin&&u.pathname===startURL.pathname&&u.search===startURL.search}),{urls:report.states.map(s=>s.url)});
    const parentState=await host.evaluate('({url:location.href,frameSame:document.querySelector("#modalStage iframe.local-source-frame")===window.__journeyGalleryFrame,errors:window.__journeyErrors||[],csp:window.__journeyCSP||[]})');
    ck(id,'The gallery and original iframe survive without parent navigation or errors',parentState.frameSame&&parentState.url===report.galleryEntry.url&&!parentState.errors.length&&!parentState.csp.length,parentState);
    b=host;await click('#closeBtn');
    await until(host,'!document.getElementById("modal").open&&document.querySelectorAll("iframe.local-source-frame").length===0',6500);
    ck(id,'Real close releases the gallery source frame',true);
   }
   report.passed=checks.filter(c=>c.id===id).every(c=>c.passed);
  }catch(e){
   report.error=e.stack||e.message;
   ck(id,'Complete supported journey',false,{error:report.error});
   try{report.failureState=await state();await capture('failure');}catch(captureError){report.captureError=captureError.message;}
  }finally{
   off();report.network=network;reports.push(report);
   console.log(JSON.stringify({id,passed:report.passed,error:report.error,actions:report.actions.length}));
   await host.goto('about:blank',50);
  }
 }
},{gpu:true});
let browserCompleted=false;
try{if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);browserCompleted=true;}
catch(e){ck('suite','Browser suite completed',false,{error:e.stack||e.message});}
const finalFiles=await snapshot();
const sourceUnchanged=verifierSha256===sha(await readFile(verifierPath))&&JSON.stringify(initialFiles)===JSON.stringify(finalFiles)&&redirectSha256===sha(await readFile(redirectPath));
ck('suite','Verifier and tested asset bytes stayed unchanged',sourceUnchanged);
const result={at:new Date().toISOString(),runStartedAt,runId,verifierSha256,sourceUnchanged,live,sandboxFixture,gallerySandbox,brokerSha256,browserCompleted,formalHash:initialFiles['index.html'],redirectSha256,candidateHash:redirectSha256,assetHashes:initialFiles,reports,checks,passed:checks.filter(c=>c.passed).length,total:checks.length,allPassed:reports.length===ids.length&&reports.every(r=>r.passed)&&checks.every(c=>c.passed)};
const text=JSON.stringify(result,null,2),name='journeys-'+(gallerySandbox?'gallery-sandbox-':sandboxFixture?'sandbox-fixture-':'')+(live?'live':'stage');
await put(project,evidence+'/'+name+'-'+runId+'.json',text);
await put(project,evidence+'/'+name+'.json',text);
console.log(JSON.stringify({runId,at:result.at,passed:result.passed,total:result.total,allPassed:result.allPassed,formalHash:result.formalHash,verifierSha256,report:evidence+'/'+name+'-'+runId+'.json',browserClosed:true}));
if(!result.allPassed)process.exitCode=1;
