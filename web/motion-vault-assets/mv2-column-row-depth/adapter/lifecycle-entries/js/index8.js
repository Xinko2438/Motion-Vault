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
		lerp: 0.15, // Lower values create a smoother scroll effect
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
	// Set perspective
	gsap.set([grid, mergedItems.map(item => item.element)], {
		perspective: 600
	});

	// Define GSAP timeline with ScrollTrigger
	gsap.timeline({
		defaults: { ease: 'power2' },
		scrollTrigger: {
			trigger: grid,
			start: 'clamp(top bottom)',
			end: 'clamp(bottom top)',
			scrub: true
		}
	})
	.to(columns[0], {
		startAt: {transformOrigin: '100% 50%'},
		rotationY: 8,
		z: 20
	}, 0)
	.to(columns[1], {
		startAt: {transformOrigin: '100% 50%'},
		rotationY: 4
	}, 0)
	.to(columns[2], {
		startAt: {transformOrigin: '0% 50%'},
		rotationY: -3
	}, 0)
	.to(columns[3], {
		startAt: {transformOrigin: '0% 50%'},
		rotationY: -6,
		z: 20
	}, 0)
	
	mergedItems.forEach(item => {
		gsap.fromTo(item.wrapper, {
			opacity: 0,
			rotationX: -90,
			transformOrigin: '50% 0%'
		}, {
			scrollTrigger: {
				trigger: item.element,
				start: 'top bottom',
				end: 'clamp(center center-=25%)',
				scrub: true
			},
			opacity: 1,
			rotationX: 0
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
