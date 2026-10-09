// Only report trusted native pointer state; never replay or manufacture input.
(()=>{
 const channel=new URLSearchParams(location.search).get('vaultSession');
 if(parent===window||!channel)return;
 const ctrl=new AbortController();
 const send=phase=>e=>{
  if(!e.isTrusted)return;
  parent.postMessage({type:'vault-native-pointer',channel,phase,pointerId:e.pointerId,buttons:e.buttons,clientX:e.clientX,clientY:e.clientY,viewportWidth:innerWidth,viewportHeight:innerHeight},'*');
 };
 for(const [event,phase] of [['pointerdown','down'],['pointerup','up'],['pointercancel','cancel']])addEventListener(event,send(phase),{capture:true,signal:ctrl.signal});
 const close=()=>ctrl.abort();
 addEventListener('pagehide',close,{once:true,signal:ctrl.signal});
 addEventListener('vault-source-dispose',close,{once:true,signal:ctrl.signal});
})();
