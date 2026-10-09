// Capture downloaded project references through the existing isolated browser.
// Never touch the user's Chrome profile or promote curation/visual acceptance.
import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {project,sha,guard,put} from './build-hybrid.mjs';
import {withBrowser,withStage,until} from '../src/hybrid/browser-tools.mjs';
import {inspectPreviewFile} from '../src/hybrid/diagnose-preview-media.mjs';

const registry=JSON.parse(await readFile(path.join(project,'src/hybrid/source-expansion-catalog.json'),'utf8'));
const selected=(process.argv[2]||'').split(',').filter(Boolean);
const runId=process.argv[process.argv.indexOf('--run-id')+1];
const apply=process.argv.includes('--apply');
if(!process.argv.includes('--run-id')||!/^[A-Za-z0-9._-]{6,80}$/.test(runId||''))throw Error('Use explicit unique --run-id');
if(!selected.length||selected.length>8||new Set(selected).size!==selected.length||selected.some(id=>!registry.some(s=>s.id===id)))throw Error('Select 1-8 registered expansion IDs');
const work='_work/preview-repair-20261008/'+runId;
const evidence=work+'/receipt.json';
await guard(work,'work');await guard(evidence,'work');await guard('.runtime/formal-merge','runtime');
try{await readFile(path.join(project,evidence));throw Error('Run already exists; use a fresh ID');}catch(e){if(e.code!=='ENOENT')throw e;}
const recorderSha256=sha(await readFile(fileURLToPath(import.meta.url)));
const report={schema:'motion-vault.expansion-capture.v1',runId,startedAt:new Date().toISOString(),recorderSha256,state:'running',apply,ids:selected,items:[],visualAcceptance:false,curationChanged:false};
const save=()=>put(project,evidence,JSON.stringify(report,null,2)+'\n');
await save();
const controls={
 'mv2-repeating-image':['.grid__item','.panel__close'],
 'mv2-grid-push':['.grid__item'],
 'mv2-paranoia-filter':['.nav--next','.nav--prev'],
 'mv2-stack-content':['.stack__item:nth-child(2)'],
 'cloud-kinetic-handoff':['[data-go="1"]','[data-go="0"]'],
 'cloud-context-search':['#open-search','#back-search'],
 'cloud-radial-cover-nav':['#menu-toggle','#menu-toggle']
};
async function snapshot(folder,manifest){
 const entries=Object.entries(manifest.hashes).filter(([name])=>name.startsWith('run/')).sort(([a],[b])=>a.localeCompare(b));
 const actual=[];
 for(let offset=0;offset<entries.length;offset+=8){
  const chunk=await Promise.all(entries.slice(offset,offset+8).map(async([name,expected])=>{
   const file=path.resolve(folder,name);if(!file.startsWith(folder+path.sep)||name.includes('..'))throw Error('Unsafe runtime source');
   const digest=sha(await readFile(file));if(digest!==expected)throw Error('Runtime changed '+manifest.id+'/'+name);return[name,digest];
  }));actual.push(...chunk);
 }
 return{files:actual.length,sha256:sha(JSON.stringify(actual)),run:manifest.hashes[manifest.run],entry:manifest.hashes[manifest.entry]};
}
async function click(b,selector){
 const quoted=JSON.stringify(selector);
 await b.evaluate('document.querySelector('+quoted+')?.scrollIntoView({block:"center",behavior:"instant"})');
 await b.delay(150);
 const p=await b.evaluate('(()=>{const e=document.querySelector('+quoted+');if(!e)throw Error("Missing source control");const r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2,hit=document.elementFromPoint(x,y);if(!r.width||!r.height||!(hit===e||e.contains(hit)))throw Error("Source control not hittable");return{x,y}})()');
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});
 await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...p,button:'left',buttons:1,clickCount:1});
 await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...p,button:'left',buttons:0,clickCount:1});
 return{action:'real_source_click',selector,...p};
}
async function drive(b,spec){
 const actions=[];
 if(spec.id==='spatial-dithering-cubes'){
  const result=await b.evaluate('new Promise(resolve=>{const started=performance.now();let updates=0;requestAnimationFrame(function paint(now){const t=Math.min(1,(now-started)/5000);SourceDemo.setProgress(t<.5?t*2:2-t*2);updates++;if(t<1)requestAnimationFrame(paint);else resolve({action:"existing_source_shader_progress_cycle",updates,durationMs:now-started})})})');
  actions.push(result);
 }else if(spec.preview_mode==='click'){
  for(const selector of controls[spec.id]||[]){actions.push(await click(b,selector));await b.delay(1800);}
  if(!actions.length)throw Error('No declared source controls '+spec.id);
  await b.delay(900);
 }else if(spec.preview_mode==='scroll'){
  for(const deltaY of [320,320,320,320,320,320,-320,-320,-320,-320,-320,-320]){
   await b.call('Input.dispatchMouseEvent',{type:'mouseWheel',x:700,y:420,deltaX:0,deltaY});await b.delay(280);
  }
  actions.push({action:'real_source_scroll_cycle',wheelEvents:12});await b.delay(1200);
 }else{
  const drag=spec.preview_mode==='drag',start={x:550,y:350};
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...start});
  if(drag)await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...start,button:'left',buttons:1,clickCount:1});
  try{for(let i=0;i<72;i++){const t=i/71*Math.PI*2;await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:550+Math.sin(t)*210,y:350+Math.sin(t*2)*100,buttons:drag?1:0,button:drag?'left':'none'});await b.delay(65);}}
  finally{if(drag)await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...start,button:'left',buttons:0,clickCount:1});}
  actions.push({action:drag?'real_source_drag_cycle':'real_source_pointer_cycle',steps:72});await b.delay(650);
 }
 return actions;
}
async function record(b,spec){
 let handle,recording=false;
 try{
  const start=await b.call('Page.startScreenRecording',{audio:false,frameRate:60,maxWidth:660,maxHeight:402});handle=start.stream;
  if(!handle)throw Error('Native recorder returned no stream');recording=true;
  const actions=await drive(b,spec);await b.call('Page.stopScreenRecording');recording=false;
  const chunks=[];let bytes=0;
  for(let n=0;n<128;n++){
   const chunk=await b.call('IO.read',{handle,size:1024*1024});const data=Buffer.from(chunk.data||'',chunk.base64Encoded?'base64':'utf8');bytes+=data.length;
   if(bytes>64*1024*1024)throw Error('Preview recording exceeds bound');chunks.push(data);
   if(chunk.eof)return{bytes:Buffer.concat(chunks),actions};
  }throw Error('Preview recording stream did not finish');
 }finally{if(recording)try{await b.call('Page.stopScreenRecording')}catch{}if(handle)try{await b.call('IO.close',{handle})}catch{}}
}
try{
 await withStage(path.join(project,'assets/design-assets'),s=>withBrowser(async b=>{
  report.browser=await b.send('Browser.getVersion');
  await b.call('Emulation.setDeviceMetricsOverride',{width:1100,height:670,deviceScaleFactor:1,mobile:false});
  await b.call('Network.enable');
  await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__captureErrors=[];window.__captureInputs={};addEventListener("error",e=>__captureErrors.push(e.error?.message||e.message));addEventListener("unhandledrejection",e=>__captureErrors.push(String(e.reason)));for(const t of ["click","pointermove","pointerdown","wheel"])document.addEventListener(t,e=>{if(e.isTrusted)__captureInputs[t]=(__captureInputs[t]||0)+1},true);'});
  for(const id of selected){
   const spec=registry.find(s=>s.id===id),folder=path.join(project,'assets/design-assets',id),mf=path.join(folder,'asset.json');
   const manifestBytes=await readFile(mf),manifest=JSON.parse(manifestBytes),item={id,version:manifest.version,passed:false},responses=[],auxiliaryResponses=[];
   report.items.push(item);await save();
   const unwatch=b.onEvent('Network.responseReceived',p=>{if(p.response.status>=400){const r={status:p.response.status,url:p.response.url};(p.response.url.startsWith(s.url+'/'+id+'/')?responses:auxiliaryResponses).push(r);}});
   try{
    item.sourceBefore=await snapshot(folder,manifest);
    await b.goto(s.url+'/'+id+'/'+manifest.run,400);
    await until(b,'document.readyState==="complete"&&!!window.SourceDemo',25000);
    item.initialization=await b.evaluate('(()=>{if(typeof SourceDemo.ready?.then!=="function")throw Error("Source lacks its required readiness Promise");return SourceDemo.ready.then(()=>({...SourceDemo.inspect(),readinessPromiseFulfilled:true}))})()');
    if(item.initialization.disposed||item.initialization.error||item.initialization.errors?.length)throw Error('Source initialization failed '+JSON.stringify(item.initialization));
    await b.delay(650);
    const recording=await record(b,spec);
    const runtime=await b.evaluate('({errors:__captureErrors,sourceErrors:window.assetErrors||[],inputs:__captureInputs,outside:performance.getEntriesByType("resource").filter(r=>!r.name.startsWith(location.origin)&&!r.name.startsWith("blob:")&&!r.name.startsWith("data:")).map(r=>r.name)})');
    if(runtime.errors.length||runtime.sourceErrors.length||runtime.outside.length||responses.length)throw Error('Real runtime errors '+JSON.stringify({runtime,responses}));
    item.runtime=runtime;item.actions=recording.actions;item.auxiliaryResponses=auxiliaryResponses;
    await b.goto('about:blank',30);
    const rel=work+'/'+id;await guard(rel,'work');await mkdir(path.join(project,rel),{recursive:true});
    const raw=path.join(project,rel,'native.mp4'),videoPath=path.join(project,rel,'preview.mp4'),posterPath=path.join(project,rel,'poster.jpg');
    await writeFile(raw,recording.bytes);
    const native=inspectPreviewFile(raw);
    if(native.analysis.visibleChanges<12)throw Error('Native preview has insufficient visual motion: '+native.analysis.visibleChanges);
    execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-threads','1','-i',raw,'-c:v','libx264','-preset','fast','-crf','24','-pix_fmt','yuv420p','-fps_mode','vfr','-movflags','+faststart','-an',videoPath],{windowsHide:true,stdio:'pipe',timeout:60000});
    const encoded=inspectPreviewFile(videoPath),analysis=encoded.analysis;
    if(analysis.visibleChanges<12||analysis.decodedFrames>native.analysis.decodedFrames||analysis.encodedDurationSeconds<2)throw Error('Preview does not retain real motion');
    const posterTime=analysis.encodedDurationSeconds*.45;
    execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-threads','1','-ss',String(posterTime),'-i',videoPath,'-frames:v','1','-threads','1','-q:v','2',posterPath],{windowsHide:true,stdio:'pipe',timeout:30000});
    const video=await readFile(videoPath),poster=await readFile(posterPath);
    item.sourceAfter=await snapshot(folder,manifest);
    if(item.sourceAfter.sha256!==item.sourceBefore.sha256||sha(await readFile(mf))!==sha(manifestBytes))throw Error('Source changed during capture');
    item.media={video:rel+'/preview.mp4',poster:rel+'/poster.jpg',videoSha256:sha(video),posterSha256:sha(poster),bytes:video.length,nativeFrames:native.analysis.decodedFrames,frames:analysis.decodedFrames,visibleChanges:analysis.visibleChanges,durationSeconds:analysis.encodedDurationSeconds,sourceVersion:manifest.version};
    if(apply){
     for(const name of ['preview.mp4','poster.jpg'])await guard('assets/design-assets/'+id+'/'+name,'input');
     manifest.status='local_source_verified';
     manifest.preview={captured:true,kind:manifest.kind==='independent_code'?'local_render':'adapted_source_render',implementationVersion:manifest.version,poster:'poster.jpg',video:'preview.mp4',posterSha256:sha(poster),videoSha256:sha(video),videoBytes:video.length,capture:{runId,receipt:evidence,at:new Date().toISOString(),method:'Native browser recording of unchanged local source and trusted CDP inputs; H.264 VFR without frame synthesis',viewport:{width:1100,height:670},frames:analysis.decodedFrames,visualChanges:analysis.visibleChanges,durationSeconds:analysis.encodedDurationSeconds}};
     manifest.validation={...manifest.validation,browser:'real_initialization_and_capture_passed',pointer:Object.values(runtime.inputs).some(n=>n>0)?'trusted_native_input_recorded':'source_parameter_drive_only',visual:'not_accepted',production:'not_approved'};
     manifest.verification={localRuntime:true,noExternalRequests:true,errors:[],sourceBefore:item.sourceBefore,sourceAfter:item.sourceAfter,receipt:evidence};
     await writeFile(path.join(folder,'preview.mp4'),video);await writeFile(path.join(folder,'poster.jpg'),poster);
     const temp=mf+'.capture-'+randomUUID();await writeFile(temp,JSON.stringify(manifest,null,2)+'\n');await rename(temp,mf);
    }
    item.passed=true;item.applied=apply;
    console.log(JSON.stringify({id,passed:true,applied:apply,media:item.media}));
   }catch(e){item.error=e.stack||e.message;try{item.failureState=await b.evaluate('({url:location.href,title:document.title,errors:window.assetErrors,source:window.SourceDemo?.inspect()})')}catch{}console.error(JSON.stringify({id,passed:false,error:item.error}));await save();throw e;}
   finally{unwatch();await save();}
  }
 },{gpu:true}));
 if(sha(await readFile(fileURLToPath(import.meta.url)))!==recorderSha256)throw Error('Capture script changed during execution');
 report.state='completed';report.completedAt=new Date().toISOString();await save();
 console.log(JSON.stringify({runId,state:report.state,passed:report.items.filter(i=>i.passed).length,total:selected.length,evidence}));
}catch(e){report.state='failed';report.error=e.message;await save();process.exitCode=1;}
