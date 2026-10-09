// Import the necessary function for preloading images
import { preloadImages, getGrid } from './utils.js';

// Define a variable that will store the Lenis smooth scrolling object
let lenis;
let __vaultLayoutFrame = null;
let __vaultLayoutScrollFn = null;

// Element with class .columns
const grid = document.querySelector('.columns');
// All the columns class .column
const columns = [...grid.querySelectorAll('.column')];
// Map each column to its array of items and keep a reference of the image, its wrapper and the column
const items = columns.map((column, pos) => {
	return [...column.querySelectorAll('.column__item')].map(item => ({
		element: item,
		column: pos,
		wrapper: item.querySelector('.column__item-imgwrap'),
		image: item.querySelector('.column__item-img')
	}));
});
// All itemms
const mergedItems = items.flat();

// Function to initialize Lenis for smooth scrolling
const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = window.SourceDemo.createLenis(Lenis,{
		lerp: 0.2, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	__vaultLayoutScrollFn = (time) => {
        __vaultLayoutFrame = null;
        if (__vaultLayoutStopped || __vaultLayoutDisposed || window.SourceDemo.disposed || window.SourceDemo.reducedMotion || !lenis) return;
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		__vaultQueueLayoutFrame(); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	__vaultQueueLayoutFrame();
};

const scroll = () => {
	const gridObj = getGrid(mergedItems.map(item => item.element));
	
	const rowMapping = {
		even: {
			skewX: 10,
			xPercent: 2, // hardcoding here what seems to be the perfect value for the effect...
			transformOrigin: '0% 50%'
		},
		odd: {
			skewX: -10,
			xPercent: -2,
			transformOrigin: '100% 50%'
		}
	};
	
	['even', 'odd'].forEach(type => {
		gridObj.rows(type).flat().forEach(row => {
			gsap
			.timeline({
				defaults: {ease: 'none'},
				scrollTrigger: {
					trigger: row,
					start: 'top bottom',
					end: 'clamp(bottom top)',
					scrub: true
				}
			})
			.fromTo(row.querySelector('.column__item-imgwrap'), {
				transformOrigin: rowMapping[type].transformOrigin,
				opacity: 0.1,
				xPercent: rowMapping[type].xPercent,
				skewX: rowMapping[type].skewX
			}, {
				opacity: 1,
				xPercent: 0,
				skewX: 0
			}, 0)
			.fromTo(row.querySelector('.column__item-img'), {
				scaleY: 1.2
			}, {
				scaleY: 1
			}, 0)
		});
	});
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body

// Source-specific reversible motion policy; unrelated timelines and input are untouched.
let __vaultLayoutContext = null;
let __vaultLayoutInitialized = false;
let __vaultLayoutStopped = window.SourceDemo.inspect().paused;
let __vaultLayoutDisposed = false;
let __vaultLayoutMode = null;
const __vaultLayoutPreference = matchMedia('(prefers-reduced-motion: reduce)');

function __vaultApplyStaticLayout(reduced) {
  document.documentElement.classList.toggle('vault-static-scroll-layout', reduced);

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

window.SourceDemo.bindInitialization(preloadImages('.column__item-img').then(() => {
  if (window.SourceDemo.disposed) return;
	__vaultStartScrollLayout();
	document.body.classList.remove('loading');
}));
