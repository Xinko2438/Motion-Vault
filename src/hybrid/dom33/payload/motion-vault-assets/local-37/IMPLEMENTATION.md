# 双向分割错落拉幕 · 实现定位

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

### src/hybrid/legacy-engine.js:56-65

```js
 }else if(id===37){
  root.dataset.open='false';scene.dataset.split='true';const front=`<div class="split-composition">${imageArt('red-wide','原创生成的红色薄壳雕塑','split-scene-image')}${meta('DUAL / OBJECTS IN DIALOGUE','01 — IN BETWEEN')}<div class="split-title"><span>AN EXPERIMENT IN FORM</span><h3>In between<br><em>form & feeling.</em></h3></div><span class="split-caption">Two sides. One continuous story.</span></div>`;setScene(`<div class="lab-split-back">${imageArt('stone-wide','原创生成的玄武岩与银白薄壳雕塑','split-scene-image')}${meta('DUAL / OBJECTS IN DIALOGUE','02 — A QUIETER PRESENCE')}<h3>A quieter<br><em>kind of presence.</em></h3><span class="split-back-caption">Stone, silver, and the space between.</span></div><div class="lab-split-half left">${front}</div><div class="lab-split-half right">${front}</div><button type="button" data-action="split" class="split-scene-action">切换作品 ↗</button>`);q('[data-action=split]').addEventListener('click',()=>{root.dataset.open=String(root.dataset.open!=='true')});
 }else if(id===38){
  const uid='lab-goo-'+(++demoInstance);root.dataset.open='false';setScene(`${meta('GOOD / CHEMISTRY','A LIVING IDENTITY')}<div class="chemistry-copy"><span class="legacy-eyebrow">BETTER TOGETHER</span><h3>We make<br><em>things click.</em></h3><p>Independent minds.<br>A shared frequency.</p></div><svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="${uid}"><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -8"/></filter></defs></svg><div class="lab-goo" style="filter:url(#${uid})"><i class="drop"></i><i class="drop"></i><i class="drop"></i></div><div class="chemistry-footer"><span>CONNECT / EXPAND / RECONNECT</span><div class="lab-trigger"></div></div>`);const b=btn('goo','展开 / 合拢 ↔',()=>{root.dataset.open=String(root.dataset.open!=='true');b.setAttribute('aria-pressed',root.dataset.open)});b.setAttribute('aria-pressed','false');q('.lab-trigger').append(b);
 }else if(id===39){
  setScene(`${meta('<b>GESTURE</b>　/　A journal of movement','ISSUE 06')}<div class="gesture-copy"><span class="legacy-eyebrow">NOTHING STAYS STILL.</span><h3>The shape of</h3></div><div class="gesture-sculpture">${svg('<path d="M333 39C259 30 202 77 228 116C250 149 347 123 343 172C338 229 239 217 210 282" fill="none" stroke="#e44834" stroke-width="41"/><path d="M330 39C265 45 226 76 245 107C275 138 362 124 361 168C360 216 263 218 231 286" fill="none" stroke="#f89675" stroke-width="7"/>')}</div><div class="lab-flip-word" aria-label="MOTION"></div><div class="gesture-footer"><span>ESSAYS ON RHYTHM,<br>SPACE AND POSSIBILITY.</span><div class="lab-trigger"></div><small>2026 / VOL. VI</small></div>`);'MOTION'.split('').forEach((c,i)=>{const el=document.createElement('span');el.textContent=c;el.style.setProperty('--i',i);el.setAttribute('aria-hidden','true');q('.lab-flip-word').append(el)});const fire=()=>{q('.lab-flip-word').classList.remove('playing');void q('.lab-flip-word').offsetWidth;q('.lab-flip-word').classList.add('playing')};q('.lab-trigger').append(btn('letters','播放标题 ↻',fire));
 }else if(id===40){
  setScene(`<div class="lab-space" tabindex="0" aria-label="移动鼠标探索建筑空间三层视差"><div class="lab-space-layer space-foreground"><div class="arcade-post arcade-post-left" style="background-image:url('${artURL('warm-arcade')}')"></div><div class="arcade-post arcade-post-right" style="background-image:url('${artURL('warm-arcade')}')"></div><div class="arcade-lintel"></div><div class="arcade-sill"></div></div><div class="lab-space-layer space-object"><div class="space-sculpture-slot">${imageArt('red-cutout','原创生成的红色薄壳雕塑透明图层','space-cutout-image')}</div><div class="space-object-shadow"></div></div><div class="lab-space-layer space-background">${imageArt('warm-arcade','原创生成的日光石灰石拱廊','arcade-background-image')}</div><div class="space-title"><span>APERTURE</span><small>SPATIAL STUDY / 03</small></div><span class="space-mark">LIGHT, WITH ROOM TO MOVE.</span></div><div class="lab-space-controls"><label>X<input type="range" min="-100" max="100" value="0" aria-label="水平视差"></label><label>Y<input type="range" min="-100" max="100" value="0" aria-label="垂直视差"></label><span>MOVE TO EXPLORE</span></div>`);const space=q('.lab-space'),ranges=scene.querySelectorAll('input');const move=(x,y)=>{scene.querySelectorAll('.lab-space-layer').forEach((el,i)=>{const z=[18,10,5][i];el.style.transform='translate3d('+x*z+'px,'+y*z+'px,0) rotateX('+(-y*5)+'deg) rotateY('+(x*6)+'deg)'})};space.addEventListener('pointermove',e=>{const r=space.getBoundingClientRect();move(Math.max(-1,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width)*2-1)),Math.max(-1,Math.min(1,(e.clientY-r.top)/Math.max(1,r.height)*2-1)))});space.addEventListener('pointerleave',()=>move(0,0));ranges.forEach(input=>input.addEventListener('input',()=>move(Number(ranges[0].value)/100,Number(ranges[1].value)/100)));move(0,0);
 }
 if(!detail){root.setAttribute('aria-hidden','true');root.querySelectorAll('button,input,[tabindex]').forEach(el=>el.tabIndex=-1)}
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
