# Implementation

This is an adaptation of the pinned author source, not an independently invented substitute. Immutable originals are in source/; modified readable files are in adapter/author/. changes.patch records exact code differences.

## Retained modules
- source/src/js/components/xylophone/Xylophone.ts
- source/src/js/components/xylophone/helix.ts
- source/src/js/components/xylophone/picking.ts
- source/src/js/components/FluidSim.ts
- source/src/js/passes/FrostBackdropPass.ts
- source/src/js/passes/GlassBufferPass.ts
- source/src/shaders/xylophone/xylophoneFrag.glsl
- source/src/shaders/xylophone/xylophoneVert.glsl

## Integration changes
- Omitted the unverified note sample and audio graph entirely; no audio asset is requested.
- DPR capped at 1.5; original multipass frost, normals, SSAO and SMAA remain.
- Added stop/resume/dispose hooks, live reduced-motion spin/swing suppression and late model-load disposal.
- Publisher links and sound toggle removed from bounded study frame; author title retained.

## Rebuild
From adapter/, run npm ci --ignore-scripts --no-audit --no-fund, then node build-local.mjs. Only the small local esbuild configuration runs; upstream Vite/npm scripts are not invoked. The checked-in package-lock fixes all transitive packages and npm verifies registry integrity. Build outputs are bundled IIFE JavaScript, optional CSS, and relative local assets.

Serve run/index.html over HTTP. Opaque sandbox embedding uses only allow-scripts and the existing host manifest-listed asset broker; do not add allow-same-origin. Preserve every runtime-manifest.json file when packaging.

## Verification limits
JS parse, source Git-blob hashes, dependency lock/integrity records, and static bundle/asset graph checks are available in qa-static.json. No browser process was launched. Cold start, real pointer/touch, 1100×670 framing, GPU memory, shader compilation, pause/resume and isolation behavior still require the permitted host runtime. No preview recording is supplied.

## 2026-10-07 source lifecycle repair
The current adapter uses Promise-based SourceDemo.ready, Boolean isReady, idempotent Promise dispose and inspect(). See COMPATIBILITY-AUDIT.md and adapter/REBUILD.md. The current bundle was built and parsed only; runtime, rendering and interaction are not verified.
