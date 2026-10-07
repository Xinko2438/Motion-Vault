# 带延迟弹性的图像网格编排：本地实现

## 原作者源码
仓库：https://github.com/codrops/ElasticGridScroll
锁定提交：40e474582ae72df26cd9d90b05d5b15fed423abd
入口：source/js/demo1/index.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
图片内容必须保持可识别；高频生产列表不适合这种持续跟随。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/demo1/index.js（original_source）
- source/js/demo2/index.js（original_source）
- source/js/demo3/index.js（original_source）
- source/js/demo4/index.js（original_source）
- source/js/demo5/index.js（original_source）
- source/js/demo6/ElasticColumns.js（original_source）
- source/js/demo6/index.js（original_source）
- source/js/demo7/AccordionFold.js（original_source）
- source/js/demo7/index.js（original_source）
- source/js/demo8/ElasticTwist.js（original_source）
- source/js/demo8/index.js（original_source）
- source/js/demo9/Whirlpool.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
网格各列使用不同滞后量，滚动时有弹性，停止后重新归入秩序。
先调整列之间的相对延迟，再改图像大小；效果不适合强调快速精确定位的后台列表。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=7d9552c2cef9774b。视频没有取代源码。
