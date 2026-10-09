import { WebGPURenderer } from 'three/webgpu';
import { lifecycle } from './lifecycle.js';
export const rendererState={renderer:null,initialized:null,compiling:null,scene:null,setFrameloop:null};
export function createVaultRenderer(canvas){
  const renderer=new WebGPURenderer({canvas,forceWebGL:true,powerPreference:'high-performance',antialias:true,alpha:false,stencil:false,shadowMap:true});
  rendererState.renderer=renderer;
  const nativeInitTexture=renderer.initTexture.bind(renderer);
  renderer.initTexture=texture=>{
    if(lifecycle.disposed)return;
    if(renderer._initialized)return nativeInitTexture(texture);
    rendererState.initialized.then(()=>{if(!lifecycle.disposed)nativeInitTexture(texture);}).catch(error=>lifecycle.fail(error));
  };
  const nativeRender=renderer.render.bind(renderer);
  renderer.render=(...args)=>{
    if(lifecycle.disposed)return;
    // Three r175's private RAF normally advances this clock even with no animation callback.
    // The adapter owns the clock so R3F demand/never really stops work; pinned to 0.175.0.
    if(renderer._initialized){
      if(renderer.info.autoReset)renderer.info.reset();
      renderer._nodes.nodeFrame.update();renderer.info.frame=renderer._nodes.nodeFrame.frameId;
    }
    return nativeRender(...args);
  };
  rendererState.initialized=renderer.init().then(()=>{
    if(!renderer._animation?.stop || !renderer._nodes?.nodeFrame)throw Error('Unsupported pinned Three renderer lifecycle');
    renderer._animation.stop();
    return renderer;
  });
  rendererState.initialized.catch(error=>lifecycle.fail(error));
  lifecycle.addCleanup(async()=>{
    try{await rendererState.initialized;}catch{return;}
    await rendererState.compiling?.catch(()=>{});
    renderer._animation.stop();renderer.dispose();rendererState.renderer=null;rendererState.scene=null;
  });
  return renderer;
}
export function setRenderMode(mode){
  rendererState.scene?.setFrameloop(mode);rendererState.setFrameloop?.(mode);
}
