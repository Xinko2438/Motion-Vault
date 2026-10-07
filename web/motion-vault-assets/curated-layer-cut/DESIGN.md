# 分层图像的几何剪裁转场

## 实际用途
主要用途：作品集与案例 / 系列作品连续浏览
页面位置：摄影系列或视觉方案切换
设计任务：让整幅画面以有序层次进入和退出

## 设计思路
分层图像的遮罩方向和时间差形成连续的切换，不只是整图淡入淡出。

借鉴多层图像的空间关系、遮罩方向与时间差；六个示例作为同一组研究，不重复计数。

## 迁移时保留什么
保留前后图层的遮挡与方向关系，替换素材后检查主体没有被错误裁切。

## 观察与验证
选择不同版本，比较层与层的时间关系，而不是只看遮罩形状。
正反向、快速重复操作、返回、不同宽高比与资源释放应分别验收。预览片段只展示本地实现，不代替业务验收。

## 使用边界
原作各版本不是六个独立收录项；需检查图像内容不被无意义裁掉。
Removed analytics and sponsor scripts
Removed remote font requests; system font fallback
Blocked outbound navigation and network connections
Bundled source modules with pinned local dependencies
完整交互保持不透明沙箱；只将当前清单允许的本地公开素材通过只读通道传入。独立运行保留原生加载方式，效果核心与录屏一致。

## 来源边界
原作：分层图像的几何剪裁转场；Manoela Ilic。
https://tympanus.net/Development/LayersAnimation/
本地实现类型：基于作者源码的本地适配。
本文件的用途、设计分析和迁移建议属于策展分析，不代表原作者主张、用户审美认可或某项生产任务批准。
