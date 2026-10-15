# DOM33 formal integration

Authorized 2026-10-15: merge the prepared 33 effects into the existing gallery, preserve the current style, navigation, taxonomy, interaction and private curation, verify real input, publish to 4380 and push GitHub without force.

1. Verify current baseline and prepared payload hashes; preserve untracked docs/outputs.
2. Separate reviewed candidate integrity from same-version publication evidence. Retain strict default publication assertions and add negative integrity tests.
3. Keep the reviewed code/media as an immutable, hash-bound source overlay consumed by build and release. No rerun of preparation/capture.
4. Verify the actual gallery, all 33 effects, input takeover, categories, offscreen disposal and media. Preserve private state byte-for-byte.
5. Apply only the reviewed delta, publish via the existing locked publisher, verify full tests and 4380 copies, commit and push safely.

Rollback: pre-integration Git commit 2906bf12d04c7cd0523b8bf79d4bc8417045082c; hash-conditional publication rollback remains mandatory. Private browser data never enters Git.

Routing: no delegation; one shared gallery/publisher and private browser state make serialized ownership appropriate. Reusable changes are the phase-aware integrity check and immutable source overlay. Their downstream decision is whether a candidate may be tested or published; negative mutation tests and full inventory hashes measure the gate. Source truth: reviewed plan, pinned payload, current Git baseline; rebuild does not depend on the external temporary directory.

Preflight: 5271 baseline files match, all 318 payload hashes match. Current private browser counts: formal 62 / pending 0 / hidden 52. Existing docs/outputs left untouched. Browser connector available; no MXC launcher failure on this run.

Result: local formal publication completed. Candidate failures were reproduced; candidate integrity then passed the entire prospective inventory. Native hover exposed five real failures caused by the fixed legacy stylesheet. The single loader-expression repair made all241hover checks pass in both motion settings. Original preparation receipts were not relabeled. Scoped Git attributes preserve exact reviewed bytes through Windows checkouts. Final prospective tree:5286 files including repository-only Git metadata.

Publication:318 reviewed writes across project plus three Hub copies (1272 changed targets), protected by known before/after hashes, lock and conditional rollback. Final static70pass/0fail/1existing skip; live33lifecycle130/130; live switch31/31; full sync15858 plus13HTTP. UserChrome reloaded at1707x931/DPR1.5:62/0/52 and all6MotionVault storage keys byte-identical. No private state was written to that browser. The isolated fixture was corrected to the required schema before acceptance; no failing fixture was counted as a product pass.

Reusable lesson: validate the host's dependency selection, not only standalone pages. Candidate checks consume a reviewed prospective inventory; publication checks consume actual same-version receipts. Source truth rebuilds the stage; missing/extra/modified files and later target edits fail closed. Gates were consumed here; longer-term compounding effectiveness remains to be measured on later tasks.

Routing actual:no subagents; serialized ownership, no write conflicts or delegated retries. Independent tests ran concurrently. Usage/cost unavailable. Remote confirmation is recorded in the GitHub PR and local .runtime/dom33/github-delivery.json.
