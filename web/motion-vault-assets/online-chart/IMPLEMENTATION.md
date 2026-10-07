# 数据切换连续过渡 · 实现定位

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

### src/hybrid/modern-engine.js:200-200

```js
 case'chart':label='固定刻度 / 连续比较';figure=`<svg class="x-svg x-chart" viewBox="0 0 400 260" aria-label="两组虚构数据的柱图比较">${[0,25,50,75,100].map((v,i)=>`<path d="M42 ${213-i*43}H379" stroke="#cad4c9" stroke-width=".6"/><text x="29" y="${217-i*43}" text-anchor="end">${v}</text>`).join('')}${Array.from({length:6},(_,i)=>`<rect class="x-bar" x="${57+i*54}" y="100" width="26" height="113" rx="2" fill="${i===3?'#c59e76':'#799a86'}"/><text class="x-bar-value" x="${70+i*54}" y="88" text-anchor="middle">50</text><text x="${70+i*54}" y="236" text-anchor="middle">${['一','二','三','四','五','六'][i]}</text>`).join('')}<path class="x-chart-line" fill="none" stroke="#324e42" stroke-width="1.8"/></svg><div class="x-presets"><button data-preset="0">演示 A</button><button data-preset="0.5">演示 B</button></div>`;break;
```

### src/hybrid/modern-engine.js:241-250

```js
 if(key==='chart')root.querySelectorAll('[data-preset]').forEach(b=>L.on(b,'click',()=>{stop();point=null;const from=t,to=Number(b.dataset.preset),started=performance.now();root.querySelectorAll('[data-preset]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));function change(now){const p=reduce.matches?1:clamp((now-started)/600,0,1);t=mix(from,to,smooth(p));draw();if(p<1)raf=L.frame(change);}raf=L.frame(change);}));
 if(key==='lens'||key==='wave'){
  const surface=root.querySelector('.x-svg');
  function position(e){let r=surface.getBoundingClientRect();point={x:clamp((e.clientX-r.left)/r.width,.16,.84),y:clamp((e.clientY-r.top)/r.height,.2,.8)};if(key==='lens')stop();draw();}
  root.__receivePoint=e=>position(e);L.cleaners.push(()=>delete root.__receivePoint);L.on(surface,'pointermove',e=>{if(e.pointerType==='mouse'||drag===e.pointerId)position(e);});
  L.on(surface,'pointerdown',e=>{if(e.button!==0)return;drag=e.pointerId;surface.setPointerCapture(e.pointerId);position(e);if(key==='wave'&&!reduce.matches){stop();playing=true;button.textContent='暂停';button.setAttribute('aria-pressed','true');raf=L.frame(tick);}});
  L.on(surface,'pointerup',()=>drag=null);L.on(surface,'pointercancel',()=>drag=null);L.on(surface,'lostpointercapture',()=>drag=null);
 }
 if(['ring','book','dial','string'].includes(key)){
  const surface=key==='dial'?root.querySelector('.x-dial'):key==='string'?root.querySelector('.x-string'):fig;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
