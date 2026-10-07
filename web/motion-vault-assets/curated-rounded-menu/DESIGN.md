# 圆角导航与背景揭幕的联动

## 实际用途
主要用途：应用与创作工作台 / 全局导航与空间切换
页面位置：品牌型应用或内容站主导航
设计任务：让导航展开成为空间切换而非盖一块面板

补充用途：品牌首页与发布 / 开场与揭幕
页面位置：编辑型品牌入口
设计任务：以导航动作揭示品牌画面

## 设计思路
圆角导航容器扩大时，背景以互补方向揭幕，两者一起表达空间变化。

菜单容器扩张与背景反向揭示共同构成转场，重点是两者的协调。

## 迁移时保留什么
迁移到高频应用要缩短等待并补真实链接、焦点和退出；不是把演示菜单原样塞进业务。

## 观察与验证
观察菜单开始与结束时的背景关系、焦点位置和退出路径。
正反向、快速重复操作、返回、不同宽高比与资源释放应分别验收。预览片段只展示本地实现，不代替业务验收。

## 使用边界
这是导航转场研究，不是普通菜单收录；生产需补齐键盘焦点与实际链接。
Removed analytics and sponsor scripts
Removed remote font requests; system font fallback
Blocked outbound navigation and network connections
Bundled source modules with pinned local dependencies
完整交互保持不透明沙箱；只将当前清单允许的本地公开素材通过只读通道传入。独立运行保留原生加载方式，效果核心与录屏一致。

## 来源边界
原作：圆角导航与背景揭幕的联动；Codrops / Manoela Ilic。
https://github.com/codrops/ExpandingRoundedMenu/
本地实现类型：基于作者源码的本地适配。
本文件的用途、设计分析和迁移建议属于策展分析，不代表原作者主张、用户审美认可或某项生产任务批准。
