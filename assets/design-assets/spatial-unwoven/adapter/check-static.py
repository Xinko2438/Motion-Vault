"""Static verification only. Does not execute author JS, dependencies or a browser."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
results = []
def check(name, condition):
    results.append({'check': name, 'passed': bool(condition)})
    if not condition:
        raise AssertionError(name)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()

upstream = json.loads((ROOT/'adapter/upstream-git-tree.json').read_text())
for f in upstream['files']:
    p = ROOT/'source'/f['path']
    data = p.read_bytes()
    blob = hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
    check('pinned-source: '+f['path'], len(data)==f['bytes'] and blob==f['gitBlobSha'])

source = (ROOT/'source/index.html').read_text()
effect = (ROOT/'run/effect.js').read_text()
for name, pattern in [
    ('original CONFIG defaults',r'const CONFIG = \{[\s\S]*?\n  };'),
    ('original vertex shader',r'const VERTEX_SHADER = /\* glsl \*/ `[\s\S]*?`;'),
    ('original fragment shader',r'const FRAGMENT_SHADER = /\* glsl \*/ `[\s\S]*?`;'),
    ('original independent ribbon geometry',r'function buildRibbonGeometry\([\s\S]*?\n  }'),
    ('original strip layout',r'function rebuildStrip\([\s\S]*?\n  }'),
    ('original responsive sizing',r'function resize\([\s\S]*?\n  }'),
]:
    check(name, re.search(pattern,source).group(0)==re.search(pattern,effect).group(0))
check('26 ribbons retained',bool(re.search(r'threads:\s*26\b',effect)))
check('normal drag velocity smoothing retained','dragVelocity += (-dx / dt - dragVelocity) * 0.35;' in effect)
check('normal release easing retained','duration: 2.2, ease: "power3.out"' in effect)

lock = json.loads((ROOT/'dependency-lock.json').read_text())
for p in lock['packages']:
    check('pinned vendor: '+p['name'],sha(ROOT/p['file'])==p['sha256'])
    check('package archive integrity recorded: '+p['name'],p['integrity'].startswith('sha512-'))
check('dependency lifecycle scripts not executed',lock['lifecycleScriptsExecuted'] is False)
check('no font artifacts',not any(p.suffix.lower() in ['.woff','.woff2','.ttf','.otf','.eot'] for p in (ROOT/'run').rglob('*')))
for image in (ROOT/'source/img').glob('*.jpg'):
    check('local portrait byte match: '+image.name,sha(image)==sha(ROOT/'run/img'/image.name))

html = (ROOT/'run/index.html').read_text()
resources = re.findall(r'(?:src|href)="([^"]+)"',html)
check('HTML resources are own-package relative',all(p.startswith('./') and (ROOT/'run'/p).is_file() for p in resources))
check('bridge precedes dependencies and effect',html.index('vault-isolation.js')<html.index('vendor/three.min.js')<html.index('effect.js'))
check('run has no author CDN scripts','http:' not in html and 'https:' not in html and 'cdnjs' not in effect)
check('no storage or host-state API',not re.search(r'localStorage|sessionStorage|document\.cookie|parent\.|top\.',effect))
check('reduced motion does not force timer or introduction','if (!reduceMotion) gsap.ticker.add(tick);' in effect and 'if (reduceMotion) {\n    shared.uStrength.value = 1;' in effect)
check('real-pointer capture, no synthetic event generation','stage.setPointerCapture(event.pointerId)' in effect and 'new PointerEvent' not in effect and 'new MouseEvent' not in effect)
for method in ['stop','resume','dispose','paint']:
    check('lifecycle method implemented: '+method,'function '+method+'(' in effect)
check('ticker removed on stop','gsap.ticker.remove(tick);' in effect)
check('dispose releases GPU objects',all(s in effect for s in ['geometry?.dispose()','slot.texture.dispose()','slot.material.dispose()','renderer.dispose()','renderer.forceContextLoss()']))
check('resource-and-first-render ready Promise', 'const ready = new Promise' in effect and 'resolveReady({assetsLoaded:assetState.loaded, firstFrameSubmitted:true' in effect and 'demo.ready =' not in effect)
check('partial-initialization resource ownership', 'const owned =' in effect and 'demo.dispose = () =>' in effect and 'owned.renderer?.dispose()' in effect)
check('terminal disposal rejects pending readiness', 'rejectReady(new DOMException("Disposed before ready", "AbortError"))' in effect)
bridge=(ROOT/'run/vault-isolation.js').read_text()
check('transport same source and session guard',"e.source!==parent" in bridge and "e.data?.channel!==channel" in bridge)
check('transport closes its own pending requests and Blob URLs',all(s in bridge for s in ['vault-source-dispose','URL.revokeObjectURL(url)','pending.clear()','observer.disconnect()']))
for f in ['effect.js','vault-isolation.js','vendor/three.min.js','vendor/gsap.min.js']:
    r=subprocess.run(['node','--check',str(ROOT/'run'/f)],capture_output=True,text=True)
    check('syntax parse only: '+f,r.returncode==0)

result={'schema':'motion-vault.static-review.v1','passed':len(results),'total':len(results),
    'browserExecuted':False,'upstreamCodeExecuted':False,'runtimeStatus':'not_run',
    'visualStatus':'author screenshot reviewed; local render not captured',
    'remaining':['Opaque allow-scripts-only iframe rendering','All six broker-loaded image uploads','Normal autoplay and true drag','Cold-start held pointer, cancel and cross-boundary release','Reduced-motion static state and direct manipulation','Stop/resume/dispose and repeated mount resource cleanup','1100x670 viewport scaled in gallery'],
    'results':results}
(ROOT/'qa-static.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps({'passed':len(results),'total':len(results),'runtime':'NOT RUN'},indent=2))
