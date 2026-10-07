# 全景重力视差空间 · 实现定位

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

### src/hybrid/legacy-engine.js:68-77

```js
 }else if(id===40){
  setScene('<div class="lab-space" tabindex="0" aria-label="移动鼠标查看三层视差"><div class="lab-space-layer">近景</div><div class="lab-space-layer">中景</div><div class="lab-space-layer">远景</div></div><div class="lab-space-controls"><label>水平<input type="range" min="-100" max="100" value="0" aria-label="水平视差"></label><label>垂直<input type="range" min="-100" max="100" value="0" aria-label="垂直视差"></label></div>');const space=q('.lab-space');const ranges=scene.querySelectorAll('input');const move=(x,y)=>{scene.querySelectorAll('.lab-space-layer').forEach((el,i)=>{const z=[18,10,5][i];el.style.transform='translate3d('+x*z+'px,'+y*z+'px,0) rotateX('+(-y*5)+'deg) rotateY('+(x*6)+'deg)'})};space.addEventListener('pointermove',e=>{const r=space.getBoundingClientRect();move(Math.max(-1,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width)*2-1)),Math.max(-1,Math.min(1,(e.clientY-r.top)/Math.max(1,r.height)*2-1)))});space.addEventListener('pointerleave',()=>move(0,0));ranges.forEach(input=>input.addEventListener('input',()=>move(Number(ranges[0].value)/100,Number(ranges[1].value)/100)));move(0,0);
 }
 if(!detail){root.setAttribute('aria-hidden','true');root.querySelectorAll('button,input,[tabindex]').forEach(el=>el.tabIndex=-1)}
 return root;
}


window.VaultLegacy={make:(it,detail)=>{if(LIVE_DEMOS[it.id])return makeLiveDemo(it.id,detail);const el=document.createElement('div');el.className='demo-art';el.innerHTML=it.demo||'';return el;}};})();

```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
