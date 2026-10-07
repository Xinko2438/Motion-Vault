# 曲面产品墙与聚焦选型：本地实现

## 原作者源码
仓库：https://github.com/MatthewGreenberg/shoe-finder
锁定提交：7c91437d332408e32d40de8de72c347ca72dde82
入口：adapter/local-entry.jsx

## 运行
打开 run/index.html。效果代码打包在 run/effect.js，原始源码保留在 source/。本地依赖及锁文件在 dependencies.json 与 dependency-lock.json。构建未执行依赖生命周期脚本。

## 时间与操作
保留源代码的鼠标、滚动或点击控制。SourceDemo.scroll(progress) 可驱动相同的滚动场景；预览片段由本地实际运行与操作录制，不是原站录屏。

## 改动与限制
保留原作者核心实现；移除广告、第三方字体和无关外链加载。
构建使用本地打包的锁定依赖，预览页面不依赖源站在线运行。
系统字体替代会改变原作字形，不宣称原作逐像素一致。
产品照片、商标属于原素材权利方；大目录必须验证加载和可访问列表。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- adapter/local-entry.jsx（local_adapter）
- adapter/SystemText.jsx（local_adapter）
- adapter/src/components/grid/ShoeTile.jsx（local_adapter）
- source/eslint.config.mjs（original_source）
- source/next.config.mjs（original_source）
- source/postcss.config.mjs（original_source）
- source/src/components/CloseButton.jsx（original_source）
- source/src/components/GridUI.jsx（original_source）
- source/src/components/Header.jsx（original_source）
- source/src/components/HoloCardMaterial.js（original_source）
- source/src/components/MiniMap.jsx（original_source）
- source/src/components/TopologyBackground.jsx（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
弯曲陈列把大量对象放进同一空间，选中时相机、产品和标签建立统一焦点。
迁移时先控制可见产品量，再调整曲率、阻尼和焦点；演示品牌与商品照片须替换。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=29f76553ecba4e43。视频没有取代源码。
