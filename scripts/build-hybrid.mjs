import {appendSourceExpansion} from '../src/hybrid/source-expansion.mjs';
import {readFile,writeFile,mkdir,copyFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';import {fileURLToPath} from 'node:url';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
export const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const sha=b=>createHash('sha256').update(b).digest('hex');
const read=p=>readFile(path.join(project,p),'utf8');
export const root=path.join(project,'.runtime/hybrid-assets/staged');

export const exists=async p=>{try{await access(p);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}};
export async function guard(relative,kind,owner=project){execFileSync('powershell.exe',['-NoProfile','-File',path.resolve(project,'../../toolbox/global-file-management-audit/Test-AINativeFilePlacement.ps1'),'-CandidatePath',path.resolve(owner,relative),'-OwnerType','project','-OwnerRoot',owner,'-OwnerId',owner===project?'project.design-reference-library':'project.media-knowledge-hub','-LifecycleClass',kind,'-Json'],{stdio:'pipe',windowsHide:true});}
export async function put(base,rel,content){const p=path.join(base,rel);if(!p.startsWith(base+path.sep))throw new Error('Path outside output root');await mkdir(path.dirname(p),{recursive:true});await writeFile(p,content);}
function splitScript(html,start,end){const a=html.indexOf(start),b=html.indexOf(end,a+start.length);if(a<0||b<0)throw new Error('Missing executable boundary '+start);return html.slice(a,b);}
const jsString=v=>JSON.stringify(v).replaceAll('<','\\u003c');
function sourceExcerpt(source,needle,span=4){const lines=source.split('\n');const i=lines.findIndex(l=>l.includes(needle));return i<0?null:{startLine:i+1,endLine:Math.min(lines.length,i+span),code:lines.slice(i,i+span).join('\n')};}

export const candidateRedirect="<!doctype html><html lang=\"zh-CN\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta http-equiv=\"refresh\" content=\"0;url=motion-vault.html?view=pending\"><title>Motion Vault</title><script>const p=location.pathname;location.replace(p.includes(\"/candidates/curated-originals/\")?\"../../web/index.html?view=pending\":p.includes(\"/standalone/\")?\"index.html?view=pending\":\"motion-vault.html?view=pending\")</script><a href=\"motion-vault.html?view=pending\">打开 Motion Vault</a></html>\n";

// Candidate discovery remains separate from the production catalogue. Only this
// data projection is built; there is no second candidate application.
export async function buildCandidateCatalog(taxonomy){
 const original=JSON.parse(await read('candidates/curated-originals/src/catalog.json'));
 const items=[];
 for(const it of original){
  const manifestPath=path.join(root,'motion-vault-assets',it.id,'asset.json');let asset=null;
  if(await exists(manifestPath)){
   const a=JSON.parse(await readFile(manifestPath,'utf8'));
   if(a.status==='local_source_verified'&&a.preview?.captured){
    if(a.preview.implementationVersion!==a.version)throw new Error('Candidate preview does not match implementation '+it.id);
    const p='motion-vault-assets/'+it.id+'/',previewRevisions={};
    for(const kind of ['poster','video']){
     if(!a.preview[kind])continue;
     const digest=sha(await readFile(path.join(path.dirname(manifestPath),a.preview[kind])));
     if(digest!==a.preview[kind+'Sha256'])throw new Error('Candidate '+kind+' does not match its capture manifest '+it.id);
     previewRevisions[kind]=digest.slice(0,16);
    }
    asset={id:it.id,version:a.version,manifest:p+'asset.json',entry:p+a.entry,run:p+a.run,design:p+a.design,implementation:p+a.implementation,parameters:p+a.parameters,poster:p+a.preview.poster,posterRevision:previewRevisions.poster,video:a.preview.video?p+a.preview.video:null,videoRevision:previewRevisions.video,preview_kind:a.preview.kind,state:'local_source_verified',source_verified:false,implementation_kind:a.kind};
   }
  }
  items.push({id:it.id,title:it.title,desc:it.design_value,design_value:it.design_value,avoid:it.limit,tech:it.tech,uses:it.uses,preview_mode:'auto',source_kind:it.local_implementation_kind==='independent_code'?'independent_code':'adapted_author_source',source_name:it.author,source_url:it.source_url,status:asset?'local_source_ready_for_review':'pending_local_implementation',asset});
 }
 await appendSourceExpansion(items,{project,root,sha});
 const data={schema:'motion-vault.candidate-catalog.v2',count:items.length,localReady:items.filter(i=>i.asset?.state==='local_source_verified').length,localRunnable:items.filter(i=>i.asset?.run).length,taxonomy,taskSelectionRequired:true,items};
 const json=JSON.stringify(data,null,2);
 await put(root,'candidate-catalog.json',json);
 await put(root,'candidates.html',candidateRedirect);
 await put(root,'candidate-manifest.json',JSON.stringify({count:data.count,localReady:data.localReady,remaining:data.count-data.localReady,application:'motion-vault.html',redirectOnly:true,htmlSha256:sha(candidateRedirect),catalogSha256:sha(json),privateCurationEmbedded:false,externalHoverFrames:false},null,2));
 return data;
}

export function assertUnifiedGallery(html,formal,candidates,redirect){
 if(formal.schema!=='motion-vault.formal-catalog.v2'||candidates.schema!=='motion-vault.candidate-catalog.v2')throw new Error('Catalogue scope changed');
 const ids=[...formal.items,...candidates.items].map(i=>String(i.id));
 if(new Set(ids).size!==ids.length)throw new Error('Duplicate identity across catalogue scopes');
 if(!html.includes('const CATALOG='+jsString(formal)+';')||!html.includes('const CANDIDATES='+jsString(candidates)+';'))throw new Error('Unified gallery does not contain the current public catalogues');
 if(redirect!==candidateRedirect)throw new Error('Legacy candidate entry must only redirect to the unified gallery');
}

export async function assembleGallery(formal,candidates){
 formal??=JSON.parse(await readFile(path.join(root,'catalog.json'),'utf8'));
 candidates??=JSON.parse(await readFile(path.join(root,'candidate-catalog.json'),'utf8'));
 let shell=await read('src/hybrid/shell.html');
 const iconSVG=await readFile(path.join(project,'src/hybrid/motion-vault-icon.svg')),iconICO=await readFile(path.join(project,'src/hybrid/motion-vault-icon.ico'));
 shell=shell.replaceAll('__ICON_REVISION__',sha(Buffer.concat([iconSVG,iconICO])).slice(0,16));
 const gallery=await read('src/hybrid/gallery.js'),styles=await read('src/hybrid/gallery.css');
 const capture=await read('src/hybrid/capture.js'),captureHTML=await read('src/hybrid/capture.html'),broker=await read('src/hybrid/source-broker.js'),sourceSession=await read('src/hybrid/source-session.js');
 if(!captureHTML.includes('id="fileInput"'))throw new Error('Capture HTML missing');
 for(const [marker,value] of [
  ['/*__STYLES__*/',styles],
  ['<!--__CAPTURE_HTML__-->',captureHTML],
  ['/*__CATALOG__*/','const CATALOG='+jsString(formal)+';\nconst CANDIDATES='+jsString(candidates)+';'],
  ['/*__GALLERY__*/',broker+'\n'+sourceSession+'\n'+gallery],
  ['/*__CAPTURE_JS__*/',capture]
 ]){
  if(shell.split(marker).length!==2)throw new Error('Missing or duplicated shell boundary '+marker);
  shell=shell.replace(marker,()=>value);
 }
 assertUnifiedGallery(shell,formal,candidates,await readFile(path.join(root,'candidates.html'),'utf8'));
 await put(root,'index.html',shell);
 await put(root,'motion-vault-icon.svg',await read('src/hybrid/motion-vault-icon.svg'));
 await put(root,'motion-vault-icon.ico',await readFile(path.join(project,'src/hybrid/motion-vault-icon.ico')));
 const manifest={builtAt:new Date().toISOString(),applicationCount:1,count:formal.items.length,assetCount:formal.items.filter(i=>i.asset).length,candidateCount:candidates.items.length,localCandidateCount:candidates.localReady,totalCount:formal.items.length+candidates.items.length,htmlSha256:sha(shell),redirectSha256:sha(candidateRedirect),catalogSha256:sha(JSON.stringify(formal,null,2)),candidateCatalogSha256:sha(JSON.stringify(candidates,null,2)),sharedEngineSha256:sha(await readFile(path.join(root,'motion-vault-assets/shared/runtime.mjs')))};
 await put(root,'manifest.json',JSON.stringify(manifest,null,2));
 return {count:manifest.count,candidateCount:manifest.candidateCount,localCandidateCount:manifest.localCandidateCount,assetCount:manifest.assetCount,applicationCount:1,htmlBytes:Buffer.byteLength(shell),redirectBytes:Buffer.byteLength(candidateRedirect)};
}

async function build(){
 const catalogue=JSON.parse(await read('src/hybrid/formal-catalog.json'));
 const originalItems=JSON.parse(await read('src/hybrid/formal-items.json'));
 if(originalItems.length!==catalogue.items.length)throw new Error('Catalogue/source mismatch');
 const legacy=await read('src/hybrid/legacy-engine.js'),core=await read('src/hybrid/modern-engine.js');
 const runtime='const ITEMS='+jsString(originalItems)+';\n'+legacy+'\n'+core+'\n'+await read('src/hybrid/preview-choreography.js')+'\n'+await read('src/hybrid/runtime-adapter.js');const runtimeFile='runtime.'+sha(runtime).slice(0,12)+'.mjs';
 const css=await read('src/hybrid/effect-styles.css');
 const adapterCSS=`\n/* Runtime surface only; no gallery controls are imported into asset pages. */\n.asset-host{position:relative;isolation:isolate;width:100%;height:100%;aspect-ratio:auto;overflow:hidden}.asset-host>.mv-modern{position:absolute;inset:0}.asset-host[data-running=true] .demo-art *,.asset-host[data-running=true] .demo-art *::before{animation-play-state:running!important}.asset-host .lab-demo{padding:12px}.asset-host .lab-controls{display:none}.asset-host .lab-scene{border:0;border-radius:0}.asset-host .demo-art{transform:none}.asset-host .demo-art *{pointer-events:auto}.asset-host .mv-modern:not(.live-preview) *{animation-play-state:paused!important}.asset-host .miniature{pointer-events:auto}.asset-host .e-scene{max-width:none}.asset-host .lab-flip-word{font-size:46px}.asset-host .demo{width:540px;height:340px}.asset-host .demo button,.asset-host .demo input{pointer-events:auto}.asset-host[data-running=false] .miniature *{animation:none!important}.asset-host[data-playback=auto] *{animation:none!important;transition:none!important}.asset-host[data-mode=drag],.asset-host[data-mode=drag] *{user-select:none!important;-webkit-user-select:none!important;-webkit-user-drag:none;touch-action:none}.asset-host[data-mode=drag] input:not([type=range]),.asset-host textarea{user-select:text!important;-webkit-user-select:text!important}.asset-host[data-presentation=preview] .x-controls,.asset-host[data-presentation=preview] .controls.mini-hide{display:none}.vault-dragging,.vault-dragging *{user-select:none!important;-webkit-user-select:none!important}\n`;
 await put(root,'motion-vault-assets/shared/'+runtimeFile,runtime);await put(root,'motion-vault-assets/shared/runtime.mjs',runtime);await put(root,'motion-vault-assets/shared/runtime.css',css+adapterCSS);
 const originals={'modern-engine.js':core};
 const localItems=[];
 let notes={};try{notes=JSON.parse(await read('src/hybrid/design-notes.json'));}catch(e){if(e.code!=='ENOENT')throw e;}
 for(const item of catalogue.items){
  const id=typeof item.id==='number'?'local-'+item.id:item.id;const prefix='motion-vault-assets/'+id;
  const matching=originalItems.find(i=>i.id===item.id);const version=sha(runtime+css+adapterCSS+jsString(matching)).slice(0,16);
  const n=notes[item.key||item.id]||{};
  const params={schema:'motion-vault.parameters.v1',playbackRate:{type:'number',default:1,min:.25,max:2,description:'本地自动时间线播放速度，不伪装成原作参数。'},preview:{type:'boolean',default:false,description:'画廊悬停演示；真实鼠标或拖拽可接管。'},motionIntent:{type:'string',default:'system',description:'仅用户主动预览时传hover；不修改系统偏好，不用于页面环境动画。'},snapshot:{type:'boolean',default:false,description:'静止展示，用于同版本封面生成。'},...(n.parameters||{})};
  const entry=`// ${item.title}\n// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.\nimport {createRuntime} from '../shared/${runtimeFile}';\nexport const reference=${jsString(matching)};\nexport function mount(host,options={}){return createRuntime(host,reference,options);}\n`;
  const controller=`import{mount,reference}from './entry.mjs?v=${version}';const host=document.getElementById('asset');let instance;window.assetReady=false;window.assetErrors=[];addEventListener('error',e=>assetErrors.push(e.message));const q=new URLSearchParams(location.search);const options={snapshot:q.has('snapshot'),preview:q.has('preview'),playbackRate:Number(q.get('rate'))||1,phase:Number(q.get('phase'))||.55};function reset(){instance?.dispose();instance=mount(host,options);window.assetReady=true;}window.AssetDemo={start:reset,stop:()=>instance?.dispose(),paint:t=>instance?.paint(t),id:reference.id};reset();addEventListener('pagehide',()=>instance?.dispose());`;
  const html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>${item.title} · 本地实现</title><link rel="stylesheet" href="../shared/runtime.css"><style>html,body{height:100%;overflow:hidden;margin:0}#asset{position:absolute;inset:0;width:100%;height:100%}</style><div id="asset" class="asset-host"></div><script type="module" src="./demo.mjs"></script></html>`;
  const locations=[];
  if(item.key){for(const [f,code]of Object.entries(originals)){for(const token of ["case'"+item.key+"':","if(key==='"+item.key+"')"]){const ex=sourceExcerpt(code,token,token.startsWith('case')?1:10);if(ex)locations.push({path:'src/hybrid/'+f,...ex,role:'authoritative_editable_source'});}}}
  else{const ex=sourceExcerpt(legacy,'id==='+item.id,10);if(ex)locations.push({path:'src/hybrid/legacy-engine.js',...ex,role:'authoritative_editable_source'});else locations.push({path:'src/hybrid/formal-items.json',startLine:null,endLine:null,code:matching.demo,kind:'inline CSS/HTML source'});}
  const design=`# ${item.title}\n\n## 资产身份\n\n正式代码参考；当前是本地机制实现，不宣称原作视觉一比一还原，也不是已经接入业务的生产组件。\n\n## 使用场景\n\n${item.uses.map(u=>`- ${catalogue.taxonomy.find(s=>s.id===u.scene).label} / ${catalogue.taxonomy.find(s=>s.id===u.scene).tasks[u.task]}：${u.placement}。${u.goal}。`).join('\n')}\n\n## 设计意图与构图\n\n${n.intent||item.desc}\n\n${n.composition||item.design_value||item.uses[0].goal}\n\n## 运动与交互关系\n\n${n.motion||item.tech}\n\n预览方式为${item.preview_mode}。鼠标/拖拽/点击类的卡片运行本地代码，不以录屏假装跟手。\n\n## 迁移时保留什么\n\n${n.preserve||item.uses[0].goal+'。将视觉变化绑定到用户正在操作的对象，保留开始、稳定和返回状态。'}\n\n## 可以替换什么\n\n${n.adapt||'文字、图像与业务数据可以替换；重新检查长文本、窄屏和布局比例。不要把演示中的业务词语或占位数据当作真实业务逻辑。'}\n\n## 限制与验收\n\n${item.avoid}\n\n${n.tests||'以不同指针速度、反向操作、快速切换、Esc退出和减少动态效果测试。修改代码后重新生成封面/视频并核对版本，不沿用旧录屏冒充新实现。'}\n\n## 原作与实现边界\n\n来源：${item.source_name||'本地代码研究'}${item.source_url?'，'+item.source_url:''}。以上用途与迁移判断为设计分析；实现细节由本地代码支持。原作录屏尚未绑定时不得声称已经比对原作。\n\n## Agent 阅读顺序\n\n先读本文件，再读 IMPLEMENTATION.md 与 parameters.json；运行 index.html 对照实际效果。entry.mjs 是公开执行入口，shared/runtime.mjs 为共用运行引擎。生产任务采用前仍需明确选定，不直接复制审查意见。\n`;
  const implementation=`# ${item.title} · 实现定位\n\n## 可运行入口\n\n同目录 index.html；需要本地HTTP服务。entry.mjs 导出 mount(host, options)，返回 dispose() / paint(phase)。本包使用共享引擎，不以复制60份框架作为独立化。\n\n\`\`\`js\nimport {mount} from './entry.mjs';\nconst effect=mount(document.getElementById('preview'),{playbackRate:1});\n// 卸载组件或隐藏后：\neffect.dispose();\n\`\`\`\n\n## 维护入口\n\n实际维护 src/hybrid/modern-engine.js、src/hybrid/legacy-engine.js、src/hybrid/effect-styles.css 与 runtime-adapter.js；修改后运行 node scripts/build-hybrid.mjs build，再生成同版本预览并验收。shared/runtime.mjs 是构建产物，不应直接修改。当前源码目录是唯一修改入口。\n\n## 核心源码摘录与原始定位\n\n以下是准确摘录，供定位，不冒称这些片段单独即可运行。完整执行路径为 entry.mjs → shared/runtime.mjs；布局样式在 shared/runtime.css。\n\n${locations.map(s=>`### ${s.path}${s.startLine?':'+s.startLine+'-'+s.endLine:''}\n\n\`\`\`js\n${s.code}\n\`\`\`\n`).join('\n')}\n## 依赖和资源\n\n原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。\n\n## 当前参数\n\nplaybackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。\n`;
  const provenance={schema:'motion-vault.provenance.v1',source:item.source_url,author:item.source_name,implementation_kind:'local_independent_study',upstream_visual_verified:false,upstream_recording:null,local_basis_sha256:sha(jsString(originalItems)),version,rights:'本地既有代码与必要演示资源；不授予外部原作素材许可；未分发字体。'};
  for(const [f,v]of Object.entries({'index.html':html,'entry.mjs':entry,'demo.mjs':controller,'DESIGN.md':design,'IMPLEMENTATION.md':implementation,'parameters.json':JSON.stringify(params,null,2),'provenance.json':JSON.stringify(provenance,null,2),'source-map.json':JSON.stringify(locations,null,2)}))await put(root,prefix+'/'+f,v);
  const files={};for(const f of ['entry.mjs','demo.mjs','index.html','DESIGN.md','IMPLEMENTATION.md','parameters.json','provenance.json','source-map.json'])files[f]=sha(await readFile(path.join(root,prefix,f)));
  const asset={schema:'motion-vault.design-asset.v1',id:String(item.id),directory:id,title:item.title,version,status:'local_implementation',entry:'entry.mjs',run:'index.html',design:'DESIGN.md',implementation:'IMPLEMENTATION.md',parameters:'parameters.json',provenance:'provenance.json',core:'../shared/runtime.mjs',style:'../shared/runtime.css',hashes:files,shared_hashes:{'../shared/runtime.mjs':sha(runtime),['../shared/'+runtimeFile]:sha(runtime),'../shared/runtime.css':sha(css+adapterCSS)},preview:{kind:'local_render',poster:'poster.jpg',video:null,implementationVersion:version,captured:false},upstream_visual_verified:false,productionComponent:false,taskSelectionRequired:true};
  const prevPath=path.join(root,prefix,'asset.json');if(await exists(prevPath)){const prev=JSON.parse(await readFile(prevPath,'utf8'));if(prev.version===version&&prev.preview?.captured)asset.preview=prev.preview;}
  await put(root,prefix+'/asset.json',JSON.stringify(asset,null,2));
  localItems.push({...item,asset:{id,version,manifest:prefix+'/asset.json',entry:prefix+'/entry.mjs',run:prefix+'/index.html',design:prefix+'/DESIGN.md',implementation:prefix+'/IMPLEMENTATION.md',parameters:prefix+'/parameters.json',poster:asset.preview.captured?prefix+'/poster.jpg':null,video:asset.preview.video?prefix+'/'+asset.preview.video:null,preview_kind:'local_render',state:'local_implementation',source_verified:false}});
 }
 await copyFile(path.join(project,'web/motion-vault-media/preview.mp4'),path.join(root,'motion-vault-assets/preview.mp4'));
 const publicData={...catalogue,schema:'motion-vault.formal-catalog.v2',assetSchema:'motion-vault.design-asset.v1',runtimeRevision:sha(runtime+css+adapterCSS).slice(0,16),items:localItems};
 await put(root,'catalog.json',JSON.stringify(publicData,null,2));
 const candidates=await buildCandidateCatalog(publicData.taxonomy);
 const gallery=await assembleGallery(publicData,candidates);
 console.log(JSON.stringify({...gallery,staged:'.runtime/hybrid-assets/staged',sharedEngineBytes:Buffer.byteLength(runtime),productionChanged:false}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const command=process.argv[2]||'build';if(command==='build')await build();else throw new Error('Use build');}
