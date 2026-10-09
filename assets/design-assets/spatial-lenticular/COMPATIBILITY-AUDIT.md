# Source compatibility repair

Status: SOURCE_REPAIRED_RUNTIME_PENDING. No browser execution, local integration, or publication.

## Fixed source gaps
- Readiness now waits all four PNGs, decoded local HDR, actual renderer initialization, compileAsync completion and first submitted draw; failures reject.
- Pinned Three175 WebGPURenderer private housekeeping RAF is stopped; node-frame bookkeeping is performed on actual demand renders.
- Explicit custom renderer disposal awaits ongoing compilation; native Fiber unmount completion is awaited rather than assuming root.unmount disposes WebGPURenderer.
- Live reduced-motion media changes update native OrbitControls damping. Early useTexture GPU uploads queue behind renderer initialization.

## Actual loaders
- Four useTexture TextureLoader images use the image broker. Local Environment HDR uses RGBELoader -> FileLoader -> Request/fetch broker. No active worker, Draco, URL FontFace or external HDR preset.

## Renderer and native input
Three175 WebGPURenderer with forceWebGL:true uses WebGL2 backend, not WebGPU permission; original TSL LenticularMaterial retained.

Native OrbitControls drag and wheel zoom; real native pointer capture remains the library behavior.

Reduced motion: No autonomous authored motion; live changes disable/enable damping, while drag/zoom remain.

## Still required
Opaque-frame rendering, GPU/shader/FBO, actual drag/scroll/touch, visibility/teardown and repeated host mount tests remain unrun. The WORK-only package still needs the parent-owned trusted-pointer/lifecycle host bridge before compatibility can be accepted. Read compatibility-review.json for exact source evidence and limitations.
