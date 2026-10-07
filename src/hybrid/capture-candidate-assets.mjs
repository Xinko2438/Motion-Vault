// Verify and record only the project's downloaded public reference demos.
// A fresh isolated browser is used; this never attaches to the user's browser or changes review data.
import {readFile,writeFile,mkdir,open,rename,unlink} from 'node:fs/promises';import path from 'node:path';import {execFileSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';import {fileURLToPath} from 'node:url';
import {project,root,sha,put,exists,guard} from '../../scripts/build-hybrid.mjs';import {withStage,withBrowser,until} from './browser-tools.mjs';
import {inspectPreviewFile} from './diagnose-preview-media.mjs';
const catalogue=JSON.parse(await readFile(path.join(project,'candidates/curated-originals/src/catalog.json'),'utf8'));
const clickTargets={'curated-rounded-menu':'.line-link','curated-inline-menu':'.menu-item','curated-tooltip-gallery':'a[data-tooltip]','curated-grid-flow-nav':'.nav__item--next,.nav__next,.nav button:last-child','curated-layer-cut':'.layers__item','curated-thumbnail-flow':'.open-button','curated-webgpu-route':'[data-nav-key="index"]','curated-persistent-gallery':'a[href="./1.html"]'};
const scrollIds=new Set(['curated-telescope','curated-camera-route','curated-dual-wave','curated-image-in-type','curated-cylinder-type','curated-webgl-reveal','curated-editorial-layout','curated-elastic-editorial']);
// These six previews retain the Chrome recorder's AV1 bytes after gallery playback validation.
const nativeDirectIds=new Set(['curated-depth','curated-spatial-product','curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route']);

// A bounded A/B recording experiment. Native browser video stays in project
// runtime scratch; this branch never modifies the asset catalogue or previews.
async function nativeTelescopeProbe(){
 const id='curated-telescope',mediaRoot=path.join(project,'web'),assetFolder=path.join(mediaRoot,'motion-vault-assets',id);
 const manifestBytes=await readFile(path.join(assetFolder,'asset.json')),manifest=JSON.parse(manifestBytes);
 const runtimeDir='.runtime/preview-playback',evidenceFile='lineage/current/preview-playback/telescope-native-probe.json';
 await guard(runtimeDir,'runtime');await guard(evidenceFile,'evidence');
 const report={schema:'motion-vault.native-preview-probe.v1',at:new Date().toISOString(),id,version:manifest.version,
  originalVideoSha256:manifest.preview.videoSha256,manifestSha256:sha(manifestBytes),
  sourceHtmlSha256:sha(await readFile(path.join(assetFolder,manifest.run))),
  sourceEntrySha256:sha(await readFile(path.join(assetFolder,manifest.entry))),
  viewport:{width:1100,height:670,deviceScaleFactor:1,mobile:false},recording:{frameRate:60,maxWidth:656,maxHeight:400},
  sameSourceAndCurve:true,durationMs:6500,curve:'p=.95*(t<.8?t/.8:1-(t-.8)*1.5), t=elapsed/6500',samples:[]};
 await withStage(mediaRoot,s=>withBrowser(async b=>{
  report.browser=await b.send('Browser.getVersion');
  await b.call('Emulation.setDeviceMetricsOverride',report.viewport);
  await b.call('Network.enable');
  await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__nativeProbeIssues=[];addEventListener("error",e=>{if(e.error)__nativeProbeIssues.push(e.message)});addEventListener("unhandledrejection",e=>__nativeProbeIssues.push(String(e.reason)));addEventListener("securitypolicyviolation",e=>__nativeProbeIssues.push("CSP: "+e.violatedDirective));'});
  for(const mode of ['cdp-100ms','page-raf']){
   const responses=[],unwatch=b.onEvent('Network.responseReceived',p=>{if(p.response.status>=400)responses.push({url:p.response.url,status:p.response.status});});
   let handle=null,recording=false;
   try{
    await b.goto(s.url+'/motion-vault-assets/'+id+'/'+manifest.run,400);
    await until(b,'document.readyState==="complete"&&SourceDemo.ready&&[...document.images].every(i=>i.complete&&i.naturalWidth>0)',18000);
    await b.delay(1800);await b.evaluate('SourceDemo.scroll(0)');await b.delay(200);
    await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:12,y:650});
    await b.evaluate('window.__nativeProbeRafTimes=[];window.__nativeProbeRafRunning=true;requestAnimationFrame(function sample(t){if(!__nativeProbeRafRunning)return;__nativeProbeRafTimes.push(t);requestAnimationFrame(sample)})');
    const recordingAt=Date.now(),begin=await b.call('Page.startScreenRecording',report.recording);
    handle=begin.stream;recording=true;
    if(!handle)throw new Error('Native recorder returned no stream');
    await b.delay(260);
    const driveStartOffsetMs=Date.now()-recordingAt,driverTimes=[];
    let driver;
    if(mode==='cdp-100ms'){
     const started=Date.now();
     while(Date.now()-started<6500){
      const elapsed=Date.now()-started,t=elapsed/6500,p=.95*(t<.8?t/.8:1-(t-.8)*1.5);
      await b.evaluate('SourceDemo.scroll('+p+')');driverTimes.push(elapsed);await b.delay(100);
     }
     driver={driver:'legacy CDP calls with 100 ms wait',durationMs:Date.now()-started,updates:driverTimes.length,timesMs:driverTimes};
    }else{
     driver=await b.evaluate('new Promise(resolve=>{const times=[],started=performance.now();requestAnimationFrame(function drive(now){const elapsed=now-started,t=Math.min(1,elapsed/6500),p=.95*(t<.8?t/.8:1-(t-.8)*1.5);SourceDemo.scroll(p);times.push(elapsed);if(t<1)requestAnimationFrame(drive);else resolve({driver:"page requestAnimationFrame through unchanged SourceDemo.scroll",durationMs:elapsed,updates:times.length,timesMs:times})})})');
    }
    const driveEndOffsetMs=Date.now()-recordingAt;
    await b.delay(500);const end=await b.call('Page.stopScreenRecording');recording=false;
    if(end.stream&&end.stream!==handle)throw new Error('Recorder stream changed unexpectedly');
    const wallDurationMs=Date.now()-recordingAt,chunks=[];let total=0,reads=0;
    for(;;){
     const chunk=await b.call('IO.read',{handle,size:1024*1024});reads++;
     const bytes=Buffer.from(chunk.data||'',chunk.base64Encoded?'base64':'utf8');chunks.push(bytes);total+=bytes.length;
     if(total>64*1024*1024||reads>128)throw new Error('Unexpectedly large native preview stream');
     if(chunk.eof)break;
    }
    await b.call('IO.close',{handle});handle=null;
    const bytes=Buffer.concat(chunks),relative=runtimeDir+'/telescope-native-'+mode+'.webm',file=path.join(project,relative);
    await put(project,relative,bytes);
    const page=await b.evaluate('(()=>{__nativeProbeRafRunning=false;return{rafTimes:__nativeProbeRafTimes,errors:__nativeProbeIssues,sourceErrors:window.sourceErrors||[],outside:performance.getEntriesByType("resource").filter(r=>!r.name.startsWith(location.origin)&&!r.name.startsWith("blob:")&&!r.name.startsWith("data:")).map(r=>r.name),scrollProgress:document.querySelector(".section")?.style.getPropertyValue("--progress")}})()');
    if(page.errors.length||page.sourceErrors.length||page.outside.length||responses.length)throw new Error('Source execution issue: '+JSON.stringify({page,responses}));
    const inspected=inspectPreviewFile(file),analysis=inspected.analysis;
    const start=driveStartOffsetMs/1000+.1,stop=driveEndOffsetMs/1000-.1;
    const active=analysis.transitions.filter(t=>t.ptsSeconds>=start&&t.ptsSeconds<stop);
    const activeChanges=active.filter(t=>t.visibleChange);
    const motionWindow={startSeconds:start,endSeconds:stop,visibleChanges:activeChanges.length,
     visibleChangesPerSecond:Number((activeChanges.length/Math.max(.01,stop-start)).toFixed(3)),
     longestHoldSeconds:Math.max(0,...analysis.heldIntervalsAtLeast120ms.filter(h=>h.start<stop&&h.end>start).map(h=>Math.min(h.end,stop)-Math.max(h.start,start)))};
    const sample={mode,file:relative,videoSha256:sha(bytes),bytes:bytes.length,wallDurationMs,driveStartOffsetMs,driveEndOffsetMs,
     driver,rafTimes:page.rafTimes,finalScrollProgress:page.scrollProgress,streamReads:reads,probe:inspected.probe,analysis,motionWindow};
    report.samples.push(sample);
    console.log(JSON.stringify({mode,videoSha256:sample.videoSha256,bytes:sample.bytes,stream:sample.probe.streams[0],driverUpdates:driver.updates,
     visibleChanges:analysis.visibleChanges,visibleChangesPerSecond:analysis.visibleChangesPerEncodedSecond,motionWindow}));
   }finally{
    if(recording)try{await b.call('Page.stopScreenRecording')}catch{}
    if(handle)try{await b.call('IO.close',{handle})}catch{}
    unwatch();await b.goto('about:blank',100);
   }
  }
 },{gpu:true}));
 if(sha(await readFile(path.join(assetFolder,'asset.json')))!==report.manifestSha256)throw new Error('Source manifest changed during experiment');
 const control=report.samples.find(x=>x.mode==='cdp-100ms'),raf=report.samples.find(x=>x.mode==='page-raf');
 report.comparison={oldInputVisualUpdatesPerSecond:control.motionWindow.visibleChangesPerSecond,
  rafInputVisualUpdatesPerSecond:raf.motionWindow.visibleChangesPerSecond,
  rafMeets45UpdatesPerSecond:raf.motionWindow.visibleChangesPerSecond>=45,
  gain:raf.motionWindow.visibleChangesPerSecond/Math.max(.001,control.motionWindow.visibleChangesPerSecond),
  assetPreviewsModified:false};
 await put(project,evidenceFile,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({evidence:evidenceFile,comparison:report.comparison}));
}


const recordOptions={audio:false,frameRate:60,maxWidth:656,maxHeight:400};
const continuousIds=new Set(['curated-telescope','curated-image-in-type','curated-editorial-layout']);
const scrollRanges={'curated-telescope':[0,.95],'curated-image-in-type':[0,.68],'curated-editorial-layout':[.105,.29],'curated-webgl-reveal':[.09,.52]};
const pointerIds=new Set(['curated-fluid-xray','curated-shape-ascii','curated-liquid-grid','curated-cluster','curated-stylized-water','curated-reaction-diffusion']);
const errorProbe=String.raw`
window.__captureIssues=[];window.__captureCSP=[];window.__captureInputs={};
for(const name of ['error','unhandledrejection'])addEventListener(name,e=>__captureIssues.push(String(e.error?.stack||e.message||e.reason)));
addEventListener('securitypolicyviolation',e=>__captureCSP.push({rule:e.violatedDirective,url:e.blockedURI}));
for(const type of ['pointerdown','pointerup','pointermove','click','wheel'])document.addEventListener(type,e=>{if(e.isTrusted)__captureInputs[type]=(__captureInputs[type]||0)+1;},true);
document.addEventListener('click',e=>{const p=window.__captureClick;if(p){const target=document.querySelector(p.selector);p.events.push({trusted:e.isTrusted,match:!!target&&e.composedPath().includes(target)});}},true);
`;
async function atomic(file,bytes){
 const temporary=file+'.'+process.pid+'.'+randomUUID()+'.tmp';
 try{await writeFile(temporary,bytes,{flag:'wx'});await rename(temporary,file);}
 finally{try{await unlink(temporary)}catch(e){if(e.code!=='ENOENT')throw e;}}
}
async function recordNative(b,drive){
 let handle,recording=false;
 try{
  const startedAt=Date.now(),begin=await b.call('Page.startScreenRecording',recordOptions);
  handle=begin.stream;if(!handle)throw new Error('Native recorder returned no stream');recording=true;
  const actions=await drive(),end=await b.call('Page.stopScreenRecording');recording=false;
  if(end.stream&&end.stream!==handle)throw new Error('Native recording stream changed');
  const chunks=[];let bytes=0,reads=0;
  for(;;){const part=await b.call('IO.read',{handle,size:1024*1024}),data=Buffer.from(part.data||'',part.base64Encoded?'base64':'utf8');
   chunks.push(data);bytes+=data.length;reads++;if(bytes>96*1024*1024||reads>192)throw new Error('Native recording exceeded the preview bound');
   if(part.eof)break;
  }
  return {bytes:Buffer.concat(chunks),actions,wallDurationMs:Date.now()-startedAt,streamReads:reads};
 }finally{
  if(recording)try{await b.call('Page.stopScreenRecording')}catch{}
  if(handle)try{await b.call('IO.close',{handle})}catch{}
 }
}
async function clickControl(b,selector,actions){
 const q=JSON.stringify(selector),geometry='(()=>{const e=document.querySelector('+q+');if(!e)return null;const r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2,h=document.elementFromPoint(x,y);return{x,y,width:r.width,height:r.height,visible:r.width>0&&r.height>0&&x>=0&&x<innerWidth&&y>=0&&y<innerHeight,hit:!!h&&(h===e||e.contains(h)),disabled:!!e.disabled}})()';
 const stable=(a,z)=>a&&z&&['x','y','width','height'].every(k=>Math.abs(a[k]-z[k])<.5);
 const end=Date.now()+6500;let last;
 while(Date.now()<end){
  const p=await b.evaluate(geometry);if(!p)throw new Error('Missing control '+selector);
  if(!p.visible){await b.evaluate('document.querySelector('+q+').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})');await b.delay(40);continue;}
  const pair=await b.evaluate('new Promise(resolve=>{const a='+geometry+';requestAnimationFrame(()=>requestAnimationFrame(()=>resolve({a,z:'+geometry+'})))})');
  last=pair;if(!pair.z?.visible||!pair.z.hit||pair.z.disabled||!stable(pair.a,pair.z))continue;
  const point={x:pair.z.x,y:pair.z.y};await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
  const moved=await b.evaluate(geometry);if(!moved?.hit||!stable(pair.z,moved))continue;
  await b.evaluate('window.__captureClick={selector:'+q+',events:[]}');
  await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});
  await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});
  const proof=await b.evaluate('window.__captureClick');if(!proof?.events.some(x=>x.trusted&&x.match))throw new Error('Real click missed '+selector);
  actions.push({action:'real_pointer_click',selector,...point,proof});return;
 }
 throw new Error('Control is not stable and hittable '+selector+': '+JSON.stringify(last));
}
async function settled(b,timeout=6500){
 await b.delay(80);
 await until(b,'!window.gsap||!gsap.globalTimeline.getChildren(true,true,true).some(t=>t.isActive()&&t.repeat()>=0)',timeout);
}
async function rafScroll(b,id,range,durationMs=6500){
 const cfg={range,durationMs,id,endPhase:id==='curated-telescope'?22/15:1,curve:id==='curated-telescope'?'validated-forward-full-return':'closed-triangle',phase:id==='curated-depth'?.12:0};
 const driver=await b.evaluate('('+function(cfg){return new Promise(resolve=>{
  const started=performance.now(),timesMs=[];let updates=0,min=1,max=0;
  requestAnimationFrame(function drive(now){
   const elapsed=Math.max(0,now-started),t=Math.min(cfg.endPhase,elapsed/cfg.durationMs),phase=(t+cfg.phase)%1,cycle=cfg.curve==='validated-forward-full-return'?(t<.8?t/.8:Math.max(0,1-(t-.8)*1.5)):(phase<.5?phase*2:2-phase*2);
   const p=cfg.range[0]+(cfg.range[1]-cfg.range[0])*cycle;SourceDemo.scroll(p);updates++;timesMs.push(elapsed);min=Math.min(min,p);max=Math.max(max,p);
   if(t<cfg.endPhase)requestAnimationFrame(drive);else resolve({action:'source_scroll_raf',durationMs:elapsed,updates,min,max,curve:cfg.curve,timesMs,finalProgress:document.body.dataset.progress??p});
  });
 })}.toString()+')('+JSON.stringify(cfg)+')');
 if(id==='curated-depth'&&!(driver.min<.13&&driver.max>.88))throw new Error('Depth recording did not traverse all chapters');
 return driver;
}
async function pointerMotion(b,{durationMs=5500,drag=true,wheel=false,from=[550,350],amplitude=[200,110]}={}){
 const started=Date.now();let steps=0,point={x:from[0],y:from[1]};
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
 if(drag)await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});
 try{
  while(Date.now()-started<durationMs){
   const elapsed=Date.now()-started,t=elapsed/durationMs;
   point={x:from[0]+Math.sin(t*Math.PI*2)*amplitude[0],y:from[1]+Math.sin(t*Math.PI*2)*amplitude[1]};
   await b.call('Input.dispatchMouseEvent',wheel?{type:'mouseWheel',x:620,y:370,deltaX:0,deltaY:t<.5?20:-20}:{type:'mouseMoved',...point,buttons:drag?1:0,button:drag?'left':'none'});
   steps++;await b.delay(Math.max(1,steps*1000/60-(Date.now()-started)));
  }
 }finally{if(drag)await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});}
 return {action:wheel?'real_wheel_cycle':drag?'real_pointer_drag_cycle':'real_pointer_move_cycle',durationMs:Date.now()-started,steps,from,amplitude};
}
async function dragLine(b,from,to,durationMs=1000){
 const started=Date.now();let steps=0,point={x:from[0],y:from[1]};
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
 await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});
 try{while(Date.now()-started<durationMs){
  const t=Math.min(1,(Date.now()-started)/durationMs),p=t*t*(3-2*t);
  point={x:from[0]+(to[0]-from[0])*p,y:from[1]+(to[1]-from[1])*p};
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point,button:'left',buttons:1});
  steps++;await b.delay(Math.max(1,steps*1000/60-(Date.now()-started)));
 }}finally{await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});}
 return {action:'real_pointer_drag',from,to,steps,durationMs:Date.now()-started};
}
async function journeyState(b,expression,name,actions){
 await until(b,expression,10000);actions.push({action:'verified_journey_state',name});
}
async function settleVisibleSourceAnimations(b){
 await b.delay(80);
 await until(b,'!(window.ScrollTrigger?.getAll()||[]).some(t=>{const e=t.trigger,a=t.animation;if(!e||!a||a.repeat()<0)return false;const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&(a.isActive()||(!a.paused()&&a.totalProgress()<.999))})',4500);
 await b.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
}
async function clothPoint(b){
 await until(b,'!document.querySelector("[data-loading]")',16000);
 const r=await b.evaluate('(()=>{const a=[...document.querySelectorAll("canvas")].map(c=>c.getBoundingClientRect()).sort((a,z)=>z.width*z.height-a.width*a.height),r=a[0];if(!r)throw new Error("Missing cloth canvas");return{x:r.x,y:r.y,width:r.width,height:r.height}})()');
 for(const y of [.55,.65,.45,.75,.35])for(const x of [.5,.4,.6]){
  const p={x:r.x+r.width*x,y:r.y+r.height*y};
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await b.delay(35);
  if(await b.evaluate('getComputedStyle(document.body).cursor==="pointer"'))return p;
 }
 throw new Error('No real pointer raycast hit the cloth mesh');
}
async function settleElasticColumns(b,baseline=false){
 return b.evaluate('('+function(baseline){return new Promise((resolve,reject)=>{
  const started=performance.now();let last=null,stable=0;
  requestAnimationFrame(function check(){
   const cols=[...document.querySelectorAll('.grid__column')],s=window.ScrollSmoother?.get(),ys=cols.map(c=>Number(gsap.getProperty(c,'y'))),target=window.__captureElasticBaseline;
   const active=cols.length?gsap.getTweensOf(cols).some(t=>t.repeat()>=0&&t.isActive()):true;
   const atStart=!!s&&Math.abs(s.scrollTop())<.5,atBaseline=baseline||(target?.length===ys.length&&ys.every((y,i)=>Math.abs(y-target[i])<.5));
   const still=!!last&&ys.length===last.length&&ys.every((y,i)=>Math.abs(y-last[i])<.1);
   stable=!active&&atStart&&atBaseline&&still?stable+1:0;
   if(stable>=2){if(baseline)window.__captureElasticBaseline=ys;resolve({action:baseline?'read_settled_column_baseline':'wait_original_column_lag',durationMs:performance.now()-started,columns:ys,maximumOriginalLagSeconds:Math.max(...cols.map(c=>Number(c.dataset.lag)||0)),stableFrames:stable});return;}
   if(performance.now()-started>3000){reject(new Error('Original column lag did not settle: '+JSON.stringify({ys,target,active,atStart,atBaseline})));return;}
   last=ys;requestAnimationFrame(check);
  });
 })}.toString()+')('+JSON.stringify(baseline)+')');
}
async function driveScene(b,id){
 const actions=[];
 if(scrollIds.has(id)&&id!=='curated-camera-route'){actions.push(await rafScroll(b,id,scrollRanges[id]||[0,.68]));if(id==='curated-elastic-editorial')actions.push(await settleElasticColumns(b));return actions;}
 if(id==='curated-depth'){actions.push(await rafScroll(b,id,[0,1]));return actions;}
 if(pointerIds.has(id)){actions.push(await pointerMotion(b,{drag:id!=='curated-fluid-xray'}));return actions;}
 if(id==='curated-camera-route'){actions.push(await pointerMotion(b,{drag:false,wheel:true,durationMs:6500}));return actions;}
 if(id==='curated-glass-torus'||id==='curated-metal-name'){actions.push(await pointerMotion(b,{drag:false,durationMs:6500,amplitude:[260,145]}));return actions;}
 if(id==='curated-webgpu-route'){
  const page=(name,image)=>'(()=>{const p=[...document.querySelectorAll("#app > [data-page]")];return p.length===1&&p[0].dataset.page==='+JSON.stringify(name)+(image===undefined?'':'&&p[0].dataset.image==='+JSON.stringify(String(image)))+'})()';
  await journeyState(b,page('main'),'main_ready',actions);
  await clickControl(b,'#nav [data-nav-key="index"]',actions);await journeyState(b,page('index'),'index_entered',actions);
  actions.push(await dragLine(b,[700,350],[508,290],850));await b.delay(250);
  await clickControl(b,'#nav [data-nav-key="main"]',actions);await journeyState(b,page('main'),'main_returned',actions);
  await clickControl(b,'[data-page="main"] .slot-2[data-link]',actions);await journeyState(b,page('inner',2),'matching_detail_entered',actions);
  await clickControl(b,'#nav [data-nav-key="main"]',actions);await journeyState(b,page('main'),'main_cycle_closed',actions);
  return actions;
 }
 if(id==='curated-persistent-gallery'){
  const page=name=>'document.querySelectorAll("[data-barba=container]").length===1&&document.querySelector("[data-page-template]")?.dataset.pageTemplate==='+JSON.stringify(name);
  await journeyState(b,page('home'),'home_ready',actions);
  await b.evaluate('window.__capturePersistentImage=document.querySelector('+JSON.stringify('.grid a[href="./1.html"] img')+')');
  await clickControl(b,'.grid a[href="./1.html"]',actions);await journeyState(b,page('detail'),'detail_entered',actions);
  await journeyState(b,'document.querySelector(".details-container img")===window.__capturePersistentImage&&!window.gsap.isTweening(window.__capturePersistentImage)','same_image_transition_finished',actions);
  await clickControl(b,'.details-data a[href="./index.html"]',actions);await journeyState(b,page('home'),'home_returned',actions);
  await until(b,'!!window.ScrollSmoother?.get()',7000);
  await settleVisibleSourceAnimations(b);actions.push(await rafScroll(b,id,[0,.18],3000));await settleVisibleSourceAnimations(b);
  return actions;
 }
 if(id==='curated-spatial-product'){
  const zoomIn='button.control-button[aria-label="Zoom In"]',zoomOut='button.control-button[aria-label="Zoom Out"]';
  await clickControl(b,zoomIn,actions);await until(b,'!!document.querySelector('+JSON.stringify(zoomOut)+')',5000);await b.delay(650);
  const r=await b.evaluate('(()=>{const a=[...document.querySelectorAll("canvas")].map(c=>c.getBoundingClientRect()).sort((a,z)=>z.width*z.height-a.width*a.height);const r=a[0];if(!r||r.width<500||r.height<300)throw new Error("Main product canvas is unavailable");return{x:r.x,y:r.y,width:r.width,height:r.height}})()');
  actions.push(await dragLine(b,[r.x+r.width*.55,r.y+r.height*.5],[r.x+r.width*.3,r.y+r.height*.36],1200));
  await clickControl(b,zoomOut,actions);await until(b,'!!document.querySelector('+JSON.stringify(zoomIn)+')',5000);await b.delay(650);
  for(const [selector,label]of [['.control-bar-island .tab-button:nth-child(2)','New Balance'],['.control-bar-island .tab-button:nth-child(1)','Nike']]){
   await until(b,'document.querySelector('+JSON.stringify(selector)+')?.textContent.trim()==='+JSON.stringify(label),5000);
   await clickControl(b,selector,actions);await journeyState(b,'!!document.querySelector('+JSON.stringify(selector+' > div')+')','collection_'+label,actions);await b.delay(800);
  }
  return actions;
 }
 const controls={
  'curated-rounded-menu':['.line-link','.menu__back'],
  'curated-inline-menu':['.menu-item','.frame__close'],
  'curated-tooltip-gallery':['a[data-tooltip]','.content__pretitle > .back > .oh__inner'],
  'curated-thumbnail-flow':['.open-button','.close-button'],
  'curated-grid-flow-nav':['.nav__item--next,.nav__next,.nav button:last-child','.nav__item--prev,.nav__prev,.nav button:first-child']
 };
 if(controls[id]){
  if(id==='curated-tooltip-gallery'){
   const p=await b.evaluate('(()=>{const r=document.querySelector("a[data-tooltip]").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await b.delay(1450);actions.push({action:'real_tooltip_hover',durationMs:1450});
  }
  if(id==='curated-grid-flow-nav'){await until(b,'!!document.querySelector("#gallery-1.gallery--current")',10000);await settled(b,12000);}
  for(const [index,selector]of controls[id].entries()){
   await clickControl(b,selector,actions);await settled(b);
   if(id==='curated-grid-flow-nav')await journeyState(b,'!!document.querySelector("#gallery-'+(index===0?2:1)+'.gallery--current")','gallery_'+(index===0?2:1),actions);
  }
  if(id==='curated-rounded-menu')await until(b,'!document.querySelector(".menu--open")',3000);
  if(id==='curated-inline-menu')await until(b,'!document.querySelector(".gallery--current")',3000);
  if(id==='curated-tooltip-gallery')await until(b,'!document.querySelector(".content--open")',3000);
  if(id==='curated-thumbnail-flow')await until(b,'getComputedStyle(document.querySelector(".big-featured__container")).opacity<.01&&getComputedStyle(document.querySelector(".open-button")).opacity>.99',3000);
  return actions;
 }
 if(id==='curated-layer-cut'){
  await until(b,'!document.body.classList.contains("loading")',10000);
  for(let n=0;n<2;n++){
   if(!await b.evaluate('!document.elementFromPoint(550,400)?.closest(".frame")'))throw new Error('Layer transition click is covered by the frame controls');
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:550,y:400});await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:550,y:400,button:'left',buttons:1,clickCount:1});await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:550,y:400,button:'left',buttons:0,clickCount:1});actions.push({action:'real_layer_cycle_click',x:550,y:400});await settled(b);
   await journeyState(b,'(()=>{const a=[...document.querySelectorAll(".content > .content__inner")],v=e=>!e.hidden&&!e.classList.contains("hidden")&&getComputedStyle(e).display!=="none"&&getComputedStyle(e).visibility!=="hidden";return a.length===2&&a.every((e,i)=>v(e)===(i==='+(n===0?1:0)+'))&&[...document.querySelectorAll(".layers__item")].every(e=>Number(getComputedStyle(e).opacity)<.01)})()','layer_content_'+(n===0?1:0),actions);
  }return actions;
 }
 if(id==='curated-grid-full'){
  for(const selector of ['.product:nth-child(3)','.product:nth-child(2)']){
   const point=await b.evaluate('(()=>{const e=document.querySelector('+JSON.stringify(selector)+');if(!e)throw new Error("Missing hover product");const r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});actions.push({action:'real_product_hover',selector,...point});await b.delay(1750);
  }await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:12,y:650});
  await until(b,'(()=>{const a=[...document.querySelectorAll(".product-preview")];return a.length===2&&a.every(e=>Number(getComputedStyle(e).opacity)<.01)})()',2500);
  await b.delay(50);return actions;
 }
 if(id==='curated-cloth-object'){
  const point=await clothPoint(b);
  await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});
  await b.delay(6100);actions.push({action:'real_cloth_animation_restart',...point,raycastHit:true,completeAnimationSeconds:6});return actions;
 }
 await b.delay(5500);actions.push({action:'existing_source_animation',durationMs:5500});return actions;
}
function motionWindow(analysis,start=0,end=Math.min(2.4,analysis.encodedDurationSeconds)){
 const times=analysis.transitions.filter(t=>t.visibleChange).map(t=>t.ptsSeconds);
 const inside=times.filter(t=>t>=start&&t<end),boundaries=[start,...inside,end];
 return {startSeconds:start,endSeconds:end,visibleChanges:inside.length,contentFPS:inside.length/Math.max(.01,end-start),
  longestHoldSeconds:Math.max(0,...boundaries.slice(1).map((v,i)=>v-boundaries[i]))};
}

async function runtimeSnapshot(folder,manifest){
 const entries=Object.entries(manifest.hashes||{}).filter(([file])=>file.startsWith('run/')).sort(([a],[b])=>a.localeCompare(b));
 for(const required of [manifest.run,manifest.entry])if(!entries.some(([file])=>file===required))throw new Error('Runtime file is absent from the source manifest: '+required);
 const checked=[];
 for(const [file,expected]of entries){
  const target=path.resolve(folder,file);if(!target.startsWith(folder+path.sep))throw new Error('Runtime source path escaped the asset');
  const actual=sha(await readFile(target));if(actual!==expected)throw new Error('Runtime source hash mismatch: '+manifest.id+'/'+file);
  checked.push([file,actual]);
 }
 return {scope:'all files declared under run/; excludes generated preview/poster',fileCount:checked.length,
  run:manifest.run,runSha256:checked.find(([f])=>f===manifest.run)[1],entry:manifest.entry,entrySha256:checked.find(([f])=>f===manifest.entry)[1],
  declaredFilesSha256:sha(JSON.stringify(checked))};
}
async function auditRecordedSources(){
 const ids=(process.argv[3]||'curated-telescope,curated-glass-torus,curated-metal-name,curated-liquid-grid,curated-depth').split(',');
 if(ids.some(id=>!catalogue.some(x=>x.id===id)))throw new Error('Unknown candidate for current source audit');
 const result={schema:'motion-vault.preview-current-source-audit.v1',at:new Date().toISOString(),
  claim:'This records only the current source bytes. It does not retroactively assert that earlier capture runs pinned every runtime file.',items:[]};
 for(const id of ids){const folder=path.join(root,'motion-vault-assets',id),manifest=JSON.parse(await readFile(path.join(folder,'asset.json'),'utf8'));
  result.items.push({id,version:manifest.version,previewVideoSha256:manifest.preview?.videoSha256,currentRuntime:await runtimeSnapshot(folder,manifest)});
 }
 const out='lineage/current/preview-playback/source-bindings-current.json';await guard(out,'evidence');await put(project,out,JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({report:out,at:result.at,items:result.items}));
}

async function captureBatch(){
 const ids=(process.argv[2]||'').split(',').filter(Boolean),runIndex=process.argv.indexOf('--run-id'),runId=runIndex<0?null:process.argv[runIndex+1];
 if(!runId||!/^[A-Za-z0-9._-]{6,80}$/.test(runId))throw new Error('An explicit unique --run-id is required for each capture batch');
 if(!ids.length||ids.length>8||new Set(ids).size!==ids.length||ids.some(id=>!catalogue.some(x=>x.id===id)))throw new Error('Choose 1–8 known candidate IDs for one bounded batch');
 const highPerformanceGPU=process.argv.includes('--high-performance-gpu');
 if(highPerformanceGPU&&ids.some(id=>!['curated-vortex-glass','curated-persistent-gallery','curated-elastic-editorial'].includes(id)))throw new Error('The opt-in GPU preference is limited to the three verified preview repairs');
 const trial=process.argv.includes('--trial'),dprIndex=process.argv.indexOf('--dpr'),dpr=dprIndex<0?1:Number(process.argv[dprIndex+1]);
 if(!Number.isFinite(dpr)||dpr<.5||dpr>1)throw new Error('Recording DPR must remain between delivery density and 1');
 const viewport={width:1100,height:670,deviceScaleFactor:dpr,mobile:false};
 const runtimeRel='.runtime/preview-playback',evidenceRel='lineage/current/preview-playback/capture-'+runId+'.json';
 await guard(runtimeRel,'runtime');await guard(evidenceRel,'evidence');await mkdir(path.join(project,runtimeRel),{recursive:true});
 const evidencePath=path.join(project,evidenceRel);
 if(await exists(evidencePath)){const prior=JSON.parse(await readFile(evidencePath,'utf8'));console.log(JSON.stringify({runId,existingRun:true,state:prior.state,report:evidenceRel}));if(prior.state!=='completed')process.exitCode=1;return;}
 const lockPath=path.join(project,runtimeRel,'capture-active.json'),nonce=randomUUID();let lock;
 try{lock=await open(lockPath,'wx');await lock.writeFile(JSON.stringify({runId,pid:process.pid,nonce,startedAt:new Date().toISOString()}));await lock.close();}
 catch(e){if(e.code!=='EEXIST')throw e;const owner=JSON.parse(await readFile(lockPath,'utf8'));throw new Error('Capture lock belongs to another run: '+JSON.stringify(owner));}
 const scriptSha256=sha(await readFile(fileURLToPath(import.meta.url)));
 const batch={schema:'motion-vault.native-capture-batch.v1',runId,startedAt:new Date().toISOString(),state:'running',ids,scriptSha256,recordOptions,viewport,trial,highPerformanceGPU,reports:[]};
 const save=()=>put(project,evidenceRel,JSON.stringify(batch,null,2)+'\n');
 try{
  await save();
  await withStage(root,s=>withBrowser(async b=>{
   batch.browser=await b.send('Browser.getVersion');
   await b.call('Emulation.setDeviceMetricsOverride',viewport);
   await b.call('Network.enable');await b.call('Page.addScriptToEvaluateOnNewDocument',{source:errorProbe});
   for(const id of ids){
    const folder=path.join(root,'motion-vault-assets',id),manifestFile=path.join(folder,'asset.json'),manifestBytes=await readFile(manifestFile),manifest=JSON.parse(manifestBytes);
    const report={id,version:manifest.version,passed:false,previousVideoSha256:manifest.preview?.videoSha256},responses=[];
    const unwatch=b.onEvent('Network.responseReceived',p=>{if(p.response.status>=400&&p.response.url.includes('/motion-vault-assets/'+id+'/'))responses.push({url:p.response.url,status:p.response.status})});
    try{
     report.sourceBefore=await runtimeSnapshot(folder,manifest);
     await b.goto(s.url+'/motion-vault-assets/'+id+'/'+manifest.run,400);
     await until(b,'document.readyState==="complete"&&(window.SourceDemo?.ready||window.assetReady)&&[...document.images].every(i=>i.complete&&i.naturalWidth>0)',20000);
     if(['curated-depth','curated-metal-name','curated-liquid-grid','curated-glass-torus'].includes(id))await until(b,'document.body.dataset.environment==="ready"',15000);
     if(id==='curated-webgpu-route')await until(b,'document.getElementById("preloader")&&getComputedStyle(document.getElementById("preloader")).display==="none"',20000);
     await b.delay(1500);await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:12,y:650});
     if(scrollIds.has(id)&&id!=='curated-camera-route')await b.evaluate('SourceDemo.scroll('+(scrollRanges[id]?.[0]||0)+')');
     if(id==='curated-depth')await b.evaluate('SourceDemo.scroll(.24)');
     if(id==='curated-elastic-editorial')report.elasticBaseline=await settleElasticColumns(b,true);
     if(continuousIds.has(id)){report.prewarm=await rafScroll(b,id,scrollRanges[id]||[0,.68]);await b.evaluate('SourceDemo.scroll('+(scrollRanges[id]?.[0]||0)+')');}
     if(pointerIds.has(id))report.prewarm=await pointerMotion(b,{drag:id!=='curated-fluid-xray'});
     if(id==='curated-glass-torus')report.prewarm=await pointerMotion(b,{drag:false,durationMs:6500,amplitude:[260,145]});
     if(['curated-webgpu-route','curated-persistent-gallery','curated-spatial-product','curated-cloth-object'].includes(id))report.prewarm=await driveScene(b,id);
     await b.delay(120);
     if(id==='curated-vortex-glass'||highPerformanceGPU){
      report.graphics=await b.evaluate('(()=>{const r=window.experience?.renderer?.instance,b=r?.backend,d=b?.device,i=d?.adapterInfo;return{source:"existing renderer backend and existing GPUDevice.adapterInfo",isWebGPUBackend:b?.isWebGPUBackend===true,backendName:b?.constructor?.name||null,canvas:[r?.domElement?.width,r?.domElement?.height],pixelRatio:r?.getPixelRatio?.(),activeAdapter:i?Object.fromEntries(["vendor","architecture","device","description","isFallbackAdapter"].map(k=>[k,i[k]??null])):null}})()');
      const hardware=await b.send('SystemInfo.getInfo');report.graphics.browserGPU={devices:hardware.gpu?.devices,featureStatus:hardware.gpu?.featureStatus,glRenderer:hardware.gpu?.auxAttributes?.glRenderer};
     }
     const recording=await recordNative(b,()=>driveScene(b,id));
     const runtimeReport=await b.evaluate('({issues:__captureIssues,csp:__captureCSP,sourceErrors:window.sourceErrors||[],inputs:__captureInputs,outside:performance.getEntriesByType("resource").filter(r=>!r.name.startsWith(location.origin)&&!r.name.startsWith("blob:")&&!r.name.startsWith("data:")).map(r=>r.name)})');
     if(runtimeReport.issues.length||runtimeReport.sourceErrors.length||runtimeReport.csp.length||runtimeReport.outside.length||responses.length)throw new Error('Source recording errors: '+JSON.stringify({runtimeReport,responses}));
     await b.goto('about:blank',50);
     const prefix=runtimeRel+'/'+runId+'/'+id,rawRel=prefix+'/native.mp4',outRel=prefix+'/preview.mp4',posterRel=prefix+'/poster.jpg';
     await put(project,rawRel,recording.bytes);const native=inspectPreviewFile(path.join(project,rawRel));
     if(native.analysis.visibleChanges<12)throw new Error('Native recording has too little visual movement: '+native.analysis.visibleChanges);
     const candidateTrimStart=Math.max(0,(native.analysis.firstVisibleChangeSeconds||0)-1/60),candidateTrimEnd=Math.min(native.analysis.encodedDurationSeconds,(native.analysis.lastVisibleChangeSeconds||0)+.08);
     const nativeDirect=nativeDirectIds.has(id),nativeDuration=Number(native.probe.streams[0].duration);
     const trimStart=nativeDirect?0:candidateTrimStart,trimEnd=nativeDirect?nativeDuration:candidateTrimEnd;
     let nativeContainer;
     if(nativeDirect){
      let offset=0,moovEnd=null,firstMdat=null,fragmented=false;
      while(offset+8<=recording.bytes.length){const n=recording.bytes.readUInt32BE(offset),type=recording.bytes.toString('ascii',offset+4,offset+8),size=n===1?Number(recording.bytes.readBigUInt64BE(offset+8)):n||recording.bytes.length-offset;
       if(size<8||offset+size>recording.bytes.length)throw new Error('Malformed native MP4 box');
       if(type==='moov')moovEnd=offset+size;if(type==='mdat'&&firstMdat===null)firstMdat=offset;if(type==='moof')fragmented=true;offset+=size;}
      nativeContainer={initMoovBeforeMdat:moovEnd!==null&&firstMdat!==null&&moovEnd<=firstMdat,fragmented};
      if(native.probe.streams[0].codec_name!=='av1'||!nativeContainer.initMoovBeforeMdat||candidateTrimStart>.5||nativeDuration-candidateTrimEnd>.5)throw new Error('Native AV1 direct delivery failed container or endpoint checks');
      await put(project,outRel,recording.bytes);
     }else execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-threads','1','-i',path.join(project,rawRel),
      '-vf','trim=start='+trimStart+':end='+trimEnd+',setpts=PTS-STARTPTS,scale=in_range=pc:out_range=tv','-filter_threads','1',
      '-c:v','libx264','-threads','1','-preset','fast','-crf','20','-pix_fmt','yuv420p','-color_range','tv',
      '-fps_mode','passthrough','-enc_time_base','demux','-video_track_timescale','60000','-an','-movflags','+faststart',path.join(project,outRel)],
      {windowsHide:true,stdio:'pipe',timeout:45000});
     const encoded=nativeDirect?native:inspectPreviewFile(path.join(project,outRel)),analysis=encoded.analysis,firstWindow=motionWindow(analysis);
     const quality={nativeFrames:native.analysis.decodedFrames,encodedFrames:analysis.decodedFrames,visibleChanges:analysis.visibleChanges,
      fullContentFPS:analysis.visibleChangesPerEncodedSecond,firstWindow,fullWindow:motionWindow(analysis,0,analysis.encodedDurationSeconds),maxEncodedFrameGapSeconds:analysis.decodedFrameIntervalSeconds.max,loopBoundary:analysis.loopBoundary,continuousRequired:continuousIds.has(id),
      noSyntheticFrameIncrease:analysis.decodedFrames<=native.analysis.decodedFrames};
     report.quality=quality;report.native={videoSha256:sha(recording.bytes),bytes:recording.bytes.length,probe:native.probe,analysis:Object.fromEntries(Object.entries(native.analysis).filter(([key])=>key!=='transitions'))};
     report.trim=nativeDirect?{applied:false,startSeconds:0,endSeconds:nativeDuration}:{startSeconds:trimStart,endSeconds:trimEnd};
     if(nativeDirect)report.delivery={method:'native_exact_bytes',codec:'av1',nativeFile:rawRel,nativeSha256:sha(recording.bytes),allNativeFramesPreserved:true,originalPacketTimestampsPreserved:true,encoded:false,container:nativeContainer};report.analysis=Object.fromEntries(Object.entries(analysis).filter(([key])=>key!=='transitions'));report.actions=recording.actions;report.inputs=runtimeReport.inputs;
     if(!quality.noSyntheticFrameIncrease||analysis.visibleChanges<12)throw new Error('Encoded preview does not retain real native motion');
     if(continuousIds.has(id)&&(firstWindow.contentFPS<45||firstWindow.longestHoldSeconds>.16))throw new Error('Continuous preview failed first-window real motion gate: '+JSON.stringify(firstWindow));
     if(id==='curated-glass-torus'&&analysis.decodedFrameIntervalSeconds.max>.16)throw new Error('Glass capture contains an actual frame gap over 160 ms');
     if(['curated-telescope','curated-elastic-editorial'].includes(id)&&analysis.loopBoundary.meanAbsoluteLumaDelta>3)throw new Error('Recording does not close its source scroll cycle: '+id);
     if(id==='curated-depth'&&firstWindow.contentFPS<45)throw new Error('Depth recording starts before useful visible motion');
     if(id==='curated-vortex-glass'&&highPerformanceGPU&&(firstWindow.contentFPS<45||quality.fullContentFPS<45||report.graphics?.activeAdapter?.vendor!=='nvidia'))throw new Error('Vortex did not retain the verified active GPU and real frame cadence');
     const posterTime=Math.min(analysis.encodedDurationSeconds*.48,Math.max(0,analysis.encodedDurationSeconds-.08));
     execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-threads','1','-ss',String(posterTime),'-i',path.join(project,outRel),'-frames:v','1','-threads','1','-q:v','2',path.join(project,posterRel)],{windowsHide:true,stdio:'pipe',timeout:30000});
     const video=await readFile(path.join(project,outRel)),poster=await readFile(path.join(project,posterRel));
     if(nativeDirect&&sha(video)!==sha(recording.bytes))throw new Error('Native direct preview bytes changed');
     report.sourceAfter=await runtimeSnapshot(folder,manifest);
     if(sha(await readFile(manifestFile))!==sha(manifestBytes)||report.sourceBefore.declaredFilesSha256!==report.sourceAfter.declaredFilesSha256)throw new Error('Source changed while recording '+id);
     manifest.status='local_source_verified';manifest.preview={...manifest.preview,kind:manifest.kind==='independent_code'?'local_render':'adapted_source_render',captured:true,
      poster:'poster.jpg',video:'preview.mp4',posterSha256:sha(poster),videoSha256:sha(video),videoBytes:video.length,implementationVersion:manifest.version,
      captureMethod:nativeDirect?'Original native browser AV1 MP4 recording delivered byte-for-byte; initialization metadata precedes media fragments, and all recorded timestamps are preserved.':'Native browser MP4 recording with source RAF or actual pointer journeys, converted to H.264 without FPS upsampling; original local implementation, not an original-site recording.',
      capture:{runId,at:new Date().toISOString(),viewport,highPerformanceGPU,maxFrameRate:60,codec:nativeDirect?'av1':'h264',...(nativeDirect?{encoding:{codec:'av1',method:'native_exact_bytes',profile:native.probe.streams[0].profile,pixelFormat:native.probe.streams[0].pix_fmt,colorRange:native.probe.streams[0].color_range,timing:'original_vfr'},nativeDirect:{runId,receipt:evidenceRel,nativeSha256:sha(recording.bytes),allNativeFramesPreserved:true,originalPTSPreserved:true}}:{}),timing:'VFR; original recorded frame intervals',durationSeconds:analysis.encodedDurationSeconds,frameCount:analysis.decodedFrames,visualChanges:analysis.visibleChanges,firstWindow}};
     manifest.verification={...manifest.verification,at:new Date().toISOString(),localRuntime:true,realInput:recording.actions,
      scrollDrive:recording.actions.some(a=>a.action==='source_scroll_raf')?'page_raf_source_scroll':null,distinctFrames:analysis.visibleChanges+1,errors:[],noExternalRequests:true};
     if(!trial){await atomic(path.join(folder,'preview.mp4'),video);await atomic(path.join(folder,'poster.jpg'),poster);await atomic(manifestFile,JSON.stringify(manifest,null,2)+'\n');}
     report.stagedModified=!trial;
     if(process.argv.includes('--emit-poster')){
      console.log(JSON.stringify({id,previewImage:'after',data:poster.toString('base64')}));
      if(trial&&JSON.parse(manifestBytes).preview?.poster)console.log(JSON.stringify({id,previewImage:'before',data:(await readFile(path.join(folder,JSON.parse(manifestBytes).preview.poster))).toString('base64')}));
     }
     Object.assign(report,{passed:true,frames:analysis.decodedFrames,distinct:analysis.visibleChanges+1,videoBytes:video.length,videoSha256:sha(video),posterSha256:sha(poster),probe:encoded.probe,issues:[],csp:[],external:[],wallDurationMs:recording.wallDurationMs});
     if(!trial)await put(project,'lineage/current/capture/'+id+'.json',JSON.stringify(report,null,2)+'\n');
     console.log(JSON.stringify({runId,id,passed:true,trial,dpr,videoSha256:report.videoSha256,videoBytes:video.length,quality}));
    }catch(e){report.error=e.stack||e.message;try{report.pageFailure=await b.evaluate('({url:location.href,current:[...document.querySelectorAll(".gallery--current")].map(e=>e.id),lastClick:window.__captureClick,activeAnimations:window.gsap?.globalTimeline.getChildren(true,true,true).filter(t=>t.isActive()).map(t=>({type:t.constructor.name,repeat:t.repeat(),progress:t.totalProgress(),duration:t.totalDuration()}))})')}catch{}console.error(JSON.stringify({runId,id,passed:false,error:report.error,pageFailure:report.pageFailure}));}
    finally{unwatch();batch.reports.push(report);await save();await b.goto('about:blank',50);}
    if(!report.passed)break;
   }
  },{gpu:true,highPerformanceGPU}));
  batch.browserClosed=true;batch.finishedAt=new Date().toISOString();
  batch.sourceScriptUnchanged=scriptSha256===sha(await readFile(fileURLToPath(import.meta.url)));
  batch.state=batch.reports.length===ids.length&&batch.reports.every(r=>r.passed)&&batch.sourceScriptUnchanged?'completed':'failed';
  await save();console.log(JSON.stringify({runId,state:batch.state,passed:batch.reports.filter(r=>r.passed).length,total:ids.length,report:evidenceRel,browserClosed:true}));
  if(batch.state!=='completed')process.exitCode=1;
 }catch(e){batch.state='failed';batch.error=e.stack||e.message;batch.finishedAt=new Date().toISOString();await save();throw e;}
 finally{try{const owner=JSON.parse(await readFile(lockPath,'utf8'));if(owner.nonce===nonce)await unlink(lockPath);}catch(e){if(e.code!=='ENOENT')throw e;}}
}
if(process.argv[2]==='--native-probe')await nativeTelescopeProbe();
else if(process.argv[2]==='--audit-sources')await auditRecordedSources();
else await captureBatch();
