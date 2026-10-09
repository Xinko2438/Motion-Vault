"""Static-only package checks. Does not launch a browser or execute author app code."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import base64
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
checks = []
def check(name, condition, detail):
    checks.append({'check':name, 'passed':bool(condition), 'detail':detail})
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def load(name): return json.loads((ROOT / name).read_text())

upstream = load('upstream.json')
tree = load('adapter/upstream-git-tree.json')
blob_records = [r for r in tree['tree'] if r['type'] == 'blob']
actual_source = {p.relative_to(ROOT/'source').as_posix() for p in (ROOT/'source').rglob('*') if p.is_file()}
check('complete_pinned_source_tree', actual_source == {r['path'] for r in blob_records}, f'{len(blob_records)} Git blobs; no source additions/removals')
bad_blobs=[]
for r in blob_records:
    content=(ROOT/'source'/r['path']).read_bytes()
    if hashlib.sha1(b'blob '+str(len(content)).encode()+b'\0'+content).hexdigest()!=r['sha']: bad_blobs.append(r['path'])
check('all_git_blob_hashes_match', not bad_blobs, {'mismatches':bad_blobs,'commit':upstream['commit']})
check('source_sha256_manifest', all(sha(ROOT/f['path'])==f['sha256'] for f in upstream['sourceFiles']), 'All downloaded source SHA256 records match')
check('actual_mit_license_retained', (ROOT/'LICENSE').read_bytes()==(ROOT/'source/LICENSE').read_bytes() and 'MIT License' in (ROOT/'LICENSE').read_text(), 'Actual Codrops copyright and MIT permission retained byte-for-byte')
provenance=load('provenance.json')
unchanged=provenance['preservedByteExactly']
bad_core=[p for p in unchanged if (ROOT/'source'/p).read_bytes()!=(ROOT/'adapter'/p).read_bytes()]
check('author_core_preserved', not bad_core, {'unchangedFiles':unchanged,'mismatches':bad_core})
html=(ROOT/'run/index.html').read_text()
refs=re.findall(r'(?:src|href)=[\"\']([^\"\']+)', html)
check('local_html_resources_only', all(not re.match(r'(?:https?:)?//',r) and (ROOT/'run'/r).is_file() for r in refs), refs)
check('classic_script_sandbox_entry', 'type="module"' not in html and 'src="./effect.js"' in html, 'Classic bundle avoids opaque-origin module-fetch CORS requirements')
csp_match=re.search(r'<meta http-equiv="Content-Security-Policy" content="([^"]+)"',html)
csp=csp_match.group(1) if csp_match else ''
directives={parts[0]:parts[1:] for directive in csp.split(';') if (parts:=directive.strip().split())}
inline_scripts=re.findall(r'<script>([\s\S]*?)</script>',html)
inline_hashes=["'sha256-"+base64.b64encode(hashlib.sha256(script.encode()).digest()).decode()+"'" for script in inline_scripts]
expected_csp={"default-src":["'none'"],"script-src":["'self'",*inline_hashes],"style-src":["'self'","'unsafe-inline'"],"img-src":["'self'",'data:','blob:'],"connect-src":['blob:','data:'],"font-src":["'none'"],"base-uri":["'self'"],"form-action":["'none'"],"object-src":["'none'"],"frame-src":["'none'"],"worker-src":["'none'"]}
check('standalone_default_deny_csp',bool(csp_match) and directives==expected_csp and len(inline_scripts)==1 and csp_match.start()<html.index('<link') and csp_match.start()<html.index('<script'),{'directives':directives,'inlineScriptsAuthorizedBy':'exact SHA256; no unsafe-inline or unsafe-eval in script-src','browserEnforcementVerified':False})
check('csp_provenance_consistent',provenance.get('securityPolicy',{}).get('cspMeta')==csp and load('asset-manifest.json').get('contentSecurityPolicy')==csp,'Output, provenance and run manifest contain the same policy')
css=(ROOT/'run/effect.css').read_text()
check('author_styles_retained', css.startswith((ROOT/'source/src/css/style.css').read_text()), 'All author CSS retained before documented iframe-boundary additions')
check('no_external_styles_fonts', not re.search(r'@import|url\(\s*[\"\']?(?:https?:)?//',css), 'System monospace, no imported font/CDN/background image')
lock=load('dependency-lock.json')
original_lock=load('source/package-lock.json')
deps=['three','simplex-noise']
check('exact_author_dependency_versions', all(all(lock['packages']['node_modules/'+n][k]==original_lock['packages']['node_modules/'+n][k] for k in ['version','resolved','integrity']) for n in deps), {n:lock['packages']['node_modules/'+n]['version'] for n in deps})
check('only_two_runtime_dependencies', set(lock['packages'])=={'','node_modules/three','node_modules/simplex-noise'}, 'No transitive install scripts or extra runtime packages')
check('dependency_licenses_present', all((ROOT/'vendor-licenses'/f'{n}-LICENSE.txt').is_file() for n in deps), 'Actual installed package licenses copied')
check('no_upstream_configuration_executed', 'source/vite' not in (ROOT/'adapter/build.mjs').read_text() and load('dependencies.json')['install']['lifecycleScriptsExecuted'] is False, 'Own esbuild configuration; npm --ignore-scripts install recorded')
meta=load('adapter/build-metafile.json')
output=meta['outputs']['run/effect.js']
check('no_external_bundle_imports', output['imports']==[], output['imports'])
check('only_local_build_inputs', all(p.startswith(('adapter/','source-glsl:')) or ('node_modules/' in p and not p.startswith(('http:','https:'))) for p in meta['inputs']), list(meta['inputs']))
source_map=load('run/effect.js.map')
check('readable_source_map', source_map.get('version')==3 and len(source_map['sources'])==len(source_map['sourcesContent']) and all(c is not None for c in source_map['sourcesContent']), {'sourceCount':len(source_map['sources'])})
shaders=list((ROOT/'source/src/shaders').rglob('*.glsl'))
check('all_original_shader_bytes_in_map', all(s.read_text() in source_map['sourcesContent'] for s in shaders), [s.relative_to(ROOT).as_posix() for s in shaders])
for path in ['run/effect.js','run/vault-isolation.js','adapter/build.mjs']:
    result=subprocess.run(['node','--check',str(ROOT/path)],text=True,capture_output=True)
    check('syntax:'+path,result.returncode==0,(result.stdout+result.stderr).strip() or 'Node parse only; application not executed')
main=(ROOT/'adapter/src/js/main.ts').read_text()
check('explicit_raf_cancellation', 'cancelAnimationFrame(this.raf)' in main and 'stop() { this.running = false; this.cancelFrame() }' in main,'stop cancels request; resume resets timing')
check('native_reduced_motion_gating', 'matchMedia("(prefers-reduced-motion: reduce)")' in main and '!this.reducedMotion && !document.hidden' in main and 'this.reducedMotion && this.running' in main,'No ambient RAF when reduced; one author update requested by real input event')
check('native_input_retained', (ROOT/'adapter/src/js/utils/input.ts').read_bytes()==(ROOT/'source/src/js/utils/input.ts').read_bytes(),'Original mousemove and touchmove handlers; no synthetic events or pointer IDs')
check('resource_disposal_implemented', all(s in main for s in ['this.listeners.abort()', 'Input.destroy()', 'geometry.dispose()', 'material.dispose()', 'texture.dispose()', 'node.dispose()', 'this.gl?.dispose()', 'this.gl?.forceContextLoss()', 'this.gl?.domElement.remove()']), 'Static presence check only; actual GPU/event leak behavior unverified')
check('resource_frame_gated_promise', 'const ready = new Promise' in main and 'if(!app.paint())throw' in main and 'resolveReady({firstFrameSubmitted:true' in main and 'demo.ready =' not in main, 'Promise cannot resolve on window.load alone; actual scene construction and renderer submission required')
check('failed_boot_cleanup', '(app || constructingApp)?.destroy()' in main and 'app=null;constructingApp=null;' in main, 'Both constructor and later first-paint failure paths release owned partial App')
check('no_host_or_storage_access_in_app', not re.search(r'\b(?:localStorage|sessionStorage|indexedDB)\b|window\.parent|parent\.document|window\.top',main),'App never accesses parent document/state or storage')
bridge=(ROOT/'run/vault-isolation.js').read_text()
check('bridge_local_get_and_parent_channel_guard', all(s in bridge for s in ["e.source!==parent","e.data?.channel!==channel","method!=='GET'",'u.pathname.startsWith(root.pathname)','transportLifetime.abort()']), 'Existing package-scoped asset transport only; server-side manifest whitelist remains integration requirement')
manifest=load('asset-manifest.json')
check('run_manifest_hashes', all((ROOT/f['path']).is_file() and sha(ROOT/f['path'])==f['sha256'] for f in manifest['runFiles']), f"{len(manifest['runFiles'])} run files")
check('opaque_sandbox_contract', manifest['sandbox']=='allow-scripts' and manifest['allowSameOrigin'] is False and manifest['viewport']=={'width':1100,'height':670}, 'Declared contract, not a runtime iframe acceptance test')
check('no_external_runtime_assets', manifest['externalRuntimeRequests']==[] and not re.search(r'TextureLoader|FileLoader|fetch\(|XMLHttpRequest|https?://', ''.join(p.read_text() for p in (ROOT/'adapter/src/js').rglob('*.ts'))),'Application textures and geometry are procedural; generic unused Three engine loaders do not imply runtime requests')
check('honest_runtime_status', upstream['status']=='runtime_unverified' and provenance['visualEvidence']['localAdaptationVisualVerified'] is False and not provenance['visualEvidence']['localRecordingCreated'],'No browser/visual/interaction/video acceptance asserted')
report={'schema':'motion-vault.static-check-report.v1','id':'spatial-procedural-snake','checkedAt':datetime.now(timezone.utc).isoformat(),'status':'passed' if all(c['passed'] for c in checks) else 'failed','runtimeStatus':'runtime_unverified','browserExecuted':False,'localVideoCreated':False,'checks':checks,'notRun':['WebGL 2 context/shader runtime compilation','1100x670 actual rendering and scaled card interaction','Visual comparison to author demo','Real mouse/touch pointer target and cold mount behavior','Reduced-motion, visibility and stop/resume behavior in a browser','WebGL context loss/restoration','Actual GPU/listener/RAF disposal measurement','Opaque iframe loading with production host asset broker','User aesthetic acceptance'], 'limitations':['This is static/source/build verification only. It is not browser, runtime, visual, interaction, isolation-runtime or acceptance evidence.']}
(ROOT/'qa-static.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'status':report['status'],'checks':len(checks),'passed':sum(c['passed'] for c in checks),'runtimeStatus':report['runtimeStatus']},ensure_ascii=False))
for c in checks:
    if not c['passed']: print('FAILED:',c['check'],c['detail'])
sys.exit(0 if report['status']=='passed' else 1)
