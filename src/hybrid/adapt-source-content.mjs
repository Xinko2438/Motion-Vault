import {readFile,writeFile,mkdir,cp,readdir} from 'node:fs/promises';import path from 'node:path';import {createRequire} from 'node:module';import {project,put,sha,exists} from '../../scripts/build-hybrid.mjs';
const shared=path.join(project,'assets/local-dependencies');
export async function transformSource({id,rel,text}){
 text=text.replaceAll('import.meta.env.BASE_URL',JSON.stringify('./')).replaceAll("'/cubeMap2/'","'./cubeMap2/'").replaceAll('"/cubeMap2/"','"./cubeMap2/"');
 if(id==='curated-reaction-diffusion'&&rel==='js/main.js')text=text.replace(/const font = new FontFace[\s\S]*$/,'document.fonts.ready.then(() => init());\n');
 if(id==='curated-cloth-object')text=text.replace(/preset="studio"/g,'files="./environment.hdr"');
 if(id==='curated-stylized-water')text=text.replace(/preset="forest"/g,'files="./environment.hdr"');
 if(id==='curated-webgl-reveal'&&rel==='src/App.jsx')text=text.replace(/<section className="outro">[\s\S]*?<\/section>/,'');
 return text;
}
async function hdr(kind){const file=kind+'_1k.hdr',dest=path.join(shared,file);if(!await exists(dest)){const url='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/'+file;const r=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!r.ok)throw new Error('HDR download '+r.status);const b=Buffer.from(await r.arrayBuffer());if(b.length>8000000)throw new Error('Unexpected environment size');await put(shared,file,b);await put(shared,file+'.json',JSON.stringify({source:url,license:'CC0',licenseEvidence:'https://polyhaven.com/license',sha256:sha(b),at:new Date().toISOString()},null,2));}return dest;}
export async function finalizeSource({id,run,work,html,source,htmlName}){
 // Use one local reference icon rather than retaining missing upstream favicon paths.
 await cp(path.join(project,'src/hybrid/motion-vault-icon.svg'),path.join(run,'reference-icon.svg'));
 html=html.replace(/<link\b(?=[^>]*\brel=["'](?:shortcut\s+)?icon["'])[^>]*>/gi,'').replace('</head>','<link rel="icon" type="image/svg+xml" href="./reference-icon.svg"></head>');
 // Resolve styles referenced from original HTML, including Vite-root and src-relative styles.
 for(const m of [...html.matchAll(/<link\b[^>]*href=["']([^"']+\.css)["'][^>]*>/gi)]){const url=m[1];if(/^(https?:)?\/\//.test(url))continue;const rel=url.replace(/^\.\//,'').replace(/^\//,'');let input=path.resolve(source,rel);if(!await exists(input))input=path.resolve(source,path.dirname(htmlName),rel);if(await exists(input)){const content=await readFile(input,'utf8');if(/@import\s+['"]tailwindcss/.test(content)&&await exists(path.join(run,'effect.css'))){html=html.replace(m[0],'');}else{await mkdir(path.dirname(path.join(run,rel)),{recursive:true});await cp(input,path.join(run,rel));}}else{html=html.replace(m[0],'');}}
 // Public is already flattened by the builder; normalize references instead of duplicating images.
 html=html.replace(/(["'(])\.\/public\//g,'$1./');if(id==='curated-dual-wave')html=html.replace(/(["'])1\.webp\1/g,'"tesla.webp"');
 const dependencyRoot=path.join(work,'node_modules/three'),draco=path.join(dependencyRoot,'examples/jsm/libs/draco/gltf');
 const bundleFile=path.join(run,'effect.js');let js=await readFile(bundleFile,'utf8');
 if(js.includes('www.gstatic.com/draco/')||js.includes('google/draco/')){
 if(!await exists(path.join(draco,'draco_decoder.wasm')))throw new Error('Local Draco decoder missing');await cp(draco,path.join(run,'draco'),{recursive:true});
 js=js.replace(/https:\/\/www\.gstatic\.com\/draco\/(?:versioned\/decoders\/[^/]+\/|v1\/decoders\/)/g,'./draco/').replace(/https:\/\/www\.gstatic\.com\/draco\/v1\/decoders\//g,'./draco/');
 }
 if(id==='curated-cluster')js='(async()=>{\n'+js+'\n})().catch(e=>{window.sourceErrors?.push(e.stack||String(e));console.error(e)});';
 await writeFile(bundleFile,js);
 if(id==='curated-cloth-object'||id==='curated-stylized-water'){const file=await hdr(id==='curated-cloth-object'?'studio_small_03':'forest_slope');await cp(file,path.join(run,'environment.hdr'));await cp(file+'.json',path.join(run,'environment-license.json'));}
 return html;
}
