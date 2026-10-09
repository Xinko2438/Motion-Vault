// Adapter-only, pinned-source transformations. The source snapshots are never written.
export const contractById = {
  'mv2-satto-type-motion': {
    reducedMotionStrategy: 'native-scroll-readable-author-text-groups-with-live-preference-rebuild',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'native-document-scroll-and-existing-link-focus-source-verified-runtime-unverified',
    notes: [
      'Reduced motion skips ScrollSmoother, Flip, ScrambleText, related-item animation, and cursor blinking. It retains every authored text group and the logo in document flow, with wrapping and no blur.',
      'Preference changes revert owned GSAP work, restore original text and style snapshots, and recreate the author animation only after opting back into motion. Resize rebuilding is restricted to normal mode.',
      'The previously approved removal of the unrelated external recommendation section remains unchanged; immutable source preserves that section.',
      'Source and mocked lifecycle checks are not browser, screen-reader, visual-layout, or real GSAP/ScrollSmoother acceptance.',
    ],
  },
  'mv2-sticky-grid-story': {
    reducedMotionStrategy: 'native-scroll-static-author-intro-content-and-full-photo-grid-with-live-preference-rebuild',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'native-document-scroll-and-visible-existing-tutorial-link-source-verified-runtime-unverified',
    notes: [
      'Reduced motion bypasses Lenis and all pinned/parallax/reveal/zoom timelines. The original introduction, title, description, tutorial anchor, and all twelve gallery images remain in document order and normal flow.',
      'Reduced layout explicitly removes fixed/sticky positioning, offscreen transforms, opacity and pointer-event suppression; readable type and a responsive photo grid replace viewport-sized staging only while reduced motion is selected.',
      'Live preference changes revert the owned GSAP context, remove the tracked Lenis ticker, destroy and untrack Lenis, restore style snapshots, and rebuild the unchanged author sequence when motion is re-enabled.',
      'Source and mocked lifecycle checks are not browser, screen-reader, visual-layout, or real GSAP/Lenis acceptance.',
    ],
  },
};

function once(source, before, after, label) {
  if (!source.includes(before) || source.indexOf(before) !== source.lastIndexOf(before)) {
    throw new Error('Editorial pinned-source match failed: ' + label);
  }
  return source.replace(before, after);
}

// Serialized into the two author entries. There is no global pause or input interception.
// Context.add also captures tweens created later by ScrollTrigger callbacks.
function createEditorialController({ id, gsap, styleSelector, textSelector, startMotion, rebuildOnResize = false }) {
  const api = window.SourceDemo;
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const styleSnapshots = [...document.querySelectorAll(styleSelector)].map(element => ({
    element, style: element.getAttribute('style'),
  }));
  const textSnapshots = textSelector ? [...document.querySelectorAll(textSelector)].map(element => ({
    element, text: element.textContent, className: element.getAttribute('class'),
  })) : [];
  let context = null;
  let cleanup = null;
  let activeMode = null;
  let disposed = false;

  function restoreContent() {
    for (const { element, style } of styleSnapshots) {
      if (style === null) element.removeAttribute('style');
      else element.setAttribute('style', style);
    }
    for (const { element, text, className } of textSnapshots) {
      element.textContent = text;
      if (className === null) element.removeAttribute('class');
      else element.setAttribute('class', className);
    }
  }

  function clearMotion() {
    const priorContext = context;
    const priorCleanup = cleanup;
    context = null;
    cleanup = null;
    // Scroll callbacks must not create more animation while revert/kill is in progress.
    activeMode = null;
    try { priorCleanup?.(); }
    finally {
      try { priorContext?.revert(); }
      finally { restoreContent(); }
    }
  }

  function applyMode(force = false) {
    if (disposed || api.disposed) return;
    const next = media.matches ? 'static' : 'motion';
    if (!force && activeMode === next) return;
    clearMotion();
    document.documentElement.setAttribute('data-vault-editorial-mode', id + ':' + next);
    if (next === 'static') {
      activeMode = next;
      return;
    }
    // A preference change must not restart an explicitly stopped demo.
    if (api.inspect?.().paused) return;
    activeMode = next;
    context = gsap.context(() => { cleanup = startMotion(); });
  }

  function onChange() {
    try { applyMode(); }
    catch (error) { api.fail(error); }
  }

  function onResize() {
    if (!media.matches && !api.inspect?.().paused) {
      try { applyMode(true); }
      catch (error) { api.fail(error); }
    }
  }

  const controller = {
    start: applyMode,
    run(callback) {
      if (disposed || api.disposed || media.matches || activeMode !== 'motion') return;
      // During the initial context callback, GSAP already owns the new animations.
      if (context) context.add(callback);
      else callback();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      media.removeEventListener('change', onChange);
      if (rebuildOnResize) window.removeEventListener('resize', onResize);
      clearMotion();
      document.documentElement.removeAttribute('data-vault-editorial-mode');
    },
  };
  media.addEventListener('change', onChange);
  if (rebuildOnResize) window.addEventListener('resize', onResize);
  api.register({ dispose: controller.dispose, resume: onChange });
  return controller;
}

const controllerSource = '\nconst __vaultCreateEditorialController = ' + createEditorialController.toString() + ';\nlet __vaultEditorial;\n';

export async function transformSource({ id, relative, source, isEntry }) {
  if (!contractById[id] || !isEntry) return source;
  if (source.includes('const __vaultCreateEditorialController =')) return source;
  if (id === 'mv2-satto-type-motion') {
    if (relative !== 'js/index.js') throw new Error('Unexpected Satto entry: ' + relative);
    source = once(source, 'ScrollSmoother.create({\n  smooth: 1,\n  normalizeScroll: true,\n});',
      'function __vaultCreateAuthorSmoother() {\n  return ScrollSmoother.create({ smooth: 1, normalizeScroll: true });\n}', 'Satto smoother');
    source = once(source, "window.addEventListener('resize', () => {\n  ScrollTrigger.refresh(true);\n  initFlips();\n  initScramble();\n});",
      '// Resize is owned by the reversible editorial controller below.', 'Satto resize');
    source = source.replace('onEnter: () => scramble(el),', 'onEnter: () => __vaultEditorial.run(() => scramble(el)),')
      .replace('onEnterBack: () => scramble(el),', 'onEnterBack: () => __vaultEditorial.run(() => scramble(el)),')
      .replace('onEnter: () => animateRelatedEnter(),', 'onEnter: () => __vaultEditorial.run(() => animateRelatedEnter()),')
      .replace('onLeaveBack: () => animateRelatedLeave(),', 'onLeaveBack: () => __vaultEditorial.run(() => animateRelatedLeave()),');
    source = once(source, '  initFlips();\n  initScramble();\n  if (relatedEl) initRelatedDemos();',
      `  __vaultEditorial = __vaultCreateEditorialController({
    id: ${JSON.stringify(id)}, gsap,
    styleSelector: '.el, .logo > span, .related .grid__item',
    textSelector: '.el, .logo > span',
    rebuildOnResize: true,
    startMotion() {
      const smoother = __vaultCreateAuthorSmoother();
      initFlips();
      initScramble();
      if (relatedEl) initRelatedDemos();
      ScrollTrigger.refresh(true);
      return () => smoother.kill();
    },
  });
  __vaultEditorial.start();`, 'Satto bound initialization');
    return controllerSource + source;
  }

  if (relative !== 'src/scripts/index.js') throw new Error('Unexpected Sticky entry: ' + relative);
  source = once(source, '.add(() => this.toggleContent(timeline.scrollTrigger.direction === 1), "-=0.32")',
    '.add(() => __vaultEditorial.run(() => this.toggleContent(timeline.scrollTrigger.direction === 1)), "-=0.32")', 'Sticky deferred toggle context');
  source = once(source, '    window.SourceDemo.addTicker(gsap,(time) => {\n        lenis.raf(time * 1000) // Convert time from seconds to milliseconds\n    })',
    '    const ticker = window.SourceDemo.addTicker(gsap,(time) => {\n        lenis.raf(time * 1000) // Convert time from seconds to milliseconds\n    })', 'Sticky owned ticker');
  source = once(source, '    gsap.ticker.lagSmoothing(0)\n}',
    `    gsap.ticker.lagSmoothing(0)
    return () => {
        window.SourceDemo.removeTicker(gsap, ticker)
        lenis.off("scroll", ScrollTrigger.update)
        window.SourceDemo.destroyLenis(lenis)
    }
}`, 'Sticky smoother cleanup');
  source = once(source, '    initSmoothScrolling() // Initialize smooth scrolling\n    new StickyGridScroll() // Initialize grid animation',
    `    __vaultEditorial = __vaultCreateEditorialController({
        id: ${JSON.stringify(id)}, gsap,
        styleSelector: '.block__wrapper, .content, .content__title, .content__description, .content__button, .gallery__grid, .gallery__item',
        startMotion() {
            const cleanup = initSmoothScrolling()
            new StickyGridScroll() // The original normal-mode sequence remains unchanged.
            return cleanup
        },
    })
    __vaultEditorial.start()`, 'Sticky bound initialization');
  return controllerSource + source;
}

const cssById = {
  'mv2-satto-type-motion': `
html, body { height: auto !important; overflow: visible !important; scroll-behavior: auto !important; }
#smooth-wrapper, #smooth-content { position: static !important; height: auto !important; overflow: visible !important; transform: none !important; }
.frame { position: relative !important; height: auto !important; min-height: 0 !important; }
.logo.fixed { position: static !important; height: auto !important; min-height: 0 !important; padding: 2rem var(--page-padding); }
.logo > span { opacity: 1 !important; visibility: visible !important; transform: none !important; filter: none !important; }
.content { padding: 2rem var(--page-padding) !important; }
.group { display: flex !important; flex-direction: column !important; gap: .35rem; margin: 0 0 3rem !important; min-width: 0; }
.el { margin: 0 !important; width: auto !important; max-width: 100% !important; white-space: normal !important; overflow-wrap: anywhere; opacity: 1 !important; visibility: visible !important; filter: none !important; transform: none !important; }
.el--xl { line-height: 1.1; }
.typing-indicator { animation: none !important; opacity: 1 !important; }
.grid__item, .grid__item-img { opacity: 1 !important; transform: none !important; transition: none !important; }
a:focus-visible { outline: 2px solid currentColor !important; outline-offset: 4px; }
`,
  'mv2-sticky-grid-story': `
html { font-size: 16px !important; scrollbar-width: auto !important; scroll-behavior: auto !important; }
html::-webkit-scrollbar { display: initial !important; }
html, body { height: auto !important; overflow: visible !important; }
body { font-size: 1rem !important; }
.frame { position: relative !important; height: auto !important; min-height: 0 !important; padding: 1.5rem !important; grid-template-columns: 1fr !important; grid-template-areas: 'infos' 'tags' 'author' !important; gap: 1rem !important; }
.frame__tags { flex-wrap: wrap; }
.frame__author { justify-self: start !important; text-align: start !important; }
.frame a { opacity: 1 !important; }
.media { display: block !important; height: auto !important; padding: 0 !important; }
.media__image { position: static !important; height: auto !important; max-height: 75vh; object-fit: contain !important; }
.media__caption { width: auto !important; padding: 1rem !important; font-size: .875rem !important; }
.block.block--main { height: auto !important; }
.block__wrapper { position: static !important; height: auto !important; padding: 1.5rem !important; overflow: visible !important; transform: none !important; will-change: auto !important; }
.content { height: auto !important; min-height: 0 !important; padding: 1.5rem 0 2rem; }
.content__title { width: auto !important; max-width: 100%; font-size: clamp(2rem, 6vw, 4rem) !important; }
.content__description { width: auto !important; max-width: 40rem; margin-top: 1.5rem !important; font-size: 1rem !important; }
.content__button { margin-top: 1.5rem !important; font-size: 1rem !important; }
.content__title, .content__description, .content__button { opacity: 1 !important; visibility: visible !important; transform: none !important; pointer-events: auto !important; }
.gallery { position: static !important; width: 100% !important; max-width: 60rem; margin: 0 auto; transform: none !important; }
.gallery__grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)) !important; gap: 1.25rem !important; transform: none !important; will-change: auto !important; }
.gallery__item { opacity: 1 !important; visibility: visible !important; transform: none !important; will-change: auto !important; }
a:focus-visible { outline: 2px solid currentColor !important; outline-offset: 4px; }
`,
};

export async function transformHTML({ id, html }) {
  if (!cssById[id]) return html;
  const marker = 'data-vault-editorial-reduced="' + id + '"';
  if (html.includes(marker)) return html;
  if (!html.includes('</head>')) throw new Error('Editorial HTML has no head: ' + id);
  return html.replace('</head>', '<style ' + marker + '>\n@media (prefers-reduced-motion: reduce) {' + cssById[id] + '}\n</style>\n</head>');
}
