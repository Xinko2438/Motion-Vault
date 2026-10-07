# 跟随式局部放大镜 · 实现定位

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

### src/hybrid/modern-engine.js:192-192

```js
 case'lens':label='保留全貌 / 发现细节';figure=`<svg class="x-svg x-lens" viewBox="0 0 400 300" aria-label="局部放大镜演示"><defs><clipPath id="${uid}-clip"><circle class="x-lens-clip" cx="200" cy="150" r="60"/></clipPath></defs>${landscapeSized(1)}<g clip-path="url(#${uid}-clip)"><g class="x-lens-image">${landscapeSized(1)}</g></g><circle class="x-lens-rim" cx="200" cy="150" r="60" fill="none" stroke="#fffdf3" stroke-width="3"/><circle class="x-lens-edge" cx="200" cy="150" r="62" fill="none" stroke="#526a56" stroke-width="1"/></svg><span class="x-lens-tag">2.2 ×</span>`;break;
```

### src/hybrid/modern-engine.js:244-253

```js
  function position(e){let r=surface.getBoundingClientRect();point={x:clamp((e.clientX-r.left)/r.width,.16,.84),y:clamp((e.clientY-r.top)/r.height,.2,.8)};if(key==='lens')stop();draw();}
  root.__receivePoint=e=>position(e);L.cleaners.push(()=>delete root.__receivePoint);L.on(surface,'pointermove',e=>{if(e.pointerType==='mouse'||drag===e.pointerId)position(e);});
  L.on(surface,'pointerdown',e=>{if(e.button!==0)return;drag=e.pointerId;surface.setPointerCapture(e.pointerId);position(e);if(key==='wave'&&!reduce.matches){stop();playing=true;button.textContent='暂停';button.setAttribute('aria-pressed','true');raf=L.frame(tick);}});
  L.on(surface,'pointerup',()=>drag=null);L.on(surface,'pointercancel',()=>drag=null);L.on(surface,'lostpointercapture',()=>drag=null);
 }
 if(['ring','book','dial','string'].includes(key)){
  const surface=key==='dial'?root.querySelector('.x-dial'):key==='string'?root.querySelector('.x-string'):fig;
  surface.tabIndex=0;
  function move(e){if(!drag||drag.id!==e.pointerId)return;const r=surface.getBoundingClientRect();if(key==='dial'){let a=Math.atan2(e.clientY-r.top-r.height/2,e.clientX-r.left-r.width/2)*180/Math.PI+90;if(a>180)a-=360;let value=clamp((a+135)/270*100,0,100);point={value};t=Math.acos(1-2*value/100)/(2*Math.PI);}else if(key==='string'){point={force:clamp((e.clientY-r.top)/r.height*260-125,-85,85)*2};}else{point=null;const delta=(e.clientX-drag.x)/r.width;t=key==='ring'?((drag.start+delta)%1+1)%1:clamp(drag.start-delta,0,.5);}draw();}
  L.on(surface,'pointerdown',e=>{if(e.button!==0||e.target.closest('button'))return;stop();surface.focus({preventScroll:true});surface.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,start:t};move(e);});L.on(surface,'pointermove',move);
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
