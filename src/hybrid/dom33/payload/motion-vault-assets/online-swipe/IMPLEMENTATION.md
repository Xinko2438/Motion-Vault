# 侧滑显露上下文操作 · 实现定位

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

### src/hybrid/modern-engine.js:284-284

```js
 case'swipe':h=`<span class="e-kicker">CONTEXT / 操作先退到内容背后</span><div class="e-swipe-shell"><div class="e-swipe-actions"><button data-swipe-action="标记">标记</button><button data-swipe-action="稍后">稍后</button></div><div class="e-swipe-item" tabindex="0" role="group" aria-label="可侧滑消息，左右键展开或收起"><div class="e-avatar">M</div><div><strong>一次小小的发现</strong><p>记录值得保留的交互。</p></div><small>09:41</small></div></div><div class="e-swipe-footer"><button data-swipe-toggle>展开操作</button><span class="e-swipe-result">向左拖动卡片</span></div>`;break;
```

### src/hybrid/modern-engine.js:349-358

```js
 if(key==='swipe'){
  const item=q('.e-swipe-item');let x=0,drag=null;function draw(){item.style.transform=`translateX(${x}px)`;root.dataset.offset=x.toFixed(1);q('[data-swipe-toggle]').textContent=x<-60?'收起操作':'展开操作';}function snap(v){const from=x;x=v;draw();L.anim(item,[{transform:`translateX(${from}px)`},{transform:`translateX(${x}px)`}],{duration:260,easing:'cubic-bezier(.2,.9,.2,1)'});}
  on(item,'pointerdown',e=>{if(e.button!==0)return;item.getAnimations().forEach(a=>a.cancel());drag={id:e.pointerId,p:localPoint(e,scene).x,x};item.focus({preventScroll:true});item.setPointerCapture(e.pointerId);});on(item,'pointermove',e=>{if(drag?.id!==e.pointerId)return;x=clamp(drag.x+localPoint(e,scene).x-drag.p,-154,0);draw();});const end=e=>{if(drag?.id!==e.pointerId)return;drag=null;snap(x<-62?-154:0);};for(const e of ['pointerup','pointercancel','lostpointercapture'])on(item,e,end);on(item,'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();snap(e.key==='ArrowLeft'?-154:0);}});on(q('[data-swipe-toggle]'),'click',()=>snap(x<-60?0:-154));all('[data-swipe-action]').forEach(b=>on(b,'click',()=>{q('.e-swipe-result').textContent=b.dataset.swipeAction+'，仅演示';snap(0);}));draw();return;
 }
 if(key==='hold'){
  const b=q('.e-hold-button');let started=0,raf=0,held=false,done=false;
  function draw(v){q('.e-hold-fill').style.transform=`scaleX(${v})`;q('.e-hold-progress').setAttribute('aria-valuenow',Math.round(v*100));root.dataset.progress=v.toFixed(3);}
  function tick(now){if(!held)return;const p=clamp((now-started)/1000,0,1);draw(p);if(p<1)raf=L.frame(tick);else{done=true;held=false;b.dataset.done='true';q('.e-hold-label').textContent='已确认';q('.e-hold-status').textContent='已完成演示，没有执行实际操作。';}}
  function start(){if(held)return;L.cancel(raf);held=true;done=false;started=performance.now();b.dataset.done='false';q('.e-hold-label').textContent='保持按住';q('.e-hold-status').textContent='松开即可取消';raf=L.frame(tick);}
  function end(){if(!held)return;held=false;L.cancel(raf);if(!done){draw(0);q('.e-hold-label').textContent='按住确认';q('.e-hold-status').textContent='已取消，没有执行实际操作。';}}
```

### src/hybrid/modern-new-scenes.js:34-34

```js
 case 'swipe':return `<div class="vn-swipe-heading"><span>LISTEN LATER / 我的节目</span><h3>留给路上的声音。</h3><small>3 EPISODES</small></div><div class="e-swipe-shell"><div class="e-swipe-actions"><button data-swipe-action="已标记">☆<span>标记</span></button><button data-swipe-action="已加入稍后">◷<span>稍后</span></button></div><div class="e-swipe-item" tabindex="0" role="group" aria-label="可侧滑节目：城市的另一种声音。左右键展开或收起操作"><div class="e-avatar vn-swipe-cover"><span>FIELD<br>RADIO</span><i></i></div><div><strong>城市的另一种声音</strong><p>田野电台 · EP. 018</p></div><small>32:18<br>10 OCT</small></div></div><div class="vn-swipe-next"><span>019</span><strong>从一张唱片开始</strong><small>28:46</small></div><div class="e-swipe-footer"><button data-swipe-toggle>展开操作</button><span class="e-swipe-result" role="status">向左拖动节目卡片</span></div>`;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
