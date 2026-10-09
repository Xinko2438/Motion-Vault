import {transformTroika} from './troika-transform.mjs';
import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {createRequire} from 'node:module';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const deps=path.resolve(process.env.MOTION_LENS_DEPS||path.join(root,'adapter/npm'));
const require=createRequire(import.meta.url);
const esbuild=process.env.ESBUILD_PATH?require(process.env.ESBUILD_PATH):process.env.MOTION_TOOLING?createRequire(path.join(path.resolve(process.env.MOTION_TOOLING),'package.json'))('esbuild'):require('esbuild');
if(esbuild.version!=='0.25.10')throw new Error('This recipe requires esbuild 0.25.10.');
const revisions=[];
const layout=(await fs.readFile(path.join(root,'source/public/styles.css'),'utf8')).replace(/@import\s+url\(["']?\/?fonts\.css["']?\)\s*;?/g,'');
await fs.writeFile(path.join(root,'run/layout.css'),layout);
const plugins=[{name:'faithful-local-source-adapter',setup(build){
 build.onResolve({filter:/^troika-worker-utils$/},()=>({path:'troika-local-fallback',namespace:'vault'}));
 build.onLoad({filter:/.*/,namespace:'vault'},()=>({contents:`export {defineMainThreadModule as defineWorkerModule} from ${JSON.stringify(path.join(deps,'node_modules/troika-worker-utils/src/mainThreadFallback.js'))};export function terminateWorker(){/* No Troika worker is created in this isolated adapter. */}`,loader:'js',resolveDir:root}));
 build.onLoad({filter:/troika-three-text[\\/]dist[\\/]troika-three-text\.esm\.js$/},async args=>({contents:transformTroika(await fs.readFile(args.path,'utf8')),loader:'js',resolveDir:path.dirname(args.path)}));
 build.onLoad({filter:/source[\\/]src[\\/].*\.(jsx|js)$/},async args=>{let text=await fs.readFile(args.path,'utf8'),original=text;const rel=path.relative(root,args.path).split(path.sep).join('/');
  if(rel==='source/src/App.jsx'){
   text=`import {VaultControl,rendererCreated,fail} from '../../adapter/runtime.jsx';\n`+text;
   text=text.replace('<a href="https://github.com/14islands/r3f-scroll-rig">','<a href="#source-repository" onClick={event => event.preventDefault()} data-source-href="https://github.com/14islands/r3f-scroll-rig">');
   text=text.replace('<GlobalCanvas','<GlobalCanvas onCreated={rendererCreated} onError={fail}');
   text=text.replace('<Lens>','<Lens><VaultControl/>');
   text=text.replace('config={{ syncTouch: true }}','config={{ smoothWheel: !window.__vaultReduce, syncTouch: !window.__vaultReduce, duration: 1.2 }}');
  }
  if(rel==='source/src/Lens.jsx'){
   text=`import {extendGLTF} from '../../adapter/runtime.jsx';\n`+text;
   text=text.replace('useGLTF("glb/lens-transformed2.glb")','useGLTF("./glb/lens-transformed2.glb", false, false, extendGLTF)');
   text=text.replace('useGLTF.preload("/lens-transformed2.glb")','useGLTF.preload("./glb/lens-transformed2.glb", false, false, extendGLTF)');
   text=text.replace('    easing.damp3(', '    if(!window.__vaultPaused)easing.damp3(');
   text=text.replace('      damping,','      window.__vaultReduce ? 0 : damping,');
  }
  if(rel==='source/src/Text.jsx')text=text.replace("import { WebGLText } from '@14islands/r3f-scroll-rig/powerups'","import { VaultWebGLText as WebGLText } from '../../adapter/runtime.jsx'");
  if(rel==='source/src/Text.jsx')text=text.replace('font={font}','font={window.VaultFontUrls[font] || font}').replace('speed={1.4} distort={0.14}','speed={window.__vaultReduce ? 0 : 1.4} distort={window.__vaultReduce ? 0 : 0.14}');
  if(rel==='source/src/Image.jsx'||rel==='source/src/ImageCube.jsx')text=text.replace('src={src}','src={window.VaultImageUrls[src] || src}').replace('three/src/math/MathUtils"','three/src/math/MathUtils.js"');
  if(rel==='source/src/WebGLBackground.jsx')text=text.replace('url="images/codrops-bg-tiny.png"','url={window.VaultImageUrls["images/codrops-bg-tiny.png"]}').replace('if (bg.current)','if (bg.current && !window.__vaultReduce && !window.__vaultPaused)');
  if(rel==='source/src/ImageCube.jsx')text=text.replace('useFrame((_, delta) => {','useFrame((_, delta) => {\n    if(window.__vaultReduce || window.__vaultPaused)return;').replace('const spring = useSpring({','const spring = useSpring({\n    immediate: window.__vaultReduce,');
  if(rel==='source/src/CodropsFrame.jsx')text='import React from "react";export default function CodropsFrame(){return null;}';
  if(text!==original){revisions.push({path:rel});const out=path.join(root,'adapter',rel);await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,text);}
  return {contents:text,loader:'jsx',resolveDir:path.dirname(args.path)};
 });
}}];
const result=await esbuild.build({absWorkingDir:root,entryPoints:[path.join(root,'adapter/entry.jsx')],outfile:path.join(root,'run/effect.js'),bundle:true,format:'iife',target:'es2022',jsx:'automatic',jsxImportSource:'react',minify:false,sourcemap:false,legalComments:'eof',nodePaths:[path.join(deps,'node_modules')],define:{'process.env.NODE_ENV':'"production"'},loader:{'.js':'jsx'},metafile:true,plugins});
await fs.writeFile(path.join(root,'build-evidence.json'),JSON.stringify({tool:'esbuild',version:esbuild.version,upstreamScriptsExecuted:false,revisions,metafile:result.metafile},null,2));
