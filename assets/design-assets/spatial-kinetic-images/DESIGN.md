# Kinetic Images — 3D editorial image sculpture

One source-led entry with Tower, Paper and Spiral modes. The value is a coherent art direction across three spatial forms, not three catalogue items.

## Production use

Best suited to a fashion/editorial landing hero, a visual archive introduction or a campaign interlude where photography is the subject. The composition makes a collection feel like a designed physical object. Keep business navigation, readable copy and calls to action outside the WebGL field. It is less suitable for comparing product details, searching a large catalogue or presenting essential text.

## Why the design works

- Tower repeats ten broad open cylinders and ten narrow graphic bands. Slightly different radii separate the bands from the imagery; a tilted parent group avoids a static architectural elevation.
- Very low camera FOVs flatten perspective without replacing the source cameras with orthographic ones. Image surfaces read as designed strips while orbiting reveals their depth.
- Photographs are composed proportionally on an offscreen Canvas2D, then mapped across the shapes. Continuous UV translation makes the artwork travel without repeatedly rebuilding meshes.
- Back-facing image surfaces become 70% darker through the author's material patch. The banner has its own sinusoidal colour treatment on the back. These differences let depth remain legible as the user orbits.
- Paper places a folded/rippled vertical model on a strong yellow field. Spiral uses a dark field and a long helical model. Both retain the same source image vocabulary and compact footer selector.

These observations come from the pinned geometry, CSS, images and material code. The local adapter has not been visually rendered or recorded in this environment.

## Motion and interaction

The primary motion is texture translation, not a replacement CSS rotation. Tower's ten image components share one collage texture, and its ten bands share a cached banner texture: the author's per-component useFrame callbacks therefore accumulate. This adapter preserves that behavior, rather than silently normalizing speed. Paper moves its atlas vertically; Spiral moves it horizontally in the reverse direction.

Native Drei OrbitControls remains responsible for real orbit/dolly/pan input and pointer capture. The footer changes shape through local hashes. There is no automated dragging, fake pointer identity or claim that cold-start gesture continuation has been verified.

Reduced motion suppresses every ambient texture update and loading animation. It uses demand rendering so that explicit orbit/navigation is still possible. The stopped lifecycle state separately sets the actual R3F renderer loop to never.

## Reuse parameters and constraints

Use parameters.json to locate exact bindings. Start with image selection/crop, mode, tier count/gap and framing. Change camera FOV deliberately: raising it changes the poster-like reading of the artwork. Changing texture speed alone is not a new design.

The reference iframe viewport is 1100 × 670; scale it as a whole in the gallery. The author's atlas multiplies pixel dimensions by devicePixelRatio up to 2, so future device testing must include maximum texture size and memory usage. No new adaptive resolution algorithm has been substituted.

The original photographs and banner are retained byte-for-byte for local source study. Their individual rights are not established by the demo-code license. Production reuse requires licensed replacements or independent rights verification.
