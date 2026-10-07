# 保持画布连续的 WebGPU 跨页转场：本地实现

## 原作者源码
仓库：https://github.com/bnpne/page-transitions-with-webgpu-vanilla-js
锁定提交：70e5c0eafb14cd1fdf02aef0799ba486dead46dc
入口：source/src/index.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
仅将该SPA路由写入当前run文档的URL片段；保持资源基址、画布生命周期与不透明沙箱。
需独立验证历史记录、取消、加载失败和 WebGPU 降级。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/index.js（original_source）
- adapter/src/controller.js（local_adapter）
- adapter/src/gpu.js（local_adapter）
- adapter/src/pages/home.js（local_adapter）
- source/src/carousel.js（original_source）
- source/src/controller.js（original_source）
- source/src/cursor.js（original_source）
- source/src/gpu.js（original_source）
- source/src/pages/home.js（original_source）
- source/src/pages/index-page.js（original_source）
- source/src/pages/inner.js（original_source）
- source/src/preloader.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
页面内容变化时图形画布持续存在，图像顺序与导航状态共同完成转场。
替换真实路由时保留画布生命周期、历史记录和取消路径；本地运行仍需相应图形能力。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=9b3023082fcdff90。视频没有取代源码。
