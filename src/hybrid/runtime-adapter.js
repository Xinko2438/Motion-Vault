// One scoped local instance. Preview animation never sends fabricated clicks/pointers.
export function createRuntime(host, item, options = {}) {
 if(!(host instanceof HTMLElement))throw new TypeError('A host element is required');
 const mode=item.preview_mode,rate=Math.min(2,Math.max(.25,Number(options.playbackRate)||1));
 const systemReduced=matchMedia('(prefers-reduced-motion: reduce)'),explicitHover=options.motionIntent==='hover',reduced={get matches(){return systemReduced.matches&&!explicitHover}},snapshot=options.snapshot===true,preview=options.preview===true;
 const ctrl=new AbortController();let disposed=false,frame=0,manual=false,dragId=null,baseline=[];
 const timed=(mode==='auto'||preview||(snapshot&&['click','scroll'].includes(mode)))&&item.key!=='radial';
 host.classList.add('stage','asset-host');Object.assign(host.dataset,{scene:item.scene||item.uses?.[0]?.scene||'brand',demo:String(item.id),asset:String(item.id),mode,running:'false',presentation:preview||snapshot?'preview':'detail',playback:timed?'auto':'interactive'});
 const element=item.key?window.VaultEngine.make(item,true):window.VaultLegacy.make(item,true);host.replaceChildren(element);
 window.__vaultRuntime??={active:0,mounted:0,disposed:0};__vaultRuntime.active++;__vaultRuntime.mounted++;
 const on=(el,type,fn,opt={})=>el.addEventListener(type,fn,{...opt,signal:ctrl.signal});
 const editor=e=>e.composedPath().some(n=>n instanceof Element&&n.matches('textarea,select,input:not([type=range]):not([type=button]):not([type=checkbox]):not([type=radio]),[contenteditable=true]'));
 function clearDrag(){dragId=null;host.ownerDocument.documentElement.classList.remove('vault-dragging');}
 // Limit selection suppression to an actual drag gesture; never disable normal document/code selection.
 on(host,'dragstart',e=>{if(!editor(e))e.preventDefault()});
 on(host,'selectstart',e=>{if(mode==='drag'&&!editor(e))e.preventDefault()});
 on(host,'pointerdown',e=>{if(e.button!==0)return;if(mode==='drag'&&!editor(e)){e.preventDefault();dragId=e.pointerId;host.ownerDocument.documentElement.classList.add('vault-dragging');}if(timed&&!snapshot&&e.isTrusted)takeControl(e);},{capture:true});
 on(host.ownerDocument,'selectstart',e=>{if(dragId!==null)e.preventDefault()},{capture:true});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])on(host.ownerDocument,type,e=>{if(dragId===e.pointerId)clearDrag()});
 on(window,'blur',clearDrag);on(host,'wheel',()=>{if(mode==='scroll'&&timed)takeControl();},{capture:true,passive:true});
 on(host,'pointermove',e=>{if(preview&&mode==='pointer'&&timed&&!manual&&e.isTrusted&&e.pointerType!=='touch')takeControl(e)},{capture:true});
 on(host,'keydown',e=>{if(timed&&!snapshot&&e.isTrusted&&!editor(e)&&['Enter',' ','ArrowLeft','ArrowRight','ArrowDown','ArrowUp'].includes(e.key))takeControl(e);},{capture:true});
 function remember(){baseline=[element,...element.querySelectorAll('*')].map(el=>({el,attrs:[...el.attributes].map(a=>[a.name,a.value]),text:el.childElementCount===0?el.textContent:null,value:el instanceof HTMLInputElement?el.value:null}));}
 function restore(){for(const {el,attrs,text,value}of baseline){if(!el.isConnected)continue;const names=new Set(attrs.map(a=>a[0]));for(const a of [...el.attributes])if(!names.has(a.name))el.removeAttribute(a.name);for(const [n,v]of attrs)el.setAttribute(n,v);if(text!==null&&el.textContent!==text)el.textContent=text;if(value!==null)el.value=value;}}
 function paint(t){if(disposed)return;window.VaultPreview.paint(item,element,Math.max(0,Math.min(.999999,Number(t)||0)));}
 function takeControl(event){if(disposed||manual||snapshot)return;manual=true;cancelAnimationFrame(frame);frame=0;if(timed)restore();host.dataset.playback='interactive';element.__start?.(event);if(item.key==='radial'&&event?.pointerType!=='touch')element.firstElementChild?.__openRadial?.();}
 function playMedia(){if(reduced.matches||snapshot)return;for(const v of element.querySelectorAll('video'))v.play().catch(()=>{});}
 function pointerSetup(){
  if(item.key)return;
  const tilt=element.querySelector('.tilt-box'),shimmer=element.querySelector('.shimmer-text'),magnetic=item.id===34?element.firstElementChild:null;
  if(mode==='pointer'&&(tilt||shimmer||magnetic)){
   const move=e=>{const r=host.getBoundingClientRect(),x=Math.max(-1,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width)*2-1)),y=Math.max(-1,Math.min(1,(e.clientY-r.top)/Math.max(1,r.height)*2-1));
    if(tilt)tilt.style.transform=`perspective(800px) rotateX(${-y*7}deg) rotateY(${x*8}deg)`;
    else if(shimmer)shimmer.style.backgroundPosition=`${-x*100}% 50%`;
    else magnetic.style.transform=`translate(${x*13}px,${y*9}px)`;
   };on(host,'pointermove',move);if(options.event?.clientX!==undefined)move(options.event);
  }
  if(item.id===31){const b=element.querySelector('.lab-help-anchor button'),tip=element.querySelector('.lab-tooltip'),anchor=element.querySelector('.lab-help-anchor');on(host,'pointermove',e=>{if(!manual||!tip)return;const r=anchor.getBoundingClientRect(),inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;tip.hidden=!inside;b.setAttribute('aria-expanded',String(inside));});}
 }
 queueMicrotask(()=>{
  if(disposed)return;remember();
  if(snapshot){if(mode==='auto'||['click','scroll'].includes(mode)&&item.key!=='radial')paint(options.phase??.55);for(const v of element.querySelectorAll('video')){v.pause();const seek=()=>{if(!disposed){v.currentTime=Math.min(.8,v.duration||.8);}};if(v.readyState)seek();else on(v,'loadedmetadata',seek,{once:true});}return;}
  host.dataset.running='true';pointerSetup();playMedia();
  if(timed){if(reduced.matches){paint(.55);return;}const start=performance.now(),period=window.VaultPreview.duration(item);paint(0);const tick=now=>{if(disposed||manual)return;paint(((now-start)*rate%period)/period);frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
  else takeControl(options.event);
 });
 on(document,'visibilitychange',()=>{if(document.hidden)dispose()});
 on(systemReduced,'change',()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;for(const v of element.querySelectorAll('video'))v.pause();if(timed&&!manual)paint(.55);clearDrag();}});
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);clearDrag();ctrl.abort();element.__dispose?.();element.dispose?.();element.querySelectorAll('.lab-demo').forEach(e=>e.dispose?.());for(const v of element.querySelectorAll('video'))v.pause();host.replaceChildren();host.dataset.running='false';__vaultRuntime.active--;__vaultRuntime.disposed++;}
 return{dispose,paint,takeControl,item,element};
}
