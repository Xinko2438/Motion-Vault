# 旋钮刻度吸附 · 实现定位

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

### src/hybrid/modern-engine.js:201-201

```js
 case'dial':label='细微调节 / 清楚反馈';figure=`<svg class="x-svg x-dial" viewBox="0 0 400 280" aria-label="参数旋钮" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" tabindex="0"><circle cx="200" cy="140" r="84" fill="#d7ddd0"/><circle cx="200" cy="140" r="72" fill="#f9f8ed" stroke="#fffef7" stroke-width="3"/>${Array.from({length:51},(_,i)=>{let a=(-225+i*5.4)*Math.PI/180;return`<line class="x-dial-tick" x1="${200+Math.cos(a)*95}" y1="${140+Math.sin(a)*95}" x2="${200+Math.cos(a)*(i%5?101:106)}" y2="${140+Math.sin(a)*(i%5?101:106)}" stroke="#8f9d87" stroke-width="${i%5?1:2}"/>`;}).join('')}<g class="x-dial-needle"><circle cx="200" cy="84" r="4" fill="#55745a"/></g><text class="x-dial-value" x="200" y="149" text-anchor="middle">50</text><text x="200" y="175" text-anchor="middle">强度 / %</text></svg>`;break;
```

### src/hybrid/modern-engine.js:252-261

```js
  function move(e){if(!drag||drag.id!==e.pointerId)return;const r=surface.getBoundingClientRect();if(key==='dial'){let a=Math.atan2(e.clientY-r.top-r.height/2,e.clientX-r.left-r.width/2)*180/Math.PI+90;if(a>180)a-=360;let value=clamp((a+135)/270*100,0,100);point={value};t=Math.acos(1-2*value/100)/(2*Math.PI);}else if(key==='string'){point={force:clamp((e.clientY-r.top)/r.height*260-125,-85,85)*2};}else{point=null;const delta=(e.clientX-drag.x)/r.width;t=key==='ring'?((drag.start+delta)%1+1)%1:clamp(drag.start-delta,0,.5);}draw();}
  L.on(surface,'pointerdown',e=>{if(e.button!==0||e.target.closest('button'))return;stop();surface.focus({preventScroll:true});surface.setPointerCapture(e.pointerId);drag={id:e.pointerId,x:e.clientX,start:t};move(e);});L.on(surface,'pointermove',move);
  function end(e){if(!drag||drag.id!==e.pointerId)return;drag=null;if(key==='dial'){point.value=Math.round(point.value);draw();}if(key==='string'){const force=point?.force||0,start=performance.now();function recover(now){if(L.disposed)return;let s=(now-start)/1000;point={force:reduce.matches?0:force*Math.exp(-s*5)*Math.cos(s*16)};draw();if(!reduce.matches&&s<1.5)raf=L.frame(recover);}raf=L.frame(recover);}}
  L.on(surface,'pointerup',end);L.on(surface,'pointercancel',end);L.on(surface,'lostpointercapture',end);
  L.on(surface,'keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();stop();point=null;t=e.key==='Home'?0:e.key==='End'?.5:clamp(t+(['ArrowLeft','ArrowDown'].includes(e.key)?-.02:.02),0,1);draw();});
 }
 L.on(document,'visibilitychange',()=>{if(document.hidden)stop();});L.on(reduce,'change',()=>{if(reduce.matches){stop();point=null;t=.5;draw();}});
 draw();
}

```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
