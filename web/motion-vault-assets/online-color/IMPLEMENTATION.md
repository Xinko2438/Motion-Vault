# 二维色域实时拾色 · 实现定位

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

### src/hybrid/modern-engine.js:292-292

```js
 case'color':h=`<span class="e-kicker">COLOR / 两个方向，两条通道</span><div class="e-color-area" tabindex="0" role="group" aria-label="二维色域，左右键调节饱和度，上下键调节亮度"><i class="e-color-knob"></i></div><div class="e-color-read"><div class="e-color-swatch"></div><output>#698CBF</output><small>H 215°</small><small class="e-color-values">S 45 · B 75</small></div><span class="e-caption">拖动选点，或用方向键微调。</span>`;break;
```

### src/hybrid/modern-engine.js:360-369

```js
 if(key==='color'){
  const area=q('.e-color-area');let sat=.45,val=.75,drag=null;
  function hsv(){const h=215/60,c=val*sat,x=c*(1-Math.abs(h%2-1)),m=val-c;return[0,x,c].map(v=>Math.round((v+m)*255));}
  function draw(){const hex='#'+hsv().map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();q('.e-color-knob').style.left=(sat*100)+'%';q('.e-color-knob').style.top=((1-val)*100)+'%';q('.e-color-swatch').style.background=hex;q('.e-color-read output').textContent=hex;q('.e-color-values').textContent=`S ${Math.round(sat*100)} · B ${Math.round(val*100)}`;root.dataset.color=hex;area.setAttribute('aria-label',`二维色域，饱和度${Math.round(sat*100)}，亮度${Math.round(val*100)}，方向键可调节`);}
  function pos(e){let p=localPoint(e,area,1,1);sat=p.x;val=1-p.y;draw();}on(area,'pointerdown',e=>{if(e.button!==0)return;drag=e.pointerId;area.focus({preventScroll:true});area.setPointerCapture(e.pointerId);pos(e);});on(area,'pointermove',e=>{if(drag===e.pointerId)pos(e);});for(const e of ['pointerup','pointercancel','lostpointercapture'])on(area,e,()=>drag=null);on(area,'keydown',e=>{if(e.key.startsWith('Arrow')){e.preventDefault();sat=clamp(sat+(e.key==='ArrowLeft'?-.01:e.key==='ArrowRight'?.01:0),0,1);val=clamp(val+(e.key==='ArrowDown'?-.01:e.key==='ArrowUp'?.01:0),0,1);draw();}});draw();return;
 }
 if(key==='tree'){
  const buttons=all('[data-tree-branch]'),labels=[['观察','提问'],['原型','验证'],['记录','发布']];let targets=[1,1,1],values=[1,1,1],raf=0;
  function draw(){let paths='',leaves='';for(let i=0;i<3;i++){const y=87+i*88,v=values[i];paths+=`<path d="M129 168C162 168 163 ${y} 201 ${y}"/>`;for(let j=0;j<2;j++){const x=269+v*173,ly=y+(j?23:-23)*v;paths+=`<path d="M269 ${y}C${269+v*55} ${y} ${x-v*44} ${ly} ${x} ${ly}" opacity="${v}"/>`;leaves+=`<g opacity="${v}"><circle cx="${x}" cy="${ly}" r="4" fill="#74949c"/><text x="${x+11}" y="${ly+4}" class="e-small">${labels[i][j]}</text></g>`;}}q('.e-tree-paths').innerHTML=paths;q('.e-tree-leaves').innerHTML=leaves;root.dataset.branches=targets.join(',');}
  function tick(){let more=false;values=values.map((v,i)=>{let n=reduce.matches?targets[i]:v+(targets[i]-v)*.2;if(Math.abs(n-targets[i])>.002)more=true;else n=targets[i];return n;});draw();if(more)raf=L.frame(tick);else raf=0;}
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
