(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    const urls = [...document.querySelectorAll(selector)].map(
      (el) => getComputedStyle(el).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1] ?? el.src
    );
    return Promise.all(
      [...new Set(urls)].filter(Boolean).map((url) => {
        const img = new Image();
        img.src = url;
        return img.decode().catch(() => {
        });
      })
    );
  };
  var preloadFonts = (fonts) => {
    return Promise.all(fonts.map((font) => document.fonts.load(font))).catch(() => {
    });
  };

  // source/js/webgl/silk.js
  var silk_exports = {};
  __export(silk_exports, {
    fragmentShader: () => fragmentShader,
    vertexShader: () => vertexShader
  });

  // source/js/webgl/glsl.js
  var noise = (octaves) => `
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < ${octaves}; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }
`;
  var cover = `
  vec2 cover(vec2 uv) {
    float rectRatio = uRect.z / uRect.w;
    float imageRatio = uImageSize.x / uImageSize.y;
    vec2 scale = rectRatio > imageRatio
      ? vec2(1.0, imageRatio / rectRatio)
      : vec2(rectRatio / imageRatio, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }
`;
  var project = `
  vec4 project(vec2 uv, float depth) {
    vec2 size = uRect.zw;
    vec2 p = (uv - 0.5) * size;
    p = mat2(cos(uRotation), sin(uRotation), -sin(uRotation), cos(uRotation)) * p;
    vec2 position = uRect.xy + size * 0.5 + p;
    vec2 origin = uViewport * 0.5;
    position = origin + (position - origin) * 1000.0 / (1000.0 - depth);
    vec2 clip = position / uViewport * 2.0 - 1.0;
    return vec4(clip.x, -clip.y, 0.0, 1.0);
  }
`;

  // source/js/webgl/silk.js
  var vertexShader = `
  attribute vec2 aUv;

  uniform vec4 uRect; // left, top, width, height in CSS px
  uniform vec2 uViewport;
  uniform vec2 uTravel; // unit direction from the clicked item to the panel
  uniform vec3 uWipe;
  uniform float uReveal;
  uniform float uHide;
  uniform float uStrength;
  uniform float uRotation;
  uniform float uSeed;
  uniform float uTime;

  varying vec2 vUv;
  varying float vShade;

  const float PI = 3.14159265;

  ${project}

  // Height of the surface, in sheet widths: folds running along the direction of travel,
  // and the edges being unrolled and rolled away lifting towards the viewer
  float surface(vec2 uv) {
    vec2 p = (uv - 0.5) * vec2(1.0, uRect.w / uRect.z);
    float along = dot(p, uTravel);
    float across = dot(p, vec2(-uTravel.y, uTravel.x));
    float folds =
      sin(along * PI * 2.0 - uTime * 3.2 + uSeed) * 0.6 +
      sin(across * PI * 1.4 + along * 2.5 - uTime * 2.1 + uSeed * 1.7) * 0.4;
    float x = dot(uv, uWipe.xy) + uWipe.z;
    float front = mix(-0.1, 1.45, uReveal);
    float back = mix(-0.45, 1.1, uHide);
    float lift = max(
      smoothstep(front - 0.35, front, x),
      1.0 - smoothstep(back, back + 0.35, x)
    );
    return (folds * 0.5 + lift) * uStrength;
  }

  void main() {
    vUv = aUv;

    // Light the folds from the top left, by their slope
    float height = surface(aUv);
    float slopeX = (surface(aUv + vec2(0.01, 0.0)) - height) / 0.01;
    float slopeY = (surface(aUv + vec2(0.0, 0.01)) - height) / (0.01 * uRect.w / uRect.z);
    vShade = (slopeX * 0.6 + slopeY * 0.8) * 0.45;

    gl_Position = project(aUv, height * uRect.z);
  }
`;
  var fragmentShader = `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform vec4 uRect;
  uniform vec3 uWipe;
  uniform float uReveal;
  uniform float uHide;
  uniform float uOpacity;
  uniform float uEdgeNoise;
  uniform float uSeed;

  varying vec2 vUv;
  varying float vShade;

  ${noise(3)}
  ${cover}

  void main() {
    // A soft, wavy edge sweeps across the sheet to reveal it, and a second one to hide it.
    // Both start and end fully outside the sheet, so 0 and 1 are exactly hidden and shown.
    float soft = 0.02;
    float x = dot(vUv, uWipe.xy) + uWipe.z;
    x += (fbm(vUv * vec2(2.0, 2.5) + uSeed) - 0.45) * uEdgeNoise;
    float start = -0.5 * uEdgeNoise - soft;
    float end = 1.0 + 0.5 * uEdgeNoise + soft;
    float front = mix(start, end, uReveal);
    float back = mix(start, end, uHide);
    float mask =
      (1.0 - smoothstep(front - soft, front + soft, x)) *
      smoothstep(back - soft, back + soft, x);

    vec3 color = texture2D(uTexture, cover(vUv)).rgb * (1.0 + vShade);
    float alpha = mask * uOpacity;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

  // source/js/webgl/ink.js
  var ink_exports = {};
  __export(ink_exports, {
    fragmentShader: () => fragmentShader2,
    vertexShader: () => vertexShader2
  });
  var vertexShader2 = `
  attribute vec2 aUv;

  uniform vec4 uRect;
  uniform vec2 uViewport;
  uniform float uRotation;

  varying vec2 vUv;

  ${project}

  void main() {
    vUv = aUv;
    gl_Position = project(aUv, 0.0);
  }
`;
  var fragmentShader2 = `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uImageSize;
  uniform vec4 uRect;
  uniform vec2 uOrigin; // where the ink starts to spread, in uv
  uniform float uReveal;
  uniform float uHide;
  uniform float uOpacity;
  uniform float uStrength;
  uniform float uEdgeNoise;
  uniform float uSeed;
  uniform float uTime;

  varying vec2 vUv;

  ${noise(3)}
  ${cover}

  void main() {
    vec2 aspect = vec2(1.0, uRect.w / uRect.z);

    // It spreads from the origin with an irregular front, in an oval that follows the
    // sheet's proportions. The front starts and ends fully outside the sheet, so 0 and 1
    // are exactly hidden and shown. Nothing else is worked out where it hasn't reached.
    float soft = 0.04;
    float spread = length(vUv - uOrigin) / length(max(uOrigin, 1.0 - uOrigin));
    spread += (fbm(vUv * aspect * 3.0 + uSeed * 1.3) - 0.47) * uEdgeNoise;
    float front = mix(-0.5 * uEdgeNoise - soft, 1.0 + 0.5 * uEdgeNoise + soft, uReveal);
    float bloom = 1.0 - smoothstep(front - soft, front + soft, spread);
    if (bloom <= 0.0) discard;

    // The picture drifts in a slow, curling flow while the ink moves
    vec2 flow = vec2(0.0);
    if (uStrength > 0.0) {
      vec2 q = vUv * aspect * 2.5 + uSeed;
      flow = vec2(
        fbm(q + vec2(0.0, uTime * 0.2)),
        fbm(q + vec2(5.2, 1.3) - uTime * 0.2)
      ) - 0.47;
    }
    vec2 uv = vUv + flow * uStrength * 0.25;

    // It leaves by thinning out into wisps, the lightest patches first
    float dissolve = 1.0;
    if (uHide > 0.0) {
      float fade = 0.08;
      float wisps = fbm(vUv * aspect * 4.0 + flow * 2.0 + uSeed * 2.1);
      float threshold = mix(-fade, 1.0 + fade, uHide);
      dissolve = smoothstep(threshold - fade, threshold + fade, wisps);
    }

    // Soft while it moves, sharp once it has settled (a mipmap bias, so no extra passes)
    float mask = bloom * dissolve;
    float blur = (1.0 - mask) * 2.0 + (1.0 - uReveal) * 1.5 + uHide;
    vec3 color = texture2D(uTexture, cover(uv), blur).rgb;

    // Pigment pools along the edges, darker and deeper, like watercolor
    float rim = max(bloom * (1.0 - bloom), dissolve * (1.0 - dissolve)) * 4.0;
    color = mix(color, color * color, rim * 0.35);

    float alpha = mask * uOpacity;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

  // source/js/webgl/Sheets.js
  var SURFACES = { silk: silk_exports, ink: ink_exports };
  var COLS = 40;
  var ROWS = 50;
  var WIPES = {
    "top-bottom": [0, 1, 0],
    "bottom-top": [0, -1, 1],
    "left-right": [-1, 0, 1],
    "right-left": [1, 0, 0]
  };
  var UNIFORMS = [
    "uRect",
    "uViewport",
    "uTravel",
    "uWipe",
    "uOrigin",
    "uReveal",
    "uHide",
    "uOpacity",
    "uStrength",
    "uRotation",
    "uEdgeNoise",
    "uSeed",
    "uTime",
    "uTexture",
    "uImageSize"
  ];
  var createProgram = (gl, vertexShader3, fragmentShader3) => {
    const program = gl.createProgram();
    [
      [gl.VERTEX_SHADER, vertexShader3],
      [gl.FRAGMENT_SHADER, fragmentShader3]
    ].forEach(([type, source]) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader));
      }
      gl.attachShader(program, shader);
    });
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  };
  var Sheets = class {
    // Set up the canvas, every surface's shaders and the sheet mesh (throws without WebGL)
    constructor() {
      this.canvas = document.createElement("canvas");
      this.canvas.className = "sheets";
      const options = { alpha: true, premultipliedAlpha: true, antialias: true };
      const gl = this.canvas.getContext("webgl2", options) || this.canvas.getContext("webgl", options);
      if (!gl) throw new Error("WebGL is not available");
      this.gl = gl;
      this.isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
      const uvs = [];
      for (let y = 0; y <= ROWS; y++) {
        for (let x = 0; x <= COLS; x++) uvs.push(x / COLS, y / ROWS);
      }
      const indices = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = y * (COLS + 1) + x;
          indices.push(i, i + 1, i + COLS + 1, i + 1, i + COLS + 2, i + COLS + 1);
        }
      }
      this.count = indices.length;
      this.uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      this.programs = {};
      Object.entries(SURFACES).forEach(([name, { vertexShader: vertexShader3, fragmentShader: fragmentShader3 }]) => {
        const program = createProgram(gl, vertexShader3, fragmentShader3);
        const uniforms = {};
        UNIFORMS.forEach((uniform) => {
          uniforms[uniform] = gl.getUniformLocation(program, uniform);
        });
        this.programs[name] = { program, uniforms, aUv: gl.getAttribLocation(program, "aUv") };
      });
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      this.sheets = [];
      this.render = this.render.bind(this);
      document.body.appendChild(this.canvas);
    }
    // Whether a surface exists ('silk', 'ink')
    has(surface) {
      return surface in this.programs;
    }
    // Draw the next transition with a surface's shaders
    use(surface) {
      const gl = this.gl;
      this.current = this.programs[surface];
      gl.useProgram(this.current.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.enableVertexAttribArray(this.current.aUv);
      gl.vertexAttribPointer(this.current.aUv, 2, gl.FLOAT, false, 0, 0);
    }
    // Load the image into a texture (accepts a CSS url() value)
    load(imgURL) {
      const url = imgURL.match(/url\(["']?(.*?)["']?\)/)?.[1] ?? imgURL;
      const image = new Image();
      image.src = url;
      return image.decode().then(() => {
        if (window.SourceDemo.disposed) return;
        const gl = this.gl;
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        if (this.isWebGL2) gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(
          gl.TEXTURE_2D,
          gl.TEXTURE_MIN_FILTER,
          this.isWebGL2 ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.imageSize = [image.naturalWidth, image.naturalHeight];
      });
    }
    // Add a sheet; GSAP animates its reveal, hide, opacity and strength values
    add({
      rect,
      travel,
      wipe,
      origin = { x: 0.5, y: 0.5 },
      reveal = 0,
      hide = 0,
      opacity = 1,
      strength = 0,
      rotation = 0,
      edgeNoise = 0
    }) {
      const length = Math.hypot(travel.x, travel.y) || 1;
      const sheet = {
        rect: [rect.left, rect.top, rect.width, rect.height],
        travel: [travel.x / length, travel.y / length],
        wipe: WIPES[wipe] ?? WIPES["top-bottom"],
        origin: [origin.x, origin.y],
        reveal,
        hide,
        opacity,
        strength,
        rotation: rotation * Math.PI / 180,
        edgeNoise,
        seed: Math.random() * 100
      };
      this.sheets.push(sheet);
      return sheet;
    }
    // Stop drawing a sheet
    remove(sheet) {
      this.sheets = this.sheets.filter((s) => s !== sheet);
    }
    // Size the canvas to the viewport and draw on every tick until stop()
    start() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      this.canvas.classList.add("sheets--active");
      this.viewport = [this.canvas.clientWidth, this.canvas.clientHeight];
      this.canvas.width = Math.round(this.viewport[0] * dpr);
      this.canvas.height = Math.round(this.viewport[1] * dpr);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      window.SourceDemo.addTicker(gsap, this.render);
      this.render(gsap.ticker.time);
    }
    // Clear and hide the canvas, and free the texture
    stop() {
      const gl = this.gl;
      window.SourceDemo.removeTicker(gsap, this.render);
      this.sheets = [];
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      this.canvas.classList.remove("sheets--active");
      gl.deleteTexture(this.texture);
      this.texture = null;
    }
    // Draw every visible sheet, in the order they were added
    render(time) {
      const gl = this.gl;
      const u = this.current.uniforms;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.uniform1i(u.uTexture, 0);
      gl.uniform2fv(u.uViewport, this.viewport);
      gl.uniform2fv(u.uImageSize, this.imageSize);
      gl.uniform1f(u.uTime, time);
      this.sheets.forEach((sheet) => {
        if (sheet.reveal <= 0 || sheet.hide >= 1 || sheet.opacity <= 0) return;
        gl.uniform4fv(u.uRect, sheet.rect);
        gl.uniform2fv(u.uTravel, sheet.travel);
        gl.uniform3fv(u.uWipe, sheet.wipe);
        gl.uniform2fv(u.uOrigin, sheet.origin);
        gl.uniform1f(u.uReveal, sheet.reveal);
        gl.uniform1f(u.uHide, sheet.hide);
        gl.uniform1f(u.uOpacity, sheet.opacity);
        gl.uniform1f(u.uStrength, sheet.strength);
        gl.uniform1f(u.uRotation, sheet.rotation);
        gl.uniform1f(u.uEdgeNoise, sheet.edgeNoise);
        gl.uniform1f(u.uSeed, sheet.seed);
        gl.drawElements(gl.TRIANGLES, this.count, gl.UNSIGNED_SHORT, 0);
      });
    }
  };

  // source/js/index.js
  var config = {
    clipPathDirection: "top-bottom",
    // Direction of clip-path animation ('top-bottom', 'bottom-top', 'left-right', 'right-left')
    autoAdjustHorizontalClipPath: true,
    // Automatically flip horizontal clip-path direction based on panel side
    steps: 6,
    // Number of mover elements generated between grid item and panel
    stepDuration: 0.35,
    // Duration (in seconds) for each animation step
    stepInterval: 0.05,
    // Delay between each mover's animation start
    moverPauseBeforeExit: 0.14,
    // Pause before mover elements exit after entering
    rotationRange: 0,
    // Maximum random rotation applied to each mover's Z-axis (tilt left/right)
    wobbleStrength: 0,
    // Maximum random positional wobble (in pixels) applied horizontally/vertically to each mover path
    panelRevealEase: "sine.inOut",
    // Easing function for panel reveal animation
    gridItemEase: "sine",
    // Easing function for grid item exit animation
    moverEnterEase: "sine.in",
    // Easing function for mover entering animation
    moverExitEase: "sine",
    // Easing function for mover exit animation
    panelRevealDurationFactor: 2,
    // Multiplier to adjust panel reveal animation duration
    clickedItemDurationFactor: 2,
    // Multiplier to adjust clicked grid item animation duration
    gridItemStaggerFactor: 0.3,
    // Max delay factor when staggering grid item animations
    moverBlendMode: false,
    // Optional CSS blend mode for mover elements (false = no blend mode)
    pathMotion: "linear",
    // Type of path movement ('linear' or 'sine')
    sineAmplitude: 50,
    // Amplitude of sine wave for pathMotion 'sine'
    sineFrequency: Math.PI,
    // Frequency of sine wave for pathMotion 'sine'
    moverSurface: "flat",
    // How movers are drawn ('flat' clip-path copies, or WebGL sheets: 'silk' ripples and unrolls with a soft edge, 'ink' blooms and dissolves like ink in water)
    surfaceStrength: 0.2,
    // How deep 'silk' folds (as a fraction of each mover's width) or how much 'ink' swirls
    edgeNoise: 0.9,
    // Irregularity of the edges on 'silk' and 'ink' movers (0 = straight or round)
    moverRevealAmount: 1
    // How much of each 'silk' or 'ink' mover shows before it leaves (below 1, 'ink' copies stay irregular blots)
  };
  var originalConfig = { ...config };
  var lerp = (a, b, t) => a + (b - a) * t;
  var prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var grid = document.querySelector(".grid");
  var frame = document.querySelectorAll([".frame", ".heading"]);
  var panel = document.querySelector(".panel");
  var panelContent = panel.querySelector(".panel__content");
  var isAnimating = false;
  var isPanelOpen = false;
  var currentItem = null;
  var sheets;
  var getSheets = () => {
    if (sheets === void 0) {
      try {
        sheets = new Sheets();
      } catch (e) {
        sheets = null;
      }
    }
    return sheets;
  };
  var usesSheets = () => config.moverSurface !== "flat" && !!getSheets()?.has(config.moverSurface);
  var init = () => {
    document.querySelectorAll(".grid__item").forEach((item) => {
      item.addEventListener("click", () => onGridItemClick(item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onGridItemClick(item);
        }
      });
    });
    panelContent.querySelector(".panel__close")?.addEventListener("click", (e) => {
      e.preventDefault();
      resetView();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isPanelOpen && !isAnimating) {
        resetView();
      }
    });
  };
  var extractItemConfigOverrides = (item) => {
    const overrides = {};
    if (item.dataset.clipPathDirection) overrides.clipPathDirection = item.dataset.clipPathDirection;
    if (item.dataset.steps) overrides.steps = parseInt(item.dataset.steps);
    if (item.dataset.stepDuration) overrides.stepDuration = parseFloat(item.dataset.stepDuration);
    if (item.dataset.stepInterval) overrides.stepInterval = parseFloat(item.dataset.stepInterval);
    if (item.dataset.rotationRange) overrides.rotationRange = parseFloat(item.dataset.rotationRange);
    if (item.dataset.wobbleStrength)
      overrides.wobbleStrength = parseFloat(item.dataset.wobbleStrength);
    if (item.dataset.moverPauseBeforeExit)
      overrides.moverPauseBeforeExit = parseFloat(item.dataset.moverPauseBeforeExit);
    if (item.dataset.panelRevealEase) overrides.panelRevealEase = item.dataset.panelRevealEase;
    if (item.dataset.gridItemEase) overrides.gridItemEase = item.dataset.gridItemEase;
    if (item.dataset.moverEnterEase) overrides.moverEnterEase = item.dataset.moverEnterEase;
    if (item.dataset.moverExitEase) overrides.moverExitEase = item.dataset.moverExitEase;
    if (item.dataset.panelRevealDurationFactor)
      overrides.panelRevealDurationFactor = parseFloat(item.dataset.panelRevealDurationFactor);
    if (item.dataset.clickedItemDurationFactor)
      overrides.clickedItemDurationFactor = parseFloat(item.dataset.clickedItemDurationFactor);
    if (item.dataset.gridItemStaggerFactor)
      overrides.gridItemStaggerFactor = parseFloat(item.dataset.gridItemStaggerFactor);
    if (item.dataset.moverBlendMode) overrides.moverBlendMode = item.dataset.moverBlendMode;
    if (item.dataset.pathMotion) overrides.pathMotion = item.dataset.pathMotion;
    if (item.dataset.sineAmplitude) overrides.sineAmplitude = parseFloat(item.dataset.sineAmplitude);
    if (item.dataset.sineFrequency) overrides.sineFrequency = parseFloat(item.dataset.sineFrequency);
    if (item.dataset.moverSurface) overrides.moverSurface = item.dataset.moverSurface;
    if (item.dataset.surfaceStrength)
      overrides.surfaceStrength = parseFloat(item.dataset.surfaceStrength);
    if (item.dataset.edgeNoise) overrides.edgeNoise = parseFloat(item.dataset.edgeNoise);
    if (item.dataset.moverRevealAmount)
      overrides.moverRevealAmount = parseFloat(item.dataset.moverRevealAmount);
    return overrides;
  };
  var hideFrame = () => {
    gsap.to(frame, {
      opacity: 0,
      duration: 0.5,
      ease: "sine.inOut",
      pointerEvents: "none"
    });
  };
  var showFrame = () => {
    gsap.to(frame, {
      opacity: 1,
      duration: 0.5,
      ease: "sine.inOut",
      pointerEvents: "auto"
    });
  };
  var setScrollLock = (locked) => {
    document.documentElement.classList.toggle("scroll-locked", locked);
    if (window.lenis) locked ? window.lenis.stop() : window.lenis.start();
  };
  var setPanelInteractive = (isOpen) => {
    panel.inert = !isOpen;
    document.querySelectorAll(".frame, .heading, .grid").forEach((el) => el.inert = isOpen);
  };
  var positionPanelBasedOnClick = (clickedItem) => {
    const centerX = getElementCenter(clickedItem).x;
    const windowHalf = window.innerWidth / 2;
    const isLeftSide = centerX < windowHalf;
    if (isLeftSide) {
      panel.classList.add("panel--right");
    } else {
      panel.classList.remove("panel--right");
    }
    if (config.autoAdjustHorizontalClipPath) {
      if (config.clipPathDirection === "left-right" || config.clipPathDirection === "right-left") {
        config.clipPathDirection = isLeftSide ? "left-right" : "right-left";
      }
    }
  };
  var getClipPathsForDirection = (direction) => {
    switch (direction) {
      case "bottom-top":
        return {
          from: "inset(0% 0% 100% 0%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(100% 0% 0% 0%)"
        };
      case "left-right":
        return {
          from: "inset(0% 100% 0% 0%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(0% 0% 0% 100%)"
        };
      case "right-left":
        return {
          from: "inset(0% 0% 0% 100%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(0% 100% 0% 0%)"
        };
      case "top-bottom":
      default:
        return {
          from: "inset(100% 0% 0% 0%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(0% 0% 100% 0%)"
        };
    }
  };
  var onGridItemClick = (item) => {
    if (isAnimating) return;
    isAnimating = true;
    currentItem = item;
    setScrollLock(true);
    const overrides = extractItemConfigOverrides(item);
    Object.assign(config, overrides);
    positionPanelBasedOnClick(item);
    const { imgURL, title, desc } = extractItemData(item);
    setPanelContent({ imgURL, title, desc });
    setPanelInteractive(true);
    const allItems = document.querySelectorAll(".grid__item");
    if (prefersReducedMotion()) {
      crossfadeToPanel(allItems);
      return;
    }
    const delays = computeStaggerDelays(item, allItems);
    animateGridItems(allItems, item, delays);
    animateTransition(
      item.querySelector(".grid__item-image"),
      panel.querySelector(".panel__img"),
      imgURL
    );
  };
  var extractItemData = (item) => {
    const imgDiv = item.querySelector(".grid__item-image");
    const caption = item.querySelector("figcaption");
    return {
      imgURL: imgDiv.style.backgroundImage,
      title: caption.querySelector("h3").textContent,
      desc: caption.querySelector("p").textContent
    };
  };
  var setPanelContent = ({ imgURL, title, desc }) => {
    panel.querySelector(".panel__img").style.backgroundImage = imgURL;
    panel.querySelector(".panel__img").setAttribute("aria-label", title);
    panel.querySelector("h3").textContent = title;
    panel.querySelector("p").textContent = desc;
  };
  var getElementCenter = (el) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };
  var computeStaggerDelays = (clickedItem, items) => {
    const baseCenter = getElementCenter(clickedItem);
    const distances = Array.from(items).map((el) => {
      const center = getElementCenter(el);
      return Math.hypot(center.x - baseCenter.x, center.y - baseCenter.y);
    });
    const max = Math.max(...distances);
    return distances.map((d) => d / max * config.gridItemStaggerFactor);
  };
  var animateGridItems = (items, clickedItem, delays) => {
    const clipPaths = getClipPathsForDirection(config.clipPathDirection);
    gsap.to(items, {
      opacity: 0,
      scale: (i, el) => el === clickedItem ? 1 : 0.8,
      duration: (i, el) => el === clickedItem ? config.stepDuration * config.clickedItemDurationFactor : 0.3,
      ease: config.gridItemEase,
      // With WebGL movers the clicked image leaves as a sheet instead of being clipped
      clipPath: (i, el) => el === clickedItem && !usesSheets() ? clipPaths.from : "none",
      delay: (i) => delays[i]
    });
  };
  var animateTransition = (startEl, endEl, imgURL) => {
    hideFrame();
    const path = generateMotionPath(
      startEl.getBoundingClientRect(),
      endEl.getBoundingClientRect(),
      config.steps
    );
    if (usesSheets()) {
      animateSheetTransition(startEl, endEl, imgURL, path);
      return;
    }
    const fragment = document.createDocumentFragment();
    const clipPaths = getClipPathsForDirection(config.clipPathDirection);
    path.forEach((step, index) => {
      const mover = document.createElement("div");
      mover.className = "mover";
      gsap.set(mover, createMoverStyle(step, index, imgURL));
      fragment.appendChild(mover);
      const delay = index * config.stepInterval;
      gsap.timeline({ delay }).fromTo(
        mover,
        { opacity: 0.4, clipPath: clipPaths.hide },
        {
          opacity: 1,
          clipPath: clipPaths.reveal,
          duration: config.stepDuration,
          ease: config.moverEnterEase
        }
      ).to(
        mover,
        {
          clipPath: clipPaths.from,
          duration: config.stepDuration,
          ease: config.moverExitEase
        },
        `+=${config.moverPauseBeforeExit}`
      );
    });
    grid.parentNode.insertBefore(fragment, grid.nextSibling);
    scheduleCleanup(document.querySelectorAll(".mover"));
    revealPanel(endEl);
  };
  var createMoverStyle = (step, index, imgURL) => {
    const style = {
      backgroundImage: imgURL,
      position: "fixed",
      left: step.left,
      top: step.top,
      width: step.width,
      height: step.height,
      clipPath: getClipPathsForDirection(config.clipPathDirection).from,
      zIndex: 1e3 + index,
      backgroundPosition: "50% 50%",
      rotationZ: gsap.utils.random(-config.rotationRange, config.rotationRange)
    };
    if (config.moverBlendMode) style.mixBlendMode = config.moverBlendMode;
    return style;
  };
  var scheduleCleanup = (movers) => {
    const cleanupDelay = config.steps * config.stepInterval + config.stepDuration * 2 + config.moverPauseBeforeExit;
    gsap.delayedCall(cleanupDelay, () => movers.forEach((m) => m.remove()));
  };
  var onPanelRevealed = () => {
    isAnimating = false;
    isPanelOpen = true;
    panelContent.querySelector(".panel__close").focus({ preventScroll: true });
  };
  var revealPanel = (endImg) => {
    const clipPaths = getClipPathsForDirection(config.clipPathDirection);
    gsap.set(panelContent, { opacity: 0 });
    gsap.set(panel, { opacity: 1, pointerEvents: "auto" });
    gsap.timeline({
      defaults: {
        duration: config.stepDuration * config.panelRevealDurationFactor,
        ease: config.panelRevealEase
      }
    }).fromTo(
      endImg,
      { clipPath: clipPaths.hide },
      {
        clipPath: clipPaths.reveal,
        pointerEvents: "auto",
        delay: config.steps * config.stepInterval
      }
    ).fromTo(
      panelContent,
      { y: 25 },
      {
        duration: 1,
        ease: "expo",
        opacity: 1,
        y: 0,
        delay: config.steps * config.stepInterval,
        onComplete: onPanelRevealed
      },
      "<-=.2"
    );
  };
  var animateSheetTransition = (startEl, endEl, imgURL, path) => {
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    const travel = {
      x: endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2),
      y: endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2)
    };
    const travelLength = Math.hypot(travel.x, travel.y) || 1;
    const addSheet = (rect, props) => sheets.add({
      rect,
      travel,
      wipe: config.clipPathDirection,
      edgeNoise: config.edgeNoise,
      ...props
    });
    gsap.set(endEl, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(panelContent, { opacity: 0 });
    gsap.set(panel, { opacity: 1, pointerEvents: "auto" });
    sheets.use(config.moverSurface);
    sheets.load(imgURL).then(() => {
      if (window.SourceDemo.disposed) return;
      const tl = gsap.timeline({
        onComplete: () => {
          sheets.stop();
          gsap.set(startEl, { clearProps: "opacity,transition" });
          onPanelRevealed();
        }
      });
      const source = addSheet(startRect, {
        reveal: 1,
        opacity: parseFloat(getComputedStyle(startEl).opacity)
      });
      gsap.set(startEl, { opacity: 0, transition: "none" });
      tl.to(
        source,
        {
          hide: 1,
          strength: config.surfaceStrength,
          duration: config.stepDuration * config.clickedItemDurationFactor,
          ease: config.gridItemEase
        },
        0
      );
      path.forEach((step, index) => {
        const copy = addSheet(step, {
          strength: config.surfaceStrength * (1 - index / path.length),
          rotation: gsap.utils.random(-config.rotationRange, config.rotationRange),
          origin: { x: gsap.utils.random(0.42, 0.58), y: gsap.utils.random(0.42, 0.58) }
        });
        const start = index * config.stepInterval;
        tl.fromTo(
          copy,
          { reveal: 0, opacity: 0.4 },
          {
            reveal: config.moverRevealAmount,
            opacity: 1,
            duration: config.stepDuration,
            ease: config.moverEnterEase
          },
          start
        ).to(
          copy,
          {
            hide: 1,
            duration: config.stepDuration,
            ease: config.moverExitEase
          },
          start + config.stepDuration + config.moverPauseBeforeExit
        );
      });
      const landing = addSheet(endRect, {
        strength: config.surfaceStrength * 0.5,
        origin: {
          x: 0.5 - travel.x / travelLength * 0.35,
          y: 0.5 - travel.y / travelLength * 0.35
        }
      });
      const landingStart = config.steps * config.stepInterval;
      tl.to(
        landing,
        {
          reveal: 1,
          strength: 0,
          duration: config.stepDuration * config.panelRevealDurationFactor,
          ease: config.panelRevealEase
        },
        landingStart
      ).fromTo(
        endEl,
        { opacity: 0, clipPath: "inset(0% 0% 0% 0%)", pointerEvents: "auto" },
        { opacity: 1, duration: 0.3, ease: "none" },
        ">"
      ).call(() => sheets.remove(landing), null, ">").fromTo(
        panelContent,
        { y: 25 },
        { duration: 1, ease: "expo", opacity: 1, y: 0 },
        landingStart * 2 - 0.2
      );
      sheets.start();
    });
  };
  var crossfadeToPanel = (items) => {
    hideFrame();
    gsap.to(items, { opacity: 0, duration: 0.5, ease: "sine.inOut" });
    gsap.set(panel.querySelector(".panel__img"), {
      clipPath: "inset(0% 0% 0% 0%)"
    });
    gsap.set(panelContent, { opacity: 1, y: 0 });
    gsap.set(panel, { pointerEvents: "auto" });
    gsap.fromTo(
      panel,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "sine.inOut",
        onComplete: onPanelRevealed
      }
    );
  };
  var generateMotionPath = (startRect, endRect, steps) => {
    const path = [];
    const fullSteps = steps + 2;
    const startCenter = {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2
    };
    const endCenter = {
      x: endRect.left + endRect.width / 2,
      y: endRect.top + endRect.height / 2
    };
    for (let i = 0; i < fullSteps; i++) {
      const t = i / (fullSteps - 1);
      const width = lerp(startRect.width, endRect.width, t);
      const height = lerp(startRect.height, endRect.height, t);
      const centerX = lerp(startCenter.x, endCenter.x, t);
      const centerY = lerp(startCenter.y, endCenter.y, t);
      const sineOffset = config.pathMotion === "sine" ? Math.sin(t * config.sineFrequency) * config.sineAmplitude : 0;
      const wobbleX = (Math.random() - 0.5) * config.wobbleStrength;
      const wobbleY = (Math.random() - 0.5) * config.wobbleStrength;
      path.push({
        left: centerX - width / 2 + wobbleX,
        top: centerY - height / 2 + sineOffset + wobbleY,
        width,
        height
      });
    }
    return path.slice(1, -1);
  };
  var resetView = () => {
    if (isAnimating) return;
    isAnimating = true;
    setPanelInteractive(false);
    currentItem.focus({ preventScroll: true });
    const allItems = document.querySelectorAll(".grid__item");
    const delays = computeStaggerDelays(currentItem, allItems);
    gsap.timeline({
      defaults: { duration: config.stepDuration, ease: "expo" },
      onComplete: () => {
        panel.classList.remove("panel--right");
        isAnimating = false;
        isPanelOpen = false;
        setScrollLock(false);
      }
    }).to(panel, { opacity: 0 }).add(showFrame, 0).set(panel, { opacity: 0, pointerEvents: "none" }).set(panel.querySelector(".panel__img"), {
      clipPath: "inset(0% 0% 100% 0%)"
    }).set(allItems, { clipPath: "none", opacity: 0, scale: prefersReducedMotion() ? 1 : 0.8 }, 0).to(
      allItems,
      {
        opacity: 1,
        scale: 1,
        delay: (i) => delays[i]
      },
      ">"
    );
    Object.assign(config, originalConfig);
  };
  window.SourceDemo.bindInitialization(Promise.all([
    preloadImages(".grid__item-image, .panel__img"),
    preloadFonts(["400 1em halyard-display", "500 1em halyard-display", "700 1em owners-xnarrow"])
  ]).then(() => {
    if (window.SourceDemo.disposed) return;
    document.body.classList.remove("loading");
    init();
  }));
  window.SourceDemo.register({ dispose() {
    if (sheets) {
      sheets.stop();
      for (const entry of Object.values(sheets.programs || {})) sheets.gl.deleteProgram(entry.program);
      sheets.gl.deleteBuffer(sheets.uvBuffer);
      sheets.gl.getExtension("WEBGL_lose_context")?.loseContext();
      sheets.canvas.remove();
      sheets = null;
    }
    document.querySelectorAll(".mover").forEach((element) => element.remove());
  } });
})();
