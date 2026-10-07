# 实体与透视结构的流体显露：本地实现

## 原作者源码
仓库：https://github.com/cullenwebber/three-skull
锁定提交：985eb741ecff1d0a0c575a1df92d464b44c3c26d
入口：source/src/main.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
需维护两套场景与额外渲染；不能用于会被误认为真实医学影像的展示。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.js（original_source）
- adapter/src/scenes/Scene.js（local_adapter）
- source/src/core/Three.js（original_source）
- source/src/core/WebGLContext.js（original_source）
- source/src/materials/fresnelMaterial.js（original_source）
- source/src/postprocessing/FluidSim.js（original_source）
- source/src/postprocessing/PostProcessing.js（original_source）
- source/src/scenes/Scene.js（original_source）
- source/src/utils/CameraRig.js（original_source）
- source/src/utils/FullscreenQuad.js（original_source）
- source/src/utils/ImportGltf.js（original_source）
- source/src/utils/InstancedModel.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
两套场景共用相机和对象位置，流动遮罩显露内部结构，并在移动后扩散消退。
替换模型必须保持两套场景的对齐；调整显露半径、流体衰减和内部外观，不能把它表述成真实医学成像。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=32120f3862e59169。视频没有取代源码。
