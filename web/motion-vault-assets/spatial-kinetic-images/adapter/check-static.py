"""Read-only inspection of pinned/source-derived files; never executes upstream code."""
from pathlib import Path
import json,hashlib,struct,re,subprocess
root=Path(__file__).resolve().parent.parent
results=[]
def test(label,ok,detail=None):
 row={'check':label,'passed':bool(ok)}
 if detail is not None:row['detail']=detail
 results.append(row)
def read(p):return (root/p).read_text()
def jread(p):return json.loads(read(p))
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
plan=jread('adapter/upstream-git-tree.json')
for item in plan['files']:
 p=root/'source'/item['path'];b=p.read_bytes()
 test('pinned-source: '+item['path'],len(b)==item['bytes'] and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==item['gitBlobSha'])
test('all 60 source files retained',len(list(p for p in (root/'source').rglob('*') if p.is_file()))==60)
for p in ['webgl/materials/MeshImageMaterial.js','webgl/materials/MeshBannerMaterial.js','webgl/helpers/getCanvasTexture.js','webgl/helpers/global.js','webgl/helpers/Three.jsx']:
 test('exact authored mechanism: '+p,(root/'source/src'/p).read_bytes()==(root/'adapter/src'/p).read_bytes())
for p in (root/'source/src').rglob('*.scss'):
 test('exact source SCSS: '+str(p.relative_to(root/'source/src')),p.read_bytes()==(root/'adapter/src'/p.relative_to(root/'source/src')).read_bytes())
for p in (root/'source/public').rglob('*'):
 if p.is_file():test('exact local asset: '+p.name,p.read_bytes()==(root/'run/assets'/p.relative_to(root/'source/public')).read_bytes())
glb=[]
for name in ['paper','spiral']:
 p=root/f'run/assets/{name}.glb';b=p.read_bytes();magic,version,size=struct.unpack('<4sII',b[:12]);n,tag=struct.unpack('<II',b[12:20]);j=json.loads(b[20:20+n])
 test(name+' GLB header',magic==b'glTF' and version==2 and size==len(b) and tag==0x4e4f534a)
 test(name+' GLB requires no decoder',all(e not in ['KHR_draco_mesh_compression','EXT_meshopt_compression'] for e in j.get('extensionsUsed',[])))
 test(name+' GLB buffers embedded',all('uri' not in x for x in j.get('buffers',[])))
 test(name+' GLB contains no external images',all(not x.get('uri') or x['uri'].startswith('data:') for x in j.get('images',[])))
 glb.append({'file':f'run/assets/{name}.glb','extensionsUsed':j.get('extensionsUsed',[]),'extensionsRequired':j.get('extensionsRequired',[]),'meshes':len(j.get('meshes',[])),'buffers':j.get('buffers',[])})
 test(name+' useGLTF explicitly disables both decoders',f"useGLTF('./assets/{name}.glb', false, false)" in read(f'adapter/src/components/webgl/{name.title()}/{name.title()}.jsx'))
for p in ['app/page.jsx','app/paper/page.jsx','app/spiral/page.jsx']:
 orig=read('source/src/'+p);mod=read('adapter/src/'+p)
 expected=orig.replace('isLoading } = useCollageTexture','isLoading, error } = useCollageTexture').replace('if (isLoading) return <Loader />;', 'if (error) throw error;\n    if (isLoading) return <Loader />;')
 test('authored page geometry/camera exact except error forwarding: '+p,mod==expected)
for name in ['Billboard','Banner','Paper','Spiral']:
 s=read(f'adapter/src/components/webgl/{name}/{name}.jsx');test(name+' actual R3F useFrame gated',"useFrame((state, delta) => {\n        if (!kineticRuntime.ambientAllowed()) return;" in s)
test('Billboard geometry retained','<cylinderGeometry args={[radius, radius, 2, 100, 1, true]} />' in read('adapter/src/components/webgl/Billboard/Billboard.jsx'))
test('Banner source geometry retained','args={[radius, radius, radius * 0.07, radius * 80, radius * 10, true]}' in read('adapter/src/components/webgl/Banner/Banner.jsx'))
test('native OrbitControls retained','{orbit && <OrbitControls ref={kineticRuntime.controlRef} />}' in read('adapter/src/webgl/View.jsx'))
test('local hash router avoids history origin','history.' not in read('adapter/router.jsx') and "location.hash" in read('adapter/router.jsx'))
test('root has no Next runtime',"next/" not in read('adapter/entry.jsx') and "next/" not in read('adapter/src/components/layouts/Layout.jsx'))
test('source public image references own package',read('adapter/src/data/images.js').count("url: './assets/images/")==13)
rt=read('adapter/runtime.js')
test('actual R3F frame-loop stop/resume/paint',all(x in rt for x in ["current.frameloop !== requested","current.setFrameloop(requested)","current.advance(current.clock.elapsedTime, true)"]))
test('native reduced motion and demand mode',all(x in rt for x in ["matchMedia('(prefers-reduced-motion: reduce)')","media.matches ? 'demand' : 'always'","!media.matches"]))
test('ready uses actual resources and renderer frame rather than a timer',all(x in rt for x in ['new Promise((resolve, reject)', 'render.frame > candidate.frame && render.calls > 0', 'phase = \'ready\'']) and not re.search(r'\bsetTimeout\b|\bsetInterval\b',rt))
test('stable getter subscription avoids R3F store reset loop', 'useThree(value => value.get)' in rt and 'useThree()' not in rt)
test('source lifecycle export actually connected','window.SourceDemo = Object.freeze({' in read('adapter/entry.jsx') and 'root.unmount()' in read('adapter/entry.jsx'))
test('collage cancellation and explicit texture disposal',all(x in read('adapter/src/hooks/useCollageTexture.jsx') for x in ['let cancelled = false','value.texture.dispose()','ownedTexture?.dispose()']))
test('primitive geometry and material disposal',all(x in read('adapter/model-disposal.js') for x in ['geometry.dispose()','material.dispose()','useGLTF.clear(path)']))
bridge=read('run/vault-isolation.js')
test('bridge requires verified parent source/channel',"e.source!==parent" in bridge and "e.data?.channel!==channel" in bridge)
test('bridge limits local package and explicit asset manifest','u.pathname.startsWith(root.pathname)&&allowedPaths.has' in bridge)
test('bridge GET only','Reference transport permits only GET' in bridge)
test('bridge disposal cleanup',all(x in bridge for x in ['vault-source-dispose','observer.disconnect()','URL.revokeObjectURL','pending.clear()','removeEventListener(\'message\',receiveMessage)','removeEventListener(\'click\',receiveClick']))
manifest=jread('run/asset-manifest.json')['allowedAssetPaths'];test('asset whitelist complete and internal',set(manifest)==set(str(p.relative_to(root/'run')) for p in (root/'run/assets').rglob('*') if p.is_file()))
html=read('run/index.html')
test('classic local scripts, no CDN/module imports',all(not s.startswith(('http:','https:','//')) for s in re.findall(r'<script[^>]+src="([^"]+)"',html)) and 'type="module"' not in html)
test('CSP blocks fonts/workers/objects',all(x in html for x in ["font-src 'none'","worker-src 'none'","object-src 'none'","default-src 'none'"]))
test('no navigable external source link in sandbox','<a href="http' not in read('adapter/src/components/layouts/Layout.jsx'))
meta=jread('build-evidence.json'); test('own build and exact tool version',meta['ownConfig'] and meta['version']=='0.25.10' and not meta['upstreamScriptsExecuted'])
jsinputs=meta['metafile']['outputs']['run/effect.js']['inputs']
for p in ['adapter/src/app/page.jsx','adapter/src/app/paper/page.jsx','adapter/src/app/spiral/page.jsx','adapter/src/webgl/materials/MeshImageMaterial.js','adapter/src/webgl/materials/MeshBannerMaterial.js','adapter/src/webgl/helpers/getCanvasTexture.js']:
 test('actual compiled source includes '+p,p in jsinputs and jsinputs[p]['bytesInOutput']>0)
test('Next/font shell absent from compiled inputs',not any('next/font' in p or 'assets/fonts/font-faces' in p for p in jsinputs))
for name in ['run/effect.js','run/vault-isolation.js']:
 proc=subprocess.run(['node','--check',str(root/name)],capture_output=True,text=True);test('JavaScript syntax: '+name,proc.returncode==0,proc.stderr.strip() or None)
for name in ['run/effect.js.map','run/effect.css.map']:
 j=jread(name);test('source map: '+name,j.get('version')==3 and len(j.get('sources',[]))==len(j.get('sourcesContent',[])))
for row in jread('run-hashes.json')['files']:
 p=root/row['path'];test('run hash: '+row['path'],p.stat().st_size==row['bytes'] and sha(p)==row['sha256'])
deps=jread('dependencies.json');test('dependency lock hash',sha(root/'dependency-lock.json')==deps['lockSha256'])
for row in deps['bundledPackageLicenses']:
 test('dependency notices: '+row['name']+'@'+row['version'],bool(row['notices']) and all(sha(root/n['path'])==n['sha256'] for n in row['notices']))
test('publisher grant explicitly distinct from repo license',jread('upstream.json')['license']['repositoryLicenseFile'] is None and 'repository LICENSE' in read('CODROPS-DEMO-LICENSE.txt'))
test('three variants are one entry',jread('provenance.json')['catalogEntryCount']==1)
mocks=jread('qa-runtime-contract.json');test('own mocked controller tests pass',mocks['passed']==mocks['total']==14 and not mocks['realR3FExecuted'])
report={'schema':'motion-vault.static-review.v1','passed':sum(r['passed'] for r in results),'total':len(results),'browserExecuted':False,'upstreamCodeExecuted':False,'runtimeStatus':'not_run','ownControllerMocks':'14/14 pass; no real React/R3F/Three runtime executed','visualStatus':'local render not captured','glbInspection':glb,'remaining':['Opaque allow-scripts-only iframe rendering at 1100x670','All image/model loads through host manifest bridge','All three routes and authored shader visual equivalence','Native orbit/dolly/pan with mouse/touch and cross-boundary release','Cold mount genuine pointer continuation','Reduced-motion first frame and direct orbit','Stop/resume/paint/dispose with real R3F, repeated mount and GPU memory','Original atlas dimensions versus device maxTextureSize','Local cover/recording and user design acceptance'],'results':results}
(root/'qa-static.json').write_text(json.dumps(report,indent=2)+'\n')
print(f"{report['passed']}/{report['total']} static checks passed. Real browser/GPU runtime remains not run.")
for r in results:
 if not r['passed']:print('FAIL:',r)
raise SystemExit(0 if report['passed']==report['total'] else 1)
