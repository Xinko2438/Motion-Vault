import {readFile,writeFile,mkdir,readdir,cp,access} from 'node:fs/promises';
import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import {deflateSync} from 'node:zlib';import {execFileSync} from 'node:child_process';
import {withBrowser} from '../../scripts/isolated-browser.mjs';
export const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
export const staged=path.join(project,'.runtime/hybrid-assets/staged');
export const evidence=path.join(project,'lineage/interaction-repair');
export const backup=path.join(project,'versions/before-interaction-repair-20261006');
export const hash=b=>createHash('sha256').update(b).digest('hex');
export async function exists(p){try{await access(p);return true}catch(e){if(e.code==='ENOENT')return false;throw e}}
export async function save(p,b){await mkdir(path.dirname(p),{recursive:true});await writeFile(p,b)}
export async function guard(rel,kind,owner=project){execFileSync('powershell.exe',['-NoProfile','-File',path.resolve(project,'../../toolbox/global-file-management-audit/Test-AINativeFilePlacement.ps1'),'-CandidatePath',path.resolve(owner,rel),'-OwnerType','project','-OwnerRoot',owner,'-OwnerId',owner===project?'project.design-reference-library':'project.media-knowledge-hub','-LifecycleClass',kind,'-Json'],{windowsHide:true,stdio:'pipe'});}
export async function walk(dir,prefix=''){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Unexpected symlink');if(['node_modules','.git','private'].includes(e.name))continue;const rel=prefix?prefix+'/'+e.name:e.name;if(e.isDirectory())out.push(...await walk(path.join(dir,e.name),rel));else if(e.isFile())out.push(rel);}return out.sort();}
async function prepare(){
 await guard('versions/before-interaction-repair-20261006','version');await guard('lineage/interaction-repair','evidence');await guard('src/hybrid','automation');await guard('.runtime/hybrid-assets','runtime');await guard('web','automation');await guard('tests','automation');
 if(await exists(path.join(backup,'snapshot.json')))throw new Error('Repair baseline already exists; will not overwrite it.');
 const files=[];for(const dir of ['src/hybrid','scripts','web','tests'])for(const f of await walk(path.join(project,dir)))files.push(dir+'/'+f);
 files.push('candidates/curated-originals/index.html','candidates/curated-originals/manifest.json','README.md','AGENTS.md','PROJECT.md');
 const manifest=[];for(const f of files){const b=await readFile(path.join(project,f));await save(path.join(backup,f),b);manifest.push({path:f,sha256:hash(b),bytes:b.length});}
 await save(path.join(backup,'snapshot.json'),JSON.stringify({at:new Date().toISOString(),reason:'User reports favicon and hover fixes did not work; exact pre-repair baseline',files:manifest},null,2));
 const network=[];for(const f of ['motion-vault.html','motion-vault-candidates.html','motion-vault-icon.svg','motion-vault-icon.ico']){const r=await fetch('http://127.0.0.1:4380/app/assets/'+f,{cache:'no-store',signal:AbortSignal.timeout(10000)});const b=Buffer.from(await r.arrayBuffer());network.push({file:f,status:r.status,type:r.headers.get('content-type'),sha256:hash(b)});}
 const cat=JSON.parse(await readFile(path.join(project,'web/catalog.json'),'utf8'));
 const report={at:new Date().toISOString(),network,items:cat.items.map(i=>({id:i.id,key:i.key,mode:i.preview_mode,video:!!i.asset?.video,title:i.title})),syncIncludesFavicon:(await readFile(path.join(project,'scripts/sync-gallery.mjs'),'utf8')).includes("['motion-vault-icon.svg'"),templateIncludesFavicon:(await readFile(path.join(project,'src/hybrid/sync-gallery.mjs'),'utf8')).includes("['motion-vault-icon.svg'")};
 await save(path.join(evidence,'before.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({backupFiles:manifest.length,...report},null,2));
}
function crc32(b){let c=0xffffffff;for(const x of b){c^=x;for(let k=0;k<8;k++)c=(c>>>1)^((c&1)?0xedb88320:0);}return(c^0xffffffff)>>>0;}
function chunk(type,data){const t=Buffer.from(type),size=Buffer.alloc(4),crc=Buffer.alloc(4);size.writeUInt32BE(data.length);crc.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([size,t,data,crc]);}
async function icons(){
 // Restore the existing three-bar mark, with no font or external artwork dependency.
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#fafaf7"/><g fill="#20211e"><path d="M12 17L21 14V49L12 52Z"/><path d="M28 21L37 18V45L28 48Z"/><path d="M44 25L53 22V41L44 44Z"/></g></svg>';
 const n=64,row=1+n*4,pixels=Buffer.alloc(row*n);for(let y=0;y<n;y++)for(let x=0;x<n;x++){const polygon=(x>=12&&x<21&&y>=17-(x-12)/3&&y<52-(x-12)/3)||(x>=28&&x<37&&y>=21-(x-28)/3&&y<48-(x-28)/3)||(x>=44&&x<53&&y>=25-(x-44)/3&&y<44-(x-44)/3);const c=polygon?[32,33,30,255]:[250,250,247,255];for(let k=0;k<4;k++)pixels[y*row+1+x*4+k]=c[k];}
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(n,0);ihdr.writeUInt32BE(n,4);ihdr[8]=8;ihdr[9]=6;const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(pixels)),chunk('IEND',Buffer.alloc(0))]);
 const h=Buffer.alloc(22);h.writeUInt16LE(1,2);h.writeUInt16LE(1,4);h[6]=n;h[7]=n;h.writeUInt16LE(1,10);h.writeUInt16LE(32,12);h.writeUInt32LE(png.length,14);h.writeUInt32LE(22,18);const ico=Buffer.concat([h,png]);
 for(const base of [path.join(project,'src/hybrid'),staged]){await save(path.join(base,'motion-vault-icon.svg'),svg);await save(path.join(base,'motion-vault-icon.ico'),ico);}
 console.log(JSON.stringify({icons:true,svgSha256:hash(svg),icoSha256:hash(ico)}));
}
async function reproduce(){const results=[];await withBrowser(async b=>{
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:'window.__errors=[];addEventListener("error",e=>__errors.push(e.error?.stack||e.message));addEventListener("unhandledrejection",e=>__errors.push(String(e.reason)));'});
 await b.goto('http://127.0.0.1:4380/app/assets/motion-vault.html',650);
 for(const id of [28,33,'online-radial','online-toast','online-chart','online-hold']){
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',x:1,y:1});await b.evaluate(`document.querySelector('.card[data-id="${id}"]').scrollIntoView({block:'center'})`);await b.delay(80);
 const p=await b.evaluate(`(()=>{const r=document.querySelector('.card[data-id="${id}"] .stage').getBoundingClientRect();return{x:r.x+r.width*.48,y:r.y+r.height*.47}})()`);
 await b.call('Input.dispatchMouseEvent',{type:'mouseMoved',...p});await b.delay(850);
 const inspect=`(()=>{const s=document.querySelector('.card[data-id="${id}"] .preview-layer')?.shadowRoot;return s?{html:s.querySelector('.asset-host').innerHTML,focus:document.activeElement?.className,errors:__errors}:null})()`;
 const first=await b.evaluate(inspect);await b.delay(2500);const last=await b.evaluate(inspect);results.push({id,changesWhileStationary:first?.html!==last?.html,errors:last?.errors||[],firstText:first?.html?.replace(/<[^>]*>/g,'').slice(-180)});await b.evaluate('window.__errors=[]');
 }
 });await save(path.join(evidence,'reproduced-hover.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const cmd=process.argv[2];if(cmd==='prepare')await prepare();else if(cmd==='icons')await icons();else if(cmd==='reproduce')await reproduce();else throw new Error('Use prepare | icons | reproduce');}
