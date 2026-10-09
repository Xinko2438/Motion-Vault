import { useModelDisposal } from '@adapter/model-disposal.js';
import { kineticRuntime } from '@adapter/runtime.js';
'use client';

import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

function setupPaperMaterial(texture, material) {
    material.map = texture;
    material.toneMapped = false;
}

function Paper({ texture, ...props }) {
    const { scene } = useGLTF('./assets/paper.glb', false, false);

    const mesh = scene.children[0];
    useModelDisposal(scene, './assets/paper.glb');

    useEffect(() => {
        if (!texture) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        setupPaperMaterial(texture, mesh.material);
    }, [texture, mesh.material]);

    useFrame((state, delta) => {
        if (!kineticRuntime.ambientAllowed()) return;
        if (!texture) return;
        texture.offset.y += delta / 30;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });

    return <primitive {...props} object={scene} />;
}

export default Paper;
