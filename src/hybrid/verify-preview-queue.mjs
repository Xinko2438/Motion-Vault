// One sustained queue-blocking fault. No timed network release and no ready-wait warm-up.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {performance as nodePerformance} from 'node:perf_hooks';
import {project,root,sha,guard} from '../../scripts/build-hybrid.mjs';
import {withBrowser,withStage,until} from './browser-tools.mjs';

const args=process.argv.slice(2),option=(key,fallback)=>{const n=args.indexOf(key);return n<0?fallback:args[n+1];};
if(args.includes('--live')&&args.includes('--stage'))throw Error('Choose --live or --stage');
const expectedConcurrency=Number(option('--expected-concurrency',null));
if(![1,2].includes(expectedConcurrency))throw Error('Explicit --expected-concurrency 1 or 2 is required');
const live=!args.includes('--stage'),runId=randomUUID(),startedAt=new Date().toISOString();
const label=option('--label','queue-'+startedAt.replace(/[-:.]/g,'').slice(0,16)+'-'+runId.slice(0,8));
if(!/^[a-zA-Z0-9_-]{1,70}$/.test(label))throw Error('Use a simple fresh --label');
const evidence='lineage/current/preview-playback',output=path.join(project,evidence,label+'.json'),runOutput=path.join(project,evidence,label+'-'+runId+'.json');
try{await readFile(output);throw Error('Report label already exists; choose a fresh --label');}catch(e){if(e.code!=='ENOENT')throw e;}
await guard('src/hybrid/verify-preview-queue.mjs','automation');await guard(evidence,'evidence');
const baseRoot=live?path.join(project,'web'):root,sourcePath=fileURLToPath(import.meta.url),sourceHash=sha(await readFile(sourcePath));
const probePath=path.join(project,'src/hybrid/verify-preview-startup.mjs'),probeBytes=await readFile(probePath),probeHash=sha(probeBytes),probeText=probeBytes.toString();
const probeStart=probeText.indexOf('function instrument(){'),probeEnd=probeText.indexOf('\nconst run=async origin=>withBrowser',probeStart);
if(probeStart<0||probeEnd<=probeStart)throw Error('Existing startup observation probe has changed; review its extraction');
const probeSource=probeText.slice(probeStart,probeEnd);
const catalogPath=path.join(baseRoot,'candidate-catalog.json'),catalogBytes=await readFile(catalogPath),catalog=JSON.parse(catalogBytes),catalogueHash=sha(catalogBytes);
const mainPath=path.join(baseRoot,'index.html'),redirectPath=live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html');
const formalHash=sha(await readFile(mainPath)),redirectSha256=sha(await readFile(redirectPath));
const targetId='curated-reaction-diffusion',blockedId='curated-stylized-water';
const assets=await Promise.all([targetId,blockedId].map(async id=>{const it=catalog.items.find(x=>x.id===id);if(!it)throw Error('Missing fixed asset '+id);return {id,video:it.asset.video,revision:it.asset.videoRevision,sha256:sha(await readFile(path.join(baseRoot,it.asset.video)))};}));
const limits={entries:9,bytes:24*1024*1024,singleBytes:4*1024*1024,concurrent:expectedConcurrency};
const checks=[],network=[],faults=[],errors=[];let sample=null,browserCompleted=false,deadlineHit=false;
const check=(name,pass,detail)=>checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});
const run=async origin=>withBrowser(async b=>{
 const mediaURL=id=>{const a=assets.find(x=>x.id===id),u=new URL(a.video,origin+'/');u.searchParams.set('v',a.revision);return u.href;};
 const targetURL=mediaURL(targetId),waterURL=mediaURL(blockedId),requests=new Map(),off=[];let held=null,deadline;
 const productTargetRequests=()=>network.filter(n=>n.url===targetURL&&n.role==='product');
 const snap=()=>b.evaluate('__startupProbe.snapshot()');
 const waterActive=s=>s.preparationAudit.tasks.some(t=>t.url===waterURL&&t.role==='product'&&t.abortAt===null&&t.cancelAt===null&&t.endedAt===null&&t.bodyConsumedAt===null);
 const faultActive=s=>!!held&&held.releasedMonoMs===null&&waterActive(s);
 try{
  deadline=setTimeout(()=>{deadlineHit=true;errors.push('40 second isolated browser budget exceeded');b.send('Browser.close').catch(()=>{});},40000);
  await b.call('Network.enable');
  off.push(b.onEvent('Network.requestWillBeSent',p=>{
   if(!p.request.url.startsWith(origin+'/motion-vault-assets/')||!new URL(p.request.url).pathname.endsWith('.mp4'))return;
   const testRead=Object.entries(p.request.headers||{}).some(([k,v])=>k.toLowerCase()==='x-vault-verification-read'&&v==='preview-startup');
   const row={requestId:p.requestId,url:p.request.url,type:p.type,role:testRead?'test-byte-read':'product',loaderId:p.loaderId,timestamp:p.timestamp,wallTime:p.wallTime,receivedMonoMs:nodePerformance.now()};
   requests.set(p.requestId,row);network.push(row);
  }));
  off.push(b.onEvent('Network.loadingFinished',p=>{const row=requests.get(p.requestId);if(row)Object.assign(row,{finishedTimestamp:p.timestamp,bytes:p.encodedDataLength});}));
  off.push(b.onEvent('Network.loadingFailed',p=>{const row=requests.get(p.requestId);if(row)Object.assign(row,{failedTimestamp:p.timestamp,failed:p.errorText,canceled:p.canceled});}));
  off.push(b.onEvent('Fetch.requestPaused',p=>{
   const request=requests.get(p.networkId),eligible=p.request.url===waterURL&&p.responseStatusCode!==undefined&&request?.type==='Fetch'&&request.role==='product';
   const row={requestId:p.requestId,networkId:p.networkId,url:p.request.url,resourceType:p.resourceType,responseStatusCode:p.responseStatusCode??null,role:request?.role??null,networkType:request?.type??null,pausedMonoMs:nodePerformance.now(),decision:eligible&&!held?'held':'passthrough',releasedMonoMs:null};
   faults.push(row);
   if(row.decision==='held'){held=row;return;}
   row.releasedMonoMs=nodePerformance.now();b.call('Fetch.continueRequest',{requestId:p.requestId}).catch(e=>{row.continueError=String(e);errors.push(String(e));});
  }));
  await b.call('Fetch.enable',{patterns:[{urlPattern:waterURL,requestStage:'Response'}]});
  await b.call('Page.addScriptToEvaluateOnNewDocument',{source:probeSource+'\ninstrument();'});
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});
  await b.goto(origin+'/motion-vault.html?view=pending',350);
  await until(b,'!!window.CandidateVault&&!!window.__startupProbe',4000);
  const selector='.card[data-id="'+targetId+'"]';
  await b.evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"center",behavior:"instant"})');
  await b.evaluate('new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))');
  const point=await b.evaluate('(()=>{const card=document.querySelector('+JSON.stringify(selector)+'),r=card.querySelector(".stage").getBoundingClientRect(),p={x:r.x+r.width*.44,y:r.y+r.height*.46};return {...p,visible:r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth,hit:card.contains(document.elementFromPoint(p.x,p.y)),at:performance.now()};})()');
  // A single fixed reading interval. Do not poll readiness or select another card.
  await b.delay(1500);
  const before=await snap(),beforeCount=productTargetRequests().length,preparedTasks=before.preparationAudit.tasks.filter(t=>t.url===targetURL&&t.role==='product'),waterTask=before.preparationAudit.tasks.find(t=>t.url===waterURL&&t.role==='product'&&t.endedAt===null);
  check('Fixed Reaction card is visible and hit tested',point.visible&&point.hit,point);
  check('Water product response remains held during visible reading',faultActive(before),{held,water:before.preparationAudit.tasks.filter(t=>t.url===waterURL)});
  check('Visible reading starts no media player',before.videoCount===0&&before.layerCount===0&&before.active===null);
  check('Reaction preparation starts while Water still occupies a slot',faultActive(before)&&preparedTasks.length===1&&preparedTasks[0].startedAt>=waterTask.startedAt&&preparedTasks[0].startedAt<before.now,{tasks:preparedTasks,waterTask,held});
  await b.evaluate('__startupProbe.arm('+JSON.stringify(targetId)+',"queue-hover")');
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});
  // Observe a frame after hover; this never warms or gates entry on target readiness.
  await b.delay(900);
  const frame=await b.evaluate('__startupProbe.current()'),during=await snap(),afterCount=productTargetRequests().length;
  check('Real hover produces a frame below 800ms',frame?.trusted===true&&Number.isFinite(frame.firstFrameMs)&&frame.firstFrameMs<800&&frame.frames>0,frame);
  check('Hover adds no target product HTTP request',beforeCount===1&&afterCount===beforeCount,{beforeCount,afterCount});
  check('Water remains incomplete and uncanceled through actual hover',faultActive(during),{held,water:during.preparationAudit.tasks.filter(t=>t.url===waterURL)});
  const actual=await b.evaluate('(async()=>{const v=document.querySelector('+JSON.stringify(selector+' video')+');if(!v)return {exists:false};const url=v.currentSrc||v.src;const digest=async u=>{const r=await fetch(u,{headers:{"X-Vault-Verification-Read":"preview-startup"},signal:AbortSignal.timeout(4000)});if(!r.ok)throw Error("Identity HTTP "+r.status);const bytes=await r.arrayBuffer();return {sha256:Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes)),x=>x.toString(16).padStart(2,"0")).join(""),bytes:bytes.byteLength};};const playback=await digest(url),canonical=await digest('+JSON.stringify(targetURL)+');return {exists:true,url,protocol:new URL(url).protocol,playback,canonical,sameVideo:v.isConnected&&(v.currentSrc||v.src)===url};})()');
  const asset=assets.find(x=>x.id===targetId);
  check('Actual Blob bytes match canonical HTTP and disk',actual.exists&&actual.protocol==='blob:'&&actual.sameVideo&&actual.playback.sha256===asset.sha256&&actual.canonical.sha256===asset.sha256,actual);
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(60);
  const after=await snap();
  check('Leaving releases the active video and layer',after.videoCount===0&&after.layerCount===0&&after.active===null&&after.videoStates.every(v=>v.paused&&v.src===null&&!v.connected),after.videoStates);
  check('No hidden or simultaneous video player',after.maxVideos<=1&&after.maxLayers<=1,{maxVideos:after.maxVideos,maxLayers:after.maxLayers});
  check('Prepared Blob retention stays within 9 entries and 24MiB',after.maxURLs<=limits.entries&&after.maxBytes<=limits.bytes&&after.largestBlob<=limits.singleBytes,{maxURLs:after.maxURLs,maxBytes:after.maxBytes,largestBlob:after.largestBlob,limits});
  check('Observed preparation concurrency matches the explicit contract',after.preparationAudit.maxBackground<=expectedConcurrency,{expectedConcurrency,maxBackground:after.preparationAudit.maxBackground,basis:after.preparationAudit.basis});
  check('Exactly one fixed Water response was continuously held',faults.filter(x=>x.decision==='held').length===1&&faultActive(after),{faults,water:after.preparationAudit.tasks.filter(t=>t.url===waterURL)});
  const actualMain=await b.evaluate('fetch(location.href).then(r=>r.arrayBuffer()).then(b=>crypto.subtle.digest("SHA-256",b)).then(b=>Array.from(new Uint8Array(b),n=>n.toString(16).padStart(2,"0")).join(""))');
  check('Actual page matches the measured main file',actualMain===formalHash,{actualMain,formalHash});
  check('No page errors',after.errors.length===0,after.errors);
  sample={targetId,blockedId,point,fixedReadingMs:1500,actualReadingMs:before.now-point.at,before,frame,during,identity:actual,after};
  browserCompleted=!deadlineHit;
 }catch(e){errors.push(String(e.stack||e));check('Queue scenario completed',false,String(e));}
 finally{
  clearTimeout(deadline);
  if(held&&held.releasedMonoMs===null){held.releasedMonoMs=nodePerformance.now();held.releaseReason='scenario-cleanup';try{await b.call('Fetch.continueRequest',{requestId:held.requestId});held.continueAckMonoMs=nodePerformance.now();}catch(e){held.continueError=String(e);}}
  try{await b.call('Fetch.disable');}catch{}for(const remove of off)remove();
 }
},{gpu:true});
try{if(live)await run('http://127.0.0.1:4380/app/assets');else await withStage(root,s=>run(s.url));}catch(e){errors.push(String(e));check('Isolated browser completed',false,String(e));}
let sourceUnchanged=sha(await readFile(sourcePath))===sourceHash&&sha(await readFile(probePath))===probeHash&&sha(await readFile(mainPath))===formalHash&&sha(await readFile(redirectPath))===redirectSha256&&sha(await readFile(catalogPath))===catalogueHash;
for(const asset of assets)if(sha(await readFile(path.join(baseRoot,asset.video)))!==asset.sha256)sourceUnchanged=false;
check('Measured sources remain unchanged',sourceUnchanged);check('Completed inside total browser budget',browserCompleted&&!deadlineHit);
const passed=checks.filter(c=>c.pass).length;
const report={schema:'motion-vault.preview-queue.v1',runId,label,startedAt,at:new Date().toISOString(),live,formalHash,redirectSha256,candidateHash:redirectSha256,catalogueHash,verifierSha256:sourceHash,probeSha256:probeHash,sourceUnchanged,browserCompleted,browserClosed:true,passed,total:checks.length,allPassed:passed===checks.length&&browserCompleted,limits,contract:{targetId,blockedId,expectedConcurrency,fault:'first fixed Water product Fetch held at response headers until scenario cleanup',faultReleaseTimer:false,fixedVisibleReadingMs:1500,firstFrameLimitMs:800,readyWait:false,cacheDisabled:false,hiddenPlayersAllowed:0,liveFPSClaimed:false,retentionAudit:'created Blob URLs; reservation accounting is verified separately in the VM regression'},assets,sample,faults,network,errors,checks};
await mkdir(path.dirname(output),{recursive:true});const json=JSON.stringify(report,null,2)+'\n';await writeFile(runOutput,json,{flag:'wx'});await writeFile(output,json,{flag:'wx'});
console.log(JSON.stringify({runId,label,live,formalHash,expectedConcurrency,passed,total:checks.length,allPassed:report.allPassed,sourceUnchanged,browserCompleted,report:output,runReport:runOutput,failures:checks.filter(c=>!c.pass).map(c=>c.name)},null,2));
if(!report.allPassed)process.exitCode=1;
