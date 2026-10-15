# 粒点排斥与归位 · 实现定位

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

### src/hybrid/modern-engine.js:278-278

```js
 case'repel':h=eSvg(eDots.map((p,i)=>`<circle class="e-repel-dot" cx="${p.x}" cy="${p.y}" r="${i%9===0?3.6:2.5}" fill="${i%9===0?'#bd8960':'#719698'}"/>`).join('')+eText('MAKE ROOM',39,39,'e-eyebrow')+eText('让开，然后回到原处。',39,320,'e-small'));break;
```

### src/hybrid/modern-new-scenes.js:30-30

```js
 case 'repel':return eSvg(`${eText('SOFT / SYSTEMS',30,36,'vn-repel-head')}${eText('DIGITAL TEXTILE',384,36,'vn-repel-meta')}${Array.from({length:450},(_,i)=>{const col=i%30,row=Math.floor(i/30),x=60+col*13.65+Math.sin(row*.45)*7,y=80+row*10+Math.sin(col*.185+row*.058)*26+Math.sin(col*.09)*7,r=1.1+(Math.sin(col*.49+row*.87)+1)*.66,accent=(col+row*2)%29===0;return `<circle class="e-repel-dot" data-origin-x="${x.toFixed(3)}" data-origin-y="${y.toFixed(3)}" cx="${x.toFixed(3)}" cy="${y.toFixed(3)}" r="${r.toFixed(2)}" fill="${accent?'#e67f47':'#e8e8df'}" opacity="${(.58+(Math.cos(col*.12-row*.25)+1)*.20).toFixed(2)}"/>`;}).join('')}${eText('WOVEN',30,315,'vn-repel-title')}${eText('450 POINTS / 鼠标让开局部，织面回到原处',259,313,'vn-repel-note')}`);
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
