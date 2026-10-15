# 可展开通知堆叠 · 实现定位

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

### src/hybrid/modern-engine.js:43-43

```js
 case'toast':html=`<div class="toast-action"><div><span class="eyebrow">演示工作区</span><h3>有序地，接收反馈。</h3></div><button data-action="add">创建记录</button></div><div class="toast-footer"><p data-role="toastcount">3 条演示记录</p><button data-action="expand" aria-pressed="false">展开通知</button></div><div class="toast-zone" data-expanded="false" aria-label="通知列表">${['记录 03 已创建','记录 02 已创建','记录 01 已创建'].map((t,i)=>toastMarkup(i,t)).join('')}</div>`;break;
```

### src/hybrid/modern-engine.js:153-162

```js
 if(key==='toast'){
  const zone=q('.toast-zone'),expand=q('[data-action=expand]');let seq=3,records=[{id:3},{id:2},{id:1}],undoCount=0;
  function render(){zone.innerHTML=records.map((r,i)=>toastMarkup(i,'记录 '+String(r.id).padStart(2,'0')+' 已创建').replace(`data-token="${i}"`,`data-token="${r.id}"`)).join('');q('[data-role=toastcount]').textContent=records.length+' 条演示记录'+(undoCount?' · 已撤销 '+undoCount+' 条':'');root.dataset.count=String(records.length);}
  on(q('[data-action=add]'),'click',()=>{records.unshift({id:++seq});records=records.slice(0,3);render();const first=zone.firstElementChild;L.anim(first,[{opacity:0,translate:'0 20px'},{opacity:1,translate:'0 0'}],{duration:260,easing:'ease-out'});});on(expand,'click',()=>{let open=zone.dataset.expanded!=='true';zone.dataset.expanded=String(open);expand.setAttribute('aria-pressed',String(open));expand.textContent=open?'收起通知':'展开通知';});on(zone,'click',e=>{const b=e.target.closest('[data-action=undo]');if(!b)return;const id=Number(b.closest('[data-token]').dataset.token);records=records.filter(r=>r.id!==id);undoCount++;render();q('[data-action=add]').focus({preventScroll:true});});render();
 }
 if(key==='slider'){
  const area=q('.elastic-area'),track=q('.elastic-track'),fill=q('.elastic-fill');let value=64,drag=null;
  function draw(){fill.style.width=value+'%';q('output').textContent=String(Math.round(value));area.setAttribute('aria-valuenow',String(Math.round(value)));root.dataset.value=value.toFixed(1);}
  function update(px){let r=area.getBoundingClientRect(),raw=(px-r.left)/r.width,valuePx=clamp(raw,0,1);value=valuePx*100;const over=(raw-valuePx)*r.width;let pull=reduce.matches?0:Math.sign(over)*28*(1-Math.exp(-Math.abs(over)/90));track.style.transform=`translateX(${pull*.5}px) scaleX(${1+Math.abs(pull)/r.width}) scaleY(${1-Math.abs(pull)/250})`;draw();}
  on(area,'pointerdown',e=>{if(e.button!==0)return;drag=e.pointerId;area.focus({preventScroll:true});area.setPointerCapture(e.pointerId);track.style.transition='none';update(e.clientX);});on(area,'pointermove',e=>{if(drag===e.pointerId)update(e.clientX);});function end(e){if(drag===e.pointerId){drag=null;track.style.transition='';track.style.transform='none';}}on(area,'pointerup',end);on(area,'pointercancel',end);on(area,'lostpointercapture',end);on(area,'keydown',e=>{const delta={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1,PageUp:10,PageDown:-10};if(e.key in delta){e.preventDefault();value=clamp(value+delta[e.key],0,100);draw();}else if(e.key==='Home'||e.key==='End'){e.preventDefault();value=e.key==='Home'?0:100;draw();}});draw();
```

### src/hybrid/modern-scenes.js:18-18

```js
 case 'toast':return `${eyebrow('EDITION / PROJECT DESK','LOCAL WORKSPACE')}<div class="toast-action"><div><span class="eyebrow">ISSUE 04 — IN PROGRESS</span><h3>Ready for a new chapter.</h3></div><button data-action="add">创建记录 ＋</button></div><div class="ad-toast-project"><div class="ad-mini-cover">E<br><small>EDITION 04</small></div><div><small>CURRENT PROJECT</small><strong>Material matters</strong><span>封面与内页 / 本地演示</span></div></div><div class="toast-footer"><p data-role="toastcount">3 条演示记录</p><button data-action="expand" aria-pressed="false">展开通知</button></div><div class="toast-zone" data-expanded="false" aria-label="通知列表">${['封面样张已就绪','内页版式已保存','色彩方案已更新'].map((t,i)=>`<div class="toast" style="--i:${i}" data-token="${i}"><div><strong>${t}</strong><small>EDITION 04 · 本地演示记录</small></div><button data-action="undo" aria-label="撤销${t}">撤销</button></div>`).join('')}</div>`;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
