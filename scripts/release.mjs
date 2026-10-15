import {verifyExpansionIntegration} from './expansion-integration-gate.mjs';
import {verifyReviewedCandidate,readReviewedPlan,verifyPublicationTarget} from './artifact-phase.mjs';
import {readFile,writeFile,mkdir,readdir,rename,rm,open} from 'node:fs/promises';import path from 'node:path';import {execFileSync} from 'node:child_process';import {randomUUID} from 'node:crypto';
import {project,root,sha,put,exists,guard,assertUnifiedGallery} from './build-hybrid.mjs';
const evidence=path.join(project,'lineage/current'),hub=path.resolve(project,'../media-knowledge-hub');
import {walkPublishableAssets as walk,assertPublishableAssetBytes} from './release-asset-policy.mjs';

const publishLockFile=path.join(project,'.runtime/motion-vault-publish.lock');
const fileHash=async p=>{try{return sha(await readFile(p));}catch(e){if(e.code==='ENOENT')return null;throw e;}};
// Signal zero only probes existence; it sends no signal and never terminates a process.
function processAlive(pid){if(!Number.isSafeInteger(pid)||pid<1)return null;try{process.kill(pid,0);return true;}catch(e){if(e.code==='ESRCH')return false;if(e.code==='EPERM')return true;throw e;}}
async function readPublishLock(){
 try{const value=JSON.parse(await readFile(publishLockFile,'utf8'));return{pid:value.pid,nonce:value.nonce,runId:value.runId,acquiredAt:value.acquiredAt};}
 catch(e){if(e.code==='ENOENT')return null;if(e instanceof SyntaxError)return{malformed:true};throw e;}
}
function matchingPublishProcesses(){
 if(process.platform!=='win32')return{available:false,reason:'Process listing is only implemented for this Windows publisher',processes:[]};
 const command="$p = @(Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { $_.CommandLine -match '(?i)release\\.mjs[\"\\s]+publish(?:[\"\\s]|$)' } | Select-Object @{Name='pid';Expression={$_.ProcessId}},@{Name='startedAt';Expression={$_.CreationDate.ToUniversalTime().ToString('o')}}); ConvertTo-Json -InputObject $p -Compress";
 try{const value=JSON.parse(execFileSync('powershell.exe',['-NoProfile','-Command',command],{encoding:'utf8',windowsHide:true,timeout:10000}).trim()||'[]');return{available:true,processes:(Array.isArray(value)?value:[value]).filter(p=>p&&p.pid!==process.pid)};}
 catch(e){return{available:false,reason:e.code||e.name,processes:[]};}
}
async function publicationStatus(){
 const lock=await readPublishLock();return{checkedAt:new Date().toISOString(),lockFile:path.relative(project,publishLockFile),locked:lock!==null,lock,ownerAlive:lock?processAlive(lock.pid):false,matchingPublishers:matchingPublishProcesses()};
}
async function acquirePublishLock(){
 const index=process.argv.indexOf('--run-id'),inline=process.argv.find(a=>a.startsWith('--run-id='));
 const runId=inline?inline.slice('--run-id='.length):index>=0?process.argv[index+1]:randomUUID();
 if(!runId||!/^[A-Za-z0-9_.:-]{1,160}$/.test(runId))throw new Error('Use --run-id followed by a unique simple identifier');
 const owner={pid:process.pid,nonce:randomUUID(),runId,acquiredAt:new Date().toISOString()};
 await mkdir(path.dirname(publishLockFile),{recursive:true});
 let handle;
 try{handle=await open(publishLockFile,'wx');}
 catch(e){if(e.code!=='EEXIST')throw e;const status=await publicationStatus();throw new Error('Publication lock already exists; no files changed. '+JSON.stringify(status));}
 try{await handle.writeFile(JSON.stringify(owner,null,2));}finally{await handle.close();}
 return owner;
}
async function releasePublishLock(owner){
 const actual=await readPublishLock();
 if(actual?.nonce===owner.nonce&&actual.pid===owner.pid)await rm(publishLockFile);
 else if(actual)console.error('Publication lock ownership changed; the other lock was retained.');
}
async function withPublishLock(){
 const owner=await acquirePublishLock();
 try{
  const running=matchingPublishProcesses();
  if(!running.available)throw new Error('Cannot verify whether an older publisher is still running: '+running.reason);
  if(running.processes.length)throw new Error('Another matching publisher is active; no files changed. '+JSON.stringify(running.processes));
  await publish(owner);
 }finally{await releasePublishLock(owner);}
}

async function batches(values,fn){for(let n=0;n<values.length;n+=8)await Promise.all(values.slice(n,n+8).map(fn));}
async function publish(owner){
 const reviewed=await exists(path.join(project,'src/hybrid/dom33/promotion-plan.json'))?await readReviewedPlan(project):null;
 if(reviewed)await verifyReviewedCandidate(project,root,{staged:true});
 const priorReceiptPath=path.join(evidence,'install-receipt.json');
 if(await exists(priorReceiptPath)){const prior=JSON.parse(await readFile(priorReceiptPath,'utf8'));if(prior.runId===owner.runId)throw new Error('This publication runId already completed; no files changed. Use status or sync --check.');}
 const cat=JSON.parse(await readFile(path.join(root,'catalog.json'),'utf8')),candidate=JSON.parse(await readFile(path.join(root,'candidate-catalog.json'),'utf8'));
 const expansion=JSON.parse(await readFile(path.join(project,'src/hybrid/source-expansion-catalog.json'),'utf8'));
 const compatibility=JSON.parse(await readFile(path.join(project,'src/hybrid/source-expansion-compatibility.json'),'utf8'));
 const galleryHTML=await readFile(path.join(root,'index.html'),'utf8'),redirectHTML=await readFile(path.join(root,'candidates.html'),'utf8');
 const integration=verifyExpansionIntegration({compatibility,registry:expansion,formal:cat,candidates:candidate,galleryHTML,redirectHTML});
 const expectedFormal=compatibility.cataloguePlan?.formalSourceCount??cat.items.length,expectedCandidates=compatibility.cataloguePlan?.candidateSourceCount??candidate.items.length;
 if(cat.items.length!==expectedFormal||candidate.items.length!==expectedCandidates||candidate.localReady!==candidate.items.filter(i=>i.asset?.state==='local_source_verified').length)throw new Error('Unexpected source catalogue identity or verified-media count');
 assertUnifiedGallery(galleryHTML,cat,candidate,redirectHTML);
 const stagedHTML=sha(galleryHTML),stagedCandidate=sha(redirectHTML);
 if(integration.mode!=='explicit-human-acceptance')for(const f of ['candidate-validation.json','sandbox.json','no-preference.json']){const proof=JSON.parse(await readFile(path.join(evidence,f),'utf8'));if(proof.passed!==proof.total||proof.total<1||proof.formalHash!==stagedHTML||(proof.candidateSha256||proof.candidateHash)!==stagedCandidate)throw new Error('Current publication lacks matching verified evidence: '+f);}
 const refs=[...cat.items,...candidate.items].filter(i=>i.asset),neededRuntime=new Set(['runtime.mjs',...refs.flatMap(i=>[])]);
 for(const it of cat.items){const m=JSON.parse(await readFile(path.join(root,it.asset.manifest),'utf8'));for(const rel of Object.keys(m.shared_hashes||{}))if(rel.endsWith('.mjs'))neededRuntime.add(path.basename(rel));}
 const payload=new Map(),assetPaths=(await walk(path.join(root,'motion-vault-assets'))).filter(f=>!/^shared\/runtime\.[a-f0-9]+\.mjs$/.test(f)||neededRuntime.has(path.basename(f)));
 await batches(assetPaths,async f=>{const bytes=await readFile(path.join(root,'motion-vault-assets',f));assertPublishableAssetBytes(f,bytes);payload.set('motion-vault-assets/'+f,bytes);});
 const endpoints=[['motion-vault.html','web/index.html','index.html'],['motion-vault-candidates.html','candidates/curated-originals/index.html','candidates.html'],['motion-vault-catalog.json','web/catalog.json','catalog.json'],['motion-vault-candidate-catalog.json','web/candidate-catalog.json','candidate-catalog.json'],['motion-vault-icon.svg','web/motion-vault-icon.svg','motion-vault-icon.svg'],['motion-vault-icon.ico','web/motion-vault-icon.ico','motion-vault-icon.ico']];
 for(const [url,,src]of endpoints)payload.set(url,await readFile(path.join(root,src)));
 const changes=[],targets=new Set();const plan=async(owner,rel,b)=>{const p=path.resolve(owner,rel);if(!p.startsWith(owner+path.sep))throw new Error('Out of publish scope');const normalized=process.platform==='win32'?path.normalize(p).toLowerCase():path.normalize(p);if(targets.has(normalized))throw new Error('Duplicate publication target '+p);targets.add(normalized);const old=await exists(p)?await readFile(p):null;
 if(reviewed){const asset=rel.indexOf('motion-vault-assets/'),name=asset>=0?rel.slice(asset):rel.endsWith('motion-vault-candidate-catalog.json')?'candidate-catalog.json':rel.endsWith('motion-vault-catalog.json')?'catalog.json':rel.endsWith('motion-vault-candidates.html')?'candidates.html':rel.endsWith('motion-vault.html')||rel==='web/index.html'||rel==='web/standalone/index.html'?'index.html':rel.slice(rel.lastIndexOf('/')+1);
 const before=name==='candidates.html'?sha(await readFile(path.join(project,'candidates/curated-originals/index.html'))):reviewed.baselineInventory[name];verifyPublicationTarget({beforeHash:before??null,afterHash:sha(b),actualHash:old?sha(old):null});}
 if(old&&sha(old)===sha(b))return;changes.push({p,old,b});};
 await batches([...payload],async([url,b])=>plan(project,url.startsWith('motion-vault-assets/')?'web/'+url:endpoints.find(e=>e[0]===url)[1],b));
 for(const prefix of ['web/standalone','web/public/assets','web/dist/assets']){await guard(prefix+'/motion-vault-assets','automation',hub);await batches([...payload],async([url,b])=>plan(hub,prefix+'/'+(prefix==='web/standalone'&&url==='motion-vault.html'?'index.html':url),b));}
 const applied=[];const atomic=async(p,b,expected)=>{await mkdir(path.dirname(p),{recursive:true});const temporary=p+'.next-'+owner.pid+'-'+randomUUID();try{await writeFile(temporary,b,{flag:'wx'});if(await fileHash(p)!==expected)throw new Error('File changed before atomic replacement '+p);await rename(temporary,p);}finally{await rm(temporary,{force:true});}};
 try{for(const c of changes.sort((a,b)=>Number(a.p.endsWith('.html'))-Number(b.p.endsWith('.html')))){const actual=await exists(c.p)?sha(await readFile(c.p)):null;if(actual!==(c.old?sha(c.old):null))throw new Error('File changed during publication '+c.p);await atomic(c.p,c.b,c.old?sha(c.old):null);applied.push(c);}
 const publicationFiles=[];for(const [name,dest]of endpoints){const bytes=await readFile(path.join(project,dest));publicationFiles.push({path:dest,expected:sha(payload.get(name)),actual:sha(bytes)});}
  await put(evidence,'publication-file-check.json',JSON.stringify({at:new Date().toISOString(),files:publicationFiles,planned:changes.map(c=>({path:path.relative(project,c.p),hash:sha(c.b)}))},null,2));
  if(publicationFiles.some(f=>f.expected!==f.actual))throw new Error('A published endpoint was replaced before verification');
  assertUnifiedGallery(await readFile(path.join(project,'web/index.html'),'utf8'),JSON.parse(await readFile(path.join(project,'web/catalog.json'),'utf8')),JSON.parse(await readFile(path.join(project,'web/candidate-catalog.json'),'utf8')),await readFile(path.join(project,'candidates/curated-originals/index.html'),'utf8'));
  const sync=JSON.parse(execFileSync(process.execPath,['scripts/sync-gallery.mjs','--check'],{cwd:project,encoding:'utf8',windowsHide:true,timeout:120000}));if(!sync.verified)throw new Error('Live publication mismatch');
 const inv=[...payload].filter(([f])=>f.startsWith('motion-vault-assets/')).map(([f,b])=>({file:f.slice('motion-vault-assets/'.length),bytes:b.length,sha256:sha(b)}));
 const receipt={verificationMode:integration.mode,humanAccepted:integration.humanAccepted,automaticRuntimePassed:integration.automaticRuntimePassed,sourceCountsOnly:true,at:new Date().toISOString(),runId:owner.runId,publisherPid:owner.pid,publisherNonce:owner.nonce,applicationCount:1,canonicalEntry:'motion-vault.html',legacyCandidateRedirect:true,redirectSha256:stagedCandidate,formalCount:cat.items.length,candidateCount:candidate.items.length,localCandidateCount:candidate.localReady,formalSha256:sha(payload.get('motion-vault.html')),candidateSha256:sha(payload.get('motion-vault-candidates.html')),assetFiles:inv.length,changedFiles:changes.length,privateReviewPublished:false,userBrowserDataChanged:false,hubBusinessDataChanged:false,serverRestarted:false,sync};
 await put(evidence,'install-receipt.json',JSON.stringify(receipt,null,2));await put(evidence,'asset-inventory.json',JSON.stringify({files:inv},null,2));
 console.log(JSON.stringify({published:true,runId:owner.runId,applicationCount:1,canonicalEntry:receipt.canonicalEntry,legacyCandidateRedirect:true,formalCount:receipt.formalCount,candidatesReady:receipt.localCandidateCount,candidatesTotal:receipt.candidateCount,changedFiles:changes.length,formalSha256:receipt.formalSha256,candidateSha256:receipt.candidateSha256}));
 }catch(e){
  const rollbackConflicts=[],restored=[];
  for(const c of applied.reverse()){
   const written=sha(c.b),relative=path.relative(project,c.p);
   try{
    const actual=await fileHash(c.p);
    if(actual!==written){rollbackConflicts.push({path:relative,expectedWrittenHash:written,actualHash:actual,reason:'Target no longer contains this run; left untouched'});continue;}
    if(c.old)await atomic(c.p,c.old,written);
    else{if(await fileHash(c.p)!==written)throw new Error('Target changed before removing this run new file');await rm(c.p);}
    restored.push(relative);
   }catch(error){rollbackConflicts.push({path:relative,expectedWrittenHash:written,reason:error.message});}
  }
  const failure={at:new Date().toISOString(),runId:owner.runId,pid:owner.pid,nonce:owner.nonce,published:false,error:e.message,appliedFiles:applied.length,restored,rollbackConflicts};
  try{await put(evidence,'publication-failure.json',JSON.stringify(failure,null,2));}catch(reportError){console.error('Could not persist publication failure report: '+reportError.message);}
  if(rollbackConflicts.length)e.message+='; '+rollbackConflicts.length+' rollback conflict(s) left untouched; see lineage/current/publication-failure.json';
  throw e;
 }
}
if(process.argv[2]==='publish')await withPublishLock();
else if(process.argv[2]==='status')console.log(JSON.stringify(await publicationStatus(),null,2));
else throw new Error('Use status, or publish --run-id <unique-id> after verification of the staged build');
