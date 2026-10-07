# 集成与数据边界

Motion Vault 只维护 `http://127.0.0.1:4380/app/assets/motion-vault.html` 一个完整画廊，通过同页“已收录”“新增待审”“已下架”筛选内容。原正式目录60项、新增目录30项均保留；新增条目已完成本地实现，只有用户主动收录并保存成功后才进入个人默认库。当前发布和验证见 `../lineage/current/`，不以历史两页记录判断本次完成。

## 画廊与公共代码参考

前端源码为 `src/hybrid/gallery.js`、`gallery.css`、`shell.html`，生成产物为 `web/index.html`。两份公共数据输入是 `web/catalog.json` 和 `web/candidate-catalog.json`，不包含私人备注、收藏、下架原因或审查事件，也不代表两个页面。旧 `motion-vault-candidates.html` 只保留跳到同页 `?view=pending` 的最小兼容文件，不再发布独立画廊。

`node scripts/query-vault.mjs search --scene <scene> --task <task> --query <text> --json` 从公共目录提供只读检索，支持 `get <id>`、`taxonomy` 和 `inspect <id> --section all --json`。候选来源使用 `--scope candidates`，用户在浏览器收录后也不改变其来源定位。查询不读取私人策展记录，不授予当前生产任务选定。

页面生产参考导出仅使用公共字段投影，并遵守当前收录、下架状态。个人审查JSON不能整体导入生产目录；仅用CSS隐藏私人文字不构成数据隔离。浏览器个人状态不会自动回写项目目录或上传Hub。

`node scripts/sync-gallery.mjs` 同步主HTML、候选兼容跳转、目录、图标和运行资产到Hub的standalone/public/dist兼容副本，检查文件归属并核对实际HTTP正文哈希。只读核对用 `--check`；受门禁整批发布用 `node scripts/release.mjs publish`。这些副本服务现有入口，不形成第二套产品界面。

## 新增内容与私人审查

候选数据输入位于 `candidates/curated-originals/src/`；本地可读源码位于 `assets/design-assets/<id>/source/`，完整资料与运行文件位于 `web/motion-vault-assets/<id>/`。整卡悬停播放同版本本地短片，详情中按需运行本地源码。预览不会请求整张外部原作网页。

本地运行保持不含 `allow-same-origin` 的隔离沙箱。受限资源代理仅提供当前资产清单声明的运行文件，不能访问父页、浏览器私人存储、Hub API或其他项目。原作链接用于来源对照，本地预览与原作视觉接受分别验证。

原候选审查键 `motion-vault-curated-originals-30-v1` 和私人导出格式 `motion-vault.original-review.v1` / `audience=private_curator` 沿用；收录状态只扩展记录中的 `accepted` 数组，不重置旧备注、下架记录或未知兼容字段。旧“未下架”不能迁移成“已收录”。原正式收藏及下架键同样保留；旧50项键 `motion-vault-online-20261005-15` 不改写，原始审查资料不发布。

下架不等于永久删除源文件。恢复时保留之前的收录状态；保存失败不能假装操作已生效，未保存备注草稿应可保留或私人导出。先前明确永久删除、排除的条目不能通过旧存储被重新载入。

## Hub实际采集与制作选定

`projects/media-knowledge-hub/data/design-references/` 继续持有真实采集记录、原媒体、加工版本、推荐、选择和使用记录。现有CLI为 `projects/media-knowledge-hub/scripts/design-reference-library.mjs`，API前缀仍 `/api/design-references`。

代码目录与Hub采集各自保留来源和验收层次。页面合并不向Hub媒体库制造模拟记录，不把代码预览宣称成未经修改的原作录屏，也不自动确认新的制作包。具体制作任务仍最多推荐三项，由用户选定后读取Hub制作包或明确采用相应代码参考。
