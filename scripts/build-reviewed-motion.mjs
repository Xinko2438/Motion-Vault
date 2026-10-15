// Rebuild the approved incremental artifact without rerunning preparation or
// regenerating protected effects through the pre-upgrade engine.
import {readFile,mkdir,writeFile,rename,rm} from 'node:fs/promises';
import path from 'node:path';
import {inventory,readReviewedPlan,verifyReviewedCandidate,sha} from './artifact-phase.mjs';
export async function buildReviewedMotion(project,stagedRoot){
 const plan=await readReviewedPlan(project),web=path.join(project,'web'),current=await inventory(web);
 const same=expected=>Object.keys(current.hashes).length===Object.keys(expected).length&&Object.entries(expected).every(([f,h])=>current.hashes[f]===h);
 if(!same(plan.baselineInventory)&&!same(plan.finalInventory))throw Error('Current gallery changed outside the reviewed baseline/final tree; rebase required');
 const fresh=stagedRoot+'.dom33-'+process.pid;
 if(!path.resolve(fresh).startsWith(path.join(project,'.runtime')+path.sep))throw Error('Stage outside project runtime');
 await mkdir(fresh,{recursive:false});
 for(const [rel,digest]of Object.entries(plan.finalInventory)){
  const source=rel in plan.writes?path.join(project,'src/hybrid/dom33/payload',rel):path.join(web,rel),bytes=rel==='index.html'?plan.galleryBytes:rel==='.gitattributes'?plan.attributeBytes:await readFile(source);
  if(sha(bytes)!==digest)throw Error('Reviewed source changed '+rel);
  const target=path.join(fresh,rel);await mkdir(path.dirname(target),{recursive:true});await writeFile(target,bytes);
 }
 await writeFile(path.join(fresh,'candidates.html'),await readFile(path.join(project,'candidates/curated-originals/index.html')));
 const verified=await verifyReviewedCandidate(project,fresh,{staged:true});
 // The prior stage is disposable build output, bounded to this exact runtime path.
 if(path.resolve(stagedRoot)!==path.join(project,'.runtime/hybrid-assets/staged'))throw Error('Unexpected staging target');
 await rm(stagedRoot,{recursive:true,force:true});await rename(fresh,stagedRoot);
 return {staged:stagedRoot,selectedAssets:33,checkedFiles:verified.checkedFiles,planSha256:verified.planSha256,productionChanged:false};
}
