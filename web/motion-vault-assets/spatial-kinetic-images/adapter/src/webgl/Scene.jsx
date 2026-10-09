'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { r3f } from '@/webgl/helpers/global';
import { useSyncExternalStore } from 'react';
import { kineticRuntime, FrameWitness } from '@adapter/runtime.js';

export default function Scene(props) {
    const frameloop = useSyncExternalStore(kineticRuntime.subscribe, kineticRuntime.getFrameloop);
    return (
        <Canvas {...props} frameloop={frameloop}>
            <FrameWitness />
            <r3f.Out />
            <Preload all />
        </Canvas>
    );
}
