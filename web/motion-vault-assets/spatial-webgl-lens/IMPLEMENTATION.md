# Source-controlled local adaptation

Original source files and Git blob hashes are preserved. The adapter uses compatible pinned React 18 / R3F 8 / Three 0.157 dependencies. No author build configuration executes.

Changes are limited to package-relative assets, local decoder ownership, FontFace/Blob transport for the exact approved fonts, original Troika main-thread fallback, lifecycle control, reduced-motion guards and removal of unrelated external Codrops links. The original broken root-relative lens preload is corrected to the actual packaged `glb/lens-transformed2.glb` file. Readable changed modules are under `adapter/source/src/`.

The original physical material block is checked byte-for-byte. Material/camera geometry, photographic treatment and DOM layout are retained. Stop/resume act on the actual R3F frame loop and Lenis instance. Dispose unmounts the root, releases decoder/GL ownership and temporary font/image URLs, and closes the local asset bridge. These lifecycle paths are implemented but not yet browser-tested.

Font files remain plainly visible, separately licensed and hash-listed. No data-embedding workaround or external font request is used. All runtime and visual acceptance claims remain pending.


Compatibility revision: SourceDemo.ready is resource/first-render-gated Promise; isReady is a boolean; inspect reports actual adapter state. Partial initialization and terminal disposal are covered in the source audit. Browser execution, input behavior, actual shader success and local integration remain pending. See compatibility-review.json for exact limits and source changes.
