
# Unwoven — an infinite loom of images

An endless horizontal strip of image cards, where each card is not a flat quad but a stack of
horizontal ribbons. In the middle of the screen the ribbons sit flush and the card reads as a
solid picture; as it drifts towards either edge the threads slide out at their own speeds,
splay apart, flutter, and bleach into the page. Cards entering from the right weave themselves
back together.

<img width="1493" height="703" alt="unwoven" src="https://github.com/user-attachments/assets/ccf826ac-9ed0-41f0-9da7-2267e3aefdae" />

[Article on Codrops](https://tympanus.net/codrops/?p=120129)

[Demo](https://unwoven.clementgrellier.fr)

---

## Features

- 🧵 **Ribbon-based cards** — every card is 26 independent threads, not an image plane
- 🌬️ **Edge unravelling** — a tear zone at each side splays, flutters and dissolves the weave
- ♾️ **Infinite strip** — cards recycle seamlessly, sized to the viewport
- 🖱️ **Drag & fling** — pointer drag with inertia, easing back to a slow autoplay drift
- 🎨 **Procedural placeholders** — generated on canvas, so nothing is ever an empty slot
- ♿ **Reduced-motion aware** — autoplay and flutter turn off, plus a CSS-only WebGL fallback

---

## Demo

Open `index.html` directly in your browser **or** serve the folder with any static server.
There is no build step and nothing to install — three.js and GSAP are loaded from a CDN.

## Replace Images

Put your images inside `img/`, then update the `IMAGE_URLS` list near the top of the script
in `index.html`:

```js
const IMAGE_URLS = [
  "./img/your-image-01.jpg",
  "./img/your-image-02.jpg",
  // ...
];
```

Portrait images work best. Any number of images is fine — the strip repeats them as needed.
They are cover-fitted to the card, so aspect ratios don't have to match, and any image that
fails to load simply keeps its generated placeholder.

If you serve images from another domain, that domain needs to allow CORS: the textures are
requested with `crossOrigin = "anonymous"`.

## Customization

Most of the behaviour lives in the `CONFIG` object at the top of the script:

| Option | Default | What it does |
| --- | --- | --- |
| `threads` | `26` | Ribbons per card. Fewer reads coarser, more costs fill rate. |
| `segments` | `20` | Horizontal subdivisions per ribbon, which is what the flutter rides on. |
| `cardMaxHeight` | `452` | Card height in px, clamped against the viewport. |
| `cardAspect` | `0.75` | Card width / height. |
| `cardGapRatio` | `0.11` | Gap between cards, as a fraction of card width. |
| `cardRadius` | `20` | Corner radius in px. |
| `scrollSpeed` | `95` | Autoplay drift, px per second. |
| `flingMax` | `4200` | Speed cap after a drag, px per second. |
| `tearZoneRatio` | `0.26` | How far in from an edge the unravelling starts, as a fraction of the width. |
| `tearZoneMax` | `380` | Px cap for that zone. |

The look of the threads themselves — how far they run, how much they drift and flutter, how
they shade and bleach out — is in the two shaders further down, `VERTEX_SHADER` and
`FRAGMENT_SHADER`.

## How it works

- An orthographic camera is sized so that **one world unit is one CSS pixel**, which lets the
  configuration be written in px and the shaders reason about the viewport directly.
- One `BufferGeometry` is shared by every card. Each ribbon owns its own vertices, so no
  ribbon can drag its neighbour along, and each carries a `aThread` index plus an `aRim`
  edge marker.
- The vertex shader turns a vertex's distance into the tear zone into a `tear` value, then
  hashes the thread index to give every ribbon its own escape speed, vertical drift and
  flutter phase.
- The fragment shader keeps the ribbon geometry a fixed height and shrinks the *visible* band
  inside it, which is what keeps the card perfectly gapless when woven and antialiased when
  it comes apart. A rounded-box SDF cuts the card silhouette.
- Uniform objects are shared by reference across every material, so the render loop only ever
  writes one of each.

## Browser Support

Needs WebGL. Without it — or if GSAP fails to load — the page falls back to a CSS marquee of
the generated placeholders, so it degrades to something still worth looking at.

## Credits

Built with [three.js](https://threejs.org/) and [GSAP](https://gsap.com/).

Created by [Clément Grellier](https://clementgrellier.fr/)

## License

[MIT](LICENSE.md)
