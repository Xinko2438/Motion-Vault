# 线稿路径渐进绘制 · 实现定位

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

### src/hybrid/modern-engine.js:38-38

```js
 case'draw':html=`<div class="center"><span class="eyebrow">把线条，慢慢写出来</span><svg class="draw-graphic" viewBox="0 0 400 240" aria-label="原创连续线稿"><path class="ghost" d="${drawPath}"/><path class="trace" pathLength="1" d="${drawPath}"/></svg><div class="draw-slider"><input type="range" min="0" max="100" value="0" aria-label="绘制进度"><output>0%</output></div><div class="controls mini-hide"><button data-action="play">播放绘制</button><button data-action="reset">从头开始</button></div></div>`;break;
```

### src/hybrid/modern-engine.js:129-138

```js
 if(key==='draw'){
  const trace=q('.trace'),input=q('input'),play=q('[data-action=play]');let progress=0,raf=0,last=0,playing=false;
  function draw(){trace.style.strokeDashoffset=String(1-progress/100);input.value=String(progress);q('output').textContent=Math.round(progress)+'%';root.dataset.progress=progress.toFixed(2);}
  function pause(){playing=false;L.cancel(raf);raf=0;last=0;play.textContent='播放绘制';}
  function tick(t){let dt=t-last||0;last=t;progress=clamp(progress+dt/26,0,100);draw();if(progress<100&&playing&&!document.hidden)raf=L.frame(tick);else pause();}
  on(play,'click',()=>{if(playing){pause();return;}if(progress>=100)progress=0;if(reduce.matches){progress=100;draw();return;}playing=true;play.textContent='暂停绘制';last=0;raf=L.frame(tick);});on(input,'input',()=>{pause();progress=Number(input.value);draw();});on(q('[data-action=reset]'),'click',()=>{pause();progress=0;draw();});on(document,'visibilitychange',()=>{if(document.hidden)pause();});on(reduce,'change',()=>{if(reduce.matches&&playing){pause();progress=100;draw();}});draw();
 }
 if(key==='morph'){
  let points=morphPoints(0),raf=0;const path=q('.morph-stage path');
  function change(i){L.cancel(raf);const start=points.map(p=>[...p]),end=morphPoints(i),now=performance.now();all('[data-shape]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shape)===i)));root.dataset.shape=String(i);function tick(t){const p=reduce.matches?1:clamp((t-now)/720,0,1),u=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;points=start.map((v,j)=>[v[0]+(end[j][0]-v[0])*u,v[1]+(end[j][1]-v[1])*u]);path.setAttribute('d',pathFrom(points));if(p<1)raf=L.frame(tick);}raf=L.frame(tick);}
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
