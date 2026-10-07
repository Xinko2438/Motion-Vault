# 玻璃球中的体积漩涡：本地实现

## 原作者源码
仓库：https://github.com/MisterPrada/vortex-glass-sphere
锁定提交：3587870c1d699ef8adcc73f1441800b45d71e3a5
入口：source/src/script.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
原作依赖较重的图形能力；适合一个主视觉，不建议整页重复堆叠。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/script.js（original_source）
- adapter/src/Experience/Sources.js（local_adapter）
- source/src/Experience/Experience.js（original_source）
- source/src/Experience/Materials/GridMaterial.js（original_source）
- source/src/Experience/Materials/Materials.js（original_source）
- source/src/Experience/Renderer.js（original_source）
- source/src/Experience/Sources.js（original_source）
- source/src/Experience/State.js（original_source）
- source/src/Experience/TSL/fbm.js（original_source）
- source/src/Experience/Ui/Ui.js（original_source）
- source/src/Experience/Utils/Debug.js（original_source）
- source/src/Experience/Utils/ElastickNumner.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
外部球体建立边界，内部体积漩涡提供方向和纵深，让复杂运动受一个轮廓约束。
优先控制发光、密度和内部旋转，背景保持安静；不要在长页面重复建立多个完整场景。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=d5c74e6bd34a1883。视频没有取代源码。
