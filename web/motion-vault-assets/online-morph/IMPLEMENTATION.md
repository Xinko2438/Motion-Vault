# 连续轮廓形变 · 实现定位

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

### src/hybrid/modern-engine.js:39-39

```js
 case'morph':html=`<div class="center"><span class="eyebrow">一个轮廓，三种形态</span><div class="morph-stage"><svg viewBox="0 0 200 200" aria-label="可变轮廓"><path d="${pathFrom(morphPoints(0))}"/></svg></div><div class="controls shape-buttons">${['花瓣','圆形','菱形'].map((t,i)=>`<button data-shape="${i}" aria-pressed="${i===0}">${t}</button>`).join('')}</div></div>`;break;
```

### src/hybrid/modern-engine.js:136-145

```js
 if(key==='morph'){
  let points=morphPoints(0),raf=0;const path=q('.morph-stage path');
  function change(i){L.cancel(raf);const start=points.map(p=>[...p]),end=morphPoints(i),now=performance.now();all('[data-shape]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shape)===i)));root.dataset.shape=String(i);function tick(t){const p=reduce.matches?1:clamp((t-now)/720,0,1),u=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;points=start.map((v,j)=>[v[0]+(end[j][0]-v[0])*u,v[1]+(end[j][1]-v[1])*u]);path.setAttribute('d',pathFrom(points));if(p<1)raf=L.frame(tick);}raf=L.frame(tick);}
  all('[data-shape]').forEach(b=>on(b,'click',()=>change(Number(b.dataset.shape))));root.dataset.shape='0';
 }
 if(key==='pixel'){
  const cells=all('.pixel-screen i'),button=q('[data-action=switch]');let current=0,busy=false,run=0;
  async function transition(){if(busy)return;busy=true;button.disabled=true;const token=++run;const random=q('select').value==='random';const delays=cells.map((_,i)=>random?((i*37+19)%97)*3:(i%12+Math.floor(i/12))*24);const phase=cover=>Promise.all(cells.map((c,i)=>L.anim(c,[{transform:`scaleY(${cover?0:1})`},{transform:`scaleY(${cover?1:0})`}],{duration:310,delay:delays[i],easing:'cubic-bezier(.3,0,.2,1)',fill:'forwards'}).finished.catch(()=>{})));
   await phase(true);if(L.disposed||run!==token)return;current=(current+1)%3;q('.pixel-art').innerHTML=art(current*2);q('.pixel-title').textContent=['静观 / 01','构成 / 02','停留 / 03'][current];root.dataset.index=String(current);await phase(false);if(L.disposed||run!==token)return;cells.forEach(c=>{c.getAnimations().forEach(a=>a.cancel());c.style.transform='scaleY(0)';});busy=false;button.disabled=false;
  }on(button,'click',transition);root.dataset.index='0';
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
