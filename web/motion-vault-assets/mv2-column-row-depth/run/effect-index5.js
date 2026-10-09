(() => {
  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };
  var getGrid = (selector) => {
    let elements = gsap.utils.toArray(selector), bounds, getSubset = (axis, dimension, alternating, merge) => {
      let a = [], subsets = {}, onlyEven = alternating === "even", p;
      bounds.forEach((b, i) => {
        let position = Math.round(b[axis] + b[dimension] / 2), subset = subsets[position];
        subset || (subsets[position] = subset = []);
        subset.push(elements[i]);
      });
      for (p in subsets) {
        a.push(subsets[p]);
      }
      if (onlyEven || alternating === "odd") {
        a = a.filter((el, i) => !(i % 2) === onlyEven);
      }
      if (merge) {
        let a2 = [];
        a.forEach((subset) => a2.push(...subset));
        return a2;
      }
      return a;
    };
    elements.refresh = () => bounds = elements.map((el) => el.getBoundingClientRect());
    elements.columns = (alternating, merge) => getSubset("left", "width", alternating, merge);
    elements.rows = (alternating, merge) => getSubset("top", "height", alternating, merge);
    elements.refresh();
    return elements;
  };

  // source/js/index5.js
  var lenis;
  var __vaultLayoutFrame = null;
  var __vaultLayoutScrollFn = null;
  var grid = document.querySelector(".columns");
  var columns = [...grid.querySelectorAll(".column")];
  var items = columns.map((column, pos) => {
    return [...column.querySelectorAll(".column__item")].map((item) => ({
      element: item,
      column: pos,
      wrapper: item.querySelector(".column__item-imgwrap"),
      image: item.querySelector(".column__item-img")
    }));
  });
  var mergedItems = items.flat();
  var initSmoothScrolling = () => {
    lenis = window.SourceDemo.createLenis(Lenis, {
      lerp: 0.2,
      // Lower values create a smoother scroll effect
      smoothWheel: true
      // Enables smooth scrolling for mouse wheel events
    });
    lenis.on("scroll", () => ScrollTrigger.update());
    __vaultLayoutScrollFn = (time) => {
      __vaultLayoutFrame = null;
      if (__vaultLayoutStopped || __vaultLayoutDisposed || window.SourceDemo.disposed || window.SourceDemo.reducedMotion || !lenis) return;
      lenis.raf(time);
      __vaultQueueLayoutFrame();
    };
    __vaultQueueLayoutFrame();
  };
  var scroll = () => {
    const gridObj = getGrid(mergedItems.map((item) => item.element));
    const rowMapping = {
      even: {
        skewX: 10,
        xPercent: 2,
        // hardcoding here what seems to be the perfect value for the effect...
        transformOrigin: "0% 50%"
      },
      odd: {
        skewX: -10,
        xPercent: -2,
        transformOrigin: "100% 50%"
      }
    };
    ["even", "odd"].forEach((type) => {
      gridObj.rows(type).flat().forEach((row) => {
        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "clamp(bottom top)",
            scrub: true
          }
        }).fromTo(row.querySelector(".column__item-imgwrap"), {
          transformOrigin: rowMapping[type].transformOrigin,
          opacity: 0.1,
          xPercent: rowMapping[type].xPercent,
          skewX: rowMapping[type].skewX
        }, {
          opacity: 1,
          xPercent: 0,
          skewX: 0
        }, 0).fromTo(row.querySelector(".column__item-img"), {
          scaleY: 1.2
        }, {
          scaleY: 1
        }, 0);
      });
    });
  };
  var __vaultLayoutContext = null;
  var __vaultLayoutInitialized = false;
  var __vaultLayoutStopped = window.SourceDemo.inspect().paused;
  var __vaultLayoutDisposed = false;
  var __vaultLayoutMode = null;
  var __vaultLayoutPreference = matchMedia("(prefers-reduced-motion: reduce)");
  function __vaultApplyStaticLayout(reduced) {
    document.documentElement.classList.toggle("vault-static-scroll-layout", reduced);
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
    if (__vaultLayoutContext) {
      __vaultLayoutContext.revert();
      __vaultLayoutContext = null;
    }
    if (lenis) {
      window.SourceDemo.destroyLenis(lenis);
      lenis = null;
    }
  }
  function __vaultReconcileScrollLayout() {
    if (__vaultLayoutDisposed || window.SourceDemo.disposed) return;
    const reduced = window.SourceDemo.reducedMotion;
    __vaultApplyStaticLayout(reduced);
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
  __vaultLayoutPreference.addEventListener("change", __vaultReconcileScrollLayout);
  __vaultApplyStaticLayout(window.SourceDemo.reducedMotion);
  window.SourceDemo.register({
    stop() {
      __vaultLayoutStopped = true;
      __vaultCancelLayoutFrame();
    },
    resume() {
      __vaultLayoutStopped = false;
      __vaultReconcileScrollLayout();
    },
    dispose() {
      if (__vaultLayoutDisposed) return;
      __vaultLayoutDisposed = true;
      __vaultLayoutPreference.removeEventListener("change", __vaultReconcileScrollLayout);
      __vaultReleaseLayoutMotion();
      __vaultApplyStaticLayout(false);
    }
  });
  window.SourceDemo.bindInitialization(preloadImages(".column__item-img").then(() => {
    if (window.SourceDemo.disposed) return;
    __vaultStartScrollLayout();
    document.body.classList.remove("loading");
  }));
})();
