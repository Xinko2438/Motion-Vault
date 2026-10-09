import { SMAAEffect } from 'postprocessing';
import { lifecycle, loadImage } from './lifecycle.js';
export let smaaImages=[];
export async function preloadResources(){
  smaaImages=await Promise.all([SMAAEffect.searchImageDataURL,SMAAEffect.areaImageDataURL].map(loadImage));
}
lifecycle.addCleanup(()=>{smaaImages.length=0;});
