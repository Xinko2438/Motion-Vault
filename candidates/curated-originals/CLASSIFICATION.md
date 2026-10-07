# Motion Vault · 30个原作候选与使用场景

2026-10-05。状态：新候选待审，尚未正式收录。原作者来源与演示入口已核实；用途、价值与限制中的建议属于策展分析。原作实时画面与嵌入兼容性尚未逐项验收。不是30个本地复刻组件。

## 分类方法

一级为实际制作场景；二级为具体设计任务；每个条目进一步说明页面位置和目标。预览方式不作为生产主分类。允许补充用途交叉检索，但下面数量只按主要用途计数，不重复计算。

|主要场景|本批数量|具体任务|
|---|---:|---|
|品牌首页与发布|10|首屏主视觉；动态标识与标题；背景材质与氛围；开场与揭幕|
|产品展示与讲解|4|产品陈列与选型；材质与局部细节；功能原理与卖点；参数调节与配置|
|作品集与案例|9|作品总览与空间排列；图片探索与预览；缩略图到案例的衔接；系列作品连续浏览|
|阅读与内容叙事|5|章节推进与阅读定位；标题与图文编排；数据解释与对比；音视频与连续阅读|
|应用与创作工作台|2|全局导航与空间切换；上下文工具与辅助操作；面板层级与工作区；精细编辑与直接操控|
|关键流程与反馈|0|分步引导与连续任务；加载与等待；状态确认与通知；错误解释与可逆操作|

关键流程与反馈本批未新增：没有为了补齐分类而收录普通控件。

## 品牌首页与发布

怎样建立第一眼的品牌气质？

### 01 · 镜筒式层叠缩放叙事

作者：Joffrey Spitzer。

**品牌首页与发布 / 开场与揭幕**：品牌首页首屏进入第二幕。让用户沿同一视觉中心进入故事，而不是上下切换孤立区块。

**阅读与内容叙事 / 章节推进与阅读定位**：专题开篇。用视觉纵深引出章节。

**借鉴价值（策展分析）**：多层图像的尺度关系和滚动节奏共同形成纵深；借鉴的是完整场景推进，不是普通放大。

**审查重点**：观察中心锚点是否稳定、不同层何时交接，以及反向滚动的连贯性。

**使用限制**：长距离缩放可能造成眩晕；正文需另保留清晰阅读通道。

**原作技术与操作**：GSAP / ScrollTrigger / ScrollSmoother；在原作内滚动。

[原作者说明／来源](https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/) · [打开原作](https://tympanus.net/Tutorials/TelescopeZoom/)

### 02 · 玻璃圆环里的折射字形

作者：Matt Park。

**品牌首页与发布 / 动态标识与标题**：活动主视觉与动态标识。让文字与实体材质形成一个完整视觉对象。

**借鉴价值（策展分析）**：字体不是贴在玻璃上的说明，而是随折射强度改变观感；光照、厚度与停顿节奏构成重点。

**审查重点**：观察折射变化时文字是否仍有辨识度，及静止阶段的反光层次。

**使用限制**：透明材质存在多次渲染成本；原作模型和文字不可直接当成自有品牌资产。

**原作技术与操作**：Three.js / R3F / TransmissionMaterial；悬停载入后观看原作播放。

[原作者说明／来源](https://tympanus.net/codrops/2025/03/13/warping-3d-text-inside-a-glass-torus/) · [打开原作](https://tympanus.net/Tutorials/TransmissionMaterial/)

### 03 · 名字生成金属建筑结构

作者：BL/S® / Serhii Polyvanyi。

**品牌首页与发布 / 动态标识与标题**：活动个性化入口与签名页。将用户输入变成有材质、有空间秩序的品牌记忆。

**借鉴价值（策展分析）**：字形轮廓被组织成连续的扭转建筑，而不是简单挤出一排三维文字。

**审查重点**：输入不同名字，观察轮廓连接、负空间与金属饰面的整体关系。

**使用限制**：不把生成结果的分享功能当作已授权发布；反光是作者的实时近似实现，不是光线追踪。

**原作技术与操作**：Three.js / 轮廓插值 / 反射贴图；在原作中输入与操作。

[原作者说明／来源](https://tympanus.net/codrops/2026/09/09/turning-names-into-digital-architecture-with-three-js/) · [打开原作](https://blacklead-studio.webflow.io/three-js-conf)

### 08 · 沿场景路线推进的镜头叙事

作者：Andrew Prifer。

**品牌首页与发布 / 首屏主视觉**：空间品牌与沉浸式开场。让用户通过镜头路线而非按钮切换探索场景。

**产品展示与讲解 / 产品陈列与选型**：空间和展厅展示。通过路线安排产品被看见的顺序。

**借鉴价值（策展分析）**：镜头运动与场景构图一起编排，重点是镜头路径、停留和观察方向，不是让图标沿线跑。

**审查重点**：检查滚动正反向时视角转向，重要物体出现的位置与停留时间。

**使用限制**：不是所有页面都适合强镜头移动；移动端与减少动态效果需要降级。

**原作技术与操作**：Theatre.js / React Three Fiber；在原作内滚动。

[原作者说明／来源](https://tympanus.net/codrops/2023/02/14/animate-a-camera-fly-through-on-scroll-using-theatre-js-and-react-three-fiber/) · [打开原作](https://tympanus.net/Development/CameraFlyThrough/)

### 10 · 带发光边缘的实体溶解

作者：Jatin Chopra。

**品牌首页与发布 / 开场与揭幕**：发布视觉的出现与消退。让一个完整物体逐步转换成能量或粒子。

**借鉴价值（策展分析）**：溶解边缘、发光和粒子释放有同一进度关系，不是随意堆放粒子特效。

**审查重点**：关注边缘厚度、粒子出现的时机，以及最终消退的干净程度。

**使用限制**：高对比发光不能抢过核心信息；需要测试低端设备的后处理开销。

**原作技术与操作**：Three.js / GLSL / 粒子；观看原作并调整原作控件。

[原作者说明／来源](https://tympanus.net/codrops/2025/02/17/implementing-a-dissolve-effect-with-shaders-and-particles-in-three-js/) · [打开原作](https://tympanus.net/Tutorials/EmissiveDissolveEffect/)

### 14 · 风格化水面与场景光感

作者：Thalles Lopes。

**品牌首页与发布 / 背景材质与氛围**：自然、海岸或空间主题背景。让水的风格与画面整体气质一致。

**借鉴价值（策展分析）**：研究的是水面与三维场景的综合色彩和光感，不是对整张图片施加任意波纹。

**审查重点**：观察水面细节、远近层次和主物体之间的明暗关系。

**使用限制**：需在真实浏览器中判断 GPU 负担；不得让背景持续干扰正文。

**原作技术与操作**：React Three Fiber / 水面着色；观看原作场景并操作。

[原作者说明／来源](https://tympanus.net/Tutorials/StylizedWater/) · [打开原作](https://tympanus.net/Tutorials/StylizedWater/)

### 15 · 沿真实轮廓选字的 ASCII 实体

作者：Edoardo Lunardi。

**品牌首页与发布 / 动态标识与标题**：技术品牌的标识实验。在字符媒介里保住标识轮廓和空间感。

**借鉴价值（策展分析）**：字符选择考虑形状而不仅是亮度，因此倾斜边缘也有结构；区别于普通乱码文字。

**审查重点**：拖动对象并对比斜边、明暗层次和小尺寸的标识辨认。

**使用限制**：高密度字符不适合正文；品牌图形与字库的实际许可另查。

**原作技术与操作**：Three.js / GPU 字形匹配；在原作内拖拽。

[原作者说明／来源](https://tympanus.net/codrops/2026/09/04/beyond-the-luminance-ramp-a-shape-aware-ascii-renderer-in-three-js/) · [打开原作](https://tympanus.net/Tutorials/ASCIILogo/)

### 16 · 反应扩散的生长型材质

作者：Robert Leitl / atuin.media。

**品牌首页与发布 / 背景材质与氛围**：研究、自然与生成设计主题视觉。以持续生长而非循环平移的纹理表达过程。

**借鉴价值（策展分析）**：纹理形态在模拟中演化，适合借鉴生长节奏、局部结构和留白的关系。

**审查重点**：观察图案密度是否有层级、局部变化如何传到整体。

**使用限制**：原作要求 WebGPU；正式产品需静态或视频替代，不强迫用户更改浏览器安全设置。

**原作技术与操作**：WebGPU / Compute shader；观看原作播放与交互。

[原作者说明／来源](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/) · [打开原作](https://tympanus.net/Tutorials/WebGPUReactionDiffusion/)

### 17 · 玻璃球中的体积漩涡

作者：MisterPrada。

**品牌首页与发布 / 首屏主视觉**：高识别度的发布主视觉。把复杂运动约束在一个清晰的中心物体内。

**借鉴价值（策展分析）**：外壳与内部流动相互衬托，体积、折射和中心构图同时成立。

**审查重点**：检查球体轮廓、内部旋转深度，以及背景能否保持安静。

**使用限制**：原作依赖较重的图形能力；适合一个主视觉，不建议整页重复堆叠。

**原作技术与操作**：Three.js / TSL / 体积效果；观看原作持续播放。

[原作者说明／来源](https://tympanus.net/codrops/2025/03/10/rendering-a-procedural-vortex-inside-a-glass-sphere-with-three-js-and-tsl/) · [打开原作](https://tympanus.net/Tutorials/VortexGlassSphere/)

### 25 · 可探索的三维簇状物体

作者：Francesco Michelini。

**品牌首页与发布 / 首屏主视觉**：强调聚合或模块关系的交互主视觉。通过一个聚合体表现复杂部分如何形成整体。

**借鉴价值（策展分析）**：三维簇状结构提供体积、遮挡与局部响应，适合研究整体结构而不是复制常见图标。

**审查重点**：观察局部操作对整体秩序的影响，以及旋转时的遮挡层次。

**使用限制**：不是信息图或数据事实的替代；低性能设备应降级展示。

**原作技术与操作**：Three.js / TSL；在原作内操作。

[原作者说明／来源](https://tympanus.net/Tutorials/3DCluster/) · [打开原作](https://tympanus.net/Tutorials/3DCluster/)

## 产品展示与讲解

怎样让产品特点更容易被理解？

### 05 · 同一物体的形态、材质与光照叙事

作者：Aleksei Kipin。

**产品展示与讲解 / 功能原理与卖点**：设计工具或材质产品的功能说明。通过同一对象的持续变化解释产品能力。

**产品展示与讲解 / 材质与局部细节**：材质与工艺对比。在一致视角下阅读表面差异。

**借鉴价值（策展分析）**：形态、表面与环境逐层进入，避免用互不相关的动画分散用户注意；首屏采用受指针控制的图像序列。

**审查重点**：比较各章节对象位置是否连续、材质变化是否易读，以及指针如何控制首屏。

**使用限制**：作者明确首屏含生成图像序列，不应标成全部实时物理渲染；音乐默认不启用。

**原作技术与操作**：图像序列 / Three.js / 分章节叙事；移动鼠标并滚动。

[原作者说明／来源](https://tympanus.net/codrops/2026/09/13/building-depth-designing-and-developing-a-3d-renderer-inside-figma/) · [打开原作](https://depth.fyi/)

### 06 · 曲面产品墙与聚焦选型

作者：Matt Greenberg。

**产品展示与讲解 / 产品陈列与选型**：设计品牌系列产品选择页。从产品总览自然聚焦到单个对象。

**借鉴价值（策展分析）**：曲面排列、全息选中表面和阻尼相机形成完整浏览体验，而不是通用吸附轮播。

**审查重点**：观察选中与退出时相机、图像和文字的配合，以及快速切换的中断处理。

**使用限制**：产品照片、商标属于原素材权利方；大目录必须验证加载和可访问列表。

**原作技术与操作**：R3F / GLSL / 阻尼相机；移动鼠标、选择产品。

[原作者说明／来源](https://tympanus.net/codrops/2026/02/24/from-flat-to-spatial-creating-a-3d-product-grid-with-react-three-fiber/) · [打开原作](https://shoe-finder-wine.vercel.app/)

### 07 · 实体与透视结构的流体显露

作者：Cullen Webber。

**产品展示与讲解 / 材质与局部细节**：产品内部结构与外壳对照。把表面与内部结构保持在同一空间坐标中展示。

**产品展示与讲解 / 功能原理与卖点**：结构原理讲解。在原位展示被遮挡的组成部分。

**借鉴价值（策展分析）**：流动遮罩连接实体和透视两套场景，移动后的痕迹有扩散和消退，不是硬边圆形放大镜。

**审查重点**：移动后停下，观察显露边界、内部结构对齐和自然恢复。

**使用限制**：需维护两套场景与额外渲染；不能用于会被误认为真实医学影像的展示。

**原作技术与操作**：Three.js / TSL / 流体反馈；实时移动鼠标。

[原作者说明／来源](https://tympanus.net/codrops/2026/03/23/building-a-dual-scene-fluid-x-ray-reveal-effect-in-three-js/) · [打开原作](https://tympanus.net/Tutorials/SkeletonFluidReveal/)

### 09 · 柔性实体落下与压缩回弹

作者：Joshua Guo。

**产品展示与讲解 / 材质与局部细节**：柔性材料或触感产品的微型展示。让压缩、褶皱和落地表现真实的柔软感。

**借鉴价值（策展分析）**：价值在布料体积变化、接触阴影和落地节奏，不在按钮功能本身。

**审查重点**：重播时观察体积是否保持、表面褶皱与落地阴影是否相互解释。

**使用限制**：作者采用烘焙模拟后在浏览器重播，不是任意实时物理；不宜作为普通表单按钮。

**原作技术与操作**：Blender / 形态键 / Three.js；点击原作重播。

[原作者说明／来源](https://tympanus.net/codrops/2025/08/20/exporting-a-cloth-simulation-from-blender-to-an-interactive-three-js-scene/) · [打开原作](https://tympanus.net/Tutorials/BalloonButton/)

## 作品集与案例

怎样浏览作品并顺畅进入案例？

### 04 · 液态玻璃球面视频陈列

作者：Shader / Filip Kantedal。

**作品集与案例 / 作品总览与空间排列**：影像工作室作品总览。让大量视觉作品处于一个连续、可探索的空间。

**产品展示与讲解 / 产品陈列与选型**：系列产品陈列。以空间与材质组织一组展示对象。

**借鉴价值（策展分析）**：玻璃边缘、视频折射、球面深度和柔性回弹共同建立材质与空间关系。

**审查重点**：拖动时观察边缘弯曲、中心与外围的比例，以及停止后的收束。

**使用限制**：原作依赖 WebGPU 和视频资源；低性能设备需要普通目录替代。

**原作技术与操作**：Three.js / WebGPU / TSL / XPBD；在原作内拖拽。

[原作者说明／来源](https://tympanus.net/codrops/2026/09/08/building-an-infinite-liquid-glass-grid-with-three-js-webgpu-and-tsl/) · [打开原作](https://infinite-jelly-glass.shader.se/)

### 18 · 滚动中连续显露的 WebGL 图像

作者：Yuri Artiukh。

**作品集与案例 / 图片探索与预览**：摄影、艺术作品目录。让图像显露过程与浏览节奏形成联系。

**借鉴价值（策展分析）**：借鉴图像进入视野时的遮罩、变形和内容阅读关系，不把整张卡片淡入当作设计。

**审查重点**：在不同滚动速度下观察图像形态、边界和最终稳定状态。

**使用限制**：图像加载失败必须有替代；变形不应损伤需要审查的作品信息。

**原作技术与操作**：React Three Fiber / WebGL；在原作内滚动。

[原作者说明／来源](https://tympanus.net/Development/RevealingWebGLImages/) · [打开原作](https://tympanus.net/Development/RevealingWebGLImages/)

### 19 · 滚动显露与跨页连续的作品集

作者：Chakib Mazouni。

**作品集与案例 / 缩略图到案例的衔接**：从作品总览进入项目详情。让跨页导航继承当前图像的视觉关系。

**借鉴价值（策展分析）**：把滚动显露、WebGL 画面和路由转场组织成同一套体验，不是独立像素遮罩。

**审查重点**：选择作品、返回列表，观察图像位置和滚动上下文是否连续。

**使用限制**：导航机制需接入实际路由、返回行为与资源清理；原作不是通用组件包。

**原作技术与操作**：Astro / Barba.js / Three.js / GSAP；滚动并点击原作项目。

[原作者说明／来源](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) · [打开原作](https://pixelimageeffect.pages.dev/)

### 20 · 保持画布连续的 WebGPU 跨页转场

作者：Ben Paine。

**作品集与案例 / 缩略图到案例的衔接**：视觉导向网站的页面切换。在路由切换时保留连续的图形场景。

**借鉴价值（策展分析）**：重点是跨页持续存在的画布与页面内容交接，不把页面切换拆成互不相关的动画。

**审查重点**：在多次往返与中途再次点击时观察转场状态是否收敛。

**使用限制**：需独立验证历史记录、取消、加载失败和 WebGPU 降级。

**原作技术与操作**：WebGPU / Vanilla JavaScript / 路由衔接；点击原作导航。

[原作者说明／来源](https://tympanus.net/codrops/2026/06/30/building-persistent-page-transitions-with-webgpu-and-vanilla-javascript/) · [打开原作](https://page-transitions-with-webgpu-vanilla-js.crnacura.workers.dev/)

### 21 · 网格图像到完整案例的形态接续

作者：Gwen Bogaert。

**作品集与案例 / 缩略图到案例的衔接**：缩略作品进入详情。将被选择的图像变成下一层内容的视觉锚点。

**借鉴价值（策展分析）**：原位图像与周边网格共同退让，建立明确的前后层级，而不是普通弹窗。

**审查重点**：关注展开起点、剩余作品的退出方向和关闭后的回位。

**使用限制**：此条以图像进入案例的整体转场为参考，不等同于通用布局组件；实际接入需验证焦点与返回位置。

**原作技术与操作**：GSAP / Grid-to-detail；点击原作图像。

[原作者说明／来源](https://tympanus.net/Tutorials/GridToFullPreview/) · [打开原作](https://tympanus.net/Tutorials/GridToFullPreview/)

### 23 · 缩略卡组沿弧线流向主画面

作者：Iqbal Muthahhary。

**作品集与案例 / 系列作品连续浏览**：从叠放图像进入一组精选作品。让卡组、图带和主图之间有明确连续关系。

**借鉴价值（策展分析）**：弯曲轨迹与错峰次序组织整体动势，强调图像集合在不同布局之间的连续迁移。

**审查重点**：观察各卡片的相对间隔、转向和主图建立焦点的时间。

**使用限制**：作者明确这是动作研究，画廊功能不完整；不得当成已经完成的生产轮播。

**原作技术与操作**：GSAP / MotionPath；操作原作查看转场。

[原作者说明／来源](https://tympanus.net/codrops/2026/06/04/creating-a-thumbnail-flow-animation-with-gsap-motionpath/) · [打开原作](https://tympanus.net/Tutorials/MotionPathTransition/index3.html)

### 24 · 带延迟弹性的图像网格编排

作者：Manoela Ilic。

**作品集与案例 / 作品总览与空间排列**：节奏鲜明的视觉作品集。通过有控制的滞后让网格具有整体弹性。

**借鉴价值（策展分析）**：作品的相互关系与不同滞后量形成弹性结构，不是普通列表逐项浮动。

**审查重点**：快速滚动后停住，观察各行怎样回到清晰有序的位置。

**使用限制**：图片内容必须保持可识别；高频生产列表不适合这种持续跟随。

**原作技术与操作**：GSAP / ScrollSmoother / Lag；在原作内滚动。

[原作者说明／来源](https://tympanus.net/codrops/2025/06/03/elastic-grid-scroll-creating-lag-based-layout-animations-with-gsap-scrollsmoother/) · [打开原作](https://tympanus.net/Tutorials/ElasticGridScroll/)

### 26 · 分层图像的几何剪裁转场

作者：Manoela Ilic。

**作品集与案例 / 系列作品连续浏览**：摄影系列或视觉方案切换。让整幅画面以有序层次进入和退出。

**借鉴价值（策展分析）**：借鉴多层图像的空间关系、遮罩方向与时间差；六个示例作为同一组研究，不重复计数。

**审查重点**：选择不同版本，比较层与层的时间关系，而不是只看遮罩形状。

**使用限制**：原作各版本不是六个独立收录项；需检查图像内容不被无意义裁掉。

**原作技术与操作**：Clip-path / 分层编排；操作原作版本与转场。

[原作者说明／来源](https://tympanus.net/Development/LayersAnimation/) · [打开原作](https://tympanus.net/Development/LayersAnimation/)

### 29 · 小预览到画廊再到全屏的连续过渡

作者：Manoela Ilic。

**作品集与案例 / 缩略图到案例的衔接**：文字目录的渐进式作品查看。在不突然切换上下文的前提下逐层放大信息。

**借鉴价值（策展分析）**：同一张缩略图依次承担提示、画廊主图和全屏图的角色，边线也参与迁移。

**审查重点**：连续完成悬停、点击、再次放大，观察图像身份与导航位置。

**使用限制**：作者明确画廊导航未完整实现；价值在三层过渡，不是通用 tooltip 功能。

**原作技术与操作**：GSAP Flip / 共享元素；悬停后点击原作。

[原作者说明／来源](https://tympanus.net/codrops/2022/12/07/tooltip-to-gallery-page-transition/) · [打开原作](https://tympanus.net/Development/TooltipTransition/)

## 阅读与内容叙事

怎样让文字、图像和数据共同讲述？

### 11 · 双向文字波的滚动编排

作者：Valentin Descombes。

**阅读与内容叙事 / 标题与图文编排**：专题章节开头与短标题。在可读的文字顺序中建立富有张力的入场节奏。

**借鉴价值（策展分析）**：两组相反或错开的运动围绕排版组织，不是常规逐字淡入。

**审查重点**：慢速和反向滚动，检查文字何时读得清、两条波如何交接。

**使用限制**：仅适合短标题；长正文不要继承持续变形。

**原作技术与操作**：GSAP / 文字分组 / 滚动进度；在原作内滚动。

[原作者说明／来源](https://tympanus.net/codrops/2026/01/15/building-a-scroll-driven-dual-wave-text-animation-with-gsap/) · [打开原作](https://tympanus.net/Tutorials/DualWaveTextAnimation/)

### 12 · 文字之间展开的图像叙事

作者：Manoela Ilic。

**阅读与内容叙事 / 标题与图文编排**：编辑型首页与图文专题标题。让图像在文字结构内部生长，而不是插入独立图片区块。

**品牌首页与发布 / 首屏主视觉**：文化或艺术品牌首屏。让图像与品牌语句形成整体。

**借鉴价值（策展分析）**：图像展开和字间空间一起变化，排版参与转场而非做静态字幕。

**审查重点**：关注展开前后的行长、图像比例，以及文字被挤开后是否仍成句。

**使用限制**：需要为中文分词、换行和不同屏宽单独调整，不能直接照搬拉丁排版。

**原作技术与操作**：GSAP / 图文布局；在原作内滚动。

[原作者说明／来源](https://tympanus.net/Development/ImageExpansionTypography/) · [打开原作](https://tympanus.net/Development/ImageExpansionTypography/)

### 13 · 柱面排字与三维阅读节奏

作者：David Faure。

**阅读与内容叙事 / 标题与图文编排**：人物名单、栏目或演出阵容。将纵向列表转成可旋转的文字空间。

**借鉴价值（策展分析）**：文字构成三维表面并随滚动改变可见顺序；重点是透视、节奏与前景可读性。

**审查重点**：观察正面焦点是否明确、背面文字是否造成重影、反向滚动能否定位。

**使用限制**：不替代长名单的普通列表；移动端字体尺寸和可访问文本需保留。

**原作技术与操作**：CSS 3D / GSAP；在原作内滚动。

[原作者说明／来源](https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/) · [打开原作](https://tympanus.net/Tutorials/3DTextScroll/)

### 22 · 随阅读推进重组的编辑版式

作者：Manoela Ilic。

**阅读与内容叙事 / 章节推进与阅读定位**：长专题的图文段落交接。让页面版式本身成为叙事节奏的一部分。

**借鉴价值（策展分析）**：不同图片组和文字关系随滚动重组，适合学习留白、密度变化和章节分界。

**审查重点**：比较各阶段的主次内容、图片比例和停留长度。

**使用限制**：需要完整内容才能调节节奏；不要让核心文字只在短暂动画区间出现。

**原作技术与操作**：GSAP / Scroll-based layout；在原作内滚动。

[原作者说明／来源](https://tympanus.net/Development/ScrollBasedLayoutAnimations/) · [打开原作](https://tympanus.net/Development/ScrollBasedLayoutAnimations/)

### 28 · 正文词语迁移成图像导航

作者：Manoela Ilic；概念参考 Matthew Hall。

**阅读与内容叙事 / 标题与图文编排**：词语导向的专题索引。从阅读正文自然切换到一个相关图像集合。

**作品集与案例 / 图片探索与预览**：文本作品目录。由描述词进入视觉作品。

**借鉴价值（策展分析）**：被点中的词语保留身份并进入菜单结构，其他文字有方向地退出。

**审查重点**：点击正文链接，检查词语迁移与图像进入是否构成同一个动作。

**使用限制**：需要为中文换行与词组边界重做；本条不是普通链接悬停图片。

**原作技术与操作**：GSAP / 排版重组；点击原作词语。

[原作者说明／来源](https://tympanus.net/codrops/2021/06/23/inline-to-menu-link-animation/) · [打开原作](https://tympanus.net/Development/InlineToMenuLink/)

## 应用与创作工作台

怎样让高频操作既清楚又有质感？

### 27 · 圆角导航与背景揭幕的联动

作者：Codrops / Manoela Ilic。

**应用与创作工作台 / 全局导航与空间切换**：品牌型应用或内容站主导航。让导航展开成为空间切换而非盖一块面板。

**品牌首页与发布 / 开场与揭幕**：编辑型品牌入口。以导航动作揭示品牌画面。

**借鉴价值（策展分析）**：菜单容器扩张与背景反向揭示共同构成转场，重点是两者的协调。

**审查重点**：观察菜单开始与结束时的背景关系、焦点位置和退出路径。

**使用限制**：这是导航转场研究，不是普通菜单收录；生产需补齐键盘焦点与实际链接。

**原作技术与操作**：GSAP / CSS / 圆角空间过渡；点击原作导航。

[原作者说明／来源](https://github.com/codrops/ExpandingRoundedMenu/) · [打开原作](https://tympanus.net/Development/ExpandingRoundedMenu/)

### 30 · 图像网格流动构成导航节奏

作者：Manoela Ilic。

**应用与创作工作台 / 全局导航与空间切换**：视觉栏目或作品频道入口。把导航选择与新一组图像的到来组织成整体。

**借鉴价值（策展分析）**：导航、图像网格与载入编排共同构成节奏，不是普通网格显示。

**审查重点**：观察频道切换时图像的进入方向、密度和最终落位。

**使用限制**：不应让用户为高频功能等待完整演出；必须有可取消或缩短的路径。

**原作技术与操作**：GSAP / Grid navigation；点击原作栏目。

[原作者说明／来源](https://tympanus.net/codrops/2023/07/27/grid-flow-animation/) · [打开原作](https://tympanus.net/Development/GridFlowEffect/)

## 真实性与许可

来源文字核实、原作画面验证、外层预览兼容、实际生产组件、用户批准分别记录。当前没有把外部页面框架加载成功标成真实动效验收。外部站点可能拒绝嵌入、需要交互启动或依赖WebGPU；独立原作入口始终保留，不要求关闭浏览器安全设置。代码、图片、字体、视频和模型的许可需分别核实；本包只提供索引与浏览界面，不打包原作素材。私人审查备注只在当前浏览器或用户主动导出的私人审查JSON中，未预置进本文件。
