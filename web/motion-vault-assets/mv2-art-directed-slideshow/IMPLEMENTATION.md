# 图像与遮罩共同编排的全屏换幕 · 原作者源码接入

真实入口：run/index.html。可读入口：run/effect.js。source/ 为固定提交 8f9ee4001e0c786ec617f7f729272c4d5a0830a2 的原作者源码；source-map.json 指向原始模块。作者变体作为一个素材家族保留，不拆分膨胀数量。

## 运行与输入
通过原 Motion Vault 的 allow-scripts 隔离 iframe 运行，保持无 allow-same-origin；纹理请求只走原资源代理并限于本资产 run 清单。原生scroll事件和原作时间线仍控制效果；生命周期接口只用于暂停/清理，不伪造用户输入。

## 重建
依赖锁在 adapter/package-lock.json（使用 npm 运行时依赖的条目）以及 dependency-lock.json。可用已安装的 esbuild 0.25.10 执行 adapter/rebuild.mjs；设置 MOTION_VAULT_ESBUILD 指向已安装的 esbuild 包可使用现有工具链。若本项有 adapter/package.json，修改源码前使用 npm ci --prefix adapter --ignore-scripts 安装固定依赖。此操作不是运行上游 Parcel/Vite 配置或脚本。

## 已检查与未检查
原源文件 Git blob 对照、JavaScript 编译/语法、运行资源定位及清单哈希为静态证据。浏览器/GPU、原生指针、跨边界松手、减少动态效果和真实视觉尚未验收。

原仓图像归属保留在 source/README.md；素材用于此设计研究，不把仓库代码 MIT 当作所有照片/人物/商标的产品复用授权。
