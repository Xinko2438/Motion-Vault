import {readFile} from 'node:fs/promises';import path from 'node:path';import {createRequire} from 'node:module';
const exists=async p=>{try{await readFile(p);return true}catch{return false}};
export const sanitizeCSS=css=>css.replace(/@font-face\s*\{[^}]*\}/g,'').replace(/@import[^;]*(?:fonts\.googleapis|use\.typekit|fonts\.cdn)[^;]*;/g,'').replace(/url\((?:["'])?[^)]*\.(woff2?|ttf|otf|eot)[^)]*\)/g,'none');
async function locate(p){for(const f of [p,p+'.js',p+'.ts',p+'.jsx',p+'.tsx',path.join(p,'index.js'),path.join(p,'index.ts')])if(await exists(f))return f;throw new Error('Local module not found: '+p);}
async function shader(p,seen=new Set()){if(seen.has(p))throw new Error('Cyclic shader include');seen.add(p);let text=await readFile(p,'utf8');const pattern=/#include\s+(?:["']([^"']+)["']|((?:\.\.?\/)[^\s;]+))\s*;?/g;let result='',last=0;for(const m of text.matchAll(pattern)){const rel=m[1]||m[2];let target=path.resolve(path.dirname(p),rel);if(!await exists(target)&&await exists(target+'.glsl'))target+='.glsl';result+=text.slice(last,m.index)+await shader(target,new Set(seen));last=m.index+m[0].length;}return result+text.slice(last);}
export function sourcePlugins({work,sourceText}){const req=createRequire(path.join(work,'package.json'));return [{name:'local-source-assets',setup(build){
 build.onResolve({filter:/^@experience\//},async a=>({path:await locate(path.join(work,'source/src/Experience',a.path.slice(12)))}));
 build.onResolve({filter:/^@\//},async a=>({path:await locate(path.join(work,'source/src',a.path.slice(2)))}));
 build.onResolve({filter:/^three\/(examples\/jsm|addons)\//},a=>{if(!/\.[a-z]+$/i.test(a.path))return{path:req.resolve(a.path+'.js')}});
 build.onResolve({filter:/\?(raw|url)$/},a=>({path:path.resolve(a.resolveDir,a.path.split('?')[0]),namespace:a.path.endsWith('?raw')?'raw-text':'file-url'}));
 build.onLoad({filter:/.*/,namespace:'raw-text'},async a=>{let text=await shader(a.path);if(text.includes('#pragma glslify'))text=req('glslify').compile(text,{basedir:work});return{contents:text,loader:'text'};});
 build.onLoad({filter:/.*/,namespace:'file-url'},async a=>({contents:await readFile(a.path),loader:'file'}));
 build.onLoad({filter:/\.(frag|vert|glsl|wgsl)$/},async a=>{let text=await shader(a.path);if(text.includes('#pragma glslify'))text=req('glslify').compile(text,{basedir:work});return{contents:text,loader:'text'};});
 build.onResolve({filter:/\.(png|jpg|jpeg|webp|svg|glb|gltf|hdr|exr)$/},async a=>{if(!a.path.startsWith('.')&&!a.path.startsWith('/'))return;const original=path.resolve(a.resolveDir,a.path);if(await exists(original))return{path:original};const alternate=path.join(work,'source/public',a.path.replace(/^(\.\/|\/)/,''));if(await exists(alternate))return{path:alternate};});
 build.onLoad({filter:/\.scss$/},async a=>({contents:sanitizeCSS(req('sass').compile(a.path,{loadPaths:[path.dirname(a.path)],logger:{warn(){},debug(){}}}).css),loader:'css',resolveDir:path.dirname(a.path)}));
 build.onLoad({filter:/\.css$/},async a=>{let css=sanitizeCSS(await readFile(a.path,'utf8'));if(/@import\s+["']tailwindcss/.test(css)){const compiler=await req('@tailwindcss/node').compile(css,{base:path.dirname(a.path),onDependency(){}});const tokens=[...new Set((sourceText||'').match(/[\w!:@.\[\]\/%#(),-]+/g)||[])];css=compiler.build(tokens);}return{contents:css,loader:'css',resolveDir:path.dirname(a.path)};});
 }}];}
