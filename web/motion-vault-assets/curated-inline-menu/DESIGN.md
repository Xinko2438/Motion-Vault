# 正文词语迁移成图像导航

## 实际用途
主要用途：阅读与内容叙事 / 标题与图文编排
页面位置：词语导向的专题索引
设计任务：从阅读正文自然切换到一个相关图像集合

补充用途：作品集与案例 / 图片探索与预览
页面位置：文本作品目录
设计任务：由描述词进入视觉作品

## 设计思路
被选词语保留身份进入导航，其余文字与图像围绕它重新安排。

被点中的词语保留身份并进入菜单结构，其他文字有方向地退出。

## 迁移时保留什么
中文需要定义词组边界和换行策略，不能按拉丁单词间空格直接拆分。

## 观察与验证
点击正文链接，检查词语迁移与图像进入是否构成同一个动作。
正反向、快速重复操作、返回、不同宽高比与资源释放应分别验收。预览片段只展示本地实现，不代替业务验收。

## 使用边界
需要为中文换行与词组边界重做；本条不是普通链接悬停图片。
Removed analytics and sponsor scripts
Removed remote font requests; system font fallback
Blocked outbound navigation and network connections
Bundled source modules with pinned local dependencies
完整交互保持不透明沙箱；只将当前清单允许的本地公开素材通过只读通道传入。独立运行保留原生加载方式，效果核心与录屏一致。

## 来源边界
原作：正文词语迁移成图像导航；Manoela Ilic；概念参考 Matthew Hall。
https://tympanus.net/codrops/2021/06/23/inline-to-menu-link-animation/
本地实现类型：基于作者源码的本地适配。
本文件的用途、设计分析和迁移建议属于策展分析，不代表原作者主张、用户审美认可或某项生产任务批准。
