# Source adaptation

The original single HTML file was split into local HTML, CSS and readable JavaScript. Third-party dependencies remain the exact author versions. No package or upstream build scripts ran.

Preserved unchanged: both GLSL programs, independent 26-ribbon geometry, CONFIG defaults, rounded image silhouette, cover fitting, strip count/spacing/positioning and responsive size calculations. Static verification compares these blocks byte-for-byte.

The changes are scoped to local integration: a manifest-limited opaque-origin image bridge, lifecycle methods, real primary-pointer bookkeeping, image-loading readiness and reduced-motion behavior. Native pointer interaction stays attached to the authored stage. No artificial input is generated.

`stop` removes the effect's ticker and pauses its own tweens. `resume` respects the current motion preference. `paint` submits the current state without advancing it. `dispose` releases event handlers, capture, observers, GPU objects, image handlers and the bridge's pending requests/Blob URLs. A disposed instance must be replaced with a fresh frame.

Reduced motion retains direct manipulation but avoids an entrance tween, autoplay, time-varying shader phase and post-release fling. Original normal-motion easing and inertial math are retained.

This package does not modify gallery UI, source broker policy, user state or catalog enrollment. The root runtime errors/asset status describe local loading; `ready` is not a claim of final visual acceptance. All browser, opaque-origin and resource-behavior verification remains pending.


Compatibility revision: SourceDemo.ready is resource/first-render-gated Promise; isReady is a boolean; inspect reports actual adapter state. Partial initialization and terminal disposal are covered in the source audit. Browser execution, input behavior, actual shader success and local integration remain pending. See compatibility-review.json for exact limits and source changes.
