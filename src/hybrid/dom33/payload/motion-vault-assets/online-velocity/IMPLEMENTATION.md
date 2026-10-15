# 速度感应弹性光标 · 实现定位

## 可运行入口

同目录 index.html；需要本地HTTP服务。entry.mjs 导出 mount(host, options)，返回 dispose() / paint(phase)。本包使用共享引擎，不以复制60份框架作为独立化。

```js
import {mount} from './entry.mjs';
const effect=mount(document.getElementById('preview'),{playbackRate:1});
// 卸载组件或隐藏后：
effect.dispose();
```

## 维护入口

实际维护 src/hybrid/modern-engine.js、src/hybrid/legacy-engine.js、src/hybrid/effect-styles.css 与 runtime-adapter.js；修改后运行 node scripts/build-hybrid.mjs build，再生成同版本预览并验收。共享的内容寻址 runtime 文件是构建产物，不应直接修改。当前源码目录是唯一修改入口。

## 核心源码摘录与原始定位

以下是准确摘录，供定位，不冒称这些片段单独即可运行。完整执行路径为 entry.mjs → shared/runtime.eb7967a461d0.mjs；布局样式在 shared/runtime.88444c38f1d6.css。

### src/hybrid/modern-engine.js:277-277

```js
 case'velocity':h=eSvg(`<path d="M65 170H475M270 60V280" stroke="#c9c3d5" stroke-dasharray="2 7" fill="none"/><g class="e-velocity-dot"><ellipse rx="29" ry="29" fill="#a096bd" fill-opacity=".24" stroke="#6f628d" stroke-width="1.4"/><circle r="3" fill="#6f628d"/></g>${eText('SLOW / FAST',42,48,'e-eyebrow')}${eText('方向与速度，由你决定。',42,309,'e-small')}`);break;
```

### src/hybrid/modern-new-scenes.js:29-29

```js
 case 'velocity':return `<div class="vn-velocity-photo">${photo(4)}</div><div class="vn-velocity-copy"><span>FIELD NOTES / 2026</span><h3>Coast.<br>Form.<br>Motion.</h3><p>地貌、尺度与移动的痕迹。</p></div><span class="vn-velocity-index">SELECTED STUDIES<br>01 — 03</span>${eSvg(`<g class="e-velocity-dot" transform="translate(270 170)"><ellipse rx="21" ry="21" fill="#f36a35"/><circle r="2.5" fill="#241a14"/></g>`)}${caption('指针速度 / 弹性响应','EXPLORE ↗','vn-velocity-foot')}`;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
