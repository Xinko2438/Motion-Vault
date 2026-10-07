# 分层图像的几何剪裁转场 · 源码接入

运行入口：run/index.html。原始源码保留在source/，提交锁定在upstream.json。修改对应源码后重新运行本项目src/hybrid/adapt-upstream.mjs构建，不直接编辑生成的effect.js。

## 核心文件

- source/css/base.css (8d59f1ff3e5a)
- source/js/content.js (f2be9bf0db7e)
- source/js/demo1/index.js (c4be35f13557)
- source/js/demo2/index.js (06fd19ca0a94)
- source/js/demo3/index.js (755cf74983b1)
- source/js/demo4/index.js (17bf60d9f6be)
- source/js/demo5/index.js (8e60bea762ed)
- source/js/demo6/index.js (48060139bf96)
- source/js/gsap.min.js (efc85c7eb141)
- source/js/imagesloaded.pkgd.min.js (86dacb15f649)
- source/js/item.js (9f85cb2a5e83)
- source/js/utils.js (73dd43840366)

## 本地依赖

GSAP3.11.5、Flip同版本、imagesLoaded5.0.0、Splitting1.0.6。版本与下载字节哈希在../vendor/manifest.json。未执行上游安装脚本，未复制字体文件。

## 接口与限制

SourceDemo.stop()/resume()控制本地时间线；原作事件入口保持原样。需要状态重置时重新载入本地run/index.html。封面与短片仅从本地这个版本采集，不标成未修改的原站录屏。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/js/content.js（original_source）
- source/js/demo1/index.js（original_source）
- source/js/demo2/index.js（original_source）
- source/js/demo3/index.js（original_source）
- source/js/demo4/index.js（original_source）
- source/js/demo5/index.js（original_source）
- source/js/demo6/index.js（original_source）
- source/js/gsap.min.js（original_source）
- source/js/imagesloaded.pkgd.min.js（original_source）
- source/js/item.js（original_source）
- source/js/utils.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
分层图像的遮罩方向和时间差形成连续的切换，不只是整图淡入淡出。
保留前后图层的遮挡与方向关系，替换素材后检查主体没有被错误裁切。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=1c7c7d9678d65125。视频没有取代源码。
