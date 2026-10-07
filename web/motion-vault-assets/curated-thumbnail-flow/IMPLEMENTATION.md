# 缩略卡组沿弧线流向主画面：本地实现

## 原作者源码
仓库：https://github.com/Ibaliqbal/codrops-motion-path-transition
锁定提交：a3b1973ad2aec608c8cfb3bf37ec8ea68f286086
入口：source/js/imagesloaded.pkgd.min.js、source/js/MotionPathPlugin.js、source/js/script3.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
作者明确这是动作研究，画廊功能不完整；不得当成已经完成的生产轮播。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/imagesloaded.pkgd.min.js（original_source）
- source/js/MotionPathPlugin.js（original_source）
- source/js/script3.js（original_source）
- source/js/script.js（original_source）
- source/js/script2.js（original_source）
- source/js/script4.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
多张缩略图沿有组织的路径依次迁移，错峰间距与主画面出现形成整体动作。
保留路径和卡片先后关系，实际轮播、选中与返回需按业务补齐；本地接入原作第三个演示。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=6f5cec0e4b516921。视频没有取代源码。
