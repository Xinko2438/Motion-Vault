import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';import path from 'node:path';import {createRequire} from 'node:module';
import {root,project,sha,put,exists} from '../../scripts/build-hybrid.mjs';
const require=createRequire(path.resolve(project,'../media-knowledge-hub/package.json'));const esbuild=require('esbuild');
const ids=process.argv[2]?.split(',')||['curated-rounded-menu','curated-inline-menu','curated-tooltip-gallery','curated-grid-flow-nav','curated-layer-cut'];
const vendor={
 'gsap.min.js':'https://cdn.jsdelivr.net/npm/gsap@3.11.5/dist/gsap.min.js',
 'Flip.min.js':'https://cdn.jsdelivr.net/npm/gsap@3.11.5/dist/Flip.min.js',
 'imagesloaded.pkgd.min.js':'https://cdn.jsdelivr.net/npm/imagesloaded@5.0.0/imagesloaded.pkgd.min.js',
 'splitting.min.js':'https://cdn.jsdelivr.net/npm/splitting@1.0.6/dist/splitting.min.js',
 'splitting.css':'https://cdn.jsdelivr.net/npm/splitting@1.0.6/dist/splitting.css',
 'splitting-cells.css':'https://cdn.jsdelivr.net/npm/splitting@1.0.6/dist/splitting-cells.css'};
const vendorDir=path.join(root,'motion-vault-assets/vendor');await mkdir(vendorDir,{recursive:true});const vendorManifest=[];
for(const [file,url]of Object.entries(vendor)){const dest=path.join(vendorDir,file);if(!await exists(dest)){const r=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error('Dependency unavailable '+url);await writeFile(dest,Buffer.from(await r.arrayBuffer()));}const bytes=await readFile(dest);vendorManifest.push({file,url,sha256:sha(bytes),bytes:bytes.length});}
await writeFile(path.join(vendorDir,'manifest.json'),JSON.stringify(vendorManifest,null,2));
async function walk(dir){const all=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Unexpected symlink');if(['dist','.git','node_modules'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())all.push(...await walk(p));else all.push(p);}return all;}
const shims={gsap:'export const gsap=window.gsap; export default window.gsap;','gsap/Flip':'export const Flip=window.Flip; export default window.Flip;',imagesloaded:'module.exports=window.imagesLoaded;',splitting:'export default window.Splitting;'};
const catalogue=JSON.parse(await readFile(path.join(project,'candidates/curated-originals/src/catalog.json'),'utf8'));
const results=[];
for(const id of ids){try{
 const folder=path.join(root,'motion-vault-assets',id);const source=path.join(folder,'source');const upstream=JSON.parse(await readFile(path.join(folder,'upstream.json'),'utf8'));const license=await readFile(path.join(source,'LICENSE'),'utf8');if(!license.includes('Permission is hereby granted'))throw new Error('MIT grant not found');
 const base=await exists(path.join(source,'src/index.html'))?path.join(source,'src'):source;const run=path.join(folder,'run');await mkdir(run,{recursive:true});
 const changes=[];const sourceIndex=[];
 for(const f of await walk(base)){const rel=path.relative(base,f).replaceAll('\\','/');const ext=path.extname(f).toLowerCase();const bytes=await readFile(f);sourceIndex.push({file:path.relative(source,f).replaceAll('\\','/'),sha256:sha(bytes),bytes:bytes.length});if(['.js','.mjs','.json','.md','.html'].includes(ext)||rel==='LICENSE')continue;
  let out=bytes;if(ext==='.css'){let css=bytes.toString('utf8');css=css.replace(/@import[^;]+;/g,'').replace(/@font-face\s*\{[^}]*\}/g,'');out=Buffer.from(css);}
  if(['.woff','.woff2','.ttf','.otf','.eot'].includes(ext))throw new Error('Font excluded');await put(run,rel,out);
 }
 let html=await readFile(path.join(base,'index.html'),'utf8');
 const scriptSrc=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>[\s\S]*?<\/script>/g)].map(m=>m[1]);
 const entry=scriptSrc.find(x=>/^js\/(?!.*(?:min|pkgd))/.test(x))||'js/index.js';
 html=html.replace(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>[\s\S]*?<\/script>/g,'');
 html=html.replace(/<link\b[^>]*href=["'](?:https?:)?\/\/[^"']+["'][^>]*>/g,'');
 html=html.replace(/<script\b[^>]*>[\s\S]*?(?:Typekit|analytics|gtag)[\s\S]*?<\/script>/g,'');
 const csp="default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'";
 const headers=`<meta http-equiv="Content-Security-Policy" content="${csp}"><link rel="stylesheet" href="../../vendor/splitting.css"><link rel="stylesheet" href="../../vendor/splitting-cells.css"><style>body{font-family:Arial,Helvetica,sans-serif}.frame__links,.frame__sponsor,.cdawrap{display:none!important}html{scrollbar-width:thin}a{cursor:pointer}.frame{visibility:hidden;pointer-events:none}.frame__close{visibility:visible;pointer-events:auto}.frame a,.frame button{pointer-events:auto}body:before{font-family:Arial,sans-serif}</style>`;
 html=html.replace('</head>',headers+'</head>');
 const scripts=['gsap.min.js','Flip.min.js','imagesloaded.pkgd.min.js','splitting.min.js'].map(f=>`<script src="../../vendor/${f}"></script>`).join('');
 const bridge=`window.assetErrors=[];addEventListener('error',e=>assetErrors.push(e.message));addEventListener('unhandledrejection',e=>assetErrors.push(String(e.reason)));addEventListener('click',e=>{const a=e.target.closest('a');if(a&&a.getAttribute('href')&&!a.getAttribute('href').startsWith('#'))e.preventDefault()},true);window.SourceDemo={stop(){window.gsap?.globalTimeline.pause()},resume(){window.gsap?.globalTimeline.resume()},version:${JSON.stringify(upstream.commit)}};`;
 const end=`window.assetReady=true;document.documentElement.dataset.localSource='true';`;
 html=html.replace('</body>',scripts+'<script>'+bridge+'</script><script src="./effect.js"></script><script>'+end+'</script></body>');
 await esbuild.build({entryPoints:[path.join(base,entry)],outfile:path.join(run,'effect.js'),bundle:true,format:'iife',platform:'browser',target:'es2020',minify:false,sourcemap:false,legalComments:'inline',plugins:[{name:'local-vendor-globals',setup(build){build.onResolve({filter:/^(gsap(?:\/Flip)?|imagesloaded|splitting)$/},a=>({path:a.path,namespace:'globals'}));build.onLoad({filter:/.*/,namespace:'globals'},a=>({contents:shims[a.path],loader:'js'}));build.onResolve({filter:/^splitting\/.*\.css$/},a=>({path:a.path,namespace:'empty'}));build.onLoad({filter:/.*/,namespace:'empty'},()=>({contents:'',loader:'js'}));}}]});
 await writeFile(path.join(run,'index.html'),html);await copyFile(path.join(source,'LICENSE'),path.join(run,'LICENSE.txt'));
 const it=catalogue.find(i=>i.id===id);const runtimeHashes={};for(const f of await walk(run))runtimeHashes['run/'+path.relative(run,f).replaceAll('\\','/')]=sha(await readFile(f));const version=sha(JSON.stringify(runtimeHashes)+JSON.stringify(vendorManifest)+upstream.commit).slice(0,16);
 const design=`# ${it.title}\n\n## 用途与设计判断\n\n${it.uses.map(u=>u.placement+'：'+u.goal).join('\n\n')}\n\n${it.design_value}\n\n## 观察重点\n\n${it.inspect}\n\n## 本地实现与原作差异\n\n直接基于作者源码构建，非重新仿写的简化效果。保留图像布局、运动时间线及交互状态。删除分析/广告加载、外链字体与外部导航，改用系统字体，因此字形和字宽与源站可能不同。第三方图片仅作署名参考素材，实际商业制作仍核查对应图片权利。\n\n## 迁移到当前项目\n\n优先阅读源码中timeline、Flip状态、布局测量和事件入口，把业务内容换成当前项目的数据；保留视觉对象身份及转场时序。原作者研究中的未实现业务功能不能当作已经完备的组件。\n\n${it.limit}\n\n## 来源\n\n${upstream.repository}\n\n提交：${upstream.commit}\n\n此候选未授予正式收录或具体生产任务选定。\n`;
 const files=sourceIndex.filter(f=>/\.(js|css)$/.test(f.file));
 const implementation=`# ${it.title} · 源码接入\n\n运行入口：run/index.html。原始源码保留在source/，提交锁定在upstream.json。修改对应源码后重新运行本项目src/hybrid/adapt-upstream.mjs构建，不直接编辑生成的effect.js。\n\n## 核心文件\n\n${files.map(f=>'- source/'+f.file+' ('+f.sha256.slice(0,12)+')').join('\n')}\n\n## 本地依赖\n\nGSAP3.11.5、Flip同版本、imagesLoaded5.0.0、Splitting1.0.6。版本与下载字节哈希在../vendor/manifest.json。未执行上游安装脚本，未复制字体文件。\n\n## 接口与限制\n\nSourceDemo.stop()/resume()控制本地时间线；原作事件入口保持原样。需要状态重置时重新载入本地run/index.html。封面与短片仅从本地这个版本采集，不标成未修改的原站录屏。\n`;
 const provenance={...upstream,implementation_kind:'adapted_upstream_source',version,upstream_visual_verified:false,upstream_recording:null,source:it.source_url,author:it.author,rights:'代码：上游MIT许可，许可证保留。图片来源见原作者README；非图库素材授权保证。字体文件未包含。',differences:['Removed analytics and sponsor scripts','Removed remote font requests; system font fallback','Blocked outbound navigation and network connections','Bundled source modules with pinned local dependencies']};
 for(const [file,value]of Object.entries({'DESIGN.md':design,'IMPLEMENTATION.md':implementation,'parameters.json':JSON.stringify({configuration:'Source-defined geometry and GSAP timeline constants; see source files. No fake universal parameter API.'},null,2),'source-map.json':JSON.stringify(sourceIndex,null,2),'provenance.json':JSON.stringify(provenance,null,2)}))await writeFile(path.join(folder,file),value);
 const hashes={...runtimeHashes};for(const f of ['DESIGN.md','IMPLEMENTATION.md','parameters.json','provenance.json','source-map.json','run/index.html','run/effect.js'])hashes[f]=sha(await readFile(path.join(folder,f)));
 const asset={schema:'motion-vault.design-asset.v1',id,directory:id,title:it.title,version,status:'local_source_pending_browser_verification',entry:'run/effect.js',run:'run/index.html',design:'DESIGN.md',implementation:'IMPLEMENTATION.md',parameters:'parameters.json',provenance:'provenance.json',source:'source/',hashes,shared_hashes:Object.fromEntries(vendorManifest.map(v=>['../vendor/'+v.file,v.sha256])),preview:{kind:'adapted_source_render',poster:'poster.jpg',video:null,implementationVersion:version,captured:false},productionComponent:false,taskSelectionRequired:true};
 await writeFile(path.join(folder,'asset.json'),JSON.stringify(asset,null,2));results.push({id,version,readyForTest:true,files:sourceIndex.length,runBytes:Buffer.byteLength(html)});console.log('Adapted '+id);
}catch(e){results.push({id,readyForTest:false,error:e.message});console.error(id+': '+e.message);}}
await put(project,'lineage/hybrid-assets/upstream-adaptation.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
