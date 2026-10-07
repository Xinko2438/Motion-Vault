# 小预览到画廊再到全屏的连续过渡

## 实际用途
主要用途：作品集与案例 / 缩略图到案例的衔接
页面位置：文字目录的渐进式作品查看
设计任务：在不突然切换上下文的前提下逐层放大信息

## 设计思路
同一缩略图依次承担提示、画廊和全屏主图，边线与位置一起迁移。

同一张缩略图依次承担提示、画廊主图和全屏图的角色，边线也参与迁移。

## 迁移时保留什么
保留图像身份和返回位置；原作画廊导航不完整，生产必须另行补全。

## 观察与验证
连续完成悬停、点击、再次放大，观察图像身份与导航位置。
正反向、快速重复操作、返回、不同宽高比与资源释放应分别验收。预览片段只展示本地实现，不代替业务验收。

## 使用边界
作者明确画廊导航未完整实现；价值在三层过渡，不是通用 tooltip 功能。
Removed analytics and sponsor scripts
Removed remote font requests; system font fallback
Blocked outbound navigation and network connections
Bundled source modules with pinned local dependencies
完整交互保持不透明沙箱；只将当前清单允许的本地公开素材通过只读通道传入。独立运行保留原生加载方式，效果核心与录屏一致。

## 来源边界
原作：小预览到画廊再到全屏的连续过渡；Manoela Ilic。
https://tympanus.net/codrops/2022/12/07/tooltip-to-gallery-page-transition/
本地实现类型：基于作者源码的本地适配。
本文件的用途、设计分析和迁移建议属于策展分析，不代表原作者主张、用户审美认可或某项生产任务批准。
