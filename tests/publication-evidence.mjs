// Test-only evidence validation. Never publishes, mutates state or approves motion.
import {readFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const sha=b=>createHash('sha256').update(b).digest('hex');
const need=(ok,message)=>{if(!ok)throw Error('Publication evidence: '+message);};
const digest=(a,b)=>typeof a==='string'&&typeof b==='string'&&/^[a-f0-9]{64}$/i.test(a)&&a.toLowerCase()===b.toLowerCase();
const normalized=p=>{need(typeof p==='string'&&/^[a-z]:[\\/]/i.test(p),'absolute root required');return p.replaceAll('\\','/').replace(/\/$/,'').toLowerCase();};
function relative(p){need(typeof p==='string'&&!p.includes('\\')&&!p.includes(':')&&p.split('/').every(s=>s&&s!=='.'&&s!=='..'),'unsafe relative path');return p;}
function key(row){need(['project','hub'].includes(row.root),'unknown root');return row.root+'/'+relative(row.path).toLowerCase();}
function indexed(rows,getKey=key){need(Array.isArray(rows),'missing evidence rows');const map=new Map();for(const row of rows){const k=getKey(row);need(!map.has(k),'duplicate evidence '+k);map.set(k,row);}return map;}
function sameRoots(a,b){for(const name of ['project','hub'])need(normalized(a?.[name])===normalized(b?.[name]),'root mismatch '+name);}
export function verifyAutomaticPublication({receipt,hashes,reports}){
 need(receipt?.verificationMode!=='exact-delta-application'&&receipt?.automaticRuntimePassed!==false,'application authorization is not automatic evidence');
 need(digest(receipt?.formalSha256,hashes.gallery)&&digest(receipt?.candidateSha256,hashes.redirect),'receipt version mismatch');
 need(Array.isArray(reports)&&reports.length===3,'three automatic reports required');
 for(const [i,r] of reports.entries()){
  need(Number.isSafeInteger(r.total)&&r.total>0&&r.passed===r.total,'incomplete or zero automatic checks');
  need(digest(r.formalHash,hashes.gallery),'stale automatic gallery');
  const candidates=[r.candidateSha256,r.candidateHash].filter(v=>v!==undefined);
  need(candidates.length>0&&candidates.every(v=>digest(v,hashes.redirect)),'stale automatic redirect');
  if(i<2||r.redirectSha256!==undefined)need(digest(r.redirectSha256,hashes.redirect),'automatic redirect binding missing');
 }
 return {verified:true,mode:'automatic-runtime-evidence'};
}
export function verifyDeltaBinding({binding:b,application:a,manifest:m,recovery:r,install,observed:o,installed,unchanged,backups}){
 need(b?.schema==='motion-vault.publication-evidence-binding.v1'&&b.mode==='exact-delta-application','unsupported binding');
 need(b.animationAcceptance===false&&b.visualAcceptance===false,'application authorization cannot approve animation or visuals');
 need(m.schema==='motion-vault.current-baseline-delta.v1'&&m.authorization?.mode==='explicit-human-acceptance'&&m.authorization.integrationAllowed===true,'missing exact application authorization');
 need(o.package.bytes===b.package.bytes&&o.package.bytes===a.package.bytes&&o.package.bytes>0&&digest(o.package.sha256,b.package.sha256)&&digest(o.package.sha256,a.package.sha256),'package identity mismatch');
 for(const [actual,expected] of [[o.manifestSha256,b.manifestSha256],[o.zipManifestSha256,b.manifestSha256],[a.package.manifestSha256,b.manifestSha256],[r.manifestSha256,b.manifestSha256],[o.zipApplyToolSha256,b.applyToolSha256],[o.applyToolSha256,b.applyToolSha256],[o.applicationReceiptSha256,b.applicationReceiptSha256],[o.recoveryReceiptSha256,b.recoveryReceiptSha256],[o.installResultSha256,b.installResultSha256]])need(digest(actual,expected),'manifest/tool/receipt digest mismatch');
 sameRoots(a.roots,b.roots);sameRoots(r.roots,b.roots);
 need(r.schema==='motion-vault.current-delta-recovery.v1','unsupported recovery record');
 const expected=indexed(m.files.flatMap(f=>f.targets.map(t=>({...t,afterSha256:f.sha256}))));
 const changes=indexed(r.changes),actual=indexed(installed),old=indexed(unchanged),kept=indexed(m.requiredUnchanged),saved=indexed(backups,row=>relative(row.path).toLowerCase());
 need(expected.size>0&&changes.size===expected.size&&actual.size===expected.size&&old.size===kept.size,'incomplete target or preservation mapping');
 const overlays=indexed(b.testOverlays);
 need(overlays.size<=1,'extra test overlays');
 for(const [k,v] of overlays){need(v.root==='project'&&v.path==='tests/gallery.test.mjs'&&expected.has(k)&&digest(v.packageSha256,expected.get(k).afterSha256),'overlay outside authorized gallery-test maintenance');}
 for(const [k,v] of expected){
  const c=changes.get(k);need(c&&c.beforeSha256===v.beforeSha256&&digest(c.afterSha256,v.afterSha256),'recovery mapping differs '+k);
  need(digest(actual.get(k)?.sha256,overlays.get(k)?.afterSha256??v.afterSha256),'installed target differs '+k);
  if(v.beforeSha256===null)need(c.backup===null,'new file must not invent an original');
  else need(digest(saved.get(relative(c.backup).toLowerCase())?.sha256,v.beforeSha256),'missing or changed recovery original '+k);
 }
 need(saved.size===[...expected.values()].filter(v=>v.beforeSha256!==null).length,'backup coverage mismatch');
 for(const [k,v] of kept)need(digest(old.get(k)?.sha256,v.sha256),'preserved file differs '+k);
 for(const result of [a.application,install]){
  need(result?.verified===true&&result.applied===true&&result.changedFiles===expected.size&&result.totalTargets===expected.size,'incomplete application result');
  need(result.automatedRuntime?.passed===0,'application cannot spoof automatic runtime approval');
  need(normalized(result.recovery)===normalized(b.roots.project+'/'+relative(b.recoveryDirectory)),'recovery location mismatch');
 }
 return {verified:true,mode:'exact-delta-application',animationAcceptance:false,visualAcceptance:false};
}

// Real filesystem adapter used by gallery.test.mjs; hashes are observations, not
// synthetic approval. Cached ancestor checks preserve containment without retrying
// the same directory for every asset in the 12k-file application.
export async function verifyCurrentDeltaPublication(project){
 const roots={project:path.resolve(project),hub:path.resolve(project,'../media-knowledge-hub')},checked=new Map();
 async function noLink(file){if(!checked.has(file))checked.set(file,(async()=>{const parent=path.dirname(file);if(parent!==file)await noLink(parent);const s=await lstat(file);need(!s.isSymbolicLink(),'link boundary '+file);})());return checked.get(file);}
 const file=(root,rel)=>path.join(root,relative(rel));
 async function bytes(root,rel){const p=file(root,rel);await noLink(p);return readFile(p);}
 const readJSON=async(root,rel)=>JSON.parse(await bytes(root,rel));
 const b=await readJSON(roots.project,'lineage/current/publication-evidence.json');sameRoots(b.roots,roots);
 const appBytes=await bytes(roots.project,b.applicationReceipt),a=JSON.parse(appBytes);
 const packageBytes=await bytes(roots.project,b.packagePath),manifestBytes=await bytes(roots.project,b.manifestPath),m=JSON.parse(manifestBytes);
 const recoveryRoot=file(roots.project,b.recoveryDirectory),recoveryBytes=await bytes(recoveryRoot,'recovery.json'),r=JSON.parse(recoveryBytes),installBytes=await bytes(recoveryRoot,'install-result.json');
 const zipPath=file(roots.project,b.packagePath).replaceAll("'","''");
 const zipScript="$ProgressPreference='SilentlyContinue'; $ErrorActionPreference='Stop'; Add-Type -AssemblyName System.IO.Compression.FileSystem; $z=[IO.Compression.ZipFile]::OpenRead('"+zipPath+"'); try {$result=@{}; foreach ($n in @('delta-manifest.json','apply-current-delta.mjs')) {$e=$z.GetEntry('Motion-Vault-Current-71-Preserved-Plus-24/'+$n); if (!$e) {throw 'Missing ZIP entry'}; $s=$e.Open(); try {$h=[Security.Cryptography.SHA256]::Create(); $result[$n]=[BitConverter]::ToString($h.ComputeHash($s)).Replace('-','').ToLowerInvariant(); $h.Dispose()} finally {$s.Dispose()}}; $result | ConvertTo-Json -Compress} finally {$z.Dispose()}";
 const zip=JSON.parse(execFileSync('powershell.exe',['-NoProfile','-EncodedCommand',Buffer.from(zipScript,'utf16le').toString('base64')],{encoding:'utf8',windowsHide:true,timeout:30000}));
 const observed={package:{bytes:packageBytes.length,sha256:sha(packageBytes)},manifestSha256:sha(manifestBytes),zipManifestSha256:zip['delta-manifest.json'],zipApplyToolSha256:zip['apply-current-delta.mjs'],applyToolSha256:sha(await bytes(roots.project,b.applyToolPath)),applicationReceiptSha256:sha(appBytes),recoveryReceiptSha256:sha(recoveryBytes),installResultSha256:sha(installBytes)};
 async function hashRows(rows,fn){const out=[];for(let i=0;i<rows.length;i+=24)await Promise.all(rows.slice(i,i+24).map(async row=>out.push({...row,sha256:sha(await fn(row))})));return out;}
 const installed=await hashRows(m.files.flatMap(f=>f.targets),t=>bytes(roots[t.root],t.path));
 const unchanged=await hashRows(m.requiredUnchanged,t=>bytes(roots[t.root],t.path));
 const backups=await hashRows(r.changes.filter(c=>c.backup).map(c=>({path:c.backup})),t=>bytes(recoveryRoot,t.path));
 return verifyDeltaBinding({binding:b,application:a,manifest:m,recovery:r,install:JSON.parse(installBytes),observed,installed,unchanged,backups});
}
