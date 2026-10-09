/* Motion Vault adapter lifecycle, installed before author scripts. Author source/ is immutable.
 * No timed reduced-motion freeze: each effect declares its own fallback evidence. */
(() => {
  'use strict';
  const native = {
    raf: window.requestAnimationFrame.bind(window), caf: window.cancelAnimationFrame.bind(window),
    timeout: window.setTimeout.bind(window), clearTimeout: window.clearTimeout.bind(window),
    interval: window.setInterval.bind(window), clearInterval: window.clearInterval.bind(window),
    add: EventTarget.prototype.addEventListener, remove: EventTarget.prototype.removeEventListener,
  };
  const frames = new Map(), timers = new Map(), listeners = new Set(), observers = new Set();
  const tickers = new Set(), lenisInstances = new Set(), hooks = new Set(), mediaWasPlaying = new Set();
  const disabledTriggers = new Set(), disabledObservers = new Set(), pausedAnimations = new Set(), pausedLenis = new Set();
  const nativeListeners = [];
  function listen(target, type, listener, options) { native.add.call(target, type, listener, options); nativeListeners.push({ target, type, listener, options }); }
  const resourceWaiters = new Set(), watchedRenderers = new Set();
  let shaderErrorCount = 0;
  const errors = [], reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let sequence = 0, paused = false, disposed = false, initialized = false, bound = false;
  let readyState = 'initializing', modeChanged = false, config = { id: null, reducedMotion: 'unverified' };
  let resolveReady, rejectReady;
  const ready = new Promise((resolve, reject) => { resolveReady = resolve; rejectReady = reject; });
  ready.catch(() => {}); // Host may subscribe later. A rejection must not become an unrelated console error.
  const noteError = error => { const message = String(error?.message || error); if (!errors.includes(message)) errors.push(message); };
  const fail = error => { if (disposed && error?.name === 'AbortError') return; noteError(error); if (readyState === 'initializing') { readyState = 'failed'; rejectReady(error instanceof Error ? error : new Error(String(error))); } else if (!disposed && readyState === 'ready') readyState = 'failed'; };
  const safe = fn => { try { return fn(); } catch (error) { noteError(error); } };
  const inputEvent = /^(click|dblclick|pointer.*|mouse.*|touch.*|wheel|scroll|keydown|keyup|resize)$/;
  function dropListener(record) { listeners.delete(record); if (record.abortListener) native.remove.call(record.options.signal, 'abort', record.abortListener); }
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (!listener || disposed) return;
    const capture = typeof options === 'boolean' ? options : !!options?.capture;
    for (const record of listeners) if (record.target === this && record.type === type && record.listener === listener && record.capture === capture) return;
    const record = { target: this, type, listener, capture, options, wrapped: null };
    record.wrapped = function(event) {
      if (typeof options === 'object' && options?.once) dropListener(record);
      if (disposed || (paused && inputEvent.test(type))) return;
      return typeof listener === 'function' ? listener.call(this, event) : listener.handleEvent(event);
    };
    if (typeof options === 'object' && options?.signal?.aborted) return;
    listeners.add(record);
    native.add.call(this, type, record.wrapped, options);
    if (typeof options === 'object' && options?.signal) { record.abortListener = () => dropListener(record); native.add.call(options.signal, 'abort', record.abortListener, { once: true }); }
  };
  EventTarget.prototype.removeEventListener = function(type, listener, options) {
    const capture = typeof options === 'boolean' ? options : !!options?.capture;
    for (const record of listeners) if (record.target === this && record.type === type && record.listener === listener && record.capture === capture) {
      native.remove.call(this, type, record.wrapped, capture); dropListener(record); return;
    }
    native.remove.call(this, type, listener, options);
  };
  function scheduleFrame(id, record) {
    record.native = native.raf(time => { record.native = null; frames.delete(id); if (!disposed && !paused) record.callback(time); });
  }
  window.requestAnimationFrame = callback => {
    const id = ++sequence;
    if (disposed) return id;
    const record = { callback, native: null }; frames.set(id, record);
    if (!paused) scheduleFrame(id, record);
    return id;
  };
  window.cancelAnimationFrame = id => { const record = frames.get(id); if (record?.native != null) native.caf(record.native); frames.delete(id); };
  function scheduleTimer(id, record) {
    record.started = performance.now();
    record.native = native.timeout(() => {
      record.native = null;
      if (disposed) return;
      if (paused) return;
      if (!record.repeat) timers.delete(id);
      record.callback(...record.args);
      if (record.repeat && timers.has(id) && !disposed) { record.remaining = record.delay; if (!paused) scheduleTimer(id, record); }
    }, record.remaining);
  }
  const createTimer = (callback, delay = 0, repeat, args) => {
    const id = ++sequence;
    if (disposed) return id;
    if (typeof callback !== 'function') throw new TypeError('String timers are not permitted in isolated author adapters');
    const milliseconds = Math.max(0, Number(delay) || 0);
    const record = { callback, delay: milliseconds, remaining: milliseconds, repeat, args, native: null, started: 0 };
    timers.set(id, record); if (!paused) scheduleTimer(id, record); return id;
  };
  window.setTimeout = (callback, delay, ...args) => createTimer(callback, delay, false, args);
  window.setInterval = (callback, delay, ...args) => createTimer(callback, delay, true, args);
  const clearTimer = id => { const record = timers.get(id); if (record?.native != null) native.clearTimeout(record.native); timers.delete(id); };
  window.clearTimeout = clearTimer; window.clearInterval = clearTimer;
  for (const name of ['ResizeObserver', 'MutationObserver', 'IntersectionObserver']) {
    const Constructor = window[name]; if (!Constructor) continue;
    window[name] = class extends Constructor {
      constructor(callback, ...args) { super((...values) => { if (!disposed && !paused) callback(...values); }, ...args); observers.add(this); }
      disconnect() { super.disconnect(); observers.delete(this); }
    };
  }
  function mediaElements() { return [...document.querySelectorAll('video,audio')]; }
  function pauseMedia() { for (const media of mediaElements()) { if (!media.paused && !media.ended) mediaWasPlaying.add(media); media.pause(); } }
  function watchRenderer(renderer) {
    if (!renderer?.debug) throw new Error('Pinned WebGL renderer debug hook is unavailable');
    if (watchedRenderers.has(renderer)) return renderer;
    const previous = renderer.debug.onShaderError;
    renderer.debug.checkShaderErrors = true;
    renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
      if (disposed) return;
      shaderErrorCount++;
      const details = [gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertexShader), gl.getShaderInfoLog(fragmentShader)].filter(Boolean).join(' | ');
      const error = new Error('Author WebGL shader compile/link failed' + (details ? ': ' + details : ''));
      error.name = 'ShaderInitializationError';
      fail(error); stop(); throw error;
    };
    watchedRenderers.add(renderer);
    hooks.add({dispose() { renderer.debug.onShaderError = previous; watchedRenderers.delete(renderer); }});
    return renderer;
  }
  function destroyLenis(instance) {
    if (!lenisInstances.delete(instance)) return false;
    pausedLenis.delete(instance); instance.destroy(); return true;
  }
  function stop() {
    if (disposed || paused) return;
    paused = true;
    window.gsap?.globalTimeline?.pause(); window.gsap?.ticker?.sleep();
    for (const record of frames.values()) { if (record.native != null) native.caf(record.native); record.native = null; }
    for (const record of timers.values()) { if (record.native != null) { native.clearTimeout(record.native); record.remaining = Math.max(0, record.remaining - (performance.now() - record.started)); } record.native = null; }
    for (const instance of lenisInstances) if (!instance.isStopped) { pausedLenis.add(instance); safe(() => instance.stop()); }
    for (const trigger of window.ScrollTrigger?.getAll?.() || []) if (trigger.enabled) { disabledTriggers.add(trigger); safe(() => trigger.disable(false)); }
    for (const observer of window.Observer?.getAll?.() || []) if (observer.isEnabled) { disabledObservers.add(observer); safe(() => observer.disable()); }
    for (const animation of document.getAnimations?.() || []) if (animation.playState === 'running') { pausedAnimations.add(animation); animation.pause(); }
    pauseMedia(); for (const hook of hooks) safe(() => hook.stop?.());
  }
  function resume() {
    if (disposed || !paused) return;
    paused = false;
    for (const instance of pausedLenis) safe(() => instance.start()); pausedLenis.clear();
    const liveTriggers = new Set(window.ScrollTrigger?.getAll?.() || []);
    for (const trigger of disabledTriggers) if (liveTriggers.has(trigger)) safe(() => trigger.enable(false, false)); disabledTriggers.clear();
    const liveObservers = new Set(window.Observer?.getAll?.() || []);
    for (const observer of disabledObservers) if (liveObservers.has(observer)) safe(() => observer.enable()); disabledObservers.clear();
    for (const record of tickers) if (!record.attached) { record.gsap.ticker.add(record.callback); record.attached = true; }
    window.gsap?.globalTimeline?.resume(); window.gsap?.ticker?.wake();
    for (const [id, record] of frames) if (record.native == null) scheduleFrame(id, record);
    for (const [id, record] of timers) if (record.native == null) scheduleTimer(id, record);
    for (const animation of pausedAnimations) safe(() => animation.play()); pausedAnimations.clear();
    if (!reduced.matches) for (const media of mediaWasPlaying) media.play().catch(noteError); mediaWasPlaying.clear();
    for (const hook of hooks) safe(() => hook.resume?.());
  }
  function dispose() {
    if (disposed) return;
    stop(); disposed = true;
    if (readyState === 'initializing') { readyState = 'disposed'; rejectReady(new DOMException('Demo disposed before initialization', 'AbortError')); }
    for (const waiter of [...resourceWaiters]) waiter.abort(); resourceWaiters.clear();
    for (const hook of hooks) safe(() => hook.dispose?.()); hooks.clear();
    for (const record of tickers) safe(() => record.gsap.ticker.remove(record.callback)); tickers.clear();
    for (const instance of [...lenisInstances]) safe(() => destroyLenis(instance)); lenisInstances.clear(); pausedLenis.clear();
    safe(() => window.ScrollSmoother?.get?.()?.kill());
    for (const trigger of window.ScrollTrigger?.getAll?.() || []) safe(() => trigger.kill()); disabledTriggers.clear();
    for (const observer of window.Observer?.getAll?.() || []) safe(() => observer.kill()); disabledObservers.clear();
    window.gsap?.globalTimeline?.clear(); window.gsap?.ticker?.sleep();
    for (const record of frames.values()) if (record.native != null) native.caf(record.native); frames.clear();
    for (const record of timers.values()) if (record.native != null) native.clearTimeout(record.native); timers.clear();
    for (const observer of observers) safe(() => observer.disconnect()); observers.clear();
    for (const record of listeners) { native.remove.call(record.target, record.type, record.wrapped, record.capture); dropListener(record); } listeners.clear();
    for (const animation of document.getAnimations?.() || []) safe(() => animation.cancel()); pausedAnimations.clear();
    for (const media of mediaElements()) { media.pause(); media.removeAttribute('src'); for (const source of media.querySelectorAll('source')) source.removeAttribute('src'); safe(() => media.load()); } mediaWasPlaying.clear();
    for (const record of nativeListeners) native.remove.call(record.target, record.type, record.listener, record.options); nativeListeners.length = 0;
    window.dispatchEvent(new CustomEvent('vault-source-dispose'));
  }
  function resourcePromise(promise, onAbort) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const waiter = { abort: () => {
        if (settled) return;
        safe(() => onAbort?.());
        finish(new DOMException('Resource wait disposed', 'AbortError'));
      } };
      function finish(error, value) {
        if (settled) return; settled = true;
        resourceWaiters.delete(waiter); onAbort = null;
        if (error) reject(error); else resolve(value);
      }
      resourceWaiters.add(waiter);
      Promise.resolve(promise).then(value => finish(null, value), error => finish(error));
      if (disposed) waiter.abort();
    });
  }
  function resourceEvent(target, loadedEvent, isReady, errorMessage, isFailed = () => false) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const cleanup = () => {
        native.remove.call(target, loadedEvent, loaded);
        native.remove.call(target, 'error', failed);
        resourceWaiters.delete(waiter);
      };
      const finish = error => {
        if (settled) return; settled = true; cleanup();
        if (error) reject(error); else resolve();
      };
      const loaded = () => finish();
      const failed = () => finish(new Error(errorMessage));
      const waiter = { abort: () => finish(new DOMException('Resource wait disposed', 'AbortError')) };
      resourceWaiters.add(waiter);
      native.add.call(target, loadedEvent, loaded, { once: true });
      native.add.call(target, 'error', failed, { once: true });
      if (disposed) waiter.abort();
      else if (isFailed()) failed();
      else if (isReady()) loaded();
    });
  }
  async function imageReady(image, url) {
    if (disposed) throw new DOMException('Disposed', 'AbortError');
    if (url) image.src = url;
    if (image.decode) await resourcePromise(image.decode(), url ? () => { image.removeAttribute?.('src'); } : null);
    else if (!image.complete) await resourceEvent(image, 'load', () => image.complete && image.naturalWidth > 0, 'Image did not load: ' + (url || image.currentSrc || image.src));
    if (disposed) throw new DOMException('Disposed', 'AbortError');
    if (!image.naturalWidth) throw new Error('Image did not initialize: ' + (url || image.currentSrc || image.src));
  }
  async function verifyResources() {
    const images = [...document.images].filter(image => image.currentSrc || image.getAttribute('src'));
    const backgrounds = new Set();
    for (const element of document.querySelectorAll('*')) for (const match of getComputedStyle(element).backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g)) backgrounds.add(match[1]);
    await Promise.all([
      resourcePromise(document.fonts?.ready || Promise.resolve()),
      ...images.map(image => imageReady(image)),
      ...[...backgrounds].map(url => imageReady(new Image(), url)),
      ...mediaElements().map(media => media.readyState >= 2 ? Promise.resolve() : resourceEvent(
        media, 'loadeddata', () => media.readyState >= 2, 'Media failed to initialize: ' + media.currentSrc, () => !!media.error,
      )),
    ]);
    if (disposed) throw new DOMException('Disposed', 'AbortError');
  }
  function bindInitialization(promise) {
    if (bound) throw new Error('Author initialization may be bound only once'); bound = true;
    Promise.resolve(promise).then(async () => {
      if (disposed) return;
      initialized = true;
      await verifyResources();
      if (readyState !== 'initializing' || disposed) return;
      if (paused) { paused = false; stop(); }
      if (reduced.matches) pauseMedia();
      readyState = 'ready'; resolveReady(inspect());
    }).catch(fail);
  }
  function inspect() { return {
    ...config, status: disposed ? 'disposed' : readyState, error: errors[0] || null, paused, disposed, initialized, readyState, pendingFrames: frames.size,
    activeFrames: [...frames.values()].filter(record => record.native != null).length,
    pendingTimers: timers.size, activeTimers: [...timers.values()].filter(record => record.native != null).length,
    pendingResourceWaiters: resourceWaiters.size, watchedRenderers: watchedRenderers.size, shaderErrorCount, gpuVerification: 'not_asserted', trackedListeners: listeners.size, trackedObservers: observers.size, trackedTickers: tickers.size,
    trackedLenis: lenisInstances.size, playingMedia: mediaElements().filter(media => !media.paused && !media.ended).length,
    reducedMotion: reduced.matches, reducedMotionStrategy: config.reducedMotion, reducedMotionChanged: modeChanged,
    compatibility: 'needs_runtime', errors: [...errors],
  }; }
  window.SourceDemo = {
    ready, stop, resume, dispose, inspect, bindInitialization, fail, destroyLenis, watchRenderer,
    get disposed() { return disposed; }, get reducedMotion() { return reduced.matches; },
    configure(value) { config = { ...config, ...value }; },
    register(hook) { if (disposed) safe(() => hook.dispose?.()); else hooks.add(hook); return hook; },
    createLenis(Constructor, ...args) { const instance = new Constructor(...args); lenisInstances.add(instance); if (paused) { pausedLenis.add(instance); instance.stop(); } return instance; },
    addTicker(gsap, callback) { if (disposed) return callback; for (const record of tickers) if (record.gsap === gsap && record.callback === callback) return callback; const record = { gsap, callback, attached: !paused }; tickers.add(record); if (record.attached) gsap.ticker.add(callback); return callback; },
    removeTicker(gsap, callback) { gsap.ticker.remove(callback); for (const record of tickers) if (record.gsap === gsap && record.callback === callback) tickers.delete(record); },
  };
  window.assetErrors = errors;
  window.Typekit ??= { load: options => document.fonts.ready.then(() => { if (!disposed) options.active?.(); }) };
  listen(window, 'error', event => fail(event.error || event.message || new Error('Resource failed: ' + (event.target?.src || event.target?.href || 'unknown'))), true);
  listen(window, 'unhandledrejection', event => fail(event.reason));
  listen(window, 'pagehide', dispose, { once: true });
  listen(reduced, 'change', () => { modeChanged = true; if (reduced.matches) pauseMedia(); });
  listen(document, 'play', event => { if (disposed || paused || reduced.matches) event.target.pause?.(); }, true);
  listen(document, 'click', event => { const anchor = event.target.closest?.('a[href]'); if (anchor && new URL(anchor.href, location.href).origin !== location.origin) event.preventDefault(); }, true);
})();

window.SourceDemo.configure({"id":"mv2-reflection-editorial","reducedMotion":"static-editorial-grid-and-decorative-reflection-native-scroll-live-preference","reducedMotionSupport":"source_path_present_runtime_unverified","reducedMotionLiveChangeSupport":"source_path_present_runtime_unverified","keyboardSupport":"native-document-scroll-and-authored-variant-links-runtime-unverified"});
