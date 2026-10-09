// Source-led expansion of the existing single Motion Vault gallery.
// This module does not write browser curation state or declare user acceptance.
import {readFile,cp,readdir,mkdir} from 'node:fs/promises';
import path from 'node:path';
const asJSON=async file=>JSON.parse(await readFile(file,'utf8'));
export async function appendSourceExpansion(items,{project,root,sha}){
 const registry=await asJSON(path.join(project,'src/hybrid/source-expansion-catalog.json'));
 const ids=new Set(items.map(item=>String(item.id)));
 for(const spec of registry){
  if(!/^(?:mv2|spatial|cloud)-[a-z0-9-]+$/.test(spec.id))throw new Error('Invalid expansion ID');
  if(ids.has(spec.id))throw new Error('Expansion duplicates original ID '+spec.id);
  const canonical=path.join(project,'assets/design-assets',spec.id);
  const manifest=await asJSON(path.join(canonical,'asset.json'));
  if(manifest.id!==spec.id||manifest.kind!==spec.source_kind)throw new Error('Author-source identity mismatch '+spec.id);
  for(const relative of [manifest.run,manifest.entry,manifest.design,manifest.implementation,manifest.parameters,manifest.provenance]){
   if(typeof relative!=='string'||relative.startsWith('/')||relative.includes('..')||relative.includes('\\'))throw new Error('Unsafe or missing asset path '+spec.id);
   if(!manifest.hashes?.[relative])throw new Error('Untracked runtime/document '+relative);
  }
  for(const [relative,hash] of Object.entries(manifest.hashes)){
   if(relative.startsWith('/')||relative.includes('..')||relative.includes('\\'))throw new Error('Unsafe source inventory path');
   if(sha(await readFile(path.join(canonical,relative)))!==hash)throw new Error('Expansion source changed without rebuild '+spec.id+'/'+relative);
  }
  const destination=path.join(root,'motion-vault-assets',spec.id);
  await mkdir(destination,{recursive:true});await cp(canonical,destination,{recursive:true});
  const verified=manifest.status==='local_source_verified'&&manifest.preview?.captured===true&&manifest.preview?.implementationVersion===manifest.version;
  const preview={};
  if(verified){
   for(const key of ['poster','video']){
    const rel=manifest.preview[key];if(!rel)continue;
    if(!/^[A-Za-z0-9._-]+$/.test(rel))throw new Error('Unsafe capture filename');
    const digest=sha(await readFile(path.join(canonical,rel)));
    if(digest!==manifest.preview[key+'Sha256'])throw new Error('Capture/version mismatch '+spec.id);
    preview[key]='motion-vault-assets/'+spec.id+'/'+rel;preview[key+'Revision']=digest.slice(0,16);
   }
  }
  const p='motion-vault-assets/'+spec.id+'/';
  if(!verified&&manifest.cover?.kind==='upstream_reference'){const c=manifest.cover;if(!manifest.hashes[c.file]||manifest.hashes[c.file]!==c.sha256)throw new Error('Reference cover integrity mismatch');preview.poster=p+c.file;preview.posterRevision=c.sha256.slice(0,16);preview.poster_kind='upstream_reference';}
  const {batch,reference_url,...publicSpec}=spec;
  items.push({...publicSpec,source_kind:spec.source_kind,status:verified?'local_source_ready_for_review':'local_source_pending_browser_verification',asset:{id:spec.id,version:manifest.version,manifest:p+'asset.json',entry:p+manifest.entry,run:p+manifest.run,design:p+manifest.design,implementation:p+manifest.implementation,parameters:p+manifest.parameters,...preview,preview_kind:spec.source_kind==='independent_code'?'local_render':'adapted_source_render',state:verified?'local_source_verified':'local_source_pending_browser_verification',source_verified:false,implementation_kind:spec.source_kind,interactionBridge:true,lifecycleProtocol:1}});
  ids.add(spec.id);
 }
 return items;
}
