# 沿真实轮廓选字的 ASCII 实体：本地实现

## 原作者源码
仓库：https://github.com/edoardolunardi/ascii-logo
锁定提交：75ab3a67b3a30c16d00deadad17cfb8a8e342eed
入口：source/src/main.js

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
高密度字符不适合正文；品牌图形与字库的实际许可另查。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/main.js（original_source）
- source/eslint.config.js（original_source）
- source/prettier.config.js（original_source）
- source/src/ascii-logo/element.js（original_source）
- source/src/ascii-logo/glyph-atlas.js（original_source）
- source/src/ascii-logo/mark.js（original_source）
- source/src/ascii-logo/renderer.js（original_source）
- source/src/ascii-logo/samples.js（original_source）
- source/vite.config.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
字形匹配不仅表达亮度，还用于保住实体轮廓和倾斜边缘。
调整字符密度、对比度与模型尺寸；小尺寸必须看得见整体对象，不只剩字符噪点。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=051454d34b6f999c。视频没有取代源码。
