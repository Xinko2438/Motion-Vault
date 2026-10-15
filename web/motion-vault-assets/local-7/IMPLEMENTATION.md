# 快捷键组合触发确认 · 实现定位

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

### src/hybrid/legacy-engine.js:27-36

```js
 }else if(id===7){
  setScene(`<div class="editor-window" tabindex="0" aria-label="快捷键演示区域">${meta('<b>folio.</b>　/　Editorial','Draft · 04')}<div class="editor-tools"><span>↶　↷</span><span>Heading　⌄</span><span>B　<i>I</i>　≡</span><span>100%</span></div><div class="editor-page"><span class="legacy-eyebrow">A NOTE ON DESIGN</span><h3>Small things,<br><em>well made.</em></h3><p>Make room for the details. A little care<br>can change the way something feels.</p><div class="editor-caret"></div></div><div class="editor-command"><span><kbd>Ctrl</kbd> + <kbd>Enter</kbd><small>确认本地排版</small></span><div class="lab-trigger"></div></div><div class="lab-chip" role="status"><span>✓</span> 排版检查已确认 <small>Local demo</small></div></div>`);
  const fire=()=>{q('.lab-chip').classList.add('is-visible');later(()=>q('.lab-chip')?.classList.remove('is-visible'),1200)};q('.lab-trigger').append(btn('shortcut','确认排版 ↗',fire));scene.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();fire()}});
 }else if(id===10){
  setScene(`<aside class="reading-rail"><b>FIELD<br>NOTES</b><span>ESSAY 07</span><div>01<br>│<br>02<br>│<br>03</div><small>COASTAL<br>STUDIES</small></aside><div class="lab-scroll" tabindex="0" aria-label="演示内阅读滚动区"><div class="lab-read-top"><span>THE SHAPE OF THE SHORE</span><progress class="lab-read-progress" max="100" value="0" aria-label="阅读进度"></progress><output class="lab-read-percent">0%</output></div><section><span class="legacy-eyebrow">LAND / WATER / TIME</span><h3>Where land<br><em>meets the sea.</em></h3><div class="coast-illustration">${coast()}</div><p>海岸没有一条永久的边界。水向前走，陆地慢慢退让，岩石把时间留在层层褶皱里。</p></section><section><h4>01 — 潮汐的轮廓</h4><p>退潮之后，细小的水道留在沙面上。站远一点看，它们像一张不断被重画的地图。海水经过同一个地方，却从不留下完全相同的线。</p><p>变化不是噪声，而是这片地貌真正的秩序。</p></section><section><h4>02 — 岩石的时间</h4><p>沿着海岸步行，可以看见坚硬与柔软如何相遇。石头、泥沙与植物各有自己的速度，共同构成眼前安静的层次。</p><p>放慢脚步，才能读懂被日常忽略的细节。</p></section><section><h4>03 — 留给下一次潮汐</h4><p>离开时不需要带走什么。让脚印慢慢被抹平，让下一位经过的人看见新的海岸。</p><span class="legacy-eyebrow">END OF FIELD NOTE / 07</span></section></div>`);
  const scroll=q('.lab-scroll');scroll.addEventListener('scroll',()=>{const p=Math.min(100,Math.round(scroll.scrollTop/Math.max(1,scroll.scrollHeight-scroll.clientHeight)*100));q('.lab-read-progress').value=p;q('.lab-read-percent').textContent=p+'%'});
 }else if(id===11){
  setScene(`${meta('FORM / EXHIBITION','12 OCT 2026')}<div class="attendance-heading"><span class="legacy-eyebrow">VISITORS THIS WEEK</span><span class="attendance-live">● DEMO DATA</span></div><div class="lab-odometer" aria-label="演示入场人数"></div><div class="attendance-bottom"><div><b>+18.6%</b><span>vs. previous week</span></div>${svg('<path d="M0 54L25 46 47 49 71 27 92 31 119 16 140 24 166 5 190 10" fill="none" stroke="#f57953" stroke-width="2"/><path d="M0 67H190" stroke="#484947"/><path d="M0 73V67M47 73V67M94 73V67M141 73V67M190 73V67" stroke="#484947"/>','0 0 192 76','attendance-chart')}</div><div class="attendance-footer"><output class="lab-number-status">当前：0</output><div class="lab-trigger"></div></div>`);
  [2,3,2,8].forEach((n,i)=>{if(i===1){const comma=document.createElement('span');comma.textContent=',';q('.lab-odometer').append(comma)}const cell=document.createElement('div');cell.className='lab-digit';const track=document.createElement('div');track.className='lab-digit-track';for(let k=0;k<10;k++){const glyph=document.createElement('span');glyph.textContent=k;track.append(glyph)}cell.append(track);q('.lab-odometer').append(cell)});
  const fire=()=>{q('.lab-number-status').textContent='正在更新演示…';scene.querySelectorAll('.lab-digit-track').forEach((track,i)=>{track.style.transition='none';track.style.transform='translateY(0)';later(()=>{track.style.transition='transform 1s cubic-bezier(.16,1,.3,1)';track.style.transform='translateY(-'+[2,3,2,8][i]*10+'%)'},30+i*90)});later(()=>{q('.lab-number-status').textContent='当前：2,328';root.dataset.complete='true'},1350)};q('.lab-trigger').append(btn('digits','更新统计 ↻',fire));
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
