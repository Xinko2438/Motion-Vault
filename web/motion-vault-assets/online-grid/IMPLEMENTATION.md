# 二维拖拽画廊 · 实现定位

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

### src/hybrid/modern-engine.js:31-31

```js
 case'grid':html=`<div class="tile-plane">${Array.from({length:24},(_,i)=>`<div class="grid-tile" style="transform:translate(${(i%6)*155-50}px,${Math.floor(i/6)*127-47}px)">${art(i)}<div class="tile-caption"><span>${['地形研究','拱与留白','圆的秩序'][i%3]}</span><span>0${i%6+1}</span></div></div>`).join('')}</div><span class="label">视觉素材 / 自由探索</span><span class="canvas-tag">拖动，看看另一边</span>`;break;
```

### src/hybrid/modern-engine.js:67-76

```js
 if(key==='grid'){
  const plane=q('.tile-plane');let tiles=[],cols=6,rows=5,x=-50,y=-47,vx=0,vy=0,drag=null,raf=0,last=0;
  const mod=(n,m)=>(n%m+m)%m;
  function draw(){for(let i=0;i<tiles.length;i++)tiles[i].style.transform=`translate(${mod(i%cols*155+x+155,cols*155)-155}px,${mod(Math.floor(i/cols)*127+y+127,rows*127)-127}px)`;root.dataset.position=x.toFixed(1)+','+y.toFixed(1);}
  function build(){cols=Math.ceil(root.clientWidth/155)+2;rows=Math.ceil(root.clientHeight/127)+2;plane.innerHTML=Array.from({length:cols*rows},(_,i)=>`<div class="grid-tile">${art(i)}<div class="tile-caption"><span>${['地形研究','拱与留白','圆的秩序'][i%3]}</span><span>0${i%6+1}</span></div></div>`).join('');tiles=all('.grid-tile');draw();}
  function stop(){L.cancel(raf);raf=0;vx=vy=0;last=0;}
  function tick(t){const dt=Math.min(32,t-last||16)/16.667;last=t;x+=vx*dt;y+=vy*dt;vx*=Math.pow(.9,dt);vy*=Math.pow(.9,dt);draw();if(Math.hypot(vx,vy)>.07&&!document.hidden)raf=L.frame(tick);else stop();}
  root.tabIndex=0;root.setAttribute('role','region');root.setAttribute('aria-label','拖动画布，方向键移动，Home复位');
  on(root,'pointerdown',e=>{if(e.button!==0)return;stop();root.focus({preventScroll:true});root.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,y:e.clientY,t:performance.now()};});
  on(root,'pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const t=performance.now(),dt=Math.max(8,t-drag.t),dx=(e.clientX-drag.x)*logicalScale(root),dy=(e.clientY-drag.y)*logicalScale(root);x+=dx;y+=dy;vx=clamp(dx*16.667/dt,-32,32);vy=clamp(dy*16.667/dt,-32,32);drag={id:e.pointerId,x:e.clientX,y:e.clientY,t};draw();});
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
