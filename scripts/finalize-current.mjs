// Reconcile the owning project's single gallery with fresh, hash-bound live evidence.
// The initial managed project-control block and user acceptance metadata remain untouched.
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {project,put,sha} from './build-hybrid.mjs';

const args=process.argv.slice(2);
const revalidateMode=args.length===2&&args[0]==='--preview-playback'&&args[1]==='--revalidate';
const startupMode=args.length===1&&args[0]==='--preview-startup';
const queueContinuationMode=args.length===2&&args[0]==='--preview-queue'&&args[1]==='--continuation';
const queueMode=queueContinuationMode||args.length===1&&args[0]==='--preview-queue';
if(!revalidateMode&&!startupMode&&!queueMode&&(args.length>1||(args.length===1&&args[0]!=='--preview-playback')))
  throw new Error('Usage: node scripts/finalize-current.mjs [--preview-playback [--revalidate] | --preview-startup | --preview-queue [--continuation]]');
const previewMode=args[0]==='--preview-playback';
// Final report labels are explicit; a pending label blocks revalidation before any writes.
const revalidationLabels={before:'remaining-full-before',after:'remaining-complete-30',loops:null};
if(revalidateMode&&Object.values(revalidationLabels).some(label=>typeof label!=='string'||!/^[a-zA-Z0-9_-]{1,50}$/.test(label)))
  throw new Error('Final revalidation report labels are not yet confirmed');
const evidence=path.join(project,'lineage/current');
const pinnedFiles=new Map();
async function readPinned(file){
  const bytes=await readFile(path.join(project,file));
  const hash=sha(bytes);
  if(pinnedFiles.has(file)&&pinnedFiles.get(file)!==hash)
    throw new Error('Evidence or release bytes changed during finalization: '+file);
  pinnedFiles.set(file,hash);
  return bytes;
}
const readJSON=async file=>JSON.parse((await readPinned(file)).toString('utf8'));
const isHash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const formal=await readJSON('web/catalog.json');
const candidates=await readJSON('web/candidate-catalog.json');
const html=await readPinned('web/index.html');
const redirectHTML=await readPinned('candidates/curated-originals/index.html');
const formalHash=sha(html),redirectSha256=sha(redirectHTML);
const receipt=await readJSON('lineage/current/install-receipt.json');
const counts={
  formal:formal.items.length,
  candidates:candidates.items.length,
  ready:candidates.localReady,
  authorSource:candidates.items.filter(item=>item.source_kind==='adapted_author_source').length,
  independent:candidates.items.filter(item=>item.source_kind==='independent_code').length
};
if(counts.formal!==60||counts.candidates!==30||counts.ready!==counts.candidates||
   formal.count!==counts.formal||candidates.count!==counts.candidates||
   receipt.formalCount!==counts.formal||receipt.candidateCount!==counts.candidates||
   receipt.formalSha256!==formalHash||receipt.candidateSha256!==redirectSha256)
  throw new Error('Current release identity or retained content mismatch');
if(counts.authorSource!==26||counts.independent!==4)
  throw new Error('Preserved provenance grouping changed');
if(!/\bconst CATALOG\s*=/.test(html.toString())||!/\bconst CANDIDATES\s*=/.test(html.toString()))
  throw new Error('The primary gallery does not contain both neutral catalogues');
const redirectText=redirectHTML.toString();
if(redirectHTML.length>8192||!redirectText.includes('motion-vault.html')||
   !redirectText.includes('view=pending')||/\bconst (?:CATALOG|CANDIDATES)\s*=/.test(redirectText))
  throw new Error('The legacy candidate endpoint is not a minimal single-gallery redirect');

function requireCurrentHashes(record,file){
  const main=[record.formalSha256,record.formalHash].filter(Boolean);
  const redirect=[record.redirectSha256,record.candidateSha256,record.candidateHash].filter(Boolean);
  if(!main.length||!redirect.length||main.some(hash=>hash!==formalHash)||
     redirect.some(hash=>hash!==redirectSha256))
    throw new Error('Verification must bind both current gallery and redirect: '+file);
}
function passedCount(record,file){
  const total=record.total;
  const passed=record.passed===true?total:record.passed;
  if(!Number.isInteger(total)||total<1||!Number.isInteger(passed)||passed!==total)
    throw new Error('Incomplete or failed current verification: '+file);
  return {passed,total};
}

function retainedNormalFailure(record,file){
  const rows=record.checks||record.reports;
  if(file!=='lineage/current/live-no-preference.json'||pinnedFiles.get(file)!=='c42474b5070a7d0ccb0a3af46a5c211fb2333309974b0a27441bfc80a36e15d6'||
     record.passed!==192||record.total!==193||record.live!==true||!Array.isArray(rows)||rows.length!==193||
     rows.some(r=>typeof(r.pass??r.passed)!=='boolean')||rows.filter(r=>!(r.pass??r.passed)).length!==1)
    throw Error('Only the exact retained normal-hover failure can enter composite closure');
  return {passed:192,total:193,status:'failed',historical:true,promotedToGate:false,failedChecks:rows.filter(r=>!(r.pass??r.passed))};
}
const proofNames=[
  'live-candidate-validation.json',
  'sandbox-live.json',
  'live-no-preference.json',
  'live-reduce.json',
  'consolidation-check.json'
];
const proofs=[];
for(const file of proofNames){
  const record=await readJSON('lineage/current/'+file);
  requireCurrentHashes(record,file);
  const result=queueContinuationMode&&file==='live-no-preference.json'?retainedNormalFailure(record,'lineage/current/'+file):passedCount(record,file);
  proofs.push({file,sha256:pinnedFiles.get('lineage/current/'+file),at:record.at,
    ...(record.runId?{runId:record.runId}:{}),...(revalidateMode?{reused:true}:{}),...result,formalHash,redirectSha256});
}


function timestamp(value,file){
  const time=typeof value==='string'?Date.parse(value):NaN;
  if(!Number.isFinite(time))throw new Error('Missing or invalid measurement time: '+file);
  return time;
}
function fullSet(records,ids,label){
  if(!Array.isArray(records)||records.length!==ids.length)
    throw new Error('Incomplete item coverage: '+label);
  const map=new Map(records.map(record=>[record.id,record]));
  if(map.size!==ids.length||ids.some(id=>!map.has(id)))
    throw new Error('Missing or duplicate item identity: '+label);
  return map;
}
function measuredChecks(record,file,key,requirePassed=true){
  if(!Array.isArray(record.checks)||record.checks.length!==record.total||
     record.checks.some(check=>typeof check[key]!=='boolean')||
     record.checks.filter(check=>check[key]).length!==record.passed)
    throw new Error('Measurement check totals do not match their results: '+file);
  if(requirePassed)return passedCount(record,file);
  if(!Number.isInteger(record.passed)||record.passed<0||record.total<1)
    throw new Error('Invalid baseline measurement totals: '+file);
  return {passed:record.passed,total:record.total};
}
function measuredRun(record,file,startKey,expectedLive=true){
  if(record.live!==expectedLive||record.sourceUnchanged!==true||
     typeof record.runId!=='string'||!record.runId||
     !isHash(record.formalHash)||!isHash(record.redirectSha256)||
     record.candidateHash!==record.redirectSha256||
     timestamp(record.at,file)<timestamp(record[startKey],file))
    throw new Error('A completed, unchanged measurement in the expected environment is required: '+file);
}
const metrics=['sampleMs','frames','presentedFps','callbackFps','contentFps','firstFrameMs',
  'frameIntervalP95','frameIntervalMax','contentGapP95','maxVisualHoldMs','repeatFraction',
  'framesDecoded','framesDropped','dropRatio','videoInstances','loops','duration','width','height'];
const nullableMetrics=new Set(['firstFrameMs','frameIntervalP95','frameIntervalMax','contentGapP95']);
function sampleMetrics(sample,file){
  const result={};
  const separate=(revalidateMode||startupMode||queueMode)&&sample.performancePixelReadback===false;
  const unmeasured=new Set(['contentFps','contentGapP95','maxVisualHoldMs','repeatFraction']);
  for(const key of metrics){
    const value=sample[key];
    if(!((nullableMetrics.has(key)||(separate&&unmeasured.has(key)))&&value===null)&&
       (typeof value!=='number'||!Number.isFinite(value)||value<0))
      throw new Error('Missing or invalid measured '+key+': '+file+' '+sample.id);
    result[key]=value;
  }
  for(const key of ['frameDelayExcessMax','frameDelayExcessP95','windowContentFps','frameTailMs','contentTailMs',
    ...((revalidateMode||startupMode||queueMode)?['windowPresentedFps','lastFrameMediaTime','frameTailBudgetMs','frameTailDelayExcessMs','playbackRate']:[])]){
    const value=sample[key]??null;
    if(value!==null&&(typeof value!=='number'||!Number.isFinite(value)||value<0))
      throw new Error('Invalid measured '+key+': '+file+' '+sample.id);
    result[key]=value;
  }
  return result;
}
function distribution(values){
  const sorted=values.filter(value=>typeof value==='number'&&Number.isFinite(value)).sort((a,b)=>a-b);
  const round=value=>+value.toFixed(2);
  const quantile=q=>sorted.length?sorted[Math.min(sorted.length-1,Math.floor(sorted.length*q))]:null;
  const mid=Math.floor(sorted.length/2);
  const median=sorted.length?(sorted.length%2?sorted[mid]:round((sorted[mid-1]+sorted[mid])/2)):null;
  return {measured:sorted.length,min:sorted[0]??null,median,p95:quantile(.95),
    max:sorted.at(-1)??null,mean:sorted.length?round(sorted.reduce((sum,value)=>sum+value,0)/sorted.length):null};
}
function playbackSummary(samples){
  const framesDecoded=samples.reduce((sum,sample)=>sum+sample.framesDecoded,0);
  const framesDropped=samples.reduce((sum,sample)=>sum+sample.framesDropped,0);
  return {samples:samples.length,contentFps:distribution(samples.map(sample=>sample.contentFps)),
    presentedFps:distribution(samples.map(sample=>sample.presentedFps)),
    firstFrameMs:distribution(samples.map(sample=>sample.firstFrameMs)),
    frameDelayExcessMax:distribution(samples.map(sample=>sample.frameDelayExcessMax)),
    framesDecoded,framesDropped,dropRatio:framesDecoded?+(framesDropped/framesDecoded).toFixed(6):0};
}
function evidenceIdentity(record,file){
  return {file,sha256:pinnedFiles.get('lineage/current/'+file),at:record.at,
    runId:record.runId,formalHash:record.formalHash,redirectSha256:record.redirectSha256,
    verifierHash:record.verifierHash||record.verifierSha256,passed:record.passed,total:record.total};
}
function withinWeb(file){
  if(typeof file!=='string'||!file)throw new Error('Missing evidence asset path');
  const base=path.resolve(project,'web'),resolved=path.resolve(base,file);
  if(!resolved.startsWith(base+path.sep))
    throw new Error('Evidence asset path is outside the current web package: '+file);
  return path.relative(project,resolved);
}
async function verifyPreviewPlayback(){
  const beforeFile='preview-playback/'+(revalidateMode?revalidationLabels.before:'before')+'.json';
  const afterFile='preview-playback/'+(revalidateMode?revalidationLabels.after:'after')+'.json';
  const journeyFile='preview-playback/journeys-live.json';
  const before=await readJSON('lineage/current/'+beforeFile);
  const after=await readJSON('lineage/current/'+afterFile);
  const journeys=await readJSON('lineage/current/'+journeyFile);
  measuredRun(before,beforeFile,'startedAt');measuredRun(after,afterFile,'startedAt');
  measuredRun(journeys,journeyFile,'runStartedAt');
  measuredChecks(before,beforeFile,'pass',false);measuredChecks(after,afterFile,'pass',revalidateMode);
  measuredChecks(journeys,journeyFile,'passed');
  if(before.label!==(revalidateMode?revalidationLabels.before:'before')||
     after.label!==(revalidateMode?revalidationLabels.after:'after')||before.runId===after.runId||
     timestamp(after.startedAt,afterFile)<timestamp(before.at,beforeFile)||
     (!revalidateMode&&timestamp(journeys.runStartedAt,journeyFile)<timestamp(before.at,beforeFile)))
    throw new Error('Playback repair measurements must follow their retained before baseline');
  if(!isHash(before.verifierHash)||!Array.isArray(after.errors)||after.errors.length||
     journeys.browserCompleted!==true||journeys.allPassed!==true)
    throw new Error('Playback or journey measurement did not finish cleanly');
  if(!revalidateMode&&after.environment?.pixelProbeEnabled!==true)
    throw new Error('Final playback after evidence must enable the real pixel probe');
  if(after.environment?.softwareVideoDecodeRequested!==false)
    throw new Error('Final playback after evidence must use the default browser decoder selection');
  requireCurrentHashes(after,afterFile);requireCurrentHashes(journeys,journeyFile);
  if(revalidateMode)requireCurrentHashes(before,beforeFile);
  if(after.verifierHash!==sha(await readPinned('src/hybrid/verify-preview-playback.mjs'))||
     journeys.verifierSha256!==sha(await readPinned('src/hybrid/verify-candidate-journeys.mjs')))
    throw new Error('Playback or journey evidence is from a different verifier revision');
  const ids=candidates.items.map(item=>item.id);
  const sourceRGB=revalidateMode?await readSourceRGB(after):null;
  if(revalidateMode)requireSeparatedEnvironment(after,afterFile,sourceRGB);
  const beforeAssets=fullSet(before.assets,ids,beforeFile+' assets');
  const afterAssets=fullSet(after.assets,ids,afterFile+' assets');
  const beforeSamples=fullSet(before.samples,ids,beforeFile+' samples');
  const afterSamples=fullSet(after.samples,ids,afterFile+' samples');
  const comparisons=[];
  for(const item of candidates.items){
    const oldAsset=beforeAssets.get(item.id),asset=afterAssets.get(item.id);
    const oldSample=beforeSamples.get(item.id),sample=afterSamples.get(item.id);
    for(const [a,s,file]of [[oldAsset,oldSample,beforeFile],[asset,sample,afterFile]]){
      if(!isHash(a.sha256)||typeof a.version!=='string'||!a.version||
         typeof a.video!=='string'||!a.video||s.version!==a.version||s.video!==a.video)
        throw new Error('Sample is not bound to its measured asset: '+file+' '+item.id);
      sampleMetrics(s,file);
    }
    if(asset.version!==item.asset.version||asset.video!==item.asset.video||
       asset.sha256!==sha(await readPinned(withinWeb(item.asset.video)))||
       item.asset.videoRevision!==asset.sha256.slice(0,16)||asset.videoRevision!==item.asset.videoRevision)
      throw new Error('Playback evidence does not match the current candidate video: '+item.id);
    const requiredMetrics=revalidateMode?['frameDelayExcessMax','frameDelayExcessP95','frameTailMs']:
      ['frameDelayExcessMax','frameDelayExcessP95','windowContentFps','frameTailMs','contentTailMs'];
    if(!requiredMetrics.every(key=>Number.isFinite(sample[key])&&sample[key]>=0))
      throw new Error('After evidence must measure delay beyond its encoded VFR intervals: '+item.id);
    if(revalidateMode){
      if(oldAsset.sha256!==asset.sha256||oldAsset.version!==asset.version||oldAsset.video!==asset.video)
        throw new Error('Revalidation must retain the same media: '+item.id);
      requireSeparatedSample(sample,afterFile,sourceRGB);
    }
    const observedURL=new URL(sample.url);
    if(!observedURL.pathname.endsWith('/'+item.asset.video)||
       observedURL.searchParams.get('v')!==item.asset.videoRevision)
      throw new Error('The measured video URL does not use its current media revision: '+item.id);
    comparisons.push({id:item.id,title:item.title||item.name||item.id,
      videoChanged:oldAsset.sha256!==asset.sha256,
      before:{...oldAsset,url:oldSample.url,metrics:sampleMetrics(oldSample,beforeFile)},
      after:{...asset,url:sample.url,videoRevision:item.asset.videoRevision,metrics:sampleMetrics(sample,afterFile)}});
  }
  const failedChecks=after.checks.filter(check=>!check.pass);
  const warnings=failedChecks.map(check=>{
    const id=check.detail?.id,sample=afterSamples.get(id);
    if(!sample||check.name!=='No playback stall '+id||sample.dropRatio<.05||
       sample.frameDelayExcessMax>=200||sample.videoInstances!==1||
       !Number.isFinite(sample.readyState)||sample.readyState<3||sample.presentedFps<45||
       !Number.isFinite(sample.frameIntervalMax)||sample.frameIntervalMax>=100||
       sample.frameTailMs>=100||!Array.isArray(sample.longTasks)||sample.longTasks.length)
      throw new Error('Playback failure is outside the permitted dropped-frame warning: '+check.name);
    return {code:'preview_drop_ratio_exceeds_limit',id,check:check.name,originalCheckPassed:false,
      dropRatio:sample.dropRatio,dropRatioThreshold:.05,presentedFps:sample.presentedFps,
      windowContentFps:sample.windowContentFps,frameIntervalP95:sample.frameIntervalP95,
      frameIntervalMax:sample.frameIntervalMax,frameTailMs:sample.frameTailMs,
      frameDelayExcessMax:sample.frameDelayExcessMax,longTasks:sample.longTasks,
      video:sample.video,videoSha256:afterAssets.get(id).sha256};
  });
  const journeyIds=['curated-webgpu-route','curated-persistent-gallery'];
  const journeyReports=fullSet(journeys.reports,journeyIds,journeyFile+' reports');
  for(const id of journeyIds){
    const report=journeyReports.get(id);
    if(report.passed!==true||!Array.isArray(report.actions)||
       !report.actions.some(action=>action.action==='real_pointer_click'&&
         action.proof?.events?.some(event=>event.type==='click'&&event.isTrusted===true&&event.match===true)))
      throw new Error('A complete real pointer journey is required: '+id);
  }
  if(!journeys.assetHashes||typeof journeys.assetHashes!=='object'||Array.isArray(journeys.assetHashes))
    throw new Error('Journey evidence must include the tested implementation bytes');
  const requiredJourneyFiles=['index.html',...journeyIds.flatMap(id=>
    ['asset.json','run/index.html','run/effect.js'].map(file=>'motion-vault-assets/'+id+'/'+file))];
  if(requiredJourneyFiles.some(file=>!isHash(journeys.assetHashes[file])))
    throw new Error('Journey implementation coverage is incomplete');
  for(const [file,hash]of Object.entries(journeys.assetHashes)){
    if((file!=='index.html'&&!journeyIds.some(id=>file.startsWith('motion-vault-assets/'+id+'/')))||
       !isHash(hash)||hash!==sha(await readPinned(withinWeb(file))))
      throw new Error('Journey evidence does not match the current implementation: '+file);
  }
  for(const proof of proofs)if(!revalidateMode&&timestamp(proof.at,proof.file)<timestamp(before.at,beforeFile))
    throw new Error('The five live gates must be fresh for the playback repair: '+proof.file);
  return {
    before:{...evidenceIdentity(before,beforeFile),startedAt:before.startedAt,sampleMs:before.sampleMs,
      summary:playbackSummary(before.samples),failedChecks:before.checks.filter(check=>!check.pass),
      browser:before.environment?.browser},
    after:{...evidenceIdentity(after,afterFile),startedAt:after.startedAt,sampleMs:after.sampleMs,
      summary:playbackSummary(after.samples),failedChecks,browser:after.environment?.browser,
      ...(revalidateMode?{verificationMode:after.environment.verificationMode,
        sourceMediaEvidence:sourceRGB.identity,
        separatedEvidence:after.samples.map(sample=>({id:sample.id,servedMediaSha256:sample.servedMediaSha256,sourceContent:sample.sourceContent,
          actualPixelChange:sample.actualPixelChange}))}:{})},
    warnings,
    ...(revalidateMode?{revalidation:await verifyRevalidation(before,after,sourceRGB)}:{}),
    journeys:{...evidenceIdentity(journeys,journeyFile),startedAt:journeys.runStartedAt,
      ...(revalidateMode?{reused:true,reuseBasis:'Current main, redirect, verifier and measured implementation hashes match; original measurement time retained'}:{}),
      browserCompleted:journeys.browserCompleted,allPassed:journeys.allPassed,
      assetHashes:journeys.assetHashes,cases:journeys.reports.map(report=>({
        id:report.id,passed:report.passed,actions:report.actions,
        states:report.states.map(state=>state.name),screenshots:report.screenshots}))},
    sameRequestedSampleMs:before.sampleMs===after.sampleMs,
    metricDefinition:revalidateMode?'Live presentedFps and stalls use rVFC timing and endpoint video quality without pixel readback; windowPresentedFps includes the tail, and frameTailDelayExcessMs compares it with the next-PTS budget from the same source media. Live contentFps, windowContentFps, contentGapP95, maxVisualHoldMs and repeatFraction are unmeasured (null). sourceContent uses offline full-frame RGB and original file PTS; these values are not live screen update rates. actualPixelChange is a fresh two-capture check of the same playing video after the frozen performance window, not live per-frame continuity.':'contentFps retains the baseline-comparable visual-change rate between the first and last frame callbacks; windowContentFps covers the full interval from the first frame to measurement finish, including the tail. presentedFps counts presented video frames. These are measured rates, not configured container frame rates.',
    changedVideos:comparisons.filter(item=>item.videoChanged).length,comparisons
  };
}
async function readSourceRGB(after,file='lineage/current/preview-playback/remaining-source-rgb.json'){
  const record=await readJSON(file),sha256=pinnedFiles.get(file);
  const analyzerSha256=sha(await readPinned('src/hybrid/diagnose-preview-media.mjs'));
  if(record.profile!=='rgb'||record.analyzerSha256!==analyzerSha256||
     record.catalogSha256!==pinnedFiles.get('web/candidate-catalog.json')||
     record.mainHtmlSha256!==formalHash||record.summary?.versionsAndHashesMatch!==true||
     timestamp(record.generatedAt,file)>timestamp(after.startedAt,'final playback report'))
    throw new Error('Offline RGB evidence does not match the current analyzer, catalogue and page');
  const ids=candidates.items.map(item=>item.id),rows=fullSet(record.items,ids,file);
  fullSet((record.summary.decodedIds||[]).map(id=>({id})),ids,file+' decoded IDs');
  const measured=fullSet(after.assets,ids,'final playback assets'),expected=new Map();
  for(const id of ids){
    const row=rows.get(id),d=row.decodedAnalysis,i=d?.integrity,s=d?.sampling,rule=d?.visibleChangeRule;
    if(!d||row.videoSha256!==measured.get(id).sha256||d.mediaSha256!==row.videoSha256||
       d.mediaUnchanged!==true||d.profile!=='rgb'||s?.width!==96||s.height!==58||
       s.pixelFormat!=='rgb24'||s.scale!=='bilinear'||rule?.maximumAbsoluteRGBChannelDeltaOver!==3||
       rule.changedPixelFractionOver!==.002||i?.complete!==true||i.sourceUnchanged!==true||
       i.originalPtsMatched!==true||i.decoderPtsMatched!==true||i.frameIndicesContiguous!==true||
       d.startSeconds!==0||d.streamStartPts!==0||!Number.isInteger(d.decodedFrames)||d.decodedFrames<10||
       !Array.isArray(d.frameTimeline)||!Array.isArray(d.transitions)||
       [i.decodedFrames,i.rawFrameBlocks,i.showinfoFrames,i.originalPacketFrames,i.originalFramePts,d.frameTimeline.length]
         .some(n=>n!==d.decodedFrames)||d.transitions.length!==d.decodedFrames-1||
       d.frameTimeline.some((frame,n)=>frame.index!==n||!Number.isSafeInteger(frame.pts)||
         !Number.isSafeInteger(frame.duration)||frame.duration<0||
         !Number.isSafeInteger(frame.decoderPts)||!isHash(frame.rgbSha256))||
       !Array.isArray(d.presentationOrder)||d.presentationOrder.length!==d.decodedFrames||
       new Set(d.presentationOrder).size!==d.decodedFrames||
       d.presentationOrder.some(index=>!Number.isInteger(index)||index<0||index>=d.decodedFrames)||
       d.presentationOrder.some((index,n)=>n>0&&
         d.frameTimeline[index].pts<d.frameTimeline[d.presentationOrder[n-1]].pts))
      throw new Error('Complete original-PTS and decoded RGB coverage is required: '+id);
    expected.set(id,{basis:'offline-file-pts',complete:true,mediaSha256:d.mediaSha256,reportSha256:sha256,
      analyzerSha256,sampling:s,visibleChangeRule:rule,integrity:i,decodedFrames:d.decodedFrames,
      encodedDurationSeconds:d.encodedDurationSeconds,contentFps:d.visibleChangesPerEncodedSecond,
      contentGapP95Ms:d.contentGapP95Ms,maxVisualHoldMs:d.maxVisualHoldMs,
      loopContentFps:d.loopBoundary?.cyclicVisibleChangesPerSecond,
      loopContentGapP95Ms:d.loopBoundary?.cyclicGapP95Ms,loopMaxVisualHoldMs:d.loopBoundary?.cyclicMaxHoldMs,
      noVisibleChanges:d.loopBoundary?.noVisibleChanges,interpretation:d.interpretation});
  }
  return {expected,identity:{path:file,sha256,analyzerSha256,generatedAt:record.generatedAt,
    profile:'rgb',tools:record.tools}};
}
function requireSeparatedEnvironment(record,file,sourceRGB){
  const env=record.environment,source=record.sourceMediaEvidence;
  if(env?.verificationMode!=='separate-playback-source-visual'||env.pixelProbeEnabled!==false||
     env.performancePixelReadback!==false||env.afterWindowPixelCheck!==true||
     env.softwareVideoDecodeRequested!==false||!source||
     Object.entries(sourceRGB.identity).some(([key,value])=>JSON.stringify(source[key])!==JSON.stringify(value))||
     timestamp(record.startedAt,file)<timestamp(source.generatedAt,source.path))
    throw new Error('Current playback, source RGB and after-window visual evidence must be separated: '+file);
}
function requireSeparatedSample(sample,file,sourceRGB){
  const expected=sourceRGB.expected.get(sample.id),source=sample.sourceContent,visual=sample.actualPixelChange;
  if(sample.performancePixelReadback!==false||sample.pixelError!==null||
     ['contentFps','windowContentFps','contentGapP95','maxVisualHoldMs','repeatFraction'].some(key=>sample[key]!==null)||
     !source||Object.entries(expected||{}).some(([key,value])=>JSON.stringify(source[key])!==JSON.stringify(value))||
     !expected||source.complete!==true||sample.servedMediaSha256!==expected.mediaSha256)
    throw new Error('Source RGB evidence cannot replace unmeasured live content fields: '+file+' '+sample.id);
  if(['curated-telescope','curated-image-in-type','curated-editorial-layout'].includes(sample.id)&&
     !(source.contentFps>=45&&source.contentGapP95Ms!==null&&source.contentGapP95Ms<=70&&
       source.maxVisualHoldMs<200&&source.noVisibleChanges===false&&source.loopContentFps>=45&&
       source.loopContentGapP95Ms!==null&&source.loopContentGapP95Ms<=70&&source.loopMaxVisualHoldMs!==null&&source.loopMaxVisualHoldMs<200))
    throw new Error('Original continuous-source thresholds did not pass: '+sample.id);
  if(!Number.isFinite(sample.sampleEndPerf)||!Number.isFinite(sample.sampleStartPerf)||
     sample.sampleEndPerf<=sample.sampleStartPerf||!Number.isFinite(sample.firstFrameMs)||sample.firstFrameMs>=800||
     sample.frames<10||sample.paused!==false||sample.dropRatio>=.05||sample.frameDelayExcessMax>=200||
     sample.videoInstances!==1||!Number.isFinite(sample.readyState)||sample.readyState<3||sample.playbackRate!==1||
     ['windowPresentedFps','lastFrameMediaTime','frameTailBudgetMs','frameTailDelayExcessMs']
       .some(key=>!Number.isFinite(sample[key])||sample[key]<0)||sample.frameTailDelayExcessMs>=200||
     (['curated-telescope','curated-image-in-type','curated-editorial-layout'].includes(sample.id)&&
       !(sample.frameTailMs<200&&sample.windowPresentedFps>=45)))
    throw new Error('Original live playback thresholds did not pass: '+sample.id);
  if(!visual||visual.id!==sample.id||visual.phase!=='after-performance-window'||
     visual.performanceWindowEnded!==sample.sampleEndPerf||visual.sameVideo!==true||
     visual.sourceURL!==sample.url||visual.width!==96||visual.height!==58||visual.pixelFormat!=='RGBA'||
     visual.sampleCount!==2||visual.threshold?.maxChannelDeltaOver!==3||
     visual.threshold.changedPixelRatioOver!==.002||visual.changed!==true||
     !Number.isFinite(visual.pixelRatio)||visual.pixelRatio<=.002||visual.pixelRatio>1||
     !Number.isFinite(visual.mae)||visual.mae<0||
     [visual.first,visual.second].some(frame=>!frame||!Number.isFinite(frame.captureAt)||
       !Number.isSafeInteger(frame.nativeTimestamp)||!Number.isFinite(frame.readbackMs)||frame.readbackMs<0||!isHash(frame.pixelSha256)||
       frame.beforeVisibility?.visible!==true||frame.afterVisibility?.visible!==true)||
     visual.first.captureAt<sample.sampleEndPerf-.001||visual.second.captureAt<=visual.first.captureAt||
     visual.first.nativeTimestamp===visual.second.nativeTimestamp||visual.first.pixelSha256===visual.second.pixelSha256)
    throw new Error('Fresh same-video pixel change after the playback window is required: '+file+' '+sample.id);
  const sameIdentity=state=>state?.connected===true&&state.sameElement===true&&state.videoCount===1&&
    state.sameCard===true&&state.sameSource===true&&state.currentSource===sample.url&&state.paused===false&&state.error===null;
  for(const frame of [visual.first,visual.second])if(frame.readiness!==undefined){
    const ready=frame.readiness;
    if(!ready||!sameIdentity(ready.before)||!sameIdentity(ready.after)||
       !Number.isFinite(ready.before.readyState)||!Number.isFinite(ready.after.readyState)||ready.after.readyState<3||
       !Number.isFinite(ready.waitMs)||ready.waitMs<0||ready.waitedForFrame!==(ready.before.readyState<3)||
       (ready.waitedForFrame&&(ready.waitMs>=200||!Number.isFinite(ready.presentedFrame?.at)||
         !Number.isFinite(ready.presentedFrame?.mediaTime)||!Number.isInteger(ready.presentedFrame?.presentedFrames)))||
       !sameIdentity(frame.beforeGuard)||frame.beforeGuard.readyState<3||!sameIdentity(frame.afterGuard))
      throw new Error('Visual readiness must retain the same video and recover within the original 200 ms budget: '+sample.id);
  }
}
async function verifyRevalidation(before,after,sourceRGB){
  const targetIds=['curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'];
  const baselineIds=['curated-depth','curated-fluid-xray',...targetIds];
  const currentAssets=new Map(after.assets.map(asset=>[asset.id,asset]));
  const summarize=(record,file)=>({...evidenceIdentity(record,file),startedAt:record.startedAt,
    sampleMs:record.sampleMs,requiredLoops:record.requiredLoops,
    environment:{pixelProbeEnabled:record.environment?.pixelProbeEnabled,
      verificationMode:record.environment?.verificationMode??null,
      pixelProbeMode:record.environment?.pixelProbeMode??null,
      pixelProbeWillReadFrequently:record.environment?.pixelProbeWillReadFrequently??null,
      softwareVideoDecodeRequested:record.environment?.softwareVideoDecodeRequested,browser:record.environment?.browser},
    failedChecks:record.checks.filter(check=>!check.pass),summary:playbackSummary(record.samples),
    samples:record.samples.map(sample=>({id:sample.id,...sampleMetrics(sample,file),
      longTasks:sample.longTasks,callbackDiagnostics:sample.callbackDiagnostics,
      pixelProbeContext:sample.pixelProbeContext,pixelIntegrity:sample.pixelIntegrity??null,
      servedMediaSha256:sample.servedMediaSha256,sourceContent:sample.sourceContent,actualPixelChange:sample.actualPixelChange}))});
  async function playbackRecord(label,ids,{final=false}={}){
    const file='preview-playback/'+label+'.json',record=await readJSON('lineage/current/'+file);
    measuredRun(record,file,'startedAt');measuredChecks(record,file,'pass',final);requireCurrentHashes(record,file);
    if(record.label!==label||!isHash(record.verifierHash))
      throw new Error('Incorrect retained revalidation report identity: '+file);
    const assets=fullSet(record.assets,ids,file+' assets'),samples=fullSet(record.samples,ids,file+' samples');
    for(const id of ids){
      const asset=assets.get(id),sample=samples.get(id),current=currentAssets.get(id);
      if(!current||asset.sha256!==current.sha256||asset.video!==current.video||
         asset.version!==current.version||asset.videoRevision!==current.videoRevision||
         sample.version!==asset.version||sample.video!==asset.video)
        throw new Error('Revalidation evidence does not retain the current media: '+file+' '+id);
      sampleMetrics(sample,file);
      const url=new URL(sample.url);
      if(!url.pathname.endsWith('/'+asset.video)||url.searchParams.get('v')!==current.videoRevision)
        throw new Error('Revalidation sample uses a different media URL: '+file+' '+id);
      if(final){
        requireSeparatedSample(sample,file,sourceRGB);
        if(sample.loops<3||sample.sampleMs<22000)
          throw new Error('Final target loop coverage is incomplete: '+id);
      }
    }
    if(final&&(record.verifierHash!==after.verifierHash||record.sampleMs!==22000||
       record.requiredLoops!==3||!Array.isArray(record.errors)||record.errors.length||
       record.environment?.softwareVideoDecodeRequested!==false||
       timestamp(record.startedAt,file)<timestamp(before.at,'remaining-full-before')))
      throw new Error('Final loops must use the current default verifier and complete 22-second measurements');
    if(final)requireSeparatedEnvironment(record,file,sourceRGB);
    return {record,identity:summarize(record,file)};
  }
  const baseline=await playbackRecord('remaining-before',baselineIds);
  const failedLoops=await playbackRecord('remaining-loops',targetIds);
  const timed=await playbackRecord('remaining-webgpu-timed',['curated-webgpu-route']);
  const failedReadback=await playbackRecord('remaining-loops-after',targetIds);
  const failedWorker=await playbackRecord('remaining-loops-final',targetIds);
  const failedWorkerReadback=await playbackRecord('remaining-loops-verified',targetIds);
  const failedComplete=await playbackRecord('remaining-complete-30',candidates.items.map(item=>item.id));
  const startup=await playbackRecord('remaining-startup-diagnostic',['curated-depth','curated-spatial-product','curated-inline-menu']);
  const loops=await playbackRecord(revalidationLabels.loops,targetIds,{final:true});
  if(new Set([before.runId,after.runId,baseline.record.runId,failedLoops.record.runId,
      timed.record.runId,failedReadback.record.runId,failedWorker.record.runId,failedWorkerReadback.record.runId,
      failedComplete.record.runId,startup.record.runId,loops.record.runId]).size!==11)
    throw new Error('Revalidation reports must represent distinct actual runs');
  const originalReports=[];
  for(const label of ['before','after','after-first-live']){
    const file='preview-playback/'+label+'.json',record=await readJSON('lineage/current/'+file);
    measuredRun(record,file,'startedAt');measuredChecks(record,file,'pass',false);
    originalReports.push({...evidenceIdentity(record,file),historical:true});
  }
  const galleryFile='preview-playback/journeys-gallery-sandbox-live.json';
  const gallery=await readJSON('lineage/current/'+galleryFile);
  measuredRun(gallery,galleryFile,'runStartedAt');measuredChecks(gallery,galleryFile,'passed');
  requireCurrentHashes(gallery,galleryFile);
  if(gallery.gallerySandbox!==true||gallery.sandboxFixture!==false||
     gallery.browserCompleted!==true||gallery.allPassed!==true||
     gallery.verifierSha256!==sha(await readPinned('src/hybrid/verify-candidate-journeys.mjs'))||
     gallery.brokerSha256!==sha(await readPinned('src/hybrid/source-broker.js')))
    throw new Error('Retained actual-gallery journey does not match the current implementation');
  const galleryFiles=['index.html',...['asset.json','run/index.html','run/effect.js']
    .map(file=>'motion-vault-assets/curated-webgpu-route/'+file)];
  if(!gallery.assetHashes||galleryFiles.some(file=>!isHash(gallery.assetHashes[file])))
    throw new Error('Retained actual-gallery journey has incomplete implementation coverage');
  for(const [file,hash]of Object.entries(gallery.assetHashes))
    if(!galleryFiles.includes(file)||hash!==sha(await readPinned(withinWeb(file))))
      throw new Error('Retained actual-gallery implementation changed: '+file);
  const spatialFailure=failedComplete.record.samples.find(sample=>sample.id==='curated-spatial-product');
  const spatialDiagnostic=startup.record.samples.find(sample=>sample.id==='curated-spatial-product');
  const timing=startup.record.network?.find(entry=>entry.event==='response'&&entry.resourceType==='Media'&&
    entry.url===spatialDiagnostic.url)?.timing;
  const startupObservation={id:'curated-spatial-product',failureFile:failedComplete.identity.file,
    firstFrameMs:spatialFailure.firstFrameMs,dropRatio:spatialFailure.dropRatio,diagnosticFile:startup.identity.file,
    diagnosticFirstFrameMs:spatialDiagnostic.firstFrameMs,requestSendStartMs:timing?.sendStart??null,
    sendEndToResponseHeadersMs:timing&&Number.isFinite(timing.receiveHeadersStart)&&Number.isFinite(timing.sendEnd)?
      +(timing.receiveHeadersStart-timing.sendEnd).toFixed(3):null,cause:'not_confirmed',resolvedByVerifier:'not_claimed'};
  return {noPublication:true,mediaChanged:false,scope:'Current product bytes; separate live playback, offline source RGB and fresh after-window visual checks',
    sourceMediaEvidence:sourceRGB.identity,
    baseline:baseline.identity,failedFullBefore:summarize(before,'preview-playback/remaining-full-before.json'),
    failedLoops:failedLoops.identity,failedReadbackLoops:failedReadback.identity,failedWorkerLoops:failedWorker.identity,failedWorkerReadbackLoops:failedWorkerReadback.identity,
    failedComplete:failedComplete.identity,startupDiagnostic:startup.identity,startupObservation,
    cpuReadbackDiagnostic:timed.identity,loops:loops.identity,originalReports,
    functionalGates:{reused:true,measurementTimesPreserved:true,files:proofs.map(proof=>proof.file)},
    galleryJourney:{...evidenceIdentity(gallery,galleryFile),reused:true,assetHashes:gallery.assetHashes},
    limitations:'The four targets also passed before verifier edits. Verifier changes do not establish a product fix. Offline RGB continuity is not live per-frame pixel continuity; actual visual checks occur after the live performance window. The first full baseline Telescope long task and Spatial startup waiting remain unexplained historical anomalies. Inline settle/freeze is a verifier timing correction, with the original under-200ms readiness budget unchanged; conclusions are limited to these measured samples.'};
}

async function verifyPreviewStartup(){
  const labels={source:'startup-cache-source-rgb',stage:'startup-cache-stage-sequence-30',live:'startup-cache-live-30',
    loops:'startup-cache-live-loops',startupStage:'startup-cache-stage-final',startupLive:'startup-cache-live'};
  const directory='lineage/current/preview-playback/',publicationRunId='preview-startup-20261007-0435';
  const ids=candidates.items.map(item=>item.id),loopIds=['curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'];
  const identity=(record,file)=>({file,sha256:pinnedFiles.get(file),at:record.at||record.finishedAt,
    ...(record.runId?{runId:record.runId}:{}),...(record.formalHash?{formalHash:record.formalHash}:{}),
    ...(record.total?{passed:record.passed,total:record.total}:{})});
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const requireTime=(value,file,lower,upper=Infinity)=>{const t=timestamp(value,file);if(t<lower||t>upper)throw Error('Evidence is outside this publication window: '+file);return t;};
  const priorFile=directory+'startup-cache-prior-state.json',prior=await readJSON(priorFile);
  const priorPaths=['lineage/current/install-receipt.json','lineage/current/completion.json','lineage/current/RESULT.md','PROJECT.md'];
  if(!prior.files||Object.keys(prior.files).length!==priorPaths.length)throw Error('Prior-state snapshot is incomplete');
  for(const file of priorPaths){const record=prior.files[file];
    if(!record||typeof record.utf8!=='string'||Buffer.byteLength(record.utf8)!==record.bytes||sha(Buffer.from(record.utf8))!==record.sha256)
      throw Error('Prior-state original bytes do not match: '+file);
  }
  const priorReceipt=JSON.parse(prior.files['lineage/current/install-receipt.json'].utf8);
  const priorCompletion=JSON.parse(prior.files['lineage/current/completion.json'].utf8);
  for(const file of ['lineage/current/completion.json','lineage/current/RESULT.md'])
    if(sha(await readPinned(file))!==prior.files[file].sha256)throw Error('Prior project record changed before startup finalization: '+file);
  const control=text=>{const match=text.match(/<!-- AI-NATIVE-PROJECT-CONTROL:BEGIN -->[\s\S]*?<!-- AI-NATIVE-PROJECT-CONTROL:END -->/);if(!match)throw Error('Missing preserved project control block');return match[0];};
  if(control((await readPinned('PROJECT.md')).toString())!==control(prior.files['PROJECT.md'].utf8))
    throw Error('Managed project metadata changed after the prior-state snapshot');
  const baselineFile=directory+'startup-baseline-20261007.json',baseline=await readJSON(baselineFile);
  measuredRun(baseline,baselineFile,'runStartedAt');measuredChecks(baseline,baselineFile,'pass',false);
  if(baseline.label!=='startup-baseline-20261007'||baseline.formalHash!==priorReceipt.formalSha256||
     priorCompletion.formalHash!==priorReceipt.formalSha256||baseline.catalogueHash!==pinnedFiles.get('web/candidate-catalog.json')||
     priorReceipt.sync?.publicCatalogueSha256!==pinnedFiles.get('web/catalog.json'))
    throw Error('Startup baseline does not identify the unchanged published catalogue');
  const baselineAssets=fullSet(baseline.assets,ids,baselineFile+' assets'),media=[];
  for(const item of candidates.items){const old=baselineAssets.get(item.id),actual=sha(await readPinned(withinWeb(item.asset.video)));
    if(old.video!==item.asset.video||old.sha256!==actual||old.videoRevision!==item.asset.videoRevision||item.asset.videoRevision!==actual.slice(0,16))
      throw Error('Startup repair must not replace media bytes: '+item.id);
    media.push({id:item.id,version:item.asset.version,video:item.asset.video,videoRevision:item.asset.videoRevision,sha256:actual});
  }
  const publicationAt=timestamp(receipt.at,'install-receipt.json');
  if(receipt.runId!==publicationRunId||receipt.runId===priorReceipt.runId||formalHash===priorReceipt.formalSha256||
     (!Number.isInteger(receipt.changedFiles)||receipt.changedFiles<1)||receipt.applicationCount!==1||receipt.canonicalEntry!=='motion-vault.html'||
     receipt.legacyCandidateRedirect!==true||receipt.redirectSha256!==redirectSha256||
     receipt.privateReviewPublished!==false||receipt.userBrowserDataChanged!==false||receipt.hubBusinessDataChanged!==false||
     receipt.serverRestarted!==false||receipt.sync?.verified!==true||receipt.sync?.checkOnly!==true)
    throw Error('A new, successful, original-entry startup publication is required');
  requireCurrentHashes(receipt.sync,'install-receipt.json sync');
  requireTime(prior.at,priorFile,timestamp(baseline.at,baselineFile),publicationAt);
  const gallerySource=await readPinned('src/hybrid/gallery.js');
  if(!html.toString().includes(gallerySource.toString()))throw Error('Current gallery source is not the published inline implementation');
  const runnerPath='.runtime/preview-playback/startup-cache-validation.mjs';
  const stageExecutionFile='.runtime/preview-playback/startup-cache-stage-execution.json';
  const liveExecutionFile='.runtime/preview-playback/startup-cache-live-execution.json';
  const stageExecution=await readJSON(stageExecutionFile),liveExecution=await readJSON(liveExecutionFile);
  const taskNames={stage:['source-rgb','candidate-validation','candidate-sandbox','normal-hover','reduced-hover','gallery-journeys','playback-30'],
    live:['startup-delay','playback-30','long-loops','candidate-validation','candidate-sandbox','normal-hover','reduced-hover','consolidation','source-journeys','gallery-journeys','project-tests','sync-check']};
  const taskScripts={'source-rgb':'src/hybrid/diagnose-preview-media.mjs','candidate-validation':'src/hybrid/verify-candidates-current.mjs',
    'candidate-sandbox':'src/hybrid/verify-candidate-sandbox.mjs','normal-hover':'src/hybrid/test-hover-intent.mjs',
    'reduced-hover':'src/hybrid/test-hover-intent.mjs','consolidation':'src/hybrid/verify-current.mjs',
    'source-journeys':'src/hybrid/verify-candidate-journeys.mjs','gallery-journeys':'src/hybrid/verify-candidate-journeys.mjs',
    'playback-30':'src/hybrid/verify-preview-playback.mjs','long-loops':'src/hybrid/verify-preview-playback.mjs',
    'startup-delay':'src/hybrid/verify-preview-startup.mjs','project-tests':'tests/gallery.test.mjs','sync-check':'scripts/sync-gallery.mjs'};
  const taskArgs=(phase,name)=>{
    const live=phase==='live'?['--live']:[];
    if(name==='source-rgb')return [taskScripts[name],'--root','.runtime/hybrid-assets/staged','--profile','rgb','--analyze',ids.join(','),'--out',directory+labels.source+'.json'];
    if(name==='project-tests')return ['--test','--test-reporter=tap',taskScripts[name]];
    if(name==='sync-check')return [taskScripts[name],'--check'];
    if(name==='normal-hover'||name==='reduced-hover')return [taskScripts[name],name==='normal-hover'?'normal':'reduced',...live];
    if(name==='gallery-journeys')return [taskScripts[name],'--gallery-sandbox',...live];
    if(name==='startup-delay')return [taskScripts[name],'--live','--label',labels.startupLive];
    if(name==='playback-30')return [taskScripts[name],...(phase==='stage'?['--stage']:[]),'--source-report',labels.source,'--label',labels[phase]];
    if(name==='long-loops')return [taskScripts[name],'--source-report',labels.source,'--label',labels.loops,'--sample-ms','22000','--require-loops','3','--ids',loopIds.join(',')];
    return [taskScripts[name],...live];
  };
  const tasks={};let historicalStage=null;
  if(pinnedFiles.get(stageExecutionFile)!=='f21719ad98825536bc35d9eaaa489a49c868afd0f7e31e3ad67d012e6c0a82a4')
    throw Error('The original failed stage execution must remain unchanged');
  for(const [phase,record,file]of [['stage',stageExecution,stageExecutionFile],['live',liveExecution,liveExecutionFile]]){
    const lower=phase==='stage'?timestamp(baseline.at,baselineFile):publicationAt,upper=phase==='stage'?publicationAt:Infinity;
    if(record.schema!=='motion-vault.startup-validation-execution.v1'||record.phase!==phase||record.status!==(phase==='stage'?'failed':'completed')||
       record.mainHtmlSha256!==formalHash||!same(record.tasks?.map(task=>task.name),taskNames[phase])||
       record.runnerSha256!==(phase==='stage'?'7250f40848f58228f381cd4343fe97e5b56f4dd5c9eb5647964bf77eb60cf437':sha(await readPinned(runnerPath))))
      throw Error('Incomplete or mismatched '+phase+' execution receipt');
    let previous=requireTime(record.startedAt,file,lower,upper);
    for(const task of record.tasks){
      if(phase==='stage'&&task.name==='playback-30'){
        const file=directory+'startup-cache-stage-30.json';
        const start=requireTime(task.startedAt,file,previous,upper);
        previous=requireTime(task.finishedAt,file,start,upper);
        if(task.status!=='failed'||task.exitCode!==1||task.signal!==null||task.error!==null||
           task.sourceUnchanged!==true||task.script!==taskScripts['playback-30']||
           task.scriptSha256!=='1885ec4d2b108cb231956d2f13d6a9a9d12099b41c608f405cec14d1520edb9d'||
           !same(task.args,[taskScripts['playback-30'],'--stage','--source-report',labels.source,'--label','startup-cache-stage-30'])||
           task.report?.path!==file)throw Error('Historical stage failure was altered');
        historicalStage=await readJSON(file);
        measuredRun(historicalStage,file,'startedAt',false);measuredChecks(historicalStage,file,'pass',false);
        requireCurrentHashes(historicalStage,file);
        requireTime(historicalStage.startedAt,file,start,previous);requireTime(historicalStage.at,file,start,previous);
        if(task.report.sha256!==pinnedFiles.get(file)||task.report.runId!==historicalStage.runId||
           historicalStage.verifierHash!==task.scriptSha256||historicalStage.passed!==178||historicalStage.total!==187||
           historicalStage.checks.filter(c=>!c.pass).length!==9)
          throw Error('The original nine failed checks must be retained without promotion');
        continue;
      }
      if(task.status!=='passed'||task.exitCode!==0||task.signal!==null||task.error!==null||task.sourceUnchanged!==true||
         task.script!==taskScripts[task.name]||!same(task.args,taskArgs(phase,task.name))||task.scriptSha256!==sha(await readPinned(task.script))||
         typeof task.stdout!=='string'||typeof task.stderr!=='string')
        throw Error('Execution task is not a fresh successful check: '+phase+' '+task.name);
      const start=requireTime(task.startedAt,file+' '+task.name,previous,upper);
      previous=requireTime(task.finishedAt,file+' '+task.name,start,upper);
      if(task.report){const actual=await readPinned(task.report.path);if(sha(actual)!==task.report.sha256)throw Error('Execution report changed: '+task.report.path);}
      tasks[phase+':'+task.name]=task;
    }
    requireTime(record.finishedAt,file,previous,upper);
  }
  if(stageExecution.priorState?.path!==priorFile||stageExecution.priorState.sha256!==pinnedFiles.get(priorFile))
    throw Error('Stage execution did not retain this original prior state');
  const closureFile='.runtime/preview-playback/startup-cache-stage-closure.json';
  const closureRunner='.runtime/preview-playback/startup-cache-stage-closure.mjs';
  const closure=await readJSON(closureFile),prerequisites=taskNames.stage.slice(0,-1);
  if(closure.schema!=='motion-vault.startup-stage-closure.v1'||closure.status!=='completed'||
     closure.mainHtmlSha256!==formalHash||closure.runnerSha256!==sha(await readPinned(closureRunner))||
     closure.prior?.path!==stageExecutionFile||closure.prior.sha256!==pinnedFiles.get(stageExecutionFile)||
     !same(closure.prior.passedTasks,prerequisites)||!same(closure.prior.failedPlaybackPreserved,stageExecution.tasks.at(-1).report)||
     !same(closure.tasks?.map(task=>task.name),['playback-30','startup-delay']))
    throw Error('A separately completed stage sequence and startup closure are required');
  const pinPaths=['.runtime/hybrid-assets/staged/index.html',taskScripts['playback-30'],taskScripts['startup-delay'],directory+labels.source+'.json'];
  if(!closure.pins||!same(Object.keys(closure.pins).sort(),pinPaths.sort()))throw Error('Stage closure input binding is incomplete');
  for(const file of pinPaths)if(closure.pins[file]!==sha(await readPinned(file)))throw Error('Stage closure source changed: '+file);
  const diagnostic=closure.diagnosticControl;
  if(diagnostic?.path!=='.runtime/preview-playback/startup-cache-path-control.json'||diagnostic.promotedToGate!==false||
     diagnostic.sha256!==sha(await readPinned(diagnostic.path)))
    throw Error('ABBA diagnostic must remain separate from completion gates');
  let closureTime=requireTime(closure.startedAt,closureFile,timestamp(stageExecution.finishedAt,stageExecutionFile),publicationAt);
  for(const task of closure.tasks){
    const expectedArgs=task.name==='playback-30'?taskArgs('stage','playback-30'):
      [taskScripts['startup-delay'],'--stage','--label',labels.startupStage];
    if(task.status!=='passed'||task.exitCode!==0||task.signal!==null||task.error!==null||task.sourceUnchanged!==true||
       task.script!==taskScripts[task.name]||!same(task.args,expectedArgs)||
       task.scriptSha256!==sha(await readPinned(task.script))||typeof task.stdout!=='string'||typeof task.stderr!=='string'||
       task.report?.path!==directory+(task.name==='playback-30'?labels.stage:labels.startupStage)+'.json')
      throw Error('Stage closure task did not complete successfully: '+task.name);
    const start=requireTime(task.startedAt,closureFile+' '+task.name,closureTime,publicationAt);
    closureTime=requireTime(task.finishedAt,closureFile+' '+task.name,start,publicationAt);
    if(sha(await readPinned(task.report.path))!==task.report.sha256)throw Error('Stage closure report changed: '+task.report.path);
    tasks['closure:'+task.name]=task;
  }
  requireTime(closure.finishedAt,closureFile,closureTime,publicationAt);
  const data={};for(const [key,label]of Object.entries(labels).filter(([key])=>key!=='source'))data[key]=await readJSON(directory+label+'.json');
  const sourceRGB=await readSourceRGB(data.live,directory+labels.source+'.json');
  const checkAssets=(rows,expectedIds,file)=>{const map=fullSet(rows,expectedIds,file);
    for(const id of expectedIds){const measured=map.get(id),actual=media.find(row=>row.id===id);
      if(measured.video!==actual.video||measured.sha256!==actual.sha256||measured.videoRevision!==actual.videoRevision||
         measured.version!==undefined&&measured.version!==actual.version)throw Error('Wrong measured media: '+file+' '+id);
    }return map;};
  const recordTask=async(record,file,key)=>{const task=tasks[key];if(!task)throw Error('Missing execution task '+key);
    requireTime(record.at,file,timestamp(task.startedAt,key),timestamp(task.finishedAt,key));
    requireTime(record.startedAt||record.runStartedAt,file,timestamp(task.startedAt,key),timestamp(record.at,file));
    if(task.report&&(task.report.path!==file||task.report.sha256!==pinnedFiles.get(file)||task.report.runId!==record.runId))
      throw Error('Report does not match its execution task: '+file);
    if(!task.report){
      const last=task.stdout.trim().split(/\r?\n/).at(-1);let output;
      try{output=JSON.parse(last);}catch{throw Error('Missing final journey execution summary: '+key);}
      const expected=file.replace(/\.json$/,'-'+record.runId+'.json');
      if(output.runId!==record.runId||output.report!==expected||output.formalHash!==formalHash||
         output.browserClosed!==true||output.allPassed!==true||sha(await readPinned(expected))!==pinnedFiles.get(file))
        throw Error('Journey report does not match its completed execution: '+key);
    }
  };
  for(const key of ['stage','live','loops']){
    const record=data[key],file=directory+labels[key]+'.json',isLive=key!=='stage',expectedIds=key==='loops'?loopIds:ids;
    measuredRun(record,file,'startedAt',isLive);measuredChecks(record,file,'pass');requireCurrentHashes(record,file);
    requireTime(record.startedAt,file,isLive?publicationAt:timestamp(closure.startedAt,closureFile),isLive?Infinity:publicationAt);
    if(record.label!==labels[key]||record.verifierHash!==sha(await readPinned('src/hybrid/verify-preview-playback.mjs'))||
       record.errors?.length!==0||record.diagnosticOnly!==false||record.control!==null||!Array.isArray(record.playbackControlMappings)||record.playbackControlMappings.length!==0||
       record.sampleMs!==(key==='loops'?22000:2400)||record.requiredLoops!==(key==='loops'?3:0))
      throw Error('Wrong startup playback run: '+file);
    requireSeparatedEnvironment(record,file,sourceRGB);checkAssets(record.assets,expectedIds,file+' assets');
    const samples=fullSet(record.samples,expectedIds,file+' samples'),origin=new URL(record.environment?.page?.url).origin;
    const page=new URL(record.environment.page.url),expectedPath=isLive?'/app/assets/motion-vault.html':'/motion-vault.html';
    if(page.pathname!==expectedPath||page.search!=='?view=pending'||(isLive&&origin!=='http://127.0.0.1:4380')||
       record.environment.gpuDisabledByHarness!==false)throw Error('Wrong measured gallery or GPU mode: '+file);
    for(const id of expectedIds){const sample=samples.get(id),asset=media.find(row=>row.id===id);
      requireSeparatedSample(sample,file,sourceRGB);sampleMetrics(sample,file);
      const canonical=new URL((isLive?'/app/assets/':'/')+asset.video,origin);canonical.searchParams.set('v',asset.videoRevision);
      const actual=new URL(sample.url);
      if(sample.version!==asset.version||sample.video!==asset.video||sample.canonicalMediaURL!==canonical.href||
         !(sample.url===canonical.href||actual.protocol==='blob:'&&actual.origin===origin)||
         sample.playbackMediaSha256!==asset.sha256||sample.servedMediaSha256!==asset.sha256||
         key==='loops'&&sample.loops<3)throw Error('Actual playback, canonical HTTP and current media identities differ: '+id);
      for(const frame of [sample.actualPixelChange.first,sample.actualPixelChange.second])
        for(const state of [frame.beforeGuard,frame.afterGuard,frame.readiness?.before,frame.readiness?.after])
          if(!state||state.sameCanonicalSource!==true||state.canonicalMediaURL!==canonical.href)
            throw Error('Visual capture lost canonical media identity: '+id);
    }
    await recordTask(record,file,key==='stage'?'closure:playback-30':key==='live'?'live:playback-30':'live:long-loops');
  }
  const requiredStartupChecks=[
    ['A','Preparation starts before hover and reuses one result'],['A','First real frame is below the existing 800ms limit'],
    ['A','Hover does not initiate another target HTTP request'],['A','Actual Blob playback bytes match the current source'],
    ['B','Cold hover was abandoned while its delayed request was outstanding'],['B','Late media completion does not resurrect a departed preview'],
    ['B','A later real hover resumes playback'],['B','Recovered player uses the correct media bytes'],
    ['C','Fast card switches never overlap players'],['C','Two naturally prepared cards really produced frames'],
    ['C','Render releases old players and late tasks stay detached'],['C','Pagehide releases players and object URLs'],
    ['all','Preparation fetch concurrency stays bounded'],['all','Injected requests were actually held for at least 1000ms']];
  for(const key of ['startupStage','startupLive']){
    const record=data[key],file=directory+labels[key]+'.json',isLive=key==='startupLive';
    measuredRun(record,file,'runStartedAt',isLive);measuredChecks(record,file,'pass');requireCurrentHashes(record,file);
    requireTime(record.runStartedAt,file,isLive?publicationAt:timestamp(closure.startedAt,closureFile),isLive?Infinity:publicationAt);
    if(record.schema!=='motion-vault.preview-startup.v1'||record.label!==labels[key]||record.allPassed!==true||
       record.browserCompleted!==true||record.browserClosed!==true||record.errors?.length!==0||
       record.verifierSha256!==sha(await readPinned('src/hybrid/verify-preview-startup.mjs'))||
       record.catalogueHash!==pinnedFiles.get('web/candidate-catalog.json')||
       !same(record.limits,{entries:9,bytes:25165824,singleBytes:4194304,concurrent:1})||
       record.contract?.requestDelayMs!==1000||record.contract.fixedVisibleReadingMs!==1500||
       record.contract.firstFrameLimitMs!==800||record.contract.usesProductPreparationOnly!==true||
       record.contract.cacheDisabled!==false||record.contract.backgroundPlayersAllowed!==0||
       record.contract.liveFPSClaimed!==false||record.contract.preparationMayStillBeInFlightAtHover!==true||
       record.contract.testByteReadsExcluded!==true||
       record.contract.backgroundConcurrencyClock!=='same-document fetch start through body-consume/cancel/abort'||
       requiredStartupChecks.some(([scenario,name])=>record.checks.filter(c=>c.scenario===scenario&&c.name===name&&c.pass===true).length!==1))
      throw Error('Startup fault/recovery contract was not fully verified: '+file);
    checkAssets(record.assets,ids,file+' assets');
    const scenarios=fullSet(record.scenarios.map(row=>({...row,id:row.name})),['A','B','C'],file+' scenarios');
    const a=scenarios.get('A'),b=scenarios.get('B'),c=scenarios.get('C');
    if(a.frame?.trusted!==true||!(a.frame.firstFrameMs>=0&&a.frame.firstFrameMs<800)||
       a.identity?.protocol!=='blob:'||a.identity.sha256!==media.find(row=>row.id==='curated-reaction-diffusion').sha256||
       b.coldFirstFrameLimitClaimed!==false||b.identity?.sha256!==media.find(row=>row.id==='curated-webgpu-route').sha256||
       c.pagehide?.syntheticLifecycleEvent!==true)
      throw Error('Startup scenarios do not retain real frames and truthful lifecycle scope: '+file);
    const concurrency=record.checks.find(check=>check.scenario==='all'&&check.name==='Preparation fetch concurrency stays bounded').detail;
    if(concurrency?.limit!==1||concurrency.basis!=='same-document uncanceled product fetch through body consumption'||
       concurrency.documents?.length!==3||concurrency.documents.some(doc=>!Number.isInteger(doc.maxBackground)||doc.maxBackground>1))
      throw Error('Startup preparation concurrency is not bound to each document: '+file);
    await recordTask(record,file,isLive?'live:startup-delay':'closure:startup-delay');
  }
  const runIds=Object.values(data).map(record=>record.runId);
  if(new Set(runIds).size!==runIds.length||runIds.includes(baseline.runId)||runIds.includes(historicalStage.runId))throw Error('Startup evidence must retain distinct actual runs');
  const functional={stage:['candidate-validation.json','sandbox.json','no-preference.json','reduce.json'],live:proofNames};
  const functionalTasks={'candidate-validation.json':'candidate-validation','sandbox.json':'candidate-sandbox',
    'no-preference.json':'normal-hover','reduce.json':'reduced-hover','live-candidate-validation.json':'candidate-validation',
    'sandbox-live.json':'candidate-sandbox','live-no-preference.json':'normal-hover','live-reduce.json':'reduced-hover','consolidation-check.json':'consolidation'};
  for(const [phase,names]of Object.entries(functional))for(const name of names){
    const file='lineage/current/'+name,record=await readJSON(file);
    requireCurrentHashes(record,file);passedCount(record,file);
    const task=tasks[phase+':'+functionalTasks[name]];
    if(task.report?.path!==file||task.report.sha256!==pinnedFiles.get(file)||
       record.live!==undefined&&record.live!==(phase==='live')||
       record.reports?.some(row=>row.live!==(phase==='live')))
      throw Error('Functional report does not belong to this execution: '+file);
    requireTime(record.at,file,timestamp(task.startedAt,file),timestamp(task.finishedAt,file));
    const rows=record.checks||record.reports;
    if(!Array.isArray(rows)||rows.length!==record.total||rows.some(row=>(row.pass??row.passed)!==true))
      throw Error('Functional check rows are incomplete: '+file);
    requireTime(record.at,file,phase==='live'?publicationAt:timestamp(stageExecution.startedAt,stageExecutionFile),phase==='live'?Infinity:publicationAt);
  }
  const journeys=[];
  for(const [file,gallery,phase]of [[directory+'journeys-gallery-sandbox-stage.json',true,'stage'],
    [directory+'journeys-live.json',false,'live'],[directory+'journeys-gallery-sandbox-live.json',true,'live']]){
    const record=await readJSON(file),expectedIds=gallery?['curated-webgpu-route']:['curated-webgpu-route','curated-persistent-gallery'];
    measuredRun(record,file,'runStartedAt',phase==='live');measuredChecks(record,file,'passed');requireCurrentHashes(record,file);
    if(record.allPassed!==true||record.browserCompleted!==true||record.gallerySandbox!==gallery||record.sandboxFixture!==false||
       record.verifierSha256!==sha(await readPinned('src/hybrid/verify-candidate-journeys.mjs'))||
       record.brokerSha256!==sha(await readPinned('src/hybrid/source-broker.js')))throw Error('Wrong actual journey evidence: '+file);
    const reports=fullSet(record.reports,expectedIds,file+' reports');
    for(const id of expectedIds)if(reports.get(id).passed!==true||!reports.get(id).actions.some(action=>action.action==='real_pointer_click'&&action.proof?.events?.some(event=>event.type==='click'&&event.isTrusted===true&&event.match===true)))
      throw Error('Journey lacks trusted target clicks: '+file+' '+id);
    const paths=['index.html',...expectedIds.flatMap(id=>['asset.json','run/index.html','run/effect.js'].map(name=>'motion-vault-assets/'+id+'/'+name))];
    if(!record.assetHashes||!same(Object.keys(record.assetHashes).sort(),paths.sort()))throw Error('Incomplete journey implementation binding');
    for(const name of paths)if(record.assetHashes[name]!==sha(await readPinned(withinWeb(name))))throw Error('Journey implementation changed: '+name);
    await recordTask(record,file,phase+':'+(gallery?'gallery-journeys':'source-journeys'));
    journeys.push({...identity(record,file),live:phase==='live',gallerySandbox:gallery,assetHashes:record.assetHashes});
  }
  const publicationFiles=await readJSON('lineage/current/publication-file-check.json');
  const mainCheck=publicationFiles.files?.find(file=>file.path==='web/index.html');
  if(!mainCheck||mainCheck.expected!==formalHash||mainCheck.actual!==formalHash||
     !publicationFiles.planned?.some(file=>file.path.replaceAll('\\','/')==='web/index.html'&&file.hash===formalHash))
    throw Error('The original primary page was not recorded in this publication plan');
  requireTime(publicationFiles.at,'publication-file-check.json',timestamp(closure.finishedAt,closureFile),publicationAt);
  const summary=key=>({...identity(data[key],directory+labels[key]+'.json'),startedAt:data[key].startedAt||data[key].runStartedAt,
    ...(data[key].samples?{summary:playbackSummary(data[key].samples),samples:data[key].samples.map(sample=>({id:sample.id,
      canonicalMediaURL:sample.canonicalMediaURL,url:sample.url,playbackMediaSha256:sample.playbackMediaSha256,
      servedMediaSha256:sample.servedMediaSha256,metrics:sampleMetrics(sample,labels[key]),actualPixelChange:sample.actualPixelChange}))}:{scenarios:data[key].scenarios.map(s=>({name:s.name,id:s.id,firstFrameMs:s.frame?.firstFrameMs,preparation:s.preparation}))})});
  return {nodeOutput:tasks['live:project-tests'].stdout,syncOutput:tasks['live:sync-check'].stdout,proof:{
    publication:{file:'lineage/current/install-receipt.json',sha256:pinnedFiles.get('lineage/current/install-receipt.json'),runId:receipt.runId,
      at:receipt.at,previousRunId:priorReceipt.runId,previousFormalHash:priorReceipt.formalSha256,formalHash,changedFiles:receipt.changedFiles},
    priorState:identity(prior,priorFile),baseline:{...identity(baseline,baselineFile),historical:true,failedChecks:baseline.checks.filter(c=>!c.pass)},
    sourceMedia:sourceRGB.identity,stage30:summary('stage'),live30:summary('live'),fourTargetLoops:summary('loops'),
    startupStage:summary('startupStage'),startupLive:summary('startupLive'),journeys,unchangedMedia:media,
    historicalStageFailure:{...identity(historicalStage,directory+'startup-cache-stage-30.json'),historical:true,
      promotedToGate:false,failedChecks:historicalStage.checks.filter(check=>!check.pass),
      cause:'The nine sustained-drop failures remain unexplained; the declared full-sequence follow-up did not reproduce them.'},
    execution:{stage:{...identity(stageExecution,stageExecutionFile),runnerSha256:stageExecution.runnerSha256,
        status:stageExecution.status,reusedPassedTasks:prerequisites},
      stageClosure:{...identity(closure,closureFile),runnerSha256:closure.runnerSha256,status:closure.status,diagnosticControl:diagnostic},
      live:{...identity(liveExecution,liveExecutionFile),runnerSha256:liveExecution.runnerSha256}},
    gallerySourceSha256:sha(gallerySource),newlyPublished:true,productChanged:true,mediaChanged:false,changedVideos:0,
    scope:'Bounded visible media preparation with no background player; unchanged source media. Performance observation, source RGB/PTS and after-window actual pixels remain separate.',
    limitation:'The previous intermittent browser startup cause and the first stage run\'s nine sustained-drop failures remain unconfirmed. The declared same-product sequence follow-up passed; it does not establish a fix for those failures. ABBA URL-path controls are diagnostic only. This repair is supported by delayed-request preparation/reuse and recovery tests plus this release measurements; it does not claim every cold hover or device starts below 800 ms.'}};
}


// This supplementary coverage never changes the retained failed normal-hover record.
async function verifyFormal36Supplement({publication,live,continuation}){
  const file='lineage/current/preview-playback/formal36-cycle.json',r=await readJSON(file);
  const script='.runtime/preview-playback/verify-formal36-cycle.mjs',verifierSha256=sha(await readPinned(script));
  const names=['Expected mode and authored period','All fourteen predetermined samples captured within bound','Same visible automatic instance throughout',
    'Natural phase advances across a complete cycle','Authored pixels visibly change with original threshold','No control-taking or fabricated input',
    'No page or asynchronous errors','Leaving releases the single preview'];
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),offsets=Array.from({length:14},(_,i)=>i*350);
  const inputs=['web/index.html','src/hybrid/gallery.js','src/hybrid/preview-choreography.js',
    'web/motion-vault-assets/shared/runtime.31fd3f9a83f9.mjs','web/motion-vault-assets/shared/runtime.css','web/motion-vault-assets/local-36/entry.mjs',
    'src/hybrid/test-hover-intent.mjs','lineage/current/live-no-preference.json','lineage/current/install-receipt.json','.runtime/preview-playback/startup-queue-live-execution.json'];
  if(r.schema!=='motion-vault.formal36-natural-cycle.v1'||r.live!==true||r.status!=='completed'||r.formalHash!==formalHash||
     r.publicationSha256!==pinnedFiles.get('lineage/current/install-receipt.json')||
     r.failedHoverSha256!==pinnedFiles.get('lineage/current/live-no-preference.json')||r.verifierSha256!==verifierSha256||
     r.sourceUnchanged!==true||r.browserCompleted!==true||r.allPassed!==true||r.error||typeof r.runId!=='string'||!r.runId||
     r.sourceInference?.observedOriginalFailurePhases!==false||
     !same(r.plan,{periodMs:4200,offsetsMs:offsets,maximumWindowMs:6500,pixelThreshold:5,modes:['normal','reduced'],earlySuccessExit:false})||
     !same(Object.keys(r.expected||{}).sort(),[...inputs].sort())||
     timestamp(r.startedAt,file)<Math.max(timestamp(continuation.finishedAt,'continuation'),timestamp(live.finishedAt,'failed execution'),timestamp(publication.at,'publication'))||
     timestamp(r.at,file)<timestamp(r.startedAt,file))throw Error('The independent fixed-cycle report is incomplete or not this published implementation');
  measuredChecks(r,file,'pass');
  if(!same(r.checks.map(c=>c.name),['normal','reduced'].flatMap(mode=>names.map(name=>mode+': '+name)).concat('Pinned inputs and verifier remain unchanged'))||
     !same(r.reports?.map(m=>m.mode),['normal','reduced']))throw Error('Fixed-cycle modes/check coverage changed');
  for(const input of inputs)if(r.expected[input]!==sha(await readPinned(input)))throw Error('Fixed-cycle input changed: '+input);
  const servedFiles=['web/index.html','web/motion-vault-assets/shared/runtime.31fd3f9a83f9.mjs','web/motion-vault-assets/shared/runtime.css','web/motion-vault-assets/local-36/entry.mjs'];
  if(r.served?.length!==4||servedFiles.some((input,i)=>{const x=r.served[i],url='http://127.0.0.1:4380/app/assets/'+(i?input.slice(4):'motion-vault.html');
    return x?.url!==url||x.status!==200||x.sha256!==r.expected[input];}))throw Error('Fixed-cycle actual HTTP implementation differs');
  let prior=r.startedAt;const modes=[];
  for(const m of r.reports){
    measuredChecks(m,file+' '+m.mode,'pass');
    if(m.error||!same(m.checks.map(c=>c.name),names)||m.samples?.length!==14||
       timestamp(m.startedAt,file)<timestamp(prior,file)||timestamp(m.finishedAt,file)<timestamp(m.startedAt,file)||timestamp(m.finishedAt,file)>timestamp(r.at,file))
      throw Error('Fixed-cycle mode did not complete its declared checks');
    prior=m.finishedAt;
    const modeCheck=m.checks[0].detail,trace=m.trace,states=m.samples.flatMap(x=>[x.before,x.after]);
    if(modeCheck?.reduced!==(m.mode==='reduced')||modeCheck.duration!==4200||modeCheck.item?.id!==36||modeCheck.item.asset?.video!==null||
       trace?.overflow!==false||trace.lifecycle?.length!==0||trace.errors?.length!==0||
       !Array.isArray(trace.inputs)||trace.inputs.some(e=>e.trusted!==true||['pointerdown','pointerup','click','keydown','wheel'].includes(e.type))||
       states.some(x=>!x||x.sameNode!==true||x.connected!==true||x.active?.id!==36||x.playing!=='true'||x.running!=='true'||x.playback!=='auto'||
         x.activeCount!==1||x.layerCount!==1||x.visible?.page!=='visible'||x.visible.painted!==true||x.visible.fullViewport!==true||x.visible.hitCard!==true))
      throw Error('Fixed-cycle natural instance/input identity differs');
    for(const [index,x]of m.samples.entries()){
      const expectedFrame='lineage/current/preview-playback/formal36-cycle-frames/'+m.mode+'-'+String(index).padStart(2,'0')+'.png';
      if(x.index!==index||x.plannedOffsetMs!==offsets[index]||x.due!==m.initial.at+offsets[index]||
         !(x.before.at>=m.initial.at&&x.after.at>=x.before.at&&x.before.at-m.initial.at<=6500)||
         x.frame!==expectedFrame||x.sha256!==sha(await readPinned(x.frame)))throw Error('Predetermined fixed-cycle sample identity differs');
    }
    const elapsed=m.samples.at(-1).after.at-m.samples[0].before.at;
    if(!(elapsed>=4200&&elapsed<=6500))throw Error('Full cycle was not observed within its declared window');
    const phases=trace.phases;let turns=0,advance=0,maxStep=0;
    if(!Array.isArray(phases)||phases.length<2||phases.some(x=>!Number.isFinite(x.at)||!Number.isFinite(x.phase)||x.phase<0||x.phase>1))throw Error('Missing natural phase trace');
    for(let i=1;i<phases.length;i++){let d=phases[i].phase-phases[i-1].phase;if(d<-.5){turns++;d++;}
      if(d<0||d>.5||phases[i].at<phases[i-1].at)throw Error('Invalid natural phase progression');advance+=d;maxStep=Math.max(maxStep,d);}
    const seenOpen=states.some(x=>x.phase>=.15&&x.phase<=.64),seenClosed=states.some(x=>x.phase>=.82||x.phase<=.03);
    if(turns<1||advance<1||!seenOpen||!seenClosed||
       !same(m.phaseSummary,{records:phases.length,turns,advance,maxPhaseStep:maxStep,seenOpen,seenClosed,overflow:false}))throw Error('Natural full-cycle summary differs');
    const pairs=m.pixelPairs;
    if(!Array.isArray(pairs)||pairs.length!==91)throw Error('Incomplete fixed screenshot comparisons');
    let n=0;for(let i=0;i<14;i++)for(let j=i+1;j<14;j++){const p=pairs[n++];if(p.i!==i||p.j!==j||!Number.isInteger(p.pixels)||p.pixels<0)throw Error('Fixed screenshot comparison identity differs');}
    const maximum=Math.max(...pairs.map(p=>p.pixels)),change=m.checks.find(c=>c.name===names[4]).detail;
    if(maximum<5||change?.pixels!==maximum||change.threshold!==5)throw Error('Original visible-pixel threshold not met');
    modes.push({mode:m.mode,passed:m.passed,total:m.total,startedAt:m.startedAt,finishedAt:m.finishedAt,elapsedMs:elapsed,
      phaseSummary:m.phaseSummary,maximumChangedPixels:maximum,samples:m.samples.map(x=>({index:x.index,frame:x.frame,sha256:x.sha256}))});
  }
  return {file,sha256:pinnedFiles.get(file),at:r.at,startedAt:r.startedAt,runId:r.runId,passed:r.passed,total:r.total,formalHash,
    verifierSha256,plan:r.plan,modes,sourceInference:r.sourceInference,scope:'Independent fixed full-cycle coverage for formal ID 36; the earlier 192/193 report remains failed, and its original zero-difference cause is undetermined.'};
}

async function verifyPreviewQueue(){
  const directory='lineage/current/preview-playback/',runtime='.runtime/preview-playback/',prefix='startup-queue-';
  const runnerPath=runtime+prefix+'validation.mjs',runnerHash=sha(await readPinned(runnerPath));
  const stageFile=runtime+prefix+'stage-execution.json',liveFile=runtime+prefix+'live-execution.json';
  const continuationFile=runtime+prefix+'live-continuation.json',continuationScript=runtime+prefix+'live-continuation.mjs';
  const continuation=queueContinuationMode?await readJSON(continuationFile):null;
  const continuationRunnerHash=queueContinuationMode?sha(await readPinned(continuationScript)):null;
  const stage=await readJSON(stageFile),live=await readJSON(liveFile),priorFile=directory+prefix+'prior-state.json',prior=await readJSON(priorFile);
  const identity=(r,file)=>({file,sha256:pinnedFiles.get(file),at:r.at||r.finishedAt,runId:r.runId,passed:r.passed,total:r.total,formalHash:r.formalHash||r.mainHtmlSha256});
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const inWindow=(value,file,a,b)=>{const t=timestamp(value,file);if(t<timestamp(a,file)||t>timestamp(b,file))throw Error('Evidence outside its actual execution: '+file);};
  for(const [file,r]of Object.entries(prior.files||{}))if(typeof r.utf8!=='string'||Buffer.byteLength(r.utf8)!==r.bytes||sha(Buffer.from(r.utf8))!==r.sha256)
    throw Error('Prior warnings snapshot byte mismatch: '+file);
  for(const file of ['PROJECT.md','lineage/current/completion.json','lineage/current/RESULT.md','lineage/current/install-receipt.json'])
    if(!prior.files?.[file])throw Error('Prior warnings snapshot is incomplete: '+file);
  const previous=JSON.parse(prior.files['lineage/current/completion.json'].utf8),oldReceipt=JSON.parse(prior.files['lineage/current/install-receipt.json'].utf8);
  if(previous.status!=='published_with_warnings'||previous.allTechnicalGatesPassed!==false||previous.userTaskComplete!==false||
     previous.formalHash!==oldReceipt.formalSha256||oldReceipt.formalSha256===formalHash||oldReceipt.runId===receipt.runId)
    throw Error('The preceding warnings checkpoint and distinct new publication are required');
  for(const file of ['lineage/current/completion.json','lineage/current/RESULT.md'])
    if(sha(await readPinned(file))!==prior.files[file].sha256)throw Error('Current warnings record changed before finalization: '+file);
  for(const record of previous.historicalEvidence||[])for(const item of [record,...(record.reports||[])]){
    const saved=prior.files[item.file];
    if(!(saved&&saved.sha256===item.sha256)&&sha(await readPinned(item.file))!==item.sha256)
      throw Error('Historical failure evidence changed: '+item.file);
  }
  const control=text=>text.match(/<!-- AI-NATIVE-PROJECT-CONTROL:BEGIN -->[\s\S]*?<!-- AI-NATIVE-PROJECT-CONTROL:END -->/)?.[0];
  const projectText=(await readPinned('PROJECT.md')).toString();
  if(!control(projectText)||control(projectText)!==control(prior.files['PROJECT.md'].utf8))throw Error('User acceptance metadata changed');
  if(receipt.runId!==stage.releaseRunId||live.releaseRunId!==stage.releaseRunId||receipt.changedFiles!==4||receipt.applicationCount!==1||
     receipt.canonicalEntry!=='motion-vault.html'||receipt.legacyCandidateRedirect!==true||receipt.sync?.verified!==true||
     receipt.sync.checkOnly!==true||receipt.privateReviewPublished!==false||receipt.userBrowserDataChanged!==false||
     receipt.hubBusinessDataChanged!==false||receipt.serverRestarted!==false)throw Error('New queue publication identity or scope is wrong');
  requireCurrentHashes(receipt.sync,'queue publication sync');
  const gallery=await readPinned('src/hybrid/gallery.js');
  if(!html.toString().includes(gallery.toString()))throw Error('Current two-slot source is not the published implementation');
  const ids=candidates.items.map(x=>x.id),loopIds=['curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'];
  const oldMedia=fullSet(previous.unchangedMedia,ids,'prior warnings media'),media=[];
  for(const item of candidates.items){const digest=sha(await readPinned(withinWeb(item.asset.video))),old=oldMedia.get(item.id);
    if(old.sha256!==digest||old.video!==item.asset.video||old.videoRevision!==item.asset.videoRevision||item.asset.videoRevision!==digest.slice(0,16))
      throw Error('Queue repair must preserve every source video: '+item.id);
    media.push({id:item.id,version:item.asset.version,video:item.asset.video,videoRevision:item.asset.videoRevision,sha256:digest});
  }
  const labels={source:prefix+'source-rgb',stage:prefix+'stage',live:prefix+'live',playback:prefix+'live-30',loops:prefix+'live-loops'};
  const spec={
    stage:[
      ['source-rgb',['src/hybrid/diagnose-preview-media.mjs','--root','.runtime/hybrid-assets/staged','--profile','rgb','--analyze',ids.join(','),'--out',directory+labels.source+'.json'],directory+labels.source+'.json'],
      ['queue',['src/hybrid/verify-preview-queue.mjs','--stage','--expected-concurrency','2','--label',labels.stage],directory+labels.stage+'.json'],
      ['candidate-validation',['src/hybrid/verify-candidates-current.mjs'],'lineage/current/candidate-validation.json'],
      ['candidate-sandbox',['src/hybrid/verify-candidate-sandbox.mjs'],'lineage/current/sandbox.json'],
      ['normal-hover',['src/hybrid/test-hover-intent.mjs','normal'],'lineage/current/no-preference.json']
    ],
    live:[
      ['queue',['src/hybrid/verify-preview-queue.mjs','--live','--expected-concurrency','2','--label',labels.live],directory+labels.live+'.json'],
      ['playback-30',['src/hybrid/verify-preview-playback.mjs','--source-report',labels.source,'--label',labels.playback],directory+labels.playback+'.json'],
      ['long-loops',['src/hybrid/verify-preview-playback.mjs','--source-report',labels.source,'--label',labels.loops,'--sample-ms','22000','--require-loops','3','--ids',loopIds.join(',')],directory+labels.loops+'.json'],
      ['candidate-validation',['src/hybrid/verify-candidates-current.mjs','--live'],'lineage/current/live-candidate-validation.json'],
      ['candidate-sandbox',['src/hybrid/verify-candidate-sandbox.mjs','--live'],'lineage/current/sandbox-live.json'],
      ['normal-hover',['src/hybrid/test-hover-intent.mjs','normal','--live'],'lineage/current/live-no-preference.json'],
      ['reduced-hover',['src/hybrid/test-hover-intent.mjs','reduced','--live'],'lineage/current/live-reduce.json'],
      ['consolidation',['src/hybrid/verify-current.mjs','--live'],'lineage/current/consolidation-check.json'],
      ['source-journeys',['src/hybrid/verify-candidate-journeys.mjs','--live'],null],
      ['gallery-journeys',['src/hybrid/verify-candidate-journeys.mjs','--gallery-sandbox','--live'],null],
      ['project-tests',['--test','--test-reporter=tap','tests/gallery.test.mjs'],null],
      ['sync-check',['scripts/sync-gallery.mjs','--check'],null]
    ]};
  const tasks={},reports={},runs=[['stage',stage,stageFile],['live',live,liveFile]];
  if(queueContinuationMode){
    if(pinnedFiles.get(liveFile)!=='b0a9a78431c4558524ba51f168a4c2420ffd6150f63a3213874780e770e9105f'||
       pinnedFiles.get('lineage/current/install-receipt.json')!=='219525b5ee3568fcc8d05bc31c3edd56a2c059e963001c49c9c6359b245beae4'||
       continuation.attempt!=='continue-unrun-six'||continuation.allTechnicalGatesPassed!==false||
       continuation.finalizationBlocked!==true||continuation.userTaskComplete!==false||
       continuation.priorExecution?.path!==liveFile||continuation.priorExecution.sha256!==pinnedFiles.get(liveFile)||
       continuation.priorExecution.status!=='failed'||continuation.priorExecution.promotedToGate!==false||
       !same(continuation.priorExecution.completedTasks,spec.live.slice(0,5).map(t=>t[0]))||
       continuation.priorExecution.failedTask!=='normal-hover'||continuation.releaseRunId!==receipt.runId||
       continuation.normalHoverFailure?.path!=='lineage/current/live-no-preference.json'||
       continuation.normalHoverFailure.sha256!=='c42474b5070a7d0ccb0a3af46a5c211fb2333309974b0a27441bfc80a36e15d6'||
       continuation.normalHoverFailure.passed!==192||continuation.normalHoverFailure.total!==193||
       continuation.normalHoverFailure.promotedToGate!==false||!same(continuation.stageExecution,live.stageExecution)||
       !same(continuation.publication,live.publication)||timestamp(continuation.startedAt,continuationFile)<timestamp(live.finishedAt,liveFile))
      throw Error('Scoped continuation does not preserve this exact failed execution and publication');
    runs.push(['continuation',continuation,continuationFile]);
  }
  for(const [phase,r,file]of runs){
    const continued=phase==='continuation',scope=phase==='stage'?'stage':'live';
    const expectedSpecs=continued?spec.live.slice(6):queueContinuationMode&&phase==='live'?spec.live.slice(0,6):spec[phase];
    const expectedStatus=queueContinuationMode&&phase==='live'?'failed':'completed';
    if(r.schema!==(continued?'motion-vault.queue-live-continuation.v1':'motion-vault.queue-validation-execution.v1')||
       r.phase!==scope||r.status!==expectedStatus||r.mainHtmlSha256!==formalHash||r.runnerSha256!==(continued?continuationRunnerHash:runnerHash)||
       !same(r.tasks?.map(t=>t.name),expectedSpecs.map(t=>t[0]))||r.priorState?.path!==priorFile||
       r.priorState.sha256!==pinnedFiles.get(priorFile))throw Error('Incomplete queue validation execution: '+file);
    const first=timestamp(r.startedAt,file),last=timestamp(r.finishedAt,file),published=timestamp(receipt.at,'publication');
    if(last<first||(phase==='stage'?last>published:first<published))throw Error('Queue stage/live publication chronology mismatch');
    if(phase==='stage')inWindow(prior.at,priorFile,r.startedAt,r.finishedAt);
    const main=phase==='stage'?'.runtime/hybrid-assets/staged/index.html':'web/index.html';
    if(r.pins?.[main]!==formalHash||r.pins['src/hybrid/gallery.js']!==sha(gallery)||
       !r.pins['scripts/isolated-browser.mjs']||!r.pins['src/hybrid/verify-preview-startup.mjs'])
      throw Error('Queue worker input pins are incomplete');
    for(const [name,hash]of Object.entries(r.pins))if(sha(await readPinned(name))!==hash)throw Error('Queue worker input changed: '+name);
    const recordedMedia=fullSet(continued?live.media:r.media,ids,file+' media');
    for(const item of media)if(!same(recordedMedia.get(item.id),{id:item.id,video:item.video,videoRevision:item.videoRevision,sha256:item.sha256}))
      throw Error('Worker media identity changed: '+item.id);
    let previous=r.startedAt;
    for(const [index,t]of r.tasks.entries()){
      const [name,argv,reportFile]=expectedSpecs[index],script=argv.find(x=>x.endsWith('.mjs'));
      const retained=queueContinuationMode&&phase==='live'&&name==='normal-hover';
      if(t.name!==name||!same(t.args,argv)||t.script!==script||t.scriptSha256!==sha(await readPinned(script))||
         t.status!==(retained?'failed':'passed')||t.exitCode!==(retained?1:0)||t.signal!==null||t.error!==null||t.sourceUnchanged!==true||
         typeof t.stdout!=='string'||typeof t.stderr!=='string')throw Error('Invalid completed task: '+phase+' '+name);
      inWindow(t.startedAt,file,previous,r.finishedAt);inWindow(t.finishedAt,file,t.startedAt,r.finishedAt);previous=t.finishedAt;
      if(reportFile){const report=await readJSON(reportFile);if(t.report?.path!==reportFile||t.report.sha256!==pinnedFiles.get(reportFile))
          throw Error('Task report byte identity mismatch: '+reportFile);
        const at=report.at||report.generatedAt;inWindow(at,reportFile,t.startedAt,t.finishedAt);
        if(name==='source-rgb'){if(report.mainHtmlSha256!==formalHash)throw Error('Wrong source RGB page');}
        else{requireCurrentHashes(report,reportFile);if(retained)retainedNormalFailure(report,reportFile);else passedCount(report,reportFile);
          if(t.report.runId!==report.runId||report.live!==undefined&&report.live!==(scope==='live')||report.reports?.some(row=>row.live!==undefined&&row.live!==(scope==='live')))
            throw Error('Task report run or stage/live scope differs: '+reportFile);
          const rows=report.checks||report.reports;if(!Array.isArray(rows)||rows.length!==report.total||!retained&&rows.some(x=>(x.pass??x.passed)!==true))
            throw Error('Failed or missing task checks: '+reportFile);
        }
        reports[scope+':'+name]={record:report,file:reportFile};
      }
      tasks[scope+':'+name]=t;
    }
  }
  if(live.stageExecution?.path!==stageFile||live.stageExecution.sha256!==pinnedFiles.get(stageFile)||
     live.publication?.path!=='lineage/current/install-receipt.json'||live.publication.sha256!==pinnedFiles.get('lineage/current/install-receipt.json')||
     live.publication.at!==receipt.at||live.publication.runId!==receipt.runId)throw Error('Live evidence did not follow this exact stage and publication');
  const requiredQueueNames=['Water product response remains held during visible reading','Reaction preparation starts while Water still occupies a slot',
    'Real hover produces a frame below 800ms','Hover adds no target product HTTP request','Water remains incomplete and uncanceled through actual hover',
    'Actual Blob bytes match canonical HTTP and disk','Leaving releases the active video and layer','No hidden or simultaneous video player',
    'Prepared Blob retention stays within 9 entries and 24MiB','Observed preparation concurrency matches the explicit contract',
    'Exactly one fixed Water response was continuously held','Actual page matches the measured main file'];
  const queueProofs=[];
  for(const phase of ['stage','live']){
    const {record:r,file}=reports[phase+':queue'],t=tasks[phase+':queue'];measuredRun(r,file,'startedAt',phase==='live');measuredChecks(r,file,'pass');
    inWindow(r.startedAt,file,t.startedAt,t.finishedAt);
    if(r.schema!=='motion-vault.preview-queue.v1'||r.label!==labels[phase]||r.verifierSha256!==t.scriptSha256||
       r.probeSha256!==sha(await readPinned('src/hybrid/verify-preview-startup.mjs'))||r.catalogueHash!==pinnedFiles.get('web/candidate-catalog.json')||
       r.browserCompleted!==true||r.browserClosed!==true||r.allPassed!==true||r.errors?.length!==0||
       !same(r.limits,{entries:9,bytes:25165824,singleBytes:4194304,concurrent:2})||
       r.contract?.expectedConcurrency!==2||r.contract.targetId!=='curated-reaction-diffusion'||r.contract.blockedId!=='curated-stylized-water'||
       r.contract.faultReleaseTimer!==false||r.contract.fixedVisibleReadingMs!==1500||r.contract.firstFrameLimitMs!==800||
       r.contract.readyWait!==false||r.contract.cacheDisabled!==false||r.contract.hiddenPlayersAllowed!==0||r.contract.liveFPSClaimed!==false||
       requiredQueueNames.some(name=>r.checks.filter(c=>c.name===name&&c.pass===true).length!==1))
      throw Error('The sustained neighboring-response queue contract is incomplete: '+file);
    const target=media.find(x=>x.id===r.contract.targetId),sample=r.sample;
    const assets=fullSet(r.assets,[r.contract.targetId,r.contract.blockedId],file+' assets');
    for(const [id,a]of assets){const m=media.find(x=>x.id===id);if(a.sha256!==m.sha256||a.video!==m.video||a.revision!==m.videoRevision)throw Error('Wrong queue media');}
    if(sample?.fixedReadingMs!==1500||!Number.isFinite(sample.actualReadingMs)||sample.actualReadingMs<1500||sample.frame?.trusted!==true||!(sample.frame.firstFrameMs>=0&&sample.frame.firstFrameMs<800)||!(sample.frame.frames>0)||
       sample.identity?.exists!==true||sample.identity.protocol!=='blob:'||sample.identity.sameVideo!==true||
       sample.identity.playback?.sha256!==target.sha256||sample.identity.canonical?.sha256!==target.sha256||
       r.faults.filter(f=>f.decision==='held').length!==1||r.faults.find(f=>f.decision==='held').releaseReason!=='scenario-cleanup')
      throw Error('Actual target playback or sustained fault identity is missing');
    queueProofs.push({...identity(r,file),live:r.live,verifierSha256:r.verifierSha256,probeSha256:r.probeSha256,contract:r.contract,limits:r.limits,sample:r.sample});
  }
  const beforeFile=directory+'startup-queue-live-before.json',before=await readJSON(beforeFile);
  if(pinnedFiles.get(beforeFile)!=='277136696f5ea9cdcce5f9c41292065584b83233bc6425a4d305e583f493f425'||
     before.formalHash!==oldReceipt.formalSha256||before.contract?.expectedConcurrency!==1||before.passed!==14||before.total!==17||
     before.sourceUnchanged!==true)throw Error('Original single-slot queue failure must remain unchanged');
  measuredChecks(before,beforeFile,'pass',false);
  const sourceRGB=await readSourceRGB(reports['live:playback-30'].record,directory+labels.source+'.json'),playback=[];
  for(const name of ['playback-30','long-loops']){
    const {record:r,file}=reports['live:'+name],t=tasks['live:'+name],selected=name==='long-loops'?loopIds:ids;
    measuredRun(r,file,'startedAt');measuredChecks(r,file,'pass');inWindow(r.startedAt,file,t.startedAt,t.finishedAt);
    if(r.label!==(name==='long-loops'?labels.loops:labels.playback)||r.verifierHash!==t.scriptSha256||r.diagnosticOnly!==false||r.control!==null||!Array.isArray(r.playbackControlMappings)||r.playbackControlMappings.length||
       r.errors?.length!==0||r.sampleMs!==(name==='long-loops'?22000:2400)||r.requiredLoops!==(name==='long-loops'?3:0)||
       r.environment?.gpuDisabledByHarness!==false||r.environment.page?.url!=='http://127.0.0.1:4380/app/assets/motion-vault.html?view=pending')
      throw Error('Formal default-browser playback evidence is required');
    requireSeparatedEnvironment(r,file,sourceRGB);
    const samples=fullSet(r.samples,selected,file+' samples'),assets=fullSet(r.assets,selected,file+' assets');
    for(const id of selected){const sample=samples.get(id),item=media.find(x=>x.id===id),url='http://127.0.0.1:4380/app/assets/'+item.video+'?v='+item.videoRevision;
      requireSeparatedSample(sample,file,sourceRGB);sampleMetrics(sample,file);
      if(assets.get(id).sha256!==item.sha256||assets.get(id).video!==item.video||assets.get(id).videoRevision!==item.videoRevision||sample.canonicalMediaURL!==url||sample.playbackMediaSha256!==item.sha256||
         sample.servedMediaSha256!==item.sha256||sample.version!==item.version||sample.video!==item.video||
         !(sample.url===url||new URL(sample.url).protocol==='blob:'&&new URL(sample.url).origin==='http://127.0.0.1:4380')||
         name==='long-loops'&&sample.loops<3)throw Error('Playback media identity or loop coverage differs: '+id);
      for(const frame of [sample.actualPixelChange.first,sample.actualPixelChange.second])
        for(const state of [frame.beforeGuard,frame.afterGuard,frame.readiness?.before,frame.readiness?.after])
          if(!state||state.sameCanonicalSource!==true||state.canonicalMediaURL!==url)throw Error('Actual pixels lost canonical media identity');
    }
    playback.push({...identity(r,file),summary:playbackSummary(r.samples),samples:r.samples.map(x=>({id:x.id,metrics:sampleMetrics(x,file),playbackMediaSha256:x.playbackMediaSha256,servedMediaSha256:x.servedMediaSha256,canonicalMediaURL:x.canonicalMediaURL,actualPixelChange:x.actualPixelChange}))});
  }
  const journeys=[];
  for(const name of ['source-journeys','gallery-journeys']){
    const t=tasks['live:'+name],output=JSON.parse(t.stdout.trim().split(/\r?\n/).at(-1)),file=output.report,r=await readJSON(file);
    measuredRun(r,file,'runStartedAt');measuredChecks(r,file,'passed');requireCurrentHashes(r,file);
    inWindow(r.runStartedAt,file,t.startedAt,t.finishedAt);inWindow(r.at,file,t.startedAt,t.finishedAt);
    const gallery=name==='gallery-journeys',wanted=gallery?['curated-webgpu-route']:['curated-webgpu-route','curated-persistent-gallery'];
    const canonical=directory+(gallery?'journeys-gallery-sandbox-live.json':'journeys-live.json');
    if(file!==canonical.replace(/\.json$/,'-'+r.runId+'.json')||sha(await readPinned(canonical))!==pinnedFiles.get(file)||
       output.formalHash!==formalHash||output.allPassed!==true||output.runId!==r.runId||output.browserClosed!==true||r.browserCompleted!==true||r.verifierSha256!==t.scriptSha256||
       r.gallerySandbox!==gallery||r.sandboxFixture!==false||r.allPassed!==true||r.brokerSha256!==sha(await readPinned('src/hybrid/source-broker.js')))
      throw Error('Journey execution mismatch');
    const rows=fullSet(r.reports,wanted,file+' reports');
    for(const id of wanted)if(rows.get(id).passed!==true||!rows.get(id).actions.some(a=>a.action==='real_pointer_click'&&a.proof?.events?.some(e=>e.type==='click'&&e.isTrusted&&e.match)))
      throw Error('Trusted journey controls were not exercised');
    const names=['index.html',...wanted.flatMap(id=>['asset.json','run/index.html','run/effect.js'].map(f=>'motion-vault-assets/'+id+'/'+f))];
    if(!same(Object.keys(r.assetHashes||{}).sort(),names.sort()))throw Error('Journey implementation set changed');
    for(const f of names)if(r.assetHashes[f]!==sha(await readPinned(withinWeb(f))))throw Error('Journey source changed: '+f);
    journeys.push(identity(r,file));
  }
  const publicationFiles=await readJSON('lineage/current/publication-file-check.json');
  if(publicationFiles.planned?.length!==4||publicationFiles.planned.some(f=>!f.path.endsWith('.html')||f.hash!==formalHash)||publicationFiles.files?.some(f=>f.actual!==f.expected)||
     !publicationFiles.planned?.some(f=>f.path.replaceAll('\\','/')==='web/index.html'&&f.hash===formalHash)||
     !publicationFiles.files?.some(f=>f.path==='web/index.html'&&f.expected===formalHash&&f.actual===formalHash))
    throw Error('The original primary page was not actually republished');
  inWindow(publicationFiles.at,'publication file check',stage.finishedAt,receipt.at);
  const formal36Supplement=queueContinuationMode?await verifyFormal36Supplement({publication:receipt,live,continuation,normal:reports['live:normal-hover'].record}):null;
  return {nodeOutput:tasks['live:project-tests'].stdout,syncOutput:tasks['live:sync-check'].stdout,proof:{
    publication:{file:'lineage/current/install-receipt.json',sha256:pinnedFiles.get('lineage/current/install-receipt.json'),runId:receipt.runId,at:receipt.at,formalHash,previousFormalHash:oldReceipt.formalSha256,changedFiles:receipt.changedFiles},
    priorState:identity(prior,priorFile),before:{...identity(before,beforeFile),historical:true,promotedToGate:false,failedChecks:before.checks.filter(c=>!c.pass)},
    execution:{stage:{...identity(stage,stageFile),runnerSha256:stage.runnerSha256,status:stage.status},live:{...identity(live,liveFile),runnerSha256:live.runnerSha256,status:live.status},
      ...(queueContinuationMode?{continuation:{...identity(continuation,continuationFile),runnerSha256:continuation.runnerSha256,status:continuation.status}}:{})},
    projectTestExecution:{file:queueContinuationMode?continuationFile:liveFile,at:tasks['live:project-tests'].finishedAt},
    ...(queueContinuationMode?{validationBasis:'composite-scoped-evidence',originalReportsAllPassed:false,
      retainedNormalFailure:{...identity(reports['live:normal-hover'].record,reports['live:normal-hover'].file),...retainedNormalFailure(reports['live:normal-hover'].record,reports['live:normal-hover'].file)},
      formal36Supplement,coverageStatement:'The retained normal report remains failed 192/193. Its 192 passed checks are reused; only formal ID 36 receives separate fixed full-cycle coverage. The six unrun tasks are separately completed. The old zero-difference cause is not established by its recorded screenshot comparisons.'}:{}),
    queueStage:queueProofs[0],queueLive:queueProofs[1],playback30:playback[0],fourTargetLoops:playback[1],sourceMedia:sourceRGB.identity,journeys,unchangedMedia:media,
    previousWarnings:{file:priorFile,sha256:pinnedFiles.get(priorFile),status:previous.status,warnings:previous.warnings,historicalEvidence:previous.historicalEvidence,normalLive:previous.normalLive},
    newlyPublished:true,productChanged:true,mediaChanged:false,changedVideos:0,
    contractResolved:'A single continuously held neighboring media response no longer prevents the visible target from preparing and producing its actual frame within the existing 800 ms limit.',
    limitations:'This is the declared two-slot queue contract, not a promise that all cold hovers or all devices start within 800 ms. Earlier one-second fault-fixture failures and controller timing limits remain historical failures; they were not converted to passes. The original nine sustained-drop failures remain unexplained. Performance, offline RGB and after-window actual pixels remain separate.'
  }};
}

const queueRun=queueMode?await verifyPreviewQueue():null;
const previewQueue=queueRun?.proof||null;
const startupRun=startupMode?await verifyPreviewStartup():null;
const previewStartup=startupRun?.proof||null;
const validationRun=queueRun||startupRun;
const validationProof=previewQueue||previewStartup;
const previewPlayback=previewMode?await verifyPreviewPlayback():null;

const cleanupFile='single-page/cleanup-result.json';
const clean=await readJSON('lineage/current/'+cleanupFile);
if(!previewMode&&!startupMode&&!queueMode)requireCurrentHashes(clean,cleanupFile);
if(clean.apply!==true||!Array.isArray(clean.removed)||!Array.isArray(clean.skipped)||clean.skipped.length)
  throw new Error('Single-gallery cleanup record is incomplete');
if(clean.removed.some(item=>!item.path||!isHash(item.sha256)||!Number.isInteger(item.bytes)||item.bytes<0))
  throw new Error('Cleanup records must identify the removed files and their hashes');
if(previewMode||startupMode||queueMode){
  const baseline=queueMode?previewQueue.before:startupMode?previewStartup.baseline:previewPlayback.before;
  if(timestamp(clean.at,cleanupFile)>timestamp(baseline.at,baseline.file))
    throw new Error('Historical cleanup must predate the playback repair baseline');
  if(!isHash(clean.formalHash)||!isHash(clean.redirectSha256)||clean.removed.length!==8||
     new Set(clean.removed.map(item=>item.path)).size!==8||
     clean.removed.some(item=>typeof item.reason!=='string'||!item.reason)||
     !Array.isArray(clean.targets)||clean.targets.length!==8||
     new Set(clean.targets.map(item=>item.path)).size!==8||
     clean.targets.some(target=>!clean.removed.some(item=>item.path===target.path&&
       item.sha256===target.sha256&&item.bytes===target.bytes&&item.reason===target.reason)))
    throw new Error('The historical single-page cleanup must retain its eight original file records');
}
const cleanup={
  file:cleanupFile,sha256:pinnedFiles.get('lineage/current/'+cleanupFile),
  at:clean.at,historical:previewMode||startupMode||queueMode,
  formalHash:clean.formalHash,redirectSha256:clean.redirectSha256,
  removedFiles:clean.removed.length,
  removedBytes:clean.removed.reduce((sum,item)=>sum+item.bytes,0)
};

const nodeOutput=(startupMode||queueMode)?validationRun.nodeOutput:execFileSync(process.execPath,
  ['--test','--test-reporter=tap','tests/gallery.test.mjs'],
  {cwd:project,encoding:'utf8',windowsHide:true,stdio:'pipe',timeout:90000,maxBuffer:4*1024*1024});
if(!startupMode&&!queueMode)await put(evidence,'project-tests.txt',nodeOutput);
function tapCount(label){
  const match=nodeOutput.match(new RegExp('(?:^|\\n)# '+label+' (\\d+)(?:\\r?\\n|$)'));
  if(!match)throw new Error('Missing TAP total: '+label);
  return Number(match[1]);
}
const nodeTests={passed:tapCount('pass'),total:tapCount('tests'),failed:tapCount('fail'),log:'project-tests.txt'};
if(nodeTests.total<1||nodeTests.failed!==0||nodeTests.passed!==nodeTests.total)
  throw new Error('Current project contract tests did not all pass');
if(startupMode||queueMode){
  const required=[
  "Formal IDs and explicit deletions are preserved",
  "All formal sources, runnable entries and previews remain intact",
  "Thirty fully local review candidates do not become approved formal assets",
  "Classification is purpose, concrete task, placement and design goal",
  "Agent receives actual readable source instead of oversized dependency bundles",
  "Rejected or unknown references are never silently restored",
  "Private curator notes stay outside production outputs",
  "Source demos keep their isolation in the unified page; hover loads only local previews",
  "Published pages correspond to the currently validated staged artifacts",
  "Public inventory contains no font files, private folders or obsolete builds",
  "Capture, import retry, hide/restore and permanent entry identities remain",
  "Same-code previews retain clear original-versus-independent provenance",
  "Recaptured candidate media changes its browser cache identity independently of source code",
  "A single page serves library, pending review and hidden states"
];
  if(queueMode)required.push(...[
  "Preview media cache: timeout backs off and direct lease prevents duplicate fetch",
  "Preview media cache: a new generation does not inherit an aborted fetch",
  "Preview media cache: a true miss returns HTTP without starting a new prefetch",
  "Preview media cache: clear preserves live Blob leases and reclaims them on release",
  "Preview media cache: a stalled body does not block a second visible item",
  "Preview media cache: pending jobs reserve entry and byte budgets"
]);
  const passedNames=nodeOutput.split(/\r?\n/).filter(line=>/^ok \d+ - /.test(line))
    .map(line=>line.replace(/^ok \d+ - /,''));
  if(tapCount('skipped')!==0||tapCount('cancelled')!==0||tapCount('todo')!==0||
     nodeTests.total<required.length||required.some(name=>!passedNames.includes(name)))
    throw new Error('Original project contracts must remain present, passing and unskipped');
  Object.assign(nodeTests,{at:validationProof.projectTestExecution?.at||validationProof.execution.live.at,
    execution:validationProof.projectTestExecution?.file||validationProof.execution.live.file,sourceSha256:pinnedFiles.get('tests/gallery.test.mjs'),
    skipped:0,cancelled:0,todo:0});
}

const sync=JSON.parse((startupMode||queueMode)?validationRun.syncOutput:execFileSync(process.execPath,['scripts/sync-gallery.mjs','--check'],
  {cwd:project,encoding:'utf8',windowsHide:true,stdio:'pipe',timeout:120000,maxBuffer:4*1024*1024}));
if(!sync.verified)throw new Error('Actual HTTP/mirror verification failed');
requireCurrentHashes(sync,'sync-gallery.mjs --check');
if((startupMode||queueMode)&&(sync.checkOnly!==true||sync.applicationCount!==1||sync.canonicalEntry!=='motion-vault.html'||
   sync.legacyCandidateRedirect!==true||sync.publicCatalogueSha256!==pinnedFiles.get('web/catalog.json')||
   !Number.isInteger(sync.assetFiles)||sync.assetFiles<1||!Number.isInteger(sync.copyChecks)||sync.copyChecks<1||
   !Array.isArray(sync.http)||sync.http.length!==sync.httpChecks||sync.http.some(row=>row.status!==200||!isHash(row.sha256))||
   !sync.http.some(row=>row.path==='motion-vault.html'&&row.sha256===formalHash)||
   !sync.http.some(row=>row.path==='motion-vault-candidate-catalog.json'&&row.sha256===pinnedFiles.get('web/candidate-catalog.json'))))
  throw new Error('Fresh read-only synchronization must cover the original HTTP entry and current catalogue');
if(!startupMode&&!queueMode)await put(evidence,'final-sync.json',JSON.stringify(sync,null,2));


const primary=Object.fromEntries(candidates.taxonomy.map(scene=>[scene.id,{label:scene.label,count:0}]));
for(const item of candidates.items){
  const scene=primary[item.uses[0].scene];
  if(!scene)throw new Error('Unknown candidate primary use');
  scene.count++;
}
const table=Object.values(primary).map(group=>'| '+group.label+' | '+group.count+' |').join('\n');
const proofTable=proofs.map(proof=>'| '+proof.file+' | '+proof.passed+' / '+proof.total+' |').join('\n');
const at=new Date().toISOString();
const totalChecks=proofs.reduce((sum,proof)=>sum+proof.total,0);
const mainURL='http://127.0.0.1:4380/app/assets/motion-vault.html';

const singlePageResult=[
  '# Motion Vault 当前交付结果',
  '',
  '核实时间：'+at+'。本次单页精简已经发布，并以当前主页面、旧地址兼容跳转的实际哈希完成本机复验。技术交付、用户审美接受与具体任务选定分别记录。',
  '',
  '## 唯一入口',
  '',
  mainURL,
  '',
  '只维护一个完整画廊，共用搜索、用途分类、卡片和详情；在同页切换“已收录”“新增待审”“已下架”。默认已收录包含原正式内容和用户主动收录的候选。旧 motion-vault-candidates.html 仅转到同页 ?view=pending，不再是一套界面，也不要求使用补丁号。',
  '',
  '用户主动点击“收录”且保存成功后，新增条目才进入个人默认库。旧“未下架”状态不自动视为批准；下架内容统一查看，恢复后沿用原收录状态。收藏、下架、私人备注使用原存储键，收录扩展原审查记录中的 accepted 数组；个人状态不自动改写项目公共目录。',
  '',
  '## 内容保留',
  '',
  '原正式目录保留'+counts.formal+'项，新增目录保留'+counts.candidates+'项，其中'+counts.ready+'项具备本地实现与预览。新增来源为'+counts.authorSource+'项作者源码适配、'+counts.independent+'项独立实现。这是两份中性数据输入，不是两个页面，也没有把候选自动宣称为用户已经认可。',
  '',
  '有效动效、本地源码、设计拆解、参数、来源差异、封面和同版本短片继续保留。新增卡片悬停播放本地短片，深入查看时按需运行隔离的本地场景。正式原有交互继续支持悬停演示与真实输入接管；移开或切换状态释放活动预览。',
  '',
  '本地 Agent 按场景和任务查询，再 inspect 读取设计、源码及运行入口。候选来源仍使用 --scope candidates；原始审查文字不进入生产目录、检索或参考导出。',
  '',
  '## 本轮界面清理',
  '',
  '实际删除'+cleanup.removedFiles+'个已退役界面或维护文件，共'+cleanup.removedBytes+'字节；逐文件路径、哈希和原因见 '+cleanupFile+'。这些数量只来自本次单页清理，不包含之前的临时录制、浏览器配置或旧版本清理统计。',
  '',
  '构建由 scripts/build-hybrid.mjs build 统一生成正式资产、候选数据和一个画廊；候选快捷构建重组同一主页面。旧重复界面不再参与构建或发布。已有 versions/.recovery.zip 不参与当前运行。',
  '',
  '## 新增条目的主要用途',
  '',
  '| 一级场景 | 数量 |',
  '|---|---:|',
  table,
  '',
  '详细设计任务、位置、目标与限制见 references/CURRENT-CANDIDATES.md。界面数量还受用户收录、下架和搜索状态影响。',
  '',
  '## 本次实际验证',
  '',
  '| 当前报告 | 通过 |',
  '|---|---:|',
  proofTable,
  '| project-tests.txt | '+nodeTests.passed+' / '+nodeTests.total+' |',
  '',
  '五份实际页面报告合计'+totalChecks+'项检查，均同时绑定主页面与兼容跳转的哈希；项目合同测试计数来自本次 TAP 输出，未沿用旧两页总数。最后同步核对'+sync.assetFiles+'个当前资产文件、'+sync.copyChecks+'个副本比较与'+sync.httpChecks+'条实际 HTTP 资源，详见 final-sync.json。',
  '',
  '检查覆盖同页筛选与旧地址跳转、主动收录和下架/恢复、旧存储与保存失败、悬停实际画面变化、真实输入接管、切换后清理、资料读取和本地沙箱隔离。验收在项目临时浏览器中执行，不重置用户自己的收藏、下架和备注，也不修改系统设置或 Hub 业务数据。',
  '',
  '## 验收边界',
  '',
  '单页实施完成不代表用户已经批准全部新增内容，也不替代具体生产任务选定、所有设备性能、原作一比一视觉或素材使用权的验收。项目仍处于 active 状态；上方受管项目控制块及其用户接受状态未改写。',
  '',
  '主页面 SHA-256：'+formalHash,
  '',
  '旧地址兼容跳转 SHA-256：'+redirectSha256,
  ''
].join('\n');

function display(value){return value===null?'未测得':String(value);}
function metricPair(item,key){
  return display(item.before.metrics[key])+' → '+display(item.after.metrics[key]);
}
const previewTable=previewPlayback?.comparisons.map(item=>'| '+item.id+' | '+
  metricPair(item,'contentFps')+' | '+metricPair(item,'presentedFps')+' | '+
  metricPair(item,'firstFrameMs')+' | '+metricPair(item,'framesDropped')+' | '+
  (item.videoChanged?'已更新':'相同字节')+' |').join('\n');
const playbackWarningCount=previewPlayback?.warnings.length||0;
const playbackOutcome=previewMode?'本轮播放改善与真实交互修复已发布；本次播放采样通过 '+
  previewPlayback.after.passed+' / '+previewPlayback.after.total+'，'+
  (playbackWarningCount?'仍有 '+playbackWarningCount+' 项掉帧检查失败，尚未稳定达到 60 fps；状态为 published_with_warnings。':'本次未记录剩余掉帧警告。'):null;
const playbackWarningSection=playbackWarningCount?[
  '### 尚存播放警告',
  '',
  '以下 '+playbackWarningCount+' 项保留原始失败结果；掉帧要求仍为 < 5%，没有调大阈值或将失败改成通过。当前发布包含已验证改善，不能据此声称全部视频性能问题已经解决。',
  '',
  '| 条目 | 掉帧率 | 呈现 fps | 帧间隔 P95 / 最大 ms | 尾段 ms | 窗口内容 fps |',
  '|---|---:|---:|---:|---:|---:|',
  ...previewPlayback.warnings.map(w=>'| '+w.id+' | '+display(+(w.dropRatio*100).toFixed(2))+'% | '+
    display(w.presentedFps)+' | '+display(w.frameIntervalP95)+' / '+display(w.frameIntervalMax)+' | '+
    display(w.frameTailMs)+' | '+display(w.windowContentFps)+' |'),
  '',
  '这些警告仅涵盖纯掉帧超限：呈现速率至少 45 fps，最大帧回调间隔与尾段均小于 100 ms，采样窗口没有 long task；原检查的额外播放延迟、单实例和就绪状态条件仍须通过。其他失败继续阻断收尾。'
].join('\n'):'';
const playbackResult=previewMode?[
  '# Motion Vault 当前播放修复结果',
  '',
  '核实时间：'+at+'。'+playbackOutcome+' 当前主页面、兼容跳转、30 项预览视频及被测交互源码均与实际验证证据对应。',
  '',
  '## 当前入口与内容',
  '',
  mainURL,
  '',
  '继续使用一个完整画廊，在同页切换“已收录”“新增待审”“已下架”，共用搜索、分类、卡片和详情。旧 motion-vault-candidates.html 仍转到同页 ?view=pending。',
  '',
  '原正式目录'+counts.formal+'项，新增目录'+counts.candidates+'项；新增均有本地实现与预览，来源为'+counts.authorSource+'项作者源码适配与'+counts.independent+'项独立实现。用户主动收录后才进入个人默认库；accepted、收藏、下架和私人备注继续使用原审查或存储记录。',
  '',
  '## 实际播放前后对照',
  '',
  '基线 '+previewPlayback.before.file+' 在 '+previewPlayback.before.at+' 通过 '+
    previewPlayback.before.passed+' / '+previewPlayback.before.total+'，其中 '+
    (previewPlayback.before.total-previewPlayback.before.passed)+' 项失败。修复后 '+
    previewPlayback.after.file+' 在 '+previewPlayback.after.at+' 通过 '+
    previewPlayback.after.passed+' / '+previewPlayback.after.total+'；两次均包含完整 '+counts.candidates+' 项实际卡片采样。',
  '',
  playbackWarningSection,
  '',
  '“内容 fps”来自浏览器像素探针观察到的画面变化；“呈现 fps”来自视频帧呈现计数。两者均为实际测量，不能由视频容器标称帧率代替。含静止段的短片可能出现较低的内容 fps，连续动作与操作结果还需结合逐项检查判断。',
  '',
  '前后请求采样窗口分别为 '+previewPlayback.before.sampleMs+' ms 与 '+previewPlayback.after.sampleMs+
    ' ms；'+(previewPlayback.sameRequestedSampleMs?'采样窗口一致。':'窗口不同，汇总值受采样区间影响。'),
  '',
  '| 指标 | 修复前 | 修复后 |',
  '|---|---:|---:|',
  '| 30 项内容 fps 中位数 | '+display(previewPlayback.before.summary.contentFps.median)+' | '+display(previewPlayback.after.summary.contentFps.median)+' |',
  '| 30 项呈现 fps 中位数 | '+display(previewPlayback.before.summary.presentedFps.median)+' | '+display(previewPlayback.after.summary.presentedFps.median)+' |',
  '| 首帧 P95（ms） | '+display(previewPlayback.before.summary.firstFrameMs.p95)+' | '+display(previewPlayback.after.summary.firstFrameMs.p95)+' |',
  '| 超出编码间隔的最大播放延迟（ms） | '+display(previewPlayback.before.summary.frameDelayExcessMax.max)+' | '+display(previewPlayback.after.summary.frameDelayExcessMax.max)+' |',
  '| 解码帧数 | '+previewPlayback.before.summary.framesDecoded+' | '+previewPlayback.after.summary.framesDecoded+' |',
  '| 掉帧数 | '+previewPlayback.before.summary.framesDropped+' | '+previewPlayback.after.summary.framesDropped+' |',
  '',
  '修复后另记录实际墙钟帧间隔超出编码媒体时间间隔的延迟，用于区分原生可变帧率短片的静止段与播放停顿。基线没有该新增指标，保留为未测得；原始帧间隔、额外延迟、重复比例与最长视觉静止段均可回溯。',
  '',
  '逐项数值以“修复前 → 修复后”表示。实际更新 '+previewPlayback.changedVideos+
    ' 份视频；每项前后路径、版本、视频 SHA-256、实际 URL、当前媒体缓存版本及完整测量指标保存在 completion.json 的 previewPlayback.comparisons。',
  '',
  '| 条目 | 内容 fps | 呈现 fps | 首帧 ms | 掉帧数 | 视频字节 |',
  '|---|---:|---:|---:|---:|---|',
  previewTable,
  '',
  'after 报告逐项核对当前视频二进制 SHA-256；实际播放 URL 的 v 参数必须等于该视频 hash 前 16 位与公共目录中的 videoRevision。基线保留旧页面和旧视频身份，不改写成当前版本。',
  '',
  '## 真实交互结果',
  '',
  previewPlayback.journeys.file+' 在 '+previewPlayback.journeys.at+' 通过 '+
    previewPlayback.journeys.passed+' / '+previewPlayback.journeys.total+'；完整覆盖 '+
    previewPlayback.journeys.cases.map(item=>item.id).join('、')+'。每个旅程均包含命中目标的可信真实指针点击，报告保留状态变化、截图及实际操作证据。',
  '',
  '交互报告绑定当前主页面、兼容跳转，以及每个被测条目的 asset.json、run/index.html、run/effect.js 等实际字节。各旅程实际经过的状态与操作见原报告；不以入口加载成功代替完整操作结果。',
  '',
  '## 本轮完整验证',
  '',
  '| 当前报告 | 通过 |',
  '|---|---:|',
  '| '+previewPlayback.after.file+' | '+previewPlayback.after.passed+' / '+previewPlayback.after.total+' |',
  '| '+previewPlayback.journeys.file+' | '+previewPlayback.journeys.passed+' / '+previewPlayback.journeys.total+' |',
  proofTable,
  '| project-tests.txt | '+nodeTests.passed+' / '+nodeTests.total+' |',
  '',
  '原五份实际页面报告本轮重新核对，共 '+totalChecks+' 项；新增播放与交互证据共 '+
    (previewPlayback.after.total+previewPlayback.journeys.total)+' 项。所有当前页面报告同时绑定主页面与兼容跳转哈希，项目测试计数来自本次 TAP 输出。',
  '',
  '最终同步核对 '+sync.assetFiles+' 个当前资产文件、'+sync.copyChecks+' 个副本比较与 '+
    sync.httpChecks+' 条实际 HTTP 资源，见 final-sync.json。completion.json 保存播放和交互证据的时间、运行身份、文件哈希与前后媒体映射。',
  '',
  '## 历史单页清理',
  '',
  cleanupFile+' 记录的是 '+cleanup.at+' 完成的上轮清理：'+cleanup.removedFiles+
    ' 个退役文件、'+cleanup.removedBytes+' 字节。本轮只读验证该记录的完整性，completion.json 标记 cleanup.historical=true，保留其当时主页面与跳转哈希。',
  '',
  '## 验收边界',
  '',
  '以上结论覆盖本机、当前发布字节和报告记载的采样与真实操作。'+(playbackWarningCount?'当前是带警告发布，不能声称全部性能检查通过。':'')+'本轮证据不替代用户对新增内容的审美认可或具体生产任务选定。受管项目控制块及其用户接受状态、用户浏览器私有记录、Hub 业务数据均未由本轮收尾改写。',
  '',
  '主页面 SHA-256：'+formalHash,
  '',
  '旧地址兼容跳转 SHA-256：'+redirectSha256,
  '',
  '基线报告 SHA-256：'+previewPlayback.before.sha256,
  '',
  '修复后报告 SHA-256：'+previewPlayback.after.sha256,
  '',
  '真实交互报告 SHA-256：'+previewPlayback.journeys.sha256,
  ''
].join('\n'):null;
const revalidation=previewPlayback?.revalidation;
const revalidationBody=revalidateMode?[
  '核实时间：'+at+'。本轮完整 '+counts.candidates+' 项复验 '+previewPlayback.after.passed+' / '+
    previewPlayback.after.total+'，四项目标长循环 '+revalidation.loops.passed+' / '+revalidation.loops.total+
    '。本轮只修验收工具，没有修改产品页面、重录或替换视频，也没有再次发布。',
  '',
  '唯一完整画廊：'+mainURL+'，继续在同页切换“已收录”“新增待审”“已下架”。保留 '+counts.formal+' 项正式内容与 '+
    counts.candidates+' 项候选；用户主动收录才进入个人默认库。上方受管元数据、用户接受状态和私人审查记录未改写。',
  '',
  '前一轮已完成 30 项真实预览重录及发布。本轮只修正验收工具并分离三类证据：现场播放窗口不读取像素；同 SHA 源视频离线解码全部 96×58 RGB 帧并核对原始 PTS；窗口结束后另检查同一实际播放视频的两次画面变化。原现场播放门槛不变，源内容连续性门槛保留且明确用于离线源媒体。四个目标在工具修改前的六项采样中也已通过，不能把当前帧率归因于清理 records 强引用，或宣称由此修好了用户页面的新 bug。',
  '',
  '| 当前报告 | 实际测量时间 | 通过 | 请求窗口 / 循环要求 |',
  '|---|---|---:|---|',
  '| '+previewPlayback.after.file+' | '+previewPlayback.after.at+' | '+previewPlayback.after.passed+' / '+
    previewPlayback.after.total+' | '+previewPlayback.after.sampleMs+' ms / 完整 30 项 |',
  '| '+revalidation.loops.file+' | '+revalidation.loops.at+' | '+revalidation.loops.passed+' / '+
    revalidation.loops.total+' | '+revalidation.loops.sampleMs+' ms / 每项至少 '+revalidation.loops.requiredLoops+' 次循环 |',
  '',
  '| 目标 | 工具修改前呈现 fps | 最终完整采样 fps | 最终长循环 fps / 含尾段 fps | 长循环掉帧率 | 实际循环 | 源 RGB 变化/s（离线） | 窗口后实际画面变化 |',
  '|---|---:|---:|---:|---:|---:|---:|---|',
  ...revalidation.loops.samples.map(sample=>{
    const initial=revalidation.baseline.samples.find(item=>item.id===sample.id);
    const final=previewPlayback.comparisons.find(item=>item.id===sample.id).after.metrics;
    return '| '+sample.id+' | '+display(initial.presentedFps)+' | '+display(final.presentedFps)+' | '+
      display(sample.presentedFps)+' / '+display(sample.windowPresentedFps)+' | '+display(+(sample.dropRatio*100).toFixed(2))+'% | '+sample.loops+' | '+
      display(sample.sourceContent.contentFps)+' | '+(sample.actualPixelChange.changed?'通过':'失败')+' |';
  }),
  '',
  '两份最终报告必须三类证据同时通过，并绑定当前页面、跳转、验收脚本、离线分析脚本及视频 SHA-256 与 URL 缓存版本。现场 contentFps、windowContentFps、contentGapP95、maxVisualHoldMs、repeatFraction 均未测并保留 null，绝不以源数据冒充现场逐帧像素连续性。实际画面检查发生在播放窗口冻结之后，必须是同一视频、两份不同原生帧与像素 hash，两次捕获前后均实际可见，且按原 RGB 阈值观察到变化。HTTP 返回的视频全文 SHA 同样必须匹配当前源文件。前后 30 项视频字节相同，逐项对应见 completion.json 的 previewPlayback。',
  '',
  '完整离线 RGB / 原始 PTS 证据：'+revalidation.sourceMediaEvidence.path+'（SHA-256 '+
    revalidation.sourceMediaEvidence.sha256+'；分析器 '+revalidation.sourceMediaEvidence.analyzerSha256+
    '）。每帧与原始、解码时间戳的完整证据留在该文件，不复制为新的逐帧报告；源媒体 ≥45 次变化/s、P95≤70 ms、最长保持<200 ms 的连续内容门槛（包括循环边界）独立于现场播放 fps。',
  '',
  '| 保留的历史报告 | 原测量时间 | 当时通过 |',
  '|---|---|---:|',
  ...[revalidation.baseline,revalidation.failedFullBefore,revalidation.failedLoops,revalidation.failedReadbackLoops,revalidation.failedWorkerLoops,revalidation.failedWorkerReadbackLoops,revalidation.failedComplete,revalidation.startupDiagnostic,revalidation.cpuReadbackDiagnostic]
    .map(report=>'| '+report.file+' | '+report.at+' | '+report.passed+' / '+report.total+' |'),
  '',
  '本轮首份完整采样中 Telescope 的 long task（ms）：'+
    revalidation.failedFullBefore.samples.find(sample=>sample.id==='curated-telescope').longTasks.map(task=>display(task.duration)).join('、')+
    '，偶发异常根因仍未确证。CPU 读取诊断 readMsP95（ms）：'+
    display(revalidation.cpuReadbackDiagnostic.samples[0].callbackDiagnostics?.readMsP95)+
    '；主线程与 Worker 逐帧读回的失败也完整保留，包括共享 GPU 干扰和像素队列不完整。它们不属于当前已通过证据。原 before.json、after.json、after-first-live.json 及各失败报告均保留原字节和计数。',
  '',
  'Spatial 的历史完整采样首帧 '+display(revalidation.startupObservation.firstFrameMs)+' ms、掉帧率 '+
    display(+(revalidation.startupObservation.dropRatio*100).toFixed(2))+'%；随后诊断首帧 '+
    display(revalidation.startupObservation.diagnosticFirstFrameMs)+' ms，请求发送前约 '+
    display(revalidation.startupObservation.requestSendStartMs)+' ms，发送结束至响应头开始约 '+
    display(revalidation.startupObservation.sendEndToResponseHeadersMs)+' ms。具体启动等待原因仍未确证，不能宣称此次测试器修改消除了该问题。Inline 已确认的两次 CDP 调用间循环竞态由验收工具改为同次 settle + freeze；同视频就绪恢复仍严格小于 200 ms，原性能门槛不变。',
  '',
  '五份功能门禁 '+totalChecks+' 项及 '+previewPlayback.journeys.file+'（'+previewPlayback.journeys.passed+' / '+
    previewPlayback.journeys.total+'，'+previewPlayback.journeys.at+'）和 '+revalidation.galleryJourney.file+'（'+
    revalidation.galleryJourney.passed+' / '+revalidation.galleryJourney.total+'，'+revalidation.galleryJourney.at+
    '）沿用上一轮测量，重新核对当前页面与被测交互实现哈希。原时间保留在 completion.json，不声称本轮重新执行。',
  '',
  '本次执行项目合同测试 '+nodeTests.passed+' / '+nodeTests.total+'；同步核对 '+sync.assetFiles+' 个资产、'+sync.copyChecks+
    ' 个副本比较、'+sync.httpChecks+' 条 HTTP 资源，见 project-tests.txt 与 final-sync.json。历史单页清理 '+cleanupFile+
    '（'+cleanup.at+'，'+cleanup.removedFiles+' 个文件）未重复执行。本结论限所列本机采样，不代表所有设备或所有时间稳定 60 fps，也不替代用户审美验收。',
  '',
  '主页面 SHA-256：'+formalHash+'；兼容跳转 SHA-256：'+redirectSha256,
  '',
  '最终完整采样 SHA-256：'+previewPlayback.after.sha256+'；最终长循环 SHA-256：'+revalidation.loops.sha256,
  ''
].join('\n'):null;
const startupResult=startupMode?[
  '# Motion Vault 当前首帧启动优化','',
  '核实时间：'+at+'。有界媒体准备已于 '+previewStartup.publication.at+' 发布到原入口，本次规定的收尾报告均通过，首次 stage 失败原样保留。30 份预览视频字节未改，未重新录制或编码。','',
  '唯一完整画廊：'+mainURL+'。原正式 '+counts.formal+' 项与新增待审 '+counts.candidates+' 项继续在同页管理；收藏、下架、收录和私人备注沿用原数据。','',
  '页面在可见范围内顺序准备媒体，最多保留 9 个对象 URL、24 MiB 总量、单条 4 MiB；后台没有播放器。悬停复用准备结果，离开、切换、超时与 pagehide 释放相应资源。准备还在进行时可等待同一结果，冷悬停不承诺普遍小于 800 ms。','',
  '| 本次证据 | 通过 |','|---|---:|',
  ...[previewStartup.stage30,previewStartup.live30,previewStartup.fourTargetLoops,previewStartup.startupStage,previewStartup.startupLive,...previewStartup.journeys]
    .map(record=>'| '+record.file+' | '+record.passed+' / '+record.total+' |'),
  ...proofs.map(record=>'| '+record.file+' | '+record.passed+' / '+record.total+' |'),
  '| project-tests.txt | '+nodeTests.passed+' / '+nodeTests.total+' |','',
  '首次 stage 全序列 '+previewStartup.historicalStageFailure.passed+' / '+previewStartup.historicalStageFailure.total+'（9 项持续掉帧失败）及其 failed 执行回执原样保留。随后预先声明的一次同产品完整序列通过，原因仍未确证，不能据此声称九项掉帧已经修复。ABBA URL 对照只用于诊断，不计入完成门禁。六项先前通过的 stage 前置检查沿用原时间和相同页面身份，未重跑。','',
  '完整 stage / live 各 30 项与四项各至少 3 次长循环分别采样。现场性能窗口不做像素读回；同 SHA 源媒体的全部 RGB/PTS 分析和窗口结束后的真实两次画面变化另行核验，源内容帧率不冒充现场逐帧像素结果。实际播放 Blob/HTTP 完整 SHA、canonical HTTP 完整 SHA 与资产 SHA 三者逐项相等。','',
  '启动故障测试实际延迟请求 1000 ms，验证可见阅读后首次帧小于原 800 ms 门槛、复用同一请求、离开后迟到结果不复活、再次进入可恢复、快速切换与释放。pagehide 用明确标注的合成生命周期事件触发；并发按同文档 fetch 至消费或取消计算，最多 1。基线旧工具要求准备必须完成于 hover 前，该过严条件已更正；旧基线失败原样保留，不直接把其总分差当作产品提升量。','',
  '最后同步检查 '+sync.assetFiles+' 个资产、'+sync.copyChecks+' 次副本比较、'+sync.httpChecks+' 条 HTTP 资源，见 lineage/current/final-sync.json。本次测试与同步来自 live worker 的真实退出和完整 stdout，未在收尾中重跑。','',
  '此前偶发首帧等待的底层原因仍未确证。本次修复依据是请求延迟下的准备、共享结果和恢复行为及本轮实测；结论限当前机器、页面和采样，不保证所有设备恒定 60 fps 或所有冷悬停均小于 800 ms。','',
  '发布前 install-receipt、completion、RESULT 与 PROJECT 的完整原文、字节数及 SHA 保存于 '+previewStartup.priorState.file+'。旧失败报告和历史发布事实继续保留；历史单页清理未重复执行。上方受管项目块及用户接受状态未改，技术完成不代表用户审美批准。','',
  '主页面 SHA-256：'+formalHash+'；发布 runId：'+previewStartup.publication.runId+'。源 RGB 报告：'+previewStartup.sourceMedia.path+'，SHA-256：'+previewStartup.sourceMedia.sha256+'。',
  ''
].join('\n'):null;
const queueResult=queueMode?[
  '# Motion Vault 当前预览准备修复','',
  '核实时间：'+at+'。两槽媒体准备已于 '+previewQueue.publication.at+' 更新到原入口；'+(queueContinuationMode?'本次 stage 五项通过；live 采用原五项通过、normal 原192项通过、独立 ID36完整周期证据及六项续跑的组合覆盖，原 normal 报告仍为192/193失败。':'本次 stage 五项及发布后的 live 十二项均通过。')+'此次只更新画廊代码，30 份视频字节、版本与目录身份保持原样。','',
  '唯一完整画廊：'+mainURL+'。同页继续管理 '+counts.formal+' 项正式内容和 '+counts.candidates+' 项候选，收藏、收录、下架与私人备注沿用原状态；没有新增用户入口。','',
  '已修复的具体边界是：一个邻项的响应体持续未完成时，第二个可见条目仍可准备。实际旧单槽 '+previewQueue.before.passed+' / '+previewQueue.before.total+'，新 stage '+previewQueue.queueStage.passed+' / '+previewQueue.queueStage.total+'、原址 live '+previewQueue.queueLive.passed+' / '+previewQueue.queueLive.total+'。Water 在阅读及悬停期间一直被测试器持有；Reaction 悬停复用预先准备结果，没有新增产品请求，实际 Blob、canonical HTTP 与磁盘媒体 SHA 完全相等。旧样本首帧 79.3 ms 本来也快，分数差不等于首帧延迟改善量。','',
  '固定阅读等待参数为 1500 ms；实际经过时间 stage '+display(previewQueue.queueStage.sample.actualReadingMs)+' ms、live '+display(previewQueue.queueLive.sample.actualReadingMs)+' ms，含调度开销。目标首帧分别 '+display(previewQueue.queueStage.sample.frame.firstFrameMs)+' ms、'+display(previewQueue.queueLive.sample.frame.firstFrameMs)+' ms，均使用原 <800 ms 门槛。此测试不靠定时释放阻塞请求，也不等待准备成功后才悬停。','',
  '缓存仍有最多 9 项、24 MiB 总量和单条 4 MiB 的上限，后台最多 2 个准备任务且没有隐藏播放器。现有 6 项缓存 VM 回归分别核实超时、取消、直接播放、Blob 生命周期、双槽持续阻塞和待处理条目/字节预留；浏览器的对象 URL 保留量与 VM 的 pending 预留验证分开记录。','',
  '| 本次实际证据 | 通过 |','|---|---:|',
  ...[previewQueue.queueStage,previewQueue.queueLive,previewQueue.playback30,previewQueue.fourTargetLoops,...previewQueue.journeys,...(queueContinuationMode?[previewQueue.formal36Supplement]:[])]
    .map(record=>'| '+record.file+' | '+record.passed+' / '+record.total+' |'),
  ...proofs.map(record=>'| '+record.file+' | '+record.passed+' / '+record.total+' |'),
  '| project-tests.txt | '+nodeTests.passed+' / '+nodeTests.total+' |','',
  '完整 30 项现场播放首帧范围 '+display(previewQueue.playback30.summary.firstFrameMs.min)+'–'+display(previewQueue.playback30.summary.firstFrameMs.max)+
    ' ms，实际呈现 '+display(previewQueue.playback30.summary.presentedFps.min)+'–'+display(previewQueue.playback30.summary.presentedFps.max)+
    ' fps；不是所有条目都为 60 fps。四个长循环目标各覆盖至少 3 个完整循环。性能窗口不做像素读回；同 SHA 源媒体全部 RGB/原 PTS 分析及窗口外的两次真实画面变化分别验证，不能相互冒充现场逐帧像素证据。','',
  ...(queueContinuationMode?['原 live 执行回执 '+previewQueue.execution.live.file+' 仍为 failed，normal 报告 '+previewQueue.retainedNormalFailure.file+' 仍为192/193；其唯一零差异结果及原始 SHA 保留。ID36补充证据使用预先固定的完整自然周期，证明当前正常动画与减少动态行为，也说明旧短时截图取样策略存在覆盖盲区；它无法确定旧样本产生零差异的确切原因，不能替换原失败或写成原193/193、600/600。六项续跑回执 '+previewQueue.execution.continuation.file+' 单独记录未执行任务的真实新时间。','']:[]),
  '最后同步核对 '+sync.assetFiles+' 个资产、'+sync.copyChecks+' 次副本比较、'+sync.httpChecks+' 条 HTTP 资源。项目测试及同步使用实际执行回执的退出和完整 stdout，收尾不重复运行。发布回执 '+previewQueue.publication.runId+' 记录实际 '+previewQueue.publication.changedFiles+' 份 HTML 副本更新；不是无发布复验。','',
  '历史限制继续保留：上一版定时故障 live 36/38、后续 fixture 35/40，以及 A 场景有效注入约 1015.8 ms 下的实际冷首帧 1259.8 ms 均未改成通过。Water 占唯一准备槽造成 Reaction 未开始准备是已观测事实，Water 响应慢的底层原因尚未确证。控制器的其他超长注入另列，不能抹掉该有效失败；本次持续阻塞回归针对这一队列边界，不声称修复所有网络冷启动。最早 stage 178/187 的九项持续掉帧原因仍未确证，后续通过不等于因果修复。','',
  '旧 warnings 检查点、原发布记录、受管 PROJECT 原文及被新报告覆盖的旧功能证据保存于 '+previewQueue.priorState.file+
    '（SHA '+previewQueue.priorState.sha256+'）；其他历史失败及执行回执保留原字节。用户接受状态和历史清理没有改写。本结论限本次机器、当前页面及声明合同，不保证所有设备恒定 60 fps、所有冷悬停均小于 800 ms，也不代替审美接受。','',
  '主页面 SHA-256：'+formalHash+'。源 RGB 报告：'+previewQueue.sourceMedia.path+'，SHA-256：'+previewQueue.sourceMedia.sha256+'。',
  ''
].join('\n'):null;
const result=queueMode?queueResult:startupMode?startupResult:revalidateMode?'# Motion Vault 当前播放复验结果\n\n'+revalidationBody:previewMode?playbackResult:singlePageResult;

const currentProject=await readFile(path.join(project,'PROJECT.md'),'utf8');
const begin='<!-- AI-NATIVE-PROJECT-CONTROL:BEGIN -->';
const end='<!-- AI-NATIVE-PROJECT-CONTROL:END -->';
const first=currentProject.indexOf(begin),last=currentProject.indexOf(end);
if(first<0||last<first)throw new Error('Managed project control block not found');
const prefix=currentProject.slice(0,last+end.length);
const managedBefore=currentProject.slice(first,last+end.length);
const singlePageSuffix=[
  '',
  '',
  '## 当前状态',
  '',
  '核实时间：'+at+'。Motion Vault 单页精简已经发布并通过本次实际验收，只维护 motion-vault.html 一个完整画廊；在同页切换“已收录”“新增待审”“已下架”。结果与本次报告见 lineage/current/RESULT.md。旧两页报告不作为当前完成证据。',
  '',
  '上方受管块仅保留初始建项/迁移阶段元数据，本次未修改该块及其用户接受状态。项目继续 active，长期生产复用、用户审美接受与具体任务选定独立验收。',
  '',
  '## 当前内容与状态',
  '',
  '原正式目录'+counts.formal+'项，新增目录'+counts.candidates+'项，全部新增均有本地实现与预览；来源为'+counts.authorSource+'项作者源码适配、'+counts.independent+'项独立实现。此前明确永久删除或排除的条目未恢复。',
  '',
  '原正式内容与用户主动收录的候选进入默认“已收录”；未收录且未下架候选在“新增待审”；已下架内容集中查看并按原收录状态恢复。旧审查记录通过 accepted 数组扩展收录状态，不以“未下架”冒充用户批准。界面计数随实际审查与搜索状态计算。',
  '',
  '## 入口与实现',
  '',
  '唯一完整画廊：'+mainURL+'。旧 motion-vault-candidates.html 只保留到同页 ?view=pending 的最小兼容跳转。',
  '',
  '当前源码在 src/hybrid/；中性数据为 web/catalog.json 和 web/candidate-catalog.json；持久源文件在 assets/design-assets/；发布资产在 web/motion-vault-assets/。两个目录不代表两个页面，浏览器个人审查状态不自动改写公共 JSON。候选来源仍用 --scope candidates 查询。',
  '',
  '本次删除'+cleanup.removedFiles+'个退役界面或维护文件、'+cleanup.removedBytes+'字节，清单见 lineage/current/'+cleanupFile+'。有效代码、设计拆解及来源资产保留；已有内部恢复包 versions/.recovery.zip 不参与运行或构建。',
  '',
  '## 质量与边界',
  '',
  '本次五份实际页面报告通过'+totalChecks+'项检查，项目合同测试通过'+nodeTests.passed+' / '+nodeTests.total+'；各报告同时绑定当前主页面与兼容跳转哈希。实际 HTTP、副本与资源核对见 lineage/current/final-sync.json。具体覆盖与限制见当前 RESULT，不沿用旧两页验收计数。',
  '',
  '私人备注、原始下架原因及审查事件不进入生产目录或参考资料。原收藏、下架、备注键保留；此次未修改用户私人浏览器状态或 Hub 业务数据。具体任务仍需独立选定，不能将技术可运行写成用户已批准。',
  '',
  '## 后续维护',
  '',
  '从 README.md、AGENTS.md 和 lineage/current/RESULT.md 开始。完整构建用 node scripts/build-hybrid.mjs build；候选快捷更新在已有完整暂存产物时运行 node src/hybrid/build-candidates.mjs。查询用 scripts/query-vault.mjs，发布核对用 scripts/sync-gallery.mjs，受门禁发布用 scripts/release.mjs；scripts/finalize-current.mjs 仅消费与当前发布匹配的新证据并更新本项目非受管说明。',
  ''
].join('\n');
const playbackSuffix=previewMode?[
  '',
  '',
  '## 当前状态',
  '',
  '核实时间：'+at+'。Motion Vault '+playbackOutcome+' 当前入口保持 motion-vault.html，同页切换“已收录”“新增待审”“已下架”；当前结果见 lineage/current/RESULT.md，结构化证据见 lineage/current/completion.json。',
  '',
  '上方受管块保留初始建项/迁移元数据和用户接受状态。项目继续 active；技术验证、用户审美接受与具体生产任务选定分别记录。',
  '',
  '## 内容与入口',
  '',
  '原正式目录 '+counts.formal+' 项，新增目录 '+counts.candidates+' 项；新增均具备本地实现与预览，来源为 '+counts.authorSource+' 项作者源码适配、'+counts.independent+' 项独立实现。',
  '',
  '唯一完整画廊：'+mainURL+'。旧 motion-vault-candidates.html 保留到同页 ?view=pending 的兼容跳转。用户主动收录才进入个人默认库，accepted 扩展与收藏、下架、备注的原存储键继续使用；个人审查状态不自动改写公共目录。',
  '',
  '## 播放与交互证据',
  '',
  '完整 '+counts.candidates+' 项浏览器视频采样：基线 '+previewPlayback.before.passed+' / '+
    previewPlayback.before.total+'，修复后 '+previewPlayback.after.passed+' / '+previewPlayback.after.total+
    '；实际更新 '+previewPlayback.changedVideos+' 份视频。前后有效内容帧率、呈现帧率、首帧、掉帧和视频身份见 lineage/current/preview-playback/before.json、after.json 及当前 RESULT。',
  '',
  playbackWarningSection,
  '',
  '真实交互旅程 '+previewPlayback.journeys.passed+' / '+previewPlayback.journeys.total+
    '，覆盖 '+previewPlayback.journeys.cases.map(item=>item.id).join('、')+
    '，见 lineage/current/'+previewPlayback.journeys.file+'。修复后播放证据绑定全部当前视频 SHA-256 与实际缓存版本，旅程证据绑定被测实现字节，两者均同时绑定当前主页面和跳转。',
  '',
  '原五份本轮实际页面报告共 '+totalChecks+' 项，项目合同测试 '+nodeTests.passed+' / '+
    nodeTests.total+'；最后同步检查 '+sync.assetFiles+' 个资产、'+sync.copyChecks+' 个副本比较及 '+
    sync.httpChecks+' 条实际 HTTP 资源，见 lineage/current/final-sync.json。',
  '',
  '## 历史清理与维护',
  '',
  'lineage/current/'+cleanupFile+' 保留 '+cleanup.at+' 的历史单页清理：'+
    cleanup.removedFiles+' 个退役文件、'+cleanup.removedBytes+
    ' 字节。该记录保留当时发布哈希，当前 completion 将它标记为 historical；本轮没有重复执行该清理。',
  '',
  '源码在 src/hybrid/，公共目录为 web/catalog.json 与 web/candidate-catalog.json，持久源资产在 assets/design-assets/，发布资产在 web/motion-vault-assets/。候选来源仍用 --scope candidates 查询；私人备注、下架原因及审查事件不进入生产目录或参考导出。',
  '',
  '完整构建用 node scripts/build-hybrid.mjs build；发布由 scripts/release.mjs 受门禁执行，核对用 scripts/sync-gallery.mjs。播放修复收尾运行 node scripts/finalize-current.mjs --preview-playback，要求完整新播放与旅程证据、五份当前 live 报告、本次项目测试与最终同步；默认模式保留单页实施合同。',
  ''
].join('\n'):null;
const revalidationSuffix=revalidateMode?[
  '','','## 当前状态','',
  '核实时间：'+at+'。本轮验收工具修正后的完整 '+counts.candidates+' 项播放复验 '+
    previewPlayback.after.passed+' / '+previewPlayback.after.total+'；四项目标长循环 '+
    revalidation.loops.passed+' / '+revalidation.loops.total+'。结果仅覆盖本次测量，本轮没有修改产品或视频，也没有再次发布。',
  '',
  '唯一完整画廊：'+mainURL+'，同页切换“已收录”“新增待审”“已下架”。保留 '+counts.formal+' 项正式内容与 '+
    counts.candidates+' 项候选；用户主动收录才进入个人默认库，原私人审查状态与上方受管块保持原样。',
  '',
  '前一轮已完成 30 项真实预览重录。本轮修正测试器，将无像素读回的现场播放性能、同 SHA 离线完整 RGB/PTS 内容分析和播放窗口结束后的实际两次画面变化分别验证。现场未测内容指标为 null；源内容帧率不冒充现场每帧像素帧率，原现场播放门槛保留。四个目标在工具修改前也已通过，不能把当前帧率归因于这次工具修改。',
  '',
  '当前证据：lineage/current/'+previewPlayback.after.file+' 与 lineage/current/'+revalidation.loops.file+
    '。remaining-before、remaining-full-before、remaining-loops、remaining-loops-after、remaining-loops-final、remaining-loops-verified、remaining-complete-30、remaining-startup-diagnostic、remaining-webgpu-timed 及首轮 before/after/after-first-live 均原样保留；Telescope 首份完整采样的偶发 long task 与 Spatial 启动等待的具体根因仍未确证，不能声称由本次测试器修改消除；Inline 的循环竞态仅修正验收调用时序，原门槛不变。动态指标、哈希和历史边界见 lineage/current/RESULT.md 与 completion.json。',
  '',
  '原 '+totalChecks+' 项功能门禁和两份交互旅程保留原测量时间，核对当前页面及被测实现哈希后沿用。本次项目测试 '+
    nodeTests.passed+' / '+nodeTests.total+'，最终同步 '+sync.assetFiles+' 个资产、'+sync.copyChecks+' 个副本比较、'+
    sync.httpChecks+' 条 HTTP 资源。性能结论不泛化为所有设备或所有时间稳定 60 fps。',
  '',
  '源码、公共目录和唯一发布入口保持既有路径；构建与发布仍用 scripts/build-hybrid.mjs、scripts/release.mjs。本次复验收尾命令为 node scripts/finalize-current.mjs --preview-playback --revalidate；默认收尾合同不变。历史清理未重复执行，技术复验不代表用户审美认可。',
  ''
].join('\n'):null;
const startupSuffix=startupMode?[
  '','','## 当前状态','',
  '核实时间：'+at+'。有界媒体准备已发布至原 motion-vault.html；本次规定的 stage 后续全量、live 全量、四项长循环、启动故障与恢复、功能和交互门禁通过；首次 stage 178/187 的九项掉帧失败保留且原因未确证。30 份视频字节未改。当前结果和完整证据索引见 lineage/current/RESULT.md、completion.json。','',
  '唯一完整画廊：'+mainURL+'。保留 '+counts.formal+' 项正式内容和 '+counts.candidates+' 项候选，个人状态沿用原键。受管项目控制块及用户接受状态保持原样；技术验证不替代用户审美认可。','',
  '本次项目测试 '+nodeTests.passed+' / '+nodeTests.total+'，同步 '+sync.assetFiles+' 个资产、'+sync.copyChecks+' 次副本比较、'+sync.httpChecks+' 条 HTTP 资源。性能、完整源 RGB/PTS 与测量窗口外实际像素证据分别保留，Blob 播放、HTTP 和资产 SHA 逐项相等。','',
  '旧偶发首帧延迟的底层原因仍未确证；本轮验证的是有界准备、请求复用与恢复，不承诺所有设备或冷悬停均在 800 ms 内启动。发布前记录完整保存在 '+previewStartup.priorState.file+'，旧失败证据和历史清理保留。','',
  '源码、目录、查询和原入口沿用既有路径。构建与发布继续使用 scripts/build-hybrid.mjs、scripts/release.mjs；本次收尾命令为 node scripts/finalize-current.mjs --preview-startup，要求本次新发布和全部新证据。',
  ''
].join('\n'):null;
const queueSuffix=queueMode?[
  '','','## 当前状态','',
  '核实时间：'+at+'。两槽媒体准备已经原址发布，'+(queueContinuationMode?'本次采用明确的组合覆盖收尾：stage五项、原live前五项、normal中192项通过、独立ID36完整周期验证及六项未执行任务续跑。原live回执仍failed、normal仍192/193，不声称原报告全部通过。':'本次声明的 stage 五项与发布后 live 十二项全部通过。')+'持续持有邻项响应时目标仍能准备并复用 Blob，解决已观测单槽阻塞边界。当前结果见 lineage/current/RESULT.md，完整身份和历史限制见 completion.json。','',
  '唯一完整画廊：'+mainURL+'。仍为 '+counts.formal+' 项正式内容和 '+counts.candidates+' 项候选，同页切换原状态；30 份视频未改，个人数据键与上方受管块、用户接受状态保持原样。','',
  '正式完整播放 '+previewQueue.playback30.passed+' / '+previewQueue.playback30.total+'、四项各至少三圈长循环 '+previewQueue.fourTargetLoops.passed+' / '+previewQueue.fourTargetLoops.total+
    '，项目合同测试 '+nodeTests.passed+' / '+nodeTests.total+'。缓存两槽与9项/24MiB/4MiB预算分别经实际持续阻塞场景和VM预留回归核实；现场性能、离线全部 RGB/PTS 和窗口外实际像素保留各自证据边界。','',
  '旧 36/38、35/40、有效注入下冷首帧1259.8ms及最早九项持续掉帧失败保留。此次解决声明的准备队列边界，不把旧失败改成通过，不承诺所有冷悬停或所有设备性能；旧响应等待和九掉帧的底层原因未确证。原 warnings 记录完整保存在 '+previewQueue.priorState.file+'。','',
  '构建、查询和发布继续使用原路径；本轮收尾入口 node scripts/finalize-current.mjs --preview-queue'+(queueContinuationMode?' --continuation':'')+'，只接受新页面、声明覆盖的发布后证据及同步身份一致后更新当前记录。'+(queueContinuationMode?'ID36新周期覆盖不能确定旧零差异的确切原因，旧失败继续保留。':'')+'技术完成不代表用户审美批准。',''
].join('\n'):null;
const suffix=queueMode?queueSuffix:startupMode?startupSuffix:revalidateMode?revalidationSuffix:previewMode?playbackSuffix:singlePageSuffix;

const nextProject=prefix+suffix;
if(nextProject.slice(first,first+managedBefore.length)!==managedBefore)
  throw new Error('Managed project metadata would change');

const completion={
  at,status:playbackWarningCount?'published_with_warnings':'technically_complete',mode:queueContinuationMode?'preview-queue-continuation':queueMode?'preview-queue':startupMode?'preview-startup':revalidateMode?'preview-playback-revalidate':previewMode?'preview-playback':'single-page',
  interface:{entry:'motion-vault.html',viewLabels:['已收录','新增待审','已下架'],legacyEndpoint:'motion-vault-candidates.html',legacyBehavior:'redirect_to_primary_pending'},
  counts,primary,formalHash,redirectSha256,candidateHash:redirectSha256,
  proofs,nodeTests,
  sync:{assetFiles:sync.assetFiles,copyChecks:sync.copyChecks,httpChecks:sync.httpChecks,file:'final-sync.json'},
  cleanup,...(queueMode?{previewQueue,newlyPublished:true,productChanged:true,mediaChanged:false,allTechnicalGatesPassed:true,finalizationBlocked:false,userTaskComplete:true,completionScope:queueContinuationMode?'composite scoped coverage: prior five live passes, 192 retained normal passes plus separate ID36 full-cycle proof, six continuation tasks; original report remains failed':'declared two-slot preparation and current playback/function contracts; historical limitations retained',...(queueContinuationMode?{originalReportsAllPassed:false,validationBasis:'composite-scoped-evidence'}:{})}:{}),...(previewMode?{previewPlayback}:{}),...(startupMode?{previewStartup,newlyPublished:true,productChanged:true,mediaChanged:false}:{}),managedControlBlockUnchanged:true,
  sourceVisualAcceptance:'not_claimed',userApprovalOfCandidates:'not_claimed',
  businessDataChanged:false,userBrowserDataChanged:false
};
for(const [file,hash]of pinnedFiles){
  if(sha(await readFile(path.join(project,file)))!==hash)
    throw new Error('Verified evidence or release changed before commit: '+file);
}
if(await readFile(path.join(project,'PROJECT.md'),'utf8')!==currentProject)
  throw new Error('Project record changed concurrently');
if(startupMode||queueMode){
  await put(evidence,'project-tests.txt',nodeOutput);
  await put(evidence,'final-sync.json',JSON.stringify(sync,null,2));
}
await writeFile(path.join(project,'PROJECT.md'),nextProject);
await put(evidence,'RESULT.md',result);
await put(evidence,'completion.json',JSON.stringify(completion,null,2));
console.log(JSON.stringify(queueMode?{
  at:completion.at,status:completion.status,mode:completion.mode,mainHash:completion.formalHash,counts:completion.counts,
  gates:{allTechnicalGatesPassed:completion.allTechnicalGatesPassed,finalizationBlocked:completion.finalizationBlocked,scope:completion.completionScope},
  originalReportsAllPassed:completion.originalReportsAllPassed??true,RESULT:'lineage/current/RESULT.md'
}:completion,null,2));
