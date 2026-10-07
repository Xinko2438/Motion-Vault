// Assemble the current local reference packages after actual source execution and capture.
import {readFile,writeFile,readdir,cp} from 'node:fs/promises';import path from 'node:path';
import {project,root,sha,put,exists} from '../../scripts/build-hybrid.mjs';
const catalogPath=path.join(project,'candidates/curated-originals/src/catalog.json'),items=JSON.parse(await readFile(catalogPath,'utf8'));
const registry=JSON.parse(await readFile(path.join(project,'src/hybrid/source-registry.json'),'utf8')),tax=JSON.parse(await readFile(path.join(root,'catalog.json'),'utf8')).taxonomy;
const notes={
 'curated-telescope':['保持同一个中心，让前后图层交接而不是同时缩放全部内容。','优先调整各层显露区间与缩放范围，再换图片；反向滚动必须回到同一视觉关系。'],
 'curated-glass-torus':['透明体、内部环形字带和背景文字形成三个有前后关系的层。','替换短品牌词时同时检查alpha裁切、折射和字带半径；背景文字不能与透明物体处于同一深度。'],
 'curated-metal-name':['从字形正负轮廓形成多层截面，深度和微小扭转让平面文字具有建筑般结构。','先换字再调截面密度、扭转幅度和观察角；几何只在内容改变时重建，不在每帧重建。'],
 'curated-liquid-grid':['在有限球面上安排图像，通过遮挡、透射、空间旋转和惯性形成整体浏览对象。','本地是静态照片陈列，不是无限视频流或XPBD模拟；复用时保留停下后的速度衰减和中心/边缘层次。'],
 'curated-depth':['保持对象身份与画面中心，逐层讲形态、表面、光照，不用三个不相关物件代替一个叙事。','进度同时连接几何、金属度、粗糙度和环境强度；真实滚动或滑杆控制同一个进度。'],
 'curated-spatial-product':['弯曲陈列把大量对象放进同一空间，选中时相机、产品和标签建立统一焦点。','迁移时先控制可见产品量，再调整曲率、阻尼和焦点；演示品牌与商品照片须替换。'],
 'curated-fluid-xray':['两套场景共用相机和对象位置，流动遮罩显露内部结构，并在移动后扩散消退。','替换模型必须保持两套场景的对齐；调整显露半径、流体衰减和内部外观，不能把它表述成真实医学成像。'],
 'curated-camera-route':['场景路线、镜头朝向和停留点共同决定叙事，不是简单直线前进。','编辑Theatre关键帧与环境模型；滚动来自内部ScrollControls，不是整个文档的scrollTop。'],
 'curated-cloth-object':['烘焙形态变化让实体具备压缩、褶皱与回弹，接触阴影帮助判断体积。','替换形态键模型或重新烘焙动作；它不是实时布料求解器，不应把参数写成可任意模拟。'],
 'curated-emissive-dissolve':['同一阈值联系实体溶解边缘、发光和粒子释放，使消退成为统一动作。','分别调整噪声尺度、边缘厚度、发光和粒子寿命，保留一个共同的进度来源。'],
 'curated-dual-wave':['两列文字相向或错相运动，文字清晰区与中央图像共同形成阅读焦点。','短标题分组后调整错相和可读时间；中文需要重新处理分词与行长。'],
 'curated-image-in-type':['图片在字间空间里展开，文字本身让出位置，图像和句子不是互不相关的两块。','换内容时先验证起止排版，再调滚动区间；图像不能在最终状态破坏句子可读性。'],
 'curated-cylinder-type':['名单围绕柱面排列，正面清晰、远端透视收敛，让滚动具有旋转空间感。','更换行数和字号必须同时调整半径、视角和滚动跨度，并保留可访问的普通文本。'],
 'curated-stylized-water':['水的色阶、波纹、岸边泡沫与地形在同一个明暗系统中工作。','先匹配场景整体颜色和光照，再微调波幅和泡沫；不要把水面直接当作无关页面背景。'],
 'curated-shape-ascii':['字形匹配不仅表达亮度，还用于保住实体轮廓和倾斜边缘。','调整字符密度、对比度与模型尺寸；小尺寸必须看得见整体对象，不只剩字符噪点。'],
 'curated-reaction-diffusion':['局部变化通过计算步骤传播，生长型纹理有连续的结构演化。','调整反应扩散参数时保留稳定步长与边界处理；生产需明确WebGPU要求与替代画面。'],
 'curated-vortex-glass':['外部球体建立边界，内部体积漩涡提供方向和纵深，让复杂运动受一个轮廓约束。','优先控制发光、密度和内部旋转，背景保持安静；不要在长页面重复建立多个完整场景。'],
 'curated-webgl-reveal':['图像进入视口时逐步显露与变形，稳定后恢复为可观看的作品。','调整显露阈值与滚动速度的对应关系；信息性图片最后必须清楚，不能永久变形。'],
 'curated-persistent-gallery':['列表图像和详情之间保留视觉关联，滚动显露与路由交接复用同一个图形环境。','迁移时同时检查进入、返回、快速切换与加载失败，不把单次入场动画当作完整路由系统。'],
 'curated-webgpu-route':['页面内容变化时图形画布持续存在，图像顺序与导航状态共同完成转场。','替换真实路由时保留画布生命周期、历史记录和取消路径；本地运行仍需相应图形能力。'],
 'curated-grid-full':['产品网格与原位放大的预览互相让位，使集合浏览和细节查看保持联系。','原作者交互由悬停触发，不是必须点击；更换产品比例时检查左右预览区域和快速移入移出。'],
 'curated-editorial-layout':['图像组的密度、比例和位置随章节变化，让版式本身参与叙事。','先确定真实内容节奏再修改滚动区段，不应让重要文字只在短暂运动中可见。'],
 'curated-thumbnail-flow':['多张缩略图沿有组织的路径依次迁移，错峰间距与主画面出现形成整体动作。','保留路径和卡片先后关系，实际轮播、选中与返回需按业务补齐；本地接入原作第三个演示。'],
 'curated-elastic-editorial':['网格各列使用不同滞后量，滚动时有弹性，停止后重新归入秩序。','先调整列之间的相对延迟，再改图像大小；效果不适合强调快速精确定位的后台列表。'],
 'curated-cluster':['多个单体围绕一个中心形成聚合结构，旋转与局部响应强调部分和整体的关系。','替换模块造型时保留整体轮廓和遮挡层次；不要把纯视觉结构当成真实数据拓扑。'],
 'curated-layer-cut':['分层图像的遮罩方向和时间差形成连续的切换，不只是整图淡入淡出。','保留前后图层的遮挡与方向关系，替换素材后检查主体没有被错误裁切。'],
 'curated-rounded-menu':['圆角导航容器扩大时，背景以互补方向揭幕，两者一起表达空间变化。','迁移到高频应用要缩短等待并补真实链接、焦点和退出；不是把演示菜单原样塞进业务。'],
 'curated-inline-menu':['被选词语保留身份进入导航，其余文字与图像围绕它重新安排。','中文需要定义词组边界和换行策略，不能按拉丁单词间空格直接拆分。'],
 'curated-tooltip-gallery':['同一缩略图依次承担提示、画廊和全屏主图，边线与位置一起迁移。','保留图像身份和返回位置；原作画廊导航不完整，生产必须另行补全。'],
 'curated-grid-flow-nav':['频道选择与图像群的进入方向、密度变化和落位形成一个完整动作。','控制切换期间的中断和等待，不能只复用图像飞入而忽略导航状态。']
};
const localDescriptions={
 'curated-glass-torus':{title:'玻璃圆环与折射字带',tech:'Three.js / WebGL2 / 物理透射材质',design_value:'透明圆环、内部字带与背景文字形成折射层次；本地为独立光学设计研究，不冒称原作源码。'},
 'curated-metal-name':{title:'字形截面的金属空间结构',tech:'Three.js / 字形轮廓 / 截面叠放',design_value:'根据输入字形构造连续截面，结合负空间、扭转和金属高光；本地为独立实现。'},
 'curated-liquid-grid':{title:'玻璃球面图像陈列',tech:'Three.js / WebGL2 / 图像阵列与惯性',design_value:'静态图像、玻璃外壳与球面深度形成可旋转陈列；不是原作无限视频网格或XPBD模拟。'},
 'curated-depth':{title:'同一物体的形态、材质与光照叙事',tech:'Three.js / 几何插值 / 材质进度',design_value:'以同一实时几何对象贯穿形态、表面和光照三阶段；独立实现，区别于原作首屏图像序列。'}
};
const independent=new Set(registry.filter(i=>i.implementation==='independent').map(i=>i.id));
async function walk(dir,prefix=''){const list=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isSymbolicLink())throw new Error('Symlink');if(['node_modules','dist','private','fonts','font','.git'].includes(e.name)||/\.(woff2?|ttf|otf|eot|map)$/i.test(e.name))continue;const rel=prefix?prefix+'/'+e.name:e.name;if(e.isDirectory())list.push(...await walk(path.join(dir,e.name),rel));else if(e.isFile())list.push(rel);}return list.sort();}
const inventory=[];
for(const it of items){const id=it.id,dir=path.join(root,'motion-vault-assets',id),manifest=JSON.parse(await readFile(path.join(dir,'asset.json'),'utf8')),capture=JSON.parse(await readFile(path.join(project,'lineage/current/capture',id+'.json'),'utf8'));
 if(!capture.passed||capture.version!==manifest.version||!manifest.preview.captured||manifest.preview.implementationVersion!==manifest.version)throw new Error('Missing matching visual verification '+id);
 it.original_title??=it.title;it.local_implementation_kind=independent.has(id)?'independent_code':'adapted_author_source';if(localDescriptions[id])Object.assign(it,localDescriptions[id]);
 if(id==='curated-grid-full')it.uses=[{scene:'product',task:'detail',placement:'产品目录中的原位放大预览',goal:'在保留系列产品关系的同时查看单个对象细节'},{scene:'portfolio',task:'handoff',placement:'图像网格到作品预览',goal:'由原位置建立下一层的视觉锚点'}];
 it.status='local_ready_for_review';it.source_evidence='来源、作者和上游提交见本地provenance.json；用途与借鉴判断为策展分析。';it.visual_evidence='已取得同一本地实现的真实封面和动效片段；不宣称原作逐像素一致。';it.preview_behavior='悬停播放同实现片段，详情可打开本地交互；不依赖源站在线加载。';it.rights='保留代码许可与必要署名；演示图像、模型和品牌仅作为参考，生产需分别核实或替换；不分发字体。';
 manifest.kind=it.local_implementation_kind;manifest.title=it.title;manifest.preview.kind=independent.has(id)?'local_render':'adapted_source_render';
 // Preserve original source and the precise adapted text separately, instead of listing missing generated entries.
 const work=path.join(project,'.runtime/consolidation/build',id,'source'),source=path.join(dir,'source');const adapted=[];
 if(await exists(work))for(const f of await walk(work)){if(!/\.(jsx?|tsx?|mjs|css|scss|html|glsl|frag|vert|wgsl)$/.test(f))continue;const content=await readFile(path.join(work,f));const original=await exists(path.join(source,f))?await readFile(path.join(source,f)):null;if(!original||sha(original)!==sha(content)){await put(dir,'adapter/'+f,content);adapted.push('adapter/'+f);}}
 const oldMap=JSON.parse(await readFile(path.join(dir,'source-map.json'),'utf8'));const sourceMap=[];
 for(const s of oldMap){let rel=s.path||('source/'+s.file);if(!await exists(path.join(dir,rel)))rel=rel.replace(/^source\//,'adapter/');if(await exists(path.join(dir,rel))&&/\.(jsx?|tsx?|mjs|glsl|frag|vert|wgsl|css)$/.test(rel))sourceMap.push({...s,path:rel,role:rel.startsWith('adapter/')?'local_adapter':'original_source',sha256:sha(await readFile(path.join(dir,rel)))});}
 for(const f of adapted)if(!sourceMap.some(s=>s.path===f))sourceMap.push({path:f,role:'local_adapter',sha256:sha(await readFile(path.join(dir,f)))});
 // Add actual human-readable effect modules, not image files or a bundled dependency dump.
 const sources=await walk(source);for(const f of sources){if(!/\.(jsx?|tsx?|mjs|glsl|frag|vert|wgsl)$/.test(f)||/(\.min\.|gsap|imagesloaded|splitting|lenis\.js|MotionPathPlugin)/i.test(f))continue;const rel='source/'+f;if(!sourceMap.some(s=>s.path===rel))sourceMap.push({path:rel,role:independent.has(id)?'independent_implementation':'original_source',sha256:sha(await readFile(path.join(source,f)))});}
 if(!sourceMap.length)throw new Error('No readable source '+id);await put(dir,'source-map.json',JSON.stringify(sourceMap,null,2));
 let provenance=JSON.parse(await readFile(path.join(dir,'provenance.json'),'utf8'));provenance.implementation_kind=manifest.kind;provenance.reference_author=it.author;provenance.reference_title=it.original_title;provenance.author=independent.has(id)?'Motion Vault 本地独立实现':it.author;provenance.upstream_visual_verified=false;
 const delta=id==='curated-spatial-product'?'移除Next页面外壳，保留ShoeGrid核心；系统字体Canvas标签替代字库；构建期处理GLSL依赖。':id==='curated-persistent-gallery'?'将Astro模板展开成本地静态页面，保留Barba与Three交接；原模板与生成适配文件分开放置。':id==='curated-webgl-reveal'?'移除与当前效果无关的外部推荐卡片，不为预览加载第三方图片。':id==='curated-thumbnail-flow'?'当前本地入口对应原作第三个路径编排演示。':null;
 if(delta&&!provenance.differences.includes(delta))provenance.differences.push(delta);await put(dir,'provenance.json',JSON.stringify(provenance,null,2));
 const [principle,adapt]=notes[id];const usage=it.uses.map((u,i)=>`${i?'补充':'主要'}用途：${tax.find(t=>t.id===u.scene).label} / ${tax.find(t=>t.id===u.scene).tasks[u.task]}\n页面位置：${u.placement}\n设计任务：${u.goal}`).join('\n\n');
 await put(dir,'DESIGN.md',`# ${it.title}\n\n## 实际用途\n${usage}\n\n## 设计思路\n${principle}\n\n${it.design_value}\n\n## 迁移时保留什么\n${adapt}\n\n## 观察与验证\n${it.inspect}\n正反向、快速重复操作、返回、不同宽高比与资源释放应分别验收。预览片段只展示本地实现，不代替业务验收。\n\n## 使用边界\n${it.limit}\n${provenance.differences.join('\n')}\n\n## 来源边界\n原作：${it.original_title}；${it.author}。\n${it.source_url}\n本地实现类型：${independent.has(id)?'独立实现，不是原作者代码':'基于作者源码的本地适配'}。\n本文件的用途、设计分析和迁移建议属于策展分析，不代表原作者主张、用户审美认可或某项生产任务批准。\n`);
 const primary=sourceMap.filter(s=>/\.(jsx?|tsx?|mjs)$/.test(s.path)).slice(0,12);
 const prior=(await readFile(path.join(dir,'IMPLEMENTATION.md'),'utf8')).split('\n\n## 当前完整源码与适配')[0];
 await put(dir,'IMPLEMENTATION.md',prior.replace(/source\/local-entry\.jsx/g,'adapter/local-entry.jsx')+`\n\n## 当前完整源码与适配\n实际执行入口：${manifest.run} → ${manifest.entry}。\n可读源文件：\n${primary.map(s=>'- '+s.path+'（'+s.role+'）').join('\n')}\n\nsource-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。\n\n## 迁移设计\n${principle}\n${adapt}\n\n## 预览关联\nposter.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=${manifest.version}。视频没有取代源码。\n`);
 // Bind readable source as well as runtime bytes, so inspection cannot silently point at a stale file.
 manifest.hashes={};for(const f of await walk(dir)){if(f==='asset.json'||f==='poster.jpg'||f==='preview.mp4')continue;manifest.hashes[f]=sha(await readFile(path.join(dir,f)));}
 await put(dir,'asset.json',JSON.stringify(manifest,null,2));inventory.push({id,title:it.title,kind:manifest.kind,version:manifest.version,sourceFiles:sourceMap.length,main:it.uses[0],previewBytes:manifest.preview.videoBytes});
}
await writeFile(catalogPath,JSON.stringify(items,null,2));await put(project,'lineage/current/candidate-readiness.json',JSON.stringify({at:new Date().toISOString(),total:inventory.length,ready:inventory.length,authorSource:inventory.filter(i=>i.kind==='adapted_author_source').length,independent:inventory.filter(i=>i.kind==='independent_code').length,items:inventory},null,2));
let md='# Motion Vault 新增参考：用途索引\n\n共30条本地可运行候选。26条作者源码适配，4条独立设计研究；未自动标记用户认可。\n';for(const scene of tax){const matches=items.filter(i=>i.uses[0].scene===scene.id);if(!matches.length)continue;md+=`\n## ${scene.label}（${matches.length}）\n\n| 参考 | 具体设计任务 | 页面位置 | 要解决的问题 | 本地实现 |\n|---|---|---|---|---|\n`;for(const it of matches){const u=it.uses[0];md+=`| ${it.title} | ${scene.tasks[u.task]} | ${u.placement} | ${u.goal} | ${independent.has(it.id)?'独立实现':'作者源码适配'} |\n`;}}
await put(project,'references/CURRENT-CANDIDATES.md',md);console.log(JSON.stringify({ready:inventory.length,authorSource:26,independent:4,sourceMapsVerified:true,privateNotesIncluded:false}));
