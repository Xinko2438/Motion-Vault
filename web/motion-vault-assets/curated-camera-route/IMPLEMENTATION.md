# 沿场景路线推进的镜头叙事：本地实现

## 原作者源码
仓库：https://github.com/AndrewPrifer/CodropsCameraFlyThroughTutorial
锁定提交：59ba0f91938ae65315ac58e4dc5cd1ab783372e6
入口：source/src/main.jsx

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
不是所有页面都适合强镜头移动；移动端与减少动态效果需要降级。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.jsx（original_source）
- adapter/src/App.jsx（local_adapter）
- source/src/App.jsx（original_source）
- source/vite.config.ts（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
场景路线、镜头朝向和停留点共同决定叙事，不是简单直线前进。
编辑Theatre关键帧与环境模型；滚动来自内部ScrollControls，不是整个文档的scrollTop。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=c13b04d58ff390e8。视频没有取代源码。
