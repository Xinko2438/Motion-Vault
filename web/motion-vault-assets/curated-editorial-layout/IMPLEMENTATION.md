# 随阅读推进重组的编辑版式：本地实现

## 原作者源码
仓库：https://github.com/codrops/ScrollBasedLayoutAnimations
锁定提交：ade47c56f8f2f756e7e6df8e578407690b2fb782
入口：source/js/lenis.min.js、source/js/imagesloaded.pkgd.min.js、source/js/index.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
需要完整内容才能调节节奏；不要让核心文字只在短暂动画区间出现。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/lenis.min.js（original_source）
- source/js/imagesloaded.pkgd.min.js（original_source）
- source/js/index.js（original_source）
- source/js/utils.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
图像组的密度、比例和位置随章节变化，让版式本身参与叙事。
先确定真实内容节奏再修改滚动区段，不应让重要文字只在短暂运动中可见。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=e6f8e18b6e38482c。视频没有取代源码。
