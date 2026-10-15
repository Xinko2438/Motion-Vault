# 邻近放大导航 · 实现定位

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

### src/hybrid/modern-engine.js:34-34

```js
 case'dock':html=`<div class="center"><span class="eyebrow">保持触手可及</span><h3 data-role="docktitle">资料</h3><p data-role="dockdesc">让收集的内容，随时回到手边。</p><nav class="dock" aria-label="演示导航">${dockNames.map((t,i)=>`<button class="dock-item" aria-label="${t}" aria-pressed="${i===0}">${icon(dockIcons[i])}<span class="dock-name">${t}</span></button>`).join('')}</nav></div>`;break;
```

### src/hybrid/modern-engine.js:96-105

```js
 if(key==='dock'){
  const dock=q('.dock'),buttons=all('.dock-item'),descs=['让收集的内容，随时回到手边。','为尚未成形的想法，留一点空间。','把值得重看的瞬间，收在这里。','将零散的发现，写成自己的理解。','只把真正需要的工具，放到近处。'];let values=buttons.map(()=>1),speed=buttons.map(()=>0),targets=buttons.map(()=>1),raf=0,last=0;
  function draw(){buttons.forEach((b,i)=>b.style.transform=`translateY(${-(values[i]-1)*17}px) scale(${values[i]})`);}
  function tick(t){const dt=Math.min(.032,(t-last)/1000||.016);last=t;let more=false;for(let i=0;i<5;i++){speed[i]+=(190*(targets[i]-values[i])-23*speed[i])*dt;values[i]+=speed[i]*dt;if(Math.abs(targets[i]-values[i])+Math.abs(speed[i])>.002)more=true;else{values[i]=targets[i];speed[i]=0;}}draw();if(more&&!document.hidden)raf=L.frame(tick);else{raf=0;last=0;}}
  function point(x){targets=buttons.map(b=>x===null||reduce.matches?1:1+.42*Math.exp(-Math.pow((dock.getBoundingClientRect().left+(b.offsetLeft+b.offsetWidth/2)/logicalScale(root)-x)/(58/logicalScale(root)),2)));if(reduce.matches){L.cancel(raf);raf=0;values=buttons.map(()=>1);speed=buttons.map(()=>0);draw();}else if(!raf)raf=L.frame(tick);}
  root.__receivePoint=e=>point(e.clientX);L.cleaners.push(()=>delete root.__receivePoint);on(dock,'pointermove',e=>{if(e.pointerType==='mouse')point(e.clientX);});on(dock,'pointerleave',()=>point(null));on(dock,'focusout',e=>{if(!dock.contains(e.relatedTarget))point(null);});
  buttons.forEach((b,i)=>{on(b,'click',()=>{buttons.forEach((v,j)=>v.setAttribute('aria-pressed',String(i===j)));q('[data-role=docktitle]').textContent=dockNames[i];q('[data-role=dockdesc]').textContent=descs[i];root.dataset.index=String(i);});on(b,'focus',()=>point(dock.getBoundingClientRect().left+(b.offsetLeft+b.offsetWidth/2)/logicalScale(root)));on(b,'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();buttons[(i+(e.key==='ArrowRight'?1:-1)+5)%5].focus();}});});on(reduce,'change',()=>point(null));on(document,'visibilitychange',()=>{if(document.hidden){L.cancel(raf);raf=0;values=buttons.map(()=>1);speed=buttons.map(()=>0);draw();}});
 }
 if(key==='zoom'){
  const win=q('.zoom-window'),image=q('.zoom-art');let scale=1,x=0,y=0,drag=null;
```

### src/hybrid/modern-scenes.js:12-12

```js
 case 'dock':return `${eyebrow('STUDIO DESKTOP','MON 09:41')}<div class="ad-desktop-window"><div class="ad-window-bar"><i></i><i></i><i></i><span>Untitled — publication</span></div><div class="ad-window-page"><div><small>AN INDEPENDENT JOURNAL</small><h2>Blue<br><i>hours.</i></h2><span>Vol. 03 / Materials & light</span></div>${sceneArt(1)}</div></div><div class="center"><h3 data-role="docktitle" class="ad-sr">资料</h3><p data-role="dockdesc" class="ad-sr">让收集的内容，随时回到手边。</p><nav class="dock" aria-label="演示导航">${['资料','灵感','片段','笔记','工具'].map((t,i)=>`<button class="dock-item" aria-label="${t}" aria-pressed="${i===0}">${icon(['folder','spark','play','note','sliders'][i])}<span class="dock-name">${t}</span></button>`).join('')}</nav></div>`;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
