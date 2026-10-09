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

runtime=(ROOT/'adapter/index.js').read_text()
check('original full grids retained',runtime.count('rowCount: 400')==2 and runtime.count('columnCount: 400')==2)
check('ready waits texture and first frame','initialized=Boolean(owned.grid.material.uniforms.uTexture.value)' in runtime and 'resolveReady({textureLoaded:true,firstFrameSubmitted:true' in runtime)
check('resource-owning early contract','const owned =' in runtime and 'window.SourceDemo={ready' in runtime)
check('original progress preserved','uAnimationProgress.value = ev.value' in runtime)
check('native pane repaint under reduced motion',runtime.count('queueMicrotask(paint)')>=5 and 'if (!preference.matches && !stopped && !failure)' in runtime)
check('terminal disposal and late texture release','Disposed before ready' in runtime and 'if(disposed){for(const item' in runtime)
for p in (ROOT/'source/src/Grid/shaders').glob('*.glsl'):check('shader code bundled '+p.name,json.dumps(p.read_text(),ensure_ascii=False)[1:-1] in effect or p.read_text().strip()[:80] in effect)

result={'schema':'motion-vault.source-contract-static.v1','id':ROOT.name,'checkedAt':datetime.now(timezone.utc).isoformat(),'passed':sum(x['passed'] for x in checks),'total':len(checks),'checks':checks,'bundleSha256':sha(ROOT/'run/effect.js'),'browserExecuted':False,'runtime':'not_run','visualAcceptance':'pending','scope':'Source/parse/asset checks only; runtime contract predicates have not executed in a browser.'}
(ROOT/'qa-static.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({k:result[k] for k in ['id','passed','total','runtime']}))
if result['passed']!=result['total']:raise SystemExit(1)
