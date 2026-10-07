# 贴纸边角拖拽剥离 · 实现定位

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

### src/hybrid/modern-engine.js:280-280

```js
 case'peel':h=eSvg(`<defs><clipPath id="${uid}"><polygon class="e-peel-clip" points="145,60 395,60 395,280 145,280"/></clipPath></defs><rect x="145" y="60" width="250" height="220" rx="9" fill="#d3cbb9"/><text x="270" y="173" text-anchor="middle" class="e-peel-under">FOUND.</text><g clip-path="url(#${uid})"><rect x="145" y="60" width="250" height="220" fill="#fffaf0"/><svg x="153" y="68" width="234" height="204" viewBox="0 0 400 300">${art(3)}</svg><text x="173" y="103" class="e-peel-word">SLOW STUDIO</text></g><polygon class="e-peel-flap" fill="#ede2c9" stroke="#c0b08f" stroke-width=".6"/><circle class="e-peel-handle" cx="389" cy="274" r="12" fill="#fefbf1" stroke="#927f60" stroke-width="1.2" tabindex="0" role="slider" aria-label="贴纸揭开程度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"/>${eText('PEEL TO DISCOVER',39,39,'e-eyebrow')}`);break;
```

### src/hybrid/modern-engine.js:335-344

```js
 if(key==='peel'){
  let value=.07,drag=null;const handle=q('.e-peel-handle'),poly=[[145,60],[395,60],[395,280],[145,280]];
  function draw(){const c=675-value*360,a=clipHalf(poly,c,true),b=clipHalf(poly,c,false).map(([x,y])=>[c-y,c-x]);q('.e-peel-clip').setAttribute('points',a.map(p=>p.join(',')).join(' '));q('.e-peel-flap').setAttribute('points',b.map(p=>p.join(',')).join(' '));handle.setAttribute('cx',395-value*180);handle.setAttribute('cy',280-value*180);handle.setAttribute('aria-valuenow',Math.round(value*100));root.dataset.value=value.toFixed(3);}
  on(scene,'pointerdown',e=>{if(e.button!==0||!e.target.closest('.e-svg'))return;drag={id:e.pointerId,p:localPoint(e,scene),v:value};handle.focus({preventScroll:true});scene.setPointerCapture(e.pointerId);});on(scene,'pointermove',e=>{if(drag?.id!==e.pointerId)return;const p=localPoint(e,scene);value=clamp(drag.v+(drag.p.x-p.x+drag.p.y-p.y)/400,.02,1);draw();});const end=()=>drag=null;for(const e of ['pointerup','pointercancel','lostpointercapture'])on(scene,e,end);on(handle,'keydown',e=>{if(['ArrowLeft','ArrowUp','ArrowRight','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();value=e.key==='Home'?.02:e.key==='End'?1:clamp(value+(['ArrowLeft','ArrowUp'].includes(e.key)?.07:-.07),.02,1);draw();}});draw();return;
 }
 if(key==='bezier'){
  let points=[[160,70],[390,270]],drag=null;const handles=all('[data-bezier-handle]');function draw(){q('.e-bezier-curve').setAttribute('d',`M80 245C${points[0]} ${points[1]} 455 90`);q('.e-bezier-guide').setAttribute('d',`M80 245L${points[0]}M455 90L${points[1]}`);handles.forEach((b,i)=>{b.setAttribute('cx',points[i][0]);b.setAttribute('cy',points[i][1]);});root.dataset.handles=JSON.stringify(points);}
  handles.forEach((b,i)=>{on(b,'pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,i};b.focus({preventScroll:true});b.setPointerCapture(e.pointerId);});on(b,'pointermove',e=>{if(drag?.id!==e.pointerId)return;let p=localPoint(e,scene);points[i]=[clamp(p.x,50,490),clamp(p.y,45,290)];draw();});for(const e of ['pointerup','pointercancel','lostpointercapture'])on(b,e,()=>drag=null);on(b,'keydown',e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();points[i]=[clamp(points[i][0]+(e.key==='ArrowLeft'?-8:e.key==='ArrowRight'?8:0),50,490),clamp(points[i][1]+(e.key==='ArrowUp'?-8:e.key==='ArrowDown'?8:0),45,290)];draw();});});draw();return;
 }
 if(key==='range'){
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
