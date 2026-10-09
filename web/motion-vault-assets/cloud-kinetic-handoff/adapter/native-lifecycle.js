// Owned lifecycle adapter for cloud-kinetic-handoff; source initialization is synchronous.
(()=>{
 let disposed=false,paused=false,readyFrame=0,rejectReady;const animations=new Set();
 const ready=new Promise((resolve,reject)=>{rejectReady=reject;Promise.resolve(document.fonts.ready).then(()=>{if(disposed)return;if(!window.__VaultNativeInitialized)throw new Error('Source initialization did not complete');readyFrame=requestAnimationFrame(()=>{readyFrame=0;if(!disposed)resolve({kind:'initialized DOM and font layout'});});}).catch(reject);});ready.catch(()=>{});
 const stop=()=>{if(disposed||paused)return;paused=true;window.MotionExample?.stop?.();for(const animation of document.getAnimations())if(animation.playState==='running'){animation.pause();animations.add(animation);}};
 const resume=()=>{if(disposed||!paused)return;paused=false;for(const animation of animations)if(animation.playState==='paused')animation.play();animations.clear();};
 const dispose=()=>{if(disposed)return;stop();disposed=true;cancelAnimationFrame(readyFrame);readyFrame=0;rejectReady(new DOMException('Source disposed','AbortError'));window.MotionExample?.dispose?.();for(const animation of document.getAnimations())animation.cancel();animations.clear();dispatchEvent(new Event('vault-source-dispose'));};
 window.SourceDemo={ready,stop,resume,dispose,inspect:()=>({initialized:window.__VaultNativeInitialized===true,disposed,paused,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,readinessKind:'DOM layout only; runtime acceptance pending'})};
 addEventListener('pagehide',dispose,{once:true});
})();
