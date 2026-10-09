# Source compatibility repair

Status: SOURCE_REPAIRED_RUNTIME_PENDING. No browser execution, local integration, or publication.

## Fixed source gaps
- SourceDemo.stop during texture initialization no longer restarts the render RAF. Engine.init accepts autoStart:false; adapter alone decides when to start.
- All five image textures must load; an actual first draw and WebGL error check precede Promise resolution.
- Partial and late textures, debug pane, renderer and authored scene resources are disposed.

## Actual loaders
- TextureLoader -> HTMLImageElement.src -> vault-isolation image broker -> local blob URL; five run/assets WebP files.

## Renderer and native input
Three183 WebGL2; regular GLSL background and textured scene; DPR <= 1.5.

Native pointer parallax, wheel (preventDefault), touch scroll; inner viewport remains 1100x670 in gallery, so authored <=768 mobile breakpoint is not exercised by card scaling.

Reduced motion: Time-driven background/trail phase is frozen; explicit scroll/parallax with authored smoothing remains.

## Still required
Opaque-frame rendering, GPU/shader/FBO, actual drag/scroll/touch, visibility/teardown and repeated host mount tests remain unrun. The WORK-only package still needs the parent-owned trusted-pointer/lifecycle host bridge before compatibility can be accepted. Read compatibility-review.json for exact source evidence and limitations.
