import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';import path from 'node:path';import {execFileSync} from 'node:child_process';
import {withStage,withBrowser,until} from './browser-tools.mjs';import {root,project,sha,put} from '../../scripts/build-hybrid.mjs';
const mode=process.argv[2]||'posters';const subset=process.argv[3]?.split(',');const catalog=JSON.parse(await readFile(path.join(root,'catalog.json'),'utf8'));
const results=[];
await withStage(root,async server=>withBrowser(async b=>{
 await b.call('Emulation.setDeviceMetricsOverride',{width:656,height:400,deviceScaleFactor:1,mobile:false});
 await b.call('Page.addScriptToEvaluateOnNewDocument',{source:"window.__errors=[];addEventListener('error',e=>__errors.push(e.error?.stack||e.message));addEventListener('unhandledrejection',e=>__errors.push(String(e.reason)));"});
 const selected=catalog.items.filter(i=>!subset||subset.includes(String(i.id)));
 for(const it of selected){
  if(mode==='videos'&&(!it.key||it.preview_mode!=='auto'))continue;
  const folder=path.join(root,'motion-vault-assets',it.asset.id);const a=JSON.parse(await readFile(path.join(folder,'asset.json'),'utf8'));
  try{
   await b.goto(server.url+'/'+it.asset.run+'?snapshot=1',80);await until(b,'window.assetReady===true');await b.delay(100);
   if(mode==='posters'){
    if(it.id===39)await b.evaluate("document.querySelector('.lab-flip-word')?.classList.add('playing')");
    const shot=await b.call('Page.captureScreenshot',{format:'jpeg',quality:85,captureBeyondViewport:false});const bytes=Buffer.from(shot.data,'base64');await writeFile(path.join(folder,'poster.jpg'),bytes);
    a.preview={...a.preview,kind:'local_render',poster:'poster.jpg',implementationVersion:a.version,captured:true,posterSha256:sha(bytes),width:656,height:400,capturedAt:new Date().toISOString()};
   }else{
    const period=await b.evaluate(`VaultEngine.duration(${JSON.stringify(it.key)})`);
    const frames=Math.ceil(period/1000*20);const frameDir=path.join(project,'.runtime/hybrid-assets/frames',it.asset.id);await mkdir(frameDir,{recursive:true});
    const hashes=new Set();
    for(let i=0;i<frames;i++){
      await b.evaluate(`AssetDemo.paint(${i/frames})`);
      const shot=await b.call('Page.captureScreenshot',{format:'jpeg',quality:86,captureBeyondViewport:false});const bytes=Buffer.from(shot.data,'base64');hashes.add(sha(bytes));await writeFile(path.join(frameDir,String(i).padStart(5,'0')+'.jpg'),bytes);
    }
    if(hashes.size<3)throw new Error('Playback produced no meaningful frame changes');
    execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','20','-i',path.join(frameDir,'%05d.jpg'),'-frames:v',String(frames),'-c:v','libx264','-preset','veryfast','-crf','23','-pix_fmt','yuv420p','-an','-movflags','+faststart',path.join(folder,'preview.mp4')],{windowsHide:true,stdio:'pipe',timeout:30000});
    const vid=await readFile(path.join(folder,'preview.mp4'));a.preview={...a.preview,video:'preview.mp4',videoSha256:sha(vid),videoBytes:vid.length,frameCount:frames,distinctFrames:hashes.size,durationSeconds:frames/20,fps:20,implementationVersion:a.version,captureMethod:'Deterministic local DOM timeline sampled and encoded; not original-site recording'};
   }
   const errors=await b.evaluate('__errors');if(errors.length)throw new Error(errors.join('\n'));
   await writeFile(path.join(folder,'asset.json'),JSON.stringify(a,null,2));results.push({id:String(it.id),passed:true,version:a.version,preview:a.preview});
   console.log('Captured '+mode+': '+it.id);
  }catch(e){results.push({id:String(it.id),passed:false,error:e.message});console.error('FAILED '+it.id+': '+e.message);}
 }
}));
await put(project,'lineage/hybrid-assets/capture-'+mode+(subset?'-'+subset.join('_'):'')+'.json',JSON.stringify({mode,environment:'Isolated installed Chrome over temporary loopback HTTP. No private browser attached.',total:results.length,passed:results.filter(r=>r.passed).length,results},null,2));
console.log(JSON.stringify({mode,total:results.length,passed:results.filter(r=>r.passed).length,failures:results.filter(r=>!r.passed)}));if(results.some(r=>!r.passed))process.exitCode=1;
