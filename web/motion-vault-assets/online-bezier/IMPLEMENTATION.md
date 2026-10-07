# 贝塞尔控制柄编辑 · 实现定位

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

### src/hybrid/modern-engine.js:281-281

```js
 case'bezier':h=eSvg(`<path d="M50 290H490M50 290V45" stroke="#d0d7d7" fill="none"/><path class="e-bezier-guide" fill="none" stroke="#96adb6" stroke-dasharray="3 5"/><path class="e-bezier-curve" fill="none" stroke="#486d81" stroke-width="3"/><circle cx="80" cy="245" r="5" fill="#486d81"/><circle cx="455" cy="90" r="5" fill="#486d81"/>${[0,1].map(i=>`<circle data-bezier-handle="${i}" r="10" fill="#fffdf4" stroke="#486d81" stroke-width="2" tabindex="0" role="button" aria-label="控制柄${i+1}，方向键可移动"/>`).join('')}${eText('CUBIC / 2 HANDLES',41,33,'e-eyebrow')}${eText('拖动圆点，改变曲线。',275,315,'e-small')}`);break;
```

### src/hybrid/modern-engine.js:340-349

```js
 if(key==='bezier'){
  let points=[[160,70],[390,270]],drag=null;const handles=all('[data-bezier-handle]');function draw(){q('.e-bezier-curve').setAttribute('d',`M80 245C${points[0]} ${points[1]} 455 90`);q('.e-bezier-guide').setAttribute('d',`M80 245L${points[0]}M455 90L${points[1]}`);handles.forEach((b,i)=>{b.setAttribute('cx',points[i][0]);b.setAttribute('cy',points[i][1]);});root.dataset.handles=JSON.stringify(points);}
  handles.forEach((b,i)=>{on(b,'pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,i};b.focus({preventScroll:true});b.setPointerCapture(e.pointerId);});on(b,'pointermove',e=>{if(drag?.id!==e.pointerId)return;let p=localPoint(e,scene);points[i]=[clamp(p.x,50,490),clamp(p.y,45,290)];draw();});for(const e of ['pointerup','pointercancel','lostpointercapture'])on(b,e,()=>drag=null);on(b,'keydown',e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();points[i]=[clamp(points[i][0]+(e.key==='ArrowLeft'?-8:e.key==='ArrowRight'?8:0),50,490),clamp(points[i][1]+(e.key==='ArrowUp'?-8:e.key==='ArrowDown'?8:0),45,290)];draw();});});draw();return;
 }
 if(key==='range'){
  let values=[24,76],drag=null;const area=q('.e-range-zone'),handles=all('[data-range-handle]');function set(i,v){values[i]=Math.round(clamp(v,i?values[0]+8:0,i?100:values[1]-8));draw();}function draw(){q('.e-range-selected').style.left=values[0]+'%';q('.e-range-selected').style.width=(values[1]-values[0])+'%';q('.e-range-output').textContent=values.join(' — ');handles.forEach((b,i)=>{b.style.left=values[i]+'%';b.setAttribute('aria-valuenow',values[i]);b.setAttribute('aria-valuemin',i?values[0]+8:0);b.setAttribute('aria-valuemax',i?100:values[1]-8);});root.dataset.range=values.join(',');}
  handles.forEach((b,i)=>{on(b,'pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,i};b.focus({preventScroll:true});b.setPointerCapture(e.pointerId);});on(b,'pointermove',e=>{if(drag?.id===e.pointerId)set(i,localPoint(e,area,100,1).x);});for(const e of ['pointerup','pointercancel','lostpointercapture'])on(b,e,()=>drag=null);on(b,'keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();set(i,e.key==='Home'?0:e.key==='End'?100:values[i]+(['ArrowLeft','ArrowDown'].includes(e.key)?-1:1));}});});draw();return;
 }
 if(key==='swipe'){
  const item=q('.e-swipe-item');let x=0,drag=null;function draw(){item.style.transform=`translateX(${x}px)`;root.dataset.offset=x.toFixed(1);q('[data-swipe-toggle]').textContent=x<-60?'收起操作':'展开操作';}function snap(v){const from=x;x=v;draw();L.anim(item,[{transform:`translateX(${from}px)`},{transform:`translateX(${x}px)`}],{duration:260,easing:'cubic-bezier(.2,.9,.2,1)'});}
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
