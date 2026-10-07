# 风格化水面与场景光感：本地实现

## 原作者源码
仓库：https://github.com/thaslle/stylized-water
锁定提交：76a335f75dcccac0785ce9d84c914328bd3a1ea0
入口：source/src/main.jsx

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
需在真实浏览器中判断 GPU 负担；不得让背景持续干扰正文。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.jsx（original_source）
- adapter/src/components/Experience.jsx（local_adapter）
- adapter/src/components/Rocks/index.jsx（local_adapter）
- adapter/src/components/Terrain/index.jsx（local_adapter）
- source/eslint.config.js（original_source）
- source/src/App.jsx（original_source）
- source/src/components/Audio.jsx（original_source）
- source/src/components/Experience.jsx（original_source）
- source/src/components/Rocks/index.jsx（original_source）
- source/src/components/Scene/index.jsx（original_source）
- source/src/components/Terrain/index.jsx（original_source）
- source/src/components/Water/index.jsx（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
水的色阶、波纹、岸边泡沫与地形在同一个明暗系统中工作。
先匹配场景整体颜色和光照，再微调波幅和泡沫；不要把水面直接当作无关页面背景。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=95b6aed8a71b31d1。视频没有取代源码。
