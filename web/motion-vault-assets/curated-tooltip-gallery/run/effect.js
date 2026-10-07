(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // globals:imagesloaded
  var require_imagesloaded = __commonJS({
    "globals:imagesloaded"(exports, module) {
      module.exports = window.imagesLoaded;
    }
  });

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-tooltip-gallery/source/src/js/utils.js
  var imagesLoaded = require_imagesloaded();
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // globals:gsap
  var gsap = window.gsap;
  var gsap_default = window.gsap;

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-tooltip-gallery/source/src/js/tooltip.js
  var Tooltip = class {
    /**
     * Constructor.
     * @param {Element} DOM_el - main element (.tooltip)
     */
    constructor(DOM_el) {
      // DOM elements
      __publicField(this, "DOM", {
        // the main element (.tooltip)
        el: null,
        // .tooltip__img-wrap
        wrap: null,
        // tooltip images (.tooltip__img)
        images: null,
        // tooltiop text (.tooltip__text)
        text: null
      });
      // current tooltip image
      __publicField(this, "current", 0);
      // total images
      __publicField(this, "imagesTotal", -1);
      // interval of time between each image display (slideshow)
      __publicField(this, "slideshowInterval", 0.4);
      this.DOM.el = DOM_el;
      this.DOM.wrap = this.DOM.el.querySelector(".tooltip__img-wrap");
      this.DOM.images = [...this.DOM.el.querySelectorAll(".tooltip__img")];
      this.imagesTotal = this.DOM.images.length;
      this.DOM.text = this.DOM.el.querySelector(".tooltip__text");
      this.DOM.images[this.current].classList.add("tooltip__img--current");
      this.calcRect();
      window.addEventListener("resize", () => this.calcRect());
    }
    /**
     * Get positions
     */
    calcRect() {
      this.rect = this.DOM.el.getBoundingClientRect();
    }
    /**
     * Starts the auto slideshow
     */
    startSlideshow() {
      this.showNextImage();
    }
    /**
     * change current image
     */
    showNextImage() {
      this.slideshow = gsap.delayedCall(this.slideshowInterval, () => {
        this.DOM.images[this.current].classList.remove("tooltip__img--current");
        this.current = this.current < this.imagesTotal - 1 ? ++this.current : 0;
        this.DOM.images[this.current].classList.add("tooltip__img--current");
        this.showNextImage();
      });
    }
    /**
     * Stops the auto slideshow
     */
    stopSlideshow() {
      if (this.slideshow) {
        this.slideshow.kill();
      }
    }
    /**
     * resets and update current to the original value 
     */
    reset() {
      this.DOM.images[this.current].classList.remove("tooltip__img--current");
      this.current = 0;
      this.DOM.images[this.current].classList.add("tooltip__img--current");
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-tooltip-gallery/source/src/js/linesController.js
  var LinesController = class {
    /**
     * Constructor.
     * @param {Element} DOM_elems - main element (.line)
     */
    constructor(DOM_elems) {
      // DOM elements
      __publicField(this, "DOM", {
        // all the 4 lines (.line)
        lines: null
      });
      this.DOM.lines = DOM_elems;
      this.DOM.linesVertical = this.DOM.lines.filter((line) => line.classList.contains("line--v"));
      this.DOM.linesHorizontal = this.DOM.lines.filter((line) => line.classList.contains("line--h"));
    }
  };

  // globals:gsap/Flip
  var Flip = window.Flip;
  var Flip_default = window.Flip;

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-tooltip-gallery/source/src/js/index.js
  gsap.registerPlugin(Flip);
  var content = document.querySelector(".content");
  var link = document.querySelector("a[data-tooltip]");
  var tooltip = new Tooltip(document.querySelector("aside.tooltip"));
  var lineController = new LinesController([...document.querySelectorAll(".line")]);
  var gallery = document.querySelector(".gallery");
  var galleryTitle = document.querySelector(".gallery__title > .oh__inner");
  var pretitle = {
    back: document.querySelector(".content__pretitle > .back > .oh__inner"),
    title: document.querySelector(".content__pretitle > .oh:not(.back) > .oh__inner")
  };
  var nav = document.querySelector(".nav");
  var navImages = [...nav.querySelectorAll(".nav__img")];
  var entertl;
  var leavetl;
  var clicktl;
  var zoomintl;
  var zoomouttl;
  var backtl;
  var isGalleryOpen = false;
  var isFullscreen = false;
  var winsize = { width: window.innerWidth, height: window.innerHeight };
  var isAnimating = false;
  var toggleZoom = (_) => isFullscreen ? zoomOut() : zoomIn();
  var zoomIn = () => {
    if (isAnimating) return;
    isAnimating = true;
    const flipstateNav = Flip.getState(navImages, { simple: true });
    const flipstateGallery = Flip.getState(tooltip.DOM.images[tooltip.current], { simple: true });
    gallery.classList.add("gallery--fullscreen");
    nav.classList.add("nav--fullscreen");
    const imageRect = tooltip.DOM.images[tooltip.current].getBoundingClientRect();
    const linePos = {
      // first and second horizontal lines y translations
      horizontal: [imageRect.top, -winsize.height + (imageRect.top + tooltip.DOM.images[tooltip.current].offsetHeight)],
      // first and second vertical lines x translations
      vertical: [imageRect.left, -winsize.width + (imageRect.left + tooltip.DOM.images[tooltip.current].offsetWidth)]
    };
    zoomintl = gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: "power4"
      },
      onStart: () => isFullscreen = true,
      onComplete: () => isAnimating = false
    }).addLabel("start", 0).add(() => {
      const flipOpts = {
        duration: zoomintl.vars.defaults.duration,
        ease: zoomintl.vars.defaults.ease,
        scale: true
      };
      Flip.from(flipstateNav, flipOpts);
      Flip.from(flipstateGallery, flipOpts);
    }, "start").to(lineController.DOM.linesHorizontal[0], {
      y: linePos.horizontal[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesHorizontal[1], {
      y: linePos.horizontal[1],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[0], {
      x: linePos.vertical[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[1], {
      x: linePos.vertical[1],
      opacity: 1
    }, "start");
  };
  var zoomOut = () => {
    if (isAnimating) return;
    isAnimating = true;
    const flipstateNav = Flip.getState(navImages, { simple: true });
    const flipstateGallery = Flip.getState(tooltip.DOM.images[tooltip.current], { simple: true });
    gallery.classList.remove("gallery--fullscreen");
    nav.classList.remove("nav--fullscreen");
    const galleryRect = gallery.getBoundingClientRect();
    const linePos = {
      // first and second horizontal lines y translations
      horizontal: [galleryRect.top, -winsize.height + (galleryRect.top + gallery.offsetHeight)],
      // first and second vertical lines x translations
      vertical: [galleryRect.left, -winsize.width + (galleryRect.left + gallery.offsetWidth)]
    };
    zoomouttl = gsap.timeline({
      defaults: {
        duration: 0.7,
        ease: "power4"
      },
      onStart: () => isFullscreen = false,
      onComplete: () => isAnimating = false
    }).addLabel("start", 0).add(() => {
      const flipOpts = {
        duration: zoomouttl.vars.defaults.duration,
        ease: zoomouttl.vars.defaults.ease,
        scale: true
      };
      Flip.from(flipstateNav, flipOpts);
      Flip.from(flipstateGallery, flipOpts);
    }, "start").to(lineController.DOM.linesHorizontal[0], {
      y: linePos.horizontal[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesHorizontal[1], {
      y: linePos.horizontal[1],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[0], {
      x: linePos.vertical[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[1], {
      x: linePos.vertical[1],
      opacity: 1
    }, "start");
  };
  link.addEventListener("mouseenter", () => {
    if (isGalleryOpen) return;
    if (leavetl) {
      leavetl.kill();
    }
    const linePos = {
      // first and second horizontal lines y translations
      horizontal: [tooltip.rect.top, -winsize.height + (tooltip.rect.top + tooltip.DOM.images[tooltip.current].offsetHeight)],
      // first and second vertical lines x translations
      vertical: [tooltip.rect.left, -winsize.width + (tooltip.rect.left + tooltip.DOM.images[tooltip.current].offsetWidth)]
    };
    entertl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power4.inOut"
      }
    }).addLabel("start", 0).to(lineController.DOM.linesHorizontal[0], {
      startAt: {
        y: linePos.horizontal[0] - 100,
        opacity: 0
      },
      y: linePos.horizontal[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesHorizontal[1], {
      startAt: {
        y: linePos.horizontal[1] + 100,
        opacity: 0
      },
      y: linePos.horizontal[1],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[0], {
      startAt: {
        x: linePos.vertical[0] - 100,
        opacity: 0
      },
      x: linePos.vertical[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[1], {
      startAt: {
        x: linePos.vertical[1] + 100,
        opacity: 0
      },
      x: linePos.vertical[1],
      opacity: 1
    }, "start").to(tooltip.DOM.el, {
      opacity: 1
    }, "start+=0.2").add(() => {
      tooltip.startSlideshow();
    }, "start+=0.7");
  });
  link.addEventListener("mouseleave", () => {
    if (isGalleryOpen) return;
    if (entertl) {
      entertl.kill();
    }
    leavetl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power4.inOut"
      },
      onStart: () => tooltip.stopSlideshow(),
      onComplete: () => tooltip.reset()
    }).addLabel("start", 0).to(tooltip.DOM.el, {
      duration: 0.6,
      opacity: 0
    }, "start").to(lineController.DOM.lines, {
      x: 0,
      y: 0,
      opacity: 0
    }, "start");
  });
  link.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    isGalleryOpen = true;
    if (entertl) {
      entertl.kill();
    }
    if (leavetl) {
      leavetl.kill();
    }
    tooltip.stopSlideshow();
    const galleryRect = gallery.getBoundingClientRect();
    const linePos = {
      // first and second horizontal lines y translations
      horizontal: [galleryRect.top, -winsize.height + (galleryRect.top + gallery.offsetHeight)],
      // first and second vertical lines x translations
      vertical: [galleryRect.left, -winsize.width + (galleryRect.left + gallery.offsetWidth)]
    };
    clicktl = gsap.timeline({
      onStart: () => {
        content.classList.add("content--open");
        gsap.set(navImages, { opacity: 0 });
        const navCurrent = navImages.find((img) => img.classList.contains("nav__img--selected"));
        if (navCurrent) {
          navCurrent.classList.remove("nav__img--selected");
        }
        navImages[tooltip.current].classList.add("nav__img--selected");
      },
      onComplete: () => isAnimating = false,
      defaults: {
        duration: 0.7,
        ease: "power4"
      }
    }).addLabel("start", 0).to(lineController.DOM.linesHorizontal[0], {
      y: linePos.horizontal[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesHorizontal[1], {
      y: linePos.horizontal[1],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[0], {
      x: linePos.vertical[0],
      opacity: 1
    }, "start").to(lineController.DOM.linesVertical[1], {
      x: linePos.vertical[1],
      opacity: 1
    }, "start").add(() => {
      const flipstate = Flip.getState(tooltip.DOM.images[tooltip.current], { simple: true });
      gallery.prepend(tooltip.DOM.images[tooltip.current]);
      const flipOpts = {
        duration: clicktl.vars.defaults.duration,
        ease: clicktl.vars.defaults.ease,
        scale: true
      };
      Flip.from(flipstate, flipOpts);
      tooltip.DOM.images[tooltip.current].addEventListener("click", toggleZoom);
    }, "start").to(tooltip.DOM.el, {
      duration: 0.4,
      opacity: 0
    }, "start").to(navImages, {
      startAt: { xPercent: 50 },
      opacity: 1,
      xPercent: 0,
      stagger: 0.06
    }, "start").to(galleryTitle, {
      y: 0
    }, "start").to(pretitle.back, {
      y: 0
    }, "start").to(pretitle.title, {
      y: "-100%"
    }, "start");
  });
  pretitle.back.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    tooltip.DOM.images[tooltip.current].removeEventListener("click", toggleZoom);
    isGalleryOpen = false;
    const linePos = {
      // first and second horizontal lines y translations
      horizontal: [winsize.height, -winsize.height],
      // first and second vertical lines x translations
      vertical: [winsize.width, -winsize.width]
    };
    backtl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
      },
      defaults: {
        duration: 1,
        ease: "power4.inOut"
      }
    }).addLabel("start", 0).to(navImages, {
      duration: 0.5,
      opacity: 0,
      xPercent: 150,
      onComplete: () => content.classList.remove("content--open")
    }, "start+=0.15").to(pretitle.back, {
      y: "100%"
    }, "start").to(pretitle.title, {
      y: 0
    }, "start").to(galleryTitle, {
      y: "100%"
    }, "start").to(lineController.DOM.linesHorizontal[0], {
      y: linePos.horizontal[0]
    }, "start").to(lineController.DOM.linesHorizontal[1], {
      y: linePos.horizontal[1]
    }, "start").to(lineController.DOM.linesVertical[0], {
      x: linePos.vertical[0]
    }, "start").to(lineController.DOM.linesVertical[1], {
      x: linePos.vertical[1]
    }, "start").to(tooltip.DOM.images[tooltip.current], {
      duration: 0.85,
      //ease: 'expo',
      scale: 0,
      opacity: 0,
      onComplete: () => {
        tooltip.DOM.wrap.prepend(tooltip.DOM.images[tooltip.current]);
        gsap.set(tooltip.DOM.images[tooltip.current], { scale: 1, opacity: 1 });
      }
    }, "start");
  });
  window.addEventListener("resize", () => {
    winsize = { width: window.innerWidth, height: window.innerHeight };
    if (!isGalleryOpen || isFullscreen) return;
    const galleryRect = gallery.getBoundingClientRect();
    const linePos = {
      // first and second horizontal lines y translations
      horizontal: [galleryRect.top, -winsize.height + (galleryRect.top + gallery.offsetHeight)],
      // first and second vertical lines x translations
      vertical: [galleryRect.left, -winsize.width + (galleryRect.left + gallery.offsetWidth)]
    };
    gsap.set(lineController.DOM.linesHorizontal[0], { y: linePos.horizontal[0] });
    gsap.set(lineController.DOM.linesHorizontal[1], { y: linePos.horizontal[1] });
    gsap.set(lineController.DOM.linesVertical[0], { x: linePos.vertical[0] });
    gsap.set(lineController.DOM.linesVertical[1], { x: linePos.vertical[1] });
  });
  preloadImages(".tooltip__img-inner, nav__img-inner").then(() => document.body.classList.remove("loading"));
})();
