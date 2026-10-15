# Reviewed DOM33 source overlay

`promotion-plan.json` and `payload/` are the exact prepared source and media import, pinned by `scripts/artifact-phase.mjs`. This is an immutable source overlay, not an editable published bundle. It contains readable DOM/CSS/runtime code, design notes, source maps, captured posters and five videos. The plan binds the original gallery shell, both catalogs, all protected paths and all 318 writes.

`node scripts/build-hybrid.mjs build` consumes it through `build-reviewed-motion.mjs`; it accepts only the exact original or promoted web tree, rebuilds a fresh stage, and verifies the whole prospective tree. `release.mjs` verifies that tree again before publication. Updates require a new reviewed plan and payload, rather than hand-editing generated `web/` bundles or silently falling back to the old engine.

Candidate checks: set `MOTION_VAULT_PHASE=candidate` and `MOTION_VAULT_TEST_WEB` to the absolute `.runtime/hybrid-assets/staged` path, then run the normal test suite. The candidate must match every prospective file hash, including all protected effects. The default phase checks actual publication receipts and the current complete asset inventory. Neither phase confers aesthetic approval.

The original prepared gallery used a fixed legacy stylesheet. The integration applies one exact loader-expression repair so `asset.style` selects the reviewed stylesheet; the prepared plan/payload remain unchanged. Scoped Git attributes preserve imported bytes on Windows without renormalizing protected legacy files. Both additions are explicit in `artifact-phase.mjs`.

Provenance: baseline Git 2906bf12d04c7cd0523b8bf79d4bc8417045082c; prepared plan SHA-256 1b1ed35957815ced13649cdb1db30b5db31da50ae6e84ad9bcff425169b75680. Original 34-effect generation provenance is retained inside asset manifests; the excluded new blinds is not imported. Private selection and rejection events remain only in the user's browser.

Reuse: future build/release decisions consume the same hash-bound plan. Missing, extra, changed or unplanned files block the build/release; the negative phase tests exercise these boundaries. The payload plus the protected baseline/current Git files can reconstruct the entire projection without the previous external preparation folder.

`node scripts/verify-dom33-gallery.mjs [--live]` checks every selected effect in the real gallery, native input, cross-boundary drag release, offscreen disposal, six use categories and resource loading. It requires a valid private `.runtime/dom33/curation-seed.json`; never commit that file or user notes. The seed is verification evidence only, never a production input.
