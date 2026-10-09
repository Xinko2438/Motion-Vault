import test from 'node:test';
import assert from 'node:assert/strict';
import {verifyAutomaticPublication,verifyDeltaBinding} from './publication-evidence.mjs';
const a='a'.repeat(64),b='b'.repeat(64),c='c'.repeat(64);
function automatic(){return {receipt:{formalSha256:a,candidateSha256:b},hashes:{gallery:a,redirect:b},reports:[{formalHash:a,candidateSha256:b,redirectSha256:b,passed:2,total:2},{formalHash:a,candidateHash:b,redirectSha256:b,passed:3,total:3},{formalHash:a,candidateHash:b,passed:1,total:1}]};}
function delta(){
 const roots={project:'D:/vault',hub:'D:/hub'};
 const manifest={schema:'motion-vault.current-baseline-delta.v1',authorization:{integrationAllowed:true,mode:'explicit-human-acceptance'},files:[{sha256:a,targets:[{root:'project',path:'web/index.html',beforeSha256:b}]},{sha256:c,targets:[{root:'hub',path:'web/dist/assets/new.txt',beforeSha256:null}]}],requiredUnchanged:[{root:'project',path:'web/catalog.json',sha256:c}]};
 const recovery={schema:'motion-vault.current-delta-recovery.v1',roots,manifestSha256:c,changes:[{root:'project',path:'web/index.html',beforeSha256:b,afterSha256:a,backup:'originals/project/web/index.html'},{root:'hub',path:'web/dist/assets/new.txt',beforeSha256:null,afterSha256:c,backup:null}]};
 const application={roots,package:{bytes:9,sha256:a,manifestSha256:c},application:{applied:true,verified:true,changedFiles:2,totalTargets:2,automatedRuntime:{passed:0},recovery:'D:/vault/.runtime/run'}};
 const binding={schema:'motion-vault.publication-evidence-binding.v1',mode:'exact-delta-application',roots,recoveryDirectory:'.runtime/run',package:{bytes:9,sha256:a},manifestSha256:c,applyToolSha256:a,applicationReceiptSha256:a,recoveryReceiptSha256:b,installResultSha256:c,animationAcceptance:false,visualAcceptance:false,testOverlays:[]};
 return {binding,application,manifest,recovery,install:application.application,observed:{package:{bytes:9,sha256:a},manifestSha256:c,zipManifestSha256:c,zipApplyToolSha256:a,applyToolSha256:a,applicationReceiptSha256:a,recoveryReceiptSha256:b,installResultSha256:c},installed:[{root:'project',path:'web/index.html',sha256:a},{root:'hub',path:'web/dist/assets/new.txt',sha256:c}],unchanged:[{root:'project',path:'web/catalog.json',sha256:c}],backups:[{path:'originals/project/web/index.html',sha256:b}]};
}
test('Automatic publication requires complete same-version reports',()=>{assert.equal(verifyAutomaticPublication(automatic()).verified,true);});
test('Automatic publication rejects missing, zero, incomplete and stale evidence',()=>{
 for(const mutate of [f=>f.reports.pop(),f=>f.reports[0].total=0,f=>f.reports[0].passed=1,f=>f.reports[0].formalHash=c,f=>f.reports[1].candidateHash=c,f=>f.receipt.formalSha256=c,f=>f.receipt.automaticRuntimePassed=false]){const f=automatic();mutate(f);assert.throws(()=>verifyAutomaticPublication(f));}
});
test('Exact application evidence does not grant animation or visual acceptance',()=>{const r=verifyDeltaBinding(delta());assert.deepEqual(r,{verified:true,mode:'exact-delta-application',animationAcceptance:false,visualAcceptance:false});});
test('Changed package, manifest, receipt, page, preserved file or backup closes the gate',()=>{
 for(const mutate of [f=>f.observed.package.sha256=b,f=>f.observed.package.bytes=10,f=>f.observed.manifestSha256=b,f=>f.observed.zipManifestSha256=b,f=>f.observed.zipApplyToolSha256=b,f=>f.observed.applyToolSha256=b,f=>f.observed.applicationReceiptSha256=b,f=>f.observed.recoveryReceiptSha256=a,f=>f.observed.installResultSha256=b,f=>f.installed[0].sha256=c,f=>f.unchanged[0].sha256=a,f=>f.backups[0].sha256=a]){const f=delta();mutate(f);assert.throws(()=>verifyDeltaBinding(f));}
});
test('Missing, duplicated, escaping or mismatched recovery mapping is rejected',()=>{
 for(const mutate of [f=>f.recovery.changes.pop(),f=>f.recovery.changes.push(f.recovery.changes[0]),f=>f.recovery.changes[0].beforeSha256=c,f=>f.recovery.changes[0].afterSha256=c,f=>f.recovery.roots.project='D:/another',f=>f.recovery.changes[0].backup='../secret',f=>f.install.applied=false,f=>f.manifest.files[0].targets[0].path='../secret',f=>f.installed.pop(),f=>f.backups.pop()]){const f=delta();mutate(f);assert.throws(()=>verifyDeltaBinding(f));}
});
test('Only the explicitly hash-bound gallery test overlay may differ from the package',()=>{
 const f=delta();f.manifest.files[0].targets[0].path='tests/gallery.test.mjs';f.recovery.changes[0].path='tests/gallery.test.mjs';f.installed[0].path='tests/gallery.test.mjs';f.installed[0].sha256=c;f.binding.testOverlays=[{root:'project',path:'tests/gallery.test.mjs',packageSha256:a,afterSha256:c}];assert.equal(verifyDeltaBinding(f).verified,true);
 for(const mutate of [x=>x.binding.testOverlays[0].path='web/index.html',x=>x.binding.testOverlays[0].packageSha256=b,x=>x.binding.testOverlays[0].afterSha256=b,x=>x.binding.testOverlays.push(x.binding.testOverlays[0])]){const x=structuredClone(f);mutate(x);assert.throws(()=>verifyDeltaBinding(x));}
});
test('Application authorization cannot spoof runtime or visual approval',()=>{for(const mutate of [f=>f.binding.animationAcceptance=true,f=>f.binding.visualAcceptance=true,f=>f.manifest.authorization.integrationAllowed=false,f=>f.manifest.authorization.mode='automatic-runtime-evidence']){const f=delta();mutate(f);assert.throws(()=>verifyDeltaBinding(f));}});
