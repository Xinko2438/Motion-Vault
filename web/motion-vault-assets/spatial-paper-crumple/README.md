# Paper Crumple: Houdini VAT

Source-faithful Motion Vault study by nagasawa (ITEM Inc.).

- Source: https://github.com/item-develop/paper-crumple-demo
- Pinned commit: f84648b001dd13becda7a629ab5398cecfe3a252
- Author demo: https://paper-crumple-demo.pages.dev/
- Local entry: run/index.html
- Design: DESIGN.md
- Readable original/adapted source: source/ and adapter/author/
- Source delta: adapter/changes.patch
- Parameters: parameters.json
- Asset caveats: ASSET-RIGHTS.md
- Runtime allowlist and hashes: runtime-manifest.json
- Exact dependencies: adapter/package-lock.json and dependency-lock.json

A scarlet wall, off-white floor, sharp side shadows and forty crumpled handwritten paper balls make a physical editorial playground. Clicking reverses the authored Houdini Vellum simulation to open a full paper card; dragging lifts it and a flick throws it back into the scene. The paper face contains a hand-lettered fictional studio, graph-paper rules and a small geometric identity. VAT preserves fine uneven wrinkles that an analytic sine deformation would lose.

Author’s real primary-pointer capture, click-to-unfold state machine, drag/grab spring and release velocity retained. Added lost capture/blur cleanup. Reduced motion starts at rest, changes open/closed states directly and suppresses the falling entrance and fling physics.

Status: source pinned, compiled and statically checked; live render/interaction/visual acceptance pending. Author-provided evidence must not be presented as a recording of this local adaptation.

See IMPLEMENTATION.md to rebuild. Exclude adapter/node_modules and the optional source-video evidence MP4 from application delivery; keep licenses and notices.
