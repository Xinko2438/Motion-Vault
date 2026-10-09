import './css/style.css';
import './css/base.css';
import imageUrl from './image/dithering_object.jpg';

import * as THREE from "three";
import Grid from "./Grid/Grid.js";
import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

// Actual source initialization and resource ownership, independent of iframe load.
const owned = {renderer:null, scene:null, canvas:null, grid:null, thresholdMapGrid:null, pane:null};
let stopped=false, disposed=false, frame=0, initialized=false, paintCount=0, settled=false, failure=null;
let resolveReady, rejectReady;
const ready = new Promise((resolve,reject)=>{resolveReady=resolve;rejectReady=reject;});
ready.catch(()=>{});
const events=new AbortController();
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const reportError=error=>{failure=String(error);initialized=false;stop();window.sourceErrors ||= [];if(!sourceErrors.includes(failure))sourceErrors.push(failure);if(!settled){settled=true;rejectReady(error instanceof Error?error:new Error(failure));}};
addEventListener('error',e=>reportError(e.message),{signal:events.signal});
addEventListener('unhandledrejection',e=>reportError(e.reason),{signal:events.signal});
window.SourceDemo={ready, get isReady(){return initialized&&!failure&&!disposed;}, stop:()=>stop(), resume:()=>resume(), paint:()=>paint(), dispose:()=>dispose(),
 get status(){return disposed?'disposed':failure?'failed':initialized?(stopped?'paused':'ready'):'loading';},
 inspect:()=>({disposed,stopped,initialized,rendererInitialized:!!owned.renderer,firstFrameSubmitted:paintCount>0,paintCount,
   reducedMotion:preference.matches,inputEnabled:!disposed,ambientAnimation:false,renderLoopScheduled:!!frame,
   textureLoaded:Boolean(owned.grid?.material?.uniforms.uTexture.value),progress:owned.grid?.material?.uniforms.uAnimationProgress.value ?? null,
   imageInstances:owned.grid?.instance?.count ?? 0,thresholdInstances:owned.thresholdMapGrid?.instance?.count ?? 0,
   runtimeVerified:false,errors:window.sourceErrors?.slice()||[]})};
THREE.DefaultLoadingManager.onError=url=>reportError(new Error('Asset failed: '+url));
THREE.DefaultLoadingManager.onLoad=()=>{if(disposed){for(const item of [owned.grid,owned.thresholdMapGrid])item?.material?.uniforms.uTexture.value?.dispose();return;}paint();};
addEventListener('pagehide',()=>dispose(),{once:true,signal:events.signal});

//Setup scene
const scene = owned.scene = new THREE.Scene();
scene.background = new THREE.Color("#6171E5");

//Setup camera
const camera = new THREE.OrthographicCamera();

camera.position.set(0, 0, 400);
camera.lookAt(0, 0, 0);
camera.near = 0.01;
camera.far = 1000;

const cameraAnchor = new THREE.Group();
cameraAnchor.name = "cameraAnchor";
cameraAnchor.add(camera);
scene.add(cameraAnchor);

//Set camera zoom and update projection matrix
camera.zoom = 0.9;
camera.updateProjectionMatrix();

//Set camera rotation
//Camera shot from above and a bit from the side 
cameraAnchor.rotation.reorder("YXZ");
cameraAnchor.rotation.y = Math.PI * 0.25;
cameraAnchor.rotation.x = -Math.PI * 0.15;

//Setup renderer
const canvas = owned.canvas = document.querySelector("canvas.webgl");
const renderer = owned.renderer = new THREE.WebGLRenderer({
  canvas,
  preserveDrawingBuffer: true,
  antialias: true
});


//Setup resize function
const resize = (width, height, pixelRatio) => {
  const boundingBoxSize = 400;
  const aspectRatio = width / height;

  //Resize camera
  if (aspectRatio < 1) {
    camera.left = -boundingBoxSize / 2;
    camera.right = boundingBoxSize / 2;
    camera.top = boundingBoxSize / 2 / aspectRatio;
    camera.bottom = -boundingBoxSize / 2 / aspectRatio;
  } else {
    camera.left = (-boundingBoxSize / 2) * aspectRatio;
    camera.right = (boundingBoxSize / 2) * aspectRatio;
    camera.top = boundingBoxSize / 2;
    camera.bottom = -boundingBoxSize / 2;
  }

  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  //Resize renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(pixelRatio, 2));

};

//Init resize function for the 1st time
resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);

//Init grid and show it on the scene
const grid = owned.grid = new Grid({
  name: "grid",
  rowCount: 400,
  columnCount: 400,
  cellSize: 1,
  cellThickness: 0.5,
  gridType: 1,
  image: imageUrl, // Path to the image to be used in the grid
  zPositionRange: new THREE.Vector2(20, -20),
  cellScaleRange: new THREE.Vector2(1, 1), // property to control cell scale animation
  animationMinDelay: 0, // property for minimum animation delay
  animationMaxDelay: 0.9, // property for maximum animation delay
});
grid.showAt(scene);

const thresholdMapGrid = owned.thresholdMapGrid = new Grid({
  name: "thresholdMapGrid",
  rowCount: 400,
  columnCount: 400,
  cellSize: 1,
  cellThickness: 0.1,
  gridType: 2,
  zPositionRange: new THREE.Vector2(0, -20),
  cellScaleRange: new THREE.Vector2(1, 0), // property to control cell scale animation
  animationMinDelay: 0.05, // property for minimum animation delay
  animationMaxDelay: 0.95, // property for maximum animation delay
});
thresholdMapGrid.showAt(scene);



// Set animation Loop to render the scene
function paint() {
  if(disposed||!owned.renderer||!owned.grid?.material)return false;
  try {
    owned.renderer.render(owned.scene,camera);paintCount++;
    if(owned.renderer.info.programs?.some(program=>program.diagnostics?.runnable===false))throw new Error('Dithering shader compilation failed');
    initialized=Boolean(owned.grid.material.uniforms.uTexture.value)&&!failure;
    if(initialized&&!settled){settled=true;resolveReady({textureLoaded:true,firstFrameSubmitted:true,visualVerified:false});}
    return initialized;
  } catch(error){reportError(error);return false;}
}
const animateLoop = () => {
  frame = 0;
  if (disposed || stopped) return;
  paint();
  if (!preference.matches && !stopped && !failure) frame = requestAnimationFrame(animateLoop);
};
animateLoop();

// Init Tweakpane
const pane = owned.pane = new Pane({ title: 'Settings', expanded: true });
pane.registerPlugin(EssentialsPlugin);

// Create Image Grid Settings Folder
const imageGridFolder = pane.addFolder({ title: 'Image Grid' });

const showImageGrid = imageGridFolder.addBinding({show: true}, 'show', {
  label: 'Show',
});

showImageGrid.on('change', (ev) => {
  queueMicrotask(paint);
  if (ev.value) {
    grid.showAt(scene);
  } else {
    grid.hideFrom(scene);
  }
});

// Create Threshold Map Grid Settings Folder
const thresholdMapGridFolder = pane.addFolder({ title: 'Threshold Map Grid' });

const showThresholdMapGrid = thresholdMapGridFolder.addBinding({show: true}, 'show', {
  label: 'Show',
});

showThresholdMapGrid.on('change', (ev) => {
  queueMicrotask(paint);
  if (ev.value) {
    thresholdMapGrid.showAt(scene);
  } else {
    thresholdMapGrid.hideFrom(scene);
  }
});


// Create Dithering Folder
const ditheringFolder = pane.addFolder({ title: 'Dithering' });

const activeThresholdMaps = {
  value: 'bayer4x4',
};

const ditheringThresholdController = ditheringFolder.addBinding(activeThresholdMaps, 'value', {
  view: 'radiogrid',
  groupName: 'ditheringThreshold',
  size: [2, 2],
  cells: (x, y) => ({
    title: `${grid.thresholdMaps[y * 2 + x].name}`,
    value: grid.thresholdMaps[y * 2 + x].id,
  }),
  label: 'Threshold Map',
})

ditheringThresholdController.on('change', (ev) => {
  queueMicrotask(paint);
  grid.geometry.setAttribute("aDitheringThreshold", grid.attributes.aDitheringThresholds[ev.value]);
  thresholdMapGrid.geometry.setAttribute("aDitheringThreshold", thresholdMapGrid.attributes.aDitheringThresholds[ev.value]);
});


// Create Animation Folder
const animationFolder = pane.addFolder({ title: 'Animation' });

//Add Dropdown to select delay type
const delayTypeController = animationFolder.addBlade({
  view: 'list',
  label: 'Delay Type',
  options: {
    'Cell by Cell': 1,
    'Row by Row': 2,
    'Column by Column': 3,
    'Random': 4,
    'Corner to Corner': 5,
  },
  value: grid.material.defines.DELAY_TYPE,
});

delayTypeController.on('change', (ev) => {
  queueMicrotask(paint);
  grid.material.defines.DELAY_TYPE = ev.value;
  grid.material.needsUpdate = true;

  thresholdMapGrid.material.defines.DELAY_TYPE = ev.value;
  thresholdMapGrid.material.needsUpdate = true;
});

// Add Progress Slider to control animation progress
const animationDelay = animationFolder.addBlade({
  view: 'slider',
  label: 'Max Delay',
  value: grid.material.uniforms.uAnimationMaxDelay.value,
  min: 0.05,
  max: 1,
  step: 0.01,
});
animationDelay.on('change', (ev) => {
  queueMicrotask(paint);
  grid.material.uniforms.uAnimationMaxDelay.value = ev.value;

  const animationDuration = 1.0 - ev.value;
  thresholdMapGrid.material.uniforms.uAnimationMinDelay.value = animationDuration * 0.5;
  thresholdMapGrid.material.uniforms.uAnimationMaxDelay.value = ev.value + animationDuration * 0.5;
});

const progressSlider = animationFolder.addBlade({
  view: 'slider',
  label: 'Progress',
  value: 0,
  min: 0,
  max: 1,
  step: 0.01,
});
progressSlider.on('change', (ev) => {
  queueMicrotask(paint);
  // Update the shader uniform with the new animation progress value
  grid.material.uniforms.uAnimationProgress.value = ev.value;
  thresholdMapGrid.material.uniforms.uAnimationProgress.value = ev.value;
});



//Reinit resize function on window resize
function onResize() {
  resize(window.innerWidth, window.innerHeight, window.devicePixelRatio);
  paint();
};
window.addEventListener('resize', onResize);
function motionChanged() { cancelAnimationFrame(frame); frame=0; if (!stopped) animateLoop(); }
preference.addEventListener('change', motionChanged);
function stop() { stopped=true; cancelAnimationFrame(frame); frame=0; }
function resume() { if(disposed)return false; stopped=false; cancelAnimationFrame(frame); animateLoop(); return true; }
function dispose() {
  if(disposed)return;
  stop();disposed=true;events.abort();
  if(!settled){settled=true;rejectReady(new DOMException('Disposed before ready','AbortError'));}
  preference.removeEventListener('change',motionChanged);
  window.removeEventListener('resize',onResize);
  owned.pane?.dispose();owned.pane=null;
  for(const item of [owned.grid,owned.thresholdMapGrid])if(item){
    if(item.group&&owned.scene)owned.scene.remove(item.group);
    item.material?.uniforms.uTexture.value?.dispose();
    item.geometry?.dispose();item.material?.dispose();item.instance?.dispose?.();
  }
  owned.renderer?.dispose();owned.renderer?.forceContextLoss();owned.canvas?.remove();owned.renderer=null;
  initialized=false;dispatchEvent(new Event('vault-source-dispose'));
}
window.SourceDemo.setProgress=value=>{if(disposed)return;const p=THREE.MathUtils.clamp(Number(value)||0,0,1);grid.material.uniforms.uAnimationProgress.value=p;thresholdMapGrid.material.uniforms.uAnimationProgress.value=p;progressSlider.value=p;paint();};
paint();
