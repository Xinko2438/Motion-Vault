# Source compatibility review

Status: SOURCE_REPAIRED_RUNTIME_PENDING.

- Ready Promise requires procedural scene construction and actual first render submission; renderer/shader/init failures reject. No window.load-only resolution.
- Failure catch now destroys assigned App or partially constructing App; native/RAF/geometry/float textures/renderer cleanup is terminal.
- Original shaders/geometry/curves/input remain byte-exact. Reduced mode advances one original simulation step per genuine mouse/touch move, not an ambient loop.

Remaining browser gates:
- Final trusted native-pointer / nonce lifecycle bridge must be injected and manifest-listed by Motion Vault packaging.
- Opaque allow-scripts-only origin: actual CSP, broker, texture/font/model decode and first frame require browser verification.
- GPU shader/material/FBO correctness, original1100x670 composition, native drag/scroll/touch and cross-boundary release remain untested.
- Normal/reduced startup and live preference changes; stop-before-ready/resume/dispose/reopen and resource/memory behavior remain untested.
- Local application/publication remains gated on compatibility; source build/parse/mock checks do not establish runtime acceptance.

Evidence: compatibility-review.json, qa-static.json, qa-rebuild.json.
