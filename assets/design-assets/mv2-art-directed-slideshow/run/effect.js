(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // source/js/demo1/slideshow.js
  var NEXT = 1;
  var PREV = -1;
  var Slideshow = class {
    /**
     * Slideshow constructor.
     * Initializes the slideshow and sets up the DOM elements.
     * @param {HTMLElement} DOM_el - The main element holding all the slides.
     */
    constructor(DOM_el) {
      /**
       * Holds references to relevant DOM elements.
       * @type {Object}
       */
      __publicField(this, "DOM", {
        el: null,
        // Main slideshow container
        slides: null,
        // Individual slides
        slidesInner: null
        // Inner content of slides (usually images)
      });
      /**
       * Index of the current slide being displayed.
       * @type {number}
       */
      __publicField(this, "current", 0);
      /**
       * Total number of slides.
       * @type {number}
       */
      __publicField(this, "slidesTotal", 0);
      /**
       * Flag to indicate if an animation is running.
       * @type {boolean}
       */
      __publicField(this, "isAnimating", false);
      this.DOM.el = DOM_el;
      this.DOM.slides = [...this.DOM.el.querySelectorAll(".slide")];
      this.DOM.slidesInner = this.DOM.slides.map(
        (item) => item.querySelector(".slide__img")
      );
      this.DOM.slides[this.current].classList.add("slide--current");
      this.slidesTotal = this.DOM.slides.length;
      __vaultWatchReducedMotion(() => this.__vaultSettleReducedSlide());
    }
    // All variants finish with one full, undistorted image. Transition covers
    // have no persistent semantic content and return to their authored CSS state.
    __vaultSettleReducedSlide() {
      this.__vaultTimeline?.kill();
      this.tl?.kill();
      const decorations = this.DOM.deco ? this.DOM.deco.nodeType ? [this.DOM.deco] : [...this.DOM.deco] : [];
      const targets = [...this.DOM.slides, ...this.DOM.slidesInner, ...decorations];
      gsap.killTweensOf(targets);
      gsap.set(this.DOM.slides, { clearProps: "transform,transformOrigin,opacity,visibility,zIndex" });
      gsap.set(this.DOM.slidesInner, { clearProps: "transform,transformOrigin,filter" });
      if (decorations.length) gsap.set(decorations, { clearProps: "transform,opacity,visibility" });
      this.DOM.slides.forEach((slide, index) => slide.classList.toggle("slide--current", index === this.current));
      this.isAnimating = false;
    }
    /**
     * Navigate to the next slide.
     * @returns {void}
     */
    next() {
      this.navigate(NEXT);
    }
    /**
     * Navigate to the previous slide.
     * @returns {void}
     */
    prev() {
      this.navigate(PREV);
    }
    /**
     * Navigate through slides.
     * @param {number} direction - The direction to navigate. 1 for next and -1 for previous.
     * @returns {boolean} - Return false if the animation is currently running.
     */
    navigate(direction) {
      if (this.isAnimating) return false;
      this.isAnimating = true;
      const previous = this.current;
      this.current = direction === 1 ? this.current < this.slidesTotal - 1 ? ++this.current : 0 : this.current > 0 ? --this.current : this.slidesTotal - 1;
      const currentSlide = this.DOM.slides[previous];
      const currentInner = this.DOM.slidesInner[previous];
      const upcomingSlide = this.DOM.slides[this.current];
      const upcomingInner = this.DOM.slidesInner[this.current];
      if (window.SourceDemo.reducedMotion) {
        this.__vaultSettleReducedSlide();
        return;
      }
      this.__vaultTimeline = gsap.timeline({
        defaults: {
          duration: 1.5,
          ease: "power4.inOut"
        },
        onStart: () => {
          this.DOM.slides[this.current].classList.add("slide--current");
        },
        onComplete: () => {
          this.DOM.slides[previous].classList.remove("slide--current");
          this.isAnimating = false;
        }
      }).addLabel("start", 0).to(
        currentSlide,
        {
          yPercent: -direction * 100
        },
        "start"
      ).to(
        currentInner,
        {
          yPercent: direction * 30
        },
        "start"
      ).fromTo(
        upcomingSlide,
        {
          yPercent: direction * 100
        },
        {
          yPercent: 0
        },
        "start"
      ).fromTo(
        upcomingInner,
        {
          yPercent: -direction * 30
          //yPercent: 0
        },
        {
          yPercent: 0
        },
        "start"
      );
    }
  };
  function __vaultWatchReducedMotion(settle) {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => {
      if (media.matches && !window.SourceDemo.disposed) settle();
    };
    media.addEventListener("change", changed);
    window.SourceDemo.register({ dispose() {
      media.removeEventListener("change", changed);
    } });
    changed();
  }

  // source/js/demo1/index.js
  var slides = document.querySelector(".slides");
  var slideshow = new Slideshow(slides);
  document.querySelector(".slides-nav__item--prev").addEventListener("click", () => slideshow.prev());
  document.querySelector(".slides-nav__item--next").addEventListener("click", () => slideshow.next());
  Observer.create({
    type: "wheel,touch,pointer",
    onDown: () => slideshow.prev(),
    onUp: () => slideshow.next(),
    // invert the mouse wheel delta
    wheelSpeed: -1,
    tolerance: 10
  });
  window.SourceDemo.bindInitialization(preloadImages(".slide__img").then(
    () => !window.SourceDemo.disposed && document.body.classList.remove("loading")
  ));
})();
