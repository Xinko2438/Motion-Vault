# Unwoven: design reference

## Actual production use

Portfolio or studio work strips, photographic campaign sections and editorial identity sequences. The important behavior is the photograph becoming a set of individually moving physical ribbons, rather than the fact that a gallery moves horizontally.

## Composition and material

The reviewed author still uses a near-white field, warm low-key motion-blurred portraits, restrained rounded corners and generous vertical space. Central images remain intact. Near the sides, strips leave at varied speeds and curl into thin shaded threads. The fragment shader adds edge shading and a core glint, then bleaches threads toward page white before fading. Those choices make the change feel tactile and integrated with the page.

## Timing

Keep the author's slow 95px/s drift, 2.4-second eased opening ramp, and 2.2-second return from capped inertial release. Direct drag has smoothed velocity. Preserve the per-ribbon variation and readable central interval. Do not replace this structure with blur-only, clipped rectangles, CSS streaks or a generic marquee.

## Fidelity status

The author's still was visually reviewed. The local geometry, shaders, original image bytes and core layout were compared statically with the pinned source. Local animation, optical quality and interaction have not yet been observed in a browser. Portrait rights remain a separate production gate.
