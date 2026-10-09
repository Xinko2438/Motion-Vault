from pathlib import Path
import hashlib
import json
import re
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
COMMIT = 'fce15746389d8a358be228d92d3c82fb989be915'
REPO = 'https://github.com/Sujenphea/procedural-snake'
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def write(name, value):
    if name == 'source-map.json':
        entries=[]; seen=set()
        for item in value:
            p=ROOT/item['path']
            paths=[p] if p.is_file() else [q for q in sorted(p.rglob('*')) if q.is_file() and q.suffix in ['.js','.jsx','.ts','.tsx','.glsl','.css','.scss','.html'] and not any(part in ['font','fonts','node_modules','private','dist'] for part in q.relative_to(ROOT).parts)]
            for q in paths:
                rel=q.relative_to(ROOT).as_posix()
                if rel not in seen and not rel.endswith('.map'):
                    entries.append(dict(item,path=rel)); seen.add(rel)
        value=entries
    (ROOT/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
def record(path): return {'path': path.relative_to(ROOT).as_posix(), 'bytes': path.stat().st_size, 'sha256': sha(path)}
files = [record(p) for p in sorted((ROOT / 'source').rglob('*')) if p.is_file()]
tree = json.loads((ROOT / 'adapter/upstream-git-tree.json').read_text())
git = {e['path']: e['sha'] for e in tree['tree'] if e['type'] == 'blob'}
for f in files:
    rel = f['path'].removeprefix('source/')
    f['gitBlob'] = git[rel]
    f['downloadUrl'] = REPO.replace('github.com', 'raw.githubusercontent.com') + '/' + COMMIT + '/' + rel
preserved = [p.relative_to(ROOT / 'source').as_posix() for p in sorted((ROOT / 'source/src').rglob('*')) if p.is_file() and p.suffix in ('.ts', '.glsl') and p.name != 'main.ts']
csp = re.search(r'<meta http-equiv="Content-Security-Policy" content="([^"]+)"', (ROOT / 'run/index.html').read_text()).group(1)
write('upstream.json', {
    'id': 'spatial-procedural-snake', 'source_kind': 'adapted_author_source', 'repository': REPO,
    'commit': COMMIT, 'author': 'Sujen', 'licenseCopyrightHolder': 'Codrops',
    'article': 'https://tympanus.net/codrops/?p=108307', 'demo': 'https://tympanus.net/Tutorials/WebGLSnakeAnimation/',
    'license': {'name': 'MIT', 'file': 'source/LICENSE', 'url': REPO + '/blob/' + COMMIT + '/LICENSE', 'sha256': sha(ROOT / 'source/LICENSE')},
    'archive': {'url': 'https://codeload.github.com/Sujenphea/procedural-snake/tar.gz/' + COMMIT, 'includedInRelease': False, 'purpose': 'Retrieval provenance; exact source blobs included separately.'},
    'sourceFiles': files, 'fetchedAt': '2026-10-07T09:37:23Z', 'commitResolution': 'GitHub connector commits collection and complete recursive Git tree',
    'upstreamBuildScriptsExecuted': False, 'upstreamLifecycleScriptsExecuted': False,
    'status': 'runtime_unverified', 'runtimeStatus': 'runtime_unverified',
})
write('provenance.json', {
    'schema': 'motion-vault.source-provenance.v1', 'id': 'spatial-procedural-snake', 'kind': 'adapted_author_source',
    'repository': REPO, 'commit': COMMIT, 'upstreamEntry': 'source/src/js/main.ts', 'localEntry': 'run/index.html', 'readableEffect': 'run/effect.js',
    'preservedByteExactly': preserved,
    'adaptations': ['Only main.ts runtime lifecycle is patched; author scene/geometry/shaders/curves/input/properties retained.', 'Exact Three 0.182.0 and simplex-noise 4.0.3 bundled by own esbuild 0.25.10 configuration.', 'Original remote analytics, ads and favicons removed; navigation text retained as non-navigating spans.', 'Native reduced-motion respects the system, without ambient RAF; real input advances one author simulation step.', 'Real stop/resume/dispose/current-state paint hooks; input, GPU buffers, textures, material and renderer cleanup.', 'Existing opaque sandbox transport reused with dispose cleanup; no parent UI/state or storage access.', 'Ready Promise resolves only after procedural scene initialization and a real first render submission; shader or initialization errors reject, including cleanup of partially constructed App.'],
    'sourceDiff': 'adapter/effect.diff',
    'securityPolicy': {'cspMeta': csp, 'inlineScriptAuthorization': 'SHA256 of the unchanged original inline class initialization', 'externalNetworkAllowed': False, 'browserEnforcementVerified': False, 'note': 'Standalone default-deny CSP is emitted before styles/scripts. Opaque sandbox remains allow-scripts only.'},
    'visualEvidence': {'localAdaptationVisualVerified': False, 'localRecordingCreated': False, 'browserExecuted': False},
    'assetCaveats': [{'status': 'no_external_runtime_art_assets', 'reason': 'All snake/ball geometry, shader textures and colors are procedural. No external photos, models, fonts, audio or HDR environment included.'}, {'status': 'external_readme_preview_rights_not_asserted', 'reason': 'Original README includes an external Codrops preview image URL; it is retained only as upstream documentation, not downloaded or used at runtime. Code MIT is not an independent permission for that image or branding.'}],
    'bridge': {'source': 'adapter/source-isolation-bridge.original.js', 'originalSha256': sha(ROOT / 'adapter/source-isolation-bridge.original.js'), 'adapted': 'run/vault-isolation.js', 'adaptedSha256': sha(ROOT / 'run/vault-isolation.js'), 'manifest': 'asset-manifest.json', 'textureRequestsRequired': False},
    'validation': {'staticReport': 'qa-static.json', 'runtimeStatus': 'runtime_unverified', 'visualAcceptance': 'unverified', 'userAcceptance': 'not_requested'},
})
lock = json.loads((ROOT / 'adapter/npm/package-lock.json').read_text())
write('dependency-lock.json', lock)
deps = []
for name in ['three', 'simplex-noise']:
    d = lock['packages']['node_modules/' + name]
    deps.append({'name': name, **d, 'licenseFile': 'vendor-licenses/' + name + '-LICENSE.txt', 'licenseSha256': sha(ROOT / 'vendor-licenses' / (name + '-LICENSE.txt'))})
write('dependencies.json', {'schema': 'motion-vault.pinned-dependencies.v1', 'runtime': deps, 'tooling': {'name': 'esbuild', 'version': '0.25.10', 'upstreamConfigExecuted': False}, 'install': {'lifecycleScriptsExecuted': False, 'command': 'npm install --ignore-scripts --no-audit --no-fund --registry=https://registry.npmjs.org --cache=/tmp/motion-vault-snake-npm-cache'}, 'lock': 'dependency-lock.json', 'lockSha256': sha(ROOT / 'dependency-lock.json'), 'bundle': record(ROOT / 'run/effect.js')})
write('source-map.json', [
    {'path': 'source/src/js/main.ts', 'role': 'author_entry_camera_and_renderer'},
    {'path': 'source/src/js/components/Snake.ts', 'role': 'author_instanced_scale_geometry_target_ball_materials_and_uniforms'},
    {'path': 'source/src/js/curves/CurveGenerator.ts', 'role': 'author_steering_seek_orbit_noise_coil_and_turn_limiter'},
    {'path': 'source/src/js/curves/EndlessCurve.ts', 'role': 'author_sliding_bezier_path_parallel_transport_frames'},
    {'path': 'source/src/shaders/', 'role': 'all_four_author_GLSL_shaders_unchanged'},
    {'path': 'source/src/js/utils/input.ts', 'role': 'unchanged_native_mouse_and_touch_input'},
    {'path': 'adapter/src/js/main.ts', 'role': 'readable_lifecycle_and_reduced_motion_adaptation'},
    {'path': 'adapter/build-local.py', 'role': 'deterministic_own_source_transform'},
    {'path': 'adapter/build.mjs', 'role': 'own_esbuild_config_never_imports_upstream_build_configuration'},
    {'path': 'run/effect.js', 'role': 'readable_classic_script_local_bundle'},
])
params = [
    ('camera.fov', 45, 'source/src/js/main.ts', '透视视角，保留原作空间构图'),
    ('camera.position', [0,15,20], 'source/src/js/main.ts', '相机看向原点'),
    ('desktop.length', 26, 'source/src/js/utils/properties.ts', '原作高质量蛇身长度'),
    ('desktop.spineSegments', 100, 'source/src/js/utils/properties.ts', '纵向鳞片排数'),
    ('desktop.radialSegments', 8, 'source/src/js/utils/properties.ts', '每环鳞片数，默认共 800 个实例'),
    ('desktop.texturePoints', 100, 'source/src/js/utils/properties.ts', '曲线位置/法线浮点纹理采样点数'),
    ('desktop.dpr', 'min(2, devicePixelRatio)', 'source/src/js/utils/properties.ts', '保留上游设备质量策略，不人为降档'),
    ('speed', 4, 'source/src/js/components/Snake.ts', '沿曲线移动速度'),
    ('targetLerp', 0.1, 'source/src/js/components/Snake.ts', '原生目标球逐帧插值'),
    ('orbitRadius', 'max(1, min(2.5, viewportWidth / 800))', 'source/src/js/components/Snake.ts', '1100 宽时为 1.375'),
    ('segmentLength', {'min':4,'max':8}, 'source/src/js/components/Snake.ts', '新 Bézier 段随机长度范围'),
    ('maxTurnRate', 1.15, 'source/src/js/components/Snake.ts', '每段最大转角，弧度'),
    ('wanderWeight', 0.2, 'source/src/js/components/Snake.ts', '噪声游走权重'),
    ('wanderStrength', 'Math.PI / 12', 'source/src/js/components/Snake.ts', '水平游走强度'),
    ('tiltStrength', 'Math.PI / 24', 'source/src/js/components/Snake.ts', '垂直倾斜强度'),
    ('coilAmplitude', 3.0, 'source/src/js/components/Snake.ts', '盘旋高度幅值'),
    ('coilFrequency', 0.25, 'source/src/js/components/Snake.ts', '盘旋上下频率'),
    ('u_baseColor', '#2a9d8f', 'source/src/js/components/Snake.ts', '青绿基底'),
    ('u_spotColor', '#e76f51', 'source/src/js/components/Snake.ts', '珊瑚斑点'),
    ('u_spotScale', 5.0, 'source/src/js/components/Snake.ts', '斑点空间尺度'),
    ('u_spotThreshold', 0.6, 'source/src/js/components/Snake.ts', '斑点阈值'),
    ('u_scaleMin/u_scaleMax', [0.13,0.65], 'source/src/js/utils/properties.ts', '高质量蛇体最小/最大粗细'),
    ('u_radiusN/u_radiusB', [0.5,0.8], 'source/src/js/components/Snake.ts', '截面垂直与水平比例'),
    ('u_twistAmount', 3.0, 'source/src/js/components/Snake.ts', '鳞片绕脊线的扭转'),
    ('u_specularPower/u_specularIntensity', [27,0.5], 'source/src/js/components/Snake.ts', '镜面高光'),
    ('u_fresnelPower/u_fresnelIntensity', [3.5,0.3], 'source/src/js/components/Snake.ts', '边缘高光'),
    ('u_normalPerturbScale/u_normalPerturbStrength', [20,0.05], 'source/src/js/components/Snake.ts', '表面细节尺度与强度'),
    ('u_anisotropicStrength/u_anisotropicRoughness', [0.35,0.5], 'source/src/js/components/Snake.ts', '延长反射形态'),
    ('ball.radius/color', [0.3,'#44ddff'], 'source/src/js/components/Snake.ts', '真实追逐目标球'),
]
write('parameters.json', {'id': 'spatial-procedural-snake', 'editing': 'Edit these source constants in adapter/src equivalents, rebuild, and verify. No runtime parameter UI is asserted.', 'previewViewport': {'width':1100,'height':670,'scaling':'host iframe scale, no source camera replacement'}, 'parameters': [{'name': n, 'default': d, 'source': s, 'meaning': m} for n,d,s,m in params], 'reducedMotion': {'source':'native matchMedia', 'ambientRAF':False, 'directInput':'one original simulation step per real mouse/touch move'}, 'randomness':'Original unseeded Math.random and simplex noise retained; frames differ on reload.'})
run_files = [record(p) for p in sorted((ROOT / 'run').rglob('*')) if p.is_file() and p.suffix != '.map']
write('asset-manifest.json', {'schema':'motion-vault.local-run-assets.v1', 'id':'spatial-procedural-snake', 'entry':'run/index.html', 'sandbox':'allow-scripts', 'allowSameOrigin':False, 'contentSecurityPolicy':csp, 'viewport':{'width':1100,'height':670}, 'externalRuntimeRequests':[], 'runFiles':run_files})
print('Source/dependency/provenance/parameter/asset metadata written.')
