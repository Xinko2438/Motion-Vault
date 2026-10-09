// Adapted from Clément Grellier / Unwoven. MIT; see ../LICENSE.md.

/**
 * UNWOVEN
 * =======
 * An endless horizontal strip of image cards. Each card is not a quad — it is a
 * stack of horizontal ribbons ("threads"). In the middle of the screen the
 * threads sit flush against each other and the card reads as a solid picture.
 * As a card approaches either edge of the viewport, the threads slide out of
 * frame at different speeds, splay apart, flutter, and dissolve into the page.
 *
 * Read left-to-right: cards enter from the right already unravelled and weave
 * themselves together; cards leaving on the left come apart again.
 */
(function () {
  "use strict";

  /* ================================================================== *
   * 1. Configuration
   * ================================================================== */

  const CONFIG = {
    threads: 26,          // ribbons per card
    segments: 20,         // horizontal subdivisions per ribbon (for the flutter)
    cardMaxHeight: 452,   // px, clamped against viewport height
    cardAspect: 0.75,     // width / height
    cardGapRatio: 0.11,   // gap as a fraction of card width
    cardRadius: 20,       // px corner radius
    scrollSpeed: 95,      // px per second at rest
    flingMax: 4200,       // px per second cap after a drag
    tearZoneRatio: 0.26,  // how far in from an edge the unravelling starts
    tearZoneMax: 380,     // px cap for the above
  };

  /**
   * Swap these for your own images. Any that fail to load keep their
   * generated placeholder, so the demo never shows an empty slot.
   */
  const IMAGE_URLS = [
    "./img/motion_blur_portrait_01.jpg",
    "./img/motion_blur_portrait_02.jpg",
    "./img/motion_blur_portrait_03.jpg",
    "./img/motion_blur_portrait_04.jpg",
    "./img/motion_blur_portrait_05.jpg",
    "./img/motion_blur_portrait_06.jpg",
  ];

  const stage = document.getElementById("stage");
  // Local integration: preference stays native and is never overridden.
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = motionPreference.matches;
  const listeners = new AbortController();
  const imageRequests = [];
  const owned = {renderer:null,observer:null,geometries:new Set(),materials:new Set(),textures:new Set(),canvases:new Set()};
  const assetState = { loaded: 0, failed: 0, total: IMAGE_URLS.length };
  let resolveReady, rejectReady, settled = false, initialized = false, paintCount = 0;
  const ready = new Promise((resolve, reject) => { resolveReady=resolve; rejectReady=reject; });
  ready.catch(() => {});
  const demo = window.SourceDemo = {
    ready,
    get isReady(){return initialized&&!disposed&&sourceErrors.length===0;},
    status: "loading",
    assets: assetState,
    stop() {}, resume() {}, dispose() {}, paint() { return false; }
  };
  window.sourceErrors = [];
  const reportError = message => { initialized=false;demo.status="failed";window.sourceErrors.push(String(message)); if (!settled) { settled=true; rejectReady(new Error(String(message))); } };
  addEventListener("error", e => reportError(e.message), { signal: listeners.signal });
  addEventListener("unhandledrejection", e => reportError(String(e.reason)), { signal: listeners.signal });
  let disposed = false;
  addEventListener("pagehide", () => demo.dispose(), { once:true });
  demo.inspect = () => ({status:demo.status, disposed, reducedMotion:reduceMotion, rendererInitialized:!!owned.renderer, firstFrameSubmitted:paintCount>0, runtimeVerified:false});
  demo.dispose = () => {
    if(disposed)return;disposed=true;listeners.abort();owned.observer?.disconnect();
    if(!settled){settled=true;rejectReady(new DOMException("Disposed before ready","AbortError"));}
    for(const image of imageRequests){image.onload=image.onerror=null;image.removeAttribute("src");}imageRequests.length=0;
    window.gsap?.globalTimeline.clear();window.gsap?.ticker.sleep();
    for(const kind of [owned.geometries,owned.materials,owned.textures]){for(const value of kind)value.dispose();kind.clear();}
    for(const canvas of owned.canvases)canvas.width=canvas.height=1;owned.canvases.clear();
    owned.renderer?.dispose();owned.renderer?.forceContextLoss();owned.renderer=null;stage.replaceChildren();demo.status="disposed";
    dispatchEvent(new Event("vault-source-dispose"));
  };


  /* ================================================================== *
   * 2. Placeholder artwork
   *    Drawn to a canvas so the demo is self-contained and has something
   *    to show while (or instead of) real photographs load.
   * ================================================================== */

  const PALETTES = [
    { base: ["#f6d5c3", "#e7a48b"], blobs: ["#f2b8a0", "#b86b4b", "#ffe9d9"], accent: "#5a2e1c" },
    { base: ["#dfeeea", "#a9cfc3"], blobs: ["#7fb3a2", "#3f7263", "#eefaf4"], accent: "#1e4034" },
    { base: ["#dfe7f5", "#9fb4d8"], blobs: ["#7d97c6", "#3a5387", "#f0f4ff"], accent: "#1c2a4d" },
    { base: ["#f7e6ee", "#e3a9c6"], blobs: ["#d886b0", "#8f3a68", "#ffeef6"], accent: "#54173c" },
    { base: ["#f5eedd", "#e3ce9d"], blobs: ["#d9b96f", "#8f7331", "#fff8e6"], accent: "#4d3a12" },
    { base: ["#e4e4ec", "#b3b3c6"], blobs: ["#9494ad", "#4c4c66", "#f4f4fa"], accent: "#22222f" },
    { base: ["#dff2f6", "#9ed4e0"], blobs: ["#6db8c9", "#2b6d80", "#effbff"], accent: "#123540" },
    { base: ["#fbe3d6", "#f0ac86"], blobs: ["#e58a5a", "#a34c22", "#fff1e6"], accent: "#521f06" },
    { base: ["#e9f0df", "#c2d3a4"], blobs: ["#a3bd7c", "#5d7a3a", "#f5fae9"], accent: "#2a3d14" },
    { base: ["#efe3f7", "#c6a9e0"], blobs: ["#aa85cc", "#5e3b85", "#f8f0ff"], accent: "#2c1547" },
  ];

  function drawPlaceholder(palette, seed) {
    const w = 640, h = 832;
    const canvas = document.createElement("canvas");
    owned.canvases.add(canvas);
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");

    // Tiny deterministic PRNG so a given seed always draws the same plate.
    let s = seed * 9301 + 49297;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };

    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, palette.base[0]);
    gradient.addColorStop(1, palette.base[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 5; i++) {
      const color = palette.blobs[i % palette.blobs.length];
      const cx = rnd() * w;
      const cy = rnd() * h;
      const r = (0.35 + rnd() * 0.55) * w;
      const blob = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      blob.addColorStop(0, color + "cc");
      blob.addColorStop(1, color + "00");
      ctx.fillStyle = blob;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = palette.accent + "22";
    ctx.beginPath();
    ctx.arc(w * (0.3 + rnd() * 0.4), h * (0.25 + rnd() * 0.5), w * (0.10 + rnd() * 0.12), 0, Math.PI * 2);
    ctx.fill();

    // A little grain, so the threads have something to bite on.
    const frame = ctx.getImageData(0, 0, w, h);
    const px = frame.data;
    for (let i = 0; i < px.length; i += 4) {
      const n = (rnd() - 0.5) * 14;
      px[i] += n;
      px[i + 1] += n;
      px[i + 2] += n;
    }
    ctx.putImageData(frame, 0, 0);

    return canvas;
  }

  const SLOT_COUNT = IMAGE_URLS.length || PALETTES.length;
  const placeholders = Array.from({ length: SLOT_COUNT }, (_, i) =>
    drawPlaceholder(PALETTES[i % PALETTES.length], i + 7)
  );

  /* ================================================================== *
   * 3. Bail out early if WebGL or GSAP is missing
   * ================================================================== */

  let renderer = null;
  if (window.THREE && window.gsap) {
    try {
      renderer = owned.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      renderer = null;
    }
  }
  if (!renderer) {
    demo.status = "webgl-unavailable";
    reportError("Unwoven requires the local Three.js/GSAP libraries and WebGL; fallback is not the reviewed effect.");
    startMarquee();
    const track = stage.querySelector(".marquee__track");
    demo.stop = () => { if (track) track.style.animationPlayState = "paused"; };
    demo.resume = () => { if (track && !reduceMotion) track.style.animationPlayState = "running"; };
    demo.dispose = () => { if(disposed)return; disposed = true; listeners.abort(); stage.replaceChildren();
      for (const canvas of placeholders) { canvas.width = canvas.height = 1; }
      placeholders.length = 0; demo.status = "disposed";
      window.dispatchEvent(new Event("vault-source-dispose")); };
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Orthographic camera sized in CSS pixels: 1 world unit === 1 pixel.
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);

  /* ================================================================== *
   * 4. Shaders
   * ================================================================== */

  const VERTEX_SHADER = /* glsl */ `
    attribute float aThread;   // ribbon index, 0 .. threads-1
    attribute float aRim;      // -1 at the ribbon's top edge, +1 at the bottom

    uniform float uTime;
    uniform float uHalfWidth;  // half the viewport width, in pixels
    uniform float uZone;       // depth of the tear zone at each edge, in pixels
    uniform float uStrength;   // global 0..1 master switch, tweened on load
    uniform float uWobble;     // 0 when the user prefers reduced motion
    uniform float uSeed;       // per-card, so two cards never unravel alike

    varying vec2  vUv;
    varying float vTear;       // 0 = woven, 1 = fully unravelled
    varying float vRim;
    varying float vRandom;     // this ribbon's random value, for the fragment stage

    float hash(float n) {
      return fract(sin(n * 127.1 + 311.7) * 43758.5453);
    }

    void main() {
      vUv = uv;
      vRim = aRim;

      vec4 world = modelMatrix * vec4(position, 1.0);
      float x = world.x;

      // How far into a tear zone is this vertex? Note both smoothsteps are
      // written low-edge-first; GLSL leaves edge0 >= edge1 undefined.
      float left  = 1.0 - smoothstep(-uHalfWidth, -uHalfWidth + uZone, x);
      float right = smoothstep(uHalfWidth - uZone, uHalfWidth, x);
      float tear  = max(left, right) * uStrength;

      // Zones never overlap the centre, so the sign of x is the escape direction.
      float direction = x < 0.0 ? -1.0 : 1.0;

      float randomA = hash(aThread + uSeed * 57.0);
      float randomB = hash(aThread * 3.7 + uSeed * 91.0);
      vRandom = randomA;

      // Bias the ramp so the card stays readable for longer, then lets go fast.
      float t = pow(tear, 1.4);

      // Each ribbon escapes at its own speed, which is what makes the edge
      // read as a comb of threads rather than one sliding sheet.
      float run = t * (60.0 + randomA * 420.0);
      run *= 0.85 + 0.15 * sin(uTime * (1.0 + randomB * 2.0) + randomA * 6.2831);
      world.x += direction * run;

      // The weave loosens vertically too, so ribbons drift out of their rows.
      world.y += (randomA - 0.5) * 170.0 * t * t;

      // Loose-thread flutter, sampled along the ribbon's displaced length.
      world.y += sin(world.x * 0.02 + uTime * (1.6 + randomA * 2.2) + randomA * 6.2831)
                 * (5.0 + 13.0 * randomA) * t * uWobble;

      vTear = tear;
      gl_Position = projectionMatrix * viewMatrix * world;
    }
  `;

  const FRAGMENT_SHADER = /* glsl */ `
    precision highp float;

    uniform sampler2D uMap;
    uniform vec2  uCardSize;    // px
    uniform float uRadius;      // px
    uniform float uImageAspect; // width / height of the texture

    varying vec2  vUv;
    varying float vTear;
    varying float vRim;
    varying float vRandom;

    float sdRoundBox(vec2 p, vec2 b, float r) {
      vec2 q = abs(p) - b + r;
      return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
    }

    void main() {
      float tear = vTear;
      float rim  = abs(vRim); // 0 at the ribbon's core, 1 at its edge

      // --- Open the weave -------------------------------------------------
      // The ribbon geometry stays a fixed height; we shrink the *visible*
      // band inside it. Doing this in the fragment stage keeps the edges
      // antialiased and lets the card be perfectly gapless when woven.
      float coreWidth = mix(0.8, 0.16 + vRandom * 0.12, smoothstep(0.0, 0.85, tear));
      float threadAlpha = 1.0 - smoothstep(coreWidth - 0.10, coreWidth + 0.06, rim);
      threadAlpha = mix(1.0, threadAlpha, smoothstep(0.03, 0.30, tear));

      // --- Card silhouette ------------------------------------------------
      vec2 p = (vUv - 0.5) * uCardSize;
      float cardAlpha = 1.0 - smoothstep(-1.5, 0.5, sdRoundBox(p, uCardSize * 0.5, uRadius));

      float fade  = 1.0 - smoothstep(0.75, 1.0, tear) * 0.65;
      float alpha = cardAlpha * threadAlpha * fade;
      if (alpha < 0.003) discard;

      // --- Sample the image, cover-fitted to the card ----------------------
      float cardAspect = uCardSize.x / uCardSize.y;
      vec2 scale = cardAspect > uImageAspect
        ? vec2(1.0, uImageAspect / cardAspect)
        : vec2(cardAspect / uImageAspect, 1.0);
      vec3 color = texture2D(uMap, (vUv - 0.5) * scale + 0.5).rgb;

      // --- Give each ribbon a round, physical read --------------------------
      color *= 1.0 - tear * 0.4 * rim * rim;                          // shade the sides
      color += tear * 0.18 * (1.0 - smoothstep(0.0, 0.45, rim));      // glint on the core
      color = mix(color, vec3(1.0), smoothstep(0.55, 1.0, tear) * 0.8); // bleach into the page

      gl_FragColor = vec4(color, alpha);
    }
  `;

  /* ================================================================== *
   * 5. Ribbon geometry
   *    One BufferGeometry shared by every card. Each ribbon owns its own
   *    vertices, so no ribbon can drag its neighbour along with it.
   * ================================================================== */

  function buildRibbonGeometry(width, height, threads, segments) {
    const columns = segments + 1;
    const perThread = columns * 2;
    const total = threads * perThread;

    const positions = new Float32Array(total * 3);
    const uvs = new Float32Array(total * 2);
    const rims = new Float32Array(total);
    const threadIds = new Float32Array(total);
    const indices = [];

    let v = 0;
    for (let t = 0; t < threads; t++) {
      for (let row = 0; row < 2; row++) {
        const vy = (t + row) / threads; // 0 at the bottom of the card, 1 at the top
        for (let c = 0; c < columns; c++) {
          const ux = c / segments;
          positions[v * 3 + 0] = (ux - 0.5) * width;
          positions[v * 3 + 1] = (vy - 0.5) * height;
          positions[v * 3 + 2] = 0;
          uvs[v * 2 + 0] = ux;
          uvs[v * 2 + 1] = vy;
          rims[v] = row === 0 ? -1 : 1;
          threadIds[v] = t;
          v++;
        }
      }

      const base = t * perThread;
      for (let c = 0; c < segments; c++) {
        const bl = base + c;
        const br = base + c + 1;
        const tl = base + columns + c;
        const tr = base + columns + c + 1;
        indices.push(bl, br, tl, br, tr, tl);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute("aRim", new THREE.BufferAttribute(rims, 1));
    geometry.setAttribute("aThread", new THREE.BufferAttribute(threadIds, 1));
    geometry.setIndex(indices);
    return geometry;
  }

  /* ================================================================== *
   * 6. Textures and materials — one per image slot, shared by all cards
   *    that show that image.
   * ================================================================== */

  // Uniform objects deliberately shared by reference across every material,
  // so the render loop only ever writes to one of each.
  const shared = {
    uTime:      { value: 0 },
    uHalfWidth: { value: 1 },
    uZone:      { value: 1 },
    uStrength:  { value: 0 },
    uWobble:    { value: reduceMotion ? 0 : 1 },
    uCardSize:  { value: new THREE.Vector2(1, 1) },
    uRadius:    { value: CONFIG.cardRadius },
  };

  function createTexture(source) {
    const texture = new THREE.Texture(source);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    owned.textures.add(texture);
    return texture;
  }

  const slots = placeholders.map((canvas, i) => {
    const texture = createTexture(canvas);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uMap: { value: texture },
        uSeed: { value: (i + 1) * 0.731 },
        uImageAspect: { value: canvas.width / canvas.height },
        uTime: shared.uTime,
        uHalfWidth: shared.uHalfWidth,
        uZone: shared.uZone,
        uStrength: shared.uStrength,
        uWobble: shared.uWobble,
        uCardSize: shared.uCardSize,
        uRadius: shared.uRadius,
      },
    });
    owned.materials.add(material);
    return { texture, material };
  });

  IMAGE_URLS.forEach((url, i) => {
    if (i >= slots.length) return;
    const image = new Image();
    imageRequests.push(image);
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (disposed) return;
      const slot = slots[i];
      slot.texture.image = image;
      slot.texture.needsUpdate = true;
      slot.material.uniforms.uImageAspect.value = image.naturalWidth / image.naturalHeight;
      assetState.loaded++;
      paint();
    };
    image.onerror = () => {
      if (disposed) return;
      assetState.failed++;
      demo.status = "asset-error";
      reportError("Portrait failed to load: " + url);
      paint();
    };
    image.src = url;
  });

  /* ================================================================== *
   * 7. The strip
   * ================================================================== */

  const cards = [];          // { mesh, baseX }
  let geometry = null;
  let cardWidth = 0, cardHeight = 0, pitch = 0, stripSpan = 0;
  let viewportWidth = 0, viewportHeight = 0;

  function rebuildStrip() {
    cards.forEach(card => scene.remove(card.mesh));
    cards.length = 0;
    if (geometry) geometry.dispose();

    geometry = buildRibbonGeometry(cardWidth, cardHeight, CONFIG.threads, CONFIG.segments);

    // Enough cards to cover the viewport plus a card's worth of slack at each
    // end, so nothing ever pops into view mid-screen.
    const count = Math.max(8, Math.ceil((viewportWidth + pitch * 3) / pitch));
    stripSpan = count * pitch;

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geometry, slots[i % slots.length].material);
      mesh.frustumCulled = false; // vertices leave the plane's bounding box
      scene.add(mesh);
      cards.push({ mesh, baseX: i * pitch });
    }
  }

  function resize() {
    viewportWidth = stage.clientWidth;
    viewportHeight = stage.clientHeight;

    renderer.setSize(viewportWidth, viewportHeight);
    camera.left = -viewportWidth / 2;
    camera.right = viewportWidth / 2;
    camera.top = viewportHeight / 2;
    camera.bottom = -viewportHeight / 2;
    camera.updateProjectionMatrix();

    cardHeight = Math.min(CONFIG.cardMaxHeight, viewportHeight * 0.62);
    cardWidth = cardHeight * CONFIG.cardAspect;
    pitch = cardWidth + Math.max(24, cardWidth * CONFIG.cardGapRatio);

    shared.uHalfWidth.value = viewportWidth / 2;
    shared.uZone.value = Math.min(viewportWidth * CONFIG.tearZoneRatio, CONFIG.tearZoneMax);
    shared.uCardSize.value.set(cardWidth, cardHeight);

    rebuildStrip();
  }

  /* ================================================================== *
   * 8. Motion: autoplay, drag, fling
   * ================================================================== */

  let baseSpeed = reduceMotion ? 0 : CONFIG.scrollSpeed;
  const motion = { velocity: 0 };
  let offset = 0;
  let elapsed = 0;
  let running = true;
  let motionTween = null;
  let strengthTween = null;

  // Keep the original introduction for normal motion; no entrance tween or
  // time-varying shader phase is forced when reduced motion is requested.
  if (reduceMotion) {
    shared.uStrength.value = 1;
  } else {
    motionTween = gsap.to(motion, { velocity: baseSpeed, duration: 2.4, ease: "power2.out", delay: 0.35 });
    strengthTween = gsap.to(shared.uStrength, { value: 1, duration: 1.8, ease: "power3.inOut", delay: 0.2 });
  }

  let dragging = false;
  let activePointerId = null;
  let lastX = 0, lastTime = 0, dragVelocity = 0;

  function beginDrag(event) {
    if (disposed || !running || dragging || event.isPrimary === false || event.button > 0) return;
    dragging = true;
    activePointerId = event.pointerId;
    lastX = event.clientX;
    lastTime = performance.now();
    dragVelocity = 0;
    stage.classList.add("is-dragging");
    // Only the real event's pointer identity is captured.
    try { stage.setPointerCapture(event.pointerId); } catch (_) {}
    gsap.killTweensOf(motion);
    motionTween = null;
  }

  function moveDrag(event) {
    if (disposed || !running) return;
    // A genuine held pointer can continue into a newly loaded source frame.
    if (!dragging && (event.buttons & 1) && event.isPrimary !== false) beginDrag(event);
    if (!dragging || event.pointerId !== activePointerId) return;
    const now = performance.now();
    const dx = event.clientX - lastX;
    const dt = Math.max(1, now - lastTime) / 1000;
    offset -= dx;
    dragVelocity += (-dx / dt - dragVelocity) * 0.35;
    lastX = event.clientX;
    lastTime = now;
    if (reduceMotion) paint();
  }

  function releaseCapture() {
    const id = activePointerId;
    activePointerId = null;
    dragging = false;
    stage.classList.remove("is-dragging");
    if (id !== null && stage.hasPointerCapture(id)) stage.releasePointerCapture(id);
  }

  function endDrag(event) {
    if (!dragging || (event && event.pointerId !== activePointerId)) return;
    releaseCapture();
    if (reduceMotion) {
      motion.velocity = 0;
      paint();
    } else {
      motion.velocity = gsap.utils.clamp(-CONFIG.flingMax, CONFIG.flingMax, dragVelocity);
      motionTween = gsap.to(motion, { velocity: baseSpeed, duration: 2.2, ease: "power3.out" });
    }
  }

  stage.addEventListener("pointerdown", beginDrag, { signal: listeners.signal });
  stage.addEventListener("pointermove", moveDrag, { signal: listeners.signal });
  stage.addEventListener("pointerup", endDrag, { signal: listeners.signal });
  stage.addEventListener("pointercancel", endDrag, { signal: listeners.signal });
  stage.addEventListener("lostpointercapture", endDrag, { signal: listeners.signal });

  /* ================================================================== *
   * 9. Local lifecycle around the author's strip motion and renderer
   * ================================================================== */

  function paint() {
    if (disposed || !stripSpan) return false;
    const half = stripSpan / 2;
    for (const card of cards) {
      const x = ((card.baseX - offset) % stripSpan + stripSpan) % stripSpan;
      card.mesh.position.x = x - half;
    }
    try {
      renderer.render(scene, camera);
      paintCount++;
      if (renderer.info.programs?.some(program => program.diagnostics?.runnable === false)) throw new Error("Unwoven shader compilation failed");
      initialized = assetState.loaded === assetState.total && assetState.failed === 0 && sourceErrors.length===0;
      if (initialized && !settled) { settled=true; resolveReady({assetsLoaded:assetState.loaded, firstFrameSubmitted:true, visualVerified:false}); }
      if (assetState.failed === 0 && sourceErrors.length===0) demo.status = initialized ? (running ? "ready" : "paused") : "loading";
      return initialized;
    } catch(error) { reportError(error); demo.status="render-error"; return false; }
  }

  function tick(_time, deltaMS) {
    if (!running || disposed || reduceMotion) return;
    if (!dragging) offset += motion.velocity * (deltaMS / 1000);
    elapsed += deltaMS / 1000;
    shared.uTime.value = elapsed;
    paint();
  }

  function stop() {
    if (disposed) return;
    running = false;
    if (dragging) motion.velocity = baseSpeed;
    releaseCapture();
    gsap.ticker.remove(tick);
    motionTween?.pause();
    strengthTween?.pause();
    gsap.ticker.sleep();
    if (initialized) demo.status = "paused";
  }

  function resume() {
    if (disposed) return false;
    running = true;
    if (!reduceMotion) {
      gsap.ticker.wake();
      motionTween?.resume();
      strengthTween?.resume();
      gsap.ticker.add(tick);
    }
    return paint();
  }

  function preferenceChanged() {
    reduceMotion = motionPreference.matches;
    baseSpeed = reduceMotion ? 0 : CONFIG.scrollSpeed;
    shared.uWobble.value = reduceMotion ? 0 : 1;
    motionTween?.kill();
    strengthTween?.kill();
    motionTween = strengthTween = null;
    shared.uStrength.value = 1;
    motion.velocity = baseSpeed;
    gsap.ticker.remove(tick);
    if (running && !reduceMotion) gsap.ticker.add(tick);
    else gsap.ticker.sleep();
    paint();
  }

  function onResize() { if (!disposed) { const previous=geometry; resize(); owned.geometries.delete(previous); owned.geometries.add(geometry); paint(); } }
  const observer = owned.observer = new ResizeObserver(onResize);
  observer.observe(stage);
  window.addEventListener("resize", onResize, { signal: listeners.signal });
  motionPreference.addEventListener("change", preferenceChanged, { signal: listeners.signal });

  function dispose() {
    if (disposed) return;
    stop();
    disposed = true;
    listeners.abort();
    observer.disconnect();
    motionTween?.kill();
    strengthTween?.kill();
    gsap.killTweensOf(motion);
    gsap.killTweensOf(shared.uStrength);
    gsap.ticker.sleep();
    if (!settled) { settled=true; rejectReady(new DOMException("Disposed before ready", "AbortError")); }
    for (const image of imageRequests) { image.onload = image.onerror = null; image.removeAttribute("src"); }
    imageRequests.length = 0;
    for (const card of cards) scene.remove(card.mesh);
    cards.length = 0;
    geometry?.dispose();
    geometry = null;
    for (const slot of slots) { slot.texture.dispose(); slot.material.dispose(); }
    slots.length = 0;
    for (const canvas of placeholders) { canvas.width = canvas.height = 1; }
    placeholders.length = 0;
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    renderer = null;
    // The copied isolation transport closes only its own observer, pending
    // requests and Blob URLs; it cannot read parent state or arbitrary files.
    window.dispatchEvent(new Event("vault-source-dispose"));
    initialized = false;
    owned.renderer=null;owned.observer=null;
    for(const kind of [owned.geometries,owned.materials,owned.textures,owned.canvases])kind.clear();
    demo.status = "disposed";
  }

  Object.assign(demo, { stop, resume, dispose, paint,
    inspect: () => ({ status: demo.status, running, disposed, reducedMotion: reduceMotion,
      loadedImages: assetState.loaded, failedImages: assetState.failed,
      threads: CONFIG.threads, segments: CONFIG.segments, offset,
      dragging, activePointerId, cards: cards.length,
      rendererInitialized:!!renderer, firstFrameSubmitted:paintCount>0, paintCount,
      initialized, inputEnabled:running&&!disposed, ambientRunning:running&&!reduceMotion&&!disposed,
      runtimeVerified:false, errors:sourceErrors.slice(),
      viewport: { width: viewportWidth, height: viewportHeight } })
  });
  window.addEventListener("pagehide", dispose, { once: true });
  resize();
  owned.geometries.add(geometry);
  paint();
  if (!reduceMotion) gsap.ticker.add(tick);
  else gsap.ticker.sleep();

  /* ================================================================== *
   * 10. CSS-only fallback
   * ================================================================== */

  function startMarquee() {
    const wrap = document.createElement("div");
    wrap.className = "marquee";
    const track = document.createElement("div");
    track.className = "marquee__track";

    // Duplicated so the -50% keyframe loops seamlessly.
    [...placeholders, ...placeholders].forEach((canvas) => {
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/jpeg", 0.85);
      img.alt = "";
      track.appendChild(img);
    });

    wrap.appendChild(track);
    stage.appendChild(wrap);
    stage.style.cursor = "default";
  }
})();
