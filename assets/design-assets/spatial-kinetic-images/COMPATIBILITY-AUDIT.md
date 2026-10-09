# Source compatibility review

Status: SOURCE_REPAIRED_RUNTIME_PENDING.

- Stable get selector and actual-mode-only setFrameloop eliminate the circular update. Canvas stays mounted across source mode routes.
- Ready Promise waits for committed source View resources (collage and suspended Banner/GLB) and actual renderer frame-count advancement with draw calls; genuine errors reject.
- Explicit native controls, after-frame hooks, scenes, textures, renderer/context and terminal disposal Promise; accurate inspect status.

Remaining browser gates:
- Final trusted native-pointer / nonce lifecycle bridge must be injected and manifest-listed by Motion Vault packaging.
- Opaque allow-scripts-only origin: actual CSP, broker, texture/font/model decode and first frame require browser verification.
- GPU shader/material/FBO correctness, original1100x670 composition, native drag/scroll/touch and cross-boundary release remain untested.
- Normal/reduced startup and live preference changes; stop-before-ready/resume/dispose/reopen and resource/memory behavior remain untested.
- Local application/publication remains gated on compatibility; source build/parse/mock checks do not establish runtime acceptance.

Evidence: compatibility-review.json, qa-static.json, qa-rebuild.json.
