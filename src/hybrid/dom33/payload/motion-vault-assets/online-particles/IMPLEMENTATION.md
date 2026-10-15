# 粒子散开与重新聚字 · 实现定位

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

### src/hybrid/modern-engine.js:200-200

```js
 case'particles':label='分散的点 / 聚成一个想法';figure=`<svg class="x-svg x-particles" viewBox="0 0 400 260" aria-label="IDEA字样由粒子聚合形成">${particlePositions.map((p,i)=>`<circle class="x-particle" cx="${p[0]}" cy="${p[1]}" r="${i%5===0?2.5:2}" fill="${i%7===0?'#b6976b':'#487664'}"/>`).join('')}<text x="200" y="222" text-anchor="middle">从零散，到成形。</text></svg>`;break;
```

### src/hybrid/modern-scenes.js:26-26

```js
 case 'particles':return extra('POINT OF ORIGIN / GENERATIVE TYPE',`<svg class="x-svg x-particles" viewBox="0 0 400 260" aria-label="IDEA字样由粒子聚合形成"><path d="M25 46H375M25 205H375" stroke="#414c61" stroke-width=".5"/>${particlePositions.map((p,i)=>`<circle class="x-particle" cx="${p[0]}" cy="${p[1]}" r="${i%5===0?2.5:2}" fill="${i%7===0?'#e9bf77':'#efeee5'}"/>`).join('')}<text x="25" y="234">FROM PARTICLE TO POSSIBILITY</text><text x="374" y="234" text-anchor="end">144 PT</text></svg><span class="ad-particle-plus">+</span>`);
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
