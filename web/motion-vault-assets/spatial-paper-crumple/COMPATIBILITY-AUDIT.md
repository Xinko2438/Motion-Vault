# Source compatibility repair

Status: SOURCE_REPAIRED_RUNTIME_PENDING. No browser execution, local integration, or publication.

## Fixed source gaps
- Both real ArrayBuffer FontFace loads and seven SVG Image decodes precede authored application initialization.
- Readiness waits FBX/EXR VAT decoding, an actual spawned paper mesh using the unchanged timed entrance, and genuine first draw with GL error check.
- Source stop suspends pending entrance timers with remaining delay; no 150ms polling loop remains. Dispose rejects pending readiness and clears timers, gestures, fonts and scene resources.

## Actual loaders
- Fonts: fetch local TTF -> ArrayBuffer -> FontFace; compatible with broker and does not require font URL fetch.
- VAT: local FBX/EXR -> FileLoader Request/fetch -> broker -> CPU decode. FBX is ASCII and has no active external Texture/Video reference.
- Design SVGs: native Image.src -> broker blob -> canvas texture. fflate Worker definitions exist in bundled library but the active synchronous decode path has no worker invocation.

## Renderer and native input
Three160 WebGLRenderer with SSAO/shadows; EXR FloatType is CPU-decoded into geometry, not a float-texture GPU rendering requirement.

Native pointer capture for click/drag/release; lostpointercapture, blur and stop cancel gestures. No synthetic input.

Reduced motion: No falling entrance or physics under reduced motion; direct dragging remains, open/discard transitions snap.

## Still required
Opaque-frame rendering, GPU/shader/FBO, actual drag/scroll/touch, visibility/teardown and repeated host mount tests remain unrun. The WORK-only package still needs the parent-owned trusted-pointer/lifecycle host bridge before compatibility can be accepted. Read compatibility-review.json for exact source evidence and limitations.
