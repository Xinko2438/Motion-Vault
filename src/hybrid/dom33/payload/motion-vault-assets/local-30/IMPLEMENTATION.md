# 校验错误微震颤警示 · 实现定位

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

### src/hybrid/legacy-engine.js:46-55

```js
 }else if(id===30){
  setScene(`<div class="reservation-art"><span>OPEN<br>STUDIO</span><div class="reservation-flower">✳</div><small>AN AFTERNOON<br>OF NEW IDEAS.</small><b>OCT<br>24</b></div><div class="reservation-form"><span class="legacy-eyebrow">SAVE YOUR PLACE</span><h3>You're invited.</h3><p>一起看看，新想法如何发生。</p><label for="demo-email-${demoInstance}">Email address</label><div class="validation-field"><input id="demo-email-${demoInstance}" type="email" value="hello@" aria-invalid="true" aria-describedby="demo-error-${demoInstance}" autocomplete="off"><span>!</span></div><p class="validation-error" id="demo-error-${demoInstance}" role="status">请补全邮箱，例如 hello@example.com</p><div class="lab-trigger"></div><small class="reservation-note">本地校验演示 · 不会提交或预约</small></div>`);const check=()=>{const input=q('input'),valid=input.validity.valid&&input.value.length>0;input.setAttribute('aria-invalid',String(!valid));q('.validation-field').classList.toggle('valid',valid);q('.validation-field').classList.remove('is-shaking');void q('.validation-field').offsetWidth;if(!valid)q('.validation-field').classList.add('is-shaking');q('.validation-field span').textContent=valid?'✓':'!';q('.validation-error').textContent=valid?'格式正确，演示校验已通过。':'请补全邮箱，例如 hello@example.com';root.dataset.valid=String(valid)};q('.lab-trigger').append(btn('validate','校验邮箱 ↗',check));q('input').addEventListener('keydown',e=>{if(e.key==='Enter')check()});
 }else if(id===31){
  const uid='lab-tip-'+(++demoInstance);setScene(`${meta('<b>OBJECT / LAB</b>','STUDY 003 / STONE & SILVER')}<div class="camera-preview">${imageArt('stone-wide','原创生成的玄武岩与银白薄壳雕塑','camera-study-image')}<span>Stone &amp; silver <small>ORIGINAL IMAGE STUDY</small></span></div><div class="camera-settings"><span class="legacy-eyebrow">IMAGE PARAMETERS</span><h3>Light. Texture.<br>Detail.</h3><dl><div><dt>Camera</dt><dd>Virtual studio</dd></div><div><dt>Focal length</dt><dd>50 mm</dd></div><div><dt>Shutter</dt><dd>1 / 125 s</dd></div><div><dt><div class="lab-help-anchor"><span>Aperture</span><button type="button" aria-label="显示光圈说明" aria-describedby="${uid}" aria-expanded="false">?</button><div class="lab-tooltip" id="${uid}" role="tooltip" hidden><b>Aperture / 光圈</b>光圈控制进光量和景深。数值越小，背景通常越柔和。</div></div></dt><dd>ƒ / 2.8</dd></div></dl><span class="camera-footnote">参数示例 · 原创生成影像</span></div>`);const b=q('.lab-help-anchor button'),tip=q('.lab-tooltip');const show=v=>{tip.hidden=!v;b.setAttribute('aria-expanded',String(v))};let pinned=false;b.addEventListener('mouseenter',()=>show(true));b.addEventListener('mouseleave',()=>{if(!pinned)show(false)});b.addEventListener('focus',()=>show(true));b.addEventListener('blur',()=>{pinned=false;show(false)});b.addEventListener('click',()=>{pinned=!pinned;show(pinned)});
 }else if(id===33){
  const uid='lab-answer-'+(++demoInstance);setScene(`${meta('MATERIAL / MATTERS','OBJECT 003')}<div class="material-intro"><span class="legacy-eyebrow">BUILT TO LAST</span><h3>Honest<br><em>by nature.</em></h3><div class="material-sample"><i></i><i></i><i></i></div><small>ASH WOOD / NATURAL FINISH</small></div><div class="material-sections"><div class="material-row"><span>01　The idea</span></div><div class="lab-accordion"><button type="button" data-action="accordion" aria-expanded="false" aria-controls="${uid}"><span>02　The material</span><span class="lab-plus">+</span></button><div class="lab-answer" id="${uid}" aria-hidden="true"><div><p>白蜡木保留天然纹理，以哑光植物油完成表面处理。每一道细微的色差都是材料本来的样子。</p><span>Solid ash · Oil finish · Repairable</span></div></div></div><div class="material-row"><span>03　Made with care</span></div><p class="material-description">A small collection of everyday objects,<br>designed for a longer life.</p></div>`);q('[data-action=accordion]').addEventListener('click',()=>{const b=q('[data-action=accordion]'),open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));q('.lab-answer').classList.toggle('open',open);q('.lab-answer').setAttribute('aria-hidden',String(!open));q('.lab-plus').textContent=open?'−':'+'});
 }else if(id===35){
  setScene(`${meta('<b>RESOLVE / TYPE STUDIES</b>','Experimental type / 001')}<div class="decode-art">${svg('<path d="M269 43L423 123 352 278 188 209Z" fill="#c2c9bf"/><path d="M269 43L285 168 188 209Z" fill="#5e6766"/><path d="M269 43L423 123 285 168Z" fill="#eff2e8"/><path d="M285 168L423 123 352 278Z" fill="#919d94"/><g fill="none" stroke="#1a211e" opacity=".55">'+Array.from({length:18},(_,i)=>`<path d="M${160+i*5} ${81+i*7}L${317+i*5} ${46+i*7}L${391-i*2} ${206+i*3}"/>`).join('')+'</g>')}</div><span class="decode-label">MAKE SENSE<br>OF THE SIGNAL.</span><div class="lab-scramble" data-decode-target="RESOLVE" aria-live="polite">RESOLVE</div><div class="decode-bottom"><span>Clarity is a process.<br><small>Original typographic study / 2026</small></span><div class="lab-trigger"></div></div><span class="decode-side">INPUT → INTERPRET → UNDERSTAND</span>`);let generation=0;const fire=()=>{const own=++generation,target=q('.lab-scramble').dataset.decodeTarget,chars='XZ#+/012345';let frame=0;const tick=()=>{if(own!==generation)return;q('.lab-scramble').textContent=target.split('').map((c,i)=>c===' '?' ':i<frame/2?c:chars[(frame+i*3)%chars.length]).join('');frame++;if(frame<=target.length*2)later(tick,45);else{q('.lab-scramble').textContent=target;root.dataset.complete='true'}};root.dataset.complete='false';tick()};q('.lab-trigger').append(btn('decode','解析标题 ↗',fire));
 }else if(id===36){
  root.dataset.revealed='false';setScene(`<div class="lab-reveal-under">${imageArt('red-wide','原创生成的红色折面雕塑')}${meta('MONOLITH / FORM STUDIES','01 — RED MATTER')}<div class="mineral-title"><small>AN EXPLORATION OF</small><h3>Weight<br>& light.</h3></div><div class="lab-trigger"></div><span class="mineral-footer">ORIGINAL GENERATED ARTWORK / 2026</span></div><div class="lab-reveal-cover">${imageArt('stone-wide','原创生成的玄武岩与银白薄壳雕塑')}${meta('MONOLITH / FORM STUDIES','02 — STONE & SILVER')}<div class="mineral-title"><small>THE OTHER SIDE OF</small><h3>Shape<br>& shadow.</h3></div><span class="mineral-footer">A NEW PERSPECTIVE / CLICK TO REPLAY</span></div>`);const reveal=e=>{if(root.dataset.revealed==='true'){root.dataset.revealed='false';return;}const r=scene.getBoundingClientRect();const hasPoint=e&&Number.isFinite(e.clientX)&&e.detail!==0;scene.style.setProperty('--cx',hasPoint?(e.clientX-r.left)/Math.max(1,r.width)*100+'%':'50%');scene.style.setProperty('--cy',hasPoint?(e.clientY-r.top)/Math.max(1,r.height)*100+'%':'50%');root.dataset.revealed='true'};q('.lab-trigger').append(btn('reveal','下一件作品 ↗',reveal));scene.addEventListener('click',e=>{if(!e.target.closest('[data-action=reveal]'))reveal(e)});
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
