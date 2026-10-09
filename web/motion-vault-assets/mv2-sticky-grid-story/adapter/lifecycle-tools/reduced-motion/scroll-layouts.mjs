// Author-specific, adapter-only reduced-motion modes. Immutable source/ is never edited.
// Browser/visual acceptance is intentionally not claimed by this module.
export const contractById = {
  'mv2-column-row-depth': {
    reducedMotionStrategy: 'static-authored-columns-native-scroll-live-preference',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'native-document-scroll-and-authored-variant-links-runtime-unverified',
    notes: [
      'All 10 variants keep their authored GSAP timelines in normal mode. Reduced mode does not create Lenis, a RAF loop, or ScrollTriggers.',
      'Reduced CSS exposes every original image at full opacity, removes depth/filter/displacement, contains demo 7’s 140%-wide grid, and reflows the original items into two columns on narrow screens.',
      'Live preference changes revert only this entry’s GSAP context, release its Lenis and RAF, and rebuild the author effect when motion is enabled again. Host pause defers rebuilding until resume.',
      'Source and mocked-state checks are not browser visual, real keyboard, wheel, touch, or assistive-technology acceptance.',
    ],
  },
  'mv2-reflection-editorial': {
    reducedMotionStrategy: 'static-editorial-grid-and-decorative-reflection-native-scroll-live-preference',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'native-document-scroll-and-authored-variant-links-runtime-unverified',
    notes: [
      'Both variants retain their authored reflection tracking, GSAP depth/filter/scale timelines and Lenis in normal mode.',
      'Reduced mode shows all original primary images, headings and captions in a native-scroll responsive grid. Navigation enters document flow and the reflected duplicate becomes a static decorative strip, aria-hidden and inert only in reduced mode.',
      'The static strip is decorative and intentionally crops duplicate reflection content; every primary image and caption remains in the main grid. Background attachment becomes local to remove the fixed-background parallax effect.',
      'Live preference changes revert only this entry’s GSAP context and reflection transform, release its Lenis and RAF, and safely rebuild normal mode. Browser readability and real-input acceptance remain unverified.',
    ],
  },
};

function once(source, before, after, label) {
  if (!source.includes(before) || source.indexOf(before) !== source.lastIndexOf(before)) {
    throw new Error('Expected one pinned scroll-layout source match: ' + label);
  }
  return source.replace(before, after);
}

const className = 'vault-static-scroll-layout';

function controller(reflection) {
  return `
// Source-specific reversible motion policy; unrelated timelines and input are untouched.
let __vaultLayoutContext = null;
let __vaultLayoutInitialized = false;
let __vaultLayoutStopped = window.SourceDemo.inspect().paused;
let __vaultLayoutDisposed = false;
let __vaultLayoutMode = null;
const __vaultLayoutPreference = matchMedia('(prefers-reduced-motion: reduce)');
${reflection ? `const __vaultReflectionWrap = reflectionEl.closest('.wrap');
const __vaultReflectionTransform = reflectionEl.style.transform;
const __vaultReflectionAttributes = __vaultReflectionWrap ? {
  hidden: __vaultReflectionWrap.getAttribute('aria-hidden'),
  inert: __vaultReflectionWrap.getAttribute('inert')
} : null;
function __vaultRestoreReflectionAttribute(name, value) {
  if (!__vaultReflectionWrap) return;
  if (value === null) __vaultReflectionWrap.removeAttribute(name);
  else __vaultReflectionWrap.setAttribute(name, value);
}` : ''}
function __vaultApplyStaticLayout(reduced) {
  document.documentElement.classList.toggle('${className}', reduced);
${reflection ? `  if (__vaultReflectionWrap) {
    if (reduced) {
      __vaultReflectionWrap.setAttribute('aria-hidden', 'true');
      __vaultReflectionWrap.setAttribute('inert', '');
    } else {
      __vaultRestoreReflectionAttribute('aria-hidden', __vaultReflectionAttributes.hidden);
      __vaultRestoreReflectionAttribute('inert', __vaultReflectionAttributes.inert);
    }
  }` : ''}
}
function __vaultQueueLayoutFrame() {
  if (__vaultLayoutFrame !== null || !__vaultLayoutScrollFn || __vaultLayoutStopped || __vaultLayoutDisposed || window.SourceDemo.disposed || window.SourceDemo.reducedMotion) return;
  __vaultLayoutFrame = requestAnimationFrame(__vaultLayoutScrollFn);
}
function __vaultCancelLayoutFrame() {
  if (__vaultLayoutFrame !== null) cancelAnimationFrame(__vaultLayoutFrame);
  __vaultLayoutFrame = null;
}
function __vaultReleaseLayoutMotion() {
  __vaultCancelLayoutFrame();
  __vaultLayoutScrollFn = null;
  if (__vaultLayoutContext) { __vaultLayoutContext.revert(); __vaultLayoutContext = null; }
  if (lenis) { window.SourceDemo.destroyLenis(lenis); lenis = null; }
${reflection ? '  reflectionEl.style.transform = __vaultReflectionTransform;' : ''}
}
function __vaultReconcileScrollLayout() {
  if (__vaultLayoutDisposed || window.SourceDemo.disposed) return;
  const reduced = window.SourceDemo.reducedMotion;
  __vaultApplyStaticLayout(reduced);
  // Defer context replacement while the host owns paused trigger/Lenis restoration.
  if (!__vaultLayoutInitialized || __vaultLayoutStopped) return;
  if (__vaultLayoutMode !== reduced) {
    __vaultReleaseLayoutMotion();
    __vaultLayoutMode = reduced;
    if (!reduced) __vaultLayoutContext = gsap.context(() => {
      initSmoothScrolling();
      scroll();
    });
  }
  if (!reduced) __vaultQueueLayoutFrame();
}
function __vaultStartScrollLayout() {
  __vaultLayoutInitialized = true;
  __vaultReconcileScrollLayout();
}
__vaultLayoutPreference.addEventListener('change', __vaultReconcileScrollLayout);
__vaultApplyStaticLayout(window.SourceDemo.reducedMotion);
window.SourceDemo.register({
  stop() { __vaultLayoutStopped = true; __vaultCancelLayoutFrame(); },
  resume() { __vaultLayoutStopped = false; __vaultReconcileScrollLayout(); },
  dispose() {
    if (__vaultLayoutDisposed) return;
    __vaultLayoutDisposed = true;
    __vaultLayoutPreference.removeEventListener('change', __vaultReconcileScrollLayout);
    __vaultReleaseLayoutMotion();
    __vaultApplyStaticLayout(false);
  }
});
`;
}

export async function transformSource({ id, relative, source, isEntry }) {
  if (!contractById[id] || !isEntry) return source;
  const reflection = id === 'mv2-reflection-editorial';
  const expected = reflection ? /^js\/demo[12]\/index\.js$/ : /^js\/index(?:[2-9]|10)?\.js$/;
  if (!expected.test(relative)) throw new Error('Unexpected scroll-layout entry: ' + id + '/' + relative);
  if (source.includes('function __vaultReconcileScrollLayout()')) return source;
  if (!source.includes('window.SourceDemo.createLenis(Lenis,')) throw new Error('Apply common lifecycle transforms before scroll-layouts: ' + relative);
  source = once(source, 'let lenis;', 'let lenis;\nlet __vaultLayoutFrame = null;\nlet __vaultLayoutScrollFn = null;', relative + ' Lenis');
  source = once(source, 'const scrollFn = (time) => {', `__vaultLayoutScrollFn = (time) => {
        __vaultLayoutFrame = null;
        if (__vaultLayoutStopped || __vaultLayoutDisposed || window.SourceDemo.disposed || window.SourceDemo.reducedMotion || !lenis) return;`, relative + ' RAF');
  const loops = source.match(/requestAnimationFrame\(scrollFn\)/g) || [];
  if (loops.length !== 2) throw new Error('Expected two owned RAF scheduling points: ' + relative);
  source = source.replace(/requestAnimationFrame\(scrollFn\)/g, '__vaultQueueLayoutFrame()');
  const startup = /initSmoothScrolling\(\);[^\n]*\n\s*scroll\(\);[^\n]*/g;
  const starts = source.match(startup) || [];
  if (starts.length !== 1) throw new Error('Expected one authored animation startup: ' + relative);
  source = source.replace(startup, '__vaultStartScrollLayout();');
  const marker = '\nwindow.SourceDemo.bindInitialization(';
  source = once(source, marker, '\n' + controller(reflection) + marker, relative + ' bound preload');
  return source;
}

const columnRules = `
:root { scroll-behavior: auto !important; }
body { overflow-y: auto; }
.columns { width: 100% !important; min-width: 0; grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr)); padding: 2rem 1rem; perspective: none !important; }
.column, .column__item, .column__item-imgwrap, .column__item-img { transform: none !important; opacity: 1 !important; visibility: visible !important; filter: none !important; perspective: none !important; will-change: auto !important; }
.column__item-img { top: 0; left: 0; width: 100%; height: 100%; }
a:focus-visible { outline: 3px solid currentColor; outline-offset: 4px; }
`;
const narrowColumnRules = `
.columns { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.column { display: contents; }
.column__item { min-width: 0; }
`;
const reflectionRules = `
:root { scroll-behavior: auto !important; }
body { overflow-y: auto; }
body:not(.loading)::before { content: none; }
.frame { position: relative; inset: auto; gap: 1rem; padding: 1.5rem; }
.frame__demos { flex-wrap: wrap; }
.content, .demo-2 .content { position: relative; margin: 0 auto; padding: 2rem var(--page-padding) 4rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 300px)); gap: 2rem; background-attachment: scroll; }
.item, .item__inner, .item__img, .item__img-inner, .item__caption { transform: none !important; filter: none !important; opacity: 1 !important; visibility: visible !important; perspective: none !important; will-change: auto !important; }
.item, .demo-2 .item { aspect-ratio: auto; min-width: 0; }
.item__inner { height: auto; }
.item__img { aspect-ratio: 2 / 3; height: auto; border-radius: 0 !important; }
.item__img-inner { position: absolute; inset: 0; }
.item__caption { position: relative; padding: 0.75rem; mix-blend-mode: normal; color: #e6ddff; background: rgb(14 3 33 / 85%); }
.item__caption-title { margin: 0; white-space: normal; overflow-wrap: anywhere; }
.content__title { font-size: clamp(2rem, 12vw, 9rem); white-space: normal; line-height: 1.1; overflow-wrap: anywhere; mix-blend-mode: normal; }
.content__title:not(:first-child) { margin: 2rem auto; }
.wrap, .demo-2 .wrap { position: relative; inset: auto; width: 100%; height: clamp(6rem, 20vw, 12rem); overflow: hidden; transform: scaleY(-1); box-shadow: none; pointer-events: none; }
.content--reflection { transform: none !important; padding-bottom: 0; }
a:focus-visible { outline: 3px solid currentColor; outline-offset: 4px; }
`;
function scoped(rules) {
  return rules.replace(/^([^\n{}]+)\s*\{/gm, (_, selectors) => selectors.split(',').map(selector => {
    selector = selector.trim();
    return selector === ':root' ? ':root.' + className : '.' + className + ' ' + selector;
  }).join(', ') + ' {');
}
export async function transformHTML({ id, relative, html }) {
  if (!contractById[id] || !/^index(?:[2-9]|10)?\.html$/.test(relative)) return html;
  const marker = 'data-vault-scroll-layout-reduced';
  if (html.includes(marker)) return html;
  const reflection = id === 'mv2-reflection-editorial';
  const rules = reflection ? reflectionRules : columnRules;
  // Media styles protect the first paint; the class also makes adapter state explicit.
  const css = '@media (prefers-reduced-motion: reduce) {' + rules + '\n}\n' + scoped(rules)
    + (reflection ? '' : '\n@media (prefers-reduced-motion: reduce) and (max-width: 53em) {' + narrowColumnRules + '\n}\n@media (max-width: 53em) {' + scoped(narrowColumnRules) + '\n}');
  if (!html.includes('</head>')) throw new Error('Missing head for scroll-layout CSS: ' + relative);
  return html.replace('</head>', '<style ' + marker + '>\n' + css + '\n</style>\n</head>');
}
