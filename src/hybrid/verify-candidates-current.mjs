import {readFile} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {project,root,put,sha} from '../../scripts/build-hybrid.mjs';
import {withStage,withBrowser,until} from './browser-tools.mjs';
const live=process.argv.includes('--live'),baseRoot=live?path.join(project,'web'):root,checks=[];
const runId=randomUUID(),runStartedAt=new Date().toISOString(),verifierPath=fileURLToPath(import.meta.url),verifierSha256=sha(await readFile(verifierPath));
const initialFormalHash=sha(await readFile(path.join(baseRoot,'index.html'))),redirectPath=live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html'),initialRedirectHash=sha(await readFile(redirectPath));
const ck=(name,passed,detail)=>{checks.push({name,passed:!!passed,...(detail===undefined?{}:{detail})});if(!passed)console.error('FAIL '+name)};
const catalog=JSON.parse(await readFile(path.join(baseRoot,'candidate-catalog.json'),'utf8'));
const expansion=JSON.parse(await readFile(path.join(project,'src/hybrid/source-expansion-catalog.json'),'utf8'));
const expectedCount=30+expansion.length,expectedTotal=60+expectedCount;
const originalCandidates=catalog.items.filter(i=>String(i.id).startsWith('curated-'));
const query=(...args)=>JSON.parse(execFileSync(process.execPath,['scripts/query-vault.mjs',...args,'--root',path.relative(project,baseRoot),'--json'],{cwd:project,encoding:'utf8',windowsHide:true,maxBuffer:4*1024*1024,timeout:60000}));
ck('Every registered candidate has real recorded media without placeholders',catalog.count===expectedCount&&catalog.localReady===expectedCount&&catalog.items.every(i=>i.asset?.video&&i.asset.poster&&i.asset.entry));
ck('Original independent implementations retain their attribution',originalCandidates.filter(i=>i.source_kind==='independent_code').length===4&&originalCandidates.filter(i=>i.source_kind==='adapted_author_source').length===26);
const verified=query('verify','--scope','candidates');ck('All code, source and preview hashes match',verified.result.length===expectedCount&&verified.result.every(i=>i.ready));
for(const it of originalCandidates){
 const data=query('inspect',String(it.id),'--scope','candidates','--section','all').result;
 ck('Agent can read design and bounded real code '+it.id,data.integrity.verified&&data.design.includes('实际用途')&&data.implementation.length>200&&data.entryCode.length>30&&data.entryCode.length<30000&&data.sourceMap.length>0);
}
const run=s=>withBrowser(async b=>{
 const base=s.url+(live?'/app/assets':''),main=base+'/motion-vault.html';
 const selector=id=>'.card[data-id="'+id+'"]',exists=sel=>b.evaluate('!!document.querySelector('+JSON.stringify(sel)+')');
 const visibleCandidates=()=>b.evaluate('Array.from(document.querySelectorAll(".card"),c=>c.dataset.id).filter(id=>CandidateVault.items().some(i=>String(i.id)===id))');
 const publicData=()=>b.evaluate('VaultPublic.export()');
 const click=async sel=>{
  const geometry='(()=>{const e=document.querySelector('+JSON.stringify(sel)+');if(!e)throw new Error("Missing click target "+'+JSON.stringify(sel)+');const r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2,hit=document.elementFromPoint(x,y);return{x,y,width:r.width,height:r.height,visible:r.width>0&&r.height>0&&x>=0&&x<innerWidth&&y>=0&&y<innerHeight,hit:!!hit&&(hit===e||e.contains(hit)),target:hit?.id||hit?.tagName,disabled:!!e.disabled}})()';
  const same=(a,z)=>a&&z&&['x','y','width','height'].every(k=>Math.abs(a[k]-z[k])<.5);
  const reveal='document.querySelector('+JSON.stringify(sel)+').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})';
  if(!(await b.evaluate(geometry)).visible)await b.evaluate(reveal);
  const deadline=Date.now()+6000;let last;
  while(Date.now()<deadline){
   const frame=await b.evaluate('new Promise(resolve=>{const first='+geometry+';requestAnimationFrame(()=>requestAnimationFrame(()=>resolve({first,last:'+geometry+'})))})');
   last=frame;if(!frame.last.visible){await b.evaluate(reveal);continue;}
   if(!frame.last.hit||frame.last.disabled||!same(frame.first,frame.last))continue;
   const point={x:frame.last.x,y:frame.last.y};
   await b.evaluate('window.__vaultClickProbe={selector:'+JSON.stringify(sel)+',point:'+JSON.stringify(point)+',events:[]}');
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});
   const afterMove=await b.evaluate(geometry);last={...frame,afterMove};
   if(!afterMove.visible||!afterMove.hit||afterMove.disabled||!same(frame.last,afterMove))continue;
   await b.call('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',buttons:1,clickCount:1});
   await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',buttons:0,clickCount:1});
   const proof=await b.evaluate('window.__vaultClickProbe');
   if(!proof.events.some(e=>e.type==="click"&&e.match&&e.isTrusted))throw new Error('Real pointer click missed '+sel+': '+JSON.stringify({...last,proof}));
   await b.delay(45);return;
  }
  throw new Error('Click target never became stable and hittable '+sel+': '+JSON.stringify(last));
 };
 const view=async name=>{await click('#viewTabs [data-view="'+name+'"]')};
 const open=async id=>{await click(selector(id)+' .detail-btn');await until(b,'document.getElementById("modal").open');await until(b,'document.getElementById("docContent").textContent.length>0&&!document.getElementById("docContent").textContent.startsWith("读取本地资料")');await b.delay(80);};
 const close=async()=>{await click('#closeBtn');await until(b,'!document.getElementById("modal").open')};
 const note=async text=>b.evaluate('(()=>{const e=document.getElementById("reviewNote");e.value='+JSON.stringify(text)+';e.dispatchEvent(new Event("input",{bubbles:true}))})()');
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__errors=[];addEventListener("error",e=>__errors.push(e.error?.stack||e.message));addEventListener("unhandledrejection",e=>__errors.push(String(e.reason)));for(const type of ["pointerdown","pointerup","click"])document.addEventListener(type,e=>{const p=window.__vaultClickProbe;if(!p)return;const expected=document.querySelector(p.selector),r=expected?.getBoundingClientRect();p.events.push({type,match:!!expected&&e.composedPath().includes(expected),target:e.target.id||e.target.tagName,isTrusted:e.isTrusted,x:e.clientX,y:e.clientY,rect:r?{x:r.x,y:r.y,width:r.width,height:r.height}:null})},true);'});
 await b.goto(main,450);await until(b,'!!window.HybridVault&&!!window.CandidateVault');
 ck('One application contains both complete catalogues',await b.evaluate('HybridVault.release==="formal"&&HybridVault.items().filter(i=>i.asset).length==='+expectedTotal+'&&CandidateVault.items().length==='+expectedCount));
 ck('Default library and public export exclude all unaccepted candidates',(await visibleCandidates()).length===0&&(await publicData()).items.every(i=>!catalog.items.some(c=>c.id===i.id)));
 ck('Private review export is absent from normal browsing',await b.evaluate('document.getElementById("exportReview").getClientRects().length===0'));
 await view('pending');
 ck('Every pending-review source renders in the same page',(await visibleCandidates()).length===expectedCount&&await b.evaluate('location.pathname.endsWith("/motion-vault.html")&&document.querySelectorAll("#searchInput").length===1&&document.querySelectorAll("#sceneTabs").length===1'));
 ck('No obsolete version labels or missing-implementation banners',await b.evaluate('!/(hover-intent|20261006r|待补实现 25)/.test(document.body.innerText)'));
 ck('Initial pending state starts no full demo',await b.evaluate('document.querySelectorAll("iframe,.preview-layer").length===0'));
 for(const it of catalog.items){
  for(const area of ['stage','caption']){
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});
   await b.evaluate('document.querySelector('+JSON.stringify(selector(it.id))+').scrollIntoView({block:"center"})');await b.delay(45);
   const p=await b.evaluate('(()=>{const r=document.querySelector('+JSON.stringify(selector(it.id)+' .'+area)+').getBoundingClientRect();return{x:r.x+r.width*.4,y:r.y+r.height*.5}})()');
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await until(b,'document.querySelector(".preview-layer video")?.currentTime>0',9000);
   const t=await b.evaluate('document.querySelector(".preview-layer video").currentTime');await b.delay(220);
   ck('Actual '+area+' hover plays '+it.id,await b.evaluate('document.querySelector(".preview-layer video").currentTime')>t&&await b.evaluate('document.querySelector(".preview-layer video").loop&&document.querySelectorAll("iframe").length===0'));
  }
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(30);
  ck('Card releases player '+it.id,await b.evaluate('document.querySelectorAll(".preview-layer").length===0'));
 }
 await open('curated-liquid-grid');await click('[data-section=provenance]');
 await until(b,'document.getElementById("docContent").innerText.includes("独立实现")');
 ck('Independent provenance is explicit without null labels',await b.evaluate('!document.getElementById("docContent").innerText.includes("null")'));await close();

 // Compatibility and workflow exercise only this disposable browser profile.
 const key='motion-vault-curated-originals-30-v1',formalKey='motion_vault_curation_v1',bookmarkKey='motion_vault_bookmarks';
 const target='curated-rounded-menu',canary='PRIVATE_REVIEW_TEST_ONLY',draft='PRIVATE_UNSAVED_REVIEW_ONLY';
 const legacy={hidden:[target,'removed-candidate-sentinel'],notes:{[target]:canary},events:[{id:target,action:'hide',at:'2026-01-01T00:00:00.000Z'}]};
 const oldFormal={schemaVersion:'motion-vault.manual-curation.v1',events:[{id:'legacy-hide',at:'2026-01-01T00:00:00.000Z',action:'hide',item:{id:'39'}},{id:'legacy-removed',at:'2026-01-01T00:00:00.000Z',action:'restore',item:{id:'1'}}]};
 await b.evaluate('localStorage.setItem('+JSON.stringify(key)+','+JSON.stringify(JSON.stringify(legacy))+');localStorage.setItem('+JSON.stringify(formalKey)+','+JSON.stringify(JSON.stringify(oldFormal))+');localStorage.setItem('+JSON.stringify(bookmarkKey)+',JSON.stringify(["online-lens","'+target+'"]))');
 await b.goto(main,450);await until(b,'!!window.HybridVault');
 ck('Legacy formal hide and unaccepted bookmarks remain respected',!(await exists(selector('39')))&&(await visibleCandidates()).length===0);
 await click('#savedToggle');
 ck('Bookmarking a pending candidate never approves it',!(await exists(selector(target)))&&await exists(selector('online-lens')));
 await click('#savedToggle');await view('hidden');
 ck('One hidden view combines both legacy storage formats',await exists(selector('39'))&&await exists(selector(target))&&!(await exists(selector('1')))&&!(await exists(selector('removed-candidate-sentinel'))));
 await open(target);
 ck('Legacy private note is preserved without a storage migration',await b.evaluate('document.getElementById("reviewNote").value')===canary);
 ck('Candidate details expose only the isolated interactive entry',await b.evaluate('document.getElementById("runAlone").hidden&&document.getElementById("runAlone").getAttribute("href")==="#"&&!document.getElementById("runLocal").hidden&&!document.getElementById("runLocal").disabled'));
 await close();await click(selector(target)+' .archive-btn');await view('pending');
 ck('Restoring an unaccepted candidate returns it to pending',await exists(selector(target))&&(await visibleCandidates()).length===expectedCount);
 ck('Production export remains clean while viewing pending',!(await publicData()).items.some(i=>i.id===target)&&!JSON.stringify(await publicData()).includes(canary));
 await click(selector(target)+' .collect-btn');
 ck('Explicit collection removes only the selected pending item',!(await exists(selector(target)))&&(await visibleCandidates()).length===expectedCount-1);
 await view('library');
 ck('The collected candidate joins the default gallery and production export',await exists(selector(target))&&(await publicData()).items.some(i=>i.id===target));
 ck('Acceptance never copies notes or review events into public items',!JSON.stringify(await publicData()).includes(canary)&&(await publicData()).items.every(i=>!('note'in i)&&!('notes'in i)&&!('events'in i)&&!('hidden'in i)&&!('accepted'in i)));
 await open(target);
 ck('Private review editing stays outside normal library detail',await b.evaluate('document.getElementById("reviewNote").getClientRects().length===0'));
 await close();await b.goto(main,450);await until(b,'!!window.HybridVault');
 ck('Explicit collection survives reload',await exists(selector(target)));
 await click(selector(target)+' .archive-btn');
 ck('Hiding a collected candidate removes it from gallery and public export',!(await exists(selector(target)))&&!(await publicData()).items.some(i=>i.id===target));
 ck('Hiding preserves the independent acceptance decision',await b.evaluate('JSON.parse(localStorage.getItem('+JSON.stringify(key)+')).accepted.includes('+JSON.stringify(target)+')'));
 await view('hidden');await click(selector(target)+' .archive-btn');await view('library');
 ck('Restoring a collected candidate returns it to library',await exists(selector(target))&&(await publicData()).items.some(i=>i.id===target));
 await open(target);await click('#modalCollectBtn');if(await b.evaluate('document.getElementById("modal").open'))await close();
 ck('Moving back to pending immediately removes production eligibility',!(await exists(selector(target)))&&!(await publicData()).items.some(i=>i.id===target));
 await b.goto(main,450);await until(b,'!!window.HybridVault');await view('pending');
 ck('Pending state and the original note survive the complete round trip',await exists(selector(target))&&await b.evaluate('CandidateVault.exportReview().items.find(i=>i.id==='+JSON.stringify(target)+').note')===canary);

 // Another tab may update review state while a detail dialog is open.
 const externalReview=async actions=>b.evaluate('(()=>{const k='+JSON.stringify(key)+',id='+JSON.stringify(target)+',oldValue=localStorage.getItem(k),v=JSON.parse(oldValue);for(const action of '+JSON.stringify(actions)+'){if(action==="accept")v.accepted=[...new Set([...(v.accepted||[]),id])];if(action==="unaccept")v.accepted=(v.accepted||[]).filter(x=>x!==id);if(action==="hide")v.hidden=[...new Set([...v.hidden,id])];if(action==="restore")v.hidden=v.hidden.filter(x=>x!==id);v.events.push({id,action,at:new Date().toISOString()})}const newValue=JSON.stringify(v);localStorage.setItem(k,newValue);dispatchEvent(new StorageEvent("storage",{key:k,oldValue,newValue,storageArea:localStorage,url:location.href}))})()');
 await open(target);await externalReview(['accept']);
 ck('External review change preserves the currently open detail',await b.evaluate('document.getElementById("modal").open&&document.getElementById("reviewNote").value')===canary);
 await close();
 ck('Closing detail reflects externally accepted state immediately',!(await exists(selector(target)))&&(await visibleCandidates()).length===expectedCount-1&&await b.evaluate('document.querySelector("#viewTabs [data-view=pending]").textContent.includes('+JSON.stringify(String(expectedCount-1))+')'));
 await view('library');await open(target);await externalReview(['hide']);await close();
 ck('Closing detail reflects an external hide in gallery and public export',!(await exists(selector(target)))&&!(await publicData()).items.some(i=>i.id===target)&&await b.evaluate('document.querySelector("#viewTabs [data-view=hidden]").textContent.includes("2")'));
 await externalReview(['restore','unaccept']);await view('pending');
 ck('External updates do not lose private notes or pending identity',await exists(selector(target))&&(await visibleCandidates()).length===expectedCount&&await b.evaluate('CandidateVault.exportReview().items.find(i=>i.id==='+JSON.stringify(target)+').note')===canary);

 // A storage failure must not forge acceptance; the note draft remains recoverable.
 await b.evaluate('window.__originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='+JSON.stringify(key)+')throw new DOMException("Storage test","QuotaExceededError");return __originalSetItem.call(this,k,v)}');
 await click(selector(target)+' .collect-btn');
 ck('Failed persistence does not pretend to collect the candidate',await exists(selector(target))&&!(await publicData()).items.some(i=>i.id===target)&&await b.evaluate('!JSON.parse(localStorage.getItem('+JSON.stringify(key)+')).accepted.includes('+JSON.stringify(target)+')'));
 await open(target);await note(draft);
 const unsaved=await b.evaluate('CandidateVault.exportReview().items.find(i=>i.id==='+JSON.stringify(target)+')');
 ck('Failed note save keeps an exportable private draft',unsaved.note===draft&&unsaved.unsaved_draft===true&&await b.evaluate('JSON.parse(localStorage.getItem('+JSON.stringify(key)+')).notes['+JSON.stringify(target)+']')===canary);
 ck('Unsaved private text is also excluded from production',!JSON.stringify(await publicData()).includes(draft));
 await b.evaluate('Storage.prototype.setItem=window.__originalSetItem;delete window.__originalSetItem');await note(canary);await close();
 await view('hidden');await click(selector('39')+' .archive-btn');await view('pending');
 ck('Formal restore still uses the original event journal',await b.evaluate('JSON.parse(localStorage.getItem('+JSON.stringify(formalKey)+')).events.at(-1).action==="restore"'));
 const targetItem=catalog.items.find(i=>i.id===target);
 await click('#sceneTabs [data-scene="'+targetItem.uses[0].scene+'"]');
 await b.evaluate('document.getElementById("searchInput").value='+JSON.stringify(targetItem.title)+';document.getElementById("searchInput").dispatchEvent(new Event("input"))');
 ck('Existing search and purpose filters apply to pending content',await exists(selector(target))&&(await visibleCandidates()).length===1);
 await view('library');
 ck('State change reuses the same search instead of a second page',await b.evaluate('document.getElementById("searchInput").value')===targetItem.title&&(await visibleCandidates()).length===0);
 await view('pending');
 ck('Returning to pending retains shared search context',await exists(selector(target)));
 await b.evaluate('document.getElementById("searchInput").value="";document.getElementById("searchInput").dispatchEvent(new Event("input"))');
 await click('#sceneTabs [data-scene=all]');
 ck('All pending candidates remain after the workflow',(await visibleCandidates()).length===expectedCount);
 const payload=await b.evaluate('fetch('+JSON.stringify(live?'motion-vault-candidate-catalog.json':'candidate-catalog.json')+').then(r=>r.text())');
 ck('Published catalogue contains no private canary',!payload.includes(canary)&&!payload.includes(draft));

 await b.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await b.evaluate('scrollTo(0,0)');await b.delay(80);
 const first=await b.evaluate('(()=>{const r=document.querySelector(".card .stage").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...first});await until(b,'document.querySelector(".preview-layer video")?.currentTime>0');
 ck('Explicit hover also works with reduced ambient motion',true);await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.call('Emulation.setEmulatedMedia',{features:[]});
 for(const width of [1440,1024,768,390]){
  await b.call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await b.delay(50);
  ck('Unified pending layout fits '+width,await b.evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
 }
 await b.call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await b.evaluate('scrollTo(0,0)');await b.delay(100);
 ck('No gallery JavaScript errors',await b.evaluate('__errors.length===0'),await b.evaluate('__errors'));
 const shot=await b.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
 await put(project,'lineage/current/'+(live?'live-':'')+'new-candidates.png',Buffer.from(shot.data,'base64'));
 // Read the same server headers without mutating its configuration.
 const r=await fetch(base+'/motion-vault-assets/shared/runtime.css',{headers:{Origin:'null'}});
 await put(project,'lineage/current/'+(live?'live':'stage')+'-asset-headers.json',JSON.stringify({status:r.status,type:r.headers.get('content-type'),cors:r.headers.get('access-control-allow-origin')},null,2));
});
try{if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);}catch(e){ck('Browser suite completed',false,e.stack);}
const redirectHash=sha(await readFile(redirectPath)),formalHash=sha(await readFile(path.join(baseRoot,'index.html'))),sourceUnchanged=formalHash===initialFormalHash&&redirectHash===initialRedirectHash&&verifierSha256===sha(await readFile(verifierPath));
if(!sourceUnchanged)ck('Verification source remained unchanged for the whole run',false,{initialFormalHash,formalHash,initialRedirectHash,redirectHash,verifierSha256});
const result={runId,runStartedAt,at:new Date().toISOString(),verifierSha256,sourceUnchanged,live,formalHash,candidateSha256:redirectHash,redirectSha256:redirectHash,passed:checks.filter(c=>c.passed).length,total:checks.length,checks};
const runReport='lineage/current/single-page/'+(live?'live-':'stage-')+'candidate-validation-'+runId+'.json',canonical='lineage/current/'+(live?'live-':'')+'candidate-validation.json';
await put(project,runReport,JSON.stringify(result,null,2));
let newerReport=false;try{const previous=JSON.parse(await readFile(path.join(project,canonical),'utf8'));newerReport=Date.parse(previous.runStartedAt||previous.at)>Date.parse(runStartedAt);}catch(e){if(e.code!=='ENOENT')throw e;}
if(!newerReport)await put(project,canonical,JSON.stringify(result,null,2));
console.log(JSON.stringify({runId,runStartedAt,at:result.at,verifierSha256,formalHash,candidateSha256:redirectHash,sourceUnchanged,runReport,canonicalUpdated:!newerReport,passed:result.passed,total:result.total,failures:checks.filter(c=>!c.passed)}));
if(result.passed!==result.total||newerReport)process.exitCode=1;
