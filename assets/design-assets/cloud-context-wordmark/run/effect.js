
/* Original section-aware wordmark. Each letter responds to the section boundary, not a loop. */
(() => {
  'use strict';
  const viewport = document.querySelector('.viewport');
  const scroller = document.querySelector('#scroller');
  const wordmark = document.querySelector('.wordmark');
  const letters = [...document.querySelectorAll('.letter')];
  const panels = [...document.querySelectorAll('.panel')];
  const nav = [...document.querySelectorAll('.scroll-nav button')];
  const status = document.querySelector('[role="status"]');
  const currentLabel = document.querySelector('.current');
  const captions = ['A study in attention','A considered practice','Always becoming'];
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const params = new URLSearchParams(location.search);
  const reduced = () => media.matches && params.get('motionIntent') !== 'hover';
  const listeners = new AbortController(), signal = listeners.signal;
  let frame = 0, glideFrame = 0, demoTimer = 0, current = -1;
  let disposed = false, pointerOwns = false, demoEnabled = params.get('demo')==='1';
  let demoDirection = 1;
  const clamp = (value,min=0,max=1)=>Math.max(min,Math.min(max,value));
  const smooth = x => x*x*(3-2*x);
  const rootStyle = () => getComputedStyle(document.documentElement);

  function update() {
    frame=0;
    if(disposed || document.hidden) return;
    const height = scroller.clientHeight, width = scroller.clientWidth;
    const scroll = scroller.scrollTop;
    const progress = clamp(scroll/(scroller.scrollHeight-height));
    const collapse = smooth(clamp(scroll/(height*.62)));
    const small = width<=600 || height<=400;
    viewport.style.setProperty('--collapse',String(collapse));
    const fontSize = parseFloat(getComputedStyle(wordmark).fontSize);
    viewport.style.setProperty('--caption-opacity',String(1-clamp(collapse*2.3)));
    viewport.style.setProperty('--progress',String(Math.max(.03,progress)));
    const headerY = height*(small?.04:.034)+fontSize*.45;
    const color = scroll+headerY>=height && scroll+headerY<height*2 ? '#f4f3ed':'#272925';
    viewport.style.setProperty('--context-ink',color);
    const footerSample = scroll+height*.96;
    viewport.style.setProperty('--footer-ink',footerSample>=height && footerSample<height*2?'#f4f3ed':'#272925');
    const rollDistance = parseFloat(rootStyle().getPropertyValue('--roll-distance')) || 45;
    letters.forEach((letter,index)=>{
      // Delay each glyph's handover: the horizontal seam ripples across the wordmark.
      const delay = (index-(letters.length-1)/2)*fontSize*.20;
      const sample = scroll+headerY-delay;
      const section = Math.floor(clamp(sample/height,0,2.999));
      const ink = index===letters.length-1 ? (section===1?'#dea78b':'#b95734') : (section===1?'#f4f3ed':'#272925');
      const nearBoundary = Math.min(Math.abs(sample-height),Math.abs(sample-height*2));
      const roll = Math.max(0,1-nearBoundary/(fontSize*1.4));
      const eased = Math.sin(roll*Math.PI/2);
      letter.style.setProperty('--letter-ink',ink);
      letter.style.setProperty('--roll',reduced()?'0deg':(-78*eased)+'deg');
      letter.style.setProperty('--shift',reduced()?'0px':(-rollDistance*eased*(small?.4:1))+'px');
      letter.style.setProperty('--lean',reduced()?'0deg':((index-3.5)*eased*1.8)+'deg');
      letter.style.opacity = reduced() ? '1' : String(1-eased*.65);
    });
    const section = clamp(Math.floor((scroll+height*.48)/height),0,2);
    if (section!==current) {
      current=section;
      nav.forEach((button,index)=>button.setAttribute('aria-current',String(index===section)));
      currentLabel.textContent=captions[section];
      status.textContent=`Chapter ${section+1}: ${panels[section].getAttribute('aria-label')}.`;
    }
  }
  function scheduleUpdate(){if(!frame&&!disposed&&!document.hidden)frame=requestAnimationFrame(update);}
  function stopGlide(){cancelAnimationFrame(glideFrame);glideFrame=0;}
  function clearDemo(){clearTimeout(demoTimer);demoTimer=0;}
  function scheduleDemo(){
    clearDemo();
    if(!demoEnabled||pointerOwns||disposed||document.hidden||reduced())return;
    demoTimer=setTimeout(()=>{
      if(current===2)demoDirection=-1;
      if(current===0)demoDirection=1;
      goTo(current+demoDirection,false);
    },2300);
  }
  function goTo(index,fromInput=true){
    if(disposed)return;
    index=clamp(index,0,2); stopGlide(); clearDemo();
    const target=panels[index].offsetTop;
    if(fromInput){pointerOwns=true;}
    if(reduced() || document.hidden){scroller.scrollTop=target;update();scheduleDemo();return;}
    const from=scroller.scrollTop;
    const duration=parseFloat(rootStyle().getPropertyValue('--scroll-duration'))||1700;
    const start=performance.now();
    function tick(now){
      if(disposed||document.hidden){glideFrame=0;return;}
      const t=clamp((now-start)/duration);
      const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      scroller.scrollTop=from+(target-from)*eased;
      if(t<1)glideFrame=requestAnimationFrame(tick);
      else{glideFrame=0;scheduleDemo();}
    }
    glideFrame=requestAnimationFrame(tick);
  }
  function takeControl(){pointerOwns=true;stopGlide();clearDemo();}
  scroller.addEventListener('scroll',scheduleUpdate,{passive:true,signal});
  viewport.addEventListener('click',event=>{
    const target=event.target.closest('[data-section-go]');
    if(target)goTo(Number(target.dataset.sectionGo));
  },{signal});
  viewport.addEventListener('wheel',takeControl,{passive:true,signal});
  viewport.addEventListener('touchstart',takeControl,{passive:true,signal});
  viewport.addEventListener('pointerdown',takeControl,{passive:true,signal});
  viewport.addEventListener('pointermove',event=>{
    if(event.isTrusted&&demoEnabled){takeControl();}
  },{passive:true,signal});
  viewport.addEventListener('pointerleave',()=>{pointerOwns=false;scheduleDemo();},{signal});
  window.addEventListener('keydown',event=>{
    if(event.altKey||event.ctrlKey||event.metaKey)return;
    const isButton=event.target.closest('button');
    if(event.key===' '&&isButton)return;
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)){
      event.preventDefault();takeControl();
      if(event.key==='Home')goTo(0);
      else if(event.key==='End')goTo(2);
      else if(event.key==='ArrowUp'||event.key==='PageUp')goTo(current-1);
      else goTo(current+1);
    }
  },{signal});
  window.addEventListener('resize',scheduleUpdate,{signal});
  media.addEventListener('change',()=>{stopGlide();scheduleUpdate();scheduleDemo();},{signal});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){stopGlide();clearDemo();cancelAnimationFrame(frame);frame=0;}
    else{scheduleUpdate();scheduleDemo();}
  },{signal});
  function dispose(){
    if(disposed)return;disposed=true;
    stopGlide();clearDemo();cancelAnimationFrame(frame);frame=0;listeners.abort();
  }
  window.addEventListener('pagehide',dispose,{signal,once:true});
  window.MotionExample={
    goTo:index=>goTo(index),
    demo:()=>{demoEnabled=true;pointerOwns=false;scheduleDemo();},
    stop:()=>{demoEnabled=false;clearDemo();stopGlide();},
    reset:()=>{stopGlide();clearDemo();scroller.scrollTop=0;pointerOwns=false;update();},
    dispose,
    get state(){return{section:current,scrollTop:scroller.scrollTop,disposed,reducedMotion:reduced(),demoEnabled,gliding:!!glideFrame};}
  };
  update();scheduleDemo();
})();
