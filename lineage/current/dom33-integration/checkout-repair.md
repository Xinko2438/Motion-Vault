# Windows checkout verification

After merging PR1 and fast-forwarding main, the complete prospective-inventory gate rejected the checkout. Investigation found exactly one drifted file: `web/.gitattributes`. Every animation source, poster, video, catalog and HTML byte still matched. Both versions differed only by LF versus CRLF; the verified stage retained the exact source bytes.

Cause: the new scoped attribute rules covered imported artifacts but did not cover the rule file itself. `core.autocrlf=true` rewrote that metadata during checkout.

Repair: add `.gitattributes -text` to the generated metadata. No effect, gallery, private state, receipt or expected animation hash changes. The immutable original prepared plan/payload remain unchanged.

Regression: `scripts/verify-git-byte-integrity.mjs` runs actual Git checkout filters on seven bound files plus the working reviewed plan. Before repair,7/8passed and only the attributes file failed. After repair,8/8passed. Complete5286-file verification and the formal suite are rerun. This is a project-specific Git packaging lesson, not a new global rule.
