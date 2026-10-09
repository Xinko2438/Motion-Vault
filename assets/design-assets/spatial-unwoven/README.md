# Unwoven: local source-led adaptation

Author: Clément Grellier. Pinned source commit: `32c4bfcd623058d92095ffbafe44a1fad6a6d4c1`.

- Source: https://github.com/clementgrellier/unwoven
- Official demo: https://tympanus.net/Development/Unwoven/
- Article: https://tympanus.net/codrops/2026/09/05/building-an-infinite-loom-unravelling-images-into-threads-with-three-js/

## What is here

`run/index.html` is the self-contained local entry. `run/effect.js` remains readable. The complete nine-file pinned author snapshot is in `source/`. Original geometry, shaders, 26-ribbon/20-segment defaults, layout and resize math are unchanged. `adapter/effect.diff` identifies the lifecycle and reduced-motion adaptation.

The six warm portrait images are exactly the upstream bytes. This is an author-source adaptation, not a new CSS approximation, a remote embed or a video replacement. It has not been visually accepted or recorded locally yet.

## Run and reproduce

Serve the package through the existing local static server, then open `run/index.html`. No npm installation, build system, external font, CDN, image service or API is needed. A browser with WebGL is required for the actual effect. The author's CSS fallback remains explicitly identified as unavailable WebGL, not successful execution of the reviewed effect.

To reproduce the adaptation using its already present inputs:

`python adapter/build-local.py`

To perform static-only verification:

`python adapter/check-static.py`

Both scripts are locally written adapters. No upstream code, package lifecycle scripts or browser was executed during this build. Dependencies were selected from official npm archives after checking registry SHA-512 integrity. The exact original runtime versions are Three.js 0.128.0 and GSAP 3.12.5. No esbuild step was necessary.

## Opaque sandbox integration

Keep the existing iframe sandbox as `allow-scripts`, with no `allow-same-origin`. Give the iframe an internal 1100 × 670 viewport and scale the whole iframe for a card. Do not resize the authored coordinate system to card pixels.

Use the existing gallery source broker and append the matching `vaultSession` query parameter. The copied local `vault-isolation.js` must execute before the effect. The final asset manifest must include all `run/` files, especially the six `run/img/` JPEGs. Only those manifest-listed package bytes may be brokered. Do not weaken CSP or grant access to parent storage, business APIs or other package files.

The plain standalone entry works without a broker when served in its normal top-level origin. The opaque iframe route is required for final acceptance and has not been run here.

## Exact local QA flow

1. Load the final manifest-backed entry in the existing `allow-scripts`-only source sandbox at 1100 × 670, scaled in a card. Verify one WebGL canvas, six loaded images, zero `sourceErrors`, no external requests and successful `await SourceDemo.ready` and `SourceDemo.isReady === true`. Do not count generated placeholders as success.
2. Under normal motion, wait through the original 2.4-second drift ramp and 1.8-second weave introduction. Compare warm portrait color, rounded central cards, fine curling edge threads and whitening against the author's still. Record the actual local adaptation, not the upstream still.
3. Drag left and right with a real primary pointer. Check continued movement while held, reverse direction, release inertia, gentle return to 95px/s drift, and only one active pointer. Release outside the stage; cancel or lose capture; confirm dragging ends. Check a genuinely held pointer entering a newly mounted frame without injecting a made-up pointer ID.
4. Enable reduced motion before load. After images appear, wait and verify that offset and shader phase remain unchanged. Drag directly and release: drag works, then stops without forced autoplay or fling. Test a preference change while mounted.
5. Call `SourceDemo.stop()`, compare `inspect().offset` after a delay, and verify it stays fixed. Call `resume()` and confirm normal movement returns only when reduced motion allows it. `paint()` must not advance time.
6. Call `dispose()` twice. Verify no canvas, ticker callback, live image handlers, active pointer capture or package-owned WebGL resources remain. Reopen via a fresh iframe and repeat. Inspect errors, memory/resource cleanup and broker requests across repeated card/detail switching.
7. Check touch input, viewport changes, real device rendering and the existing host hover/click ownership rules. Local static passes do not substitute for these checks.

## Rights and release gates

Author code: MIT, with the exact notice in `LICENSE.md` and `source/LICENSE.md`. Three.js: MIT. GSAP: its own license, not MIT; exact original distribution notice and package license text are retained in `vendor-licenses/` and `dependency-lock.json`. Current official license reference: https://gsap.com/community/standard-license/.

The repository does not document the six portraits' separate origin, creator or redistribution terms. They are retained for source-faithful local review; production reuse needs permission or licensed replacement portraits preserving the framing/color/motion-blur treatment. Source MIT must not be described as independently verified photo rights. No additional fees or external account setup were introduced.

`qa-static.json` records only checks actually run. Browser/WebGL/opaque-sandbox/visual QA remains pending. The Motion Vault release workflow creates the final asset manifest and package hashes; no host gallery or catalog was changed here.

## Compatibility contract revision

The current ready property is a Promise, not a load-event flag. Await it; inspect isReady/inspect() separately. It rejects initialization/resource/shader errors detected by the adapter. A fulfilled runtime promise means its observed source initialization and render submission completed; it does not certify screenshot quality, every shader path, interaction, browser compatibility, or user acceptance. Source-level checks are in compatibility-review.json.

Terminal dispose is idempotent and rejects readiness if teardown precedes initialization. Reopening uses a fresh isolated frame. The final Motion Vault packaging must inject its trusted native-pointer and nonce lifecycle bridge; WORK entries alone do not claim that host handshake is installed. Opaque-frame GPU/browser tests remain pending and local application is gated on those results.
