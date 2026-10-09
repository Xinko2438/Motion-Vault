import { useEffect } from 'react';
import { useFrame, useThree, addAfterEffect } from '@react-three/fiber';

const media = matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set(), scenes = new Set(), controls = new Set();
let stopped = false, disposed = false, storeGetter = null, frameCallbacks = 0;
let unmount = null, afterFrameCleanup = null, rendererCleanup = null;
let route = '/', sceneReady = null, candidateFrame = null, failure = null, phase = 'loading';
let resolveReady, rejectReady, ready, disposalPromise;
const disposalErrors = [];
function resetReady() {
    ready = new Promise((resolve, reject) => { resolveReady = resolve; rejectReady = reject; });
    // Consumers still receive a rejected promise. This only avoids an unhandled
    // rejection if the host destroys the iframe before it subscribes.
    ready.catch(() => {});
}
resetReady();
const state = () => storeGetter?.();
const emit = () => { for (const listener of listeners) listener(); };
function getFrameloop() { return stopped || disposed || failure ? 'never' : media.matches ? 'demand' : 'always'; }
function syncFrameloop() {
    const current = state(), requested = getFrameloop();
    // R3F setFrameloop resets its clock and publishes state. Never call it merely
    // because a whole-store object changed; only change the actual loop mode.
    if (current && current.frameloop !== requested) current.setFrameloop(requested);
    emit();
}
function fail(error) {
    if (disposed || failure) return;
    failure = error instanceof Error ? error : new Error(String(error));
    phase = 'error'; rejectReady(failure); syncFrameloop();
}
function afterFrame() {
    const current = state(), candidate = candidateFrame;
    candidateFrame = null;
    if (!current || !candidate || !sceneReady || candidate.scene !== sceneReady || failure || disposed || phase === 'ready') return;
    const render = current.gl.info.render;
    // This runs after R3F's actual renderer callbacks. A committed source View
    // implies collage images plus suspended Banner/GLB loads finished; the
    // renderer counter must then advance with at least one genuine draw call.
    if (render.frame > candidate.frame && render.calls > 0) {
        phase = 'ready'; resolveReady({ route, firstRenderedFrame: render.frame });
    }
}
function disposeScene(scene) {
    const geometries = new Set(), materials = new Set(), textures = new Set();
    scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : object.material ? [object.material] : []) {
            materials.add(material);
            for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
        }
    });
    for (const texture of textures) texture.dispose();
    for (const material of materials) material.dispose();
    for (const geometry of geometries) geometry.dispose();
}
function detach(get) {
    if (storeGetter !== get) return;
    rendererCleanup?.(); rendererCleanup = null;
    afterFrameCleanup?.(); afterFrameCleanup = null;
    storeGetter = null; candidateFrame = null;
}
const onPreference = () => { syncFrameloop(); state()?.invalidate(); };
const onError = event => {
    if (event.error || event.message) fail(event.error || new Error(event.message));
    else if (event.target?.tagName === 'SCRIPT') fail(new Error('Local script failed to load'));
};
const onRejection = event => fail(event.reason);
media.addEventListener('change', onPreference);
addEventListener('error', onError, true);
addEventListener('unhandledrejection', onRejection);

export const kineticRuntime = {
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    getFrameloop,
    ambientAllowed() { return !stopped && !disposed && !failure && !media.matches; },
    beginRoute(next) {
        if (disposed || next === route) return;
        if (phase === 'loading') rejectReady(new DOMException('Route changed before rendering', 'AbortError'));
        route = next; phase = 'loading'; failure = null; sceneReady = null; candidateFrame = null; resetReady();
        syncFrameloop();
    },
    attach(get) {
        if (disposed || storeGetter === get) return;
        if (storeGetter) detach(storeGetter);
        storeGetter = get;
        const current = get(), gl = current.gl;
        const previousShaderError = gl.debug?.onShaderError;
        const onShaderError = (...args) => { fail(new Error('Author shader failed to compile')); previousShaderError?.(...args); };
        if (gl.debug) gl.debug.onShaderError = onShaderError;
        const onContextLost = () => fail(new Error('WebGL context lost'));
        gl.domElement.addEventListener('webglcontextlost', onContextLost);
        rendererCleanup = () => {
            gl.domElement.removeEventListener('webglcontextlost', onContextLost);
            if (gl.debug?.onShaderError === onShaderError) gl.debug.onShaderError = previousShaderError;
        };
        afterFrameCleanup = addAfterEffect(afterFrame);
        syncFrameloop(); current.invalidate();
    },
    detach,
    registerScene(scene) {
        if (disposed) { disposeScene(scene); return () => {}; }
        scenes.add(scene); sceneReady = scene; candidateFrame = null;
        state()?.invalidate();
        return () => {
            if (scenes.delete(scene)) disposeScene(scene);
            if (sceneReady === scene) { sceneReady = null; candidateFrame = null; }
        };
    },
    controlRef(control) {
        if (!control || disposed) return;
        controls.add(control);
        // React 19 callback-ref cleanup; Drei's native control also owns its cleanup.
        return () => { controls.delete(control); control.dispose(); };
    },
    noteFrame(scene, gl) {
        frameCallbacks += 1;
        if (sceneReady === scene) candidateFrame = { scene, frame: gl.info.render.frame };
    },
    mount(fn) { unmount = fn; },
    fail,
    get ready() { return ready; },
    stop() { if (disposed) return false; stopped = true; syncFrameloop(); return !!state(); },
    resume() { if (disposed || failure) return false; stopped = false; syncFrameloop(); state()?.invalidate(); return !!state(); },
    paint() {
        const current = state();
        if (disposed || failure || !current) return false;
        if (stopped) current.advance(current.clock.elapsedTime, true);
        else current.invalidate();
        return true;
    },
    inspect() {
        return { phase, route, disposed, stopped, reducedMotion: media.matches,
            rendererAttached: !!state(), resourcesCommitted: !!sceneReady,
            frameCallbacks, frameloop: getFrameloop(), error: failure?.message || null,
            activeScenes: scenes.size, activeControls: controls.size, disposalErrors: [...disposalErrors], visualVerified: false };
    },
    dispose() {
        if (disposed) return disposalPromise;
        disposalPromise = Promise.resolve();
        const release = fn => { try { fn(); } catch (error) { disposalErrors.push(error.message || String(error)); } };
        if (phase === 'loading') rejectReady(new DOMException('Disposed before rendering', 'AbortError'));
        const current = state();
        disposed = true; stopped = true; phase = 'disposed'; syncFrameloop();
        media.removeEventListener('change', onPreference);
        removeEventListener('error', onError, true);
        removeEventListener('unhandledrejection', onRejection);
        removeEventListener('pagehide', kineticRuntime.dispose);
        if (storeGetter) release(() => detach(storeGetter));
        release(() => current?.events.disconnect?.());
        for (const control of controls) release(() => control.dispose());
        controls.clear();
        for (const scene of scenes) release(() => disposeScene(scene));
        scenes.clear(); sceneReady = null; candidateFrame = null;
        release(() => unmount?.()); unmount = null;
        // R3F also performs its own deferred root cleanup. Release this
        // instance's renderer/context immediately; do not wait on a timer.
        release(() => current?.gl.dispose()); release(() => current?.gl.forceContextLoss());
        listeners.clear();
        dispatchEvent(new Event('vault-source-dispose'));
        if (disposalErrors.length) { disposalPromise = Promise.reject(new Error(disposalErrors.join('; '))); disposalPromise.catch(() => {}); }
        return disposalPromise;
    },
};
addEventListener('pagehide', kineticRuntime.dispose, { once: true });

export function FrameWitness() {
    // Select the stable getter, not the whole R3F store snapshot.
    const get = useThree(value => value.get);
    useEffect(() => { kineticRuntime.attach(get); return () => kineticRuntime.detach(get); }, [get]);
    return null;
}
export function SceneReadyWitness() {
    const scene = useThree(value => value.scene);
    useEffect(() => kineticRuntime.registerScene(scene), [scene]);
    useFrame(value => kineticRuntime.noteFrame(scene, value.gl), -1000);
    return null;
}
