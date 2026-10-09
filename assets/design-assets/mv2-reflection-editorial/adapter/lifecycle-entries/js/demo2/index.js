// Importing utility function for preloading images
import { preloadImages } from '../utils.js';

// Variable to store the Lenis smooth scrolling object
let lenis;
let __vaultLayoutFrame = null;
let __vaultLayoutScrollFn = null;

// Selecting DOM elements for content and reflection
const contentEl = document.querySelector('.content');
const contentItems = [...contentEl.querySelectorAll('.item')];
const reflectionEl = document.querySelector('.content--reflection');
const reflectionItems = [...reflectionEl.querySelectorAll('.item')];

// Initializes Lenis for smooth scrolling with specific properties
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = window.SourceDemo.createLenis(Lenis,{
		lerp: 0.2, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update);

    // Define a function to run at each animation frame
	__vaultLayoutScrollFn = (time) => {
        __vaultLayoutFrame = null;
        if (__vaultLayoutStopped || __vaultLayoutDisposed || window.SourceDemo.disposed || window.SourceDemo.reducedMotion || !lenis) return;
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		__vaultQueueLayoutFrame(); // Recursively call scrollFn on each frame

        // Update translateY property of .content--reflection based on scroll amount
        reflectionEl.style.transform = `translateY(${-lenis.actualScroll}px)`;
	};
	// Start the animation frame loop
	__vaultQueueLayoutFrame();
};

// Function to handle scroll-triggered animations
const scroll = () => {
    // Loop through each content item and set up animations
    contentItems.forEach((item, pos) => {
        
        // Selecting elements for each content item
        const itemImg = item.querySelector('.item__img');
        const itemImgInner = itemImg.querySelector('.item__img-inner');
        const itemCaption = item.querySelector('.item__caption');

        // Selecting elements for each reflection item
        const reflectionItem = reflectionItems[pos];
        const reflectionItemImg = reflectionItem.querySelector('.item__img');
        const reflectionItemImgInner = reflectionItemImg.querySelector('.item__img-inner');
        const reflectionItemCaption = reflectionItem.querySelector('.item__caption');

        // Set up GSAP timeline for each content-reflection pair
        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                scrub: true
            }
        })
        // Animation for image and reflection image
        .fromTo([itemImg, reflectionItemImg], {
            filter: 'brightness(120%) blur(0px)',
            transformOrigin: '50% 100%'
        }, {
            ease: 'power3.in',
            filter: 'brightness(50%) blur(25px)',
            skewX: 3,
            borderRadius: 100,
            scaleY: 0,
            scaleX: 1.1,
        }, 0)
        .to([itemImg, reflectionItemImg], {
            ease: 'power4.in',
            skewY: -3
        }, 0)
        // Animation for image inner content
        .fromTo([itemImgInner, reflectionItemImgInner], {
            scale: 1
        }, {
            ease: 'none',
            scale: 2
        }, 0)
        // Animation for caption
        .to([itemCaption, reflectionItemCaption], {
            ease: 'power4.in',
            opacity: 0,
            scale: 0
        }, 0);
    });
};

// Initialization function
const init = () => {
    __vaultStartScrollLayout();
};

// Preload images before initializing animations

// Source-specific reversible motion policy; unrelated timelines and input are untouched.
let __vaultLayoutContext = null;
let __vaultLayoutInitialized = false;
let __vaultLayoutStopped = window.SourceDemo.inspect().paused;
let __vaultLayoutDisposed = false;
let __vaultLayoutMode = null;
const __vaultLayoutPreference = matchMedia('(prefers-reduced-motion: reduce)');
const __vaultReflectionWrap = reflectionEl.closest('.wrap');
const __vaultReflectionTransform = reflectionEl.style.transform;
const __vaultReflectionAttributes = __vaultReflectionWrap ? {
  hidden: __vaultReflectionWrap.getAttribute('aria-hidden'),
  inert: __vaultReflectionWrap.getAttribute('inert')
} : null;
function __vaultRestoreReflectionAttribute(name, value) {
  if (!__vaultReflectionWrap) return;
  if (value === null) __vaultReflectionWrap.removeAttribute(name);
  else __vaultReflectionWrap.setAttribute(name, value);
}
function __vaultApplyStaticLayout(reduced) {
  document.documentElement.classList.toggle('vault-static-scroll-layout', reduced);
  if (__vaultReflectionWrap) {
    if (reduced) {
      __vaultReflectionWrap.setAttribute('aria-hidden', 'true');
      __vaultReflectionWrap.setAttribute('inert', '');
    } else {
      __vaultRestoreReflectionAttribute('aria-hidden', __vaultReflectionAttributes.hidden);
      __vaultRestoreReflectionAttribute('inert', __vaultReflectionAttributes.inert);
    }
  }
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
  reflectionEl.style.transform = __vaultReflectionTransform;
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

window.SourceDemo.bindInitialization(preloadImages('.item__img-inner').then(() => {
  if (window.SourceDemo.disposed) return;
    // Once images are preloaded, remove the 'loading' indicator/class from the body
    document.body.classList.remove('loading');
    init(); // Initialize animations after preloading
}));
