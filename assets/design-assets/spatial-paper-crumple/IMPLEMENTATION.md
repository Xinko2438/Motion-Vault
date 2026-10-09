# Implementation

This is an adaptation of the pinned author source, not an independently invented substitute. Immutable originals are in source/; modified readable files are in adapter/author/. changes.patch records exact code differences.

## Retained modules
- source/src/main-vat.js
- source/src/paper-vat.js
- source/src/paper.js

## Integration changes
- Preserved original 50-frame Houdini VAT FBX/EXR decoder, smooth normals and Cannon physics.
- Pinned CDN dependencies replaced by local bundled Three 0.160.1 and cannon-es 0.20.0.
- Original Caveat and Yomogi typography loaded locally via FontFace and the asset broker; OFL notices included.
- DPR capped at 1.5. Added lifecycle, timer cleanup, late-load guards and reduced-motion gates; no forced click/drag.
- Asset paths changed from import.meta-relative source paths to bounded run-relative paths.

## Rebuild
From adapter/, run npm ci --ignore-scripts --no-audit --no-fund, then node build-local.mjs. Only the small local esbuild configuration runs; upstream Vite/npm scripts are not invoked. The checked-in package-lock fixes all transitive packages and npm verifies registry integrity. Build outputs are bundled IIFE JavaScript, optional CSS, and relative local assets.

Serve run/index.html over HTTP. Opaque sandbox embedding uses only allow-scripts and the existing host manifest-listed asset broker; do not add allow-same-origin. Preserve every runtime-manifest.json file when packaging.

## Verification limits
JS parse, source Git-blob hashes, dependency lock/integrity records, and static bundle/asset graph checks are available in qa-static.json. No browser process was launched. Cold start, real pointer/touch, 1100×670 framing, GPU memory, shader compilation, pause/resume and isolation behavior still require the permitted host runtime. No preview recording is supplied.

## 2026-10-07 source lifecycle repair
The current adapter uses Promise-based SourceDemo.ready, Boolean isReady, idempotent Promise dispose and inspect(). See COMPATIBILITY-AUDIT.md and adapter/REBUILD.md. The current bundle was built and parsed only; runtime, rendering and interaction are not verified.
