# Source compatibility review

Status: SOURCE_REPAIRED_RUNTIME_PENDING.

- Ready Promise now resolves after all six actual portraits load and the authored scene is rendered; shader diagnostics and initialization errors reject.
- Early owned resource cleanup handles partial boot; named ticker/tweens, pointer capture, images, observers, geometry/materials/textures/context are disposed. Stop sleeps the owned GSAP ticker.
- Both GLSL strings, 26-ribbon geometry, CONFIG, strip layout and resize math remain byte-identical.

Remaining browser gates:
- Final trusted native-pointer / nonce lifecycle bridge must be injected and manifest-listed by Motion Vault packaging.
- Opaque allow-scripts-only origin: actual CSP, broker, texture/font/model decode and first frame require browser verification.
- GPU shader/material/FBO correctness, original1100x670 composition, native drag/scroll/touch and cross-boundary release remain untested.
- Normal/reduced startup and live preference changes; stop-before-ready/resume/dispose/reopen and resource/memory behavior remain untested.
- Local application/publication remains gated on compatibility; source build/parse/mock checks do not establish runtime acceptance.

Evidence: compatibility-review.json, qa-static.json, qa-rebuild.json.
