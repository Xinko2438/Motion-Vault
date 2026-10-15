# 像素网格错峰转场 · 实现定位

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

### src/hybrid/modern-engine.js:41-41

```js
 case'pixel':html=`<div class="pixel-art">${art(0)}</div><span class="pixel-title">静观 / 01</span><div class="pixel-screen" aria-hidden="true">${Array.from({length:96},(_,i)=>`<i style="--covered:${mini&&(i%12>8||i%12>6&&Math.floor(i/12)<3)?1:0}"></i>`).join('')}</div><div class="pixel-controls"><button data-action="switch">切换画面</button><select aria-label="转场次序"><option value="diagonal">对角错峰</option><option value="random">分散错峰</option></select></div>`;break;
```

### src/hybrid/modern-engine.js:142-151

```js
 if(key==='pixel'){
  const cells=all('.pixel-screen i'),button=q('[data-action=switch]');let current=0,busy=false,run=0;
  async function transition(){if(busy)return;busy=true;button.disabled=true;const token=++run;const random=q('select').value==='random';const delays=cells.map((_,i)=>random?((i*37+19)%97)*3:(i%12+Math.floor(i/12))*24);const phase=cover=>Promise.all(cells.map((c,i)=>L.anim(c,[{transform:`scaleY(${cover?0:1})`},{transform:`scaleY(${cover?1:0})`}],{duration:310,delay:delays[i],easing:'cubic-bezier(.3,0,.2,1)',fill:'forwards'}).finished.catch(()=>{})));
   await phase(true);if(L.disposed||run!==token)return;current=(current+1)%3;q('.pixel-art').innerHTML=sceneArt([6,7,6][current]);q('.pixel-title').textContent=['Red volume.','Stone & silver.','Red volume.'][current];root.dataset.index=String(current);await phase(false);if(L.disposed||run!==token)return;cells.forEach(c=>{c.getAnimations().forEach(a=>a.cancel());c.style.transform='scaleY(0)';});busy=false;button.disabled=false;
  }on(button,'click',transition);root.dataset.index='0';
 }
 if(key==='sheet'){
  const panel=q('.sheet-panel'),handle=q('.sheet-handle');const stops=[.27,.57,.9];let snap=1,height=root.clientHeight*.57,drag=null;
  function set(i){snap=clamp(i,0,2);height=root.clientHeight*stops[snap];panel.style.transition='';panel.style.height=height+'px';root.dataset.snap=String(snap);all('[data-snap]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.snap)===snap)));}
  all('[data-snap]').forEach(b=>on(b,'click',()=>set(Number(b.dataset.snap))));on(handle,'pointerdown',e=>{if(e.button!==0)return;handle.setPointerCapture(e.pointerId);height=panel.getBoundingClientRect().height*logicalScale(root);drag={id:e.pointerId,y:e.clientY,h:height};panel.style.transition='none';});on(handle,'pointermove',e=>{if(drag&&e.pointerId===drag.id){height=clamp(drag.h+(drag.y-e.clientY)*logicalScale(root),root.clientHeight*.22,root.clientHeight*.94);panel.style.height=height+'px';}});function release(e){if(!drag||e.pointerId!==drag.id)return;drag=null;let closest=stops.reduce((best,p,i)=>Math.abs(height/root.clientHeight-p)<Math.abs(height/root.clientHeight-stops[best])?i:best,0);set(closest);}on(handle,'pointerup',release);on(handle,'pointercancel',release);on(handle,'lostpointercapture',release);on(handle,'keydown',e=>{if(['ArrowUp','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();set(e.key==='Home'?0:e.key==='End'?2:snap+(e.key==='ArrowUp'?1:-1));}});const ro=new ResizeObserver(()=>set(snap));ro.observe(root);L.cleaners.push(()=>ro.disconnect());set(1);
```

### src/hybrid/modern-scenes.js:16-16

```js
 case 'pixel':return `<div class="pixel-art">${sceneArt(6)}</div>${eyebrow('STILL / MOVING','ART DIRECTION NO. 01')}<span class="pixel-title">Red volume.</span><div class="pixel-screen" aria-hidden="true">${Array.from({length:96},(_,i)=>`<i style="--covered:${mini&&(i%12>8||i%12>6&&Math.floor(i/12)<3)?1:0}"></i>`).join('')}</div><div class="pixel-controls"><button data-action="switch">切换画面 ↗</button><select aria-label="转场次序"><option value="diagonal">对角错峰</option><option value="random">分散错峰</option></select></div>`;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
