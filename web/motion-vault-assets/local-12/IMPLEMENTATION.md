# 段尾下一章隐喻浮现 · 实现定位

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

### src/hybrid/legacy-engine.js:37-46

```js
 }else if(id===12){
  setScene(`<div class="essay-side"><span>THE SLOW<br>JOURNAL</span><b>02</b><small>ON SEEING</small></div><div class="lab-scroll" tabindex="0" aria-label="演示内阅读滚动区"><section class="essay-intro"><span class="legacy-eyebrow">A SHORT ESSAY / 6 MIN READ</span><h3>The art of<br><em>noticing.</em></h3><p class="essay-lead">有些风景，需要第二次注视。</p><p>清晨的影子落在空白的墙上。没有特别的事情发生，光却让同一个房间有了新的比例。</p><p>我们常常急着记录，却忘记先看一会儿。把相机放低，让眼睛重新适应缓慢。</p></section><section><h4>留白也是一种发现</h4><p>一张照片的边缘，有时比中心更值得停留。未被讲完的部分邀请我们进入，让日常拥有更多可能。</p><p>当我们不再急着给事物命名，细节就开始自己说话。墙的纹理、树叶的缺口、桌面上不对称的光，都值得被认真看见。</p></section><section class="essay-end"><h4>把目光留在当下</h4><p>好的观察，不是捕捉更多，而是愿意和一个简单的瞬间待得更久。</p><span class="legacy-eyebrow">END OF CHAPTER TWO</span><div class="essay-end-mark">∗</div></section></div><div class="lab-next-chapter" aria-hidden="true"><span><small>UP NEXT / 03</small>Light, after all.</span><button type="button" data-action="chapter" disabled>继续阅读 ↗</button></div>`);
  const scroll=q('.lab-scroll');scroll.addEventListener('scroll',()=>{const show=scroll.scrollTop/Math.max(1,scroll.scrollHeight-scroll.clientHeight)>=.8;q('.lab-next-chapter').setAttribute('aria-hidden',String(!show));q('[data-action=chapter]').disabled=!show});q('[data-action=chapter]').addEventListener('click',()=>{q('.lab-next-chapter span').textContent='Chapter 03 · Light, after all.';q('[data-action=chapter]').textContent='已到达 ✓';root.dataset.chapter='2'});
 }else if(id===16){
  setScene(`${meta('FRAME / EXPERIMENTAL FILM','PROGRAMME 01')}<div class="lab-video-box" data-playing="false"><div class="lab-video-cover">${imageArt('red-fold','原创生成的红色折面雕塑影片封面')}<strong>Forms in<br><em>motion.</em></strong><span>ORIGINAL MOTION STUDY</span></div><span class="lab-video-label">原创生成影像 · 无音轨</span></div><div class="film-caption"><b>A study in shape & light</b><span>2026　/　LOOP　/　HD</span></div>`);const v=video(),box=q('.lab-video-box');box.prepend(v);const b=btn('video','播放 ↗',()=>{if(v.paused)play(v);else v.pause()});b.className='lab-video-toggle';box.append(b);v.addEventListener('playing',()=>{box.dataset.playing='true';b.textContent='暂停 Ⅱ'});v.addEventListener('pause',()=>{box.dataset.playing='false';b.textContent='播放 ↗'});if(detail){box.addEventListener('mouseenter',()=>play(v));box.addEventListener('mouseleave',()=>v.pause());box.addEventListener('focusin',()=>play(v))}
 }else if(id===18){
  setScene(`${meta('<b>STILL / LIFE</b>','Journal　　Film　　About')}<div class="lab-scroll lab-pip-scroll" tabindex="0" aria-label="画中画演示滚动区"><section><span class="legacy-eyebrow">PROCESS FILM / 04</span><h3>Made slowly,<br><em>made to stay.</em></h3><div class="pip-video-reserve"></div><p>从草图到材料，好的物件总要经过一次又一次耐心的试验。边看短片，边了解形态是怎样被留下来的。</p></section><section><h4>01 / 材料的语言</h4><p>表面会记录制作过程。不同的切面如何接住光线，取决于尺度、角度与留白的细微平衡。</p><p>继续向下阅读，影片仍在右下角播放。</p></section><section><h4>02 / 让细节说话</h4><p>设计的完成，不是再增加一点什么，而是每一部分都有充分存在的理由。</p><p>这是一段由原创生成影像制作的本地静音运镜示例。</p></section></div><div class="lab-player"></div>`);const v=video(),player=q('.lab-player');player.append(v);const b=btn('pip-play','播放 ↗',()=>{if(v.paused){play(v);b.textContent='暂停 Ⅱ'}else{v.pause();b.textContent='播放 ↗'}});player.append(b);q('.lab-scroll').addEventListener('scroll',e=>{const small=e.target.scrollTop>110;player.classList.toggle('is-mini',small);root.dataset.pip=String(small)});root.dataset.pip='false';
 }else if(id===28){
  scene.classList.add('lab-steps-scene');setScene(`${meta('<b>folio.</b>　/　New publication','LOCAL PREVIEW')}<div class="publication-rail"><span>YOUR NEXT EDITION</span><div class="publication-cover"><small>COLLECTED<br>OBSERVATIONS</small><b>On<br><em>form.</em></b><span>VOL. 01</span></div><small>Studio notes / 2026</small></div><div class="lab-step-viewport"><div class="lab-step-track"><div class="lab-step"><span class="legacy-eyebrow">01 / FORMAT</span><h3>Start with<br>the right size.</h3><div class="format-options"><div class="active"><b>A5</b><small>148 × 210 mm</small></div><div><b>A4</b><small>210 × 297 mm</small></div></div><p>为这本小刊选择轻便的阅读尺寸。</p></div><div class="lab-step" aria-hidden="true"><span class="legacy-eyebrow">02 / REVIEW</span><h3>A final<br>look through.</h3><div class="publication-check">✓ Cover artwork <span>Ready</span><br>✓ 24 pages <span>Checked</span><br>✓ Fonts <span>Local</span></div><p>封面、页数与版式已准备好。</p></div><div class="lab-step" aria-hidden="true"><span class="legacy-eyebrow">03 / READY</span><h3>Good to<br><em>go.</em></h3><div class="publication-ready"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12L9 17L20 6" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></div><p>演示完成。没有创建或发布文件。</p></div></div></div><div class="lab-step-nav"><button type="button" data-action="back" disabled>← 上一步</button><output class="lab-step-count">1 / 3</output><button type="button" data-action="next">下一步 →</button></div>`);let step=0;const move=n=>{step=Math.max(0,Math.min(2,step+n));q('.lab-step-track').style.transform='translateX(-'+step*100/3+'%)';q('.lab-step-count').textContent=(step+1)+' / 3';q('[data-action=back]').disabled=step===0;q('[data-action=next]').disabled=step===2;scene.querySelectorAll('.lab-step').forEach((x,i)=>x.setAttribute('aria-hidden',String(i!==step)))};q('[data-action=next]').addEventListener('click',()=>move(1));q('[data-action=back]').addEventListener('click',()=>move(-1));
 }else if(id===30){
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
