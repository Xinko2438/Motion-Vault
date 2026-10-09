# 折叠面板手风琴平滑伸缩 · 实现定位

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

### src/hybrid/legacy-engine.js:56-65

```js
 }else if(id===33){
  const uid='lab-answer-'+(++demoInstance);setScene('<div class="lab-accordion"><button type="button" data-action="accordion" aria-expanded="false" aria-controls="'+uid+'"><span>动效应该持续多久？</span><span class="lab-plus">+</span></button><div class="lab-answer" id="'+uid+'" aria-hidden="true"><div><p>根据动作距离和使用频率决定。高频操作需要快速反馈；解释空间变化时可以稍慢。这里的内容高度由文字自然撑开。</p></div></div></div>');q('[data-action=accordion]').addEventListener('click',()=>{const b=q('[data-action=accordion]');const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));q('.lab-answer').classList.toggle('open',open);q('.lab-answer').setAttribute('aria-hidden',String(!open));q('.lab-plus').textContent=open?'−':'+'});
 }else if(id===35){
  setScene('<div class="lab-center"><span class="lab-label">DECODE THE MESSAGE</span><div class="lab-scramble" aria-live="polite">AI NATIVE</div><div class="lab-trigger"></div><span class="lab-note">从随机字符逐步收敛</span></div>');let generation=0;const fire=()=>{const own=++generation;const target='AI NATIVE',chars='XZ#+/012345';let frame=0;const tick=()=>{if(own!==generation)return;q('.lab-scramble').textContent=target.split('').map((c,i)=>c===' '?' ':i<frame/2?c:chars[(frame+i*3)%chars.length]).join('');frame++;if(frame<=target.length*2)later(tick,45);else{q('.lab-scramble').textContent=target;root.dataset.complete='true'}};root.dataset.complete='false';tick()};q('.lab-trigger').append(btn('decode','开始解析',fire));
 }else if(id===36){
  root.dataset.revealed='false';setScene('<div class="lab-reveal-under"><span class="lab-label">SCENE 01</span><h3>从这里展开</h3><div class="lab-trigger"></div></div><div class="lab-reveal-cover"><span class="lab-label" style="color:#b5c9a7">SCENE 02</span><h3>新的场景</h3><p>圆形遮罩已完整展开</p></div>');const reveal=e=>{const r=scene.getBoundingClientRect();scene.style.setProperty('--cx',e?.clientX?(e.clientX-r.left)/Math.max(1,r.width)*100+'%':'50%');scene.style.setProperty('--cy',e?.clientY?(e.clientY-r.top)/Math.max(1,r.height)*100+'%':'50%');root.dataset.revealed='true'};q('.lab-trigger').append(btn('reveal','展开下一幕',reveal));scene.addEventListener('click',reveal);
 }else if(id===37){
  root.dataset.open='false';scene.dataset.split='true';setScene('<div class="lab-split-back"><span class="lab-label">A DIFFERENT VIEW</span><h3>新的一幕</h3></div><div class="lab-split-half left">UP</div><div class="lab-split-half right">DOWN</div>');controls.insertBefore(btn('split','切换场景',()=>{root.dataset.open=String(root.dataset.open!=='true')}),replay);
 }else if(id===38){
  const uid='lab-goo-'+(++demoInstance);root.dataset.open='false';setScene('<div class="lab-center"><svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="'+uid+'"><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -8"/></filter></defs></svg><div class="lab-goo" style="filter:url(#'+uid+')"><i class="drop"></i><i class="drop"></i><i class="drop"></i></div><div class="lab-trigger"></div></div>');const b=btn('goo','展开 / 合拢',()=>{root.dataset.open=String(root.dataset.open!=='true');b.setAttribute('aria-pressed',root.dataset.open)});b.setAttribute('aria-pressed','false');q('.lab-trigger').append(b);
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
