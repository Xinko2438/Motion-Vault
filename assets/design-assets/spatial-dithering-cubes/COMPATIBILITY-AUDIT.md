# Source compatibility review

Status: SOURCE_REPAIRED_RUNTIME_PENDING.

- Early owned resource registry and ready Promise now reject initialization/resource/shader failures and resolve only after the loaded texture participates in an actual first scene draw.
- Dispose cancels RAF, pane and native listeners, rejects unresolved readiness, and releases late texture arrival; native reduced-motion pane changes explicitly repaint.
- Original two400x400 grids, Grid class and both GLSL files remain unchanged; no quality or count downgrade.

Remaining browser gates:
- Final trusted native-pointer / nonce lifecycle bridge must be injected and manifest-listed by Motion Vault packaging.
- Opaque allow-scripts-only origin: actual CSP, broker, texture/font/model decode and first frame require browser verification.
- GPU shader/material/FBO correctness, original1100x670 composition, native drag/scroll/touch and cross-boundary release remain untested.
- Normal/reduced startup and live preference changes; stop-before-ready/resume/dispose/reopen and resource/memory behavior remain untested.
- Local application/publication remains gated on compatibility; source build/parse/mock checks do not establish runtime acceptance.

Evidence: compatibility-review.json, qa-static.json, qa-rebuild.json.
