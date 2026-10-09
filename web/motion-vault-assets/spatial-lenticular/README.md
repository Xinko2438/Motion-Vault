# Lenticular Material

Source-faithful Motion Vault study by Wassim Samad / Wawa Sensei.

- Source: https://github.com/wass08/r3f-lenticular-material
- Pinned commit: 9d7fcc2343a8719784c995a8c742311e2327b8a1
- Author demo: https://lenticular.wawasensei.dev
- Local entry: run/index.html
- Design: DESIGN.md
- Readable original/adapted source: source/ and adapter/author/
- Source delta: adapter/changes.patch
- Parameters: parameters.json
- Asset caveats: ASSET-RIGHTS.md
- Runtime allowlist and hashes: runtime-manifest.json
- Exact dependencies: adapter/package-lock.json and dependency-lock.json

A segmented, folded plane alternates two images across narrow facets. The TSL material changes both local vertex position and the image selection; camera orbit reveals a different image through actual angled facet visibility. Summer/winter imagery creates a coherent semantic contrast rather than merely switching colors. The retained dark surround and sunset environment emphasize the relief.

Native OrbitControls drag, touch and wheel; Leva controls retain division count, fold height and the two still-image pairs. Camera starts at the author’s [3,3,3], fov 30. No autoplay or fabricated orbit is added.

Status: source pinned, compiled and statically checked; live render/interaction/visual acceptance pending. Author-provided evidence must not be presented as a recording of this local adaptation.

See IMPLEMENTATION.md to rebuild. Exclude adapter/node_modules and the optional source-video evidence MP4 from application delivery; keep licenses and notices.
