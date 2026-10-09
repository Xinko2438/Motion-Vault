import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,mkdtemp,rm,symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {REVIEWED_OFL_FONTS,REVIEWED_FONT_DIRECTORY_SOURCES,isReviewedFont,isReviewedFontDirectorySource,isReviewedFontDirectoryAsset,assertPublishableAssetBytes,walkPublishableAssets} from '../scripts/release-asset-policy.mjs';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
async function temporary(t){const root=await mkdtemp(path.join(tmpdir(),'motion-vault-font-policy-'));t.after(()=>rm(root,{recursive:true,force:true}));return root;}
async function put(root,relative,bytes='fixture'){const absolute=path.join(root,relative);await mkdir(path.dirname(absolute),{recursive:true});await writeFile(absolute,bytes);}
async function approvedSource(t,row,relative){
 for(const root of [path.resolve(project,'../work'),path.join(project,'assets/design-assets')]){
  try{return await readFile(path.join(root,relative));}catch(error){if(error.code!=='ENOENT')throw error;}
 }
 t.skip('Reviewed source fixture is unavailable in both package source locations: '+relative);
 return null;
}

test('allowlist contains exactly six reviewed binaries and twelve exact copy paths',()=>{
 assert.equal(REVIEWED_OFL_FONTS.length,6);
 const paths=REVIEWED_OFL_FONTS.flatMap(row=>row.paths);
 assert.equal(new Set(paths).size,12);
 assert.deepEqual([...new Set(REVIEWED_OFL_FONTS.map(row=>row.id))].sort(),['spatial-paper-crumple','spatial-webgl-lens']);
 assert.ok(Object.isFrozen(REVIEWED_OFL_FONTS));
 for(const row of REVIEWED_OFL_FONTS){assert.ok(Object.isFrozen(row));assert.ok(Object.isFrozen(row.paths));for(const relative of row.paths)assert.equal(isReviewedFont(relative,row.sha256),true);}
});

test('wrong hashes and malformed digest types never approve a font',()=>{
 for(const row of REVIEWED_OFL_FONTS)for(const relative of row.paths){
  assert.equal(isReviewedFont(relative,'0'.repeat(64)),false);
  assert.equal(isReviewedFont(relative,row.sha256.toUpperCase()),false);
  assert.equal(isReviewedFont(relative,undefined),false);
  assert.throws(()=>assertPublishableAssetBytes(relative,Buffer.from('changed font bytes')),/font hash mismatch/);
 }
 assert.equal(isReviewedFont('unknown',undefined),false);
});

test('same bytes or filename at another path never expands font permission',()=>{
 const row=REVIEWED_OFL_FONTS[0],relative=row.paths[1];
 for(const wrong of [relative.replace(row.id,'another-package'),relative.replace('/run/','/elsewhere/'),relative.replace('fonts/','font/'),'./'+relative,'/'+relative,'motion-vault-assets/'+relative,relative.replace('/run/','/run/../run/'),relative.replace('/run/','//run/'),relative.replaceAll('/','\\'),relative.replace('/fonts/','/%66onts/'),relative.toUpperCase(),relative+'?copy=1'])assert.equal(isReviewedFont(wrong,row.sha256),false,wrong);
 assert.throws(()=>assertPublishableAssetBytes('unrelated/run/fonts/PlayfairDisplay-Italic.woff',Buffer.from('unrelated')),/Unreviewed font path/);
});

test('walker preserves unrelated font, map, private and protected-tree exclusions',async t=>{
 const root=await temporary(t);
 for(const relative of ['demo/run/font.woff','demo/run/font.woff2','demo/run/font.ttf','demo/run/font.otf','demo/run/font.eot','demo/run/UPPER.WOFF','demo/run/effect.js.map','demo/run/private/secrets.json','demo/.git/config','demo/node_modules/module.js','demo/dist/index.js','demo/font/notice.txt','demo/fonts/nested/readme.txt','demo/data.woff/readme.txt','demo/source.map/readme.txt','spatial-webgl-lens/run/fonts/Unrelated.woff','spatial-webgl-lens/run/fonts/readme.txt','spatial-webgl-lens/run/fonts/nested/extra.txt'])await put(root,relative);
 await put(root,'demo/run/effect.js');await put(root,'demo/README.md');
 assert.deepEqual(await walkPublishableAssets(root),['demo/README.md','demo/run/effect.js']);
});

test('walker fails closed for altered bytes at an approved font path',async t=>{
 const root=await temporary(t),row=REVIEWED_OFL_FONTS[0];
 await put(root,row.paths[1],Buffer.from('not the reviewed font'));
 await assert.rejects(walkPublishableAssets(root),/Reviewed font hash mismatch/);
});

test('walker still rejects symlinks before skipping protected names',async t=>{
 const root=await temporary(t);await put(root,'normal.txt');
 try{await symlink(path.join(root,'normal.txt'),path.join(root,'private'));}catch(error){if(['EPERM','ENOTSUP'].includes(error.code)){t.skip('Symlink creation not available');return;}throw error;}
 await assert.rejects(walkPublishableAssets(root),/Symlink/);
});

test('actual unchanged reviewed fonts and notices pass at their exact copy paths',async t=>{
 const root=await temporary(t);
 for(const row of REVIEWED_OFL_FONTS){
  const font=await approvedSource(t,row,row.paths[0]);if(!font)return;
  const notice=await approvedSource(t,row,row.noticePath);if(!notice)return;
  await put(root,row.noticePath,notice);
  for(const relative of row.paths){const actualCopy=await approvedSource(t,row,relative);if(!actualCopy)return;assert.deepEqual(actualCopy,font);assert.doesNotThrow(()=>assertPublishableAssetBytes(relative,actualCopy));await put(root,relative,actualCopy);}
 }
 const selected=await walkPublishableAssets(root);
 const expected=[...new Set(REVIEWED_OFL_FONTS.flatMap(row=>[...row.paths,row.noticePath]))].sort();
 assert.deepEqual(selected,expected);
});

test('reviewed fonts require their exact OFL notice, not a missing or changed license',async t=>{
 const root=await temporary(t),row=REVIEWED_OFL_FONTS[0];
 const font=await approvedSource(t,row,row.paths[0]);if(!font)return;
 await put(root,row.paths[1],font);
 await assert.rejects(walkPublishableAssets(root),/font license missing/);
 await put(root,row.noticePath,'substituted license text');
 await assert.rejects(walkPublishableAssets(root),/font license hash mismatch/);
 assert.throws(()=>assertPublishableAssetBytes(row.noticePath,Buffer.from('changed after walk')),/font license hash mismatch/);
});

test('a post-walk mutation is rejected at the payload-byte check',async t=>{
 const root=await temporary(t),row=REVIEWED_OFL_FONTS[0];
 const font=await approvedSource(t,row,row.paths[0]),notice=await approvedSource(t,row,row.noticePath);if(!font||!notice)return;
 await put(root,row.paths[1],font);await put(root,row.noticePath,notice);
 assert.ok((await walkPublishableAssets(root)).includes(row.paths[1]));
 await put(root,row.paths[1],'modified after enumeration');
 const changed=await readFile(path.join(root,row.paths[1]));
 assert.throws(()=>assertPublishableAssetBytes(row.paths[1],changed),/font hash mismatch/);
});

test('both publication callers use shared selection and recheck exact payload bytes',async()=>{
 // Read only. Importing these entrypoints would execute publication/status work.
 for(const name of ['release.mjs','sync-gallery.mjs']){
  const source=await readFile(path.join(project,'scripts',name),'utf8');
  assert.match(source,/import \{walkPublishableAssets as walk,assertPublishableAssetBytes\} from '\.\/release-asset-policy\.mjs'/);
  assert.match(source,/const bytes=await readFile\([^;]+;assertPublishableAssetBytes\(f,bytes\);(?:payload|source)\.set\('motion-vault-assets\/'\+f,bytes\)/);
 }
});


test('only two audited plain-JS source paths get a separate fonts-directory exception',async t=>{
 assert.equal(REVIEWED_FONT_DIRECTORY_SOURCES.length,2);
 assert.ok(Object.isFrozen(REVIEWED_FONT_DIRECTORY_SOURCES));
 for(const row of REVIEWED_FONT_DIRECTORY_SOURCES){
  assert.ok(Object.isFrozen(row));
  const bytes=await approvedSource(t,null,row.path);if(!bytes)return;
  assert.ok([...bytes].every(byte=>byte===9||byte===10||byte===13||(byte>=32&&byte<=126)),'Audited file must remain plain ASCII JavaScript');
  const text=bytes.toString('utf8');
  assert.match(text,/import \{ Geist \} from 'next\/font\/google'/);
  assert.doesNotMatch(text,/data:|base64|BEGIN .*PRIVATE KEY|api[_-]?key|access[_-]?token|password|secret/i);
  assert.equal(isReviewedFont(row.path,row.sha256),false,'JavaScript does not become an approved font binary');
  assert.equal(isReviewedFontDirectorySource(row.path,row.sha256),true);
  assert.equal(isReviewedFontDirectoryAsset(row.path,row.sha256),true);
  assert.doesNotThrow(()=>assertPublishableAssetBytes(row.path,bytes));
 }
});

test('source exceptions reject wrong hashes, paths, sibling files and binary extensions',()=>{
 for(const row of REVIEWED_FONT_DIRECTORY_SOURCES){
  assert.equal(isReviewedFontDirectorySource(row.path,'0'.repeat(64)),false);
  assert.equal(isReviewedFontDirectorySource(row.path,undefined),false);
  assert.throws(()=>assertPublishableAssetBytes(row.path,Buffer.from('changed source')),/font-directory source hash mismatch/);
  for(const wrong of [row.path.replace('spatial-kinetic-images','another-package'),row.path.replace('font-faces.js','other.js'),row.path.replace('font-faces.js','font-faces.woff'),row.path.replace('/fonts/','/font/'),'./'+row.path,row.path.replace('/fonts/','/fonts/../fonts/'),row.path.replaceAll('/','\\')]){
   assert.equal(isReviewedFontDirectorySource(wrong,row.sha256),false,wrong);
   assert.equal(isReviewedFontDirectoryAsset(wrong,row.sha256),false,wrong);
  }
 }
});

test('walker admits only audited source files inside kinetic fonts directories',async t=>{
 const root=await temporary(t);
 for(const row of REVIEWED_FONT_DIRECTORY_SOURCES){
  const bytes=await approvedSource(t,null,row.path);if(!bytes)return;
  await put(root,row.path,bytes);
  for(const file of ['font.woff','font.ttf','other.js','README.md','nested/file.js'])await put(root,path.posix.dirname(row.path)+'/'+file,bytes);
 }
 assert.deepEqual(await walkPublishableAssets(root),REVIEWED_FONT_DIRECTORY_SOURCES.map(row=>row.path).sort());
});

test('walker and payload check both reject modified kinetic source exceptions',async t=>{
 const root=await temporary(t),row=REVIEWED_FONT_DIRECTORY_SOURCES[0];
 const bytes=await approvedSource(t,null,row.path);if(!bytes)return;
 await put(root,row.path,bytes);assert.ok((await walkPublishableAssets(root)).includes(row.path));
 await put(root,row.path,Buffer.concat([bytes,Buffer.from('\n// changed')]));
 await assert.rejects(walkPublishableAssets(root),/font-directory source hash mismatch/);
 assert.throws(()=>assertPublishableAssetBytes(row.path,Buffer.concat([bytes,Buffer.from('\n// changed after walk')])),/font-directory source hash mismatch/);
});
