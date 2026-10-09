# Implementation and review boundary

## Source relationship

Pinned author source: DGFX/codrops-kinetic-images at 965dda362a8f9e5d522ed675493897200d273e49. The 60 source files, including both embedded GLBs and every image, match expected Git blob IDs. The upstream generated out/ tree was intentionally not downloaded or executed.

source/ is immutable. adapter/prepare.py creates adapter/src/ and records the complete text diff in adapter/effect.diff. The actual authored React/R3F pages, cylinders, source GLB models, cameras, CanvasTexture composition and shader material classes remain present. Both material class files and the entire getCanvasTexture helper are byte-exact. This is not a vanilla Three.js or CSS visual approximation.

## Local build

adapter/build.mjs invokes the installed esbuild 0.25.10 and Sass 1.89.2 libraries through our own configuration. It does not load Next config, start a Next server, run an upstream script or launch a browser. React 19.1.0, React DOM 19.1.0, R3F 9.2.0, Drei 10.4.2 and Three 0.175.0 match the upstream lock's direct runtime versions. The separate adapter npm lock freezes its full dependency graph; it is not asserted to be identical to the upstream Next dependency graph.

The compiled output is a local classic-script IIFE with source maps. SCSS modules are compiled with Sass and esbuild's CSS Modules support. The Next-specific outer HTML/font shell is replaced with a local root and system UI font. Layout, Header, Footer, Canvas, View, tunnel-rat and OrbitControls remain source-derived. Source attribution links are inert inside the sandbox; their verified URLs are available in metadata and README.

To rebuild using the already installed same-scope dependency workspace:

    python adapter/prepare.py
    node adapter/build.mjs
    python adapter/metadata.py
    node adapter/check-runtime-contract.mjs
    python adapter/check-static.py

KINETIC_DEPS and MOTION_TOOLING may identify equivalent preinstalled adapter dependencies if this package is relocated. No command here installs or runs the upstream Next project.

## Routing and isolation

The source's Tower, Paper and Spiral pages use #/, #/paper and #/spiral. Hash changes do not require history.replaceState, a router server or access to an origin. Each route mounts the real source scene. Standalone operation uses local asset paths. In the gallery's opaque allow-scripts-only iframe, the copied bridge exchanges only current-package whitelisted asset bytes with its parent; the parent must independently validate its file manifest. It never requests browser storage, Hub APIs or another package.

paper.glb uses only KHR_materials_unlit; spiral.glb has no extensions. Both contain embedded binary buffers and no image/external URI references. Both useGLTF calls explicitly disable Draco and Meshopt. Inactive decoder URL strings may remain in bundled vendor utility code, but no decoder is configured by this adapter. CSP disallows external connects, fonts and workers. Runtime network behavior still requires browser verification.

## Motion and resource ownership

window.SourceDemo exposes a ready Promise getter plus stop, resume, paint, dispose, inspect and the backward-compatible status alias. FrameWitness selects the stable R3F state getter; it no longer subscribes to each whole-store snapshot. setFrameloop is called only when the mode actually differs, avoiding the previously identified effect → setFrameloop → new state → effect loop.

The source Canvas stays mounted across normal hash-route changes. Each route has a fresh readiness obligation. A committed witness inside the actual source View means collage creation and suspended Banner/GLB loading completed. The ready Promise resolves only after an R3F after-frame callback observes the renderer's frame counter advance with nonzero draw calls. Source initialization, script and shader errors reject it. Resource commitment, actual drawing and visual correctness remain separate: this is an implemented runtime contract, not a browser-verified render claim.

stop sets the actual loop to never and gates authored texture updates. resume restores always or demand according to native reduced motion. paint requests a real frame; while stopped it advances at unchanged elapsed time, avoiding an ambient step. No load event or timeout declares readiness. Dynamic reduced-motion changes update the actual renderer loop while direct OrbitControls stays available.

dispose is idempotent and returns a cleanup Promise. It rejects a pending ready obligation, removes its media/global/context listeners and after-frame callback, disconnects R3F input, disposes native controls and source scene geometry/materials/textures, unmounts React, explicitly disposes the renderer and releases its WebGL context, then closes the isolation transport. R3F may also finish its internal deferred root cleanup later; the adapter does not use that internal delay as proof of completion. Existing source-derived hooks separately clear GLB/banner caches and dispose pending CanvasTexture results. Cleanup exceptions are collected and reported by inspect and the disposal Promise rather than suppressing later cleanup. Actual GPU-memory reclamation and repeated-route behavior still require a browser.

## Verification truth

Completed: Git blob/SHA-256 provenance, byte-exact material/CanvasTexture checks, GLB structure inspection, source-derived local build, compiled JavaScript syntax checks, manifest/hash checks, and 14 isolated tests of our lifecycle controller with mocks, including stable attachment, real-frame readiness conditions, route changes, error rejection and cleanup.

Not performed: browser execution, GPU render, screenshots, local recordings, actual OrbitControls gestures, cold-start/cross-boundary release, reduced-motion visual inspection, route-switch endurance or repeated mount GPU-memory checks. No visual equivalence or user acceptance is claimed. The adapter remains a source-ready, runtime-unverified candidate.
