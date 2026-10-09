# 实现与适配边界

## 真实来源

- 仓库：https://github.com/Sujenphea/procedural-snake
- 锁定提交：fce15746389d8a358be228d92d3c82fb989be915
- 作者署名：Sujen；仓库实际 MIT LICENSE 版权行署名 Codrops。
- source/ 保存此提交的全部 29 个文件，不改写上游源码、LICENSE 或 lockfile。adapter/upstream-git-tree.json 可逐文件验证 Git blob 哈希。

## 保留的原作

adapter/src/js/components/Snake.ts、curves/CurveGenerator.ts、curves/EndlessCurve.ts、utils/input.ts、utils/properties.ts 和四个 GLSL 着色器均从 source/ 原样复制。Three 0.182.0、simplex-noise 4.0.3 与原作锁文件版本一致。保留 GPU 实例化、浮点位置/法线纹理、鳞片几何、所有材质参数、目标球、相机、质量检测和原生鼠标/触摸事件。

## 改动

1. 由自有 Python 变换脚本仅适配 main.ts 生命周期，变更在 adapter/effect.diff 中逐行记录。
2. 自有 esbuild 配置把 TypeScript、Three、simplex-noise 与原作 GLSL 编译为可读的本地经典脚本。import.meta.env.DEV 固定为 false，等价于原作生产模式，未执行原作 Vite、ESLint 或 npm lifecycle 脚本。
3. 原作 HTML 移除远程 analytics、广告与 favicon 请求；原有文字导航改为同布局静态文字，来源链接在本包说明中保留。使用原有系统等宽字体。
4. 只增加 iframe 尺寸/溢出边界和真实 WebGL 初始化失败提示，无 CSS 仿制、简化替身或视频替代。
5. SourceDemo.stop 取消下一帧；resume 恢复循环并尊重原生减少动态效果；paint 仅重绘当前状态；dispose 清理 RAF、输入/偏好/可见性事件、纹理、几何、材质、实例缓冲、渲染器和 canvas。没有伪造时间轴 seek。
6. WebGL context restore 先释放旧场景再创建新原作场景。隐藏文档暂停，重新可见只恢复仍处于运行状态的实例。

## 隔离与资源

run/index.html 可以由本地 HTTP 服务独立打开，预期在 1100×670 的 iframe 内运行后由画廊整体缩放。使用 sandbox="allow-scripts"，不需要 allow-same-origin、外部字体、CDN、API、远程图片、浏览器存储或父页状态。

run/vault-isolation.js 来自 Motion Vault 既有资源桥，原件留在 adapter/。仅增加显式 dispose 时的 pending request/Blob URL 清理。父页必须使用当前包 asset-manifest.json 的 runFiles 白名单应答；不开放任意路径。本效果全部纹理由 GPU/CPU 程序生成，正常运行不发纹理网络请求，仍保留统一隔离入口。

run/index.html 在所有样式和脚本前声明独立 CSP：默认拒绝；只允许本地脚本和原作初始化内联脚本的精确 SHA256；样式限本地与必要内联；图片限本地/data/blob；连接仅 blob/data；字体、表单提交、对象、子框架与 worker 均禁止，base 限本地。没有放行外部网络或 unsafe-eval，脚本没有宽泛的 unsafe-inline。此策略不改变 allow-scripts 的 opaque sandbox，实际浏览器执行仍待验证。

## 验证状态

qa-static.json 只证明固定来源、源文件保真、编译、语法、静态依赖与资源合同。实际浏览器/WebGL 着色器编译、1100×670 画面、鼠标/触摸、内存释放、context restore、减少动态效果和视觉对照仍需独立实测。状态为 runtime_unverified；未录制视频。


Compatibility revision: SourceDemo.ready is resource/first-render-gated Promise; isReady is a boolean; inspect reports actual adapter state. Partial initialization and terminal disposal are covered in the source audit. Browser execution, input behavior, actual shader success and local integration remain pending. See compatibility-review.json for exact limits and source changes.
