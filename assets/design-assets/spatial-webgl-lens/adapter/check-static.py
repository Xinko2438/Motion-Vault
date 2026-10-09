"""Own static-only source, packaging and lifecycle contract check. No browser/application execution."""
from pathlib import Path
import hashlib,json,re,subprocess
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[1]
checks=[]
def check(name,value):checks.append({'check':name,'passed':bool(value)})
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for f in json.loads((ROOT/'upstream.json').read_text())['files']:
 p=ROOT/'source'/f['path'];b=p.read_bytes();check('pinned source '+f['path'],len(b)==f['bytes'] and sha(p)==f['sha256'] and hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==f['gitBlobSha'])
for p in sorted((ROOT/'run').rglob('*.js')):
 check('syntax only '+p.relative_to(ROOT).as_posix(),subprocess.run(['node','--check',str(p)],capture_output=True).returncode==0)
html=(ROOT/'run/index.html').read_text();refs=re.findall(r'(?:src|href)="([^"]+)"',html)
check('relative local HTML resources',all(p.startswith('./') and (ROOT/'run'/p).is_file() for p in refs))
check('classic bundle before opaque sandbox execution','type="module"' not in html)
effect=(ROOT/'run/effect.js').read_text()

for p in (ROOT/'source/public/fonts').glob('*.woff'):check('exact OFL font pair '+p.name,p.read_bytes()==(ROOT/'run/fonts'/p.name).read_bytes())
material=lambda p:re.search(r'<MeshTransmissionMaterial[\s\S]*?/>',p.read_text()).group(0)
check('authored material parameters',material(ROOT/'source/src/Lens.jsx')==material(ROOT/'adapter/source/src/Lens.jsx'))
runtime=(ROOT/'adapter/runtime.jsx').read_text();build=(ROOT/'adapter/build.mjs').read_text()
check('four tracked ArrayBuffer fonts','new FontFace(family,data' in runtime and 'data:' not in runtime)
check('ready waits actual text sync and screen frame','lifetime.texts.size>=9' in runtime and 'onSync={mesh=>' in runtime and 'gl.getRenderTarget()===null' in runtime and 'resolveReady({' in runtime)
check('nine authored text instances',len(re.findall(r'<(?:Headline|Subtitle|BodyCopy)\b',(ROOT/'source/src/App.jsx').read_text()))==9)
check('stable store selector','useThree(s=>s.get)' in runtime)
check('frameloop reads current store snapshot','const state=snapshot?.get?.()||snapshot' in runtime)
check('reduced motion retains native wheel','lenis.options.smoothWheel=!preference.matches' in runtime and 'smoothWheel: !window.__vaultReduce' in build)
check('demand frames request root screen render','lifetime.requestRender?.();' in runtime)
check('Troika explicit private resource cleanup','disposeVaultTextResources();' in runtime and 'function disposeVaultTextResources' in effect)
check('late Draco init is terminally guarded','draco._initDecoder=()=>{if(lifetime.disposed)' in runtime)
check('CSP local Draco WASM and blob worker',"'wasm-unsafe-eval'" in html and 'worker-src blob:' in html)
check('no CSS font fetch','@import' not in (ROOT/'run/layout.css').read_text())

result={'schema':'motion-vault.source-contract-static.v1','id':ROOT.name,'checkedAt':datetime.now(timezone.utc).isoformat(),'passed':sum(x['passed'] for x in checks),'total':len(checks),'checks':checks,'bundleSha256':sha(ROOT/'run/effect.js'),'browserExecuted':False,'runtime':'not_run','visualAcceptance':'pending','scope':'Source/parse/asset checks only; runtime contract predicates have not executed in a browser.'}
(ROOT/'qa-static.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:result[k] for k in ['id','passed','total','runtime']}))
if result['passed']!=result['total']:raise SystemExit(1)
