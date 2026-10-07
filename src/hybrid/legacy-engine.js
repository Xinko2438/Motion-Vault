(()=>{const LIVE_DEMOS={
4:'点“打开抽屉”，观察侧栏滑出；可以关闭再打开。',
7:'先点击演示区域，再按 Ctrl+Enter；也可点按钮模拟快捷键确认。',
10:'在演示框内向下滚动，观察阅读进度与章节节点变化。',
11:'点“播放数字”，观察各数位从0滚动到2,328；可反复重播。',
12:'在框内滚动至段尾，下一章提示会浮现，点击可切换章节。',
16:'把鼠标移入画面或点播放，观看本地静音示例片段；移出暂停。',
18:'播放后在框内向下滚动，播放器会吸附为小窗；这是组件内模拟。',
28:'用上一步/下一步切换，观察内容按方向平滑滑动。',
31:'悬停、聚焦或点问号显示提示；移开或再点可以收起。',
33:'点击问题展开或收起答案，观察自适应高度变化。',
35:'点“开始解析”，观察随机字符逐个收敛成真实文字。',
36:'点击画面或按钮，从点击位置向外展开圆形遮罩。',
37:'点“切换场景”，左右两半会沿相反方向退出。',
38:'点“展开/合拢”，观察色块拉伸、分离与重新融合。',
39:'点“播放文字”，观察字母按顺序从下方翻转到位。',
40:'在画面内移动鼠标，或拖动下方滑杆，观察不同深度的视差。'
};
let demoInstance=0;
function disposeDemos(scope){scope.querySelectorAll('.lab-demo').forEach(el=>el.dispose?.())}
function makeLiveDemo(id,detail){
 const root=document.createElement('div');root.className='lab-demo'+(detail?'':' is-preview');root.dataset.demoId=id;
 const scene=document.createElement('div');scene.className='lab-scene';root.append(scene);
 const controls=document.createElement('div');controls.className='lab-controls';const hint=document.createElement('p');hint.className='lab-instruction';hint.textContent=LIVE_DEMOS[id];
 const replay=document.createElement('button');replay.type='button';replay.className='lab-replay';replay.textContent='重播演示';controls.append(hint,replay);root.append(controls);
 const timeouts=new Set();let disposed=false;const later=(fn,ms)=>{const t=setTimeout(()=>{timeouts.delete(t);if(!disposed)fn()},ms);timeouts.add(t);return t};
 root.dispose=()=>{disposed=true;timeouts.forEach(clearTimeout);timeouts.clear();root.querySelectorAll('video').forEach(v=>v.pause())};
 replay.addEventListener('click',()=>{root.dispose();root.replaceWith(makeLiveDemo(id,detail))});
 const q=sel=>scene.querySelector(sel);const btn=(name,label,handler)=>{const b=document.createElement('button');b.type='button';b.dataset.action=name;b.textContent=label;b.addEventListener('click',handler);return b};
 const setScene=html=>{scene.innerHTML=html};
 const video=()=>{const v=document.createElement('video');v.src=new URL('../preview.mp4',import.meta.url).href;v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.preload='metadata';v.setAttribute('aria-label','本地生成的静音动态示例片段');v.addEventListener('error',()=>{if(root.querySelector('.lab-video-error'))return;const err=document.createElement('p');err.className='lab-video-error';err.textContent='示例片段未加载，请刷新或检查本地服务。';scene.append(err)});return v};
 const play=v=>{const p=v.play();if(p?.catch)p.catch(()=>{})};
 const article='<section><h4>01 · 从一个清晰的想法开始</h4><p>好的交互让人知道发生了什么，也知道下一步可以做什么。留出阅读空间，帮助视线停留。</p><p>向下滚动，观察界面如何回应位置变化。</p></section><section><h4>02 · 给变化一个合理的节奏</h4><p>内容出现的先后、移动的方向和停下的位置，共同构成了阅读的节奏。</p><p>动效服务于理解，而不是让读者追赶文字。</p></section><section><h4>03 · 在合适的位置收尾</h4><p>结束当前内容时，用轻量提示告诉读者可以继续。</p><p>你已经接近这一段的末尾。</p></section>';
 if(id===4){
  setScene('<div class="lab-pad"><span class="lab-label">WORKSPACE</span><h3>项目概览</h3><p>主工作区保持可见。</p><div class="lab-trigger"></div></div><aside class="lab-drawer" aria-hidden="true"><h3>参考设置</h3><p>预览速度　标准</p><p>布局密度　紧凑</p><div class="lab-close-drawer"></div></aside>');
  const drawer=q('.lab-drawer');const toggle=()=>{const open=drawer.getAttribute('aria-hidden')==='true';drawer.setAttribute('aria-hidden',String(!open));q('[data-action=drawer]').setAttribute('aria-expanded',String(open))};const b=btn('drawer','打开抽屉',toggle);b.setAttribute('aria-expanded','false');q('.lab-trigger').append(b);q('.lab-close-drawer').append(btn('close-drawer','关闭抽屉',toggle));
 }else if(id===7){
  setScene('<div class="lab-center" tabindex="0" aria-label="快捷键演示区域"><span class="lab-label">KEYBOARD FEEDBACK</span><h3>Ctrl + Enter</h3><div class="lab-chip" role="status">操作已确认</div><div class="lab-trigger"></div><span class="lab-note">仅演示反馈，不保存任何文件。</span></div>');
  const fire=()=>{q('.lab-chip').classList.add('is-visible');later(()=>q('.lab-chip')?.classList.remove('is-visible'),1000)};q('.lab-trigger').append(btn('shortcut','模拟快捷键',fire));scene.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();fire()}});
 }else if(id===10||id===12){
  setScene('<div class="lab-scroll" tabindex="0" aria-label="演示内阅读滚动区">'+(id===10?'<div class="lab-read-top"><progress class="lab-read-progress" max="100" value="0" aria-label="阅读进度"></progress><output class="lab-read-percent">0%</output></div>':'')+article+'</div>'+(id===12?'<div class="lab-next-chapter" aria-hidden="true"><span>下一章 · 把想法做出来</span><button type="button" data-action="chapter" disabled>继续阅读</button></div>':''));
  const scroll=q('.lab-scroll');scroll.addEventListener('scroll',()=>{const progress=Math.min(100,Math.max(0,Math.round(scroll.scrollTop/Math.max(1,scroll.scrollHeight-scroll.clientHeight)*100)));if(id===10){q('.lab-read-progress').value=progress;q('.lab-read-percent').textContent=progress+'%'}else{const show=progress>=80;q('.lab-next-chapter').setAttribute('aria-hidden',String(!show));q('[data-action=chapter]').disabled=!show}});
  if(id===12)q('[data-action=chapter]').addEventListener('click',()=>{q('.lab-next-chapter span').textContent='已进入第二章';q('[data-action=chapter]').textContent='已到达';root.dataset.chapter='2'});
 }else if(id===11){
  setScene('<div class="lab-center"><span class="lab-label">TOTAL RECORDS</span><div class="lab-odometer" aria-label="数字滚动演示"></div><output class="lab-number-status">当前：0</output><div class="lab-trigger"></div></div>');
  [2,3,2,8].forEach((n,i)=>{if(i===1){const comma=document.createElement('span');comma.textContent=',';q('.lab-odometer').append(comma)}const cell=document.createElement('div');cell.className='lab-digit';const track=document.createElement('div');track.className='lab-digit-track';for(let k=0;k<10;k++){const glyph=document.createElement('span');glyph.textContent=k;track.append(glyph)}cell.append(track);q('.lab-odometer').append(cell)});
  const fire=()=>{q('.lab-number-status').textContent='正在滚动…';scene.querySelectorAll('.lab-digit-track').forEach((track,i)=>{track.style.transition='none';track.style.transform='translateY(0)';later(()=>{track.style.transition='transform 1s cubic-bezier(.16,1,.3,1)';track.style.transform='translateY(-'+[2,3,2,8][i]*10+'%)'},30+i*90)});later(()=>{q('.lab-number-status').textContent='当前：2,328';root.dataset.complete='true'},1350)};q('.lab-trigger').append(btn('digits','播放数字',fire));
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
 }else if(id===35){
  setScene('<div class="lab-center"><span class="lab-label">DECODE THE MESSAGE</span><div class="lab-scramble" aria-live="polite">AI NATIVE</div><div class="lab-trigger"></div><span class="lab-note">从随机字符逐步收敛</span></div>');let generation=0;const fire=()=>{const own=++generation;const target='AI NATIVE',chars='XZ#+/012345';let frame=0;const tick=()=>{if(own!==generation)return;q('.lab-scramble').textContent=target.split('').map((c,i)=>c===' '?' ':i<frame/2?c:chars[(frame+i*3)%chars.length]).join('');frame++;if(frame<=target.length*2)later(tick,45);else{q('.lab-scramble').textContent=target;root.dataset.complete='true'}};root.dataset.complete='false';tick()};q('.lab-trigger').append(btn('decode','开始解析',fire));
 }else if(id===36){
  root.dataset.revealed='false';setScene('<div class="lab-reveal-under"><span class="lab-label">SCENE 01</span><h3>从这里展开</h3><div class="lab-trigger"></div></div><div class="lab-reveal-cover"><span class="lab-label" style="color:#b5c9a7">SCENE 02</span><h3>新的场景</h3><p>圆形遮罩已完整展开</p></div>');const reveal=e=>{const r=scene.getBoundingClientRect();scene.style.setProperty('--cx',e?.clientX?(e.clientX-r.left)/Math.max(1,r.width)*100+'%':'50%');scene.style.setProperty('--cy',e?.clientY?(e.clientY-r.top)/Math.max(1,r.height)*100+'%':'50%');root.dataset.revealed='true'};q('.lab-trigger').append(btn('reveal','展开下一幕',reveal));scene.addEventListener('click',reveal);
 }else if(id===37){
  root.dataset.open='false';scene.dataset.split='true';setScene('<div class="lab-split-back"><span class="lab-label">A DIFFERENT VIEW</span><h3>新的一幕</h3></div><div class="lab-split-half left">UP</div><div class="lab-split-half right">DOWN</div>');controls.insertBefore(btn('split','切换场景',()=>{root.dataset.open=String(root.dataset.open!=='true')}),replay);
 }else if(id===38){
  const uid='lab-goo-'+(++demoInstance);root.dataset.open='false';setScene('<div class="lab-center"><svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="'+uid+'"><feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -8"/></filter></defs></svg><div class="lab-goo" style="filter:url(#'+uid+')"><i class="drop"></i><i class="drop"></i><i class="drop"></i></div><div class="lab-trigger"></div></div>');const b=btn('goo','展开 / 合拢',()=>{root.dataset.open=String(root.dataset.open!=='true');b.setAttribute('aria-pressed',root.dataset.open)});b.setAttribute('aria-pressed','false');q('.lab-trigger').append(b);
 }else if(id===39){
  setScene('<div class="lab-center"><span class="lab-label">LETTER BY LETTER</span><div class="lab-flip-word" aria-label="MOTION"></div><div class="lab-trigger"></div></div>');'MOTION'.split('').forEach((c,i)=>{const el=document.createElement('span');el.textContent=c;el.style.setProperty('--i',i);el.setAttribute('aria-hidden','true');q('.lab-flip-word').append(el)});const fire=()=>{q('.lab-flip-word').classList.remove('playing');void q('.lab-flip-word').offsetWidth;q('.lab-flip-word').classList.add('playing')};q('.lab-trigger').append(btn('letters','播放文字',fire));
 }else if(id===40){
  setScene('<div class="lab-space" tabindex="0" aria-label="移动鼠标查看三层视差"><div class="lab-space-layer">近景</div><div class="lab-space-layer">中景</div><div class="lab-space-layer">远景</div></div><div class="lab-space-controls"><label>水平<input type="range" min="-100" max="100" value="0" aria-label="水平视差"></label><label>垂直<input type="range" min="-100" max="100" value="0" aria-label="垂直视差"></label></div>');const space=q('.lab-space');const ranges=scene.querySelectorAll('input');const move=(x,y)=>{scene.querySelectorAll('.lab-space-layer').forEach((el,i)=>{const z=[18,10,5][i];el.style.transform='translate3d('+x*z+'px,'+y*z+'px,0) rotateX('+(-y*5)+'deg) rotateY('+(x*6)+'deg)'})};space.addEventListener('pointermove',e=>{const r=space.getBoundingClientRect();move(Math.max(-1,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width)*2-1)),Math.max(-1,Math.min(1,(e.clientY-r.top)/Math.max(1,r.height)*2-1)))});space.addEventListener('pointerleave',()=>move(0,0));ranges.forEach(input=>input.addEventListener('input',()=>move(Number(ranges[0].value)/100,Number(ranges[1].value)/100)));move(0,0);
 }
 if(!detail){root.setAttribute('aria-hidden','true');root.querySelectorAll('button,input,[tabindex]').forEach(el=>el.tabIndex=-1)}
 return root;
}


window.VaultLegacy={make:(it,detail)=>{if(LIVE_DEMOS[it.id])return makeLiveDemo(it.id,detail);const el=document.createElement('div');el.className='demo-art';el.innerHTML=it.demo||'';return el;}};})();
