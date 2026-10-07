# 扇形快捷操作菜单 · 实现定位

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

### src/hybrid/modern-engine.js:37-37

```js
 case'radial':html=`<div class="center"><span class="eyebrow">围绕当前任务</span><div class="radial-menu" data-open="${mini?'true':'false'}">${['笔记','标记','片段','链接','工具'].map((t,i)=>{const a=(190+i*40)*Math.PI/180;return`<button class="radial-item" aria-label="${t}" style="--i:${i};--x:${Math.cos(a)*102}px;--y:${Math.sin(a)*102}px" ${mini?'':'inert'}>${icon(['note','spark','play','link','sliders'][i])}<span>${t}</span></button>`;}).join('')}<button class="radial-main" data-action="toggle" aria-label="展开快捷菜单" aria-expanded="${mini?'true':'false'}">＋</button></div><p data-role="result" class="demo-status">展开后选择一个操作</p></div>`;break;
```

### src/hybrid/modern-engine.js:124-133

```js
 if(key==='radial'){
  const menu=q('.radial-menu'),main=q('.radial-main'),buttons=all('.radial-item');let open=false;
  function set(next){open=next;menu.dataset.open=String(open);main.setAttribute('aria-expanded',String(open));main.setAttribute('aria-label',open?'收拢快捷菜单':'展开快捷菜单');buttons.forEach(b=>b.inert=!open);root.dataset.open=String(open);}
  root.__openRadial=()=>set(true);on(menu,'pointerenter',e=>{if(e.pointerType==='mouse')set(true)});on(menu,'pointerleave',()=>set(false));on(main,'focus',()=>set(true));on(main,'click',()=>set(!open));buttons.forEach((b,i)=>{on(b,'click',()=>{q('[data-role=result]').textContent='已选择“'+b.getAttribute('aria-label')+'”，仅演示';set(false);main.focus();});on(b,'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();buttons[(i+(e.key==='ArrowRight'?1:-1)+5)%5].focus();}});});on(root,'keydown',e=>{if(e.key==='Escape'&&open){e.preventDefault();e.stopPropagation();set(false);main.focus();}else if(e.target===main&&e.key==='ArrowUp'){e.preventDefault();set(true);buttons[2].focus();}});set(false);
 }
 if(key==='draw'){
  const trace=q('.trace'),input=q('input'),play=q('[data-action=play]');let progress=0,raf=0,last=0,playing=false;
  function draw(){trace.style.strokeDashoffset=String(1-progress/100);input.value=String(progress);q('output').textContent=Math.round(progress)+'%';root.dataset.progress=progress.toFixed(2);}
  function pause(){playing=false;L.cancel(raf);raf=0;last=0;play.textContent='播放绘制';}
  function tick(t){let dt=t-last||0;last=t;progress=clamp(progress+dt/26,0,100);draw();if(progress<100&&playing&&!document.hidden)raf=L.frame(tick);else pause();}
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
