# Motion Vault 新增条目资料

浏览入口统一为 `http://127.0.0.1:4380/app/assets/motion-vault.html`，在同页选择“新增待审”。本目录保存候选数据与来源资料，不再维护独立画廊；旧 `motion-vault-candidates.html` 只保留转到同页 `?view=pending` 的最小跳转。

当前30项已全部接入本地源码、设计拆解、参数、来源差异、真实封面和同版本短片；其中26项作者源码适配、4项独立实现。仅用户主动“收录”并成功保存后，条目才出现在默认“已收录”；技术完成、未下架和收藏都不等于批准。恢复下架条目时沿用其原收录状态。

## Agent 读取

在项目根目录执行：

```text
node scripts/query-vault.mjs search --scope candidates --scene product --json
node scripts/query-vault.mjs inspect curated-spatial-product --scope candidates --section all --json
node scripts/query-vault.mjs verify --scope candidates --json
```

中性目录为 `web/candidate-catalog.json`。运行资产在 `web/motion-vault-assets/<id>/`，可读输入源文件在 `assets/design-assets/<id>/source/`。候选来源条目在收录后仍用同一 scope 读取，浏览器个人收录状态不会自动改写公共JSON。四项独立实现保留准确来源和差异，不当成作者源码或原作一比一复刻。

## 维护与边界

画廊统一由项目 `src/hybrid/gallery.js`、`gallery.css`、`shell.html` 维护；本目录 `src/catalog.json`、`src/taxonomy.json` 为候选内容输入。完整构建使用 `node scripts/build-hybrid.mjs build`；已有完整暂存产物时，`node src/hybrid/build-candidates.mjs` 可更新候选数据并重组同一主页面。不要恢复旧独立 `candidate-app.js` 或外链模板。

悬停仅播放本地短片；详情中的本地交互按需进入隔离沙箱，只允许该资产清单中的公开资源。沿用原浏览器存储键，收录状态扩展原审查记录的 `accepted` 数组。原始备注和下架历史不进入生产检索或参考导出；保存失败保留原状态与备注草稿。

用途表见 `references/CURRENT-CANDIDATES.md`，维护和检查命令见项目 `README.md`，本次实际发布与验收见 `lineage/current/`。旧两页报告不能替代单页筛选、状态流转、跳转和隔离验收。
