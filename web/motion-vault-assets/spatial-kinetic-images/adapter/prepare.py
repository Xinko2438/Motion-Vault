"""Own static transforms. Never imports or executes pinned upstream code/config."""
from pathlib import Path
import shutil,difflib,json
root=Path(__file__).resolve().parent.parent
src=root/'source/src'; dst=root/'adapter/src'
if dst.exists(): shutil.rmtree(dst)
shutil.copytree(src,dst)
def change(p,old,new):
 f=dst/p; s=f.read_text(); assert old in s,(p,old); f.write_text(s.replace(old,new))
for name in ['Billboard','Banner','Paper','Spiral']:
 p=f'components/webgl/{name}/{name}.jsx'
 f=dst/p; s=f.read_text(); s="import { kineticRuntime } from '@adapter/runtime.js';\n"+s
 s=s.replace('useFrame((state, delta) => {','useFrame((state, delta) => {\n        if (!kineticRuntime.ambientAllowed()) return;')
 f.write_text(s)
change('data/images.js',"url: '/images/","url: './assets/images/")
change('components/webgl/Banner/Banner.jsx',"useTexture('/banner.jpg')","useTexture('./assets/banner.jpg')")
change('components/webgl/Banner/Banner.jsx',"import { useRef } from 'react';","import { useRef, useEffect } from 'react';")
change('components/webgl/Banner/Banner.jsx','texture.wrapS = texture.wrapT = THREE.RepeatWrapping;',"texture.wrapS = texture.wrapT = THREE.RepeatWrapping;\n    useEffect(() => () => { texture.dispose(); useTexture.clear('./assets/banner.jpg'); }, [texture]);")
for name in ['Paper','Spiral']:
 p=f'components/webgl/{name}/{name}.jsx'
 f=dst/p;s=f.read_text();s="import { useModelDisposal } from '@adapter/model-disposal.js';\n"+s
 s=s.replace(f"useGLTF('/{name.lower()}.glb')",f"useGLTF('./assets/{name.lower()}.glb', false, false)")
 s=s.replace('const mesh = scene.children[0];',f"const mesh = scene.children[0];\n    useModelDisposal(scene, './assets/{name.lower()}.glb');")
 f.write_text(s)
# Preserve the material class itself verbatim. Dispose the model's replaced material only.
change('components/webgl/Spiral/Spiral.jsx','mesh.material = new MeshImageMaterial({','mesh.material?.dispose();\n    mesh.material = new MeshImageMaterial({')
# Wrap modes with errors instead of claiming ready when collage decoding failed.
for p in ['app/page.jsx','app/paper/page.jsx','app/spiral/page.jsx']:
 f=dst/p;s=f.read_text().replace('isLoading } = useCollageTexture','isLoading, error } = useCollageTexture')
 s=s.replace('if (isLoading) return <Loader />;', 'if (error) throw error;\n    if (isLoading) return <Loader />;')
 f.write_text(s)
# Next-only shell is replaced by a small hash router, preserving source UI and modes.
change('components/layouts/Layout.jsx',"import dynamic from 'next/dynamic';", "import Scene from '@/webgl/Scene';")
change('components/layouts/Layout.jsx',"import { usePathname } from 'next/navigation';", "import { usePathname } from '@adapter/router.jsx';")
change('components/layouts/Layout.jsx',"import Link from 'next/link';", "import { Link } from '@adapter/router.jsx';")
change('components/layouts/Layout.jsx',"const Scene = dynamic(() => import('@/webgl/Scene'), { ssr: false });",'// Source Scene is statically bundled; no Next runtime, routing server or origin access.')
f=dst/'components/layouts/Layout.jsx';s=f.read_text()
import re
s=re.sub(r'<a href="([^"]+)">', r'<span data-source-href="\1">', s).replace('</a>','</span>')
f.write_text(s)
# Keep original Canvas/View/tunnel topology, with actual R3F frame-loop control.
change('webgl/Scene.jsx',"import * as THREE from 'three';", "import { useSyncExternalStore } from 'react';\nimport { kineticRuntime, FrameWitness } from '@adapter/runtime.js';")
change('webgl/Scene.jsx','return (\n        <Canvas {...props}>', "const frameloop = useSyncExternalStore(kineticRuntime.subscribe, kineticRuntime.getFrameloop);\n    return (\n        <Canvas {...props} frameloop={frameloop}>")
change('webgl/Scene.jsx','<r3f.Out />','<FrameWitness />\n            <r3f.Out />')
# OrbitControls remains Drei's native implementation; mark only the live gesture viewport non-selectable.
change('webgl/View.jsx','<div ref={localRef} {...props} />','<div ref={localRef} {...props} style={{ ...props.style, touchAction: \'none\', userSelect: \'none\' }} />')
change('webgl/View.jsx', "import { Three } from '@/webgl/helpers/Three';", "import { Three } from '@/webgl/helpers/Three';\nimport { SceneReadyWitness, kineticRuntime } from '@adapter/runtime.js';")
change('webgl/View.jsx', '{orbit && <OrbitControls />}', '{orbit && <OrbitControls ref={kineticRuntime.controlRef} />}\n                    <SceneReadyWitness />')
# Async texture ownership: reject on load failure, cancel state updates, dispose pending/completed CanvasTexture.
(dst/'hooks/useCollageTexture.jsx').write_text('''import { useState, useEffect } from 'react';
import { getCanvasTexture } from '@/webgl/helpers/getCanvasTexture';

export default function useCollageTexture(images, options = {}) {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { gap = 0, canvasHeight = 512, canvasWidth = 512, axis = 'x' } = options;
    useEffect(() => {
        let cancelled = false;
        let ownedTexture = null;
        setIsLoading(true);
        setError(null);
        getCanvasTexture({ images, gap, canvasHeight, canvasWidth, axis })
            .then(value => {
                if (cancelled) { value.texture.dispose(); return; }
                ownedTexture = value.texture;
                setResult(value);
                setIsLoading(false);
            }).catch(reason => {
                if (cancelled) return;
                setError(reason instanceof Error ? reason : new Error('Failed to create texture'));
                setIsLoading(false);
            });
        return () => { cancelled = true; ownedTexture?.dispose(); };
    }, [images, gap, canvasHeight, canvasWidth, axis]);
    return { texture: result?.texture || null, dimensions: result?.dimensions || null, isLoading, error };
}
''')
# Copy byte-exact public images and model data into this package only.
shutil.copytree(root/'source/public',root/'run/assets',dirs_exist_ok=True)
changes=[]
for f in sorted(dst.rglob('*')):
 if f.is_file():
  orig=src/f.relative_to(dst)
  if orig.read_bytes()!=f.read_bytes():
   changes.extend(difflib.unified_diff(orig.read_text().splitlines(True),f.read_text().splitlines(True),fromfile='source/src/'+str(f.relative_to(dst)),tofile='adapter/src/'+str(f.relative_to(dst))))
(root/'adapter/effect.diff').write_text(''.join(changes))
print('Prepared source-derived components without executing upstream code.')
