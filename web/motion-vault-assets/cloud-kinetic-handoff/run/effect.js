
/* Independently authored for Motion Vault. No libraries, upstream code, assets or requests. */
(() => {
  'use strict';
  const stage = document.querySelector('.stage');
  const pages = [...document.querySelectorAll('.page')];
  const field = document.querySelector('.transition-field');
  const status = document.querySelector('[role="status"]');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const signal = listeners.signal;
  const params = new URLSearchParams(location.search);
  // An explicit gallery hover may request motion. Standalone still follows the OS.
  const reduced = () => media.matches && params.get('motionIntent') !== 'hover';
  let current = 0, running = false, disposed = false, demoTimer = 0;
  let animations = [], generation = 0, activeTarget = 0;
  let demoEnabled = params.get('demo') === '1', pointerOwns = false;

  function duration() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration')) || 1550;
  }
  function animate(node, frames, options) {
    const animation = node.animate(frames, options);
    animations.push(animation);
    return animation;
  }
  function show(index, moveFocus = false) {
    current = index;
    pages.forEach((page, i) => {
      page.hidden = i !== index;
      page.inert = i !== index;
      page.style.opacity = '';
      page.querySelector('.title').style.visibility = '';
    });
    field.replaceChildren();
    stage.dataset.state = index ? 'flow' : 'form';
    if (moveFocus) pages[index].querySelector('button').focus({preventScroll:true});
    status.textContent = index ? 'Chapter two: Flow.' : 'Chapter one: Form.';
  }
  function cancelTransition() {
    generation++;
    animations.forEach(animation => animation.cancel());
    animations = [];
    running = false;
    show(activeTarget);
  }
  function clearDemo() { clearTimeout(demoTimer); demoTimer = 0; }
  function scheduleDemo() {
    clearDemo();
    if (demoEnabled && !pointerOwns && !reduced() && !disposed && !document.hidden) {
      demoTimer = setTimeout(() => transition(1-current, false), 2700);
    }
  }

  async function transition(target, fromInput = true) {
    if (disposed || target === current && !running) return;
    clearDemo();
    if (running) cancelTransition();
    if (target === current) { scheduleDemo(); return; }
    activeTarget = target;
    if (reduced() || document.hidden) { show(target, fromInput && document.activeElement?.tagName === 'BUTTON'); scheduleDemo(); return; }
    const token = ++generation;
    running = true;
    const oldPage = pages[current], nextPage = pages[target];
    const sourceLetters = [...oldPage.querySelectorAll('.title span')];
    const sourceBoxes = sourceLetters.map(letter => letter.getBoundingClientRect());
    const takeFocus = fromInput && document.activeElement?.tagName === 'BUTTON';
    nextPage.hidden = false;
    nextPage.inert = true;
    nextPage.style.opacity = '0';
    const targetLetters = [...nextPage.querySelectorAll('.title span')];
    const targetBoxes = targetLetters.map(letter => letter.getBoundingClientRect());
    oldPage.querySelector('.title').style.visibility = 'hidden';
    nextPage.querySelector('.title').style.visibility = 'hidden';
    const wash = document.createElement('div'); wash.className = 'field-wash'; field.append(wash);
    const note = document.createElement('div'); note.className = 'transition-note'; note.textContent = target ? 'Structure gives way to movement.' : 'Movement finds a little structure.'; field.append(note);
    const ms = duration(), width = stage.clientWidth, height = stage.clientHeight;
    const direction = target ? 1 : -1;
    const easing = 'cubic-bezier(.64,0,.22,1)';
    animate(wash, [{clipPath:'inset(0 100% 0 0)',offset:0},{clipPath:'inset(0 0 0 0)',offset:.25},{clipPath:'inset(0 0 0 0)',offset:.67},{clipPath:'inset(0 0 0 100%)',offset:1}], {duration:ms,fill:'both',easing});
    animate(note, [{opacity:0},{opacity:1,offset:.38},{opacity:1,offset:.62},{opacity:0}], {duration:ms,fill:'both'});
    animate(oldPage,[{opacity:1},{opacity:0,offset:.35},{opacity:0}],{duration:ms,fill:'forwards'});
    animate(nextPage,[{opacity:0},{opacity:0,offset:.59},{opacity:1}],{duration:ms,fill:'forwards'});
    const travel = sourceLetters.map((letter, index) => {
      const box = sourceBoxes[index], end = targetBoxes[index];
      const fly = document.createElement('div'); fly.className = 'flying-letter';
      const old = document.createElement('span'); old.textContent = letter.textContent;
      const next = document.createElement('span'); next.className = 'next-char'; next.textContent = targetLetters[index].textContent;
      fly.append(old, next); field.append(fly);
      const titleStyle = getComputedStyle(letter);
      const startScale = box.width / letter.offsetWidth;
      Object.assign(fly.style, {left:box.left+'px',top:box.top+'px',fontSize:titleStyle.fontSize,lineHeight:titleStyle.lineHeight,color:getComputedStyle(letter).color,width:letter.offsetWidth+'px',height:box.height+'px'});
      // Glyphs expand into a diagonal typographic field, then resolve at exact title boxes.
      const centerX = width*(.13 + index*.185), centerY = height*(.33 + (index%2)*.21);
      const rotation = (index-2)*-13*direction;
      const scale = index === 4 ? 4.8 : 2.2;
      const middleX = centerX - box.left - letter.offsetWidth*scale/2;
      const middleY = centerY - box.top - box.height*scale/2;
      const first = `translate(0px,0px) rotate(0deg) scale(${startScale},1)`;
      const middle = `translate(${middleX}px,${middleY}px) rotate(${rotation}deg) scale(${scale})`;
      const final = `translate(${end.left-box.left}px,${end.top-box.top}px) rotate(0deg) scale(${end.width/targetLetters[index].offsetWidth},1)`;
      animate(old,[{opacity:1},{opacity:1,offset:.45},{opacity:0,offset:.56},{opacity:0}],{duration:ms,fill:'both'});
      animate(next,[{opacity:0},{opacity:0,offset:.45},{opacity:1,offset:.56},{opacity:1}],{duration:ms,fill:'both'});
      return animate(fly,[{transform:first,offset:0},{transform:middle,offset:.43},{transform:middle,offset:.56},{transform:final,offset:1}],{duration:ms,delay:index*22,fill:'both',easing});
    });
    try { await Promise.all(travel.map(animation=>animation.finished)); } catch { return; }
    if (token !== generation || disposed) return;
    animations.forEach(animation=>animation.cancel()); animations=[]; running=false;
    show(target,takeFocus); scheduleDemo();
  }

  stage.addEventListener('click', event => {
    const button = event.target.closest('[data-go]');
    if (button) transition(Number(button.dataset.go));
  },{signal});
  window.addEventListener('keydown',event=>{
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Escape') {
      event.preventDefault(); pointerOwns=true; clearDemo();
      transition(event.key==='ArrowRight'?1:0);
    }
  },{signal});
  stage.addEventListener('pointermove',event=>{
    if (!event.isTrusted) return;
    pointerOwns=true; clearDemo();
    if (reduced() || running) return;
    const rx = (event.clientY/innerHeight-.5)*-9, ry=(event.clientX/innerWidth-.5)*9;
    stage.style.setProperty('--rx',rx+'deg'); stage.style.setProperty('--ry',ry+'deg');
  },{signal,passive:true});
  stage.addEventListener('pointerdown',()=>{pointerOwns=true;clearDemo();},{signal,passive:true});
  stage.addEventListener('pointerleave',()=>{pointerOwns=false;stage.style.setProperty('--rx','0deg');stage.style.setProperty('--ry','0deg');scheduleDemo();},{signal});
  document.addEventListener('visibilitychange',()=>{
    clearDemo();
    if (document.hidden && running) cancelTransition();
    else scheduleDemo();
  },{signal});
  media.addEventListener('change',()=>{if(reduced()&&running)cancelTransition();scheduleDemo();},{signal});
  window.addEventListener('resize',()=>{if(running)cancelTransition();},{signal});
  function dispose(){if(disposed)return;disposed=true;clearDemo();if(running)cancelTransition();listeners.abort();field.replaceChildren();}
  window.addEventListener('pagehide',dispose,{signal,once:true});
  window.MotionExample = {
    next:()=>transition(1), previous:()=>transition(0),
    demo:()=>{demoEnabled=true;pointerOwns=false;scheduleDemo();},
    stop:()=>{demoEnabled=false;clearDemo();},
    reset:()=>{clearDemo();activeTarget=0;cancelTransition();show(0);},
    dispose,
    get state(){return {page:current,running,disposed,reducedMotion:reduced(),demoEnabled};}
  };
  show(0); scheduleDemo();
})();
