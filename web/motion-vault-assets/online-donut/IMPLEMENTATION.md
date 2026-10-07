# 环形分区依次展开 · 实现定位

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

### src/hybrid/modern-engine.js:290-290

```js
 case'donut':h=eSvg(`${Array.from({length:4},(_,i)=>`<path class="e-donut-sector" fill="${['#5a7e89','#93aeb0','#d3b38e','#a5b696'][i]}"/>`).join('')}<text class="e-donut-total" x="224" y="183" text-anchor="middle">100%</text>${[[0,'研究',40],[1,'设计',28],[2,'验证',20],[3,'归档',12]].map(([i,l,n])=>`<rect x="386" y="${94+i*43}" width="8" height="8" rx="2" fill="${['#5a7e89','#93aeb0','#d3b38e','#a5b696'][i]}"/><text x="405" y="${102+i*43}" class="e-small">${l} ${n}%</text>`).join('')}${eText('PROPORTION / 演示数据',39,37,'e-eyebrow')}`);break;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
