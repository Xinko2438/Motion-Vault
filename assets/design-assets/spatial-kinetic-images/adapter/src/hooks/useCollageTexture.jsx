import { useState, useEffect } from 'react';
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
