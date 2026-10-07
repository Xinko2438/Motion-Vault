# 鼠标悬停静音动效预览 · 实现定位

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

### src/hybrid/legacy-engine.js:48-57

```js
 }else if(id===16){
  setScene('<div class="lab-video-box" data-playing="false"><div class="lab-video-cover"><strong>Motion study</strong><span>悬停试看 / 点击播放</span></div><span class="lab-video-label">本地示例片段 · 无音轨</span></div>');const v=video();const box=q('.lab-video-box');box.prepend(v);const b=btn('video','播放',()=>{if(v.paused)play(v);else v.pause()});b.className='lab-video-toggle';box.append(b);v.addEventListener('playing',()=>{box.dataset.playing='true';b.textContent='暂停'});v.addEventListener('pause',()=>{box.dataset.playing='false';b.textContent='播放'});if(detail){box.addEventListener('mouseenter',()=>play(v));box.addEventListener('mouseleave',()=>v.pause());box.addEventListener('focusin',()=>play(v))}
 }else if(id===18){
  setScene('<div class="lab-scroll lab-pip-scroll" tabindex="0" aria-label="画中画演示滚动区">'+article+'</div><div class="lab-player"></div>');const v=video();const player=q('.lab-player');player.append(v);const b=btn('pip-play','播放',()=>{if(v.paused){play(v);b.textContent='暂停'}else{v.pause();b.textContent='播放'}});player.append(b);q('.lab-scroll').addEventListener('scroll',e=>{const small=e.target.scrollTop>110;player.classList.toggle('is-mini',small);root.dataset.pip=String(small)});root.dataset.pip='false';
 }else if(id===28){
  scene.classList.add('lab-steps-scene');setScene('<div class="lab-step-viewport"><div class="lab-step-track"><div class="lab-step"><strong>01</strong><h3>选择场景</h3><p>确定这次交互要帮助谁。</p></div><div class="lab-step" aria-hidden="true"><strong>02</strong><h3>调整节奏</h3><p>让变化有方向，也有停顿。</p></div><div class="lab-step" aria-hidden="true"><strong>03</strong><h3>准备完成</h3><p>返回前一步，观察反向运动。</p></div></div></div><div class="lab-step-nav"><button type="button" data-action="back" disabled>上一步</button><output class="lab-step-count">1 / 3</output><button type="button" data-action="next">下一步</button></div>');let step=0;const move=n=>{step=Math.max(0,Math.min(2,step+n));q('.lab-step-track').style.transform='translateX(-'+step*100/3+'%)';q('.lab-step-count').textContent=(step+1)+' / 3';q('[data-action=back]').disabled=step===0;q('[data-action=next]').disabled=step===2;scene.querySelectorAll('.lab-step').forEach((x,i)=>x.setAttribute('aria-hidden',String(i!==step)))};q('[data-action=next]').addEventListener('click',()=>move(1));q('[data-action=back]').addEventListener('click',()=>move(-1));
 }else if(id===31){
  const uid='lab-tip-'+(++demoInstance);setScene('<div class="lab-center"><div class="lab-help-anchor"><span>什么是缓动？</span><button type="button" aria-label="显示缓动说明" aria-describedby="'+uid+'" aria-expanded="false">?</button><div class="lab-tooltip" id="'+uid+'" role="tooltip" hidden>缓动决定动画怎样加速和减速。让动作起止更自然，而不改变最终位置。</div></div></div>');const b=q('button'),tip=q('.lab-tooltip');const show=v=>{tip.hidden=!v;b.setAttribute('aria-expanded',String(v))};let pinned=false;b.addEventListener('mouseenter',()=>show(true));b.addEventListener('mouseleave',()=>{if(!pinned)show(false)});b.addEventListener('focus',()=>show(true));b.addEventListener('blur',()=>{pinned=false;show(false)});b.addEventListener('click',()=>{pinned=!pinned;show(pinned)});
 }else if(id===33){
  const uid='lab-answer-'+(++demoInstance);setScene('<div class="lab-accordion"><button type="button" data-action="accordion" aria-expanded="false" aria-controls="'+uid+'"><span>动效应该持续多久？</span><span class="lab-plus">+</span></button><div class="lab-answer" id="'+uid+'" aria-hidden="true"><div><p>根据动作距离和使用频率决定。高频操作需要快速反馈；解释空间变化时可以稍慢。这里的内容高度由文字自然撑开。</p></div></div></div>');q('[data-action=accordion]').addEventListener('click',()=>{const b=q('[data-action=accordion]');const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));q('.lab-answer').classList.toggle('open',open);q('.lab-answer').setAttribute('aria-hidden',String(!open));q('.lab-plus').textContent=open?'−':'+'});
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
