import {readFile,writeFile} from 'node:fs/promises';import path from 'node:path';import {project} from '../../scripts/build-hybrid.mjs';
const f=path.join(project,'src/hybrid/build-source-candidates.mjs');let s=await readFile(f,'utf8');
if(!s.includes("import {sourcePlugins}"))s="import {sourcePlugins} from './source-build-support.mjs';\n"+s;
const a=s.indexOf(" const plugin={name:'local-source-assets'"),b=s.indexOf(' await esbuild.build(',a);if(a<0||b<0)throw new Error('Plugin replacement boundary missing');
s=s.slice(0,a)+" const sourceText=html+'\\n'+(await Promise.all(sourceFiles.filter(f=>/\\.(js|jsx|ts|tsx|html)$/.test(f)).map(f=>readFile(path.join(work,'source',f),'utf8')))).join('\\n');\n const plugins=sourcePlugins({work,sourceText});\n"+s.slice(b);
s=s.replace('plugins:[plugin]','plugins');
await writeFile(f,s);console.log(JSON.stringify({sourcePluginWired:true}));
