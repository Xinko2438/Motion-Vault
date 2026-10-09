"""Own deterministic adapter. Reads pinned source; never executes upstream code."""
from pathlib import Path
import re
import shutil
import difflib

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'source/index.html').read_text()
css = re.search(r'<style>([\s\S]*?)</style>', source).group(1)
js = re.findall(r'<script>([\s\S]*?)</script>', source)[0]
upstream_js = js

def change(old, new):
    global js
    assert js.count(old) == 1, ('Expected unique upstream section', old[:80])
    js = js.replace(old, new)

change('  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;', '''  // Local integration: preference stays native and is never overridden.
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
''')

change('''  if (!renderer) {
    startMarquee();
    return;
  }''', '''  if (!renderer) {
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
  }''')

change('''  IMAGE_URLS.forEach((url, i) => {
    if (i >= slots.length) return;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const slot = slots[i];
      slot.texture.image = image;
      slot.texture.needsUpdate = true;
      slot.material.uniforms.uImageAspect.value = image.naturalWidth / image.naturalHeight;
    };
    image.src = url;
  });''', '''  IMAGE_URLS.forEach((url, i) => {
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
  });''')

start = js.index('  const baseSpeed = reduceMotion ? 0 : CONFIG.scrollSpeed;')
end = js.index('  /* ================================================================== *\n   * 10. CSS-only fallback', start)
js = js[:start] + '''  let baseSpeed = reduceMotion ? 0 : CONFIG.scrollSpeed;
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

  function onResize() { if (!disposed) { resize(); paint(); } }
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
  paint();
  if (!reduceMotion) gsap.ticker.add(tick);
  else gsap.ticker.sleep();

''' + js[end:]

# Capture ownership outside the unchanged shader/geometry/layout blocks, including failed boot.
js=js.replace('renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });','renderer = owned.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });')
js=js.replace('    canvas.width = w;', '    owned.canvases.add(canvas);\n    canvas.width = w;')
js=js.replace('    return texture;', '    owned.textures.add(texture);\n    return texture;')
js=js.replace('    return { texture, material };', '    owned.materials.add(material);\n    return { texture, material };')
js=js.replace('  function onResize() { if (!disposed) { resize(); paint(); } }','  function onResize() { if (!disposed) { const previous=geometry; resize(); owned.geometries.delete(previous); owned.geometries.add(geometry); paint(); } }')
js=js.replace('  resize();\n  paint();', '  resize();\n  owned.geometries.add(geometry);\n  paint();')
# The author's actual visual implementation must stay byte-identical.
for symbol, pattern in [
    ('vertex shader', r'const VERTEX_SHADER = /\* glsl \*/ `([\s\S]*?)`;'),
    ('fragment shader', r'const FRAGMENT_SHADER = /\* glsl \*/ `([\s\S]*?)`;'),
    ('geometry', r'function buildRibbonGeometry\([\s\S]*?\n  }'),
    ('layout', r'function rebuildStrip\([\s\S]*?\n  }'),
    ('resize', r'function resize\([\s\S]*?\n  }'),
]:
    assert re.search(pattern, source).group(0) == re.search(pattern, js).group(0), symbol

run = ROOT / 'run'
run.mkdir(exist_ok=True)
(ROOT / 'adapter/effect.diff').write_text(''.join(difflib.unified_diff(upstream_js.splitlines(True), js.splitlines(True), fromfile='source/index.html inline script', tofile='run/effect.js')))
(run / 'effect.js').write_text('// Adapted from Clément Grellier / Unwoven. MIT; see ../LICENSE.md.\n' + js)
(run / 'effect.css').write_text(css + '\n.stage { user-select: none; -webkit-user-select: none; }\n')
shutil.copytree(ROOT / 'source/img', run / 'img', dirs_exist_ok=True)
shutil.copy2(ROOT / 'source/LICENSE.md', ROOT / 'LICENSE.md')

bridge = (ROOT / 'adapter/source-isolation-bridge.original.js').read_text()
needle = " addEventListener('pagehide',()=>{"
assert bridge.count(needle) == 1
bridge = bridge.replace(needle, " let transportClosed=false;const closeTransport=()=>{if(transportClosed)return;transportClosed=true;")
bridge = bridge.replace("objectURLs.clear();});", "objectURLs.clear();};addEventListener('pagehide',closeTransport,{once:true});addEventListener('vault-source-dispose',closeTransport,{once:true});")
bridge = bridge.replace(" addEventListener('message',e=>{", " const receiveMessage=e=>{")
bridge = bridge.replace("else task.resolve(e.data);});", "else task.resolve(e.data);};addEventListener('message',receiveMessage);")
bridge = bridge.replace("function bytes(url){return new Promise", "function bytes(url){if(transportClosed)return Promise.reject(new DOMException('Closed','AbortError'));return new Promise")
bridge = bridge.replace("if(images.get(img)!==key)return true;", "if(transportClosed||images.get(img)!==key)return true;")
bridge = bridge.replace("catch(e){if(images.get(img)===key)", "catch(e){if(!transportClosed&&images.get(img)===key)")
bridge = bridge.replace("transportClosed=true;observer.disconnect();", "transportClosed=true;removeEventListener('message',receiveMessage);observer.disconnect();")
(run / 'vault-isolation.js').write_text(bridge)

(run / 'index.html').write_text('''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; connect-src 'self' data: blob:; font-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'">
<meta name="referrer" content="no-referrer">
<title>Unwoven · local author-source adaptation</title>
<link rel="stylesheet" href="./effect.css">
</head>
<body>
<main class="stage" id="stage" aria-label="Portraits woven from ribbons. Drag horizontally."></main>
<script data-vault-isolation src="./vault-isolation.js"></script>
<script src="./vendor/three.min.js"></script>
<script src="./vendor/gsap.min.js"></script>
<script src="./effect.js"></script>
</body>
</html>
''')
print('Generated local source adaptation; author geometry, shaders and layout preserved exactly.')
