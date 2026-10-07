# 滚动显露与跨页连续的作品集：本地实现

## 原作者源码
仓库：https://github.com/J0SUKE/gsap-threejs-codrops
锁定提交：f236f2a7805e15600a59aeba0ad70ac25ef69b1f
入口：source/src/app/main.ts

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
导航机制需接入实际路由、返回行为与资源清理；原作不是通用组件包。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/app/main.ts（original_source）
- adapter/src/app/main.ts（local_adapter）
- source/astro.config.mjs（original_source）
- source/src/app/components/canvas.ts（original_source）
- source/src/app/components/media.ts（original_source）
- source/src/app/components/scroll.ts（original_source）
- source/src/app/components/text-animation.ts（original_source）
- source/src/app/types/types.ts（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
列表图像和详情之间保留视觉关联，滚动显露与路由交接复用同一个图形环境。
迁移时同时检查进入、返回、快速切换与加载失败，不把单次入场动画当作完整路由系统。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=54ff3fdc942fa76d。视频没有取代源码。
