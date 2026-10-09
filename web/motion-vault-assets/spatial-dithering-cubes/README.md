# Visualizing dithering: original instanced source

Entry: `run/index.html`. Readable authored implementation: `source/src/Grid/Grid.js` and its GLSL files. Local source entry: `adapter/index.js`. The complete pinned author input is preserved in `source/`.

This keeps the original perspective, blue field, image-based 400 × 400 cuboid grid and separate 400 × 400 threshold layer. Both shader files and the Grid class are unchanged. The native Tweakpane controls remain. It is a source adaptation with real Three.js instancing, not a 2D approximation.

All runtime scripts/styles/images are local. The existing manifest-whitelisted opaque sandbox bridge is included. Use a 1100 × 670 iframe with `sandbox="allow-scripts"` and the existing broker's `vaultSession`; do not add same-origin access. The Motion Vault release workflow creates the final asset manifest and hashes.

## Rebuild

Use `adapter/dependencies.package.json` with `npm install --ignore-scripts` in the designated sibling build workspace. `adapter/build.mjs` is the only executed build configuration; it uses the existing reputable esbuild tool. No author Vite config/build scripts ran. The dependency lock and individual upstream hashes are retained.

## QA still required

No browser or upstream runtime was executed here. Local static parse/source-hash checks and bundling passed; `qa-static.json` does not claim GPU or visual success.

In the final sandbox, verify the local texture loads, blue spatial composition matches the official demo, and `await SourceDemo.ready` resolves only after texture loading and an actual first render submission. Move native Progress from 0 to 1, try all four threshold maps and five delay modes, toggle each layer, and resize. `SourceDemo.setProgress(p)` controls the same original shader uniforms and slider, making deterministic recording possible without fake pointer input.

Then verify `stop`, `resume`, `paint` and idempotent `dispose`, repeated frame replacement and GPU cleanup. Reduced motion never starts an automatic progress sweep. Changes through native controls still render. Measure actual device cost: the two original grids contain 320,000 instances together.

## Rights

Official article: https://tympanus.net/codrops/2026/04/01/animating-160000-cubes-in-three-js-to-visualize-dithering/

Official demo: https://tympanus.net/Tutorials/VisualizingDitheringThreejs/

Source: https://github.com/damarberlari/visualizing-dithering-codrops

The linked downloadable demo has the Codrops publisher MIT grant, preserved in `CODROPS-DEMO-LICENSE.txt`. The repository has no LICENSE file and package.json says ISC; both facts are recorded rather than inventing repository terms. Image copyright is separate; the bundled source image needs individual clearance or a licensed production replacement.


## Portable recipe and release boundary

The retained adapter/build.mjs no longer contains a cloud-machine path. Provide an installed esbuild 0.25.10 through ESBUILD_PATH, MOTION_TOOLING, or normal Node module resolution. Dependency lookup uses MOTION_DITHERING_DEPS if set; otherwise it uses adapter/npm. Copy adapter/dependencies.package.json and the root dependency-lock.json into that local dependency workspace as package.json/package-lock.json, then use npm ci --ignore-scripts. No dependency directory is shipped.

Build metadata, download archives and .map files are excluded from the release; the source files, readable adapter, notices, parameter/provenance documents and ready-made run files remain. The current lifecycle revision rebuilds the runtime from the same pinned source and dependency bytes; see compatibility-review.json and qa-static.json.

## Compatibility contract revision

The current ready property is a Promise, not a load-event flag. Await it; inspect isReady/inspect() separately. It rejects initialization/resource/shader errors detected by the adapter. A fulfilled runtime promise means its observed source initialization and render submission completed; it does not certify screenshot quality, every shader path, interaction, browser compatibility, or user acceptance. Source-level checks are in compatibility-review.json.

Terminal dispose is idempotent and rejects readiness if teardown precedes initialization. Reopening uses a fresh isolated frame. The final Motion Vault packaging must inject its trusted native-pointer and nonce lifecycle bridge; WORK entries alone do not claim that host handshake is installed. Opaque-frame GPU/browser tests remain pending and local application is gated on those results.
