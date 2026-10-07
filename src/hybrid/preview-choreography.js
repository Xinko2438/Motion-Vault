// Visual preview timelines only. These never click a control, capture a pointer, or move focus.
// The full manual interaction remains in legacy-engine.js / modern-engine.js.
(()=>{
 const clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>{v=clamp(v);return v*v*(3-2*v)},seg=(t,a,b)=>ease((t-a)/(b-a)),pulse=t=>(1-Math.cos(t*Math.PI*2))/2;
 function duration(it){if(it.key)return it.key==='hold'?6400:it.key==='chart'||it.key==='toast'?5800:window.VaultEngine.duration(it.key);return({2:1800,4:3400,7:2800,10:6200,11:3600,12:6800,18:6000,19:2200,24:6200,28:7200,30:2400,33:4200,35:3000,36:4200,37:3800,38:4200,39:3800})[it.id]||4800;}
 function paint(it,element,t){
  t=clamp(t);const root=it.key?element.firstElementChild:element;if(!root)return;
  const q=s=>root.querySelector(s),all=s=>[...root.querySelectorAll(s)];root.dataset.previewPhase=t.toFixed(5);
  if(it.key){
   if(it.key==='hold'){
    // Complete once, pause for recognition, then demonstrate an interrupted hold before restarting.
    let progress=0,status='按住确认',label='悬停自动演示 · 实际操作可中途取消',done=false;
    if(t<.22){progress=seg(t,.015,.22);status='保持按住';}
    else if(t<.44){progress=1;status='已确认';label='已完成演示，没有执行实际操作。';done=true;}
    else if(t<.67){progress=.58*seg(t,.50,.67);status='保持按住';label='松开即可取消';}
    else if(t<.84){progress=.58*(1-seg(t,.67,.75));label='已取消，没有执行实际操作。';}
    q('.e-hold-fill').style.transform=`scaleX(${progress})`;q('.e-hold-progress').setAttribute('aria-valuenow',Math.round(progress*100));q('.e-hold-label').textContent=status;q('.e-hold-status').textContent=label;q('.e-hold-button').dataset.done=String(done);root.dataset.progress=progress.toFixed(3);return;
   }
   if(it.preview_mode==='pointer'){
     const x=.5+Math.sin(t*Math.PI*2)*.29,y=.5+Math.cos(t*Math.PI*2)*.22;
     const p=['lens','wave'].includes(it.key)?{x,y}:{x:x*540,y:y*340,vx:Math.cos(t*Math.PI*2)*15,vy:-Math.sin(t*Math.PI*2)*12};
     window.VaultEngine.paint(it.key,root,t,p);return;
   }
   if(['peel','bezier','swipe','color'].includes(it.key)){
    const u=pulse(t);
    if(it.key==='swipe'){q('.e-swipe-item').style.transform='translateX('+(-154*seg(u,.07,.8))+'px)';q('[data-swipe-toggle]').textContent=u>.5?'收起操作':'展开操作';return;}
    if(it.key==='bezier'){const p0=[160+Math.sin(t*Math.PI*2)*65,135-Math.cos(t*Math.PI*2)*65],p1=[365-Math.sin(t*Math.PI*2)*45,210+Math.cos(t*Math.PI*2)*55];q('.e-bezier-curve').setAttribute('d','M80 245C'+p0+' '+p1+' 455 90');q('.e-bezier-guide').setAttribute('d','M80 245L'+p0+'M455 90L'+p1);all('[data-bezier-handle]').forEach((el,i)=>{el.setAttribute('cx',[p0,p1][i][0]);el.setAttribute('cy',[p0,p1][i][1])});return;}
    if(it.key==='color'){const sat=.2+.65*u,val=.7+.2*Math.sin(t*Math.PI*2),ch=val*sat,xx=ch*(1-Math.abs(215/60%2-1)),min=val-ch,hex='#'+[0,xx,ch].map(v=>Math.round((v+min)*255).toString(16).padStart(2,'0')).join('').toUpperCase();q('.e-color-knob').style.left=(sat*100)+'%';q('.e-color-knob').style.top=((1-val)*100)+'%';q('.e-color-swatch').style.background=hex;q('.e-color-read output').textContent=hex;q('.e-color-values').textContent='S '+Math.round(sat*100)+' · B '+Math.round(val*100);return;}
    if(it.key==='peel'){const value=.04+u*.71,cut=675-value*360,poly=[[145,60],[395,60],[395,280],[145,280]];const clip=inside=>{const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=a[0]+a[1]-cut,fb=b[0]+b[1]-cut,ia=inside?fa<=0:fa>=0,ib=inside?fb<=0:fb>=0;if(ia)out.push(a);if(ia!==ib){const p=fa/(fa-fb);out.push([a[0]+(b[0]-a[0])*p,a[1]+(b[1]-a[1])*p])}}return out;};q('.e-peel-clip').setAttribute('points',clip(true).map(p=>p.join(',')).join(' '));q('.e-peel-flap').setAttribute('points',clip(false).map(([x,y])=>[cut-y,cut-x].join(',')).join(' '));q('.e-peel-handle').setAttribute('cx',395-value*180);q('.e-peel-handle').setAttribute('cy',280-value*180);return;}
   }
   window.VaultEngine.paint(it.key,root,t);return;
  }
  const open=seg(t,.03,.15)*(1-seg(t,.64,.82));
  switch(it.id){
   case 2:all('div[style*="height:14px"],div[style*="height: 14px"]').forEach((e,i)=>e.style.opacity=String(.38+.47*pulse(t-i*.12)));break;
   case 4:{const p=seg(t,.025,.10)*(1-seg(t,.58,.66));q('.lab-drawer').style.transform=`translateX(${(1-p)*105}%)`;q('.lab-drawer').setAttribute('aria-hidden',String(p<.01));q('[data-action=drawer]').setAttribute('aria-expanded',String(p>.5));break;}
   case 7:{const p=seg(t,.02,.11)*(1-seg(t,.47,.61));q('.lab-chip').style.opacity=p;q('.lab-chip').style.transform=`translateY(${(1-p)*6}px) scale(${.96+p*.04})`;break;}
   case 10:case 12:case 18:{const p=seg(t,.025,.65)*(1-seg(t,.84,.98)),scroll=q('.lab-scroll');scroll.scrollTop=p*Math.max(0,scroll.scrollHeight-scroll.clientHeight);if(it.id===10){q('.lab-read-progress').value=p*100;q('.lab-read-percent').textContent=Math.round(p*100)+'%';}if(it.id===12){q('.lab-next-chapter').setAttribute('aria-hidden',String(p<.8));q('[data-action=chapter]').disabled=p<.8;}if(it.id===18)q('.lab-player').classList.toggle('is-mini',scroll.scrollTop>110);break;}
   case 11:{const p=seg(t,.02,.49)*(1-seg(t,.86,.97));all('.lab-digit-track').forEach((e,i)=>e.style.transform=`translateY(${-p*[2,3,2,8][i]*10}%)`);q('.lab-number-status').textContent='当前：'+Math.round(p*2328).toLocaleString();break;}
   case 16:break; // The local video itself is played; no synthetic playback-state feedback.
   case 19:all('div[style*="width:4px"],div[style*="width: 4px"]').forEach((e,i)=>e.style.height=(6+16*pulse(t*2-i*.21))+'px');break;
   case 22:{const el=q('.tilt-box');if(el)el.style.transform='perspective(800px) rotateX('+Math.cos(t*Math.PI*2)*5+'deg) rotateY('+Math.sin(t*Math.PI*2)*8+'deg)';break;}
   case 25:{const el=q('.shimmer-text');if(el)el.style.backgroundPosition=(-100+200*pulse(t))+'% 50%';break;}
   case 31:{const p=seg(t,.02,.18)*(1-seg(t,.7,.9));q('.lab-tooltip').hidden=false;q('.lab-tooltip').style.opacity=p;q('.lab-tooltip').style.transform='translateY('+((1-p)*5)+'px)';break;}
   case 34:root.firstElementChild.style.transform='translate('+Math.sin(t*Math.PI*2)*13+'px,'+Math.cos(t*Math.PI*2)*9+'px)';break;
   case 40:all('.lab-space-layer').forEach((el,i)=>{const z=[18,10,5][i];el.style.transform='translate3d('+Math.sin(t*Math.PI*2)*z+'px,'+Math.cos(t*Math.PI*2)*z+'px,0)'});break;
   case 24:{const e=root.firstElementChild,p=pulse(t);e.style.transform=`translate(${Math.sin(t*Math.PI*2)*12}px,${Math.cos(t*Math.PI*2)*7}px) scale(${.8+p*.4})`;e.style.background=`rgb(${139-102*p},${92+7*p},${246-11*p})`;break;}
   case 28:{const s=t*4,n=Math.min(3,Math.floor(s)),a=[0,1,2,1,0],p=a[n]+(a[n+1]-a[n])*seg(s-n,.10,.62);q('.lab-step-track').style.transform=`translateX(${-p*100/3}%)`;q('.lab-step-count').textContent=(Math.round(p)+1)+' / 3';all('.lab-step').forEach((e,i)=>e.setAttribute('aria-hidden',String(i!==Math.round(p))));break;}
   case 30:{const p=t<.32?Math.sin(t/.32*Math.PI*6)*4*Math.sin(t/.32*Math.PI):0;root.firstElementChild.style.transform=`translateX(${p}px)`;break;}
   case 33:q('.lab-answer').style.gridTemplateRows=open+'fr';q('.lab-answer').setAttribute('aria-hidden',String(open<.01));q('[data-action=accordion]').setAttribute('aria-expanded',String(open>.5));q('.lab-plus').textContent=open>.5?'−':'+';break;
   case 35:{const text='AI NATIVE',chars='XZ#+/012345',p=seg(t,.02,.63),frame=Math.floor(t*50);q('.lab-scramble').textContent=[...text].map((c,i)=>c===' '?' ':i<Math.floor(p*(text.length+1))?c:chars[(frame+i*3)%chars.length]).join('');break;}
   case 36:q('.lab-reveal-cover').style.clipPath=`circle(${open*150}% at 50% 50%)`;root.dataset.revealed=String(open>.5);break;
   case 37:all('.lab-split-half').forEach((e,i)=>e.style.transform=`translateY(${(i?1:-1)*102*open}%)`);root.dataset.open=String(open>.5);break;
   case 38:{all('.lab-goo .drop').forEach((e,i)=>e.style.transform=`translateX(${(i===1?77:i===2?-67:0)*open}px)`);root.dataset.open=String(open>.5);break;}
   case 39:all('.lab-flip-word span').forEach((e,i)=>{const p=seg(t,.015+i*.035,.19+i*.035)*(1-seg(t,.79,.97));e.style.opacity=String(p);e.style.transform=`rotateX(${(1-p)*90}deg) translateY(${(1-p)*18}px)`;});break;
  }
 }
 window.VaultPreview={paint,duration};
})();
