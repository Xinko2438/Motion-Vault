# Kinetic Images · Motion Vault source package

One author-source adaptation with three native modes: Tower, Paper and Spiral.

- Local entry: run/index.html (reference viewport 1100 × 670)
- Readable original: source/; readable adaptation: adapter/src/
- Source diff and reproducible own build: adapter/effect.diff, adapter/prepare.py, adapter/build.mjs
- Design and reuse: DESIGN.md, parameters.json
- Integration and limits: IMPLEMENTATION.md
- Source/dependency evidence: upstream.json, provenance.json, dependency-lock.json, dependencies.json, source-map.json, run-hashes.json
- Static and mocked-controller evidence: qa-static.json, qa-runtime-contract.json, qa-rebuild.json

Static source verification and bundling succeeded. The audited R3F store-reset loop is fixed in source; readiness now requires committed assets and a genuine drawn frame, with error rejection and idempotent disposal. Browser/GPU rendering, screenshots, recordings, real gestures and visual fidelity are not verified. This is not a claim of catalogue approval or production readiness.

## Upstream and rights

Author: Dominik Fojcik. Pinned source: https://github.com/DGFX/codrops-kinetic-images/tree/965dda362a8f9e5d522ed675493897200d273e49

Article: https://tympanus.net/codrops/2025/07/09/how-to-create-kinetic-image-animations-with-react-three-fiber/

Author demo: https://tympanus.net/Tutorials/KineticImages/

There is no LICENSE file or package license field in the pinned source. The Codrops article's Code link identifies this repository as its demo. The publisher's explicit downloadable-demo MIT grant at https://tympanus.net/codrops/licensing/ supplies the separate code-license basis, preserved in CODROPS-DEMO-LICENSE.txt. This is not represented as a repository license.

The individual rights for 13 photographs and the banner are unverified. Do not treat the code grant as automatic permission for those assets or people depicted. Retain required source/dependency notices and replace imagery with appropriately licensed assets for production when necessary.


## Release inventory boundary

The distributable keeps readable author/adapter sources and original notices. Dependency folders, download archives, build metafiles and browser .map files are not included. The stored static report records the staging checks, including optional debug files that existed during that check; it is not a promise those debug files ship. Run the documented own build before rerunning checks that inspect build metadata. Optional sourceMappingURL comments in the unchanged bundle are DevTools-only; runtime rendering does not depend on those maps.
