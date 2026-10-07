# 双向文字波的滚动编排：本地实现

## 原作者源码
仓库：https://github.com/ValentinDBS/codrops-tutorial-text-animation
锁定提交：90dfeb2eec89dd6879cabf2e76f4e7096e515a8a
入口：source/src/main.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
仅适合短标题；长正文不要继承持续变形。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.js（original_source）
- source/src/dual-wave/DualWaveAnimation.js（original_source）
- source/src/utils.js（original_source）
- source/vite.config.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
两列文字相向或错相运动，文字清晰区与中央图像共同形成阅读焦点。
短标题分组后调整错相和可读时间；中文需要重新处理分词与行长。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=d2b499f36a6c4f0c。视频没有取代源码。
