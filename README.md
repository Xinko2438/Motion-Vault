# Motion Vault

**面向前端工程与 AI Agent 的交互式 Web 动效、三维着色器（WebGL/Shader）与高保真界面设计参考库。**

![JavaScript](https://img.shields.io/badge/Engine-Vanilla%20JS%20%2B%20WebGL%20%2F%20Shaders-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Architecture](https://img.shields.io/badge/Sandbox-Isolated%20Live%20Runtime-2563eb?style=flat-square)
![Agent Ready](https://img.shields.io/badge/CLI-Structured%20Agent%20Query-0f766e?style=flat-square)

## 一、项目定位

在大模型辅助前端与视觉开发（Vibe Coding）中，仅靠自然语言描述“高级感”“流畅动效”往往会退化为千篇一律的模板样式。**Motion Vault** 将高水准的 Web 视觉与交互拆解为**可检索、可实时交互、可读取源码与可调参复用**的本地结构化资产库：
- **画廊层**负责高频视觉筛选与“视频预览 / 沙箱实时交互”双模体验；
- **资产层**保存每一项动效的设计拆解（`DESIGN.md`）、实现机制（`IMPLEMENTATION.md`）、可调参数（`parameters.json`）与独立运行源码；
- **Agent CLI 层**供本地 AI Agent 按业务场景（如品牌首屏、产品展示、作品集过渡、数据叙事）精准检索并按需读取核心代码片段，避免将数 MB 的打包产物直接塞入上下文。

## 二、核心机制与功能特性

### 1. 预览短片与沙箱实时交互双模切换
- **轻量预览模式**：鼠标悬停卡片即播放由本地真实代码录制的高帧率预览短片，移开即停，保证百张卡片同屏浏览时的低内存占用与零卡顿。
- **沙箱实时交互模式**：一键切换至实时运行态后，悬停或进入详情页即可直接在隔离沙箱中运行 WebGL / Three.js / CSS 动效，鼠标轨迹、拖拽与点击实时作用于画面；沙箱严格限制跨源访问与父页面存储读取。

### 2. 六大产品设计场景分类矩阵

| 一级场景 | 覆盖的核心设计任务 |
| --- | --- |
| **品牌首页与发布** | 首屏主视觉、动态标识与字形折射、背景流体材质、开场揭幕动效 |
| **产品展示与讲解** | 三维产品陈列、材质与光影细节、功能原理拆解、实时参数配置器 |
| **作品集与案例** | 球面/网格图像陈列、缩略图到详情的无缝过渡、连续横向画廊 |
| **阅读与内容叙事** | 滚动驱动（Scroll-driven）章节推进、图文视差编排、数据对比动效 |
| **应用与创作工作台** | 上下文悬浮工具栏、多层级面板过渡、画布直接操控反馈 |
| **关键流程与状态反馈** | 渐进式引导、骨架与加载过渡、状态确认与可逆操作反馈 |

### 3. 面向 AI Agent 的结构化检索 CLI

提供命令行查询入口，支持 Agent 按场景、状态与章节按需拉取设计规格与核心实现：

```bash
# 按场景检索已验证的动效资产
node scripts/query-vault.mjs search --scene product --task detail --json

# 按需读取指定资产的设计拆解、实现要点与源码映射（自动过滤巨型第三方 bundle）
node scripts/query-vault.mjs inspect online-lens --section all --json

# 运行资产完整性与沙箱隔离校验
node scripts/query-vault.mjs verify --scope candidates --json
```

## 三、工程目录结构

```text
Motion-Vault/
├── assets/design-assets/<id>/   # 单项动效资产包（DESIGN.md / IMPLEMENTATION.md / 源码 / 预览）
├── src/hybrid/                  # 单页画廊构建器、状态管理与沙箱生命周期控制器
├── scripts/                     # Agent 检索 CLI（query-vault.mjs）、发布与回归验证脚本
├── tests/                       # 画廊状态流转、悬停意图识别与隔离沙箱自动化测试
└── references/                  # 场景分类索引与资产参数规范
```
