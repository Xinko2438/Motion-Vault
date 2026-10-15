# Motion Vault cleanup

Authorized 2026-10-16: retain one current Motion Vault; remove superseded copies, test processes and useless intermediate files. Preserve source truth, original-author inputs, current source overlay, private curation, current release dependencies and rollback history.

Scope: owning project's obsolete `.runtime/` material and historical `lineage/current/` process evidence, plus the completed Motion Vault preparation directory at `C:/Users/Ethan/Documents/Codex/2026-10-14/task-2`. Untracked `docs/` and `outputs/` research predates this cleanup and remains outside scope. Hub's three required static publishing locations remain intact.

Preflight: current main881f4c3, current page2491c0a526b7014aee97e936bc56969cc0345b8509b06cdd69e2facae2ffbc7f; no active preparation/test-browser producer was found. The obsolete maintenance script is not used because it assumes30candidates and a deleted ZIP recovery package.

Execution: classify exact files, record SHA256/bytes/boundaries and references, preserve all planned bytes once in a private local-only Git recovery ref, read every distinct archived body back and verify its digest, then delete only unchanged inventoried files. Keep small current publication/runtime proof and the private verifier seed. Recoverable history remains in Git, not additional visible directories or ZIPs. The private recovery ref must never be pushed.

Acceptance: original5286-file web tree unchanged; default formal tests pass; source rebuild works after temporary-stage cleanup; live4380copies match; private browser state unchanged. Remove rebuilt temporary stage after verification. Record actual counts and recovery ref in one compact cleanup result.

Routing: no delegation; deletion, Git recovery and shared browser state require serialized ownership. Reusable mechanism: exact hash-bound cleanup/recovery mapping, consumed by deletion and restore decisions. It prevents unknown files or later edits from being treated as disposable; this task verifies that boundary, without claiming later-task compounding effectiveness.

Outcome:107165 files/5917173931bytes and15481directories removed. Private recovery commit790f6b85ee5a65a91e00f954e12620a40cbe502b holds all25096distinct bodies, each read back and verified. Completed external task-2preparation folder removed. Source overlay, author inputs, current web tree, current capture provenance and private verifier seed retained. User's latest browser state58/0/56 and allMotionVault storage keys remained byte-identical.

Verification: fresh full71tests=70pass/0fail/1existing skip;5286-file rebuild and whole-tree gate passed;4380sync15858copy/13HTTPpassed. First browser run under parallel disk load timed out atnavigation and was recorded as failure; separate recheck passed31/31. No failed check was relabeled. New verification stage is removed again after acceptance.

Execution learning: serial async handling of100k small files was too slow. The same fixed hash inventory was resumed with bounded8-way workers, preserving per-file content/boundary checks and stopping on mismatches. No additional deletion scope was introduced. Final result owns counts; detailed private paths stay only in localGit recovery, not public reports.
