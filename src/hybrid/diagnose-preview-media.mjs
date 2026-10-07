import {readFile,stat} from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {project,sha,guard,put} from '../../scripts/build-hybrid.mjs';

// Read-only media inspection. Only an explicit --out writes a guarded evidence
// report; this script does not capture, re-encode, replace or publish any media.
function contained(base,relative){
 const p=path.resolve(base,relative),rel=path.relative(base,p);
 if(!rel||rel.startsWith('..'+path.sep)||rel==='..'||path.isAbsolute(rel))throw new Error('Path outside selected root: '+relative);
 return p;
}
const readJSON=async p=>JSON.parse(await readFile(p,'utf8'));
const round=(x,n=4)=>Number(Number(x).toFixed(n));
const rational=s=>{const [a,b=1]=String(s).split('/').map(Number);return b?a/b:null;};
const quantile=(array,p)=>{if(!array.length)return null;const a=[...array].sort((a,b)=>a-b);return round(a[Math.min(a.length-1,Math.floor((a.length-1)*p))]);};
function run(executable,args,{binary=false}={}){
 const r=spawnSync(executable,args,{encoding:binary?undefined:'utf8',windowsHide:true,timeout:45000,maxBuffer:128*1024*1024});
 if(r.error)throw r.error;
 if(r.status!==0)throw new Error(executable+' failed ('+r.status+'): '+String(r.stderr).slice(-5000));
 return r;
}
function boxes(bytes){
 const result=[];
 for(let offset=0;offset+8<=bytes.length;){
  let length=bytes.readUInt32BE(offset),header=8;
  const type=bytes.toString('ascii',offset+4,offset+8);
  if(length===1){if(offset+16>bytes.length)break;length=Number(bytes.readBigUInt64BE(offset+8));header=16;}
  if(length===0)length=bytes.length-offset;
  if(!Number.isSafeInteger(length)||length<header||offset+length>bytes.length)break;
  result.push({type,offset,bytes:length});offset+=length;
 }
 return result;
}
function difference(a,b){
 let sum=0,changed=0,max=0;
 for(let i=0;i<a.length;i++){const delta=Math.abs(a[i]-b[i]);sum+=delta;if(delta>2)changed++;if(delta>max)max=delta;}
 return {meanAbsoluteLumaDelta:sum/a.length,pixelsDeltaOver2Fraction:changed/a.length,maxLumaDelta:max};
}
function visible(d){return d.meanAbsoluteLumaDelta>=.25||d.pixelsDeltaOver2Fraction>=.005;}
export function inspectFrames(file,stream){
 const width=164,height=100,frameBytes=width*height;
 const args=['-hide_banner','-v','info','-threads','1','-i',file,'-an','-sn','-dn','-vf',
  'scale='+width+':'+height+':flags=area,format=gray,showinfo','-filter_threads','1','-filter_complex_threads','1',
  '-fps_mode','passthrough','-threads','1','-pix_fmt','gray','-f','rawvideo','pipe:1'];
 const started=Date.now(),decoded=run('ffmpeg',args,{binary:true});
 if(decoded.stdout.length%frameBytes)throw new Error('Incomplete raw frame '+file);
 const frameCount=decoded.stdout.length/frameBytes;
 const timestamps=[...String(decoded.stderr).matchAll(/\bn:\s*(\d+)\s+pts:\s*-?\d+\s+pts_time:([-\d.e+]+)/g)].map(m=>({index:Number(m[1]),pts:Number(m[2])}));
 if(frameCount!==timestamps.length||timestamps.some((t,i)=>t.index!==i))throw new Error('Decoded timestamp/frame mismatch '+file);
 const pts=timestamps.map(t=>t.pts),fps=rational(stream.avg_frame_rate)||rational(stream.r_frame_rate);
 const end=Number(stream.duration)||((pts.at(-1)||0)+1/fps),unique=new Set(),transitions=[];
 let previous;
 for(let i=0;i<frameCount;i++){
  const frame=decoded.stdout.subarray(i*frameBytes,(i+1)*frameBytes);unique.add(sha(frame));
  if(previous){
   const d=difference(frame,previous);
   transitions.push({index:i,ptsSeconds:pts[i],...d,exactDuplicate:d.maxLumaDelta===0,visibleChange:visible(d)});
  }
  previous=frame;
 }
 const changes=transitions.filter(t=>t.visibleChange),changeTimes=changes.map(t=>t.ptsSeconds);
 const holds=[];let holdStart=pts[0]||0;
 for(const change of changes){holds.push({start:round(holdStart),end:round(change.ptsSeconds),seconds:round(change.ptsSeconds-holdStart)});holdStart=change.ptsSeconds;}
 holds.push({start:round(holdStart),end:round(end),seconds:round(end-holdStart)});
 const activeIntervals=changeTimes.slice(1).map((t,i)=>t-changeTimes[i]);
 const perSecond=[];
 for(let start=0;start<end;start++){
  const stop=Math.min(start+1,end),part=transitions.filter(t=>t.ptsSeconds>=start&&t.ptsSeconds<stop);
  perSecond.push({start,end:round(stop),encodedTransitions:part.length,exactDuplicates:part.filter(t=>t.exactDuplicate).length,
   visibleChanges:part.filter(t=>t.visibleChange).length,maxMeanAbsoluteLumaDelta:round(Math.max(0,...part.map(t=>t.meanAbsoluteLumaDelta)))});
 }
 const thresholdSensitivity=[.05,.1,.25,.5,1].map(threshold=>({meanAbsoluteLumaDeltaAtLeast:threshold,
  changes:transitions.filter(t=>t.meanAbsoluteLumaDelta>=threshold).length}));
 const adjacentDeltas=pts.slice(1).map((p,i)=>p-pts[i]);
 const loopBoundary=frameCount>1?difference(decoded.stdout.subarray(0,frameBytes),decoded.stdout.subarray((frameCount-1)*frameBytes)):null;
 return {
  elapsedMs:Date.now()-started,decoderThreads:1,filterThreads:1,
  sampling:{width,height,pixelFormat:'gray',scale:'area',frames:'all decoded frames, original timestamps; no fps filter'},
  interpretation:'Visual update statistics describe decoded luma changes, not browser refresh rate. Compression noise, small effects and intentional holds require the per-second distribution and source choreography to interpret.',
  visibleChangeRule:{meanAbsoluteLumaDeltaAtLeast:.25,orPixelsWithAbsoluteLumaDeltaOver2FractionAtLeast:.005},
  decodedFrames:frameCount,encodedDurationSeconds:round(end),decodedUniqueLumaFrames:unique.size,
  exactAdjacentDuplicates:transitions.filter(t=>t.exactDuplicate).length,
  exactAdjacentDuplicateFraction:round(transitions.filter(t=>t.exactDuplicate).length/Math.max(1,transitions.length)),
  visibleChanges:changes.length,visibleChangesPerEncodedSecond:round(changes.length/end),
  firstVisibleChangeSeconds:changeTimes[0]??null,lastVisibleChangeSeconds:changeTimes.at(-1)??null,
  leadingHoldSeconds:round(changeTimes.length?changeTimes[0]-(pts[0]||0):end),
  trailingHoldSeconds:round(changeTimes.length?end-changeTimes.at(-1):end),
  decodedFrameIntervalSeconds:{median:quantile(adjacentDeltas,.5),p90:quantile(adjacentDeltas,.9),max:quantile(adjacentDeltas,1)},
  visibleChangeIntervalSeconds:{median:quantile(activeIntervals,.5),p90:quantile(activeIntervals,.9),max:quantile(activeIntervals,1)},
  heldIntervalsAtLeast120ms:holds.filter(h=>h.seconds>=.12),thresholdSensitivity,perSecond,
  loopBoundary:loopBoundary&&Object.fromEntries(Object.entries(loopBoundary).map(([k,v])=>[k,round(v)])),
  transitions:transitions.map(t=>Object.fromEntries(Object.entries(t).map(([k,v])=>[k,typeof v==='number'?round(v,6):v])))
 };
}
// Offline RGB evidence: every decoded frame is paired with its original packet PTS.
// This is source-media analysis, not a claim about pixels presented by a browser.
export function inspectRGBFrames(file,stream={}){
 const started=Date.now(),sourceBytes=readFileSync(file),mediaSha256=sha(sourceBytes);
 const packetProbe=JSON.parse(run('ffprobe',['-v','error','-threads','1','-select_streams','v:0',
  '-show_packets','-show_entries','stream=time_base,start_pts,duration_ts:packet=pts,duration','-of','json',file]).stdout);
 const streamTiming=packetProbe.streams?.[0],timeBase=streamTiming?.time_base,tick=rational(timeBase);
 if(!Number.isFinite(tick)||tick<=0||(stream.time_base&&rational(stream.time_base)!==tick))
  throw new Error('Missing or inconsistent original RGB time base: '+file);
 const packets=(packetProbe.packets||[]).map(p=>({pts:Number(p.pts),packetDuration:Number.isSafeInteger(Number(p.duration))?Number(p.duration):null})).sort((a,b)=>a.pts-b.pts);
 if(!packets.length||packets.some((p,i)=>!Number.isSafeInteger(p.pts)||(i>0&&p.pts<packets[i-1].pts)))
  throw new Error('RGB profile requires original integer presentation timestamps: '+file);
 const firstPts=packets[0].pts,streamStartPts=Number(streamTiming?.start_pts),streamDurationPts=Number(streamTiming?.duration_ts);
 const endPts=streamStartPts+streamDurationPts;
 if(!Number.isSafeInteger(streamStartPts)||!Number.isSafeInteger(streamDurationPts)||streamDurationPts<=0||
    !Number.isSafeInteger(endPts)||endPts<=firstPts)
  throw new Error('RGB profile requires an explicit positive stream presentation window: '+file);
 // Keep every original frame, including B-frame PTS at/after the container playback end.
 // Packet duration follows decode order; clip only measured presentation intervals.
 for(let i=0;i<packets.length;i++){
  packets[i].duration=Math.max(0,Math.min(packets[i+1]?.pts??endPts,endPts)-Math.min(packets[i].pts,endPts));
  packets[i].outsidePresentationWindow=packets[i].pts>=endPts;
 }
 const originalFrames=JSON.parse(run('ffprobe',['-v','error','-threads','1','-select_streams','v:0',
  '-show_frames','-show_entries','frame=pts,best_effort_timestamp','-of','json',file]).stdout).frames||[];
 const sortedOriginalPts=originalFrames.map(f=>f.pts).sort((a,b)=>a-b);
 if(originalFrames.length!==packets.length||originalFrames.some(f=>!Number.isSafeInteger(f.pts)||!Number.isSafeInteger(f.best_effort_timestamp))||
    sortedOriginalPts.some((pts,i)=>pts!==packets[i].pts))
  throw new Error('Original decoded frame PTS multiset does not match every source packet: '+file);
 const presentationOrder=originalFrames.map((f,index)=>({index,pts:f.pts})).sort((a,b)=>a.pts-b.pts||a.index-b.index);
 const frameMetadata=[];
 for(let i=0;i<presentationOrder.length;i++)frameMetadata[presentationOrder[i].index]=packets[i];
 const width=96,height=58,frameBytes=width*height*3;
 const decoded=run('ffmpeg',['-hide_banner','-v','info','-copyts','-threads','1','-i',file,
  '-map','0:v:0','-an','-sn','-dn','-vf','scale=96:58:flags=bilinear,format=rgb24,showinfo',
  '-filter_threads','1','-filter_complex_threads','1','-fps_mode','passthrough',
  '-threads','1','-pix_fmt','rgb24','-f','rawvideo','pipe:1'],{binary:true});
 if(decoded.stdout.length%frameBytes)throw new Error('Incomplete RGB raw frame: '+file);
 const frameCount=decoded.stdout.length/frameBytes,log=String(decoded.stderr);
 const decodedTimeBase=log.match(/config in time_base:\s*(\d+\/\d+)/)?.[1];
 const timestamps=[...log.matchAll(/\bn:\s*(\d+)\s+pts:\s*(-?\d+)\s+pts_time:/g)]
  .map(m=>({index:Number(m[1]),pts:Number(m[2])}));
 if(rational(decodedTimeBase)!==tick||frameCount!==packets.length||frameCount!==timestamps.length||
    timestamps.some((t,i)=>t.index!==i||!Number.isSafeInteger(t.pts)||t.pts!==originalFrames[i].best_effort_timestamp))
  throw new Error('RGB decoded frames do not map one-to-one to original packet PTS: '+file);
 const start=firstPts*tick,end=endPts*tick,duration=(endPts-firstPts)*tick;
 if(!Number.isFinite(duration)||duration<=0)throw new Error('Invalid measured RGB timeline: '+file);
 const compare=(a,b)=>{
  let total=0,changedPixels=0,maxChannelDelta=0;
  for(let i=0;i<frameBytes;i+=3){
   let pixelMax=0;
   for(let c=0;c<3;c++){const delta=Math.abs(a[i+c]-b[i+c]);total+=delta;pixelMax=Math.max(pixelMax,delta);}
   if(pixelMax>3)changedPixels++;
   maxChannelDelta=Math.max(maxChannelDelta,pixelMax);
  }
  const changedPixelRatio=changedPixels/(width*height);
  return {changedPixels,changedPixelRatio,meanAbsoluteRGBDelta:total/frameBytes,maxChannelDelta,
   exactDuplicate:maxChannelDelta===0,visibleChange:changedPixelRatio>.002};
 };
 const frameTimeline=[],transitions=[],presentationTransitions=[],unique=new Set();
 let previous,previousPresented,firstPresented,lastPresented,firstPresentedIndex,lastPresentedIndex;
 for(let i=0;i<frameCount;i++){
  const frame=decoded.stdout.subarray(i*frameBytes,(i+1)*frameBytes),rgbSha256=sha(frame),packet=frameMetadata[i];
  unique.add(rgbSha256);
  frameTimeline.push({index:i,pts:packet.pts,decoderPts:timestamps[i].pts,duration:packet.duration,packetDuration:packet.packetDuration,
   outsidePresentationWindow:packet.outsidePresentationWindow,ptsSeconds:packet.pts*tick,
   durationSeconds:packet.duration*tick,rgbSha256});
  if(previous)transitions.push({index:i,pts:packet.pts,ptsSeconds:packet.pts*tick,...compare(frame,previous)});
  previous=frame;
 }
 for(const {index:i}of presentationOrder){
  const packet=frameMetadata[i];
  if(packet.duration<=0)continue;
  const frame=decoded.stdout.subarray(i*frameBytes,(i+1)*frameBytes);
  firstPresented??=frame;firstPresentedIndex??=i;lastPresented=frame;lastPresentedIndex=i;
  if(previousPresented)presentationTransitions.push({index:i,pts:packet.pts,ptsSeconds:packet.pts*tick,...compare(frame,previousPresented)});
  previousPresented=frame;
 }
 const changes=presentationTransitions.filter(t=>t.visibleChange),changeTimes=changes.map(t=>t.ptsSeconds),holds=[];
 let holdStart=start;
 for(const t of changeTimes){holds.push({start:holdStart,end:t,seconds:t-holdStart});holdStart=t;}
 const leadingHold=changeTimes.length?changeTimes[0]-start:duration;
 const trailingHold=end-holdStart;
 holds.push({start:holdStart,end,seconds:trailingHold});
 const rawLoopBoundary=compare(decoded.stdout.subarray(0,frameBytes),decoded.stdout.subarray((frameCount-1)*frameBytes));
 const boundary=compare(firstPresented,lastPresented);
 const cyclicChanges=changeTimes.map(t=>t-start);
 if(boundary.visibleChange)cyclicChanges.unshift(0);
 const cyclicGaps=cyclicChanges.length?cyclicChanges.map((t,i)=>i? t-cyclicChanges[i-1]:duration+t-cyclicChanges.at(-1)):[];
 const perSecond=[];
 for(let offset=0;offset<duration;offset++){
  const stop=Math.min(offset+1,duration),part=transitions.filter(t=>t.ptsSeconds-start>=offset&&t.ptsSeconds-start<stop);
  const presented=presentationTransitions.filter(t=>t.ptsSeconds-start>=offset&&t.ptsSeconds-start<stop);
  perSecond.push({start:offset,end:stop,encodedTransitions:part.length,
   exactDuplicates:part.filter(t=>t.exactDuplicate).length,rawVisibleChanges:part.filter(t=>t.visibleChange).length,
   visibleChanges:presented.filter(t=>t.visibleChange).length});
 }
 if(sha(readFileSync(file))!==mediaSha256)throw new Error('Media changed during RGB inspection: '+file);
 const ms=seconds=>round(seconds*1000,6),maxHold=Math.max(...holds.map(h=>h.seconds));
 const rgbQuantile=(array,p)=>{if(!array.length)return null;const sorted=[...array].sort((a,b)=>a-b);return round(sorted[Math.min(sorted.length-1,Math.floor(sorted.length*p))]);};
 return {
  profile:'rgb',elapsedMs:Date.now()-started,decoderThreads:1,filterThreads:1,
  mediaSha256,mediaBytes:sourceBytes.length,mediaUnchanged:true,
  sampling:{width,height,pixelFormat:'rgb24',scale:'bilinear',frames:'all decoded frames, original integer PTS; copyts and fps_mode passthrough; no fps filter or frame selection'},
  interpretation:'Offline decoded source-media RGB changes. Same dimensions and threshold as the browser probe; FFmpeg color conversion and bilinear scaling are not claimed pixel-identical to browser canvas. These are not observed screen frames or browser playback rates.',
  visibleChangeRule:{maximumAbsoluteRGBChannelDeltaOver:3,changedPixelFractionOver:.002},
  integrity:{complete:true,decodedFrames:frameCount,rawFrameBlocks:frameCount,showinfoFrames:timestamps.length,
   originalPacketFrames:packets.length,originalFramePts:originalFrames.length,originalPtsMatched:true,
   originalPtsMatchRule:'Exact PTS multiset including duplicates; frameTimeline retains original decoder order and unmodified frame PTS.',
   decoderPtsMatched:true,frameIndicesContiguous:true,sourceUnchanged:true},
  timeBase,firstPts,lastPts:packets.at(-1).pts,endPts,streamStartPts,streamDurationPts,startSeconds:start,endSeconds:end,encodedDurationSeconds:duration,
  presentationDurationSource:'Original [PTS,nextPTS) intervals clipped to the explicit stream start_pts + duration_ts end. All original frames retained; duplicate PTS and at/after-end frames have zero presentation duration. No nominal-FPS inference or extension of the playback window.',
  duplicatePresentationPts:frameCount-new Set(packets.map(p=>p.pts)).size,
  zeroDurationFrames:packets.filter(p=>p.duration===0).length,
  positiveDurationFrames:packets.filter(p=>p.duration>0).length,
  outsidePresentationFrames:packets.filter(p=>p.outsidePresentationWindow).length,
  changeMetricTimeline:'Original-PTS-sorted positive-duration presentation frames; same-PTS group retains its last decoded frame. Raw frameTimeline and transitions retain original decoder order and every unmodified PTS, including zero-duration and out-of-window frames.',
  decodedFrames:frameCount,decodedUniqueRGBFrames:unique.size,
  exactAdjacentDuplicates:transitions.filter(t=>t.exactDuplicate).length,
  rawVisibleChanges:transitions.filter(t=>t.visibleChange).length,
  rawVisibleChangesPerEncodedSecond:transitions.filter(t=>t.visibleChange).length/duration,
  visibleChanges:changes.length,visibleChangesPerEncodedSecond:changes.length/duration,
  firstVisibleChangeSeconds:changeTimes[0]??null,lastVisibleChangeSeconds:changeTimes.at(-1)??null,
  leadingHoldSeconds:leadingHold,trailingHoldSeconds:trailingHold,maxVisualHoldMs:ms(maxHold),
  contentGapP95Ms:rgbQuantile(holds.slice(0,-1).map(h=>h.seconds*1000),.95),
  heldIntervalsAtLeast120ms:holds.filter(h=>h.seconds>=.12),
  loopBoundary:{...boundary,lastFrameIndex:lastPresentedIndex,firstFrameIndex:firstPresentedIndex,
   lastFramePts:frameMetadata[lastPresentedIndex].pts,firstFramePts:frameMetadata[firstPresentedIndex].pts,
   lastFrameDurationSeconds:frameMetadata[lastPresentedIndex].duration*tick,
   tailToFirstVisibleChangeSeconds:cyclicChanges.length?(boundary.visibleChange?trailingHold:trailingHold+leadingHold):null,
   cyclicVisibleChanges:cyclicChanges.length,cyclicVisibleChangesPerSecond:cyclicChanges.length/duration,
   cyclicMaxHoldMs:cyclicGaps.length?ms(Math.max(...cyclicGaps)):null,
   cyclicGapP95Ms:rgbQuantile(cyclicGaps.map(g=>g*1000),.95),noVisibleChanges:cyclicChanges.length===0},
  rawLoopBoundary,perSecond,frameTimeline,presentationOrder:presentationOrder.map(frame=>frame.index),
  presentationOrderRule:'Complete original frame-index permutation sorted by unmodified original PTS, then decoder index; no frame removal.',
  transitions,presentationTransitions
 };
}
export function inspectPreviewFile(file,{profile='gray'}={}){
 if(!['gray','rgb'].includes(profile))throw new Error('Unknown media profile '+profile);
 const probe=JSON.parse(run('ffprobe',['-v','error','-threads','1','-select_streams','v:0','-show_entries',
  'stream=codec_name,codec_tag_string,profile,level,width,height,pix_fmt,color_range,r_frame_rate,avg_frame_rate,time_base,duration,nb_frames,bit_rate:format=duration,size,bit_rate','-of','json',file]).stdout);
 if(!probe.streams[0])throw new Error('No video stream: '+file);
 const stream={...probe.streams[0]};
 if(!stream.duration&&probe.format?.duration)stream.duration=probe.format.duration;
 return {probe,analysis:profile==='rgb'?inspectRGBFrames(file,stream):inspectFrames(file,stream)};
}
async function main(){
const options={root:'web',analyze:[],out:null,profile:'gray'};
for(let i=2;i<process.argv.length;i++){
 const arg=process.argv[i];
 if(arg==='--root')options.root=process.argv[++i];
 else if(arg==='--analyze')options.analyze=(process.argv[++i]||'').split(',').filter(Boolean);
 else if(arg==='--out')options.out=process.argv[++i];
 else if(arg==='--profile')options.profile=process.argv[++i];
 else throw new Error('Unknown argument '+arg);
}
if(!['gray','rgb'].includes(options.profile))throw new Error('Unknown media profile '+options.profile);
const mediaRoot=contained(project,options.root);
const catalogFile=contained(mediaRoot,'candidate-catalog.json'),catalogBytes=await readFile(catalogFile),catalog=JSON.parse(catalogBytes);
if(catalog.schema!=='motion-vault.candidate-catalog.v2')throw new Error('Unexpected candidate catalogue schema');
const unknown=options.analyze.filter(id=>!catalog.items.some(item=>item.id===id));
if(unknown.length)throw new Error('Unknown candidate ids: '+unknown.join(','));
const report={schema:'motion-vault.preview-media-diagnostics.v1',generatedAt:new Date().toISOString(),
 ...(options.profile==='rgb'?{profile:'rgb',analyzerSha256:sha(await readFile(fileURLToPath(import.meta.url)))}:{}),
 root:path.relative(project,mediaRoot).replaceAll(path.sep,'/'),catalogSha256:sha(catalogBytes),
 mainHtmlSha256:sha(await readFile(contained(mediaRoot,'index.html'))),
 method:{metadata:'ffprobe stream/format headers, actual bytes/hash and MP4 top-level boxes for each candidate',
  fullDecode:options.profile==='rgb'?'Only explicitly selected --analyze ids; all frames, 96x58 RGB24 bilinear, original integer PTS, no fps filter or sampling':'Only explicitly selected --analyze ids; one decoder/filter thread, reduced grayscale, original timestamps',
  mutation:'No source or media mutation; optional explicit guarded evidence output only'},
 tools:{ffmpeg:run('ffmpeg',['-version']).stdout.split(/\r?\n/,1)[0],ffprobe:run('ffprobe',['-version']).stdout.split(/\r?\n/,1)[0]},
 items:[]};
for(const item of catalog.items){
 if(!item.asset?.video){report.items.push({id:item.id,error:'No video declared'});continue;}
 const file=contained(mediaRoot,item.asset.video),manifestFile=contained(mediaRoot,item.asset.manifest);
 const [bytes,manifestBytes,fileStat]=await Promise.all([readFile(file),readFile(manifestFile),stat(file)]);
 const manifest=JSON.parse(manifestBytes),hash=sha(bytes),mp4Boxes=boxes(bytes);
 const probe=JSON.parse(run('ffprobe',['-v','error','-threads','1','-select_streams','v:0','-show_entries',
  'stream=codec_name,codec_tag_string,profile,level,width,height,pix_fmt,color_range,r_frame_rate,avg_frame_rate,time_base,duration,nb_frames,bit_rate:format=duration,size,bit_rate','-of','json',file]).stdout);
 const stream=probe.streams[0];
 if(!stream)throw new Error('No video stream: '+item.id);
 let oldCapture=null;
 try{oldCapture=await readJSON(contained(project,'lineage/current/capture/'+item.id+'.json'));}
 catch(e){if(e.code!=='ENOENT')throw e;}
 const declaredVideo=path.resolve(path.dirname(manifestFile),manifest.preview?.video||'');
 const moov=mp4Boxes.find(b=>b.type==='moov'),mdat=mp4Boxes.find(b=>b.type==='mdat');
 const row={id:item.id,title:item.title,video:item.asset.video,videoSha256:hash,videoBytes:bytes.length,
  version:item.asset.version,manifestSha256:sha(manifestBytes),modifiedAt:fileStat.mtime.toISOString(),
  matches:{catalogManifestVersion:item.asset.version===manifest.version,
   captureImplementationVersion:manifest.preview?.implementationVersion===manifest.version,
   previewVideoPath:declaredVideo===file,manifestVideoHash:manifest.preview?.videoSha256===hash,
   manifestVideoBytes:manifest.preview?.videoBytes===bytes.length},
  stream,format:probe.format,mp4:{boxes:mp4Boxes,fastStart:Boolean(moov&&mdat&&moov.offset<mdat.offset)},
  historicalCapture:oldCapture&&{version:oldCapture.version,versionMatches:oldCapture.version===item.asset.version,
   capturedJpegFrames:oldCapture.frames,distinctJpegHashes:oldCapture.distinct,
   recordedVideoBytes:oldCapture.videoBytes,recordedVideoBytesMatches:oldCapture.videoBytes===bytes.length,
   reportedDurationSeconds:Number(oldCapture.probe?.format?.duration),actions:oldCapture.actions,
   caveat:'Distinct JPEG hashes are capture evidence; they are not the encoded visual frame rate.'}};
 if(options.analyze.includes(item.id)){
  row.decodedAnalysis=options.profile==='rgb'?inspectRGBFrames(file,stream):inspectFrames(file,stream);
  if(options.profile==='rgb'&&row.decodedAnalysis.mediaSha256!==hash)throw new Error('RGB analysis media identity differs from report: '+item.id);
 }
 report.items.push(row);
 console.log(JSON.stringify({id:row.id,codec:stream.codec_name,size:[stream.width,stream.height],fps:stream.avg_frame_rate,
  duration:stream.duration,versionAndHashMatch:Object.values(row.matches).every(Boolean),fastStart:row.mp4.fastStart,
  ...(row.decodedAnalysis?{visibleChanges:row.decodedAnalysis.visibleChanges,visibleChangesPerSecond:row.decodedAnalysis.visibleChangesPerEncodedSecond,holds:row.decodedAnalysis.heldIntervalsAtLeast120ms}: {})}));
}
if(options.profile==='rgb'&&sha(await readFile(fileURLToPath(import.meta.url)))!==report.analyzerSha256)
 throw new Error('RGB analyzer changed during the report');
report.summary={candidates:report.items.length,metadataInspected:report.items.filter(x=>x.stream).length,
 versionsAndHashesMatch:report.items.every(x=>x.matches&&Object.values(x.matches).every(Boolean)),
 fastStartCount:report.items.filter(x=>x.mp4?.fastStart).length,decodedIds:report.items.filter(x=>x.decodedAnalysis).map(x=>x.id)};
if(options.out){
 const out=contained(project,options.out),relative=path.relative(project,out).replaceAll(path.sep,'/');
 if(!relative.startsWith('lineage/current/preview-playback/')||!relative.endsWith('.json'))throw new Error('Output must be JSON in lineage/current/preview-playback');
 await guard(relative,'evidence');await put(project,relative,JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({saved:relative,summary:report.summary}));
}else console.log(JSON.stringify(report,null,2));
}
if(path.resolve(process.argv[1]||'')===fileURLToPath(import.meta.url))await main();
