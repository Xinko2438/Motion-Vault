
const __vaultCreateEditorialController = function createEditorialController({ id, gsap, styleSelector, textSelector, startMotion, rebuildOnResize = false }) {
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
};
let __vaultEditorial;
// ------------------------------------------------------------
// GSAP PLUGINS REGISTRATION
// ------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, ScrambleTextPlugin);

// ------------------------------------------------------------
// SCROLLSMOOTHER SETUP
// ------------------------------------------------------------
// Enables smooth scrolling
function __vaultCreateAuthorSmoother() {
  return ScrollSmoother.create({ smooth: 1, normalizeScroll: true });
}

// ------------------------------------------------------------
// DOM REFERENCES
// ------------------------------------------------------------
const textElements = document.querySelectorAll('.el');

const logoEl = document.querySelector('.logo > span');
const relatedEl = document.querySelector('.related');
const relatedItems = relatedEl?.querySelectorAll('.grid__item') || [];

// Cache original logo text once
const logoText = logoEl.textContent;

// Store original text content
textElements.forEach((el) => {
  el.dataset.text = el.textContent;
});
logoEl.dataset.text = logoText;

// ------------------------------------------------------------
// RESET ELEMENT STYLES (USED BEFORE FLIP SETUP)
// ------------------------------------------------------------
function resetTextElements() {
  textElements.forEach((el) => {
    gsap.set(el, {
      clearProps: 'transform,opacity,filter',
    });
  });
}

// ------------------------------------------------------------
// FLIP ANIMATION SETUP
// ------------------------------------------------------------
function initFlips() {
  resetTextElements();

  textElements.forEach((el) => {
    // Find the current positional class (e.g. "pos-1")
    const originalClass = [...el.classList].find((c) => c.startsWith('pos-'));

    // Target class stored in data-alt-pos
    const targetClass = el.dataset.altPos;

    const flipEase = el.dataset.flipEase || 'expo.inOut';

    // Temporarily switch to target class to capture end state
    el.classList.add(targetClass);
    el.classList.remove(originalClass);

    // Capture FLIP state (position + selected visual props)
    const flipState = Flip.getState(el, {
      props: 'opacity, filter, width',
    });

    // Restore original class immediately
    el.classList.add(originalClass);
    el.classList.remove(targetClass);

    Flip.to(flipState, {
      ease: flipEase,
      scrollTrigger: {
        trigger: el,
        start: 'clamp(bottom bottom-=10%)',
        end: 'clamp(center center)',
        scrub: true,
      },
    });
    Flip.from(flipState, {
      ease: flipEase,
      scrollTrigger: {
        trigger: el,
        start: 'clamp(center center)',
        end: 'clamp(top top)',
        scrub: true,
      },
    });
  });
}

// ------------------------------------------------------------
// SCRAMBLE TEXT CONFIG
// ------------------------------------------------------------
const scrambleChars = 'upperAndLowerCase';

// ------------------------------------------------------------
// SCRAMBLE FUNCTION
// ------------------------------------------------------------
function scramble(el, { duration, revealDelay = 0 } = {}) {
  const text = el.dataset.text ?? el.textContent;

  const finalDuration =
    duration ??
    (el.dataset.scrambleDuration ? parseFloat(el.dataset.scrambleDuration) : 1);

  gsap.killTweensOf(el);

  gsap.fromTo(
    el,
    { scrambleText: { text: '', chars: '' } },
    {
      scrambleText: {
        text,
        chars: scrambleChars,
        revealDelay,
      },
      duration: finalDuration,
    }
  );
}

// ------------------------------------------------------------
// SCRAMBLE SCROLLTRIGGERS SETUP
// ------------------------------------------------------------
function initScramble() {
  // Remove previously created scramble triggers
  killScrambleTriggers();

  // Create a ScrollTrigger per element
  textElements.forEach((el) => {
    ScrollTrigger.create({
      id: 'scramble', // used for targeted cleanup
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => __vaultEditorial.run(() => scramble(el)),
      onEnterBack: () => __vaultEditorial.run(() => scramble(el)),
    });
  });

  // Scramble logo once on init (not scroll-based)
  scramble(logoEl, { revealDelay: 0.5 });
}

// ------------------------------------------------------------
// SCRAMBLE TRIGGER CLEANUP
// ------------------------------------------------------------
function killScrambleTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.vars.id === 'scramble') {
      st.kill();
    }
  });
}

// ------------------------------------------------------------
// RELATED DEMOS ANIMATION CONFIGURATION
// ------------------------------------------------------------
const relatedConfig = {
  logo: {
    fadeOut: { duration: 0.7, ease: 'expo', opacity: 0 },
    fadeIn: { duration: 0.5, ease: 'power3.in', opacity: 1 },
  },
  items: {
    initial: { xPercent: 100, scale: 0, opacity: 0 },
    animate: {
      duration: 0.7,
      ease: 'expo',
      stagger: 0.1,
      xPercent: 0,
      scale: 1,
      opacity: 1,
    },
    reverse: {
      duration: 0.5,
      ease: 'power3.in',
      scale: 0,
      opacity: 0,
      xPercent: 100,
      stagger: 0.05,
    },
  },
};

// ------------------------------------------------------------
// RELATED DEMOS INITIALIZATION
// ------------------------------------------------------------
function initRelatedDemos() {
  // Set initial state for related items
  gsap.set(relatedItems, relatedConfig.items.initial);

  ScrollTrigger.create({
    trigger: relatedEl,
    start: 'top center+=25%',
    onEnter: () => __vaultEditorial.run(() => animateRelatedEnter()),
    onLeaveBack: () => __vaultEditorial.run(() => animateRelatedLeave()),
  });
}

// ------------------------------------------------------------
// RELATED DEMOS ANIMATION HELPERS
// ------------------------------------------------------------
function animateRelatedEnter() {
  gsap.to(logoEl, relatedConfig.logo.fadeOut);
  gsap.fromTo(
    relatedItems,
    relatedConfig.items.initial,
    relatedConfig.items.animate
  );
}

function animateRelatedLeave() {
  gsap.to(logoEl, relatedConfig.logo.fadeIn);
  gsap.to(relatedItems, relatedConfig.items.reverse);
}

// ------------------------------------------------------------
// RESIZE HANDLING
// ------------------------------------------------------------
// Resize is owned by the reversible editorial controller below.

// ------------------------------------------------------------
// INITIALIZATION
// ------------------------------------------------------------
window.SourceDemo.bindInitialization(Promise.resolve().then(() => {
  if (window.SourceDemo.disposed) return;
  __vaultEditorial = __vaultCreateEditorialController({
    id: "mv2-satto-type-motion", gsap,
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
  __vaultEditorial.start();
}));
