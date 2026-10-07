// Verify actual gallery playback without readback interference, source RGB continuity,
// and real pixel changes after the performance window. Keep their clocks separate.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {withBrowser,withStage,until} from './browser-tools.mjs';
import {project,root,sha,put} from '../../scripts/build-hybrid.mjs';

const args=process.argv.slice(2),option=(key,fallback)=>{const n=args.indexOf(key);return n<0?fallback:args[n+1];};
const live=!args.includes('--stage'),label=option('--label','probe'),sampleMs=Number(option('--sample-ms','2400'));
const sourceLabel=option('--source-report','remaining-source-rgb');
const httpPlaybackControl=args.includes('--http-playback-control'),diagnosticOnly=httpPlaybackControl||args.includes('--diagnostic'),playbackControlMappings=[];
const selectedIds=option('--ids','').split(',').filter(Boolean),requiredLoops=Number(option('--require-loops','0')),runId=randomUUID(),startedAt=new Date().toISOString();
if(!/^[a-zA-Z0-9_-]{1,50}$/.test(label)||!/^[a-zA-Z0-9_-]{1,50}$/.test(sourceLabel)||sampleMs<1200||sampleMs>22000||!Number.isInteger(requiredLoops)||requiredLoops<0||requiredLoops>3)throw new Error('Use a simple label, 1200–22000ms samples and 0–3 required loops');
const sourcePath=fileURLToPath(import.meta.url),sourceHash=sha(await readFile(sourcePath));
const mainPath=path.join(live?project:root,live?'web/index.html':'index.html');
const candidatePath=path.join(live?project:root,live?'candidates/curated-originals/index.html':'candidates.html');
const formalHash=sha(await readFile(mainPath)),candidateHash=sha(await readFile(candidatePath));
const catalogueBytes=await readFile(path.join(live?project:root,live?'web/candidate-catalog.json':'candidate-catalog.json')),catalogueHash=sha(catalogueBytes),catalogue=JSON.parse(catalogueBytes);
const items=catalogue.items.filter(i=>!selectedIds.length||selectedIds.includes(i.id));
if(!items.length||selectedIds.some(id=>!items.some(i=>i.id===id)))throw new Error('Unknown candidate IDs');
const assets=[];for(const item of items)assets.push({id:item.id,version:item.asset.version,video:item.asset.video,videoRevision:item.asset.videoRevision,sha256:sha(await readFile(path.join(live?path.join(project,'web'):root,item.asset.video)))});
const sourceReportRelative='lineage/current/preview-playback/'+sourceLabel+'.json';
const sourceReportPath=path.join(project,sourceReportRelative),sourceReportBytes=await readFile(sourceReportPath),sourceReportHash=sha(sourceReportBytes),sourceEvidence=JSON.parse(sourceReportBytes);
const analyzerPath=path.join(project,'src/hybrid/diagnose-preview-media.mjs'),analyzerHash=sha(await readFile(analyzerPath));
const sourceEvidenceValid=sourceEvidence.profile==='rgb'&&sourceEvidence.analyzerSha256===analyzerHash&&sourceEvidence.catalogSha256===catalogueHash&&sourceEvidence.mainHtmlSha256===formalHash&&sourceEvidence.summary?.versionsAndHashesMatch===true;
const sourceMediaEvidence={path:sourceReportRelative,sha256:sourceReportHash,analyzerSha256:analyzerHash,generatedAt:sourceEvidence.generatedAt,profile:sourceEvidence.profile,tools:sourceEvidence.tools};
function sourceContentFor(item){
  const row=sourceEvidence.items?.find(x=>x.id===item.id),d=row?.decodedAnalysis;
  if(!d)return {basis:'offline-file-pts',complete:false};
  const asset=assets.find(x=>x.id===item.id),i=d.integrity||{},s=d.sampling||{},rule=d.visibleChangeRule||{};
  const timeline=d.frameTimeline,order=d.presentationOrder;
  const ordered=Array.isArray(timeline)&&Array.isArray(order)&&order.length===d.decodedFrames&&new Set(order).size===d.decodedFrames&&order.every((index,n)=>Number.isInteger(index)&&index>=0&&index<timeline.length&&(!n||timeline[index].pts>=timeline[order[n-1]].pts));
  const complete=ordered&&d.startSeconds===0&&d.streamStartPts===0&&sourceEvidenceValid&&row.videoSha256===asset.sha256&&d.mediaSha256===asset.sha256&&d.mediaUnchanged===true&&d.profile==='rgb'&&s.width===96&&s.height===58&&s.pixelFormat==='rgb24'&&s.scale==='bilinear'&&rule.maximumAbsoluteRGBChannelDeltaOver===3&&rule.changedPixelFractionOver===.002&&i.complete===true&&i.sourceUnchanged===true&&i.originalPtsMatched===true&&i.decoderPtsMatched===true&&i.frameIndicesContiguous===true&&d.decodedFrames>=10&&[i.decodedFrames,i.rawFrameBlocks,i.showinfoFrames,i.originalPacketFrames,i.originalFramePts,d.frameTimeline?.length].every(n=>n===d.decodedFrames)&&d.transitions?.length===d.decodedFrames-1&&d.frameTimeline.every((f,n)=>f.index===n&&Number.isSafeInteger(f.pts)&&Number.isSafeInteger(f.decoderPts)&&Number.isSafeInteger(f.duration)&&f.duration>=0&&/^[a-f0-9]{64}$/.test(f.rgbSha256));
  return {basis:'offline-file-pts',complete,mediaSha256:d.mediaSha256,reportSha256:sourceReportHash,analyzerSha256:analyzerHash,sampling:s,visibleChangeRule:rule,integrity:i,decodedFrames:d.decodedFrames,encodedDurationSeconds:d.encodedDurationSeconds,contentFps:d.visibleChangesPerEncodedSecond,contentGapP95Ms:d.contentGapP95Ms,maxVisualHoldMs:d.maxVisualHoldMs,loopContentFps:d.loopBoundary?.cyclicVisibleChangesPerSecond,loopContentGapP95Ms:d.loopBoundary?.cyclicGapP95Ms,loopMaxVisualHoldMs:d.loopBoundary?.cyclicMaxHoldMs,noVisibleChanges:d.loopBoundary?.noVisibleChanges,interpretation:d.interpretation};
}
function applyFrameTailBudget(item,result){
  const d=sourceEvidence.items?.find(x=>x.id===item.id)?.decodedAnalysis;
  const timeline=(d?.presentationOrder||[]).map(index=>d.frameTimeline[index]),lastTime=result.lastFrameMediaTime;
  const [tbN,tbD]=String(d?.timeBase||'').split('/').map(Number),precision=(tbN/tbD)*.5+.000001;
  const sourceTime=Number.isFinite(lastTime)&&Number.isFinite(d?.startSeconds)?lastTime+d.startSeconds:null;
  const next=sourceTime===null?null:timeline.find(f=>f.duration>0&&f.ptsSeconds>sourceTime+precision);
  const nextTime=next?.ptsSeconds??d?.endSeconds;
  const budget=sourceTime!==null&&Number.isFinite(nextTime)?(nextTime-sourceTime)*1000:null;
  result.frameTailBudgetMs=Number.isFinite(budget)&&budget>=0?+budget.toFixed(4):null;
  result.frameTailDelayExcessMs=Number.isFinite(result.frameTailBudgetMs)?+Math.max(0,result.frameTailMs-result.frameTailBudgetMs).toFixed(4):null;
}
const checks=[],samples=[],network=[],errors=[],continuous=new Set(['curated-telescope','curated-image-in-type','curated-editorial-layout']);
const check=(name,pass,detail)=>checks.push({name,pass:!!pass,detail});
check('Source RGB evidence matches current catalogue and analyzer',sourceEvidenceValid,sourceMediaEvidence);
// Diagnostic-only transport control. The default run installs no source setter hook.
function installHttpPlaybackControl(){
  const descriptor=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,'src');
  if(!descriptor?.set||!descriptor?.get)throw new Error('Native media src accessor unavailable');
  window.__previewPlaybackControl=[];
  Object.defineProperty(HTMLMediaElement.prototype,'src',{...descriptor,set(value){
    const canonical=this.dataset?.previewSource;
    if(typeof value==='string'&&value.startsWith('blob:')&&canonical){
      const at=performance.now();
      descriptor.set.call(this,canonical);
      window.__previewPlaybackControl.push({requestedBlob:value,canonicalHTTP:canonical,actualHTTP:descriptor.get.call(this),at,timeOrigin:performance.timeOrigin});
    }else descriptor.set.call(this,value);
  }});
}
function instrument(){
  const known=new WeakSet();let current=null,lastWindow=null;
  const quantile=(values,q)=>{if(!values.length)return null;const a=[...values].sort((x,y)=>x-y);return +a[Math.min(a.length-1,Math.floor(a.length*q))].toFixed(2);};
  const quality=v=>{const q=v.getVideoPlaybackQuality();return {total:q.totalVideoFrames,dropped:q.droppedVideoFrames};};
  function pixelDifference(previous,pixels){
    let different=0,total=0;
    for(let i=0;i<pixels.length;i+=4){let max=0;for(let k=0;k<3;k++){const d=Math.abs(pixels[i+k]-previous[i+k]);total+=d;max=Math.max(max,d);}if(max>3)different++;}
    const pixelRatio=different/(pixels.length/4);
    return {changed:pixelRatio>.002,pixelRatio,mae:total/(pixels.length/4*3)};
  }
  const attach=v=>{
    if(!current||known.has(v))return;known.add(v);
    const record=current;record.instances++;record.video=v;record.url=v.currentSrc||v.src;record.canonicalMediaURL=v.dataset.previewSource||null;record.qualityStart=quality(v);
    let handle=0;const listeners=[];
    for(const type of ['loadstart','loadedmetadata','loadeddata','playing','waiting','stalled','seeking','seeked','pause','error','emptied']){
      const fn=()=>{if(current===record)record.events.push({type,ms:+(performance.now()-record.started).toFixed(2),time:v.currentTime,ready:v.readyState,error:v.error?.code||null});};v.addEventListener(type,fn);listeners.push([type,fn]);
    }
    const frame=(now,m)=>{
      if(current!==record)return;const started=performance.now();
      if(record.firstFrameMs===null)record.firstFrameMs=now-record.started;
      const prior=record.frames.at(-1);if(prior&&m.mediaTime<prior.mediaTime)record.loops++;
      record.qualityLast=quality(v);const droppedNow=record.qualityLast.dropped-(record.qualityStart?.dropped||0);
      if(droppedNow>(record.lastDropped||0)){(record.dropChanges??=[]).push({ms:+(now-record.started).toFixed(2),mediaTime:m.mediaTime,dropped:droppedNow,wallGapMs:prior?+(now-prior.now).toFixed(2):0,mediaGapMs:prior?+((m.mediaTime-prior.mediaTime)*1000).toFixed(2):0});record.lastDropped=droppedNow;}
      record.frames.push({now,callbackMs:performance.now()-started,expectedDisplay:m.expectedDisplayTime,presentation:m.presentationTime,mediaTime:m.mediaTime,presented:m.presentedFrames,decode:m.processingDuration||0});
      handle=v.requestVideoFrameCallback(frame);
    };
    handle=v.requestVideoFrameCallback(frame);
    record.detach.push(()=>{v.cancelVideoFrameCallback(handle);for(const [type,fn]of listeners)v.removeEventListener(type,fn)});
  };
  new MutationObserver(()=>{if(current)for(const v of document.querySelectorAll('.preview-layer video'))attach(v);}).observe(document,{childList:true,subtree:true});
  const longTasks=[];
  try{new PerformanceObserver(list=>longTasks.push(...list.getEntries().map(e=>({at:e.startTime,duration:e.duration})))).observe({type:'longtask',buffered:true})}catch{}
  window.__previewProbe={
    abort(){const r=current;current=null;if(r)for(const f of r.detach)f();lastWindow=null;},
    begin(id){lastWindow=null;current={id,started:performance.now(),firstFrameMs:null,frames:[],events:[],instances:0,loops:0,detach:[]};},
    async settleLoopBoundary(){
      const r=current,v=r?.video;if(!r)return;r.loopBoundaryWaitMs=0;
      if(!v?.loop||(!v.seeking&&v.readyState>=3)||!(v.currentTime<.25||Number.isFinite(v.duration)&&v.duration-v.currentTime<.25))return;
      const started=performance.now();
      // Observe actual loop recovery, bounded by the existing 200ms stall budget.
      await new Promise(resolve=>{let handle=0,timer=0,done=false;const finish=()=>{if(done)return;done=true;clearTimeout(timer);if(handle)v.cancelVideoFrameCallback(handle);resolve();};handle=v.requestVideoFrameCallback(finish);timer=setTimeout(finish,200);});
      r.loopBoundaryWaitMs=+(performance.now()-started).toFixed(2);
    },
    finish(){
      const r=current;if(!r)return null;const ended=performance.now(),v=r.video;
      // Freeze the complete playback window before any pixel readback is allowed.
      const q=v?quality(v):(r.qualityLast||r.qualityStart||{total:0,dropped:0});
      const state={duration:v?.duration,currentTime:v?.currentTime,playbackRate:v?.playbackRate,readyState:v?.readyState,seeking:v?.seeking,networkState:v?.networkState,paused:v?.paused,width:v?.videoWidth,height:v?.videoHeight};
      let bufferedAhead=0;if(v)for(let i=0;i<v.buffered.length;i++)if(v.buffered.start(i)<=v.currentTime&&v.buffered.end(i)>=v.currentTime)bufferedAhead=v.buffered.end(i)-v.currentTime;
      current=null;for(const f of r.detach)f();lastWindow={id:r.id,ended,url:r.url,canonicalMediaURL:r.canonicalMediaURL,video:v};
      const f=r.frames,first=f[0],last=f.at(-1),dt=first&&last?(last.now-first.now)/1000:0;
      const windowSeconds=first?(ended-first.now)/1000:0;
      const frameTailMs=last?ended-last.now:ended-r.started,intervals=f.slice(1).map((x,i)=>x.now-f[i].now);
      const total=q.total-(r.qualityStart?.total||0),dropped=q.dropped-(r.qualityStart?.dropped||0);
      // VFR holds encoded in the source are distinct from delay beyond its media timeline.
      const frameDelayExcess=f.slice(1).map((x,i)=>{let mediaGap=x.mediaTime-f[i].mediaTime;if(mediaGap<0&&Number.isFinite(state.duration))mediaGap+=state.duration;return Math.max(0,x.now-f[i].now-mediaGap*1000);});
      const callbackDiagnostics={callbackMsP95:quantile(f.map(x=>x.callbackMs),.95),callbackMsMax:quantile(f.map(x=>x.callbackMs),1),gaps:f.slice(1).map((x,i)=>({ms:+(x.now-r.started).toFixed(2),wallMs:+(x.now-f[i].now).toFixed(2),mediaMs:+((x.mediaTime-f[i].mediaTime)*1000).toFixed(2),presentedDelta:x.presented-f[i].presented,presentationMs:+(x.presentation-f[i].presentation).toFixed(2),expectedDisplayMs:+(x.expectedDisplay-f[i].expectedDisplay).toFixed(2)})).filter(x=>x.wallMs>100)};
      return {id:r.id,url:r.url,canonicalMediaURL:r.canonicalMediaURL,sampleStartPerf:r.started,sampleEndPerf:ended,performancePixelReadback:false,callbackDiagnostics,loopBoundaryWaitMs:r.loopBoundaryWaitMs||0,firstFrameMs:r.firstFrameMs===null?null:+r.firstFrameMs.toFixed(2),sampleMs:+(ended-r.started).toFixed(2),frames:f.length,presentedFps:dt?+((last.presented-first.presented)/dt).toFixed(2):0,callbackFps:dt?+((f.length-1)/dt).toFixed(2):0,windowPresentedFps:windowSeconds?+((last.presented-first.presented)/windowSeconds).toFixed(2):0,lastFrameMediaTime:last?.mediaTime??null,contentFps:null,windowContentFps:null,contentGapP95:null,maxVisualHoldMs:null,repeatFraction:null,frameTailMs:+frameTailMs.toFixed(2),frameIntervalP95:quantile(intervals,.95),frameIntervalMax:quantile(intervals,1),frameDelayExcessMax:quantile(frameDelayExcess,1),frameDelayExcessP95:quantile(frameDelayExcess,.95),framesDecoded:total,framesDropped:dropped,dropRatio:total?+(dropped/total).toFixed(4):0,decodeMsP95:quantile(f.map(x=>x.decode*1000),.95),videoInstances:r.instances,loops:r.loops,...state,bufferedAhead:+bufferedAhead.toFixed(2),events:r.events,dropChanges:r.dropChanges||[],pixelError:null,longTasks:longTasks.filter(x=>x.at>=r.started&&x.at<ended).map(x=>({...x,ms:+(x.at-r.started).toFixed(2)})),frameGaps:intervals.filter(x=>x>100).map(x=>+x.toFixed(1))};
    },
    async visualCheck(){
      if(current||!lastWindow)throw new Error('Pixel check requires a finished playback window');
      const {id,ended,url,canonicalMediaURL,video:v}=lastWindow;
      const state=()=>{const videos=[...document.querySelectorAll('.preview-layer video')];return {
        connected:!!v?.isConnected,sameElement:videos.length===1&&videos[0]===v,videoCount:videos.length,
        sameCard:v?.closest('.card')?.dataset.id===id,sameSource:(v?.currentSrc||v?.src)===url,
        sameCanonicalSource:(v?.dataset.previewSource||null)===canonicalMediaURL,canonicalMediaURL:v?.dataset.previewSource||null,
        currentSource:v?.currentSrc||v?.src||null,paused:v?.paused??null,readyState:v?.readyState??null,
        networkState:v?.networkState??null,seeking:v?.seeking??null,currentTime:v?.currentTime??null,
        error:v?.error?.code||null};};
      const identity=s=>s.connected&&s.sameElement&&s.sameCard&&s.sameSource&&s.sameCanonicalSource;
      let phaseError=null,pendingReject=null;
      const fail=reason=>{phaseError??=new Error('Preview visual check failed: '+JSON.stringify({reason,id,expectedURL:url,state:state()}));pendingReject?.(phaseError);return phaseError;};
      const guard=()=>{if(phaseError)throw phaseError;const s=state();if(!identity(s)||s.paused||s.error)throw fail('identity, pause or error guard');return s;};
      guard();
      const listeners=['pause','error','emptied'].map(type=>{const listener=()=>fail('media event '+type);v.addEventListener(type,listener);return [type,listener];});
      const observer=new MutationObserver(()=>{try{guard();}catch{}});
      observer.observe(document,{childList:true,subtree:true,attributes:true,attributeFilter:['src','data-preview-source']});
      const visibility=()=>{
        const bounds=v.getBoundingClientRect(),left=Math.max(0,bounds.left),right=Math.min(innerWidth,bounds.right),top=Math.max(0,bounds.top),bottom=Math.min(innerHeight,bounds.bottom);
        const styles=[v,v.closest('.preview-layer'),v.closest('.stage'),v.closest('.card')].filter(Boolean).map(el=>{const s=getComputedStyle(el);return {node:el.tagName,className:el.className,display:s.display,visibility:s.visibility,opacity:s.opacity,contentVisibility:s.contentVisibility};});
        const intersects=right>left&&bottom>top;
        const hit=intersects?document.elementFromPoint((left+right)/2,(top+bottom)/2):null;
        const hitCard=hit?.closest('.card')?.dataset.id??null;
        return {visible:document.visibilityState==='visible'&&intersects&&hitCard===id&&styles.length===4&&styles.every(s=>s.display!=='none'&&s.visibility==='visible'&&Number(s.opacity)>0&&s.contentVisibility!=='hidden'),page:document.visibilityState,intersects,hitCard,styles,bounds:{x:bounds.x,y:bounds.y,width:bounds.width,height:bounds.height}};
      };
      const readyForCapture=async()=>{
        const before=guard(),started=performance.now();let presentedFrame=null;
        if(before.readyState<3)await new Promise((resolve,reject)=>{
          let handle=0,timer=0,done=false;
          const finish=error=>{if(done)return;done=true;clearTimeout(timer);if(handle)v.cancelVideoFrameCallback(handle);pendingReject=null;error?reject(error):resolve();};
          pendingReject=finish;
          const onFrame=(now,m)=>{try{
            const s=guard();
            if(s.readyState>=3){presentedFrame={at:now,mediaTime:m.mediaTime,presentedFrames:m.presentedFrames};finish();}
            else handle=v.requestVideoFrameCallback(onFrame);
          }catch(error){finish(error);}};
          handle=v.requestVideoFrameCallback(onFrame);
          timer=setTimeout(()=>finish(fail('same-video frame readiness timeout after 200ms')),200);
        });
        const after=guard(),waitMs=performance.now()-started;if(after.readyState<3)throw fail('video not drawable after readiness wait');
        if(before.readyState<3&&waitMs>=200)throw fail('same-video frame readiness exceeded 200ms');
        return {waitMs:+waitMs.toFixed(3),waitedForFrame:before.readyState<3,before,after,presentedFrame};
      };
      const canvas=new OffscreenCanvas(96,58),ctx=canvas.getContext('2d',{willReadFrequently:true});
      const capture=async()=>{
        const readiness=await readyForCapture(),beforeGuard=guard(),beforeVisibility=visibility();
        if(beforeGuard.readyState<3||!beforeVisibility.visible)throw fail('video not visible or drawable at capture');
        const at=performance.now(),frame=new VideoFrame(v);
        try{
          const nativeTimestamp=frame.timestamp;ctx.drawImage(frame,0,0,96,58);const pixels=ctx.getImageData(0,0,96,58).data;
          const afterGuard=guard(),afterVisibility=visibility();
          if(!afterVisibility.visible)throw fail('video became hidden during capture');
          return {at,nativeTimestamp,pixels,beforeVisibility,afterVisibility,readiness,beforeGuard,afterGuard,readbackMs:performance.now()-at};
        }finally{frame.close();}
      };
      try{
        const first=await capture();
        await new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pendingReject=null;resolve();},900);pendingReject=error=>{clearTimeout(timer);pendingReject=null;reject(error);};});
        const second=await capture(),diff=pixelDifference(first.pixels,second.pixels);
        const digest=async pixels=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',pixels)),n=>n.toString(16).padStart(2,'0')).join('');
        const summarize=async f=>({captureAt:+f.at.toFixed(3),nativeTimestamp:f.nativeTimestamp,beforeVisibility:f.beforeVisibility,afterVisibility:f.afterVisibility,readiness:f.readiness,beforeGuard:f.beforeGuard,afterGuard:f.afterGuard,readbackMs:+f.readbackMs.toFixed(3),pixelSha256:await digest(f.pixels)});
        const firstSummary=await summarize(first),secondSummary=await summarize(second),finalGuard=guard();
        return {id,phase:'after-performance-window',performanceWindowEnded:ended,sourceURL:url,sameVideo:identity(finalGuard)&&!finalGuard.paused,width:96,height:58,pixelFormat:'RGBA',sampleCount:2,threshold:{maxChannelDeltaOver:3,changedPixelRatioOver:.002},first:firstSummary,second:secondSummary,...diff};
      }finally{
        pendingReject=null;observer.disconnect();for(const [type,listener]of listeners)v.removeEventListener(type,listener);lastWindow=null;
      }
    }
  };
}
let environment={verificationMode:'separate-playback-source-visual',pixelProbeEnabled:false,performancePixelReadback:false,afterWindowPixelCheck:true,softwareVideoDecodeRequested:args.includes('--software-video-decode')};const mediaPlayers={};
const run=async origin=>withBrowser(async b=>{
  environment.browser=await b.send('Browser.getVersion');
  const gpu=await b.send('SystemInfo.getInfo');environment.gpu={devices:gpu.gpu?.devices,features:gpu.gpu?.featureStatus};environment.gpuDisabledByHarness=false;
  await b.call('Network.enable');
  try{await b.call('Media.enable');b.onEvent('Media.playerPropertiesChanged',p=>{const data=mediaPlayers[p.playerId]??={};for(const item of p.properties||[])if(/decoder|platform|framerate|videotracks|resolution|url/i.test(item.name))data[item.name]=item.value;});environment.mediaPlayers=mediaPlayers;}catch(e){environment.mediaDiagnosticError=String(e);}
  const mediaRequestIds=new Set(),networkOff=[];
  networkOff.push(b.onEvent('Network.requestWillBeSent',p=>{if(p.request.url.includes('.mp4')){mediaRequestIds.add(p.requestId);network.push({event:'request',requestId:p.requestId,url:p.request.url,resourceType:p.type,timestamp:p.timestamp,wallTime:p.wallTime,range:p.request.headers?.Range||p.request.headers?.range||null});}}));
  networkOff.push(b.onEvent('Network.responseReceived',p=>{if(p.response.url.includes('.mp4'))network.push({event:'response',requestId:p.requestId,url:p.response.url,resourceType:p.type,timestamp:p.timestamp,status:p.response.status,mimeType:p.response.mimeType,fromDiskCache:p.response.fromDiskCache,headers:p.response.headers,timing:p.response.timing});}));
  networkOff.push(b.onEvent('Network.loadingFinished',p=>{if(mediaRequestIds.has(p.requestId))network.push({event:'finished',requestId:p.requestId,timestamp:p.timestamp,encodedDataLength:p.encodedDataLength});}));
  networkOff.push(b.onEvent('Network.loadingFailed',p=>{if(mediaRequestIds.has(p.requestId))network.push({event:'failed',requestId:p.requestId,timestamp:p.timestamp,canceled:p.canceled,errorText:p.errorText});}));
  await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'('+instrument.toString()+')();window.__previewErrors=[];addEventListener("error",e=>__previewErrors.push(e.message));addEventListener("unhandledrejection",e=>__previewErrors.push(String(e.reason)));'+(httpPlaybackControl?'('+installHttpPlaybackControl.toString()+')();':'')});
  await b.goto(origin+'/motion-vault.html?view=pending',450);await until(b,'!!window.CandidateVault');
  const observedMain=await b.evaluate('fetch(location.href,{cache:"no-store"}).then(r=>r.arrayBuffer()).then(b=>crypto.subtle.digest("SHA-256",b)).then(b=>Array.from(new Uint8Array(b),n=>n.toString(16).padStart(2,"0")).join(""))');
  check('Actual page matches measured file',observedMain===formalHash,{observedMain,formalHash});
  environment.page=await b.evaluate('({url:location.href,visibility:document.visibilityState,dpr:devicePixelRatio,timeOrigin:performance.timeOrigin,videoFrameCallback:typeof HTMLVideoElement.prototype.requestVideoFrameCallback})');
  for(const item of items){
    try{
      await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(60);
      const selector='.card[data-id="'+item.id+'"]';
      await b.evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"center",behavior:"instant"})');
      await b.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');await b.delay(50);
      const point=await b.evaluate('(()=>{const card=document.querySelector('+JSON.stringify(selector)+'),s=card.querySelector(".stage"),r=s.getBoundingClientRect(),p={x:r.x+r.width*.44,y:r.y+r.height*.46};return {...p,hit:card.contains(document.elementFromPoint(p.x,p.y))};})()');
      if(!point.hit)throw new Error('Hover target was not the intended visible card');
      await b.evaluate('__previewProbe.begin('+JSON.stringify(item.id)+')');
      await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});
      await b.delay(sampleMs);
      const result=await b.evaluate('(async()=>{await __previewProbe.settleLoopBoundary();return __previewProbe.finish();})()');result.version=item.asset.version;result.video=item.asset.video;result.sourceContent=sourceContentFor(item);applyFrameTailBudget(item,result);samples.push(result);
      check('Video renders '+item.id,result.frames>=10&&!result.paused&&result.firstFrameMs<800&&!result.pixelError,result);
      if(requiredLoops)check('Hover continues through '+requiredLoops+' loops '+item.id,result.loops>=requiredLoops,{loops:result.loops,duration:result.duration,currentTime:result.currentTime});
      check('No playback stall '+item.id,result.frameDelayExcessMax<200&&result.dropRatio<.05&&result.videoInstances===1&&result.readyState>=3&&result.playbackRate===1&&Number.isFinite(result.frameTailDelayExcessMs)&&result.frameTailDelayExcessMs<200&&(!continuous.has(item.id)||result.frameTailMs<200&&result.windowPresentedFps>=45),result);
      const asset=assets.find(a=>a.id===item.id),expectedMediaURL=new URL(item.asset.video,origin+'/');
      expectedMediaURL.searchParams.set('v',item.asset.videoRevision);
      const canonicalMatches=result.canonicalMediaURL===expectedMediaURL.href;
      let playbackURL=null;try{playbackURL=new URL(result.url);}catch{}
      const playbackMatches=result.url===expectedMediaURL.href||playbackURL?.protocol==='blob:'&&playbackURL.origin===expectedMediaURL.origin;
      const requestedRevision=canonicalMatches?expectedMediaURL.searchParams.get('v'):null;
      result.mediaResources=await b.evaluate('performance.getEntriesByName('+JSON.stringify(expectedMediaURL.href)+').map(entry=>entry.toJSON())');
      result.playbackMediaSha256=null;result.servedMediaSha256=null;
      // These complete-byte checks run only after the playback window is frozen.
      // A dataset value alone never establishes canonical identity or Blob contents.
      const mediaDigest=url=>b.evaluate('fetch('+JSON.stringify(url)+',{cache:"no-store",redirect:"error"}).then(r=>{if(!r.ok)throw Error("Media HTTP "+r.status);return r.arrayBuffer();}).then(b=>crypto.subtle.digest("SHA-256",b)).then(b=>Array.from(new Uint8Array(b),n=>n.toString(16).padStart(2,"0")).join(""))');
      if(canonicalMatches&&playbackMatches){
        result.playbackMediaSha256=await mediaDigest(result.url);
        result.servedMediaSha256=result.url===expectedMediaURL.href?result.playbackMediaSha256:await mediaDigest(expectedMediaURL.href);
      }
      check('Current media cache identity '+item.id,canonicalMatches&&playbackMatches&&item.asset.videoRevision===asset.sha256.slice(0,16)&&requestedRevision===item.asset.videoRevision&&result.playbackMediaSha256===asset.sha256&&result.servedMediaSha256===asset.sha256,{url:result.url,canonicalMediaURL:result.canonicalMediaURL,expectedMediaURL:expectedMediaURL.href,canonicalMatches,playbackMatches,requestedRevision,videoRevision:item.asset.videoRevision,sha256:asset.sha256,playbackSha256:result.playbackMediaSha256,servedSha256:result.servedMediaSha256});
      const source=result.sourceContent;
      check('All source RGB frames and original PTS verified '+item.id,source.complete,source);
      if(continuous.has(item.id))check('Continuous source has at least 45 RGB changes/s including loop '+item.id,source.complete&&source.contentFps>=45&&source.contentGapP95Ms<=70&&source.maxVisualHoldMs<200&&!source.noVisibleChanges&&source.loopContentFps>=45&&source.loopContentGapP95Ms<=70&&source.loopMaxVisualHoldMs<200,source);
      result.actualPixelChange=await b.evaluate('__previewProbe.visualCheck()');
      const visual=result.actualPixelChange;
      check('Actual preview changes after performance window '+item.id,visual.id===item.id&&visual.phase==='after-performance-window'&&visual.performanceWindowEnded===result.sampleEndPerf&&visual.sameVideo&&visual.first.beforeVisibility.visible&&visual.first.afterVisibility.visible&&visual.second.beforeVisibility.visible&&visual.second.afterVisibility.visible&&visual.sourceURL===result.url&&visual.sampleCount===2&&visual.first.captureAt>=result.sampleEndPerf-.001&&visual.second.captureAt>visual.first.captureAt&&visual.first.nativeTimestamp!==visual.second.nativeTimestamp&&visual.first.pixelSha256!==visual.second.pixelSha256&&visual.changed&&visual.pixelRatio>.002,visual);
      await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(35);
      check('Leaving releases preview '+item.id,await b.evaluate('document.querySelectorAll(".preview-layer").length===0&&HybridVault.active()===null'));
      console.log(JSON.stringify({id:item.id,firstFrameMs:result.firstFrameMs,presentedFps:result.presentedFps,sourceContentFps:source.contentFps,sourceLoopHoldMs:source.loopMaxVisualHoldMs,actualPixelChange:visual.changed,dropped:result.framesDropped}));
    }catch(e){check('Measure '+item.id,false,String(e));try{await b.evaluate('__previewProbe.abort()');}catch{}}
  }
  if(httpPlaybackControl)playbackControlMappings.push(...await b.evaluate('window.__previewPlaybackControl||[]'));
  errors.push(...await b.evaluate('__previewErrors'));check('No page errors',!errors.length,errors);for(const off of networkOff)off();
},{gpu:true,softwareVideoDecode:args.includes('--software-video-decode')});
try{if(live)await run('http://127.0.0.1:4380/app/assets');else await withStage(root,s=>run(s.url));}catch(e){check('Suite completed',false,String(e));}
let assetsUnchanged=true;for(const asset of assets)if(sha(await readFile(path.join(live?path.join(project,'web'):root,asset.video)))!==asset.sha256)assetsUnchanged=false;
const sourceUnchanged=assetsUnchanged&&sha(await readFile(sourcePath))===sourceHash&&sha(await readFile(analyzerPath))===analyzerHash&&sha(await readFile(sourceReportPath))===sourceReportHash&&sha(await readFile(mainPath))===formalHash&&sha(await readFile(candidatePath))===candidateHash&&sha(await readFile(path.join(live?project:root,live?'web/candidate-catalog.json':'candidate-catalog.json')))===catalogueHash;
check('Measured source remained unchanged',sourceUnchanged);
const report={at:new Date().toISOString(),startedAt,runId,label,live,sampleMs,requiredLoops,diagnosticOnly,control:httpPlaybackControl?'http-playback-control':null,playbackControlMappings,formalHash,candidateHash,redirectSha256:candidateHash,verifierHash:sourceHash,sourceUnchanged,sourceMediaEvidence,environment,assets,passed:checks.filter(c=>c.pass).length,total:checks.length,samples,checks:checks.map(c=>({...c,detail:c.detail?.id?{id:c.detail.id}:c.detail})),network,errors};
await put(project,'lineage/current/preview-playback/'+label+'.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({runId,label,diagnosticOnly,control:report.control,passed:report.passed,total:report.total,sourceUnchanged,failures:report.checks.filter(c=>!c.pass)},null,2));
if(report.passed!==report.total)process.exitCode=1;
