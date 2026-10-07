# 反应扩散的生长型材质：本地实现

## 原作者源码
仓库：https://github.com/robert-leitl/webgpu-reaction-diffusion
锁定提交：e331a2ca38c59f686f8b45a42590895bfd054aa4
入口：source/js/main.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
原作要求 WebGPU；正式产品需静态或视频替代，不强迫用户更改浏览器安全设置。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/main.js（original_source）
- adapter/js/main.js（local_adapter）
- source/js/composite.js（original_source）
- source/js/libs/float16.js（original_source）
- source/js/libs/webgpu-utils.module.js（original_source）
- source/js/rd-compute.js（original_source）
- source/js/shader/composite-shader.js（original_source）
- source/js/shader/rd-compute-shader.js（original_source）
- source/performance-comparison/js/composite.js（original_source）
- source/performance-comparison/js/libs/float16.js（original_source）
- source/performance-comparison/js/libs/webgpu-utils.module.js（original_source）
- source/performance-comparison/js/main.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
局部变化通过计算步骤传播，生长型纹理有连续的结构演化。
调整反应扩散参数时保留稳定步长与边界处理；生产需明确WebGPU要求与替代画面。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=2e1abf071b3aa30b。视频没有取代源码。
