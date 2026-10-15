// Native input/lifecycle verification in the real gallery; personal Chrome is
// never attached. An optional private seed stays inside .runtime, outside Git.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {withStage,withBrowser,until} from '../src/hybrid/browser-tools.mjs';
import {project,root,put,sha} from './build-hybrid.mjs';
import {readReviewedPlan} from './artifact-phase.mjs';
const live=process.argv.includes('--live'),baseRoot=live?path.join(project,'web'):root;
const plan=await readReviewedPlan(project),checks=[],network=[];
const check=(name,pass,detail)=>{checks.push({name,pass:!!pass,...(detail===undefined?{}:{detail})});if(!pass)console.error('FAIL '+name);};
const run=s=>withBrowser(async b=>{
 await b.call('Emulation.setDeviceMetricsOverride',{width:1707,height:931,deviceScaleFactor:1.5,mobile:false});
 await b.call('Network.enable');b.onEvent('Network.responseReceived',p=>{if(p.response.status>=400)network.push({url:p.response.url,status:p.response.status});});
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__dom33Errors=[];addEventListener("error",e=>__dom33Errors.push(e.message));addEventListener("unhandledrejection",e=>__dom33Errors.push(String(e.reason)));'});
 const base=s.url+(live?'/app/assets':'');await b.goto(base+'/motion-vault.html',500);await until(b,'!!window.HybridVault');
 const seed=JSON.parse(await readFile(path.join(project,'.runtime/dom33/curation-seed.json'),'utf8'));
 await b.evaluate(`localStorage.setItem('motion-vault-curated-originals-30-v1',JSON.stringify(${JSON.stringify(seed.review)}));localStorage.setItem('motion_vault_curation_v1',JSON.stringify(${JSON.stringify(seed.curation)}));`);
 await b.goto(base+'/motion-vault.html',450);await until(b,'!!window.HybridVault');
 const snapshot=()=>b.evaluate(`JSON.stringify(['motion-vault-curated-originals-30-v1','motion_vault_curation_v1'].map(k=>[k,localStorage.getItem(k)]))`),before=await snapshot();
 const counts=await b.evaluate(`['formalCount','pendingCount','hiddenCount'].map(id=>document.getElementById(id).textContent).join('/')`);
 check('Latest isolated selection reproduces 62 formal / 0 pending / 52 hidden',counts==='62/0/52',counts);
 const allowed=JSON.stringify(plan.allowedIds),items=await b.evaluate(`HybridVault.items().filter(i=>${allowed}.includes(i.asset?.id))`);
 check('Exactly the selected 33 effects remain visible; no hidden item is restored',items.length===33&&await b.evaluate(`Array.from(document.querySelectorAll('.card'),c=>c.dataset.state).every(s=>s==='library')`));
 const leave=()=>b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});
 const geometry=async selector=>b.evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width*.4,y:r.y+r.height*.5,w:r.width,h:r.height}})()`);
 async function hover(it){await leave();await b.evaluate(`document.querySelector('.card[data-id="${it.id}"]').scrollIntoView({block:'center'})`);await b.delay(80);const p=await geometry(`.card[data-id="${it.id}"] .stage`);await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x,y:p.y});await until(b,`document.querySelector('.card[data-id="${it.id}"] .stage').dataset.playing==='true'`,9000);return p;}
 async function click(selector){await b.evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`);const p=await geometry(selector);await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',buttons:1,clickCount:1});await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:p.x,y:p.y,button:'left',buttons:0,clickCount:1});await b.delay(80);}
 for(const it of items){try{
  let p=await hover(it);
  check('Preview resource loads '+it.asset.id,await b.evaluate(`(()=>{const s=document.querySelector('.card[data-id="${it.id}"] .stage'),v=s.querySelector('video'),r=s.querySelector('.preview-layer')?.shadowRoot;return v?!!v.currentSrc&&!v.error&&v.readyState>=2:!!r&&r.querySelector('link').href.includes(${JSON.stringify(it.asset.style)})&&!!r.querySelector('link').sheet;})()`));
  await click(`.card[data-id="${it.id}"] [data-preview-mode=interactive]`);p=await hover(it);
  check('Real code loads rather than a video '+it.asset.id,await b.evaluate(`!!document.querySelector('.card[data-id="${it.id}"] .preview-layer')?.shadowRoot?.querySelector('.asset-host')&&!document.querySelector('.card[data-id="${it.id}"] video')`));
  if(['pointer','drag'].includes(it.preview_mode)){
   if(it.preview_mode==='drag')await b.call('Input.dispatchMouseEvent',{type:'mousePressed',x:p.x,y:p.y,button:'left',buttons:1,clickCount:1});
   await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x+p.w*.2,y:p.y+20,buttons:it.preview_mode==='drag'?1:0,button:it.preview_mode==='drag'?'left':'none'});await b.delay(100);
   check('Native input controls the mounted source '+it.asset.id,await b.evaluate(`document.querySelector('.card[data-id="${it.id}"] .preview-layer').shadowRoot.querySelector('.asset-host').dataset.playback==='interactive'`));
   if(it.preview_mode==='drag'){await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1,buttons:1,button:'left'});await b.call('Input.dispatchMouseEvent',{type:'mouseReleased',x:1,y:1,buttons:0,button:'left',clickCount:1});await b.delay(80);check('Cross-boundary release clears drag '+it.asset.id,await b.evaluate(`!document.documentElement.classList.contains('vault-dragging')`));p=await hover(it);}
  }
  await b.evaluate(`scrollTo(0,scrollY>innerHeight?0:document.documentElement.scrollHeight)`);await b.delay(200);
  check('Offscreen releases the source '+it.asset.id,await b.evaluate(`HybridVault.active()?.id!==${JSON.stringify(it.id)}&&!document.querySelector('.card[data-id="${it.id}"] .preview-layer')&&(__vaultRuntime?.active||0)<=1`));
  await leave();await click(`.card[data-id="${it.id}"] [data-preview-mode=preview]`);
 }catch(e){check('Complete gallery lifecycle '+it.asset.id,false,e.message);await leave();}}
 for(const scene of ['brand','product','portfolio','editorial','workspace','journey']){
  const selector=`#sceneTabs [data-scene="${scene}"]`;const present=await b.evaluate(`!!document.querySelector(${JSON.stringify(selector)})`);if(!present)continue;
  await click(selector);check('Category filters real production uses '+scene,await b.evaluate(`Array.from(document.querySelectorAll('.card'),c=>HybridVault.items().find(i=>String(i.id)===c.dataset.id)).every(i=>i.uses.some(u=>u.scene===${JSON.stringify(scene)}))&&HybridVault.active()===null`));
 }
 check('Selection and hide records are byte-identical after all checks',before===await snapshot());
 check('No missing local resource',network.length===0,network);
 check('No runtime errors',await b.evaluate('__dom33Errors.length===0'),await b.evaluate('__dom33Errors'));
 await b.goto(base+'/motion-vault.html',400);await until(b,'!!window.HybridVault');
 const shot=await b.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await put(project,'lineage/current/dom33-integration/'+(live?'live':'stage')+'.png',Buffer.from(shot.data,'base64'));
},{gpu:true});
try{if(live)await run({url:'http://127.0.0.1:4380'});else await withStage(root,run);}catch(e){check('Native gallery suite completed',false,e.stack);}
const report={at:new Date().toISOString(),live,formalHash:sha(await readFile(path.join(baseRoot,'index.html'))),redirectSha256:sha(await readFile(path.join(project,'candidates/curated-originals/index.html'))),passed:checks.filter(c=>c.pass).length,total:checks.length,checks};
await put(project,'lineage/current/dom33-integration/'+(live?'live':'stage')+'.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,total:report.total,failures:checks.filter(c=>!c.pass)}));if(report.passed!==report.total)process.exitCode=1;
