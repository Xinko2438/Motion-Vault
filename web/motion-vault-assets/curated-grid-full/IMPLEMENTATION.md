# 网格图像到完整案例的形态接续：本地实现

## 原作者源码
仓库：https://github.com/gwen-bo/codrops-grid-to-preview
锁定提交：1027ebb60e38cbb4e7ee7d10ef045b5627a035c2
入口：source/src/js/main.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
此条以图像进入案例的整体转场为参考，不等同于通用布局组件；实际接入需验证焦点与返回位置。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/js/main.js（original_source）
- source/src/js/product-grid.js（original_source）
- source/src/js/product-preview.js（original_source）
- source/src/js/utils.js（original_source）
- source/vite.config.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
产品网格与原位放大的预览互相让位，使集合浏览和细节查看保持联系。
原作者交互由悬停触发，不是必须点击；更换产品比例时检查左右预览区域和快速移入移出。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=dcb9dea4d9f73cd3。视频没有取代源码。
