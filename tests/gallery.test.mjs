import {test} from 'node:test';import assert from 'node:assert/strict';import {readFile,readdir,stat} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
import {runInNewContext} from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),read=f=>readFile(path.join(root,f),'utf8'),sha=b=>createHash('sha256').update(b).digest('hex');
const formal=JSON.parse(await read('web/catalog.json')),candidate=JSON.parse(await read('web/candidate-catalog.json')),html=await read('web/index.html'),redirectHTML=await read('candidates/curated-originals/index.html'),receipt=JSON.parse(await read('lineage/current/install-receipt.json'));
const query=(...args)=>JSON.parse(execFileSync(process.execPath,['scripts/query-vault.mjs',...args,'--json'],{cwd:root,encoding:'utf8',windowsHide:true,stdio:'pipe',maxBuffer:4*1024*1024,timeout:60000}));
test('Formal IDs and explicit deletions are preserved',()=>{assert.equal(formal.count,60);assert.equal(new Set(formal.items.map(i=>String(i.id))).size,60);for(const id of ['online-command','online-tree','online-range','online-zoom','online-carousel','online-marquee','online-slider','online-trail','online-fold','online-echo','online-path','online-warp','online-moire',1,3,5,6,8,9,13,14,15,17,20,21,23,26,27,29,32])assert.ok(!formal.items.some(i=>i.id===id));});
test('All formal sources, runnable entries and previews remain intact',()=>{assert.ok(formal.items.every(i=>i.asset?.entry&&i.asset.run&&i.asset.design&&i.asset.implementation&&i.asset.poster));assert.equal(formal.items.filter(i=>i.asset.video).length,14);assert.ok(query('verify').result.every(i=>i.ready&&i.checkedFiles>=10));});
test('Thirty fully local review candidates do not become approved formal assets',()=>{assert.equal(candidate.count,30);assert.equal(candidate.localReady,30);assert.ok(candidate.items.every(i=>i.asset?.video&&i.asset?.poster&&i.status==='local_source_ready_for_review'));assert.equal(candidate.items.filter(i=>i.source_kind==='adapted_author_source').length,26);assert.equal(candidate.items.filter(i=>i.source_kind==='independent_code').length,4);assert.ok(candidate.items.every(i=>!formal.items.some(f=>f.id===i.id)));assert.ok(query('verify','--scope','candidates').result.every(i=>i.ready));});
test('Classification is purpose, concrete task, placement and design goal',()=>{assert.equal(formal.taxonomy.length,6);assert.equal(formal.taxonomy.reduce((n,s)=>n+Object.keys(s.tasks).length,0),24);assert.deepEqual(formal.taxonomy,candidate.taxonomy);for(const i of [...formal.items,...candidate.items])for(const u of i.uses){assert.ok(formal.taxonomy.find(s=>s.id===u.scene)?.tasks[u.task]);assert.ok(u.placement&&u.goal);}});
test('Agent receives actual readable source instead of oversized dependency bundles',()=>{const a=query('inspect','online-lens','--section','all').result;assert.equal(a.integrity.verified,true);assert.match(a.entryCode,/createRuntime/);assert.ok(a.sourceMap.some(s=>s.path==='src/hybrid/modern-engine.js'));for(const id of ['curated-spatial-product','curated-glass-torus','curated-rounded-menu']){const r=query('inspect',id,'--scope','candidates','--section','all').result;assert.ok(r.integrity.verified&&r.design.includes('实际用途'));assert.equal(r.entryCodeKind,'bounded_source_samples');assert.ok(r.entryCode.length>30&&r.entryCode.length<30000&&r.sourceSamples.length);assert.ok(r.sourceRoot.endsWith('/source'));}});
test('Rejected or unknown references are never silently restored',()=>{assert.throws(()=>query('get','online-tree'));assert.throws(()=>query('inspect','unknown','--scope','candidates'));});
test('Private curator notes stay outside production outputs',async()=>{const p=JSON.parse(await read('curation/formal-merge/private/review-decision.json'));for(const note of Object.values(p.privateNotes))for(const text of [html,redirectHTML,JSON.stringify(formal),JSON.stringify(candidate)])assert.ok(!text.includes(note));for(const c of [formal,candidate])for(const i of c.items)for(const k of ['note','notes','hidden','events','user_preference'])assert.ok(!(k in i));assert.ok(html.includes('motion-vault-curated-originals-30-v1'));assert.ok(html.includes('id="reviewNote"'));assert.ok(!redirectHTML.includes('reviewNote'));assert.equal(query('search').privateCurationIncluded,false);});
test('Source demos keep their isolation in the unified page; hover loads only local previews',()=>{assert.match(html,/frame\.sandbox\s*=\s*['"]allow-scripts['"]/);assert.ok(html.includes('createSourceBroker(frame,it,channel)'));assert.ok(!html.includes('allow-same-origin'));assert.ok(!html.includes('frame.src=it.demo_url'));assert.ok(!html.includes('object-index'));assert.ok(html.includes('id="taskTabs"'));assert.ok(!html.includes('id="taskFilter"'));});
test('Published pages correspond to the currently validated staged artifacts',async()=>{assert.equal(sha(html),receipt.formalSha256);assert.equal(sha(redirectHTML),receipt.candidateSha256);for(const f of ['candidate-validation.json','sandbox.json']){const e=JSON.parse(await read('lineage/current/'+f));assert.equal(e.formalHash,sha(html));assert.equal(e.candidateSha256||e.candidateHash,sha(redirectHTML));assert.equal(e.redirectSha256,sha(redirectHTML));assert.equal(e.passed,e.total);}const e=JSON.parse(await read('lineage/current/no-preference.json'));assert.equal(e.formalHash,sha(html));assert.equal(e.candidateHash,sha(redirectHTML));assert.equal(e.passed,e.total);});
test('Public inventory contains no font files, private folders or obsolete builds',async()=>{const inv=JSON.parse(await read('lineage/current/asset-inventory.json'));assert.equal(inv.files.length,receipt.assetFiles);for(const f of inv.files){assert.doesNotMatch(f.file,/(^|\/)(private|node_modules|dist|fonts?)\/|\.(woff2?|ttf|otf|eot)$/i);assert.equal((await stat(path.join(root,'web/motion-vault-assets',f.file))).size,f.bytes);}});
test('Capture, import retry, hide/restore and permanent entry identities remain',()=>{for(const s of ['id="fileInput"','id="saveDialog"','getDisplayMedia','MediaRecorder','saveRequestId','prepareCapture','saveCapture','id="viewTabs"','id="modalArchiveBtn"','archive-btn'])assert.ok(html.includes(s),s);assert.ok(html.includes("release:'formal'"));assert.ok(html.includes('const CANDIDATES='));assert.ok(!html.includes("release:'hover-intent"));});
test('Same-code previews retain clear original-versus-independent provenance',()=>{for(const i of candidate.items){assert.equal(i.asset.source_verified,false);assert.equal(i.asset.preview_kind,i.source_kind==='independent_code'?'local_render':'adapted_source_render');}assert.equal(receipt.privateReviewPublished,false);assert.equal(receipt.userBrowserDataChanged,false);assert.equal(receipt.hubBusinessDataChanged,false);});


test('Recaptured candidate media changes its browser cache identity independently of source code',async()=>{for(const i of candidate.items){for(const [fileKey,revisionKey] of [['video','videoRevision'],['poster','posterRevision']]){const actual=sha(await readFile(path.join(root,'web',i.asset[fileKey]))).slice(0,16);assert.equal(i.asset[revisionKey],actual,i.id+' '+fileKey+' revision must identify the current media bytes');}}});

test('A single page serves library, pending review and hidden states',()=>{for(const view of ['library','pending','hidden'])assert.ok(html.includes('data-view="'+view+'"'));assert.ok(!html.includes('href="motion-vault-candidates.html"'));assert.ok(Buffer.byteLength(redirectHTML)<2048);assert.ok(redirectHTML.includes('location.replace'));assert.ok(redirectHTML.includes('view=pending'));assert.ok(!/CandidateVault|const CATALOG|id="grid"/.test(redirectHTML));});


// Exercise the production cache closure; only browser/network scheduling is controlled.
const previewCacheSource=await read('src/hybrid/gallery.js');
function previewCacheHarness(t){
 const marker='const previewMedia=(()=>{',start=previewCacheSource.indexOf(marker);
 const end=previewCacheSource.indexOf('\nfunction playVideo(',start);
 assert.ok(start>=0&&end>start,'production previewMedia closure is present');
 let now=0,nextId=1,observer;
 const timers=new Map(),rafs=new Map(),requests=[],liveURLs=new Map(),revoked=[];
 const flush=()=>new Promise(resolve=>setImmediate(resolve));
 const canonical=it=>{const u=new URL(it.asset.video,'http://vault.test/');u.searchParams.set('v',it.asset.videoRevision);return u.href;};
 const context={
  document:{hidden:false,querySelector:()=>null},navigator:{maxTouchPoints:0},innerHeight:900,
  window:{addEventListener(){}},matchMedia:()=>({matches:true,addEventListener(){}}),
  performance:{now:()=>now},AbortController,Blob,
  URL:{createObjectURL(blob){const url='blob:fixture-'+nextId++;liveURLs.set(url,blob);return url;},
   revokeObjectURL(url){revoked.push(url);liveURLs.delete(url);}},
  setTimeout(fn,ms){const id=nextId++;timers.set(id,{at:now+ms,fn});return id;},
  clearTimeout:id=>timers.delete(id),
  requestAnimationFrame(fn){const id=nextId++;rafs.set(id,fn);return id;},
  cancelAnimationFrame:id=>rafs.delete(id),
  isCandidate:()=>true,
  localURL:(video,revision)=>canonical({asset:{video,videoRevision:revision}}),
  IntersectionObserver:class{
   constructor(callback){this.callback=callback;this.targets=new Set();observer=this;}
   observe(stage){this.targets.add(stage);}
   disconnect(){this.targets.clear();}
  },
  fetch(url,options){
   return new Promise((resolve,reject)=>{
    const request={url,options,settled:false,bodyController:null,
     respond(bytes=new Uint8Array([1,2,3,4])){if(this.settled)return;this.settled=true;resolve(new Response(bytes,{headers:{'content-length':String(bytes.byteLength)}}));},
     openBody(){if(this.settled)return;this.settled=true;resolve(new Response(new ReadableStream({start:controller=>{this.bodyController=controller;}})));},
     finishBody(bytes=new Uint8Array([1,2,3,4])){assert.ok(this.bodyController);this.bodyController.enqueue(bytes);this.bodyController.close();this.bodyController=null;},
     fail(error=new Error('Controlled network failure')){if(this.bodyController){this.bodyController.error(error);this.bodyController=null;}if(this.settled)return;this.settled=true;reject(error);}};
    requests.push(request);
    options.signal.addEventListener('abort',()=>request.fail(Object.assign(new Error('Aborted'),{name:'AbortError'})),{once:true});
   });
  }
 };
 const closure=previewCacheSource.slice(start,end),returnAt=closure.lastIndexOf('\n return{');
 assert.ok(returnAt>0,'production cache return is present');
 const inspect='\n globalThis.cacheSnapshot=()=>({bytes,entries:entries.size,jobs:typeof jobs!=="undefined"?jobs.size:busy?1:0,reservedBytes:typeof reservedBytes==="function"?reservedBytes():0,reservedItems:typeof reservedItems==="function"?reservedItems():0});';
 runInNewContext(closure.slice(0,returnAt)+inspect+closure.slice(returnAt)+'\nglobalThis.cache=previewMedia;',context,{filename:'src/hybrid/gallery.js:previewMedia'});
 const cache=context.cache;
 t.after(async()=>{cache.suspend();await flush();});
 return {cache,requests,liveURLs,revoked,canonical,flush,snapshot:()=>context.cacheSnapshot(),
  item:{id:'cache-fixture',asset:{video:'motion-vault-assets/cache-fixture/preview.mp4',videoRevision:'0123456789abcdef'}},
  stage:()=>({isConnected:true,getBoundingClientRect:()=>({top:100,bottom:300,width:320,height:200})}),
  near(stage){assert.ok(observer.targets.has(stage));observer.callback([{target:stage,isIntersecting:true}]);},
  frame(){const pending=[...rafs.values()];rafs.clear();for(const fn of pending)fn(now);},
  advance(ms){now+=ms;for(const [id,timer]of [...timers].sort((a,b)=>a[1].at-b[1].at))if(timer.at<=now&&timers.delete(id))timer.fn();}
 };
}
test('Preview media cache: timeout backs off and direct lease prevents duplicate fetch',async t=>{
 const h=previewCacheHarness(t),stage=h.stage();h.cache.observe(stage,h.item);h.near(stage);
 assert.equal(h.requests.length,1);
 const pending=h.cache.acquire(h.item);assert.equal(typeof pending.then,'function');
 h.advance(6000);await h.flush();const first=await pending;
 assert.equal(h.requests[0].options.signal.aborted,true);assert.equal(first.url,h.canonical(h.item));
 h.frame();assert.equal(h.requests.length,1,'timed-out fetch must not restart ahead of its direct waiter');
 first.release();h.frame();assert.equal(h.requests.length,1,'timeout establishes a retry backoff');
 h.advance(5999);h.cache.resume();assert.equal(h.requests.length,1);
 const direct=h.cache.acquire(h.item);assert.equal(typeof direct.then,'undefined');
 h.advance(1);h.cache.resume();assert.equal(h.requests.length,1,'direct playback remains protected after backoff expires');
 direct.release();h.frame();assert.equal(h.requests.length,2,'preparation can resume after the direct lease ends');
});
test('Preview media cache: a new generation does not inherit an aborted fetch',async t=>{
 const h=previewCacheHarness(t),oldStage=h.stage();h.cache.observe(oldStage,h.item);h.near(oldStage);
 h.cache.clear();assert.equal(h.requests[0].options.signal.aborted,true);
 const stage=h.stage();h.cache.observe(stage,h.item);h.near(stage);
 const direct=h.cache.acquire(h.item);
 assert.equal(typeof direct.then,'undefined','new hover must not await the old aborted job');
 assert.equal(direct.url,h.canonical(h.item));
 await h.flush();h.frame();assert.equal(h.requests.length,1,'old finally must not fetch over the new direct lease');
 direct.release();h.frame();assert.equal(h.requests.length,2);
 assert.equal(h.requests[1].options.signal.aborted,false);
 h.requests[1].respond();await h.flush();const prepared=h.cache.acquire(h.item);
 assert.match(prepared.url,/^blob:/);prepared.release();
});
test('Preview media cache: a true miss returns HTTP without starting a new prefetch',async t=>{
 const h=previewCacheHarness(t),stage=h.stage();h.cache.observe(stage,h.item);h.near(stage);
 h.requests[0].fail();await h.flush();h.frame();h.advance(6000);
 const direct=h.cache.acquire(h.item);
 assert.equal(typeof direct.then,'undefined','an eligible nearby miss must not start and await a low-priority download');
 assert.equal(direct.url,h.canonical(h.item));assert.equal(h.requests.length,1);
 h.cache.resume();assert.equal(h.requests.length,1,'direct lease suppresses speculative work for the same URL');
 direct.release();h.frame();assert.equal(h.requests.length,2);
});
test('Preview media cache: clear preserves live Blob leases and reclaims them on release',async t=>{
 const h=previewCacheHarness(t),stage=h.stage();h.cache.observe(stage,h.item);h.near(stage);
 h.requests[0].respond();await h.flush();
 const first=h.cache.acquire(h.item),second=h.cache.acquire(h.item);
 assert.match(first.url,/^blob:/);assert.equal(second.url,first.url);assert.equal(h.liveURLs.size,1);
 h.cache.clear();assert.equal(h.revoked.length,0,'clear must not revoke a Blob still held by a player');
 first.release();assert.equal(h.revoked.length,0);
 second.release();assert.deepEqual(h.revoked,[first.url]);assert.equal(h.liveURLs.size,0);
 first.release();second.release();assert.equal(h.revoked.length,1,'leases must release exactly once');
 const nextStage=h.stage();h.cache.observe(nextStage,h.item);h.near(nextStage);
 h.requests[1].respond();await h.flush();assert.equal(h.liveURLs.size,1);
 h.cache.clear();assert.equal(h.liveURLs.size,0);assert.equal(h.revoked.length,2,'unleased cached bytes are reclaimed immediately');
});

test('Preview media cache: a stalled body does not block a second visible item',async t=>{
 const h=previewCacheHarness(t),water={...h.item,id:'water',asset:{...h.item.asset,video:'water.mp4'}},reaction={...h.item,id:'reaction',asset:{...h.item.asset,video:'reaction.mp4'}};
 const waterStage=h.stage();h.cache.observe(waterStage,water);h.near(waterStage);
 h.requests[0].openBody();await h.flush();
 const reactionStage=h.stage();h.cache.observe(reactionStage,reaction);h.near(reactionStage);
 assert.equal(h.requests.length,2,'a visible second item starts while the first response body remains stalled');
 assert.equal(h.requests[0].options.signal.aborted,false,'the stalled neighbor keeps its original slot');
 const first=h.cache.acquire(reaction),second=h.cache.acquire(reaction);
 assert.equal(typeof first.then,'function');assert.equal(typeof second.then,'function');assert.equal(h.requests.length,2,'same-key waiters share one preparation');
 h.requests[1].respond();await h.flush();
 const [a,b]=await Promise.all([first,second]);assert.match(a.url,/^blob:/);assert.equal(b.url,a.url);
 assert.ok(h.requests[0].bodyController,'neighbor body is still pending');assert.equal(h.requests[0].options.signal.aborted,false);
 a.release();b.release();h.requests[0].finishBody();await h.flush();
});
test('Preview media cache: pending jobs reserve entry and byte budgets',async t=>{
 const h=previewCacheHarness(t),maxBytes=24*1024*1024,itemBytes=4*1024*1024;
 const budget=()=>{const state=h.snapshot();assert.ok(state.jobs<=2,'at most two preparations');assert.equal(state.reservedItems,state.jobs,'each pending job reserves its entry');assert.ok(state.bytes+state.reservedBytes<=maxBytes,'cached plus reserved bytes stay within 24 MiB');assert.ok(state.entries+state.reservedItems<=9,'cached plus reserved entries stay within nine');return state;};
 for(let n=0;n<9;n++){const stage=h.stage();h.cache.observe(stage,{...h.item,id:'budget-'+n,asset:{...h.item.asset,video:'budget-'+n+'.mp4'}});h.near(stage);budget();}
 assert.equal(h.requests.length,2);assert.equal(budget().reservedBytes,2*itemBytes,'both in-flight bodies reserve their full four-MiB cap');
 for(let round=0;round<9;round++){for(const request of h.requests.filter(r=>!r.settled))request.respond(new Uint8Array(itemBytes));await h.flush();budget();h.frame();budget();}
 assert.equal(h.requests.length,6,'six full-size entries exhaust the byte budget without a seventh download');
 assert.equal(h.liveURLs.size,6);assert.equal(budget().bytes,maxBytes);assert.equal(budget().jobs,0);
 h.cache.clear();await h.flush();assert.equal(h.liveURLs.size,0);assert.equal(budget().bytes,0);
});
