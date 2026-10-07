// Real-pointer acceptance of one gallery and reversible collection states.
// Only the disposable QA profile is modified; no personal browser is attached.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import {project,root,sha,put,guard} from './build-hybrid.mjs';
import {withBrowser,withStage,until} from '../src/hybrid/browser-tools.mjs';
const live=process.argv.includes('--live'),baseRoot=live?path.join(project,'web'):root;
const runId=randomUUID(),startedAt=new Date().toISOString(),checks=[];
const formalHash=sha(await readFile(path.join(baseRoot,'index.html')));
const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});if(!pass)console.error('FAIL '+name);};
await guard('lineage/current/curation-workflow','evidence');
const run=s=>withBrowser(async b=>{
 const base=s.url+(live?'/app/assets':''),main=base+'/motion-vault.html';
 const candidate='curated-rounded-menu',original='online-lens',other='curated-tooltip-gallery';
 const key='motion-vault-curated-originals-30-v1',formalKey='motion_vault_curation_v1',bookmarkKey='motion_vault_bookmarks',canary='CURATION_PRIVATE_NOTE_ONLY';
 const card=id=>'.card[data-id="'+id+'"]';
 const exists=sel=>b.evaluate('!!document.querySelector('+JSON.stringify(sel)+')');
 const raw=k=>b.evaluate('localStorage.getItem('+JSON.stringify(k)+')');
 const text=sel=>b.evaluate('document.querySelector('+JSON.stringify(sel)+')?.textContent.trim()');
 const inProduction=id=>b.evaluate('VaultPublic.export().items.some(i=>String(i.id)==='+JSON.stringify(id)+')');
 const click=async selector=>{
  const q=JSON.stringify(selector);
  const geometry='(()=>{const e=document.querySelector('+q+');if(!e)throw Error("Missing target "+'+q+');const r=e.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;return{x,y,w:r.width,h:r.height,hit:e.contains(document.elementFromPoint(x,y)),visible:r.width>0&&r.height>0&&x>=0&&x<innerWidth&&y>=0&&y<innerHeight,disabled:!!e.disabled}})()';
  const deadline=Date.now()+6000;
  while(Date.now()<deadline){
   let r=await b.evaluate(geometry);
   if(!r.visible){await b.evaluate('document.querySelector('+q+').scrollIntoView({block:"center",behavior:"instant"})');await b.delay(80);continue;}
   const pair=await b.evaluate('new Promise(resolve=>{const a='+geometry+';requestAnimationFrame(()=>requestAnimationFrame(()=>resolve({a,z:'+geometry+'})))})');
   if(!pair.z.visible||!pair.z.hit||pair.z.disabled||['x','y','w','h'].some(k=>Math.abs(pair.a[k]-pair.z[k])>.5))continue;
   r=pair.z;await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:r.x,y:r.y});const moved=await b.evaluate(geometry);
   if(!moved.hit||['x','y'].some(k=>Math.abs(moved[k]-r[k])>.5))continue;
   await b.evaluate('window.__clickCheck={selector:'+q+',trusted:false}');
   await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:r.x,y:r.y,button:'left',buttons:1,clickCount:1});
   await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:r.x,y:r.y,button:'left',buttons:0,clickCount:1});
   if(!await b.evaluate('__clickCheck.trusted'))throw Error('Native click missed '+selector);
   await b.delay(60);return;
  }
  throw Error('Unstable or unavailable control '+selector);
 };
 const view=name=>click('#viewTabs [data-view="'+name+'"]');
 const reload=async(name='library')=>{await b.goto(main+(name==='library'?'':'?view='+name),450);await until(b,'!!window.HybridVault');};
 const open=async id=>{await click(card(id)+' .detail-btn');await until(b,'document.getElementById("modal").open');};
 const close=async()=>{await click('#closeBtn');await until(b,'!document.getElementById("modal").open');};
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__curationErrors=[];window.__clickCheck=null;addEventListener("error",e=>__curationErrors.push(e.message));addEventListener("unhandledrejection",e=>__curationErrors.push(String(e.reason)));document.addEventListener("click",e=>{const p=__clickCheck;if(p){const target=document.querySelector(p.selector);if(target&&e.composedPath().includes(target))p.trusted=e.isTrusted;}},true);'});
 await reload();
 check('One application, three clearly named collection states',await b.evaluate('document.querySelectorAll("#viewTabs [data-view]").length===3&&document.querySelector("#viewTabs [data-view=library]").textContent.trim().startsWith("正式")&&document.querySelector("#viewTabs [data-view=pending]").textContent.trim().startsWith("预选")&&document.querySelector("#viewTabs [data-view=hidden]").textContent.trim().startsWith("已下架")&&document.querySelectorAll("#grid,#searchInput,#sceneTabs").length===3'));
 check('Original item starts formal and candidate is not auto-promoted',await exists(card(original))&&!await inProduction(candidate));
 const initialFormal=Number(await text('#formalCount')),initialPending=Number(await text('#pendingCount'));
 const candidateAsset=await b.evaluate('JSON.stringify(CandidateVault.items().find(i=>i.id==='+JSON.stringify(candidate)+').asset)');
 await view('pending');
 check('Preselection has both promote and archive on the card',await text(card(candidate)+' .collect-btn')==='提拔为正式'&&await text(card(candidate)+' .archive-btn')==='下架');
 await open(candidate);await click('#reviewNote');await b.call('Input.insertText',{text:canary});await close();await click(card(candidate)+' .bookmark');
 await click(card(candidate)+' .collect-btn');
 check('Promote removes candidate from preselection immediately',!await exists(card(candidate))&&Number(await text('#pendingCount'))===initialPending-1);
 check('Promote updates formal count and clean production export',Number(await text('#formalCount'))===initialFormal+1&&await inProduction(candidate)&&!await b.evaluate('JSON.stringify(VaultPublic.export()).includes('+JSON.stringify(canary)+')'));
 await view('library');
 check('Promoted item is the same asset, not a copied/new version',await exists(card(candidate))&&await b.evaluate('JSON.stringify(CandidateVault.items().find(i=>i.id==='+JSON.stringify(candidate)+').asset)')===candidateAsset);
 check('A promoted formal card retains demote and archive controls',await text(card(candidate)+' .collect-btn')==='移回预选'&&await text(card(candidate)+' .archive-btn')==='下架');
 await reload();check('Promotion persists after refresh',await exists(card(candidate))&&await inProduction(candidate));
 await click(card(candidate)+' .archive-btn');check('Archive removes formal item and production eligibility',!await exists(card(candidate))&&!await inProduction(candidate));
 await view('hidden');check('Archived formal item offers both restore destinations',await text(card(candidate)+' .archive-btn')==='恢复到正式'&&await text(card(candidate)+' .collect-btn')==='恢复到预选');
 await click(card(candidate)+' .archive-btn');await view('library');check('Default restore preserves the former formal state',await exists(card(candidate))&&await inProduction(candidate));
 await click(card(candidate)+' .collect-btn');await view('pending');check('Formal can return to preselection without deleting its source',await exists(card(candidate))&&!await inProduction(candidate));
 await click(card(candidate)+' .archive-btn');await view('hidden');check('Archived preselection retains its previous state',await text(card(candidate)+' .archive-btn')==='恢复到预选'&&await text(card(candidate)+' .collect-btn')==='恢复到正式');
 await b.evaluate('window.__nativeSetItem=Storage.prototype.setItem;window.__writes=[];Storage.prototype.setItem=function(k,v){__writes.push(k);return __nativeSetItem.call(this,k,v)}');
 await click(card(candidate)+' .collect-btn');
 check('Restore-and-promote is one atomic storage write',await b.evaluate('__writes.filter(k=>k==='+JSON.stringify(key)+').length===1')&&await inProduction(candidate));
 await b.evaluate('Storage.prototype.setItem=__nativeSetItem');
 await view('library');await click(card(candidate)+' .archive-btn');await view('hidden');await click(card(candidate)+' .collect-btn');await view('pending');
 check('Archived formal can explicitly restore to preselection',await exists(card(candidate))&&!await inProduction(candidate));
 check('Note and bookmark survive every transition',await b.evaluate('CandidateVault.exportReview().items.find(i=>i.id==='+JSON.stringify(candidate)+').note==='+JSON.stringify(canary)+'&&JSON.parse(localStorage.getItem('+JSON.stringify(bookmarkKey)+')).includes('+JSON.stringify(candidate)+')'));
 // The older original library must support exactly the same transitions.
 await view('library');await click(card(original)+' .collect-btn');await view('pending');
 check('Original formal entries can move into the same preselection pool',await exists(card(original))&&!await inProduction(original));
 await reload('pending');check('Original demotion persists through legacy-key reload',await exists(card(original))&&!await inProduction(original));
 await click(card(original)+' .archive-btn');await view('hidden');await click(card(original)+' .archive-btn');await view('pending');
 check('Restoring a demoted original does not silently re-approve it',await exists(card(original))&&!await inProduction(original));
 await open(original);check('Original detail has promote action and visible current state',await text('#modalCollectBtn')==='提拔为正式'&&await text('#modalState')==='预选');
 await click('#modalCollectBtn');await view('library');await open(original);await click('#modalArchiveBtn');await view('hidden');await open(original);
 check('Archived original detail supports both explicit restore destinations',await text('#modalCollectBtn')==='恢复到预选'&&await text('#modalArchiveBtn')==='恢复到正式');
 await click('#modalCollectBtn');await view('pending');await click(card(original)+' .collect-btn');await view('library');
 check('Complete original detail round trip preserves identity and eligibility',await exists(card(original))&&await inProduction(original));
 // Failed writes must leave both state dimensions and the visible list unchanged.
 await view('pending');await click(card(candidate)+' .archive-btn');await view('hidden');
 const beforeFailure=await raw(key);
 await b.evaluate('window.__savedSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='+JSON.stringify(key)+')throw new DOMException("QA write failure","QuotaExceededError");return __savedSet.call(this,k,v)}');
 await click(card(candidate)+' .collect-btn');
 check('Failed restore/promote has no partial saved or visible state',await raw(key)===beforeFailure&&await exists(card(candidate))&&!await inProduction(candidate)&&await text('#notice').then(t=>t.includes('未保存')));
 await b.evaluate('Storage.prototype.setItem=__savedSet');await click(card(candidate)+' .archive-btn');await view('pending');
 await view('library');const beforeOriginalFailure=await raw(formalKey);
 await b.evaluate('window.__savedSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='+JSON.stringify(formalKey)+')throw new DOMException("QA write failure","QuotaExceededError");return __savedSet.call(this,k,v)}');
 await click(card(original)+' .collect-btn');await click(card(original)+' .archive-btn');
 check('Failed original demotion and archive leave the formal item intact',await raw(formalKey)===beforeOriginalFailure&&await exists(card(original))&&await inProduction(original));
 await b.evaluate('Storage.prototype.setItem=__savedSet');
 // A true same-profile second tab delivers a native storage event to the open detail.
 await view('pending');await open(candidate);
 const {targetId}=await b.send('Target.createTarget',{url:main+'?view=pending'}),{sessionId}=await b.send('Target.attachToTarget',{targetId,flatten:true});
 try{
  await b.send('Runtime.enable',{},sessionId);await b.delay(600);
  const evaluate=async expression=>{const r=await b.send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true},sessionId);if(r.exceptionDetails)throw Error('Second tab evaluation failed');return r.result.value;};
  await evaluate('(()=>{const k='+JSON.stringify(key)+',v=JSON.parse(localStorage.getItem(k));v.accepted=[...new Set([...v.accepted,'+JSON.stringify(candidate)+'])];v.events.push({id:'+JSON.stringify(candidate)+',action:"accept",at:new Date().toISOString()});v.externalTestMarker="preserve-me";localStorage.setItem(k,JSON.stringify(v));return true})()');
  await b.call('Page.bringToFront');await until(b,'document.getElementById("modalCollectBtn").textContent==="移回预选"');
  check('Another tab changes open detail state without losing its note',await text('#modalState')==='正式'&&await b.evaluate('document.getElementById("reviewNote").value')===canary);
  await close();check('Closing detail reconciles another tab promotion',!await exists(card(candidate))&&await inProduction(candidate));
  await click(card(other)+' .collect-btn');
  check('Next action retains other tab changes and unknown stored fields',await b.evaluate('(()=>{const v=JSON.parse(localStorage.getItem('+JSON.stringify(key)+'));return v.accepted.includes('+JSON.stringify(candidate)+')&&v.accepted.includes('+JSON.stringify(other)+')&&v.externalTestMarker==="preserve-me"})()'));
 }finally{await b.send('Target.closeTarget',{targetId});await b.call('Page.bringToFront');}
 await reload();check('Both independent tab decisions survive refresh',await exists(card(candidate))&&await exists(card(other))&&await inProduction(candidate)&&await inProduction(other));
 await click(card(candidate)+' .archive-btn');await view('hidden');
 for(const width of [1440,1024,768,390]){
  await b.call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await b.delay(90);
  check('Archive controls and mode switch fit viewport '+width,await b.evaluate('document.documentElement.scrollWidth<=innerWidth+1&&[...document.querySelectorAll("#previewModes button,.card .collect-btn,.card .archive-btn")].every(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.x>=0&&r.right<=innerWidth})'));
 }
 await b.call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await view('library');
 const shot=await b.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await put(project,'lineage/current/curation-workflow/'+(live?'live':'stage')+'.png',Buffer.from(shot.data,'base64'));
 await b.goto(base+'/motion-vault-candidates.html',650);await until(b,'!!window.HybridVault');
 check('The old candidate address resolves to the single preselection view',await b.evaluate('location.pathname.endsWith("/motion-vault.html")&&location.search==="?view=pending"&&document.body.dataset.view==="pending"'));
 check('No second gallery link or copy was introduced',await b.evaluate('![...document.querySelectorAll("a[href]")].some(a=>a.href.includes("motion-vault-candidates.html"))&&document.querySelectorAll("#grid").length===1'));
 check('Preview/real interaction controls and both rounded icon entries remain',await b.evaluate('document.querySelectorAll("#previewModes [data-preview-mode]").length===2&&document.querySelectorAll("#detailModes button").length===2&&document.querySelectorAll("link[rel=icon]").length===2'));
 check('Rendered states are mutually exclusive with truthful counts',await b.evaluate('[...document.querySelectorAll(".card")].every(c=>c.dataset.state==="pending")&&Number(document.getElementById("pendingCount").textContent)===document.querySelectorAll(".card").length'));
 check('No private note or review journal leaks into formal export',!await b.evaluate('JSON.stringify(VaultPublic.export()).includes('+JSON.stringify(canary)+')')&&await b.evaluate('VaultPublic.export().items.every(i=>!Object.hasOwn(i,"notes")&&!Object.hasOwn(i,"events")&&!Object.hasOwn(i,"accepted"))'));
 check('No gallery errors at the final loaded route',await b.evaluate('__curationErrors.length===0'),await b.evaluate('__curationErrors'));
});
try{if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);}catch(e){check('Full curation journey completed',false,e.stack);}
check('Application did not change during the test',formalHash===sha(await readFile(path.join(baseRoot,'index.html'))));
const report={runId,startedAt,at:new Date().toISOString(),live,formalHash,passed:checks.filter(c=>c.pass).length,total:checks.length,checks};
const evidenceRoot='lineage/current/curation-workflow/',phase=live?'live':'stage',canonical=evidenceRoot+phase+'.json';
try{const previous=await readFile(path.join(project,canonical),'utf8'),r=JSON.parse(previous);if(r.runId&&r.runId!==runId)await put(project,evidenceRoot+phase+'-'+r.runId+'.json',previous);}catch(e){if(e.code!=='ENOENT')throw e;}
await put(project,evidenceRoot+phase+'-'+runId+'.json',JSON.stringify(report,null,2));
await put(project,canonical,JSON.stringify(report,null,2));
console.log(JSON.stringify({runId,live,formalHash,passed:report.passed,total:report.total,failures:checks.filter(c=>!c.pass)}));if(report.passed!==report.total)process.exitCode=1;
