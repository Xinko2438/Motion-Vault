
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
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { preloadImages } from "./utils.js"

gsap.registerPlugin(ScrollTrigger)

class StickyGridScroll {
    constructor() {
        this.getElements()

        this.initContent()
        this.groupItemsByColumn()

        this.addParallaxOnScroll()
        this.animateTitleOnScroll()
        this.animateGridOnScroll()
    }

    /**
     * Select and store the DOM elements needed for the animation
     * @returns {void}
     */
    getElements() {
        this.block = document.querySelector(".block--main")

        if (this.block) {
            this.wrapper = this.block.querySelector(".block__wrapper")
            this.content = this.block.querySelector(".content")
            this.title = this.block.querySelector(".content__title")
            this.description = this.block.querySelector(".content__description")
            this.button = this.block.querySelector(".content__button")
            this.grid = this.block.querySelector(".gallery__grid")
            this.items = this.block.querySelectorAll(".gallery__item")
        }
    }

    /**
     * Initializes the visual state of the content before animations
     * @returns {void}
     */
    initContent() {
        if (this.description && this.button) {
            // Hide description and button
            gsap.set([this.description, this.button], { opacity: 0, pointerEvents: "none" })
        }

        if (this.content && this.title) {
            // Calculate how many pixels are needed to vertically center the title inside its container
            const dy = (this.content.offsetHeight - this.title.offsetHeight) / 2

            // Convert this pixel offset into a percentage of the container height
            this.titleOffsetY = (dy / this.content.offsetHeight) * 100

            // Apply the vertical positioning using percent-based transform
            gsap.set(this.title, { yPercent: this.titleOffsetY })
        }
    }

    /**
     * Group grid items into a fixed number of columns (default: 3)
     * @returns {void}
     */
    groupItemsByColumn() {
        this.numColumns = 3

        // Initialize an array for each column
        this.columns = Array.from({ length: this.numColumns }, () => [])

        // Distribute grid items into column buckets
        this.items.forEach((item, index) => {
            this.columns[index % this.numColumns].push(item)
        })
    }

    /**
     * Apply a parallax effect to the wrapper when scrolling
     * @returns {void}
     */
    addParallaxOnScroll() {
        if (!this.block || !this.wrapper) {
            return
        }

        // Create a scroll-driven timeline
        // Animate the wrapper vertically based on scroll position
        gsap.from(this.wrapper, {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: this.block,
                start: "top bottom", // Start when top of block hits bottom of viewport
                end: "top top", // End when top of block hits top of viewport
                scrub: true, // Smooth animation based on scroll position
            },
        })
    }

    /**
     * Animate the title element when the block scrolls into view
     * @returns {void}
     */
    animateTitleOnScroll() {
        if (!this.block || !this.title) {
            return
        }

        // Create a scroll-driven timeline
        // Animate the title's opacity when the block reaches 57% of the viewport height
        gsap.from(this.title, {
            opacity: 0,
            duration: 0.7,
            ease: "power1.out",
            scrollTrigger: {
                trigger: this.block,
                start: "top 57%", // Start when top of block hits 57% of viewport
                toggleActions: "play none none reset", // Play on enter, reset on leave back
            },
        })
    }

    /**
     * Create a GSAP timeline to reveal the grid items with vertical animation
     * Each column moves from top or bottom, with staggered timing
     *
     * @param {Array} columns - Array of columns, each containing DOM elements of the grid
     * @returns {gsap.core.Timeline} - The timeline for the grid reveal animation
     */
    gridRevealTimeline(columns = this.columns) {
        // Create a timeline
        const timeline = gsap.timeline()

        const wh = window.innerHeight
        // Calculate the distance to start grid fully outside the viewport (above or below)
        const dy = wh - (wh - this.grid.offsetHeight) / 2

        columns.forEach((column, colIndex) => {
            // Determine the direction: columns with even index move from top, odd from bottom
            const fromTop = colIndex % 2 === 0

            // Animate all items in the column
            timeline.from(
                column,
                {
                    y: dy * (fromTop ? -1 : 1), // Start above or below the viewport based on column index
                    stagger: {
                        each: 0.06, // Stagger the animation within the column: 60ms between each item's animation
                        from: fromTop ? "end" : "start", // Animate from bottom if moving down, top if moving up
                    },
                    ease: "power1.inOut",
                },
                "grid-reveal", // Label to synchronize animations across columns
            )
        })

        return timeline
    }

    /**
     * Create a GSAP timeline to zoom the grid
     * Lateral columns move horizontally, central column items move vertically
     *
     * @param {Array} columns - Array of columns, each containing DOM elements of the grid
     * @returns {gsap.core.Timeline} - The timeline for the grid zoom animation
     */
    gridZoomTimeline(columns = this.columns) {
        // Create a timeline with default duration and easing for all tweens
        const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } })

        // Zoom the entire grid
        timeline.to(this.grid, { scale: 2.05 })

        // Move lateral columns horizontally
        timeline.to(columns[0], { xPercent: -40 }, "<") // Left column moves left
        timeline.to(columns[2], { xPercent: 40 }, "<") // Right column moves right

        // Animate central column vertically
        timeline.to(
            columns[1],
            {
                // Items above the midpoint move up, below move down
                yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
                duration: 0.5,
                ease: "power1.inOut",
            },
            "-=0.5", // Start slightly before previous animation ends for overlap
        )

        return timeline
    }

    /**
     * Toggle the visibility of content elements (title, description, button) with animations
     *
     * @param {boolean} isVisible - Whether the content should be visible
     * @returns {void}
     */
    toggleContent(isVisible = true) {
        if (!this.title || !this.description || !this.button) {
            return
        }

        // Create a timeline
        gsap.timeline({ defaults: { overwrite: true } })
            // Animate the title's vertical position
            .to(this.title, {
                yPercent: isVisible ? 0 : this.titleOffsetY, // Slide up or return to initial offset
                duration: 0.7,
                ease: "power2.inOut",
            })
            // Animate description and button opacity and pointer events
            .to(
                [this.description, this.button],
                {
                    opacity: isVisible ? 1 : 0,
                    duration: 0.4,
                    ease: `power1.${isVisible ? "inOut" : "out"}`,
                    pointerEvents: isVisible ? "all" : "none",
                },
                isVisible ? "-=90%" : "<", // Overlap with previous tween when showing
            )
    }

    /**
     * Animate the grid based on scroll position
     * Combines grid reveal, grid zoom, and content toggle in a scroll-driven timeline
     *
     * @returns {void}
     */
    animateGridOnScroll() {
        // Create a scroll-driven timeline
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: this.block,
                start: "top 25%", // Start when top of block hits 25% of viewport
                end: "bottom bottom", // End when bottom of block hits bottom of viewport
                scrub: true, // Smooth animation based on scroll position
            },
        })

        timeline
            // Add grid reveal animation
            .add(this.gridRevealTimeline())

            // Add grid zoom animation, overlapping previous animation by 0.6 seconds
            .add(this.gridZoomTimeline(), "-=0.6")

            // Toggle content visibility based on scroll direction
            // Overlap with previous animation by 0.32 seconds
            .add(() => __vaultEditorial.run(() => this.toggleContent(timeline.scrollTrigger.direction === 1)), "-=0.32")
    }
}

// Initialize smooth scrolling using Lenis and synchronize it with GSAP ScrollTrigger
function initSmoothScrolling() {
    // Create a new Lenis instance for smooth scrolling
    const lenis = window.SourceDemo.createLenis(Lenis,{
        lerp: 0.08,
        wheelMultiplier: 1.4,
    })

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on("scroll", ScrollTrigger.update)

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    const ticker = window.SourceDemo.addTicker(gsap,(time) => {
        lenis.raf(time * 1000) // Convert time from seconds to milliseconds
    })

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0)
    return () => {
        window.SourceDemo.removeTicker(gsap, ticker)
        lenis.off("scroll", ScrollTrigger.update)
        window.SourceDemo.destroyLenis(lenis)
    }
}

// Preload images then initialize everything
window.SourceDemo.bindInitialization(preloadImages().then(() => {
  if (window.SourceDemo.disposed) return;
    document.body.classList.remove("loading") // Remove loading state from body
    __vaultEditorial = __vaultCreateEditorialController({
        id: "mv2-sticky-grid-story", gsap,
        styleSelector: '.block__wrapper, .content, .content__title, .content__description, .content__button, .gallery__grid, .gallery__item',
        startMotion() {
            const cleanup = initSmoothScrolling()
            new StickyGridScroll() // The original normal-mode sequence remains unchanged.
            return cleanup
        },
    })
    __vaultEditorial.start()
}));

import {gsap as __vaultLifecycleGsap} from "gsap"; window.gsap = __vaultLifecycleGsap;

window.ScrollTrigger = ScrollTrigger;

window.gsap = gsap;

window.ScrollTrigger = ScrollTrigger;
