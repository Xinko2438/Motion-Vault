import { lifecycle } from './lifecycle.js';
const fonts=[];
lifecycle.addCleanup(()=>{for(const font of fonts)document.fonts.delete(font);fonts.length=0;});
(async()=>{
  for(const family of ['Caveat','Yomogi']){
    const response=await fetch('./fonts/'+family+'.ttf',{signal:lifecycle.signal});
    if(!response.ok)throw Error('Font unavailable: '+family);
    const font=new FontFace(family,await response.arrayBuffer());await font.load();
    if(lifecycle.disposed)return;document.fonts.add(font);fonts.push(font);
  }
  const paper=await import('./author/src/paper.js');
  await paper.preparePaperImages();
  if(lifecycle.disposed)return;
  await import('./author/src/main-vat.js');
})().catch(error=>{lifecycle.fail(error);document.getElementById('info').textContent=String(error);});
