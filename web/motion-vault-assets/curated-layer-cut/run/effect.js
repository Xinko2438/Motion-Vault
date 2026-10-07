(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-layer-cut/source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-layer-cut/source/js/item.js
  var Item = class {
    /**
     * Constructor for the Item class. Initializes the instance, sets up DOM references, and binds events.
     * @param {HTMLElement} DOM_el - The main DOM element for the Item, expected to have a child with class 'layers__item-img'.
     */
    constructor(DOM_el) {
      // Class property initialization with default values.
      // The DOM property holds references to the main and inner elements of the Item component.
      __publicField(this, "DOM", {
        el: null,
        // Holds the reference to the main DOM element with class 'layers__item'.
        inner: null
        // Holds the reference to the inner DOM element with class 'layers__item-img'.
      });
      this.DOM.el = DOM_el;
      this.DOM.inner = this.DOM.el.querySelector(".layers__item-img");
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-layer-cut/source/js/content.js
  var Content = class {
    /**
     * Constructor for the Content class. Initializes the instance, sets up DOM references, and binds events.
     * @param {HTMLElement} DOM_el - The main DOM element for the Content
     */
    constructor(DOM_el) {
      // Class property initialization with default values.
      // The DOM property holds references to the main and inner elements of the Content component.
      __publicField(this, "DOM", {
        el: null,
        // Holds the reference to the main DOM element with class 'content__inner'.
        title: null,
        // Holds the reference to the inner DOM element <h2>.
        description: null
        // Holds the reference to the inner DOM element <p>.
      });
      this.DOM.el = DOM_el;
      this.DOM.title = this.DOM.el.querySelector("h2");
      this.DOM.description = this.DOM.el.querySelector("p");
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-layer-cut/source/js/demo1/index.js
  var frameElement = document.querySelector(".frame");
  var DOMItems = [...document.querySelectorAll(".layers__item")];
  var items = [];
  DOMItems.forEach((item) => {
    items.push(new Item(item));
  });
  var DOMContentSections = [...document.querySelectorAll(".content > .content__inner")];
  var contents = [];
  DOMContentSections.forEach((content) => {
    contents.push(new Content(content));
  });
  var toggleContent = () => {
    const [content1, content2] = contents;
    if (content1.DOM.el.classList.contains("hidden")) {
      content1.DOM.el.classList.remove("hidden");
      content2.DOM.el.classList.add("hidden");
    } else {
      content1.DOM.el.classList.add("hidden");
      content2.DOM.el.classList.remove("hidden");
    }
  };
  var tl = null;
  var animationSettings = {
    duration: 1.4,
    // Duration of the animation
    ease: "power3.inOut",
    // Type of easing to use for the animation transition
    delayFactor: 0.2
    // Delay between each item's animation
  };
  document.addEventListener("click", (event) => {
    if (tl && tl.isActive() || frameElement.contains(event.target)) {
      return false;
    }
    const contentActive = contents.find((content) => !content.DOM.el.classList.contains("hidden"));
    const contentInactive = contents.find((content) => content !== contentActive);
    const allItems = items.map((item) => item.DOM.el);
    const lastItem = items[items.length - 1].DOM.el;
    const allInnerItems = items.map((item) => item.DOM.inner);
    tl = gsap.timeline({
      paused: true,
      // Create the timeline in a paused state
      defaults: {
        // Default settings applied to all animations within this timeline
        duration: animationSettings.duration,
        ease: animationSettings.ease
      }
    }).fromTo(allItems, {
      // Initial animation state
      opacity: 1,
      // Fully visible
      "clip-path": "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
      // CSS clip-path shape
    }, {
      // Animation target state
      stagger: {
        // Settings for staggering animations for each item
        each: animationSettings.delayFactor,
        // Time between each item's animation
        onComplete: function() {
          const targetElement = this.targets()[0];
          const index = DOMItems.indexOf(targetElement);
          if (index) {
            gsap.set(items[index - 1].DOM.el, { opacity: 0 });
          }
        }
      },
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
      // Target shape of the clip-path
    }, 0).fromTo(allInnerItems, {
      // Starting state for 'inner' elements' animation
      yPercent: 0,
      filter: "brightness(30%)"
      // CSS filters to adjust color
    }, {
      // Animation target state
      stagger: animationSettings.delayFactor,
      // Stagger settings similar to above
      filter: "brightness(100%)"
      // Full brightness
    }, 0).to([contentActive.DOM.title, contentActive.DOM.description], {
      startAt: { yPercent: 0 },
      stagger: -0.04,
      yPercent: -200
    }, 0).add((() => toggleContent())).fromTo([contentInactive.DOM.title, contentInactive.DOM.description], {
      yPercent: 200
    }, {
      ease: "expo",
      // Different easing effect
      stagger: -0.15,
      yPercent: 0
    }).to(lastItem, {
      // Animation for the last item
      duration: 1,
      ease: "power4",
      // Different easing effect
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      // Animating clip-path to different shape
      onComplete: () => gsap.set(lastItem, { opacity: 0 })
      // After animation, hide the last item
    }, "<");
    tl.play();
  });
  preloadImages(".layers__item-img").then(() => {
    document.body.classList.remove("loading");
  });
})();
