// Adapter-owned lifecycle contract. No parent access, synthetic input or time-based readiness.
const abort = new AbortController();
const cleanups = new Set();
const timers = new Set();
let handlers = {}, settled = false, disposed = false, disposing;
let resolveReady, rejectReady;
const ready = new Promise((resolve, reject) => { resolveReady=resolve; rejectReady=reject; });
ready.catch(() => {}); // The host may subscribe after an initialization error.
window.sourceErrors = [];
const abortError = () => new DOMException('Source disposed before readiness', 'AbortError');
function arm(timer) {
  if(disposed || !lifecycle.running || timer.id !== null) return;
  timer.started=performance.now();
  timer.id=setTimeout(() => { timer.id=null;timers.delete(timer);if(!disposed&&lifecycle.running)timer.callback(); }, timer.remaining);
}
export const lifecycle = {
  ready, isReady:false, status:'loading', running:!document.hidden, signal:abort.signal,
  get disposed(){ return disposed; },
  setHandlers(value){handlers={...handlers,...value};},
  addCleanup(callback){cleanups.add(callback);return()=>cleanups.delete(callback);},
  listen(target,type,callback,options={}){target.addEventListener(type,callback,{...options,signal:abort.signal});},
  schedule(callback,delay){const timer={callback,remaining:delay,started:0,id:null};timers.add(timer);arm(timer);return timer;},
  succeed(evidence){if(disposed||settled)return;settled=true;this.isReady=true;this.status='ready';this.evidence=evidence;resolveReady(evidence);},
  fail(value){const error=value instanceof Error?value:new Error(String(value));if(disposed&&error.name==='AbortError')return;window.sourceErrors.push(error.message);if(!disposed)this.status='error';if(!settled){settled=true;rejectReady(error);}this.stop();console.error(error);},
  stop(){this.running=false;for(const timer of timers){if(timer.id!==null){clearTimeout(timer.id);timer.id=null;timer.remaining=Math.max(0,timer.remaining-(performance.now()-timer.started));}}handlers.stop?.();},
  resume(){if(disposed||this.status==='error')return;this.running=true;for(const timer of timers)arm(timer);handlers.resume?.();},
  paint(){return this.isReady&&!disposed;},
  dispose(){
    if(disposing)return disposing;
    disposed=true;this.stop();abort.abort();
    if(!settled){settled=true;rejectReady(abortError());}
    const jobs=[];for(const callback of cleanups){try{jobs.push(callback());}catch(error){jobs.push(Promise.reject(error));}}
    cleanups.clear();timers.clear();
    try{jobs.push(handlers.dispose?.());}catch(error){jobs.push(Promise.reject(error));}
    window.dispatchEvent(new Event('vault-source-dispose'));
    this.isReady=false;this.status='disposed';
    disposing=Promise.allSettled(jobs).then(results=>{const failure=results.find(r=>r.status==='rejected');if(failure){this.status='dispose-error';throw failure.reason;}});
    disposing.catch(error=>console.error(error));return disposing;
  },
  inspect(){return {status:this.status,ready:this.isReady,running:this.running,disposed,scheduledTimers:timers.size,activeTimers:[...timers].filter(t=>t.id!==null).length,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,viewport:{width:innerWidth,height:innerHeight},evidence:this.evidence||null,errors:[...window.sourceErrors],...handlers.inspect?.()};}
};
window.SourceDemo=lifecycle;
lifecycle.listen(window,'error',e=>lifecycle.fail(e.error||e.message));
lifecycle.listen(window,'unhandledrejection',e=>lifecycle.fail(e.reason));
lifecycle.listen(window,'pagehide',e=>e.persisted?lifecycle.stop():lifecycle.dispose());
lifecycle.listen(window,'pageshow',()=>{if(!document.hidden)lifecycle.resume();});
lifecycle.listen(document,'visibilitychange',()=>document.hidden?lifecycle.stop():lifecycle.resume());
export function loadImage(url) {
  return new Promise((resolve,reject)=>{
    if(disposed){reject(abortError());return;}
    const img=new Image();
    const cleanup=()=>{img.onload=img.onerror=null;abort.signal.removeEventListener('abort',cancel);};
    const cancel=()=>{cleanup();img.removeAttribute('src');reject(abortError());};
    img.onload=()=>{cleanup();resolve(img);};
    img.onerror=()=>{cleanup();reject(new Error('Image failed to load: '+String(url).slice(0,180)));};
    abort.signal.addEventListener('abort',cancel,{once:true});img.src=url;
  });
}
export function rejectShaderErrors(renderer) {
  if(!renderer.debug)return;
  renderer.debug.checkShaderErrors=true;
  renderer.debug.onShaderError=(gl,program,vertex,fragment)=>{
    const error=new Error('Shader compilation/link failed: '+[gl.getProgramInfoLog(program),gl.getShaderInfoLog(vertex),gl.getShaderInfoLog(fragment)].filter(Boolean).join('\n'));
    lifecycle.fail(error);throw error;
  };
}

export function assertFirstFrame(renderer) {
  const gl=renderer.getContext();
  if(gl.isContextLost())throw new Error('WebGL context lost during first frame');
  const error=gl.getError();
  if(error!==gl.NO_ERROR)throw new Error('WebGL first frame error: 0x'+error.toString(16));
}
