# 文字笔画邻近响应 · 实现定位

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

### src/hybrid/modern-engine.js:276-276

```js
 case'proximity':h=eSvg(`${eText('DISTANCE / WEIGHT',55,66,'e-eyebrow')}${[...'NEAR'].map((c,i)=>`<text class="e-letter" x="${80+i*99}" y="219">${c}</text>`).join('')}${eText('靠近一点，笔画就会回应。',55,285,'e-small')}`);break;
```

### src/hybrid/modern-new-scenes.js:28-28

```js
 case 'proximity':return eSvg(`<path d="M43 112H497M43 224H497" stroke="#212523" stroke-opacity=".22" stroke-width=".7"/><path d="M63 104V231M471 104V231" stroke="#212523" stroke-opacity=".18" stroke-width=".7"/>${eText('NEAR / TYPE FOUNDRY',39,38,'vn-near-head')}${eText('VARIABLE SPECIMEN',366,38,'vn-near-meta')}${[...'NEAR'].map((c,i)=>`<text class="e-letter" x="${80+i*99}" y="219">${c}</text>`).join('')}<circle cx="46" cy="276" r="5" fill="#a43e31"/>${eText('笔画随距离改变，字距保持不动。',61,280,'vn-near-note')}${eText('Aa',439,290,'vn-near-aa')}${eText('CAP HEIGHT',43,103,'vn-near-measure')}${eText('BASELINE',43,239,'vn-near-measure')}`);
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
