# 圆周文字环流 · 实现定位

## 可运行入口

同目录 index.html；需要本地HTTP服务。entry.mjs 导出 mount(host, options)，返回 dispose() / paint(phase)。本包使用共享引擎，不以复制60份框架作为独立化。

```js
import {mount} from './entry.mjs';
const effect=mount(document.getElementById('preview'),{playbackRate:1});
// 卸载组件或隐藏后：
effect.dispose();
```

## 维护入口

实际维护 src/hybrid/modern-engine.js、src/hybrid/legacy-engine.js、src/hybrid/effect-styles.css 与 runtime-adapter.js；修改后运行 node scripts/build-hybrid.mjs build，再生成同版本预览并验收。shared/runtime.mjs 是构建产物，不应直接修改。当前源码目录是唯一修改入口。

## 核心源码摘录与原始定位

以下是准确摘录，供定位，不冒称这些片段单独即可运行。完整执行路径为 entry.mjs → shared/runtime.mjs；布局样式在 shared/runtime.css。

### src/hybrid/modern-engine.js:197-197

```js
 case'orbit':label='文字环流 / 中心保持安静';figure=`<svg class="x-svg x-orbit" viewBox="0 0 400 280" aria-label="圆形排版旋转"><defs><path id="${uid}-outer" d="M200 140m-105 0a105 105 0 1 1 210 0a105 105 0 1 1-210 0"/><path id="${uid}-inner" d="M200 140m-76 0a76 76 0 1 0 152 0a76 76 0 1 0-152 0"/></defs><g class="x-orbit-outer"><text textLength="659" lengthAdjust="spacing"><textPath href="#${uid}-outer">灵感 · 发现 · 创作 · 留白 · 灵感 · 发现 · 创作 · 留白 · </textPath></text></g><g class="x-orbit-inner"><text textLength="477" lengthAdjust="spacing"><textPath href="#${uid}-inner">让日常，慢慢成为作品。 · 让日常，慢慢成为作品。 · </textPath></text></g><circle cx="200" cy="140" r="48" fill="#f9f6e8"/><text class="x-orbit-core" x="200" y="148" text-anchor="middle">留白</text></svg>`;break;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
