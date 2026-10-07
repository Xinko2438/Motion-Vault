import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {project,root,sha,put} from '../../scripts/build-hybrid.mjs';
import {withStage,withBrowser,until} from './browser-tools.mjs';
const live=process.argv.includes('--live'),baseRoot=live?path.join(project,'web'):root,checks=[];
const check=(name,ok,data)=>{checks.push({name,passed:!!ok,data});if(!ok)console.error('FAIL '+name)};
const html=await readFile(path.join(baseRoot,'index.html'));
const redirect=await readFile(live?path.join(project,'candidates/curated-originals/index.html'):path.join(root,'candidates.html'));
const verify=scope=>JSON.parse(execFileSync(process.execPath,['src/hybrid/query-vault.mjs','verify','--scope',scope,'--root',path.relative(project,baseRoot),'--json'],{cwd:project,encoding:'utf8',windowsHide:true}));
const formal=JSON.parse(await readFile(path.join(baseRoot,'catalog.json'),'utf8'));
const candidates=JSON.parse(await readFile(path.join(baseRoot,'candidate-catalog.json'),'utf8'));
check('Formal source/preview integrity',verify('formal').result.filter(i=>i.ready).length===formal.count);
check('Candidate source/preview integrity',verify('candidates').result.filter(i=>i.ready).length===candidates.localReady);
const build=await readFile(path.join(project,'scripts/build-hybrid.mjs'),'utf8');
check('Build does not read discarded snapshots',!build.includes('versions/')&&!build.includes('readFile(path.join(backup'));
check('Former candidate page is only a small compatibility redirect',redirect.length<2048&&redirect.toString().includes('location.replace')&&redirect.toString().includes('view=pending')&&!/CandidateVault|const CATALOG|id="grid"/.test(redirect));
const run=server=>withBrowser(async b=>{
 const base=server.url+(live?'/app/assets':'');
 await b.goto(base+'/motion-vault.html',400);await until(b,'!!window.HybridVault&&!!window.CandidateVault');
 check('One current application knows both catalogues',await b.evaluate('HybridVault.release==="formal"&&HybridVault.items().filter(i=>i.asset).length===90&&CandidateVault.items().length===30'));
 check('Default library excludes pending candidates',await b.evaluate('CandidateVault.items().every(i=>!document.querySelector(\'.card[data-id="\'+i.id+\'"]\'))')&&await b.evaluate('document.querySelectorAll("#viewTabs [data-view]").length===3'));
 check('No duplicate candidate-page navigation',await b.evaluate('![...document.querySelectorAll("a")].some(a=>a.getAttribute("href")?.includes("motion-vault-candidates.html"))'));
 check('No visible patch labels',await b.evaluate('!/(hover-intent|20261006r|rev [a-f0-9]{8})/.test(document.body.innerText)'));
 for(const id of [39,'online-grid','online-lens','online-hold','online-contours']){
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});
  await b.evaluate(`document.querySelector('.card[data-id="${id}"]').scrollIntoView({block:'center'})`);await b.delay(60);
  const p=await b.evaluate(`(()=>{const r=document.querySelector('.card[data-id="${id}"] .stage').getBoundingClientRect();return{x:r.x+r.width*.45,y:r.y+r.height*.5}})()`);
  await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await until(b,`document.querySelector('.card[data-id="${id}"] .stage').dataset.playing==='true'`);
  const val=()=>b.evaluate(`(()=>{const el=document.querySelector('.card[data-id="${id}"] .preview-layer');const v=el?.querySelector('video');const host=el?.shadowRoot?.querySelector('.asset-host');return v?v.currentTime:host?.innerHTML})()`);
  const before=await val();await b.delay(450);check('Actual hover advances '+id,await val()!==before);
 }
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.delay(50);
 check('Hover releases resources',await b.evaluate('(window.__vaultRuntime?.active||0)===0'));
 for(const f of ['motion-vault-icon.svg','motion-vault-icon.ico']){
  const r=await fetch(base+'/'+f);
  const decoded=await b.evaluate(`new Promise(resolve=>{const i=new Image();i.onload=()=>resolve(i.naturalWidth===64&&i.naturalHeight===64);i.onerror=()=>resolve(false);i.src=${JSON.stringify(base+'/'+f)}})`);
  check('Icon '+f,r.ok&&decoded);
 }
 await b.goto(base+'/motion-vault-candidates.html',450);
 await until(b,'location.pathname.endsWith("/motion-vault.html")&&!!window.HybridVault');
 check('Old bookmark enters pending state in the same page',await b.evaluate('new URL(location.href).searchParams.get("view")==="pending"&&document.querySelectorAll(".card").length===30&&CandidateVault.items().every(i=>document.querySelector(\'.card[data-id="\'+i.id+\'"]\'))'));
 await b.evaluate('document.querySelector("#viewTabs [data-view=library]").click()');
 check('Returning to library is an in-page state change',await b.evaluate('location.pathname.endsWith("/motion-vault.html")&&CandidateVault.items().every(i=>!document.querySelector(\'.card[data-id="\'+i.id+\'"]\'))'));
});
if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);
const result={at:new Date().toISOString(),passed:checks.every(c=>c.passed),total:checks.length,checks,formalHash:sha(html),formalSha256:sha(html),candidateSha256:sha(redirect),redirectSha256:sha(redirect),environment:'Isolated browser profile; no user state modified',live};
await put(project,'lineage/current/'+(live?'consolidation-check.json':'stage-check.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify({passed:result.passed,total:result.total,failures:checks.filter(c=>!c.passed)}));if(!result.passed)process.exitCode=1;
