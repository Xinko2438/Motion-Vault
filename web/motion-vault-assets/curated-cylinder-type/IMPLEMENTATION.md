# 柱面排字与三维阅读节奏：本地实现

## 原作者源码
仓库：https://github.com/davidfaure/3d-text-animation-codrops
锁定提交：7a93ccea1ac1783f57acaeab978844ecee3e261d
入口：source/src/main.ts

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
不替代长名单的普通列表；移动端字体尺寸和可访问文本需保留。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.ts（original_source）
- source/src/circle/circle.ts（original_source）
- source/src/cylinder/cylinder.ts（original_source）
- source/src/tube/tube.ts（original_source）
- source/vite.config.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
名单围绕柱面排列，正面清晰、远端透视收敛，让滚动具有旋转空间感。
更换行数和字号必须同时调整半径、视角和滚动跨度，并保留可访问的普通文本。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=b5b3f948e71c4896。视频没有取代源码。
