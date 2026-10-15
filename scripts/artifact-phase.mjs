// Candidate integrity is not a publication receipt and grants no visual approval.
import {readFile,readdir,lstat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
export const reviewedPlanSha256='1b1ed35957815ced13649cdb1db30b5db31da50ae6e84ad9bcff425169b75680';
export const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(ok,message)=>{if(!ok)throw Error('Candidate integrity: '+message);};
const safe=rel=>typeof rel==='string'&&!rel.includes('\\')&&!rel.includes(':')&&rel.split('/').every(p=>p&&p!=='.'&&p!=='..');
export function verifyCandidateInventory({plan,actual}){
 need(plan?.schema==='motion.reviewed-promotion-plan.v1','unsupported plan');
 const projected={...plan.baselineInventory};
 for(const [rel,row]of Object.entries(plan.writes)){
  need(safe(rel),'unsafe path');
  need((projected[rel]??null)===row.before,'before hash differs '+rel);
  projected[rel]=row.after;
 }
 for(const map of [projected,plan.finalInventory,actual])for(const [rel,h]of Object.entries(map))need(safe(rel)&&/^[a-f0-9]{64}$/.test(h),'invalid inventory record');
 const same=(a,b)=>Object.keys(a).length===Object.keys(b).length&&Object.entries(a).every(([k,v])=>b[k]===v);
 need(same(projected,plan.finalInventory),'unplanned change or deletion');
 need(same(actual,plan.finalInventory),'actual tree differs from reviewed final inventory');
 return {verified:true,phase:'candidate',publicationVerified:false,checkedFiles:Object.keys(actual).length};
}
export async function inventory(root){
 need(path.isAbsolute(root),'absolute root required');
 const paths=[];
 async function walk(dir,prefix=''){
  need(!(await lstat(dir)).isSymbolicLink(),'symlink directory');
  for(const e of await readdir(dir,{withFileTypes:true})){
   const rel=prefix+e.name;need(!e.isSymbolicLink(),'symlink '+rel);
   if(e.isDirectory())await walk(path.join(dir,e.name),rel+'/');
   else {need(e.isFile(),'unsupported entry '+rel);paths.push(rel);}
  }
 }
 await walk(root);const hashes={},files=[];
 for(let i=0;i<paths.length;i+=24)await Promise.all(paths.slice(i,i+24).map(async rel=>{const bytes=await readFile(path.join(root,rel));hashes[rel]=sha(bytes);files.push({file:rel,bytes:bytes.length,sha256:hashes[rel]});}));
 return {hashes,files:files.sort((a,b)=>a.file.localeCompare(b.file))};
}
export async function readReviewedPlan(project){
 const raw=await readFile(path.join(project,'src/hybrid/dom33/promotion-plan.json'));
 need(sha(raw)===reviewedPlanSha256,'reviewed plan changed');
 const plan=JSON.parse(raw);need(plan.allowedIds.length===33&&new Set(plan.allowedIds).size===33&&plan.mediaGate.mediaDependenciesReady===true,'invalid reviewed scope');
 const allowed=new Set(plan.allowedIds);
 for(const [rel,row]of Object.entries(plan.writes)){
  const parts=rel.split('/');
  need(['index.html','catalog.json','candidate-catalog.json'].includes(rel)||(parts[0]==='motion-vault-assets'&&(allowed.has(parts[1])||(parts[1]==='shared'&&row.before===null))),'write outside reviewed scope '+rel);
 }
 // The integration repair is separate from the immutable prepared plan. Only
 // this exact loader expression changes outside the prepared catalogue data.
 const original=await readFile(path.join(project,'src/hybrid/dom33/payload/index.html'),'utf8');
 need(sha(original)===plan.finalInventory['index.html'],'prepared gallery changed');
 const old="link.href=localURL('motion-vault-assets/shared/runtime.css',CATALOG.runtimeRevision||it.asset.version)",replacement="link.href=localURL(it.asset.style||'motion-vault-assets/shared/runtime.css',it.asset.style?it.asset.version:CATALOG.runtimeRevision||it.asset.version)";
 need(original.split(old).length===2,'loader patch boundary changed');
 const repaired=original.replace(old,replacement);
 plan.integrationRepair={file:'index.html',preparedSha256:sha(original),sha256:sha(repaired),reason:'Honor each asset declared stylesheet in the original gallery loader'};
 plan.finalInventory['index.html']=sha(repaired);plan.writes['index.html'].after=sha(repaired);
 // Byte-bound imports must survive a Windows checkout with core.autocrlf=true.
 // Scope attributes to the reviewed files; legacy unselected text is unchanged.
 const attributes=Buffer.from(['# Preserve exact reviewed bytes; leave protected legacy files unchanged.','index.html -text','catalog.json -text',...plan.allowedIds.map(id=>'motion-vault-assets/'+id+'/** -text'),'motion-vault-assets/shared/runtime.eb7967a461d0.mjs -text','motion-vault-assets/shared/runtime.88444c38f1d6.css -text','motion-vault-assets/shared/art-direction/d6ef3d56c60b669f/** -text',''].join('\n'));
 plan.finalInventory['.gitattributes']=sha(attributes);plan.writes['.gitattributes']={before:null,after:sha(attributes)};
 Object.defineProperty(plan,'attributeBytes',{value:attributes,enumerable:false});
 need(repaired.replaceAll('\r\n','\n').includes((await readFile(path.join(project,'src/hybrid/gallery.js'),'utf8')).replaceAll('\r\n','\n')),'gallery source diverged from reviewed integration repair');
 Object.defineProperty(plan,'galleryBytes',{value:Buffer.from(repaired),enumerable:false});
 return plan;
}
export function verifyPublicationTarget({beforeHash,afterHash,actualHash}){
 need(actualHash===(beforeHash??null)||actualHash===afterHash,'publication target contains a later edit');
}
export async function verifyReviewedCandidate(project,webRoot,{staged=false}={}){
 const plan=await readReviewedPlan(project),observed=await inventory(webRoot);
 if(staged){const redirect=await readFile(path.join(project,'candidates/curated-originals/index.html'));need(observed.hashes['candidates.html']===sha(redirect),'staged compatibility redirect differs');delete observed.hashes['candidates.html'];}
 return {...verifyCandidateInventory({plan,actual:observed.hashes}),planSha256:reviewedPlanSha256,files:observed.files.filter(f=>f.file.startsWith('motion-vault-assets/')).map(f=>({...f,file:f.file.slice(20)}))};
}
