// Executes ONLY our lifecycle controller with test doubles. No upstream,
// React/R3F/Three runtime, DOM browser, shaders or GPU is executed.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source = fs.readFileSync(new URL('./runtime.js', import.meta.url), 'utf8')
  .replace(/^import .*;\n/gm, '').replace(/export const /g, 'const ').replace(/export function /g, 'function ');
function fixture() {
    const events=[], windowListeners=new Map(), mediaListeners=new Map(), effects=[];
    let after, afterRemovals=0, frame, unmounted=0, rendererDisposals=0, contextLosses=0, disconnected=0, modeChanges=0;
    const media={matches:false,addEventListener:(name,fn)=>mediaListeners.set(name,fn),removeEventListener:name=>mediaListeners.delete(name)};
    const domListeners=new Map();
    const gl={debug:{},info:{render:{frame:0,calls:0}},domElement:{addEventListener:(name,fn)=>domListeners.set(name,fn),removeEventListener:name=>domListeners.delete(name)},dispose:()=>rendererDisposals++,forceContextLoss:()=>contextLosses++};
    const current={gl,frameloop:'always',clock:{elapsedTime:12},events:{disconnect:()=>disconnected++},setFrameloop(mode){modeChanges++;current.frameloop=mode;},invalidate(){events.push('invalidate');},advance(time,global){events.push(['advance',time,global]);}};
    const get=()=>current;current.get=get;
    const context=vm.createContext({matchMedia:()=>media,Event,DOMException,
        addEventListener:(name,fn)=>windowListeners.set(name,fn),removeEventListener:name=>windowListeners.delete(name),dispatchEvent:event=>events.push(event.type),
        useEffect:fn=>effects.push(fn()),useThree:selector=>selector(current),useFrame:fn=>{frame=fn;},
        addAfterEffect:fn=>{after=fn;return()=>{after=undefined;afterRemovals++;};}});
    vm.runInContext(source+'\nglobalThis.runtime=kineticRuntime;globalThis.witness=FrameWitness;',context);
    const r=context.runtime;r.mount(()=>unmounted++);
    const scene={traverse:fn=>fn({})};
    return {r,current,get,media,mediaListeners,windowListeners,domListeners,events,gl,scene,context,
        after:()=>after?.(),commit:()=>r.registerScene(scene),frame:()=>{r.noteFrame(scene,gl);gl.info.render.frame++;gl.info.render.calls=1;after?.();},
        counts:()=>({afterRemovals,unmounted,rendererDisposals,contextLosses,disconnected,modeChanges})};
}
const results=[];
async function check(name,fn){await fn();results.push({check:name,passed:true});}
await check('initial ready stays pending without renderer/resources and paint returns false',async()=>{const f=fixture();let settled=false;f.r.ready.then(()=>settled=true,()=>{});await Promise.resolve();assert.equal(settled,false);assert.equal(f.r.inspect().phase,'loading');assert.equal(f.r.paint(),false);await f.r.dispose();});
await check('stable R3F getter attachment is idempotent and does not reset matching frameloop',async()=>{const f=fixture();f.r.attach(f.get);f.r.attach(f.get);assert.equal(f.counts().modeChanges,0);f.current.unrelated='new store field';f.context.witness();assert.equal(f.counts().modeChanges,0);assert.equal(f.counts().afterRemovals,0);await f.r.dispose();});
await check('resource commit alone and empty render are not ready',async()=>{const f=fixture();f.r.attach(f.get);f.commit();f.after();assert.equal(f.r.inspect().phase,'loading');f.r.noteFrame(f.scene,f.gl);f.gl.info.render.frame++;f.gl.info.render.calls=0;f.after();assert.equal(f.r.inspect().phase,'loading');await f.r.dispose();});
await check('ready resolves only after resource commit and a genuine renderer-counter advance with draws',async()=>{const f=fixture();f.r.attach(f.get);f.commit();f.frame();const value=await f.r.ready;assert.equal(value.route,'/');assert.equal(value.firstRenderedFrame,1);assert.equal(f.r.inspect().phase,'ready');await f.r.dispose();});
await check('stop/resume only change actual frameloop when needed',async()=>{const f=fixture();f.r.attach(f.get);f.r.stop();f.r.stop();assert.equal(f.counts().modeChanges,1);assert.equal(f.current.frameloop,'never');f.r.resume();f.r.resume();assert.equal(f.counts().modeChanges,2);assert.equal(f.current.frameloop,'always');await f.r.dispose();});
await check('native reduced-motion changes keep demand rendering but block ambient updates',async()=>{const f=fixture();f.r.attach(f.get);f.media.matches=true;f.mediaListeners.get('change')();assert.equal(f.current.frameloop,'demand');assert.equal(f.r.ambientAllowed(),false);f.r.paint();assert.equal(f.events.at(-1),'invalidate');await f.r.dispose();});
await check('stopped paint advances actual R3F state at unchanged elapsed time',async()=>{const f=fixture();f.r.attach(f.get);f.r.stop();f.r.paint();assert.deepEqual(f.events.at(-1),['advance',12,true]);await f.r.dispose();});
await check('author initialization error rejects ready and stops renderer',async()=>{const f=fixture();f.r.attach(f.get);f.r.fail(new Error('bad source resource'));await assert.rejects(f.r.ready,/bad source resource/);assert.equal(f.r.inspect().phase,'error');assert.equal(f.current.frameloop,'never');await f.r.dispose();});
await check('actual shader error callback rejects ready',async()=>{const f=fixture();f.r.attach(f.get);f.gl.debug.onShaderError();await assert.rejects(f.r.ready,/shader failed/);await f.r.dispose();});
await check('route switch starts a new readiness obligation',async()=>{const f=fixture();f.r.attach(f.get);const initial=f.r.ready;f.r.beginRoute('/paper');await assert.rejects(initial,/Route changed/);assert.notEqual(initial,f.r.ready);f.commit();f.frame();assert.equal((await f.r.ready).route,'/paper');await f.r.dispose();});
await check('control callback-ref cleanup releases each native instance',async()=>{const f=fixture();let released=0;const cleanup=f.r.controlRef({dispose:()=>released++});assert.equal(f.r.inspect().activeControls,1);cleanup();assert.equal(f.r.inspect().activeControls,0);assert.equal(released,1);await f.r.dispose();});
await check('dispose rejects pending ready, releases renderer/context/events/scenes and is terminal',async()=>{const f=fixture();f.r.attach(f.get);let geometry=0,material=0,texture=0,control=0;f.r.registerScene({traverse:fn=>fn({geometry:{dispose:()=>geometry++},material:{map:{isTexture:true,dispose:()=>texture++},dispose:()=>material++}})});f.r.controlRef({dispose:()=>control++});const ready=f.r.ready;const first=f.r.dispose();assert.equal(first,f.r.dispose());await first;await assert.rejects(ready,/Disposed/);assert.equal(f.r.inspect().phase,'disposed');assert.equal(f.r.inspect().activeScenes,0);assert.equal(f.r.inspect().activeControls,0);assert.equal(f.windowListeners.size,0);assert.equal(f.mediaListeners.size,0);assert.equal(f.domListeners.size,0);assert.deepEqual([geometry,material,texture,control],[1,1,1,1]);assert.deepEqual(f.counts(),{afterRemovals:1,unmounted:1,rendererDisposals:1,contextLosses:1,disconnected:1,modeChanges:1});assert.equal(f.r.resume(),false);assert.equal(f.r.paint(),false);assert.ok(f.events.includes('vault-source-dispose'));});
await check('cleanup errors do not prevent later release and are reported accurately',async()=>{const f=fixture();f.r.attach(f.get);f.r.controlRef({dispose:()=>{throw new Error('control cleanup');}});await assert.rejects(f.r.dispose(),/control cleanup/);assert.equal(f.counts().rendererDisposals,1);assert.equal(f.counts().contextLosses,1);assert.equal(f.r.inspect().disposalErrors[0],'control cleanup');});
await check('source hook selects stable get and has no whole-store effect loop or readiness timer',()=>{assert.match(source,/useThree\(value => value\.get\)/);assert.doesNotMatch(source,/useThree\(\)|setTimeout|setInterval/);assert.match(source,/\[get\]/);});
fs.writeFileSync(new URL('../qa-runtime-contract.json',import.meta.url),JSON.stringify({schema:'motion-vault.own-controller-contract.v2',upstreamCodeExecuted:false,browserExecuted:false,realR3FExecuted:false,passed:results.length,total:results.length,results},null,2)+'\n');
console.log(`${results.length}/${results.length} own-controller contracts passed with mocks; not browser validation.`);
