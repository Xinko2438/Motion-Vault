# Implementation boundary

Pinned original Grid class and both GLSL files feed an own esbuild configuration unchanged. The entry adapter adds cancellable frame scheduling, native reduced-motion handling, original-control repaint, matching shader-progress access and deterministic disposal. Camera, grid density, thresholds and materials are not simplified.

No external CDN/font/image API is needed. Texture loading uses the existing package-limited opaque-frame image bridge. Readiness reports the original image texture's presence after render submission, not visual acceptance. Browser, GPU, sandbox and lifecycle behavior still require actual QA.


Compatibility revision: SourceDemo.ready is resource/first-render-gated Promise; isReady is a boolean; inspect reports actual adapter state. Partial initialization and terminal disposal are covered in the source audit. Browser execution, input behavior, actual shader success and local integration remain pending. See compatibility-review.json for exact limits and source changes.
