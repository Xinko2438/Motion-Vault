# 柔性实体落下与压缩回弹：本地实现

## 原作者源码
仓库：https://github.com/codrops/BalloonButton
锁定提交：db03bdc8ce88cb64446b9366c60f0803f2235506
入口：source/src/main.tsx

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
作者采用烘焙模拟后在浏览器重播，不是任意实时物理；不宜作为普通表单按钮。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.tsx（original_source）
- adapter/src/App.tsx（local_adapter）
- source/eslint.config.js（original_source）
- source/src/App.tsx（original_source）
- source/src/vite-env.d.ts（original_source）
- source/vite.config.ts（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
烘焙形态变化让实体具备压缩、褶皱与回弹，接触阴影帮助判断体积。
替换形态键模型或重新烘焙动作；它不是实时布料求解器，不应把参数写成可任意模拟。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=d6fa10001d30108c。视频没有取代源码。
