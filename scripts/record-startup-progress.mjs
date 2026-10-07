// Current published checkpoint only. This recorder cannot mark technical completion.
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {project,sha} from './build-hybrid.mjs';
const args=process.argv.slice(2),apply=args.length===1&&args[0]==='--apply';
if(args.length&&!apply)throw Error('Usage: node scripts/record-startup-progress.mjs [--apply]');
const expectedMain='1e3cb49eb223593deb9c236c99ca548d72a578e553fd96b8d5b850773d90e199';
const base='lineage/current/preview-playback/',runtime='.runtime/preview-playback/',pins=new Map();
const fixed={
 'lineage/current/install-receipt.json':'53360ae7570a7b7e04de8fd5bc1e72110bd77584a04083e97da9cb1f766dd6d0',
 [base+'startup-cache-prior-state.json']:'5b37ee8b24c3fa5b0f5ec7b51c5e75ed01a7f2c42ded15cf9b6066231b09e999',
 [runtime+'startup-cache-stage-execution.json']:'f21719ad98825536bc35d9eaaa489a49c868afd0f7e31e3ad67d012e6c0a82a4',
 [runtime+'startup-cache-stage-closure.json']:'d5dc3a14256d989534777a221f60c0e65b29311dff51695880df36ef78d2b06a',
 [runtime+'startup-cache-live-execution.json']:'faf25eea76161da259f72bd5f8d19dc13417b923a93655bfeff84e72472b5d6e',
 [runtime+'startup-cache-stage-fixture-execution.json']:'11731e771cf5489a1ebb7869e3beecb69d8461a2f783099a6df20d9c31ae5d6a',
 [base+'startup-cache-stage-fixture.json']:'326beb5e4fe885c880f21ba2f0bdd5178bd80dc2a74bcf90c217e6a7d3f15a91',
 [base+'startup-cache-source-rgb.json']:'5a6fae3603ab8cf52dd45bc1d0c83265f623fb07c6afc9e48797ddfd589c8fd1'
};
function assert(ok,message){if(!ok)throw Error(message);}
async function bytes(file){assert(typeof file==='string'&&!path.isAbsolute(file)&&!file.split(/[\\/]/).includes('..'),'Unsafe evidence path');const data=await readFile(path.join(project,file)),hash=sha(data);assert(!fixed[file]||fixed[file]===hash,'Pinned historical identity changed: '+file);assert(!pins.has(file)||pins.get(file)===hash,'Evidence changed while reading: '+file);pins.set(file,hash);return data;}
const json=async file=>JSON.parse((await bytes(file)).toString('utf8'));
const time=v=>{const n=Date.parse(v);assert(Number.isFinite(n),'Missing evidence time');return n;};
const within=(v,a,b)=>assert(time(v)>=time(a)&&time(v)<=time(b),'Evidence outside execution window');
const identity=(r,file)=>({file,sha256:pins.get(file),at:r.at||r.finishedAt,runId:r.runId,passed:r.passed,total:r.total,formalHash:r.formalHash||r.formalSha256||r.mainHtmlSha256});
const checkPage=(r)=>assert((r.formalHash||r.formalSha256||r.mainHtmlSha256)===expectedMain,'Evidence belongs to another gallery');
function checkCounts(r){const passed=r.passed===true?r.total:r.passed;assert(Number.isInteger(r.total)&&r.total>0&&Number.isInteger(passed)&&passed>=0&&passed<=r.total,'Invalid check totals');const checks=r.checks||r.reports;assert(Array.isArray(checks)&&checks.length===r.total&&checks.every(c=>typeof(c.pass??c.passed)==='boolean')&&checks.filter(c=>c.pass??c.passed).length===passed,'Check rows differ from totals');return {passed,total:r.total,allPassed:passed===r.total};}
const publicationFile='lineage/current/install-receipt.json',publication=await json(publicationFile),publishedAt=publication.at;
assert(publication.runId==='preview-startup-20261007-0435'&&publication.formalSha256===expectedMain&&publication.changedFiles===4&&publication.sync?.verified===true&&publication.sync.checkOnly===true&&publication.applicationCount===1&&publication.canonicalEntry==='motion-vault.html','Expected original-entry publication is missing');
assert(publication.privateReviewPublished===false&&publication.userBrowserDataChanged===false&&publication.hubBusinessDataChanged===false&&publication.serverRestarted===false,'Unexpected publication scope');
assert(sha(await bytes('web/index.html'))===expectedMain,'Published HTML changed');
const redirect=sha(await bytes('candidates/curated-originals/index.html'));
assert(publication.redirectSha256===redirect&&publication.candidateSha256===redirect,'Redirect identity changed');
const plan=await json('lineage/current/publication-file-check.json');
assert(plan.planned.length===4&&plan.planned.every(r=>r.path.endsWith('.html')&&r.hash===expectedMain)&&plan.files.every(r=>r.actual===r.expected),'The four published copies were not HTML-only');
const priorFile=base+'startup-cache-prior-state.json',prior=await json(priorFile);
for(const [file,r]of Object.entries(prior.files))assert(Buffer.byteLength(r.utf8)===r.bytes&&sha(Buffer.from(r.utf8))===r.sha256,'Prior-state bytes changed: '+file);
for(const file of ['lineage/current/completion.json','lineage/current/RESULT.md'])assert(sha(await bytes(file))===prior.files[file].sha256,'Current checkpoint changed since the retained prior state: '+file);
const oldCompletion=JSON.parse(prior.files['lineage/current/completion.json'].utf8);
const projectText=(await bytes('PROJECT.md')).toString(),begin='<!-- AI-NATIVE-PROJECT-CONTROL:BEGIN -->',end='<!-- AI-NATIVE-PROJECT-CONTROL:END -->';
const control=text=>{const a=text.indexOf(begin),b=text.indexOf(end);assert(a>=0&&b>a,'Managed project block missing');return text.slice(a,b+end.length);};
assert(control(projectText)===control(prior.files['PROJECT.md'].utf8),'Managed user acceptance metadata changed');
const catalog=await json('web/candidate-catalog.json'),formal=await json('web/catalog.json'),baseline=await json(base+'startup-baseline-20261007.json');
assert(formal.items.length===60&&catalog.items.length===30&&baseline.assets.length===30&&baseline.catalogueHash===pins.get('web/candidate-catalog.json'),'Retained catalogue changed');
const media=[];
for(const item of catalog.items){const old=baseline.assets.find(x=>x.id===item.id),actual=sha(await bytes('web/'+item.asset.video));assert(old&&old.video===item.asset.video&&old.sha256===actual&&old.videoRevision===item.asset.videoRevision&&item.asset.videoRevision===actual.slice(0,16),'Source media changed: '+item.id);media.push({id:item.id,video:item.asset.video,sha256:actual,videoRevision:item.asset.videoRevision});}
assert(new Set(media.map(m=>m.id)).size===30,'Duplicate media identities');
const sourceFile=base+'startup-cache-source-rgb.json',source=await json(sourceFile);
assert(source.mainHtmlSha256===expectedMain&&source.catalogSha256===pins.get('web/candidate-catalog.json')&&source.analyzerSha256===sha(await bytes('src/hybrid/diagnose-preview-media.mjs'))&&source.profile==='rgb'&&source.summary?.versionsAndHashesMatch===true&&source.items.length===30,'Source RGB identity changed');
for(const m of media){const r=source.items.find(x=>x.id===m.id),i=r?.decodedAnalysis?.integrity;assert(r?.videoSha256===m.sha256&&r.decodedAnalysis.mediaSha256===m.sha256&&i?.complete===true&&i.originalPtsMatched===true&&i.decoderPtsMatched===true,'Incomplete source RGB identity: '+m.id);}
const historical=[];
async function retainedExecution(file,status){const r=await json(file);checkPage(r);assert(r.status===status,'Historical execution status changed');const reports=[];for(const t of r.tasks){if(!t.report)continue;const report=await json(t.report.path);assert(pins.get(t.report.path)===t.report.sha256,'Historical child report changed');checkPage(report);if(report.checks||report.reports)checkCounts(report);reports.push({...identity(report,t.report.path),failures:(report.checks||[]).filter(c=>!(c.pass??c.passed)),historical:true,promotedToGate:false});}historical.push({...identity(r,file),status:r.status,reports,historical:true});return r;}
await retainedExecution(runtime+'startup-cache-stage-execution.json','failed');
const closure=await retainedExecution(runtime+'startup-cache-stage-closure.json','completed');
assert(time(closure.finishedAt)<time(publishedAt),'Original stage closure must remain before publication');
const failedLive=await retainedExecution(runtime+'startup-cache-live-execution.json','failed');
const failedFixture=await retainedExecution(runtime+'startup-cache-stage-fixture-execution.json','failed');
assert(time(failedLive.startedAt)>=time(publishedAt)&&time(failedFixture.startedAt)>=time(publishedAt),'Fault checks must retain their post-publication times');
const fixtureFile=base+'startup-cache-stage-fixture.json',fixture=await json(fixtureFile);
assert(fixture.passed===35&&fixture.total===40&&fixture.allPassed===false&&fixture.sourceUnchanged===true,'The corrected fixture failure must not be promoted');
const a=fixture.scenarios.find(s=>s.name==='A'),hold=fixture.interceptions.find(r=>r.phase==='A'&&r.id==='curated-reaction-diffusion'&&r.decision==='held');
assert(a&&a.frame.firstFrameMs>=800&&a.frame.firstFrameMs.toFixed(1)==='1259.8'&&new URL(a.frame.source).protocol==='http:'&&hold?.timingValid===true&&hold.actualHoldMs>=1000&&hold.actualHoldMs<=1250,'Do not erase the valid-injection cold startup failure');
const beforeTasks=a.before.preparationAudit.tasks,afterTasks=a.after.preparationAudit.tasks;
const water=beforeTasks.find(t=>t.role==='product'&&t.url.includes('/curated-stylized-water/'));
const waterEnd=afterTasks.find(t=>t.sequence===water?.sequence&&t.url===water?.url)||water;
const reactionBefore=beforeTasks.filter(t=>t.role==='product'&&t.url.includes('/curated-reaction-diffusion/'));
assert(water&&water.startedAt<a.frame.hoverAt&&(water.endedAt===null||water.endedAt>a.frame.hoverAt)&&reactionBefore.length===0,'Observed single-slot preparation blocking evidence is missing');
const coldFailure={file:fixtureFile,sha256:pins.get(fixtureFile),scenario:'A',firstFrameMs:a.frame.firstFrameMs,source:a.frame.source,hoverAt:a.frame.hoverAt,createdAt:a.frame.createdAt,firstAt:a.frame.firstAt,hold:{actualHoldMs:hold.actualHoldMs,timingValid:hold.timingValid,documentId:hold.documentId},observedQueueBoundary:{singleBackgroundSlot:true,waterBefore:water,waterAfter:waterEnd,reactionPreparationStartedBeforeHover:false},underlyingWaterDelayCause:'unconfirmed'};
const invalidHolds=fixture.interceptions.filter(r=>r.decision==='held'&&r.timingValid===false).map(r=>({phase:r.phase,id:r.id,documentId:r.documentId,actualHoldMs:r.actualHoldMs,timingValid:r.timingValid}));
assert(invalidHolds.length>0,'Separate controller timing failures must be retained');
const executionFile=runtime+'startup-cache-live-rest-execution.json',execution=await json(executionFile);
assert(execution.schema==='motion-vault.startup-validation-execution.v1'&&execution.phase==='live'&&execution.attempt==='live-rest'&&['completed','failed'].includes(execution.status)&&execution.mainHtmlSha256===expectedMain,'Normal live tasks have not reached a terminal checkpoint');
assert(execution.runnerSha256==='803ad585f332af49fe6f879b685450c39b8d4b54f365f774b85fca8a83a59541'&&execution.runnerSha256===sha(await bytes(runtime+'startup-cache-validation.mjs')),'Normal live runner changed');
assert(execution.publication?.sha256===pins.get(publicationFile)&&execution.publication.runId===publication.runId&&execution.priorLiveFailure?.sha256===fixed[runtime+'startup-cache-live-execution.json']&&execution.priorLiveFailure.promotedToGate===false,'Live checkpoint lost publication/failure identity');
assert(execution.startupGateDeferred?.report===fixtureFile&&execution.startupGateDeferred.sha256===pins.get(fixtureFile),'The deferred startup gate must remain explicit');
const specifications=[
 ['playback-30',['src/hybrid/verify-preview-playback.mjs','--source-report','startup-cache-source-rgb','--label','startup-cache-live-30']],
 ['long-loops',['src/hybrid/verify-preview-playback.mjs','--source-report','startup-cache-source-rgb','--label','startup-cache-live-loops','--sample-ms','22000','--require-loops','3','--ids','curated-image-in-type,curated-cylinder-type,curated-shape-ascii,curated-webgpu-route']],
 ['candidate-validation',['src/hybrid/verify-candidates-current.mjs','--live']],
 ['candidate-sandbox',['src/hybrid/verify-candidate-sandbox.mjs','--live']],
 ['normal-hover',['src/hybrid/test-hover-intent.mjs','normal','--live']],
 ['reduced-hover',['src/hybrid/test-hover-intent.mjs','reduced','--live']],
 ['consolidation',['src/hybrid/verify-current.mjs','--live']],
 ['source-journeys',['src/hybrid/verify-candidate-journeys.mjs','--live']],
 ['gallery-journeys',['src/hybrid/verify-candidate-journeys.mjs','--gallery-sandbox','--live']],
 ['project-tests',['--test','--test-reporter=tap','tests/gallery.test.mjs']],
 ['sync-check',['scripts/sync-gallery.mjs','--check']]
];
assert(execution.tasks.length>0&&execution.tasks.length<=11&&execution.tasks.every((t,i)=>t.name===specifications[i][0]),'Normal task sequence changed');
assert(execution.status!=='completed'||execution.tasks.length===11,'A completed normal run must contain eleven tasks');
let previous=execution.startedAt;assert(time(previous)>=time(publishedAt),'Live tasks predate publication');const currentChecks=[];
for(const [index,t]of execution.tasks.entries()){
 assert(JSON.stringify(t.args)===JSON.stringify(specifications[index][1])&&t.scriptSha256===sha(await bytes(t.script))&&t.sourceUnchanged===true,'Measured live script or invocation changed: '+t.name);
 within(t.startedAt,previous,execution.finishedAt);within(t.finishedAt,t.startedAt,execution.finishedAt);previous=t.finishedAt;
 assert(['passed','failed'].includes(t.status)&&typeof t.stdout==='string'&&typeof t.stderr==='string','Unfinished normal task');
 if(t.status==='passed')assert(t.exitCode===0&&t.signal===null&&t.error===null,'False passed execution');
 else assert(execution.status==='failed'&&index===execution.tasks.length-1,'Failed task cannot be hidden by later tasks');
 let summary={name:t.name,status:t.status,startedAt:t.startedAt,finishedAt:t.finishedAt,exitCode:t.exitCode,scriptSha256:t.scriptSha256};
 if(t.report){const r=await json(t.report.path);assert(pins.get(t.report.path)===t.report.sha256,'Live report changed');checkPage(r);within(r.at,t.startedAt,t.finishedAt);const result=checkCounts(r);if(t.status==='passed')assert(result.allPassed,'Task report failed despite exit success');summary={...summary,...identity(r,t.report.path),...result};
  if(t.name==='playback-30'||t.name==='long-loops'){
   assert(r.live===true&&r.sourceUnchanged===true&&r.verifierHash===t.scriptSha256&&r.diagnosticOnly===false&&r.control===null&&Array.isArray(r.playbackControlMappings)&&r.playbackControlMappings.length===0,'Diagnostics cannot replace normal playback');
   assert(r.sourceMediaEvidence?.sha256===pins.get(sourceFile)&&r.sourceMediaEvidence.path===sourceFile,'Source RGB report identity changed');
   const selected=t.name==='playback-30'?media:media.filter(m=>['curated-image-in-type','curated-cylinder-type','curated-shape-ascii','curated-webgpu-route'].includes(m.id));
   assert(r.assets.length===selected.length&&r.samples.length===selected.length&&new Set(r.samples.map(x=>x.id)).size===selected.length,'Incomplete playback coverage');
   for(const m of selected){const asset=r.assets.find(x=>x.id===m.id),sample=r.samples.find(x=>x.id===m.id),url='http://127.0.0.1:4380/app/assets/'+m.video+'?v='+m.videoRevision;assert(asset?.sha256===m.sha256&&sample?.canonicalMediaURL===url&&sample.playbackMediaSha256===m.sha256&&sample.servedMediaSha256===m.sha256,'Actual playback/canonical/asset identity mismatch');}
   summary.samples=r.samples.map(x=>({id:x.id,firstFrameMs:x.firstFrameMs,presentedFps:x.presentedFps,dropRatio:x.dropRatio,loops:x.loops,actualPixelChange:x.actualPixelChange?.changed}));
  }
 }else if(t.name.includes('journeys')){
  const end=JSON.parse(t.stdout.trim().split(/\r?\n/).at(-1)),r=await json(end.report);checkPage(r);within(r.at,t.startedAt,t.finishedAt);const result=checkCounts(r);assert(r.sourceUnchanged===true&&r.verifierSha256===t.scriptSha256&&r.live===true&&end.runId===r.runId&&end.browserClosed===true,'Journey identity changed');if(t.status==='passed')assert(result.allPassed,'Journey checks failed');summary={...summary,...identity(r,end.report),...result};
 }else if(t.name==='project-tests'&&t.status==='passed'){
  const count=key=>Number(t.stdout.match(new RegExp('(?:^|\\n)# '+key+' (\\d+)(?:\\r?\\n|$)'))?.[1]??NaN);
  assert(count('pass')===count('tests')&&count('tests')>=18&&count('fail')===0&&count('skipped')===0&&count('cancelled')===0&&count('todo')===0,'Current project tests are incomplete');summary={...summary,passed:count('pass'),total:count('tests'),stdoutSha256:sha(t.stdout)};
 }else if(t.name==='sync-check'&&t.status==='passed'){
  const r=JSON.parse(t.stdout);assert(r.verified===true&&r.checkOnly===true&&r.formalSha256===expectedMain&&r.candidateSha256===redirect&&r.publicCatalogueSha256===pins.get('web/catalog.json'),'Synchronization does not match this publication');summary={...summary,assetFiles:r.assetFiles,copyChecks:r.copyChecks,httpChecks:r.httpChecks,stdoutSha256:sha(t.stdout)};
 }
 currentChecks.push(summary);
}
const allNormalPassed=execution.status==='completed'&&currentChecks.length===11&&currentChecks.every(x=>x.status==='passed');
const at=new Date().toISOString(),scriptSha256=sha(await bytes('scripts/record-startup-progress.mjs'));
const checkpoint={at,status:'published_with_warnings',mode:'preview-startup-progress',allTechnicalGatesPassed:false,finalizationBlocked:true,userTaskComplete:false,
 interface:{entry:'motion-vault.html',legacyEndpoint:'motion-vault-candidates.html',singlePage:true},counts:{formal:60,candidates:30},formalHash:expectedMain,redirectSha256:redirect,candidateHash:redirect,
 publication:{...identity(publication,publicationFile),at:publishedAt,runId:publication.runId,changedFiles:4,changedFileKind:'HTML copies',productChanged:true,mediaChanged:false,newPublicationByRecorder:false},
 priorState:identity(prior,priorFile),sourceRGB:{file:sourceFile,sha256:pins.get(sourceFile),analyzerSha256:source.analyzerSha256},unchangedMedia:media,
 historicalEvidence:historical,normalLive:{...identity(execution,executionFile),status:execution.status,runnerSha256:execution.runnerSha256,checkedTasks:currentChecks.length,expectedTasks:11,allNormalPassed,startupGateDeferred:execution.startupGateDeferred,checks:currentChecks},
 warnings:{startupFixtureStillFailed:true,coldFailure,controllerInvalidHolds:invalidHolds,firstStageNineDropFailuresCause:'unconfirmed',nextAction:'Continue the authorized startup repair; a prototype is not the deployed product and requires its own evidence.'},
 cleanup:{...oldCompletion.cleanup,historical:true},managedControlBlockUnchanged:true,sourceVisualAcceptance:'not_claimed',userApprovalOfCandidates:'not_claimed',businessDataChanged:false,userBrowserDataChanged:false,
 recorder:{file:'scripts/record-startup-progress.mjs',sha256:scriptSha256,permitsTechnicalCompletion:false}};
const url='http://127.0.0.1:4380/app/assets/motion-vault.html';
const rows=currentChecks.map(x=>'| '+x.name+' | '+(x.total!==undefined?x.passed+' / '+x.total:x.status)+' |');
const result=[
 '# Motion Vault 当前发布检查点','',
 '记录时间：'+at+'。状态为 published_with_warnings。本轮已修改画廊媒体准备代码，并于 '+publishedAt+' 原址发布 4 份 HTML 副本；30 份预览媒体字节未改。启动故障门禁未通过，技术完成仍被阻断，用户任务继续处理。','',
 '唯一完整入口：'+url+'。原正式 60 项、新增待审 30 项及原个人存储状态继续保留，未新增用户版本或页面入口。','',
 '正常 live 检查：已完成 '+currentChecks.length+' / 11 项任务，'+(allNormalPassed?'这十一项全部通过。':'存在失败或尚未执行的任务，见执行回执。')+' 这组明确延后了启动故障门禁，不能单独证明全部启动问题已解决。','',
 '| 正常 live 任务 | 结果 |','|---|---:|',...rows,'',
 '启动故障证据仍为原 live 36/38、修正注入规则后的 stage 35/40。A 场景首帧 '+coldFailure.firstFrameMs.toFixed(1)+' ms，未满足原 <800 ms 门槛；该次 Reaction 注入 '+hold.actualHoldMs.toFixed(3)+' ms，保真有效，实际使用 HTTP 冷加载，不能因其他注入超时而抹掉这次产品路径失败。','',
 '已观察到 Water 的响应体读取占用唯一后台准备槽时，Reaction 尚未开始准备，并在用户悬停后走冷加载。这个队列阻塞边界有实际时序支持；Water 底层响应体等待为何变慢尚未确证。另有 '+invalidHolds.length+' 次注入控制器超出 1000–1250 ms 保真范围，独立列为测试控制器问题，不与 A 的有效注入失败混为一谈。','',
 '首次 stage 178/187 的九项持续掉帧失败保留，原因仍未确证；预先声明的后续完整序列为 187/187。发布前旧启动检查 37/37 保留其旧 verifier 与原时间，发布后修正版 35/40 不冒充发布前门禁。ABBA 仅为诊断，不计为完成证据。','',
 '当前执行回执：'+executionFile+'，SHA-256 '+pins.get(executionFile)+'。当前媒体、Blob/HTTP 字节身份、源 RGB 与测量报告均绑定本次主页面；完整检查结果和各报告 SHA 见 completion.json。','',
 '旧 install-receipt、completion、RESULT 与 PROJECT 原文及 SHA 保存在 '+priorFile+'，旧失败报告不改写。受管项目块及用户接受状态保持原样。本文件是进行中的真实检查点，不代表结束用户任务；任何后续原型仍须先证实，再按实际产品身份验证。','',
 '主页面 SHA-256：'+expectedMain+'；原发布 runId：'+publication.runId+'。本记录器没有再次发布，也不能写入 technically_complete。',
 ''
].join('\n');
const suffix=['','','## 当前状态','',
 '记录时间：'+at+'。当前为 published_with_warnings；本轮有界媒体准备已原址发布 4 份 HTML，30 份视频字节不变，仍为一个画廊。正常 live 已检查 '+currentChecks.length+' / 11 项任务；启动故障 36/38 与 35/40 保留，技术完成阻断，用户任务继续处理。','',
 '唯一入口：'+url+'。详情与精确证据见 lineage/current/RESULT.md、completion.json。受管块和用户接受状态未改，正式 60 项、候选 30 项和个人数据继续保留。','',
 'A 场景有效 1015.838 ms 注入下实际冷启动 1259.8 ms；已观察到 Water 响应体占用唯一准备槽、Reaction 未及时准备的边界，底层慢响应原因仍未确证。其他控制器过长注入另列，不掩盖此失败。后续改进和验证继续进行，未放宽原门槛。','',
 '发布前状态完整保存在 '+priorFile+'；历史失败与清理不改写。本次记录未运行 finalizer、测试或发布，只登记当前证据。',''
].join('\n');
const nextProject=projectText.slice(0,projectText.indexOf(end)+end.length)+suffix;
assert(control(nextProject)===control(projectText),'Managed block would change');
const writes=new Map([['PROJECT.md',nextProject],['lineage/current/RESULT.md',result],['lineage/current/completion.json',JSON.stringify(checkpoint,null,2)+'\n']]);
for(const [file,hash]of pins)assert(sha(await readFile(path.join(project,file)))===hash,'Evidence changed before checkpoint: '+file);
if(apply){for(const [file,content]of writes)await writeFile(path.join(project,file),content);}
console.log(JSON.stringify({applied:apply,status:checkpoint.status,allTechnicalGatesPassed:false,finalizationBlocked:true,userTaskComplete:false,formalHash:expectedMain,publicationAt:publishedAt,normalTasks:currentChecks.length,allNormalPassed,writes:[...writes].map(([file,content])=>({file,sha256:sha(content),bytes:Buffer.byteLength(content)})),execution:checkpoint.normalLive,recorder:checkpoint.recorder},null,2));
