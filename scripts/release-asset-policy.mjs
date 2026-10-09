// Side-effect-free publication selection policy. Paths are exact POSIX paths
// relative to motion-vault-assets/, not basenames, URLs or normalized aliases.
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';

const lens='spatial-webgl-lens',paper='spatial-paper-crumple';
const rows=[
 {file:'PlayfairDisplay-Italic.woff',id:lens,sha256:'44ef21f3734a8fd344563c2738af3fc0f0820bf4dd8b5cd1a51ed78b8687a6e3',copies:['source/public/fonts','run/fonts'],notice:'font-license-review/playfairdisplay-OFL.txt',noticeSha256:'38392b456b09893673b9e75dc3930f2f797c3a66a3e8f5e06d0a30b1969ed1f3'},
 {file:'Poppins-Medium.woff',id:lens,sha256:'9ec8c55ca9a20762804eddbda1f3bb327d2d19245d89a7ee6f2076421c60c6c1',copies:['source/public/fonts','run/fonts'],notice:'font-license-review/poppins-OFL.txt',noticeSha256:'4c3caa31f553f5569596e7a138e92e060f10b277ed2e4f9f899cf056d6bb4e9f'},
 {file:'Poppins-Regular.woff',id:lens,sha256:'c68e1edb2e2414da9f1a46a81131ceeb09e082363d20c8605d5edb929a1bf648',copies:['source/public/fonts','run/fonts'],notice:'font-license-review/poppins-OFL.txt',noticeSha256:'4c3caa31f553f5569596e7a138e92e060f10b277ed2e4f9f899cf056d6bb4e9f'},
 {file:'Poppins-SemiBold.woff',id:lens,sha256:'952d2591178ef0c2dea37fb2c14f01e18433c8d59db10f6365c9e1ca9e8efe2a',copies:['source/public/fonts','run/fonts'],notice:'font-license-review/poppins-OFL.txt',noticeSha256:'4c3caa31f553f5569596e7a138e92e060f10b277ed2e4f9f899cf056d6bb4e9f'},
 {file:'Caveat.ttf',id:paper,sha256:'0bdb6b660482d31531b3945849fba5916b3ef8695da7024a9e6b9ee3c4157988',copies:['vendor-assets','run/fonts'],notice:'vendor-licenses/Caveat-OFL.txt',noticeSha256:'1f9d81d094273d82f3898a1ee8b598a717d050ecbf5ff7bede105b704880157b'},
 {file:'Yomogi.ttf',id:paper,sha256:'ec280f473a03187292905618f24fdb08a6dcbf8620b52637e3b589fe745259b9',copies:['vendor-assets','run/fonts'],notice:'vendor-licenses/Yomogi-OFL.txt',noticeSha256:'bc0330d5973ab1f200553f51b4cb4ef11b81187fdcd0249f7f83992726c02a48'},
];
// These six unchanged binaries were reviewed under SIL OFL 1.1. No package-wide
// or extension-wide permission is granted. Keep the accompanying full notices.
export const REVIEWED_OFL_FONTS=Object.freeze(rows.map(row=>Object.freeze({
 ...row,copies:Object.freeze([...row.copies]),
 paths:Object.freeze(row.copies.map(copy=>`${row.id}/${copy}/${row.file}`)),
 noticePath:`${row.id}/${row.notice}`,
})));
// These two audited files are plain JavaScript source, not fonts. They contain
// only the upstream Next Geist shell helper (no embedded data or private values)
// and are retained for complete readable source provenance, never as a runtime
// request for a font. Their directory name does not grant any sibling access.
export const REVIEWED_FONT_DIRECTORY_SOURCES=Object.freeze([
 Object.freeze({path:'spatial-kinetic-images/source/src/assets/fonts/font-faces.js',sha256:'d4913773b370d1970e74b904593f5ad35a56bbbf516a7f7001e903a6b4adc0ca'}),
 Object.freeze({path:'spatial-kinetic-images/adapter/src/assets/fonts/font-faces.js',sha256:'d4913773b370d1970e74b904593f5ad35a56bbbf516a7f7001e903a6b4adc0ca'}),
]);
const fontDirectorySources=new Map(REVIEWED_FONT_DIRECTORY_SOURCES.map(row=>[row.path,row.sha256]));
const fonts=new Map(REVIEWED_OFL_FONTS.flatMap(row=>row.paths.map(relative=>[relative,row])));
const notices=new Map(REVIEWED_OFL_FONTS.map(row=>[row.noticePath,row.noticeSha256]));
const fontExtension=/\.(woff2?|ttf|otf|eot)$/i;
const excluded=/\.(woff2?|ttf|otf|eot|map)$/i;
const protectedNames=new Set(['.git','node_modules','dist','private']);
const fontNames=new Set(['fonts','font']);
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const underFontDirectory=relative=>relative.split('/').slice(0,-1).some(name=>fontNames.has(name));
const hasApprovedDescendant=relative=>[...fonts.keys(),...fontDirectorySources.keys()].some(name=>name.startsWith(relative+'/'));

export function isReviewedFont(relative,sha256){return fonts.get(relative)?.sha256===sha256&&typeof sha256==='string';}
export function isReviewedFontDirectorySource(relative,sha256){return fontDirectorySources.get(relative)===sha256&&typeof sha256==='string';}
export function isReviewedFontDirectoryAsset(relative,sha256){return isReviewedFont(relative,sha256)||isReviewedFontDirectorySource(relative,sha256);}

// Call again on the exact bytes entering the publication payload. A change
// between directory enumeration and payload reading must not bypass the hash.
export function assertPublishableAssetBytes(relative,bytes){
 if(fontExtension.test(relative)){
  if(!fonts.has(relative))throw new Error('Unreviewed font path: '+relative);
  if(!isReviewedFont(relative,digest(bytes)))throw new Error('Reviewed font hash mismatch: '+relative);
 }
 const sourceHash=fontDirectorySources.get(relative);
 if(sourceHash&&digest(bytes)!==sourceHash)throw new Error('Reviewed font-directory source hash mismatch: '+relative);
 const noticeHash=notices.get(relative);
 if(noticeHash&&digest(bytes)!==noticeHash)throw new Error('Reviewed font license hash mismatch: '+relative);
}

// This is a read-only walker, safe to import from unit tests. It does not load
// release.mjs, sync-gallery.mjs, build-hybrid.mjs or any publication entrypoint.
export async function walkPublishableAssets(root){
 const verifiedNotices=new Set();
 async function verifyNotice(row){
  if(verifiedNotices.has(row.noticePath))return;
  let bytes;
  try{bytes=await readFile(path.join(root,row.noticePath));}
  catch(error){if(error.code==='ENOENT')throw new Error('Reviewed font license missing: '+row.noticePath);throw error;}
  assertPublishableAssetBytes(row.noticePath,bytes);
  verifiedNotices.add(row.noticePath);
 }
 async function walk(dir,prefix=''){
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
   if(entry.isSymbolicLink())throw new Error('Symlink is not a publishable asset');
   if(protectedNames.has(entry.name))continue;
   const relative=prefix?prefix+'/'+entry.name:entry.name;
   const absolute=path.join(dir,entry.name);
   if(entry.isDirectory()){
    if(excluded.test(entry.name))continue;
    if((fontNames.has(entry.name)||underFontDirectory(relative))&&!hasApprovedDescendant(relative))continue;
    out.push(...await walk(absolute,relative));
   }else if(entry.isFile()){
    if(fontExtension.test(entry.name)){
     const reviewed=fonts.get(relative);
     if(!reviewed)continue;
     const bytes=await readFile(absolute);
     assertPublishableAssetBytes(relative,bytes);
     await verifyNotice(reviewed);
     out.push(relative);
    }else{
     if(excluded.test(entry.name)||fontNames.has(entry.name))continue;
     if(underFontDirectory(relative)){
      if(!fontDirectorySources.has(relative))continue;
      assertPublishableAssetBytes(relative,await readFile(absolute));
     }
     out.push(relative);
    }
   }
  }
  return out.sort();
 }
 return walk(root);
}
