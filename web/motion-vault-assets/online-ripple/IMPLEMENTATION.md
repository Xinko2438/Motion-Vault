# 水波折射切图 · 实现定位

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

### src/hybrid/modern-engine.js:193-193

```js
 case'ripple':label='两幅画面 / 水波交接';figure=`<svg class="x-svg x-ripple" viewBox="0 0 400 300" aria-label="水波折射演示"><defs><filter id="${uid}-water" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence class="x-noise" type="fractalNoise" baseFrequency=".016 .025" numOctaves="2" seed="6" result="noise"/><feDisplacementMap class="x-displace" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs><g filter="url(#${uid}-water)"><g>${landscapeSized(2)}</g><g class="x-ripple-next" opacity="0">${landscapeSized(3)}</g></g></svg><span class="x-image-caption">一池微澜。</span>`;break;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
