import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
export function useModelDisposal(scene, path) {
    useEffect(() => () => {
        const geometries = new Set(), materials = new Set();
        scene.traverse(node => {
            if (node.geometry) geometries.add(node.geometry);
            if (node.material) for (const material of Array.isArray(node.material) ? node.material : [node.material]) materials.add(material);
        });
        for (const geometry of geometries) geometry.dispose();
        for (const material of materials) material.dispose();
        // Collage maps have separate ownership in useCollageTexture.
        useGLTF.clear(path);
    }, [scene, path]);
}
