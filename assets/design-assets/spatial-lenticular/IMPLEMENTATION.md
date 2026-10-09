# Implementation

This is an adaptation of the pinned author source, not an independently invented substitute. Immutable originals are in source/; modified readable files are in adapter/author/. changes.patch records exact code differences.

## Retained modules
- source/src/components/LenticularMaterial.jsx
- source/src/components/Experience.jsx
- source/src/App.jsx

## Integration changes
- Original LenticularMaterial.jsx retained byte-for-byte.
- Video pair/preloading removed; summer-winter becomes the initial still set, evil-angel stays selectable.
- Drei sunset environment replaced with its exact named Venice Sunset HDR as a local CC0 asset.
- WebGPURenderer uses its WebGL backend (forceWebGL:true) for opaque sandbox compatibility; TSL source is retained.
- Demand rendering, DPR 1.5 cap, error boundary and lifecycle cleanup added; promotional logo/link omitted.

## Rebuild
From adapter/, run npm ci --ignore-scripts --no-audit --no-fund, then node build-local.mjs. Only the small local esbuild configuration runs; upstream Vite/npm scripts are not invoked. The checked-in package-lock fixes all transitive packages and npm verifies registry integrity. Build outputs are bundled IIFE JavaScript, optional CSS, and relative local assets.

Serve run/index.html over HTTP. Opaque sandbox embedding uses only allow-scripts and the existing host manifest-listed asset broker; do not add allow-same-origin. Preserve every runtime-manifest.json file when packaging.

## Verification limits
JS parse, source Git-blob hashes, dependency lock/integrity records, and static bundle/asset graph checks are available in qa-static.json. No browser process was launched. Cold start, real pointer/touch, 1100×670 framing, GPU memory, shader compilation, pause/resume and isolation behavior still require the permitted host runtime. No preview recording is supplied.

## 2026-10-07 source lifecycle repair
The current adapter uses Promise-based SourceDemo.ready, Boolean isReady, idempotent Promise dispose and inspect(). See COMPATIBILITY-AUDIT.md and adapter/REBUILD.md. The current bundle was built and parsed only; runtime, rendering and interaction are not verified.
