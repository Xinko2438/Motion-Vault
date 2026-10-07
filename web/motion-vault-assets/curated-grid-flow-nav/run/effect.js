(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-grid-flow-nav/source/js/utils.js
  var preloadImages = (items) => {
    return new Promise((resolve) => {
      imagesLoaded(items, { background: true }, resolve);
    });
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-grid-flow-nav/source/js/loader.js
  var Loader = class {
    /**
     * Constructor function of the Loader class
     * @param {HTMLElement} DOM_el - The main DOM element for the loader.
     * @param {NodeList} GalleryItems - The gallery items that will appear next to the loader.
     */
    constructor(DOM_el, galleryItems) {
      // Define object to hold relevant DOM elements for the Loader
      __publicField(this, "DOM", {
        // Main DOM element for the loader
        el: null,
        // Progress element .loader__progress
        progressElement: null,
        // The DOM element to show loading progress
        progressValueElement: null,
        // Images container .loader__img
        imagesContainer: null,
        // The gallery items that will appear next to the loader
        galleryItems: null
      });
      this.DOM.el = DOM_el;
      this.DOM.progressElement = this.DOM.el.querySelector(".loader__progress");
      this.DOM.progressValueElement = this.DOM.el.querySelector(".loader__progress-text");
      this.DOM.imagesContainer = this.DOM.el.querySelector(".loader__img");
      this.DOM.galleryItems = galleryItems;
      this.DOM.imagesContainer.append(...this.DOM.galleryItems);
    }
    /**
     * Function to load all assets and update the loading progress.
     * @param {string} assetsSelector - The selector string to find all assets to load.
     * @returns {Promise} - A promise that resolves when all assets are loaded, or rejects if any asset fails to load.
     */
    loadAssets(assetsSelector) {
      return new Promise((resolve, reject) => {
        const imgLoad = imagesLoaded(document.querySelectorAll(assetsSelector), { background: true });
        let allImagesLoaded = false;
        let allImagesAnimationComplete = false;
        let progress = 0;
        const incrementRate = 100 / 500;
        const intervalId = setInterval(() => {
          if (progress < 100) {
            progress += incrementRate;
            this.DOM.progressValueElement.innerText = Math.round(progress);
          } else {
            if (allImagesLoaded && allImagesAnimationComplete) {
              clearInterval(intervalId);
              gsap.to(this.DOM.progressElement, {
                duration: 0.5,
                opacity: 0
              });
              resolve();
            }
          }
        }, 1);
        gsap.timeline().fromTo(this.DOM.galleryItems, {
          scale: 0,
          opacity: 0
        }, {
          duration: 0.4,
          scale: 1,
          opacity: 1,
          stagger: 2 / this.DOM.galleryItems.length,
          ease: "power4",
          onComplete: () => allImagesAnimationComplete = true
        });
        imgLoad.on("always", (instance) => {
          console.log("all images loaded");
          allImagesLoaded = true;
        });
        imgLoad.on("fail", (instance) => {
          console.log("some images failed");
          reject();
        });
      });
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-grid-flow-nav/source/js/gallery.js
  var Gallery = class {
    /**
        * Constructor for the Gallery class
        * @param {HTMLElement} DOM_el - The main DOM element for the Gallery.
        */
    constructor(DOM_el) {
      // Define object to hold relevant DOM elements for the Gallery
      __publicField(this, "DOM", {
        // The main DOM element for the Gallery
        el: null,
        // NodeList of gallery item elements
        items: null
      });
      __publicField(this, "isCurrent", false);
      this.DOM.el = DOM_el;
      this.DOM.items = [...this.DOM.el.querySelectorAll(".gallery__item")];
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-grid-flow-nav/source/js/navigation.js
  var Navigation = class {
    /**
     * Constructor for the Gallery class
     * @param {HTMLElement} DOM_el - The main DOM element for the Gallery.
     */
    constructor(DOM_el) {
      // Define object to hold relevant DOM elements for the Navigation
      __publicField(this, "DOM", {
        // The main DOM element for the Gallery
        el: null,
        // prev and next elements
        prev: { el: null, arrow: null, galleryItems: [] },
        next: { el: null, arrow: null, galleryItems: [] }
      });
      this.DOM.el = DOM_el;
      this.DOM.prev.el = this.DOM.el.querySelector(".nav__item--prev");
      this.DOM.prev.arrow = this.DOM.prev.el.querySelector(".nav__item-arrow");
      this.DOM.next.el = this.DOM.el.querySelector(".nav__item--next");
      this.DOM.next.arrow = this.DOM.next.el.querySelector(".nav__item-arrow");
    }
    /**
     * Adds gallery items to either the 'next' or 'prev' DOM elements
     * and also updates the 'galleryItems' array of either 'next' or 'prev' in the DOM object.
     * It can accept either a single gallery item or an array of gallery items as input.
     *
     * @param {string} action - Indicates whether to add items to the 'next' or 'prev' DOM element. Expected values: 'next' or 'prev'.
     * @param {HTMLElement | HTMLElement[]} galleryItems - A single gallery item or an array of gallery items to be added. 
     */
    addGalleryItems(action, galleryItems) {
      if (!Array.isArray(galleryItems)) {
        galleryItems = [galleryItems];
      }
      this.DOM[action].el.append(...galleryItems);
      this.DOM[action].galleryItems.push(...galleryItems);
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-grid-flow-nav/source/js/index.js
  var winsize = { width: window.innerWidth, height: window.window.innerHeight };
  var DOM = {};
  DOM.loader = document.querySelector(".loader");
  DOM.galleries = document.querySelectorAll(".gallery");
  DOM.nav = document.querySelector(".nav");
  DOM.frame = document.querySelector(".frame");
  var current = 0;
  var galleriesArr = [];
  [...DOM.galleries].forEach((gallery) => {
    galleriesArr.push(new Gallery(gallery));
  });
  var totalGalleries = galleriesArr.length;
  var loader = new Loader(DOM.loader, galleriesArr[current + 1].DOM.items);
  var navigation = new Navigation(DOM.nav);
  var animationSettings = {
    duration: 1.7,
    itemDelay: 0.08
  };
  var isAnimating = false;
  var setupGalleryAnimation = () => {
    isAnimating = true;
    const parentTimeline = gsap.timeline({
      onComplete: () => isAnimating = false
    });
    loader.DOM.galleryItems.forEach((galleryItem, pos) => {
      const inner = galleryItem.querySelector(".gallery__item-inner");
      const scaleFactor = winsize.height / galleryItem.offsetHeight;
      const flipstate = Flip.getState(galleryItem, { simple: true });
      const childTimeline = gsap.timeline().add(() => {
        navigation.addGalleryItems("next", galleryItem);
        Flip.from(flipstate, {
          duration: animationSettings.duration,
          ease: "power4.inOut"
        });
      }).to(galleryItem, {
        duration: animationSettings.duration / 2,
        ease: "power4.in",
        scale: scaleFactor / 2
      }, 0).to(inner, {
        duration: animationSettings.duration / 2,
        ease: "power4.in",
        scale: 4
      }, 0).to(galleryItem, {
        duration: animationSettings.duration / 2,
        ease: "power4",
        scale: 1
      }).to(inner, {
        duration: animationSettings.duration / 2,
        ease: "power4",
        scale: 1.6
      }, "<");
      parentTimeline.add(childTimeline, pos * animationSettings.itemDelay);
    });
    parentTimeline.addLabel("afterInitialAnimation", loader.DOM.galleryItems.length * animationSettings.itemDelay + animationSettings.duration * 0.3).fromTo([navigation.DOM.next.arrow, navigation.DOM.prev.arrow], {
      transformOrigin: (pos) => pos ? "100% 0%" : "0% 100%",
      scale: 0
    }, {
      duration: 1,
      ease: "power4",
      scale: 1,
      opacity: 1
    }, "afterInitialAnimation").add(() => {
      navigation.addGalleryItems("prev", galleriesArr[totalGalleries - 1].DOM.items);
    }, "afterInitialAnimation").fromTo(galleriesArr[totalGalleries - 1].DOM.items, {
      scale: 0,
      opacity: 0
    }, {
      duration: 0.3,
      ease: "power4",
      stagger: {
        amount: animationSettings.duration - 0.8
      },
      scale: 1,
      opacity: 1
    }, "afterInitialAnimation").add(() => {
      galleriesArr[current].DOM.el.classList.add("gallery--current");
      galleriesArr[current].isCurrent = true;
    }, "afterInitialAnimation-=0.8");
    let currentGalleryItems = galleriesArr[current].DOM.items;
    let innerImages = galleriesArr[current].DOM.items.map((item) => item.querySelector(".gallery__item-inner"));
    parentTimeline.fromTo(currentGalleryItems, {
      opacity: 0,
      scale: 0
    }, {
      duration: animationSettings.duration,
      ease: "power4.inOut",
      stagger: {
        each: animationSettings.itemDelay / 2,
        from: "random"
      },
      opacity: 1,
      scale: 1
    }, "afterInitialAnimation-=0.8").to(DOM.frame, {
      duration: animationSettings.duration,
      ease: "power4.inOut",
      opacity: 1
    }, "afterInitialAnimation-=0.8");
  };
  var navigate = (direction) => {
    if (isAnimating) return;
    isAnimating = true;
    const currentGalleryItems = galleriesArr[current].DOM.items;
    let next = current < totalGalleries - 1 ? current + 1 : totalGalleries - 1;
    let prev = current > 0 ? current - 1 : totalGalleries - 1;
    let newcurrent;
    let newnext;
    let newprev;
    if (direction === "next") {
      newcurrent = current < totalGalleries - 1 ? current + 1 : 0;
      newnext = newcurrent < totalGalleries - 1 ? newcurrent + 1 : 0;
      newprev = current;
    } else {
      newcurrent = current > 0 ? current - 1 : totalGalleries - 1;
      newprev = newcurrent > 0 ? newcurrent - 1 : totalGalleries - 1;
      newnext = current;
    }
    const upcomingGalleryItems = galleriesArr[newcurrent].DOM.items;
    gsap.timeline({
      onComplete: () => {
        current = newcurrent;
        isAnimating = false;
      }
    }).to(navigation.DOM[direction === "next" ? "prev" : "next"].galleryItems, {
      duration: 0.2,
      ease: "power2.in",
      scale: 0,
      opacity: 0,
      onComplete: () => {
        gsap.set(navigation.DOM[[direction === "next" ? "prev" : "next"]].galleryItems, {
          scale: 1,
          opacity: 1
        });
        DOM.galleries[direction === "next" ? prev : next].append(...navigation.DOM[[direction === "next" ? "prev" : "next"]].galleryItems);
      }
    }, 0).add(() => {
      const flipCurrentState = Flip.getState(currentGalleryItems, { simple: true });
      const flipUpcomingState = Flip.getState(upcomingGalleryItems, { simple: true });
      navigation.DOM[direction === "next" ? "prev" : "next"].galleryItems = [];
      navigation.addGalleryItems(direction === "next" ? "prev" : "next", currentGalleryItems);
      Flip.from(flipCurrentState, {
        duration: animationSettings.duration * 0.6,
        ease: "power4",
        absolute: true,
        stagger: {
          each: animationSettings.itemDelay / 2,
          from: direction === "next" ? "start" : "end"
        }
      });
      galleriesArr[newcurrent].DOM.el.classList.add("gallery--current");
      galleriesArr[current].DOM.el.classList.remove("gallery--current");
      galleriesArr[newcurrent].isCurrent = true;
      galleriesArr[current].isCurrent = false;
      DOM.galleries[newcurrent].append(...upcomingGalleryItems);
      navigation.DOM[direction].galleryItems = [];
      navigation.addGalleryItems(direction, galleriesArr[direction === "next" ? newnext : newprev].DOM.items);
      Flip.from(flipUpcomingState, {
        delay: 0.15,
        absolute: true,
        spin: true,
        duration: animationSettings.duration * 0.6,
        ease: "power4",
        stagger: {
          each: animationSettings.itemDelay / 2,
          from: "end"
        }
      });
    }).to([navigation.DOM["next"].arrow, navigation.DOM["prev"].arrow], {
      duration: 0.2,
      ease: "power1.in",
      scale: 0,
      opacity: 0
    }, 0).addLabel("afterInitialAnimation", currentGalleryItems.length * animationSettings.itemDelay / 2 + animationSettings.duration * 0.15).fromTo(galleriesArr[direction === "next" ? newnext : newprev].DOM.items, {
      scale: 0,
      opacity: 0
    }, {
      duration: 0.3,
      ease: "power4",
      stagger: {
        amount: animationSettings.duration * 0.6 - 0.6
      },
      scale: 1,
      opacity: 1
    }, "afterInitialAnimation").to([navigation.DOM["next"].arrow, navigation.DOM["prev"].arrow], {
      duration: 1,
      ease: "power4",
      scale: 1,
      opacity: 1
    }, "afterInitialAnimation");
  };
  navigation.DOM.next.el.addEventListener("click", () => navigate("next"));
  navigation.DOM.prev.el.addEventListener("click", () => navigate("prev"));
  galleriesArr.flatMap((gallery) => gallery.DOM.items.map((item) => ({ item, gallery }))).forEach(({ item, gallery }) => {
    item.addEventListener("mouseenter", () => {
      if (!gallery.isCurrent || isAnimating) return;
      const inner = item.querySelector(".gallery__item-inner");
      gsap.killTweensOf([item, inner]);
      gsap.timeline({
        defaults: { duration: 0.8, ease: "power4" }
      }).fromTo(item, {
        filter: "contrast(100%) brightness(100%) hue-rotate(0deg)"
      }, {
        filter: "contrast(120%) brightness(800%) hue-rotate(180deg)",
        scale: 1.2
      }, 0).to(inner, {
        scale: 1
      }, 0);
    });
    item.addEventListener("mouseleave", () => {
      if (!gallery.isCurrent || isAnimating) return;
      const inner = item.querySelector(".gallery__item-inner");
      gsap.killTweensOf([item, inner]);
      gsap.timeline({
        defaults: { duration: 0.5, ease: "power4" }
      }).to(item, {
        scale: 1,
        filter: "contrast(100%) brightness(100%) hue-rotate(0deg)"
      }, 0).to(inner, {
        scale: 1.6
      }, 0);
    });
  });
  preloadImages(galleriesArr[current + 1].DOM.items).then(() => {
    loader.loadAssets(".gallery__item-inner").then(setupGalleryAnimation);
  });
})();
