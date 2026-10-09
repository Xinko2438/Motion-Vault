# Motion Vault · Procedural Snake

原作者源码的本地适配包，保留程序化三维蛇体、GPU 鳞片材质、真实指针追逐与盘绕。分类建议：沉浸式主视觉 / 交互角色 / 创意技术展示。

状态：runtime_unverified。已准备源代码与本地构建；最终静态检查以 qa-static.json 为准。浏览器、WebGL、真实交互、1100×670 视觉与资源释放未验收。未制作本地视频；不将静态构建成功称为原作视觉一比一通过。技术接入不代表用户“收录”。

## 来源与权利

- 作者：Sujen（仓库作者账号 Sujenphea）
- 原仓库：https://github.com/Sujenphea/procedural-snake
- 锁定源码：https://github.com/Sujenphea/procedural-snake/tree/fce15746389d8a358be228d92d3c82fb989be915
- 原作者说明：https://tympanus.net/codrops/?p=108307
- 原演示：https://tympanus.net/Tutorials/WebGLSnakeAnimation/
- 代码许可：仓库实际 LICENSE 为 MIT，版权署名 Codrops，原文保存在 source/LICENSE 和 LICENSE。不是仅根据 package.json 推定许可。
- Three 与 simplex-noise 的真实 MIT 许可分别保存在 vendor-licenses/，包版本与 integrity 见 dependency-lock.json。
- 本地演示不使用第三方照片、字体、音频或模型；所有蛇体/球体几何和纹理都是源码生成。上游 README 的外部预览图片只保留为原始文档链接，没有下载、打包或声明其独立权利。MIT 代码许可不自动覆盖外部示例图片或品牌标识。

## 运行入口

由本地静态服务器打开 run/index.html。无需联网获取渲染依赖。画廊预期用 1100×670 的本地 iframe，再按卡片比例缩放，sandbox 仅包含 allow-scripts。不要为了模块或纹理而添加 allow-same-origin；effect.js 已打包成经典脚本，程序纹理无需跨域加载。

入口含独立的默认拒绝 CSP，只授权本地资源和原作内联初始化的精确 SHA256；外部网络、字体、表单、对象与 worker 均未放行。具体策略与静态检查见 provenance.json 和 qa-static.json；浏览器执行仍未验证。

真实鼠标与触摸会保留原作输入行为；没有自动拖拽或伪造 pointerId。系统减少动态效果时不运行环境动画，仅真实输入请求一个原作更新。停止/恢复不会覆盖这一偏好。

## 研究入口

- DESIGN.md：适用任务、空间构图、材质与运动语言
- IMPLEMENTATION.md：保真范围、最小改动与隔离边界
- parameters.json：原作者参数、默认值和精确文件位置；不是声称已有参数控制 UI
- source/：完整固定上游源码
- adapter/src/：用于打包的可读源码，main.ts 是唯一逻辑适配点
- adapter/effect.diff：main.ts 与上游版本的差异
- run/effect.js：可读 bundle；author 源码与适配源码分别保留在 source/ 和 adapter/src/
- upstream.json、provenance.json：来源、许可、差异、完整哈希和限制
- asset-manifest.json：当前本地 run 文件白名单与哈希
- qa-static.json：此次静态检查及未测项目

## 重建

只使用 adapter/npm/package.json 和锁文件安装精确依赖：在 adapter/npm 运行 npm ci --ignore-scripts --no-audit --no-fund --cache=/tmp/motion-vault-snake-npm-cache。不要运行 source/ 的 npm 脚本或构建配置。生成包不携带临时 node_modules；运行时只使用 run/ 内的已打包文件。

在本包根目录依次运行：python3 adapter/build-local.py；node adapter/build.mjs；python3 adapter/write-metadata.py；python3 adapter/check-static.py。

构建脚本默认使用 Motion Vault tooling 的 esbuild 0.25.10，也可用 ESBUILD_PATH 指向同版本已安装模块。依赖下载只在重建发生，运行包不依赖 node_modules。发布包不携带下载 tarball、构建 metafile 或 .map 调试文件；原始提交与归档哈希保留为来源证据。调试映射可在本地重建时生成。

## SourceDemo 合同

- stop()：暂停并取消后续 RAF
- resume()：恢复原作循环；减少动态效果时只绘制，不强行播放
- paint()：只重绘当前状态，不 seek、不推进虚构时间
- dispose()：清理事件、GPU 对象、RAF 与渲染器

ready 是 Promise，必须在场景和实际首次渲染提交完成后才 resolve；初始化失败会 reject。isReady 是布尔状态，inspect() 返回实时资源、输入和减少动态效果状态。它们不能证明实际画面、真实交互或完整 GPU 兼容验收已通过。


## Release inventory boundary

The distributable keeps readable author/adapter sources and original notices. Dependency folders, download archives, build metafiles and browser .map files are not included. The stored static report records the staging checks, including optional debug files that existed during that check; it is not a promise those debug files ship. Run the documented own build before rerunning checks that inspect build metadata. Optional sourceMappingURL comments in the unchanged bundle are DevTools-only; runtime rendering does not depend on those maps.

## Compatibility contract revision

The current ready property is a Promise, not a load-event flag. Await it; inspect isReady/inspect() separately. It rejects initialization/resource/shader errors detected by the adapter. A fulfilled runtime promise means its observed source initialization and render submission completed; it does not certify screenshot quality, every shader path, interaction, browser compatibility, or user acceptance. Source-level checks are in compatibility-review.json.

Terminal dispose is idempotent and rejects readiness if teardown precedes initialization. Reopening uses a fresh isolated frame. The final Motion Vault packaging must inject its trusted native-pointer and nonce lifecycle bridge; WORK entries alone do not claim that host handshake is installed. Opaque-frame GPU/browser tests remain pending and local application is gated on those results.

MOTION_SNAKE_DEPS may point at a dependency workspace containing the pinned node_modules; otherwise adapter/npm is used. No dependency directory ships.
