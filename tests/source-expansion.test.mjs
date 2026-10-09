import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const read=async p=>JSON.parse(await readFile(path.join(root,p),'utf8'));
const registry=await read('src/hybrid/source-expansion-catalog.json');
const source=await readFile(path.join(root,'src/hybrid/gallery.js'),'utf8');
test('Expanded references supply real same-version preview media instead of grey placeholders',async()=>{
 for(const spec of registry){
  const folder='assets/design-assets/'+spec.id+'/';
  const asset=await read(folder+'asset.json');
  assert.equal(asset.preview.captured,true,spec.id+' has no captured local preview');
  assert.equal(asset.preview.implementationVersion,asset.version,spec.id+' preview/source version mismatch');
  for(const type of ['poster','video']){
   assert.ok(asset.preview[type],spec.id+' missing '+type);
   const bytes=await readFile(path.join(root,folder,asset.preview[type]));
   assert.ok(bytes.length>1000,spec.id+' empty '+type);
   assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.preview[type+'Sha256'],spec.id+' unbound '+type);
  }
 }
});
test('20 new authored effects plus 4 previous studies remain distinct pending entries',async()=>{
 assert.equal(registry.filter(x=>x.batch==='new20').length,20);
 assert.equal(registry.filter(x=>x.batch==='previous4').length,4);
 const formal=await read('web/catalog.json');const candidates=await read('web/candidate-catalog.json');
 const baseline=candidates.items.filter(x=>!registry.some(r=>r.id===x.id));
 assert.equal(formal.items.length,60);assert.equal(baseline.length,30);
 const ids=[...formal.items,...baseline,...registry].map(x=>String(x.id));assert.equal(new Set(ids).size,114);
 const taxonomy=new Map(formal.taxonomy.map(x=>[x.id,new Set(Object.keys(x.tasks))]));
 for(const x of registry){assert.ok(x.uses.every(u=>taxonomy.get(u.scene)?.has(u.task)));assert.ok(x.source_url.startsWith('https://github.com/'));}
});
test('Every additive asset has valid local source/doc/runtime hashes and no fake capture',async()=>{
 for(const spec of registry){
  const prefix='assets/design-assets/'+spec.id+'/';const a=await read(prefix+'asset.json');
  assert.equal(a.id,spec.id);assert.equal(a.kind,spec.source_kind);
  if(a.preview.captured){
   assert.equal(a.status,'local_source_verified');
   const saved=(await read('lineage/current/version-unification.json')).archivedCaptureReceipts[a.preview.capture.receipt];
   if(saved)assert.equal(createHash('sha256').update(saved.utf8).digest('hex'),saved.sha256);
   const receipt=saved?JSON.parse(saved.utf8):await read(a.preview.capture.receipt);
   const item=receipt.items.find(x=>x.id===spec.id);
   assert.equal(item?.passed,true,spec.id+' has no successful real capture');
   assert.equal(item.media.sourceVersion,a.version);
   assert.equal(item.media.videoSha256,a.preview.videoSha256);
   assert.equal(item.media.posterSha256,a.preview.posterSha256);
   assert.ok(item.media.visibleChanges>=12);
   assert.ok(item.media.frames<=item.media.nativeFrames);
   assert.equal(item.sourceBefore.sha256,item.sourceAfter.sha256);
   assert.deepEqual(item.runtime.errors,[]);assert.deepEqual(item.runtime.sourceErrors,[]);
   assert.deepEqual(item.runtime.outside,[]);
   assert.equal(a.validation.visual,'not_accepted');assert.equal(a.validation.production,'not_approved');
  }else{
   assert.equal(a.status,'local_source_pending_browser_verification');
   assert.equal(a.preview.video,undefined);
  }
  for(const key of ['run','entry','design','implementation','parameters','provenance'])assert.ok(a.hashes[a[key]],spec.id+' '+key);
  assert.ok(a.hashes['run/vault-native-input.js']);
  for(const [relative,hash] of Object.entries(a.hashes)){
   assert.ok(!relative.includes('..')&&!relative.startsWith('/')&&!relative.includes('node_modules/'));
   assert.equal(createHash('sha256').update(await readFile(path.join(root,prefix,relative))).digest('hex'),hash,spec.id+'/'+relative);
  }
 }
});
test('Pointer state accepts only exact isolated frame, origin, session and bounded data',()=>{
 const fn=source.slice(source.indexOf('function sourcePointerMessage('),source.indexOf('\nfunction interactive('));
 const context=vm.createContext({});vm.runInContext(fn,context);
 const win={},frame={contentWindow:win};const valid={source:win,origin:'null',data:{type:'vault-native-pointer',channel:'a',phase:'down',pointerId:1,buttons:1,clientX:3,clientY:5,viewportWidth:1100,viewportHeight:670}};
 assert.ok(context.sourcePointerMessage(valid,frame,'a'));
 for(const e of [{...valid,origin:'https://example.test'},{...valid,source:{}},{...valid,data:{...valid.data,channel:'b'}},{...valid,data:{...valid.data,phase:'move'}},{...valid,data:{...valid.data,viewportWidth:0}},{...valid,data:{...valid.data,clientX:NaN}}])assert.equal(context.sourcePointerMessage(e,frame,'a'),null);
});
test('Missing recorded previews remain unavailable and do not masquerade as live previews',async()=>{
 assert.ok(!source.includes("previewMode==='interactive'||unrecordedSource(it)"));
 assert.ok(source.includes('else if(it.asset.video)playVideo(stage,it,null);'));
 assert.ok(source.includes("$('runPreview').disabled=unrecordedSource(it)"));
 assert.ok(source.includes('sourceRetirement.then('));
 assert.ok(source.includes('session.begin()'));
 assert.ok(source.includes('session.dispose().finally(cleanup)'));
 const bridge=await readFile(path.join(root,'assets/design-assets',registry[0].id,'run/vault-native-input.js'),'utf8');
 assert.ok(bridge.includes('if(!e.isTrusted)return;'));assert.ok(!bridge.includes('dispatchEvent'));
 assert.ok(source.includes("window.removeEventListener('message',onPointer)"));
});
