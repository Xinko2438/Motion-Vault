// Bounded removal of the retired second gallery. The sole publisher remains release.mjs.
import {readFile,lstat,rm,readdir} from 'node:fs/promises';
import path from 'node:path';
import {project,sha,put,exists} from './build-hybrid.mjs';
const evidence=path.join(project,'lineage/current/single-page'),mode=process.argv[2];
if(!['audit','prune'].includes(mode))throw new Error('Use audit or prune. Build with build-hybrid.mjs and publish with release.mjs.');
const retired=[
 ['src/hybrid/candidate-app.js','Retired separate candidate controller'],
 ['candidates/curated-originals/src/app.js','Superseded full candidate application'],
 ['candidates/curated-originals/src/shell.html','Superseded second gallery shell'],
 ['candidates/curated-originals/src/style.css','Superseded duplicate gallery styles'],
 ['candidates/curated-originals/build.mjs','Superseded separate gallery builder'],
 ['candidates/curated-originals/make_catalog.py','Superseded batch generator; current source catalog retained'],
 ['src/hybrid/finish-candidate-interface.mjs','One-time patcher for the removed candidate app'],
 ['src/hybrid/consolidate.mjs','Completed historical migration that reads deleted page snapshots']
];
const baseline=JSON.parse(await readFile(path.join(evidence,'baseline.json'),'utf8'));
const expected=new Map(baseline.files.map(f=>[f.path,f.sha256]));
expected.set('src/hybrid/consolidate.mjs','92f308f0c6828a84b919908914ca24c658ffeaea8c628a66244ace2e6a48c19a');
const main=await readFile(path.join(project,'web/index.html')),redirect=await readFile(path.join(project,'candidates/curated-originals/index.html'));
const formalHash=sha(main),redirectSha256=sha(redirect),targets=[],skipped=[];
for(const [relative,reason] of retired){
 const absolute=path.resolve(project,relative);
 if(!absolute.startsWith(project+path.sep))throw new Error('Retired path leaves project');
 if(!await exists(absolute))continue;
 const stat=await lstat(absolute);if(!stat.isFile()||stat.isSymbolicLink())throw new Error('Retired target is not an ordinary file: '+relative);
 const bytes=await readFile(absolute),hash=sha(bytes);
 if(hash!==expected.get(relative))throw new Error('Retired target has changed: '+relative);
 targets.push({path:relative,sha256:hash,bytes:bytes.length,reason});
}
const runtimeRelative='.runtime/single-page-rollback',runtimePath=path.join(project,runtimeRelative);
async function inventory(dir,prefix=''){
 const list=[];for(const item of await readdir(dir,{withFileTypes:true})){
  const f=path.join(dir,item.name),relative=prefix?prefix+'/'+item.name:item.name,stat=await lstat(f);
  if(stat.isSymbolicLink())throw new Error('Linked rollback file');
  if(stat.isDirectory())list.push(...await inventory(f,relative));
  else if(stat.isFile()){const b=await readFile(f);list.push({path:relative,sha256:sha(b),bytes:b.length});}
 }return list.sort((a,b)=>a.path.localeCompare(b.path));
}
const scratch=await exists(runtimePath)?await inventory(runtimePath):[];
const report={at:new Date().toISOString(),apply:mode==='prune',formalHash,redirectSha256,targets,removed:[],skipped,temporaryFiles:scratch.length,assetFilesDeleted:0,userBrowserDataChanged:false};
if(mode==='prune'){
 const receipt=JSON.parse(await readFile(path.join(project,'lineage/current/install-receipt.json'),'utf8'));
 const proof=JSON.parse(await readFile(path.join(project,'lineage/current/live-candidate-validation.json'),'utf8'));
 if(receipt.applicationCount!==1||receipt.formalSha256!==formalHash||receipt.candidateSha256!==redirectSha256||proof.passed!==proof.total||proof.total<1||proof.formalHash!==formalHash||(proof.candidateSha256||proof.candidateHash)!==redirectSha256)throw new Error('Publish and verify the actual single-page path before removing retired UI');
 const plan=JSON.parse(await readFile(path.join(evidence,'cleanup-audit.json'),'utf8'));
 if(JSON.stringify(plan.targets)!==JSON.stringify(targets))throw new Error('Retired targets changed since audit');
 await put(evidence,'cleanup-plan.json',JSON.stringify({...report,temporaryInventory:scratch},null,2));
 for(const target of targets){const f=path.join(project,target.path);if(sha(await readFile(f))!==target.sha256)throw new Error('Concurrent edit: '+target.path);await rm(f);report.removed.push(target);}
 if(scratch.length){
  if(JSON.stringify(await inventory(runtimePath))!==JSON.stringify(scratch))throw new Error('Rollback scratch changed during cleanup');
  await rm(runtimePath,{recursive:true});report.temporaryFilesRemoved=scratch.length;
 }
 report.at=new Date().toISOString();
}
await put(evidence,mode==='prune'?'cleanup-result.json':'cleanup-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({mode,targets:targets.length,removed:report.removed.length,temporaryFilesRemoved:report.temporaryFilesRemoved||0,assetFilesDeleted:0,userBrowserDataChanged:false}));
