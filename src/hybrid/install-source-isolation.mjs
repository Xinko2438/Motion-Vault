import {readFile,writeFile,readdir} from 'node:fs/promises';import path from 'node:path';import {project,root,put,sha} from '../../scripts/build-hybrid.mjs';
// UI integration belongs to the shared gallery; this tool only installs asset isolation.
const gallery=await readFile(path.join(project,'src/hybrid/gallery.js'),'utf8'),builder=await readFile(path.join(project,'scripts/build-hybrid.mjs'),'utf8');
if(!gallery.includes('createSourceBroker(frame,it,channel)')||!gallery.includes("frame.sandbox='allow-scripts'")||!builder.includes('source-broker.js'))throw new Error('Unified source sandbox integration is missing');
const code=await readFile(path.join(project,'src/hybrid/source-isolation-bridge.js'),'utf8'),catalog=JSON.parse(await readFile(path.join(project,'candidates/curated-originals/src/catalog.json'),'utf8'));
for(const it of catalog){const base=path.join(root,'motion-vault-assets',it.id),m=JSON.parse(await readFile(path.join(base,'asset.json'),'utf8'));
 await put(base,'run/vault-isolation.js',code);await put(base,'adapter/vault-isolation.js',code);m.hashes['run/vault-isolation.js']=sha(code);m.hashes['adapter/vault-isolation.js']=sha(code);
 for(const f of await readdir(path.join(base,'run'))){if(!f.endsWith('.html'))continue;const file=path.join(base,'run',f);let html=await readFile(file,'utf8');if(!html.includes('data-vault-isolation'))html=html.replace(/<script\b/,'<script data-vault-isolation src="./vault-isolation.js"></script><script');await writeFile(file,html);m.hashes['run/'+f]=sha(html);}
 const p=JSON.parse(await readFile(path.join(base,'provenance.json'),'utf8'));const note='完整交互保持不透明沙箱；只将当前清单允许的本地公开素材通过只读通道传入。独立运行保留原生加载方式，效果核心与录屏一致。';if(!p.differences.includes(note))p.differences.push(note);await put(base,'provenance.json',JSON.stringify(p,null,2));m.hashes['provenance.json']=sha(await readFile(path.join(base,'provenance.json')));
 m.integration={transport:'opaque_sandbox_local_assets',adapter:'run/vault-isolation.js',sha256:sha(code),coreImplementationVersion:m.version,standaloneBehaviorChanged:false};
 await put(base,'asset.json',JSON.stringify(m,null,2));
}
console.log(JSON.stringify({integrated:catalog.length,coreImplementationsUnchanged:true,sandboxPreserved:true,serverConfigurationChanged:false}));
