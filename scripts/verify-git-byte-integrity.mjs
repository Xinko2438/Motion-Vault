// Exercise real Git checkout filters without changing the working tree or Git
// configuration. Hash-bound inputs must retain identical bytes on Windows.
import {execFileSync} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {sha,reviewedPlanSha256} from './artifact-phase.mjs';
const files=['web/.gitattributes','web/index.html','web/catalog.json','src/hybrid/dom33/promotion-plan.json','src/hybrid/dom33/payload/index.html','web/motion-vault-assets/shared/runtime.eb7967a461d0.mjs','web/motion-vault-assets/shared/runtime.88444c38f1d6.css'];
const checks=files.map(file=>{
 const object='HEAD:'+file,raw=execFileSync('git',['show',object],{maxBuffer:8*1024*1024});
 const checkout=execFileSync('git',['-c','core.autocrlf=true','cat-file','--filters',object],{maxBuffer:8*1024*1024});
 return {file,pass:raw.equals(checkout),committedSha256:sha(raw),checkoutSha256:sha(checkout)};
});
const plan=await readFile('src/hybrid/dom33/promotion-plan.json');
checks.push({file:'working reviewed plan',pass:sha(plan)===reviewedPlanSha256});
const report={at:new Date().toISOString(),passed:checks.filter(c=>c.pass).length,total:checks.length,checks};
await writeFile('.runtime/dom33/git-checkout-verification.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));if(report.passed!==report.total)process.exitCode=1;
