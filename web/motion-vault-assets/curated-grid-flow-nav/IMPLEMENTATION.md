# 图像网格流动构成导航节奏 · 源码接入

运行入口：run/index.html。原始源码保留在source/，提交锁定在upstream.json。修改对应源码后重新运行本项目src/hybrid/adapt-upstream.mjs构建，不直接编辑生成的effect.js。

## 核心文件

- source/css/base.css (f0b57bb8d6d2)
- source/js/Flip.min.js (d4a08d158eef)
- source/js/gallery.js (a68334fe1ddc)
- source/js/gsap.min.js (efc85c7eb141)
- source/js/imagesloaded.pkgd.min.js (86dacb15f649)
- source/js/index.js (4df65484fb2e)
- source/js/loader.js (1352eea403a5)
- source/js/navigation.js (9e3bf8615a92)
- source/js/utils.js (d44a787cac58)

## 本地依赖

GSAP3.11.5、Flip同版本、imagesLoaded5.0.0、Splitting1.0.6。版本与下载字节哈希在../vendor/manifest.json。未执行上游安装脚本，未复制字体文件。

## 接口与限制

SourceDemo.stop()/resume()控制本地时间线；原作事件入口保持原样。需要状态重置时重新载入本地run/index.html。封面与短片仅从本地这个版本采集，不标成未修改的原站录屏。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/Flip.min.js（original_source）
- source/js/gallery.js（original_source）
- source/js/gsap.min.js（original_source）
- source/js/imagesloaded.pkgd.min.js（original_source）
- source/js/index.js（original_source）
- source/js/loader.js（original_source）
- source/js/navigation.js（original_source）
- source/js/utils.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
频道选择与图像群的进入方向、密度变化和落位形成一个完整动作。
控制切换期间的中断和等待，不能只复用图像飞入而忽略导航状态。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=322ddb112513aa6c。视频没有取代源码。
