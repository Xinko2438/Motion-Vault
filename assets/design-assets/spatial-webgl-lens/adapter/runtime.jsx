import React,{useEffect,useLayoutEffect,useRef} from 'react';
import {useFrame,useThree,useLoader} from '@react-three/fiber';
import {useScrollbar,useScrollRig} from '@14islands/r3f-scroll-rig';
import {WebGLText} from '@14islands/r3f-scroll-rig/powerups';
import {DefaultLoadingManager,ImageBitmapLoader,TextureLoader} from 'three';
import {useGLTF,useTexture} from '@react-three/drei';
import {RGBELoader} from 'three-stdlib';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import {disposeVaultTextResources} from 'troika-three-text';

export const draco=new DRACOLoader();
draco.setDecoderPath('./draco/');
export const extendGLTF=loader=>loader.setDRACOLoader(draco);
export const lifetime={state:null,rootState:null,scrollbar:null,root:null,disposed:false,paused:false,rendered:false,visibleFrames:0,loading:false,assetsReady:false,urls:new Set(),fonts:[],texts:new Map(),bitmaps:new Set(),requestRender:null,initialized:false,restoreRender:null};
export const preference=matchMedia('(prefers-reduced-motion: reduce)');
const originalBitmapLoad=ImageBitmapLoader.prototype.load;
ImageBitmapLoader.prototype.load=function(url,onLoad,onProgress,onError){return originalBitmapLoad.call(this,url,bitmap=>{if(lifetime.disposed)bitmap.close();else lifetime.bitmaps.add(bitmap);onLoad?.(bitmap);},onProgress,onError);};
function clearOwnedCaches(){useGLTF.clear('./glb/lens-transformed2.glb');useLoader.clear(RGBELoader,'env/empty_warehouse_01_1k.hdr');for(const url of Object.values(window.VaultImageUrls)){useTexture.clear(url);useLoader.clear(TextureLoader,url);useLoader.clear(ImageBitmapLoader,url);}}
function setMode(mode){const snapshot=lifetime.rootState||lifetime.state;const state=snapshot?.get?.()||snapshot;if(!state||state.frameloop===mode)return;const elapsed=state.clock.elapsedTime;state.setFrameloop(mode);state.clock.elapsedTime=elapsed;}

const initDecoder=draco._initDecoder.bind(draco);
draco._initDecoder=()=>{if(lifetime.disposed)return Promise.reject(new DOMException('Disposed','AbortError'));return initDecoder().then(value=>{if(lifetime.disposed){draco.dispose();throw new DOMException('Disposed','AbortError');}return value;});};
let resolveReady,rejectReady,settled=false,latestTextFrame=0;
const ready=new Promise((resolve,reject)=>{resolveReady=resolve;rejectReady=reject;});ready.catch(()=>{});
window.__vaultReduce=preference.matches;window.__vaultPaused=false;
window.VaultFontUrls={};window.VaultImageUrls={};window.sourceErrors=[];
const events=new AbortController();
export function fail(error){if(lifetime.disposed)return;const value=error instanceof Error?error:new Error(String(error));sourceErrors.push(value.message);if(!settled){settled=true;rejectReady(value);}}
window.VaultSourceFail=fail;
addEventListener('error',e=>fail(e.message),{signal:events.signal});
addEventListener('unhandledrejection',e=>fail(e.reason),{signal:events.signal});
export function invalidateFrame(){if(lifetime.disposed||lifetime.paused)return;lifetime.requestRender?.();(lifetime.rootState||lifetime.state)?.invalidate();}
DefaultLoadingManager.onStart=()=>{lifetime.loading=true;};
DefaultLoadingManager.onLoad=()=>{lifetime.loading=false;if(lifetime.disposed){clearOwnedCaches();return;}invalidateFrame();};
DefaultLoadingManager.onError=url=>fail('Local asset failed: '+url);
function complete(){return !lifetime.disposed&&lifetime.assetsReady&&lifetime.rendered&&!lifetime.loading&&lifetime.texts.size>=9&&[...lifetime.texts.values()].every(Boolean)&&lifetime.visibleFrames>latestTextFrame&&sourceErrors.length===0;}
function checkReady(){if(complete()){lifetime.initialized=true;if(!settled){settled=true;resolveReady({localAssetsLoaded:true,textMeshesSynced:lifetime.texts.size,firstFrameSubmitted:true,visualVerified:false});}}}
export function rendererCreated(state){
 lifetime.rootState=state;
 const gl=state.gl,render=gl.render;
 gl.debug.onShaderError=()=>fail('Lens shader compilation/link failed');
 gl.render=function(...args){
  if(lifetime.disposed)return;
  const screen=gl.getRenderTarget()===null;
  if(!settled)gl.debug.checkShaderErrors=true;
  const result=render.apply(this,args);
  if(screen){lifetime.visibleFrames++;lifetime.rendered=true;}
  if(gl.info.programs?.some(program=>program.diagnostics?.runnable===false))fail('Lens shader compilation/link failed');
  return result;
 };
 lifetime.restoreRender=()=>{gl.render=render;};
 if(lifetime.paused)setMode('never');
}
function stop(){lifetime.paused=true;window.__vaultPaused=true;setMode('never');lifetime.scrollbar?.__lenis?.stop?.();}
function resume(){if(lifetime.disposed)return false;lifetime.paused=false;window.__vaultPaused=false;lifetime.scrollbar?.__lenis?.start?.();setMode(preference.matches?'demand':'always');invalidateFrame();return true;}
function paint(){if(lifetime.disposed||!lifetime.state)return false;const previous=window.__vaultPaused;window.__vaultPaused=true;lifetime.requestRender?.();(lifetime.rootState||lifetime.state).advance(lifetime.state.clock.elapsedTime,false);window.__vaultPaused=previous;checkReady();return lifetime.initialized;}
function disposeScene(scene,seen){scene?.traverse(node=>{if(node.geometry)seen.geometries.add(node.geometry);for(const material of (Array.isArray(node.material)?node.material:[node.material]))if(material){seen.materials.add(material);for(const value of Object.values(material))if(value?.isTexture)seen.textures.add(value);for(const uniform of Object.values(material.uniforms||{}))if(uniform?.value?.isTexture)seen.textures.add(uniform.value);}});if(scene?.environment)seen.textures.add(scene.environment);if(scene?.background?.isTexture)seen.textures.add(scene.background);}
function dispose(){
 if(lifetime.disposed)return;stop();lifetime.disposed=true;events.abort();
 if(!settled){settled=true;rejectReady(new DOMException('Disposed before ready','AbortError'));}
 const state=lifetime.rootState||lifetime.state,seen={geometries:new Set(),materials:new Set(),textures:new Set()};
 disposeScene(state?.scene,seen);disposeScene(lifetime.state?.scene,seen);
 lifetime.root?.unmount();lifetime.root=null;lifetime.scrollbar?.__lenis?.destroy?.();lifetime.scrollbar=null;
 draco.dispose();disposeVaultTextResources();
 for(const texture of seen.textures)if(texture.image?.close)lifetime.bitmaps.add(texture.image);
 for(const bitmap of lifetime.bitmaps)bitmap.close();lifetime.bitmaps.clear();clearOwnedCaches();ImageBitmapLoader.prototype.load=originalBitmapLoad;
 for(const kind of Object.values(seen))for(const value of kind)value.dispose?.();
 lifetime.restoreRender?.();state?.gl?.dispose();state?.gl?.forceContextLoss();lifetime.state=lifetime.rootState=null;
 for(const url of lifetime.urls)URL.revokeObjectURL(url);lifetime.urls.clear();
 for(const font of lifetime.fonts)document.fonts.delete(font);lifetime.fonts.length=0;lifetime.texts.clear();
 lifetime.initialized=false;window.VaultSourceFail=null;
 window.dispatchEvent(new Event('vault-source-dispose'));
}
window.SourceDemo={ready,get isReady(){return lifetime.initialized&&!lifetime.disposed;},get status(){return lifetime.disposed?'disposed':sourceErrors.length?'failed':lifetime.initialized?(lifetime.paused?'paused':'ready'):'loading';},stop,resume,paint,dispose,
 scroll(progress){if(lifetime.disposed)return;const y=Math.max(0,Math.min(1,Number(progress)||0))*Math.max(0,document.documentElement.scrollHeight-innerHeight);lifetime.scrollbar?.__lenis?lifetime.scrollbar.__lenis.scrollTo(y,{immediate:true}):window.scrollTo(0,y);invalidateFrame();},
 inspect:()=>({disposed:lifetime.disposed,paused:lifetime.paused,initialized:lifetime.initialized,assetsReady:lifetime.assetsReady,rendererInitialized:!!lifetime.rootState,firstFrameSubmitted:lifetime.rendered,visibleFrames:lifetime.visibleFrames,loading:lifetime.loading,fonts:lifetime.fonts.length,textMeshes:lifetime.texts.size,textMeshesSynced:[...lifetime.texts.values()].filter(Boolean).length,expectedTextMeshes:9,reducedMotion:preference.matches,inputEnabled:!lifetime.disposed&&!lifetime.paused,dracoWorkers:draco.workerPool.length,blobURLs:lifetime.urls.size,imageBitmaps:lifetime.bitmaps.size,runtimeVerified:false,errors:sourceErrors.slice()})
};
export function VaultControl(){
 const get=useThree(s=>s.get),scroll=useScrollbar(),rig=useScrollRig();
 useEffect(()=>{const state=get();lifetime.state=state;const target=lifetime.rootState||state;const mode=lifetime.paused?'never':preference.matches?'demand':'always';setMode(mode);invalidateFrame();return()=>{if(lifetime.state===state)lifetime.state=null;};},[get]);
 useEffect(()=>{lifetime.scrollbar=scroll;const lenis=scroll.__lenis;if(lenis){lenis.options.smoothWheel=!preference.matches;lenis.options.syncTouch=!preference.matches;if(lifetime.paused)lenis.stop();}},[scroll.__lenis,scroll.enabled,scroll.scrollTo]);
 useEffect(()=>{lifetime.requestRender=rig.requestRender;invalidateFrame();return()=>{lifetime.requestRender=null;};},[rig.requestRender]);
 useFrame(checkReady,1001);
 return null;
}
export function VaultWebGLText(props){
 const token=useRef(Symbol('text')),synced=useRef(false);
 useLayoutEffect(()=>{lifetime.texts.set(token.current,synced.current);invalidateFrame();return()=>lifetime.texts.delete(token.current);},[]);
 return <WebGLText {...props} onSync={mesh=>{if(lifetime.disposed)return;synced.current=!!mesh.textRenderInfo;lifetime.texts.set(token.current,synced.current);latestTextFrame=lifetime.visibleFrames;props.onSync?.(mesh);invalidateFrame();}}/>;
}
export function motionChanged(){window.__vaultReduce=preference.matches;const lenis=lifetime.scrollbar?.__lenis;if(lenis){lenis.options.smoothWheel=!preference.matches;lenis.options.syncTouch=!preference.matches;lenis.animate.stop();}if(!lifetime.paused){setMode(preference.matches?'demand':'always');invalidateFrame();}}
addEventListener('pointermove',invalidateFrame,{signal:events.signal,passive:true});
addEventListener('scroll',invalidateFrame,{signal:events.signal,passive:true});
addEventListener('pagehide',dispose,{once:true});
async function bytes(path){const r=await fetch(path,{signal:events.signal});if(!r.ok)throw new Error('Asset HTTP '+r.status+': '+path);const b=await r.arrayBuffer();if(lifetime.disposed)throw new DOMException('Disposed','AbortError');return b;}
export async function prepareAssets(){
 const fonts=[['Poppins-Regular.woff','Poppins','400','normal'],['Poppins-Medium.woff','Poppins','500','normal'],['Poppins-SemiBold.woff','Poppins','600','normal'],['PlayfairDisplay-Italic.woff','Playfair Display','400','italic']];
 await Promise.all(fonts.map(async([name,family,weight,style])=>{const data=await bytes('./fonts/'+name);const face=new FontFace(family,data,{weight,style,display:'swap'});await face.load();if(lifetime.disposed)return;document.fonts.add(face);lifetime.fonts.push(face);const url=URL.createObjectURL(new Blob([data],{type:'font/woff'}));lifetime.urls.add(url);window.VaultFontUrls['fonts/'+name]=url;}));
 const images=['codrops-bg-tiny.png','maxim-berg-1_U2RcHnSjc-unsplash.jpg','maxim-berg-qsDfqZyTCAE-unsplash-crop.jpg','maxim-berg-ANuuRuCRRAc-unsplash.jpg','maxim-berg-TcE45yIzJA0-unsplash.jpg'];
 await Promise.all(images.map(async name=>{const data=await bytes('./images/'+name);const url=URL.createObjectURL(new Blob([data],{type:name.endsWith('.png')?'image/png':'image/jpeg'}));lifetime.urls.add(url);window.VaultImageUrls['images/'+name]=url;}));
 lifetime.assetsReady=true;
}
