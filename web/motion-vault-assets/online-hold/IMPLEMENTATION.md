# 按住蓄力与取消 · 实现定位

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

### src/hybrid/modern-engine.js:291-291

```js
 case'hold':h=`<span class="e-kicker">INTENT / 不急着确认</span><div class="e-hold-wrap"><p>确定，要留一点时间。</p><button class="e-hold-button"><span class="e-hold-fill"></span><span class="e-hold-label">按住确认</span></button><div class="e-hold-progress" role="progressbar" aria-label="按住进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div><small class="e-hold-status" role="status">中途松开即可取消 · 仅操作演示</small></div>`;break;
```

### src/hybrid/modern-engine.js:352-361

```js
 if(key==='hold'){
  const b=q('.e-hold-button');let started=0,raf=0,held=false,done=false;
  function draw(v){q('.e-hold-fill').style.transform=`scaleX(${v})`;q('.e-hold-progress').setAttribute('aria-valuenow',Math.round(v*100));root.dataset.progress=v.toFixed(3);}
  function tick(now){if(!held)return;const p=clamp((now-started)/1000,0,1);draw(p);if(p<1)raf=L.frame(tick);else{done=true;held=false;b.dataset.done='true';q('.e-hold-label').textContent='已确认';q('.e-hold-status').textContent='已完成演示，没有执行实际操作。';}}
  function start(){if(held)return;L.cancel(raf);held=true;done=false;started=performance.now();b.dataset.done='false';q('.e-hold-label').textContent='保持按住';q('.e-hold-status').textContent='松开即可取消';raf=L.frame(tick);}
  function end(){if(!held)return;held=false;L.cancel(raf);if(!done){draw(0);q('.e-hold-label').textContent='按住确认';q('.e-hold-status').textContent='已取消，没有执行实际操作。';}}
  on(b,'pointerdown',e=>{if(e.button!==0)return;b.focus({preventScroll:true});b.setPointerCapture(e.pointerId);start();});for(const e of ['pointerup','pointercancel','lostpointercapture','blur'])on(b,e,end);on(b,'keydown',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();if(!e.repeat)start();}});on(b,'keyup',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();end();}});draw(0);return;
 }
 if(key==='color'){
  const area=q('.e-color-area');let sat=.45,val=.75,drag=null;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
