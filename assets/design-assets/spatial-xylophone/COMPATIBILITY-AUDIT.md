# Source compatibility repair

Status: SOURCE_REPAIRED_RUNTIME_PENDING. No browser execution, local integration, or publication.

## Fixed source gaps
- Readiness waits two genuine embedded SMAA PNG decodes, the local GLB and actual first composer draw; failures reject.
- Frozen shader time is separated from a monotonic interaction clock, restoring reduced-motion fluid input and idle sleep without re-enabling spin/swing.
- Explicit EXT_color_buffer_float capability gate rejects unsupported targets before building float/half-float simulation buffers.
- Dispose handles partially constructed App instances; registered input/context listeners and single RAF are released.

## Actual loaders
- GLTFLoader -> FileLoader Request/fetch -> broker for one run/assets GLB. Binary JSON confirms no extensionsUsed, no images, one embedded buffer: no active Draco, ImageBitmap, worker or external buffer.
- SMAA images are embedded data PNGs; both are decoded before the app initializes. Audio module is not active in adapter.

## Renderer and native input
Three182 WebGL2 with FloatType/half-float render targets, custom fluid GLSL, SSAO and SMAA; EXT_color_buffer_float is mandatory and now guarded.

Native mouse sweep, wheel and touch drag; document listeners operate inside actual frame coordinates; canvas itself remains pointer-events:none as authored.

Reduced motion: Shader spin and strike swing are frozen; independent interaction clock preserves direct hover fluid and allows idle solver sleep.

## Still required
Opaque-frame rendering, GPU/shader/FBO, actual drag/scroll/touch, visibility/teardown and repeated host mount tests remain unrun. The WORK-only package still needs the parent-owned trusted-pointer/lifecycle host bridge before compatibility can be accepted. Read compatibility-review.json for exact source evidence and limitations.
