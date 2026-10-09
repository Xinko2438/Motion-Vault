'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { OrbitControls, View as ViewImpl } from '@react-three/drei';
import { Three } from '@/webgl/helpers/Three';
import { SceneReadyWitness, kineticRuntime } from '@adapter/runtime.js';

const View = forwardRef(({ children, orbit, ...props }, ref) => {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    return (
        <>
            <div ref={localRef} {...props} style={{ ...props.style, touchAction: 'none', userSelect: 'none' }} />
            <Three>
                <ViewImpl track={localRef}>
                    {children}
                    {orbit && <OrbitControls ref={kineticRuntime.controlRef} />}
                    <SceneReadyWitness />
                </ViewImpl>
            </Three>
        </>
    );
});

View.displayName = 'View';

export { View };
