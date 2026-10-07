# 文字之间展开的图像叙事：本地实现

## 原作者源码
仓库：https://github.com/codrops/ImageExpansionTypography
锁定提交：0d614791f94198bcab655762b26a3cb85da851f4
入口：source/js/imagesloaded.pkgd.min.js、source/js/lenis.js、source/js/smoothscroll.js、source/js/index.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
需要为中文分词、换行和不同屏宽单独调整，不能直接照搬拉丁排版。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/imagesloaded.pkgd.min.js（original_source）
- source/js/lenis.js（original_source）
- source/js/smoothscroll.js（original_source）
- source/js/index.js（original_source）
- source/js/effect-1/expandImageEffect.js（original_source）
- source/js/effect-2/expandImageEffect.js（original_source）
- source/js/effect-3/expandImageEffect.js（original_source）
- source/js/effect-4/expandImageEffect.js（original_source）
- source/js/effect-5/expandImageEffect.js（original_source）
- source/js/utils.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
图片在字间空间里展开，文字本身让出位置，图像和句子不是互不相关的两块。
换内容时先验证起止排版，再调滚动区间；图像不能在最终状态破坏句子可读性。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=ce1e54030c2531a7。视频没有取代源码。
