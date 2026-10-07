// One SVG is authoritative for every favicon size, including rounded alpha corners.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {project,guard,put,sha} from './build-hybrid.mjs';
import {withBrowser} from './isolated-browser.mjs';
const svg=await readFile(path.join(project,'src/hybrid/motion-vault-icon.svg'),'utf8');
const sizes=[16,32,48,64];
await guard('src/hybrid/motion-vault-icon.ico','automation');
await guard('lineage/current/interaction-switch','evidence');
const images=await withBrowser(async b=>b.evaluate(`(async()=>{
 const image=new Image();image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(${JSON.stringify(svg)});await image.decode();
 return ${JSON.stringify(sizes)}.map(size=>{const canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0,size,size);const pixels=ctx.getImageData(0,0,size,size).data;return{size,png:canvas.toDataURL('image/png').split(',')[1],corners:[0,size-1,size*(size-1),size*size-1].map(i=>pixels[i*4+3]),centerAlpha:pixels[(Math.floor(size/2)*size+Math.floor(size/2))*4+3]};});
})()`));
if(images.some(i=>i.corners.some(a=>a!==0)||i.centerAlpha!==255))throw new Error('Rounded favicon alpha verification failed');
const header=Buffer.alloc(6+16*images.length);header.writeUInt16LE(1,2);header.writeUInt16LE(images.length,4);
let offset=header.length;const parts=[];
images.forEach((item,index)=>{const png=Buffer.from(item.png,'base64'),p=6+index*16;header[p]=header[p+1]=item.size;header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(png.length,p+8);header.writeUInt32LE(offset,p+12);offset+=png.length;parts.push(png);});
const ico=Buffer.concat([header,...parts]);await put(project,'src/hybrid/motion-vault-icon.ico',ico);
const report={at:new Date().toISOString(),svgSha256:sha(svg),icoSha256:sha(ico),sizes:images.map(({png,...r})=>r)};
await put(project,'lineage/current/interaction-switch/icons.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));
