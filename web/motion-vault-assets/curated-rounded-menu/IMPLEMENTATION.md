# 圆角导航与背景揭幕的联动 · 源码接入

运行入口：run/index.html。原始源码保留在source/，提交锁定在upstream.json。修改对应源码后重新运行本项目src/hybrid/adapt-upstream.mjs构建，不直接编辑生成的effect.js。

## 核心文件

- source/src/css/base.css (2fef4d740679)
- source/src/js/index.js (debad0afff1a)

## 本地依赖

GSAP3.11.5、Flip同版本、imagesLoaded5.0.0、Splitting1.0.6。版本与下载字节哈希在../vendor/manifest.json。未执行上游安装脚本，未复制字体文件。

## 接口与限制

SourceDemo.stop()/resume()控制本地时间线；原作事件入口保持原样。需要状态重置时重新载入本地run/index.html。封面与短片仅从本地这个版本采集，不标成未修改的原站录屏。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/src/js/index.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
圆角导航容器扩大时，背景以互补方向揭幕，两者一起表达空间变化。
迁移到高频应用要缩短等待并补真实链接、焦点和退出；不是把演示菜单原样塞进业务。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=ecb280e1c8cd2b35。视频没有取代源码。
