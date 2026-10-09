# Implementation

This is an adaptation of the pinned author source, not an independently invented substitute. Immutable originals are in source/; modified readable files are in adapter/author/. changes.patch records exact code differences.

## Retained modules
- source/src/Experience/Gallery.js
- source/src/Experience/Scroll.js
- source/src/Experience/Label.js
- source/src/Experience/Background/index.js
- source/src/Experience/Background/shaders/fragment.glsl
- source/src/Experience/TrailController.js
- source/src/Experience/Trail.js
- source/src/Experience/TrailHeadParticles.js
- source/src/data/galleryData.js

## Integration changes
- All gallery/layout/palette/label/trail modules and five source images retained.
- DPR capped at 1.5; time-varying background/trail phase frozen under reduced motion while direct scrolling remains.
- Added local bootstrap readiness/errors, stop/resume/dispose, renderer cleanup and guarded late initialization.
- Publisher links converted to inert attribution text; source layout CSS remains.

## Rebuild
From adapter/, run npm ci --ignore-scripts --no-audit --no-fund, then node build-local.mjs. Only the small local esbuild configuration runs; upstream Vite/npm scripts are not invoked. The checked-in package-lock fixes all transitive packages and npm verifies registry integrity. Build outputs are bundled IIFE JavaScript, optional CSS, and relative local assets.

Serve run/index.html over HTTP. Opaque sandbox embedding uses only allow-scripts and the existing host manifest-listed asset broker; do not add allow-same-origin. Preserve every runtime-manifest.json file when packaging.

## Verification limits
JS parse, source Git-blob hashes, dependency lock/integrity records, and static bundle/asset graph checks are available in qa-static.json. No browser process was launched. Cold start, real pointer/touch, 1100×670 framing, GPU memory, shader compilation, pause/resume and isolation behavior still require the permitted host runtime. No preview recording is supplied.

## 2026-10-07 source lifecycle repair
The current adapter uses Promise-based SourceDemo.ready, Boolean isReady, idempotent Promise dispose and inspect(). See COMPATIBILITY-AUDIT.md and adapter/REBUILD.md. The current bundle was built and parsed only; runtime, rendering and interaction are not verified.
