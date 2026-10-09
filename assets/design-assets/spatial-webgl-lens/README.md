# 14islands WebGL Lens Refraction

Local entry: `run/index.html`. Original source: `source/src/`. Pinned commit: `f903c1ed917bf1c2f8a351aea54f1045db6fc129`.

The original React/R3F/scroll-rig implementation is retained: editorial DOM composition, matching WebGL text, photographic scroll transforms, a wobbly image cube and the physical refractive lens. This is not an image-magnifier or CSS replacement. Core MeshTransmissionMaterial settings are byte-identical to source.

## Local runtime

Use the existing local server and a 1100 × 670 iframe scaled as a whole. Keep `sandbox="allow-scripts"` without same-origin access. Give the entry the existing broker's `vaultSession`. The final manifest must whitelist every required `run/` file, including fonts, HDR, GLB and local Draco decoder files. No source website, font CDN or API is needed.

Four exact OFL font files are explicitly tracked in `run/fonts/` and `source/public/fonts/`. The project release policy allows these exact file paths and hashes; `font-license-review/whitelist-request.json` records all eight paths via source/runtime pairs, hashes, versions, copyright names and license links. This is an exception for these four files only, not a generic release-filter change.

The broker supplies font bytes to main-thread `FontFace(ArrayBuffer)` for DOM typography. Temporary Blob URLs point Troika to the same bytes for matching WebGL glyphs. No font is hidden in JavaScript/base64 or fetched externally. The original CSS font-network import is removed. Troika's own main-thread fallback preserves its typesetting/SDF logic without worker code-string evaluation. The original Draco-compressed lens GLB uses an owned decoder loader and files copied from the installed Three distribution; no decoder CDN remains on that path.

## Build

Dependencies are pinned in `adapter/dependencies.package.json` and `dependency-lock.json`. They were installed with npm `--ignore-scripts`; original CRA/Vite scripts were not executed. `adapter/build.mjs` uses existing esbuild 0.25.10 and only the documented local transforms. `adapter/source/src/` contains readable transformed modules; the pinned source remains untouched.

## Required browser QA

Static checks and bundle parsing passed, but no browser, shaders, interaction or actual local render were executed. `qa-static.json` is explicitly runtime-unverified.

1. Load through the final manifest broker in the opaque iframe. Check four loaded fonts, all local photo/HDR/model loads, successful local Draco decode, zero errors and no external requests. Readiness is asset/render-submission state, not visual acceptance.
2. Compare headline and body glyph shapes between DOM and WebGL. Check the lens refracts text, colored photography and background without black/pink material errors, CORS errors or missing geometry.
3. Move a real pointer across the full composition. Scroll through photo sections and the cube. Toggle the original WebGL Scroll Effects control off and on. Test pointer/scroll after repeated card/detail mounts.
4. Reduced motion must stop background rotation, text distortion and the cube's entrance spring, while native pointer/scroll remain usable. Test both initial preference and live preference changes.
5. Verify `SourceDemo.stop()`, `resume()`, `paint()`, `scroll(progress)` and idempotent `dispose()`. Verify DOM/Canvas synchronization, scissor/portal render ordering, worker/GL cleanup and a fresh frame reopening.
6. Confirm final CSP permits the local Draco WebAssembly path without broad external network allowances. Measure actual frame time and resource use on the target device.

## Rights

Source repository: https://github.com/14islands/codrops-scroll-rig-tutorial

Article: https://tympanus.net/codrops/2023/10/10/progressively-enhanced-webgl-lens-refraction/

Demo: https://tympanus.net/Tutorials/WebGLLensRefraction/

The original repository MIT file is retained. Exact Poppins and Playfair font copyrights/OFL notices remain separate. The source credits Maxim Berg/Unsplash photographs and Paul Henschel's lens reference. Empty Warehouse 01 HDRI is identified as Poly Haven CC0. Draco uses Apache-2.0. Individual photo attribution/provenance remains a production check; code MIT is not substituted for image/font terms.

No host gallery/catalog/storage or generic release filter was changed in this package. The Motion Vault release workflow controls final manifests and exact file allowlisting.


## Portable recipe and release boundary

The retained adapter/build.mjs no longer contains a cloud-machine path. Provide an installed esbuild 0.25.10 through ESBUILD_PATH, MOTION_TOOLING, or normal Node module resolution. Dependency lookup uses MOTION_LENS_DEPS if set; otherwise it uses adapter/npm. Copy adapter/dependencies.package.json and the root dependency-lock.json into that local dependency workspace as package.json/package-lock.json, then use npm ci --ignore-scripts. No dependency directory is shipped.

Build metadata, download archives and .map files are excluded from the release; the source files, readable adapter, notices, parameter/provenance documents and ready-made run files remain. The current lifecycle revision rebuilds the runtime from the same pinned source and dependency bytes; see compatibility-review.json and qa-static.json.

## Compatibility contract revision

The current ready property is a Promise, not a load-event flag. Await it; inspect isReady/inspect() separately. It rejects initialization/resource/shader errors detected by the adapter. A fulfilled runtime promise means its observed source initialization and render submission completed; it does not certify screenshot quality, every shader path, interaction, browser compatibility, or user acceptance. Source-level checks are in compatibility-review.json.

Terminal dispose is idempotent and rejects readiness if teardown precedes initialization. Reopening uses a fresh isolated frame. The final Motion Vault packaging must inject its trusted native-pointer and nonce lifecycle bridge; WORK entries alone do not claim that host handshake is installed. Opaque-frame GPU/browser tests remain pending and local application is gated on those results.

Lens readiness includes four exact brokered OFL fonts, the source images/HDR/Draco model, nine mounted Troika text sync callbacks, and a subsequent screen-target render submission. The scoped Troika transform adds terminal cleanup for private font XHR/SDF queues/timers/atlas resources; it leaves the glyph algorithms intact. ImageBitmap ownership closes both mounted and late-arriving decoded images and clears the owned loader caches. Reduced motion uses native wheel scrolling and explicitly queues root demand renders. Paused paint still refreshes the original FBO while freezing simulation.
