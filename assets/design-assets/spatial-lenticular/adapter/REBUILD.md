# Rebuild spatial-lenticular

Scope: cloud WORK-only source compatibility repair. The original source/ tree is unchanged and verified against the pinned upstream Git blob IDs.

1. Use the preserved adapter/author/ tree as the readable adapted source. To reconstruct it, copy source/ to a fresh adapter/author/ directory and apply adapter/changes.patch there with patch -p1. Keep adapter-owned entry.js, lifecycle.js and any resource/renderer helpers alongside it.
2. Dependencies are pinned in adapter/package-lock.json. Do not execute upstream scripts or change dependency versions. This repair reused already installed dependencies.
3. Build with node adapter/build-local.mjs. If esbuild is in the shared Motion Vault tooling directory, set VAULT_ESBUILD to that installed esbuild package path. This is the existing adapter-owned build recipe, not an upstream npm script.
4. Run node --check run/effect.js and regenerate runtime-manifest.json after any run-file change.
5. Source-only results are in compatibility-review.json. Do not promote, record, integrate locally, or describe runtime compatibility as verified before the authorized opaque-sandbox browser checks pass.

Contract: SourceDemo.ready is a Promise, SourceDemo.isReady is a Boolean, SourceDemo.dispose() is an idempotent Promise, and SourceDemo.inspect() returns lifecycle and authored input/render details. Never use truthiness of ready as a ready check.
