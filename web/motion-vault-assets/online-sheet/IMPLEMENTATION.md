# 多档停靠手势面板 · 实现定位

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

### src/hybrid/modern-engine.js:41-41

```js
 case'sheet':html=`<div class="sheet-back"><div class="map-lines"></div><span class="eyebrow">附近 / 演示地图</span><h3>慢一点，发现身边。</h3></div><div class="snap-controls"><button data-snap="0">摘要</button><button data-snap="1">半屏</button><button data-snap="2">展开</button></div><div class="sheet-panel"><button class="sheet-handle" aria-label="拖动调整面板高度，方向键切换档位"></button><div class="sheet-content"><h3>值得停留的地方</h3><p>拖动把手，展开更多细节。</p>${['沿河步道','安静书屋','街角展厅','林间座椅','临水茶室'].map((t,i)=>`<div class="sheet-row"><span>${t}</span><span>${(i+1)*3} 分钟 · 演示</span></div>`).join('')}</div></div>`;break;
```

### src/hybrid/modern-engine.js:147-156

```js
 if(key==='sheet'){
  const panel=q('.sheet-panel'),handle=q('.sheet-handle');const stops=[.27,.57,.9];let snap=1,height=root.clientHeight*.57,drag=null;
  function set(i){snap=clamp(i,0,2);height=root.clientHeight*stops[snap];panel.style.transition='';panel.style.height=height+'px';root.dataset.snap=String(snap);all('[data-snap]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.snap)===snap)));}
  all('[data-snap]').forEach(b=>on(b,'click',()=>set(Number(b.dataset.snap))));on(handle,'pointerdown',e=>{if(e.button!==0)return;handle.setPointerCapture(e.pointerId);height=panel.getBoundingClientRect().height*logicalScale(root);drag={id:e.pointerId,y:e.clientY,h:height};panel.style.transition='none';});on(handle,'pointermove',e=>{if(drag&&e.pointerId===drag.id){height=clamp(drag.h+(drag.y-e.clientY)*logicalScale(root),root.clientHeight*.22,root.clientHeight*.94);panel.style.height=height+'px';}});function release(e){if(!drag||e.pointerId!==drag.id)return;drag=null;let closest=stops.reduce((best,p,i)=>Math.abs(height/root.clientHeight-p)<Math.abs(height/root.clientHeight-stops[best])?i:best,0);set(closest);}on(handle,'pointerup',release);on(handle,'pointercancel',release);on(handle,'lostpointercapture',release);on(handle,'keydown',e=>{if(['ArrowUp','ArrowDown','Home','End'].includes(e.key)){e.preventDefault();set(e.key==='Home'?0:e.key==='End'?2:snap+(e.key==='ArrowUp'?1:-1));}});const ro=new ResizeObserver(()=>set(snap));ro.observe(root);L.cleaners.push(()=>ro.disconnect());set(1);
 }
 if(key==='toast'){
  const zone=q('.toast-zone'),expand=q('[data-action=expand]');let seq=3,records=[{id:3},{id:2},{id:1}],undoCount=0;
  function render(){zone.innerHTML=records.map((r,i)=>toastMarkup(i,'记录 '+String(r.id).padStart(2,'0')+' 已创建').replace(`data-token="${i}"`,`data-token="${r.id}"`)).join('');q('[data-role=toastcount]').textContent=records.length+' 条演示记录'+(undoCount?' · 已撤销 '+undoCount+' 条':'');root.dataset.count=String(records.length);}
  on(q('[data-action=add]'),'click',()=>{records.unshift({id:++seq});records=records.slice(0,3);render();const first=zone.firstElementChild;L.anim(first,[{opacity:0,translate:'0 20px'},{opacity:1,translate:'0 0'}],{duration:260,easing:'ease-out'});});on(expand,'click',()=>{let open=zone.dataset.expanded!=='true';zone.dataset.expanded=String(open);expand.setAttribute('aria-pressed',String(open));expand.textContent=open?'收起通知':'展开通知';});on(zone,'click',e=>{const b=e.target.closest('[data-action=undo]');if(!b)return;const id=Number(b.closest('[data-token]').dataset.token);records=records.filter(r=>r.id!==id);undoCount++;render();q('[data-action=add]').focus({preventScroll:true});});render();
 }
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
