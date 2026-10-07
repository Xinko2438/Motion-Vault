// Bounded maintenance for the currently published Motion Vault. Never touches personal browser profiles.
import {readFile,writeFile,readdir,lstat,rm,unlink,rmdir,open} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {project,root,sha,put,exists} from './build-hybrid.mjs';

async function previewPlaybackMaintenance(){
 const args=process.argv.slice(3),apply=args.includes('--apply'),expectArgs=args.filter(a=>a.startsWith('--expect-plan-sha256='));
 if(args.some(a=>a!=='--apply'&&!/^--expect-plan-sha256=[a-f0-9]{64}$/.test(a))||new Set(args).size!==args.length||expectArgs.length>1)throw new Error('Use --preview-playback [--apply --expect-plan-sha256=<dry-run hash>]');
 const expectedPlan=expectArgs[0]?.split('=')[1];
 if(apply&&!expectedPlan)throw new Error('Run --preview-playback first; --apply requires its --expect-plan-sha256');
 const base='.runtime/preview-playback',lineage='lineage/current/preview-playback',lockRel=base+'/capture-active.json';
 const pinned=new Map(),skipped=[],targets=[],runs=[],trials=[],compatibilityBatches=[],restorationBatches=[],gateBatches=[],directories=new Set(),hex=/^[a-f0-9]{64}$/;
 const meta=s=>({path:s.path,sha256:s.sha256,bytes:s.bytes});
 async function safeStat(relative,optional=false){
  if(relative.includes('\\')||relative.split('/').some(p=>!p||p==='.'||p==='..')||path.isAbsolute(relative))throw new Error('Unsafe cleanup path: '+relative);
  const parts=relative.split('/');let target=project;
  for(let i=0;i<parts.length;i++){
   target=path.join(target,parts[i]);let s;
   try{s=await lstat(target);}catch(e){if(optional&&e.code==='ENOENT')return null;throw e;}
   if(s.isSymbolicLink()||(i<parts.length-1&&!s.isDirectory()))throw new Error('Cleanup refuses a linked or non-directory parent: '+relative);
   if(i===parts.length-1)return s;
  }
 }
 async function snapshot(relative,{optional=false,pin=false}={}){
  const first=await safeStat(relative,optional);if(!first)return null;
  if(!first.isFile())throw new Error('Cleanup requires a regular file: '+relative);
  const data=await readFile(path.join(project,relative)),last=await safeStat(relative);
  if(!last.isFile()||first.size!==last.size||first.mtimeMs!==last.mtimeMs||data.length!==last.size)throw new Error('File changed while reading: '+relative);
  const s={path:relative,bytes:data.length,sha256:sha(data),data};
  if(pin)pinned.set(relative,meta(s));return s;
 }
 async function json(relative,optional=false){
  const s=await snapshot(relative,{optional,pin:true});return s&&{...meta(s),value:JSON.parse(s.data.toString('utf8'))};
 }
 async function list(relative){
  const s=await safeStat(relative,true);if(!s)return [];
  if(!s.isDirectory())throw new Error('Cleanup requires a real directory: '+relative);
  return (await readdir(path.join(project,relative),{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name));
 }
 async function captureLock(relative=lockRel){
  const s=await snapshot(relative,{optional:true});if(!s)return null;
  let owner;try{const v=JSON.parse(s.data.toString('utf8'));owner={runId:v.runId??null,pid:v.pid??null,startedAt:v.startedAt??null,purpose:v.purpose??'capture'};}catch{owner={invalidJson:true};}
  return {...meta(s),owner};
 }
 const baseline=await json(lineage+'/before.json'),before=baseline.value,started=Date.parse(before.startedAt||before.runStartedAt);
 if(before.label!=='before'||before.live!==true||before.sourceUnchanged!==true||!before.runId||!Number.isFinite(started)||!hex.test(before.formalHash||''))throw new Error('Missing dated playback baseline');
 const catalogue=await json('candidates/curated-originals/src/catalog.json'),known=new Set(catalogue.value.map(x=>x.id));
 if(known.size!==30)throw new Error('Expected the current 30-candidate input');
 const receiptByRun=new Map(),receiptIssues=new Map();
 for(const entry of await list(lineage)){
  const match=/^capture-(native-[A-Za-z0-9._-]+)\.json$/.exec(entry.name);if(!match)continue;
  const relative=lineage+'/'+entry.name;
  try{
   const source=await json(relative),r=source.value,start=Date.parse(r.startedAt),finish=Date.parse(r.finishedAt);
   if(r.schema!=='motion-vault.native-capture-batch.v1'||r.runId!==match[1]||r.runId.length>80)throw new Error('Unrecognized capture receipt');
   if(!['completed','failed'].includes(r.state)||r.browserClosed!==true)throw new Error('Capture receipt is unfinished or browser closure is unconfirmed');
   if(!Number.isFinite(start)||!Number.isFinite(finish)||start<started||finish<start||finish>Date.now())throw new Error('Capture is outside this playback repair interval');
   if(!Array.isArray(r.ids)||!r.ids.length||r.ids.length>8||new Set(r.ids).size!==r.ids.length||r.ids.some(id=>!known.has(id)))throw new Error('Unrecognized capture IDs');
   if(!Array.isArray(r.reports)||new Set(r.reports.map(x=>x.id)).size!==r.reports.length||r.reports.some(x=>!r.ids.includes(x.id)))throw new Error('Capture report ownership does not match its IDs');
   if(r.state==='completed'&&(r.reports.length!==r.ids.length||r.reports.some(x=>x.passed!==true)))throw new Error('Completed capture receipt is inconsistent');
   receiptByRun.set(r.runId,{receipt:meta(source),value:r});
  }catch(e){receiptIssues.set(match[1],String(e.message));}
 }
 const probeNames=['telescope-native-cdp-100ms.webm','telescope-native-page-raf.webm','telescope-native-page-raf-h264.mp4'],probeByName=new Map();
 try{
  const source=await json(lineage+'/telescope-native-probe.json'),p=source.value;
  if(p.schema!=='motion-vault.native-preview-probe.v1'||p.id!=='curated-telescope'||!Number.isFinite(Date.parse(p.at))||Date.parse(p.at)<started||Date.parse(p.at)>Date.now()||!Array.isArray(p.samples))throw new Error('Probe does not belong to this playback repair');
  for(const name of probeNames.slice(0,2)){
   const sample=p.samples.find(s=>s.file===base+'/'+name);
   if(!sample||!hex.test(sample.videoSha256||'')||!Number.isSafeInteger(sample.bytes)||sample.bytes<=0)throw new Error('Missing original probe identity: '+name);
   probeByName.set(name,{receipt:meta(source),expectedSha256:sample.videoSha256,expectedBytes:sample.bytes,kind:'confirmed_native_probe'});
  }
  // This exact H.264 derivative was identified by its creator in this repair session.
  // It shares the existing RAF probe receipt; its actual bytes are pinned by the reviewed dry-run.
  probeByName.set(probeNames[2],{receipt:meta(source),expectedBytes:920480,kind:'confirmed_raf_h264_probe_derivative'});
 }catch(e){for(const name of probeNames)skipped.push({path:base+'/'+name,reason:String(e.message)});probeByName.clear();}
 async function propose(relative,owner,expectedSha256,expectedBytes){
  try{
   const s=await snapshot(relative);
   if(expectedSha256!==undefined&&(!hex.test(expectedSha256)||s.sha256!==expectedSha256))throw new Error('Media SHA differs from the capture receipt');
   if(expectedBytes!==undefined&&s.bytes!==expectedBytes)throw new Error('Media size differs from the capture receipt');
   targets.push({...meta(s),...owner,identity:expectedSha256?'receipt_and_current_sha256':'receipt_path_and_reviewed_current_sha256'});
  }catch(e){skipped.push({path:relative,reason:String(e.message)});}
 }
 const trialDefinitions=new Map([
  ['vui-depth-20261006-one',{schema:'motion-vault.vui-metadata-trial.v1',files:['trial.mjs','original.mp4','manifest-before.json','modified.mp4','before.framemd5','after.framemd5','receipt.json']}],
  ['bf0-depth-20261006-one',{schema:'motion-vault.bframe-encode-trial.v1',files:['trial.mjs','original.mp4','manifest-before.json','modified.mp4','receipt.json']}],
  ['cfr-depth-20261006-one',{schema:'motion-vault.cfr-grid-trial.v1',files:['trial.mjs','original.mp4','manifest-before.json','modified.mp4','encoding.log','receipt.json']}],
  ['high444-depth-20261006-one',{schema:'motion-vault.high444-encode-trial.v1',files:['trial.mjs','original.mp4','manifest-before.json','modified.mp4','receipt.json']}],
  ['rate50-depth-20261006-one',{schema:'motion-vault.rate50-grid-trial.v1',files:['trial.mjs','original.mp4','manifest-before.json','capture-before.json','modified.mp4','encoding.log','receipt.json']}],
  ['native-direct-depth-20261006-one',{schema:'motion-vault.native-direct-preview-trial.v1',status:'adopted',files:['trial.mjs','original.mp4','manifest-before.json','capture-before.json','modified.mp4','before.framemd5','after.framemd5','receipt.json']}]
 ]);
 const compatRun='high444-compat-20261006-one',restoreRun='restore420-20261006-one',nativeCompatRun='native-direct-compat-20261006-one',gateRun='live-gates-20261006-one';
 const requiredAbsentLocks=[...trialDefinitions.keys(),compatRun,restoreRun,nativeCompatRun,gateRun].map(runId=>base+'/'+runId+'/active.lock').sort();
 for(const entry of await list(base)){
  if(entry.name==='capture-active.json')continue;
  const relative=base+'/'+entry.name;
  if(probeNames.includes(entry.name)){
   const p=probeByName.get(entry.name);if(p)await propose(relative,{kind:p.kind,receipt:p.receipt},p.expectedSha256,p.expectedBytes);continue;
  }
  if(entry.name===compatRun){
   try{
    const source=await json(lineage+'/'+compatRun+'.json'),r=source.value,start=Date.parse(r.startedAt),finish=Date.parse(r.finishedAt),rollback=Date.parse(r.rolledBackAt);
    if(r.schema!=='motion-vault.high444-compatibility-batch.v1'||r.runId!==compatRun||r.status!=='rolled_back'||r.browserUsed!==false||r.sourceRecordingsChanged!==false||r.unmodified24AssetsAndHistoricalBatches!==true||r.rollbackReceipt!==lineage+'/'+restoreRun+'.json')throw new Error('Compatibility batch is not confirmed rolled back');
    if(!Number.isFinite(start)||!Number.isFinite(finish)||!Number.isFinite(rollback)||start<started||finish<start||rollback<finish||rollback>Date.now())throw new Error('Compatibility batch is outside this playback repair interval');
    const ids=['curated-depth','curated-spatial-product','curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'];
    if(!Array.isArray(r.ids)||r.ids.length!==ids.length||new Set(r.ids).size!==ids.length||r.ids.some(id=>!ids.includes(id))||!Array.isArray(r.items)||r.items.length!==ids.length||new Set(r.items.map(x=>x.id)).size!==ids.length)throw new Error('Compatibility batch does not contain the six declared IDs');
    for(const item of r.items){
     if(!ids.includes(item.id)||item.status!=='rolled_back'||item.backup!==relative+'/'+item.id||item.adoptExisting!==(item.id==='curated-depth'))throw new Error('Compatibility item ownership does not match its backup directory');
     if(![item.before?.videoSha256,item.before?.manifestSha256,item.before?.captureSha256,item.after?.videoSha256].every(v=>hex.test(v||'')))throw new Error('Compatibility receipt lacks exact backup identities');
     if(item.adoptExisting&&(item.before.videoSha256!==item.after.videoSha256||item.adoptedTrial!==lineage+'/high444-depth-20261006-one.json'))throw new Error('Depth compatibility item did not adopt the existing trial');
    }
    for(const child of await list(relative)){
     const dir=relative+'/'+child.name;
     if(child.name==='run.mjs'){await propose(dir,{kind:'compatibility_batch_script',runId:compatRun,status:r.status,receipt:meta(source)});continue;}
     const item=r.items.find(x=>x.id===child.name);
     if(!item){if(child.name!=='active.lock')skipped.push({path:dir,reason:'Outside the explicit compatibility batch outputs'});continue;}
     const expected=new Map([['preview-before.mp4',item.before.videoSha256],['manifest-before.json',item.before.manifestSha256],['capture-before.json',item.before.captureSha256]]);
     if(!item.adoptExisting)expected.set('preview-high444.mp4',item.after.videoSha256);
     for(const childFile of await list(dir)){
      const relativeFile=dir+'/'+childFile.name;
      if(!expected.has(childFile.name)){skipped.push({path:relativeFile,reason:'Not a declared compatibility backup or output'});continue;}
      await propose(relativeFile,{kind:'compatibility_batch_cache',runId:compatRun,id:item.id,status:r.status,receipt:meta(source)},expected.get(childFile.name),childFile.name==='preview-high444.mp4'?item.after.videoBytes:undefined);
     }
     directories.add(dir);
    }
    directories.add(relative);compatibilityBatches.push({runId:compatRun,status:r.status,browserUsed:false,itemCount:r.items.length,startedAt:r.startedAt,finishedAt:r.finishedAt,rolledBackAt:r.rolledBackAt,rollbackReceipt:r.rollbackReceipt,receipt:meta(source)});
   }catch(e){skipped.push({path:relative,reason:String(e.message)});}
   continue;
  }
  if(entry.name===nativeCompatRun){
   try{
    const source=await json(lineage+'/'+nativeCompatRun+'.json'),r=source.value,start=Date.parse(r.startedAt),finish=Date.parse(r.completedAt);
    if(r.schema!=='motion-vault.native-direct-compat.v1'||r.runId!==nativeCompatRun||r.status!=='completed'||r.browserUsed!==false||r.encodingPerformed!==false||r.lossless!==true||r.other24Unchanged!==true||r.sourceFilesUnchanged!==true)throw new Error('Native direct compatibility batch is not confirmed complete');
    if(!Number.isFinite(start)||!Number.isFinite(finish)||start<started||finish<start||finish>Date.now())throw new Error('Native direct batch is outside this playback repair interval');
    const ids=['curated-depth','curated-spatial-product','curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'];
    if(!Array.isArray(r.ids)||r.ids.length!==ids.length||new Set(r.ids).size!==ids.length||r.ids.some(id=>!ids.includes(id))||!Array.isArray(r.items)||r.items.length!==ids.length||new Set(r.items.map(x=>x.id)).size!==ids.length)throw new Error('Native direct batch does not contain the six declared IDs');
    for(const item of r.items){
     if(!ids.includes(item.id)||item.status!=='applied'||item.sourceUnchanged!==true||item.posterUnchanged!==true||item.videoRewritten!==(item.id!=='curated-depth'))throw new Error('Native direct item is not confirmed applied');
     if(![item.before?.videoSha256,item.before?.manifestSha256,item.before?.captureSha256,item.after?.videoSha256,item.native?.sha256].every(v=>hex.test(v||''))||item.after.videoSha256!==item.native.sha256)throw new Error('Native direct receipt lacks exact historical identities');
    }
    if(![r.captureScript?.before,r.captureScript?.after].every(v=>hex.test(v||''))||r.captureScript.syntaxPassed!==true)throw new Error('Native direct capture-script identities are missing');
    const depthWrite=r.writes?.find(x=>x.file===lineage+'/native-direct-depth-20261006-one.json');
    if(!depthWrite||depthWrite.backup!==relative+'/depth-trial-before.json'||!hex.test(depthWrite.before||'')||!hex.test(depthWrite.after||''))throw new Error('Adopted depth trial backup identity is missing');
    const depth=await json(depthWrite.file);
    if(depth.sha256!==depthWrite.after||depth.value.status!=='adopted'||depth.value.adoptedBy!==nativeCompatRun)throw new Error('Depth adoption receipt does not match the completed batch');
    const rootFiles=new Map([['run.mjs',undefined],['capture-before.mjs',r.captureScript.before],['capture-next.mjs',r.captureScript.after],['depth-trial-before.json',depthWrite.before],['receipt.json',source.sha256]]);
    for(const child of await list(relative)){
     const dir=relative+'/'+child.name;
     if(rootFiles.has(child.name)){await propose(dir,{kind:'native_direct_batch_script_or_receipt',runId:nativeCompatRun,status:r.status,receipt:meta(source)},rootFiles.get(child.name));continue;}
     const item=r.items.find(x=>x.id===child.name);
     if(!item){if(child.name!=='active.lock')skipped.push({path:dir,reason:'Outside the explicit native direct batch outputs'});continue;}
     const expected=new Map([['preview-before.mp4',item.before.videoSha256],['manifest-before.json',item.before.manifestSha256],['capture-before.json',item.before.captureSha256]]);
     for(const childFile of await list(dir)){
      const relativeFile=dir+'/'+childFile.name;
      if(!expected.has(childFile.name)){skipped.push({path:relativeFile,reason:'Not a declared native direct backup'});continue;}
      await propose(relativeFile,{kind:'native_direct_batch_backup',runId:nativeCompatRun,id:item.id,status:r.status,receipt:meta(source)},expected.get(childFile.name));
     }
     directories.add(dir);
    }
    directories.add(relative);compatibilityBatches.push({runId:nativeCompatRun,status:r.status,browserUsed:false,encodingPerformed:false,itemCount:r.items.length,startedAt:r.startedAt,completedAt:r.completedAt,receipt:meta(source)});
   }catch(e){skipped.push({path:relative,reason:String(e.message)});}
   continue;
  }
  if(entry.name===gateRun){
   try{
    const source=await json(lineage+'/'+gateRun+'.json'),r=source.value,start=Date.parse(r.startedAt),finish=Date.parse(r.finishedAt);
    if(r.schema!=='motion-vault.live-gate-batch.v1'||r.runId!==gateRun||!['completed','failed'].includes(r.state)||r.live!==true||r.maxParallel!==3||r.childProcessesClosed!==true)throw new Error('Live gate batch is not finished and closed');
    if(!Number.isFinite(start)||!Number.isFinite(finish)||start<started||finish<start||finish>Date.now()||![r.formalHash,r.redirectSha256,r.runnerSha256].every(v=>hex.test(v||'')))throw new Error('Live gate batch timing or identities are invalid');
    const jobs=new Map([
     ['hover-normal',{args:['src/hybrid/test-hover-intent.mjs','normal','--live'],report:'lineage/current/live-no-preference.json'}],
     ['hover-reduced',{args:['src/hybrid/test-hover-intent.mjs','reduced','--live'],report:'lineage/current/live-reduce.json'}],
     ['sandbox',{args:['src/hybrid/verify-candidate-sandbox.mjs','--live'],report:'lineage/current/sandbox-live.json'}],
     ['candidates',{args:['src/hybrid/verify-candidates-current.mjs','--live'],report:'lineage/current/live-candidate-validation.json'}],
     ['current',{args:['src/hybrid/verify-current.mjs','--live'],report:'lineage/current/consolidation-check.json'}]
    ]);
    if(!Array.isArray(r.items)||r.items.length!==jobs.size||new Set(r.items.map(x=>x.id)).size!==jobs.size)throw new Error('Live gate receipt must contain exactly five jobs');
    const expected=new Map([['run.mjs',r.runnerSha256],['runner.log',undefined],['receipt.json',source.sha256]]);
    for(const item of r.items){
     const job=jobs.get(item.id);
     if(!job||JSON.stringify(item.args)!==JSON.stringify(job.args)||item.report!==job.report||!['passed','failed'].includes(item.state)||item.childClosed!==true||(!Number.isInteger(item.exitCode)&&!(item.exitCode===null&&item.error))||item.log?.path!==relative+'/'+item.id+'.log'||!hex.test(item.log?.sha256||'')||!Number.isSafeInteger(item.log?.bytes)||item.log.bytes<0)throw new Error('Live gate job or log identity is inconsistent');
     expected.set(item.id+'.log',item.log.sha256);
    }
    const localReceipt=await snapshot(relative+'/receipt.json');if(localReceipt.sha256!==source.sha256)throw new Error('Live gate runtime receipt differs from retained lineage evidence');
    for(const child of await list(relative)){
     const fileRel=relative+'/'+child.name;
     if(!expected.has(child.name)){if(child.name!=='active.lock')skipped.push({path:fileRel,reason:'Outside the exact live gate runner file list'});continue;}
     await propose(fileRel,{kind:'live_gate_runner_cache',runId:gateRun,state:r.state,receipt:meta(source)},expected.get(child.name),r.items.find(x=>x.id+'.log'===child.name)?.log.bytes);
    }
    directories.add(relative);gateBatches.push({runId:gateRun,state:r.state,childProcessesClosed:true,itemCount:r.items.length,startedAt:r.startedAt,finishedAt:r.finishedAt,receipt:meta(source)});
   }catch(e){skipped.push({path:relative,reason:String(e.message)});}
   continue;
  }
  if(entry.name===restoreRun){
   try{
    const source=await json(lineage+'/'+restoreRun+'.json'),r=source.value,start=Date.parse(r.at),finish=Date.parse(r.completedAt);
    if(r.schema!=='motion-vault.restore-standard-preview-encoding.v1'||r.runId!==restoreRun||r.status!=='completed'||r.browserUsed!==false||r.encoded!==false||r.unmodified24AssetsAndOriginalCaptureBatches!==true)throw new Error('Encoding restoration is not confirmed complete');
    if(!Number.isFinite(start)||!Number.isFinite(finish)||start<started||finish<start||finish>Date.now())throw new Error('Encoding restoration is outside this playback repair interval');
    const ids=['curated-depth','curated-spatial-product','curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'];
    if(!Array.isArray(r.items)||r.items.length!==ids.length||new Set(r.items.map(x=>x.id)).size!==ids.length||r.items.some(x=>!ids.includes(x.id)))throw new Error('Encoding restoration does not contain the six declared IDs');
    for(const item of r.items)if(![item.before?.video,item.before?.manifest,item.before?.capture,item.restored?.video,item.restored?.manifest,item.restored?.capture].every(v=>hex.test(v||''))||!Number.isSafeInteger(item.sourceFilesVerified)||item.sourceFilesVerified<=0)throw new Error('Encoding restoration lacks exact historical identities');
    const rootFiles=new Map([['run.mjs',undefined],['compat-receipt-before.json','9e5a52f951caa0cee173ebc0e956e8391c41b305b216113c5e4e84b7df883d61'],['depth-trial-receipt-before.json','d7884fcbc458db6cfe04fe08edbd76fd60eb20b4bae907c68a1976a9addd1c53']]);
    for(const child of await list(relative)){
     const dir=relative+'/'+child.name;
     if(rootFiles.has(child.name)){await propose(dir,{kind:'restoration_script_or_receipt_backup',runId:restoreRun,status:r.status,receipt:meta(source)},rootFiles.get(child.name));continue;}
     const item=r.items.find(x=>x.id===child.name);
     if(!item){if(child.name!=='active.lock')skipped.push({path:dir,reason:'Outside the explicit encoding restoration outputs'});continue;}
     const expected=new Map([['preview-superseded.mp4',item.before.video],['manifest-superseded.json',item.before.manifest],['capture-superseded.json',item.before.capture]]);
     for(const childFile of await list(dir)){
      const relativeFile=dir+'/'+childFile.name;
      if(!expected.has(childFile.name)){skipped.push({path:relativeFile,reason:'Not a declared superseded encoding backup'});continue;}
      await propose(relativeFile,{kind:'restoration_superseded_cache',runId:restoreRun,id:item.id,status:r.status,receipt:meta(source)},expected.get(childFile.name));
     }
     directories.add(dir);
    }
    directories.add(relative);restorationBatches.push({runId:restoreRun,status:r.status,browserUsed:false,encoded:false,itemCount:r.items.length,at:r.at,completedAt:r.completedAt,receipt:meta(source)});
   }catch(e){skipped.push({path:relative,reason:String(e.message)});}
   continue;
  }
  const trial=trialDefinitions.get(entry.name);
  if(trial){
   try{
    const requiredStatus=trial.status||'rolled_back',finishKey=requiredStatus==='adopted'?'adoptedAt':requiredStatus==='applied'?'appliedAt':'rolledBackAt';
    const source=await json(lineage+'/'+entry.name+'.json'),r=source.value,start=Date.parse(r.at),finish=Date.parse(r[finishKey]);
    if(r.schema!==trial.schema||r.runId!==entry.name||r.id!=='curated-depth'||r.status!==requiredStatus||r.browserUsed!==false||r.sourceRunHashesMatch!==true)throw new Error('Trial is not the confirmed, closed diagnostic');
    if(!Number.isFinite(start)||!Number.isFinite(finish)||start<started||finish<start||finish>Date.now())throw new Error('Trial is outside this playback repair interval');
    if(r.backup?.video!==relative+'/original.mp4'||r.backup?.manifest!==relative+'/manifest-before.json')throw new Error('Trial backup paths do not match the declared directory');
    if(![r.before?.videoSha256,r.before?.manifestSha256,r.after?.videoSha256].every(v=>hex.test(v||'')))throw new Error('Trial receipt lacks exact media/manifest identities');
    if(requiredStatus==='adopted'&&(r.adoptedBy!==nativeCompatRun||r.encoded!==false||r.canonicalCaptureUnchanged!==true||r.stagedBytesEqualNative!==true||r.checks?.exactNativeBytes!==true||r.after.videoSha256!==r.native?.sha256||r.backup.capture!==relative+'/capture-before.json'||r.priorAttempt?.status!=='failed'||!hex.test(r.priorAttempt?.after?.videoSha256||'')||!Number.isFinite(Date.parse(r.appliedAt))||Date.parse(r.appliedAt)>finish))throw new Error('Native direct trial adoption or historical remux identity is inconsistent');
    const localReceipt=await snapshot(relative+'/receipt.json');
    if(localReceipt.sha256!==source.sha256)throw new Error('Runtime trial receipt differs from the retained lineage receipt');
    const expected=new Map([['original.mp4',r.before.videoSha256],['manifest-before.json',r.before.manifestSha256],['modified.mp4',requiredStatus==='adopted'?r.priorAttempt.after.videoSha256:r.after.videoSha256],['receipt.json',source.sha256]]);
    if(trial.files.includes('capture-before.json')){const captureSha=requiredStatus==='adopted'?r.captureReceiptSha256:r.captureReceipt?.sha256;if(!hex.test(captureSha||''))throw new Error('Trial receipt lacks the original capture receipt identity');expected.set('capture-before.json',captureSha);}
    for(const child of await list(relative)){
     const fileRel=relative+'/'+child.name;
     if(!trial.files.includes(child.name)){if(child.name!=='active.lock')skipped.push({path:fileRel,reason:'Outside the explicit closed trial file list'});continue;}
     await propose(fileRel,{kind:r.status+'_trial_cache',runId:r.runId,id:r.id,status:r.status,receipt:meta(source)},expected.get(child.name));
    }
    directories.add(relative);trials.push({runId:r.runId,status:r.status,browserUsed:false,at:r.at,[finishKey]:r[finishKey],receipt:meta(source)});
   }catch(e){skipped.push({path:relative,reason:String(e.message)});}
   continue;
  }
  const owner=receiptByRun.get(entry.name);
  if(!owner){skipped.push({path:relative,reason:receiptIssues.get(entry.name)||'No completed or failed, browser-closed receipt from this repair'});continue;}
  const run=owner.value;
  try{
   const children=await list(relative);directories.add(relative);runs.push({runId:run.runId,state:run.state,browserClosed:true,startedAt:run.startedAt,finishedAt:run.finishedAt,receipt:owner.receipt});
   for(const child of children){
    const dir=relative+'/'+child.name,report=run.reports.find(x=>x.id===child.name);
    if(!report){skipped.push({path:dir,reason:'No matching item report in the capture receipt'});continue;}
    try{
     const files=await list(dir);directories.add(dir);
     for(const file of files){
      const fileRel=dir+'/'+file.name,details={
       'native.mp4':{kind:'native_recording',sha256:report.native?.videoSha256,bytes:report.native?.bytes},
       'preview.mp4':{kind:'h264_transcode',sha256:report.videoSha256,bytes:report.videoBytes},
       'poster.jpg':{kind:'poster',sha256:report.posterSha256}
      }[file.name];
      if(!['native.mp4','preview.mp4','poster.jpg'].includes(file.name)||!details){skipped.push({path:fileRel,reason:'Not one of the three capture cache outputs'});continue;}
      if(run.state==='completed'&&!hex.test(details.sha256||'')){skipped.push({path:fileRel,reason:'Completed receipt lacks this media hash'});continue;}
      await propose(fileRel,{kind:details.kind,runId:run.runId,id:report.id,state:run.state,receipt:owner.receipt},details.sha256,details.bytes);
     }
    }catch(e){skipped.push({path:dir,reason:String(e.message)});}
   }
  }catch(e){skipped.push({path:relative,reason:String(e.message)});}
 }
 targets.sort((a,b)=>a.path.localeCompare(b.path));runs.sort((a,b)=>a.runId.localeCompare(b.runId));
 const sources=[...pinned.values()].sort((a,b)=>a.path.localeCompare(b.path)),scriptSha256=sha(await readFile(new URL(import.meta.url)));
 const plannedDirectories=[...directories].sort((a,b)=>a.localeCompare(b));
 const planSha256=sha(JSON.stringify({schema:'motion-vault.preview-playback-cleanup.v1',scriptSha256,baseline:meta(baseline),sources,targets,plannedDirectories,requiredAbsentLocks}));
 const observedLock=await captureLock(),blocked=observedLock?[{reason:'capture-active.json exists; no deletion is allowed',lock:observedLock}]:[];
 for(const relative of requiredAbsentLocks){const lock=await captureLock(relative);if(lock)blocked.push({reason:'Trial active.lock exists; no deletion is allowed',lock});}
 const report={schema:'motion-vault.preview-playback-cleanup.v1',at:new Date().toISOString(),apply,scope:base,scriptSha256,
  baseline:{...meta(baseline),runId:before.runId,startedAt:before.startedAt||before.runStartedAt},planSha256,ready:blocked.length===0,
  plannedFiles:targets.length,plannedBytes:targets.reduce((n,t)=>n+t.bytes,0),runs,trials,compatibilityBatches,restorationBatches,gateBatches,targets,plannedDirectories,requiredAbsentLocks,blocked,skipped,removed:[],removedDirectories:[]};
 if(!apply){console.log(JSON.stringify(report));return;}
 if(blocked.length||expectedPlan!==planSha256){report.error=blocked.length?'Capture is still active':'The reviewed cleanup plan changed; run a fresh dry-run';process.exitCode=1;console.log(JSON.stringify(report));return;}
 const lockPath=path.join(project,lockRel),nonce=randomUUID(),lockBytes=Buffer.from(JSON.stringify({purpose:'preview-playback-cleanup',pid:process.pid,nonce,startedAt:new Date().toISOString()}));let ownsLock=false;
 try{
  const lock=await open(lockPath,'wx');ownsLock=true;try{await lock.writeFile(lockBytes);}finally{await lock.close();}
  async function assertLock(){const s=await snapshot(lockRel);if(s.sha256!==sha(lockBytes))throw new Error('Cleanup lock ownership changed');for(const relative of requiredAbsentLocks)if(await snapshot(relative,{optional:true}))throw new Error('Trial became active during cleanup: '+relative);}
  await assertLock();
  // Revalidate every evidence and media identity before deleting any file.
  for(const expected of [...sources,...targets]){
   const actual=await snapshot(expected.path);
   if(actual.sha256!==expected.sha256||actual.bytes!==expected.bytes)throw new Error('Cleanup input changed after planning: '+expected.path);
  }
  if(sha(await readFile(new URL(import.meta.url)))!==scriptSha256)throw new Error('Cleanup script changed after planning');
  for(const item of targets){
   await assertLock();const actual=await snapshot(item.path);
   if(actual.sha256!==item.sha256||actual.bytes!==item.bytes)throw new Error('Media changed before deletion: '+item.path);
   await unlink(path.join(project,item.path));report.removed.push({path:item.path,sha256:item.sha256,bytes:item.bytes});
  }
  for(const relative of [...directories].sort((a,b)=>b.split('/').length-a.split('/').length||a.localeCompare(b))){
   await assertLock();const s=await safeStat(relative,true);if(!s)continue;
   if(!s.isDirectory())throw new Error('Cache directory changed type: '+relative);
   try{await rmdir(path.join(project,relative));report.removedDirectories.push(relative);}
   catch(e){if(e.code==='ENOTEMPTY'||e.code==='EEXIST'){report.skipped.push({path:relative,reason:'Directory retained because it is not empty'});}else throw e;}
  }
 }catch(e){report.error=String(e.message);process.exitCode=1;}
 finally{
  if(ownsLock)try{const s=await snapshot(lockRel);if(s.sha256!==sha(lockBytes))throw new Error('Cleanup lock changed; it was retained');await unlink(lockPath);}
  catch(e){report.lockError=String(e.message);process.exitCode=1;}
 }
 report.removedFiles=report.removed.length;report.removedBytes=report.removed.reduce((n,t)=>n+t.bytes,0);report.finishedAt=new Date().toISOString();
 console.log(JSON.stringify(report));
}

if(process.argv[2]==='--preview-playback')await previewPlaybackMaintenance();
else {

const apply=process.argv[2]==='prune';
if(!['audit','prune'].includes(process.argv[2]))throw new Error('Use audit, or prune after explicit project cleanup authorization');
const hub=path.resolve(project,'../media-knowledge-hub');
const evidence=path.join(project,'lineage/current');
const formal=JSON.parse(await readFile(path.join(project,'web/catalog.json'),'utf8'));
const candidates=JSON.parse(await readFile(path.join(project,'web/candidate-catalog.json'),'utf8'));
const receipt=JSON.parse(await readFile(path.join(evidence,'install-receipt.json'),'utf8'));
const html=await readFile(path.join(project,'web/index.html'));
const candidateHTML=await readFile(path.join(project,'candidates/curated-originals/index.html'));
if(sha(html)!==receipt.formalSha256||sha(candidateHTML)!==receipt.candidateSha256||candidates.localReady!==30)throw new Error('Only a complete, published and hash-matched current release may be maintained');
const prep=JSON.parse(await readFile(path.join(evidence,'cleanup-preparation.json'),'utf8'));
const recovery=path.resolve(project,prep.backup);
if(recovery!==path.join(project,'versions/.recovery.zip')||sha(await readFile(recovery))!==prep.backupSha256)throw new Error('The one retained recovery package is missing or changed');

const needed=new Set(['runtime.mjs']);
for(const it of formal.items){
 const manifest=JSON.parse(await readFile(path.join(project,'web',it.asset.manifest),'utf8'));
 for(const name of Object.keys(manifest.shared_hashes||{}))if(name.endsWith('.mjs'))needed.add(path.basename(name));
}
async function filesBelow(dir,prefix=''){
 const out=[];
 for(const entry of await readdir(dir,{withFileTypes:true})){
  const f=path.join(dir,entry.name),rel=prefix?prefix+'/'+entry.name:entry.name;
  const st=await lstat(f);
  if(st.isSymbolicLink())throw new Error('Refuse following links during maintenance');
  if(st.isDirectory())out.push(...await filesBelow(f,rel));else if(st.isFile())out.push({path:rel,bytes:st.size});
 }
 return out;
}
function activeTestBrowsers(){
 const command="@(Get-CimInstance Win32_Process | Where-Object { $_.Name -match '^(chrome|msedge)\\.exe$' -and $_.CommandLine -like '*design-reference-library*.runtime*' } | Select-Object -ExpandProperty CommandLine) | ConvertTo-Json -Compress";
 const value=JSON.parse(execFileSync('powershell.exe',['-NoProfile','-Command',command],{encoding:'utf8',windowsHide:true}).trim()||'[]');
 return (Array.isArray(value)?value:[value]).map(s=>String(s).replaceAll('\\','/').toLowerCase());
}
const active=activeTestBrowsers(),plan=[];
async function propose(owner,relative,reason,regenerable){
 const target=path.resolve(owner,relative);
 if(!target.startsWith(owner+path.sep)||!await exists(target))return;
 const stat=await lstat(target);if(stat.isSymbolicLink())throw new Error('Refuse deleting a linked path');
 if(active.some(s=>s.includes(target.replaceAll('\\','/').toLowerCase())))return;
 const inventory=stat.isDirectory()?await filesBelow(target):[{path:'',bytes:stat.size}];
 plan.push({owner:owner===project?'design-reference-library':owner===root?'staging':'media-knowledge-hub',relative,reason,regenerable,target,files:inventory.length,bytes:inventory.reduce((n,f)=>n+f.bytes,0),hash:stat.isFile()?sha(await readFile(target)):null});
}
// An overlooked old review page is already inside the single recovery archive.
const legacy='candidates/curated-originals/versions';
if(await exists(path.join(project,legacy))){
 execFileSync('python',['-c',"import zipfile,sys;z=zipfile.ZipFile(sys.argv[1]);assert any(n.startswith('candidates/curated-originals/versions/') for n in z.namelist()),'Legacy review was not backed up'",recovery],{windowsHide:true,stdio:'pipe'});
 await propose(project,legacy,'Superseded review page; the active candidate input and page are outside this folder',false);
}
// Remove only content-hash runtime modules absent from every active asset manifest.
for(const [owner,base] of [[project,'web'],[root,''],[hub,'web/standalone'],[hub,'web/public/assets'],[hub,'web/dist/assets']]){
 const folder=path.join(owner,base,'motion-vault-assets/shared');
 if(!await exists(folder))continue;
 for(const entry of await readdir(folder))if(/^runtime\.[a-f0-9]+\.mjs$/.test(entry)&&!needed.has(entry))await propose(owner,path.join(base,'motion-vault-assets/shared',entry),'Obsolete runtime hash, not referenced by the current catalogue',true);
}
const profiles=path.join(project,'.runtime/formal-merge');
if(await exists(profiles))for(const entry of await readdir(profiles,{withFileTypes:true}))if(entry.isDirectory()&&/^browser-\d+$/.test(entry.name))await propose(project,'.runtime/formal-merge/'+entry.name,'Closed, project-created isolated QA browser; no user login profile',true);
// Capture frames are disposable only after the final code/preview contracts have passed.
const verified=JSON.parse(execFileSync(process.execPath,['scripts/query-vault.mjs','verify','--scope','candidates','--json'],{cwd:project,encoding:'utf8',windowsHide:true,maxBuffer:4*1024*1024,timeout:60000}));
if(verified.result.length!==30||!verified.result.every(i=>i.ready))throw new Error('Do not prune capture scratch before all 30 asset contracts pass');
await propose(project,'.runtime/consolidation/recordings','Intermediate screencast frames; verified final clips, posters and capture evidence are retained',true);
const primary=Object.fromEntries(candidates.taxonomy.map(s=>[s.id,{label:s.label,count:0,items:[]}]));
for(const it of candidates.items){const group=primary[it.uses[0].scene];group.count++;group.items.push({id:it.id,title:it.title,task:it.uses[0].task});}
const publicPlan=plan.map(({target,...p})=>p);
await put(evidence,'maintenance-plan.json',JSON.stringify({at:new Date().toISOString(),authorizedBy:'User explicitly requested removal of superseded project versions and continuation of A then B',recovery:prep.backup,targets:publicPlan},null,2));
const removed=[],skipped=[];
if(apply){
 const stillActive=activeTestBrowsers();
 for(const item of plan){
  if(stillActive.some(s=>s.includes(item.target.replaceAll('\\','/').toLowerCase()))){skipped.push({path:item.relative,reason:'Test browser is still running'});continue;}
  if(item.hash&&sha(await readFile(item.target))!==item.hash)throw new Error('File changed since maintenance plan: '+item.relative);
  try{await rm(item.target,{recursive:true,force:false,maxRetries:3,retryDelay:150});removed.push(publicPlan[plan.indexOf(item)]);}catch(e){if(['EBUSY','EPERM','EACCES'].includes(e.code)){skipped.push({path:item.relative,reason:e.code});continue;}throw e;}
 }
}
const report={at:new Date().toISOString(),apply,formalCount:formal.count,candidateCount:candidates.count,localCandidateCount:candidates.localReady,authorSource:candidates.items.filter(i=>i.source_kind==='adapted_author_source').length,independent:candidates.items.filter(i=>i.source_kind==='independent_code').length,primary,plannedTargets:plan.length,plannedFiles:plan.reduce((n,p)=>n+p.files,0),plannedBytes:plan.reduce((n,p)=>n+p.bytes,0),removedTargets:removed.length,removedFiles:removed.reduce((n,p)=>n+p.files,0),removedBytes:removed.reduce((n,p)=>n+p.bytes,0),skipped,recoveryPackages:1,formalSha256:sha(html),candidateSha256:sha(candidateHTML),removed};
await put(evidence,apply?'maintenance-result.json':'maintenance-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({apply,formalCount:report.formalCount,candidatesReady:report.localCandidateCount,authorSource:report.authorSource,independent:report.independent,primary:Object.fromEntries(Object.entries(primary).map(([k,v])=>[k,v.count])),plannedTargets:report.plannedTargets,plannedFiles:report.plannedFiles,plannedBytes:report.plannedBytes,removedTargets:report.removedTargets,removedBytes:report.removedBytes,skipped,recoveryPackages:1}));

}
