import { lifecycle, rejectShaderErrors, assertFirstFrame } from './lifecycle.js';
import './author/src/css/base.css';
import './author/src/css/canvas.css';
import { Engine } from './author/src/Experience/Engine.js';
let engine;
lifecycle.setHandlers({
  stop(){if(engine){engine.isRunning=false;cancelAnimationFrame(engine.animationFrameRequestId);}},
  resume(){if(engine?.isInitialized)engine.start();},
  dispose(){engine?.dispose();},
  inspect(){return {renderer:'Three183 WebGL2',input:['native pointer parallax','native wheel','native touch scroll'],rafActive:!!engine?.isRunning,resources:'five local WebP textures',reducedMotionBehavior:'time-driven background/trail frozen; direct scroll and parallax retained'};}
});
(async()=>{
  engine=new Engine(document.querySelector('.webgl'));rejectShaderErrors(engine.renderer);
  await engine.init({autoStart:false});
  if(lifecycle.disposed)return;
  engine.renderFrame();assertFirstFrame(engine.renderer);
  lifecycle.succeed({textures:engine.preloadedTextures.size,sceneInitialized:true,firstFrameSubmitted:true});
  if(lifecycle.running)engine.start();
})().catch(error=>lifecycle.fail(error));
