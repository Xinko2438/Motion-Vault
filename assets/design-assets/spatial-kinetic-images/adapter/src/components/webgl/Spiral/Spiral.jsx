import { useModelDisposal } from '@adapter/model-disposal.js';
import { kineticRuntime } from '@adapter/runtime.js';
'use client';

import * as THREE from 'three';
import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MeshImageMaterial } from '@/webgl/materials/MeshImageMaterial';

function setupSpiralMaterial(texture, mesh) {
    mesh.material?.dispose();
    mesh.material = new MeshImageMaterial({
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false,
    });
}

function Spiral({ texture }) {
    const { scene } = useGLTF('./assets/spiral.glb', false, false);
    const mesh = scene.children[0];
    useModelDisposal(scene, './assets/spiral.glb');

    useEffect(() => {
        if (!texture) return;
        texture.colorSpace = THREE.SRGBColorSpace;
        setupSpiralMaterial(texture, mesh);
    }, [texture, mesh]);

    useFrame((state, delta) => {
        if (!kineticRuntime.ambientAllowed()) return;
        const material = mesh.material;

        if (!material || !material.map) return;
        material.map.offset.x -= delta / 50;
        material.map.wrapS = THREE.RepeatWrapping;
        material.map.wrapT = THREE.RepeatWrapping;
    });

    return <primitive object={scene} />;
}

export default Spiral;
