# Motion Vault

一个给本地 Agent 研究设计思路与实现的参考库。画廊负责快速浏览，背后的本地代码、设计拆解、来源和参数负责复用；视频不是资产本体。

## 当前入口

只使用一个稳定入口：`http://127.0.0.1:4380/app/assets/motion-vault.html`。不需要版本参数，也没有第二套画廊。

同一个页面内切换“正式”“预选”“已下架”，共用搜索、用途分类、卡片和详情。预选卡片可一键“提拔为正式”；正式卡片仍可随时“下架”，也可“移回预选”。下架不删除源码，“已下架”提供恢复到正式或预选的两种选择。原正式条目与新增条目使用同一套操作，状态自动保存，数量随操作更新。

原正式目录60项、新增目录30项均保留完整资产；两份目录只标记来源及初始分组。新增30项中26项来自作者源码适配、4项是明确标注的独立实现。只有用户主动提拔且保存成功，预选条目才进入当前浏览器的正式库；原60项同样可以移回预选。提拔不复制页面或素材，不改变作者、源码位置和稳定ID。

旧`motion-vault-candidates.html`仅保留最小跳转，转到同一页面的`?view=pending`状态，用于兼容已有书签；不再维护独立界面。实际发布与单页验收以`lineage/current/RESULT.md`为准。

## 浏览方式

近白底、紧凑三列、真实效果封面、简短图注。正式卡片含标题区域响应悬停，先展示实际变化；鼠标或拖拽类在真实操作时交回同一份本地代码。移开停止，不同时运行全部效果。

每张卡片下方的“预览 / 实时交互”开关控制卡片显示：预览模式中，新增卡片悬停播放对应本地实现生成的短片；实时交互模式中，悬停直接在卡片内运行本地网页，鼠标移动、hover、点击和拖拽作用于实际效果，不会被打开详情截走。模式会自动记住，且与审查记录分开。进入“详情”后，预览画面下方也有同样的两档开关，可以来回切换，同时查看设计说明、源码资料和来源差异。不会启动外部整站。

复杂三维、着色器和WebGPU场景按需启动。沙箱保留隔离，不能读取父页面、私人备注或浏览器存储；只允许获取该资产清单内的公开运行资源。设备图形能力不足时，封面和本地片段仍可审查，交互运行需要满足条目中的实际条件。

## 按实际用途查找

| 一级用途 | 具体设计任务 | 本轮新增数 |
|---|---|---:|
| 品牌首页与发布 | 首屏主视觉、动态标识与标题、背景材质与氛围、开场与揭幕 | 10 |
| 产品展示与讲解 | 产品陈列与选型、材质与局部细节、功能原理与卖点、参数调节与配置 | 5 |
| 作品集与案例 | 作品总览、图片探索、缩略图到案例的衔接、系列作品连续浏览 | 8 |
| 阅读与内容叙事 | 章节推进、标题与图文编排、数据解释与对比、音视频与连续阅读 | 5 |
| 应用与创作工作台 | 全局导航、上下文工具、面板层级、精细编辑与直接操控 | 2 |
| 关键流程与反馈 | 分步引导、加载与等待、状态确认、错误解释与可逆操作 | 0 |

每条另有页面位置、设计目标、补充用途、迁移要点和限制。统计按主用途计数，不重复累加补充场景，也不为填满分类而收录普通控件。完整30项用途表见`references/CURRENT-CANDIDATES.md`。

## 本地 Agent 读取

在项目目录执行：

```text
node scripts/query-vault.mjs search --scene product --task detail --json
node scripts/query-vault.mjs search --scope candidates --scene portfolio --json
node scripts/query-vault.mjs inspect online-lens --section all --json
node scripts/query-vault.mjs inspect curated-spatial-product --scope candidates --section all --json
node scripts/query-vault.mjs verify --scope candidates --json
```

`inspect`支持`design`、`implementation`、`code`、`all`。先校验本地文件与预览关联，再返回设计说明、可读源码片段、完整源文件位置、运行入口和参数。大型依赖bundle不会被直接整包塞给Agent。

原正式来源目录：`web/catalog.json`；新增来源目录：`web/candidate-catalog.json`。它们不代表两张页面，也不随浏览器状态复制或改写。来自新增批次的条目即使已提拔，源码读取仍使用`--scope candidates`。需要让Agent按你当前的筛选结果工作时，使用页面“更多 → 导出正式清单”；它只包含本浏览器实际正式且未下架的条目，不含私人备注。资产目录：`web/motion-vault-assets/<id>/`，包括`DESIGN.md`、`IMPLEMENTATION.md`、`parameters.json`、`provenance.json`、`source-map.json`、`asset.json`、代码、素材、封面和预览。

四项独立实现是玻璃圆环与折射字带、字形截面的金属空间结构、玻璃球面图像陈列、同一物体的形态/材质/光照叙事。它们有真实本地代码与预览，但不是原作者源码，也未宣称原作一比一复刻。所有来源、差异和素材限制保留在对应条目中。

## 当前维护流程

`src/hybrid/`维护画廊、既有效果、设计说明和候选适配。`assets/design-assets/<id>/source/`保存上游或独立源文件。当前输入已从旧页面快照分离，构建不依赖被删除的旧版本目录。

`node scripts/build-hybrid.mjs build`是完整构建命令：先生成正式资产和目录，再组装候选目录与旧地址的最小跳转，最后生成同时包含两份中性目录的唯一完整画廊。已有完整暂存产物时，`node src/hybrid/build-candidates.mjs`可快捷更新候选资料并重组同一画廊，不生成第二套界面。候选实现更改需要先按其`IMPLEMENTATION.md`及相应源适配器重建，重新采集同版本预览，再重建目录和画廊。构建输出在`.runtime/hybrid-assets/staged/`，不能将未经验证的临时文件直接当作已发布结果。

验证后使用`node scripts/release.mjs publish`受控发布；`node scripts/sync-gallery.mjs --check`核对项目、Hub兼容副本和真实HTTP响应。无需重启4380服务。

```text
node --test tests/gallery.test.mjs tests/curation-state.test.mjs
node scripts/verify-curation-workflow.mjs --live
node scripts/verify-interaction-switch.mjs --live
node src/hybrid/verify-current.mjs --live
node src/hybrid/verify-candidates-current.mjs --live
node src/hybrid/verify-candidate-sandbox.mjs --live
node src/hybrid/test-hover-intent.mjs normal --live
node src/hybrid/test-hover-intent.mjs reduced --live
```

最新结果只看`lineage/current/RESULT.md`及该目录的真实检查记录。画面变化、交互、代码完整性、来源真实性、用户接受和实际生产复用分别验收。

## 清理与保护

旧版本与恢复包已改存 Git 归档，不再在工作目录维护多份历史副本。当前录制回执单独保存在当前证据记录中。内部schema、来源提交、资源哈希和浏览器存储键为兼容与来源追踪保留，不是多套产品版本。

重复维护须先盘点、保存 Git 历史并逐文件验证恢复。旧 maintain-current 的文件恢复包流程不再作为本次统一后的清理入口。不得清理活动验收进程或用户私人浏览器。

收藏、下架和私人备注沿用原浏览器存储键及已有数据；候选仍使用原审查记录的`accepted`/`hidden`，原正式条目通过原管理事件记录`accept`/`unaccept`。状态变更与恢复只有在保存成功后才生效，恢复并提拔使用一次写入，不产生半完成状态；下架不删除资产源码。原始备注只用于私人审查，不进入正式清单或生产资料。状态保存在当前浏览器，并不自动改写文件目录或跨设备同步。Hub继续拥有实际媒体、数据库和制作任务的选择流程。参考代码接入不等于商用授权或已经适配所有产品。

## 版本与恢复

2026-10-09 以本地最新页面统一私有 GitHub main；当前完整输入为 60 个原正式来源和 54 个新增来源（46 个作者源码适配、8 个独立实现）。这些是来源数量，浏览器当前正式/预选/下架数量保持个人记录，不重置。

本地历史引用 `archive/local-before-unification-20261009` 保存清理前的源码、旧副本和证据；其中私人历史只保存在本机，不能推送。远端旧版本仍可从 main 的父历史及 `archive/github-before-unification-20261009` 查回。用 `git show <ref>:<path>` 查看旧文件，或 `git restore --source <ref> -- <path>` 按需恢复；恢复前先保存当前改动。

唯一运行入口保持 4380；浏览器 profile、收藏、备注、提拔/下架记录及 Hub 用户媒体不进入本次版本清理或仓库上传。完整验证记录见 `lineage/current/version-unification.json`。
