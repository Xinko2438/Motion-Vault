(() => {
  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // source/js/index3.js
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
      lerp: 0.15,
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
    mergedItems.forEach((item) => {
      gsap.to(item.wrapper, {
        ease: "none",
        startAt: { transformOrigin: `${1.5 * (window.innerWidth - item.element.getBoundingClientRect()["left"])}px 0%` },
        scrollTrigger: {
          trigger: item.element,
          start: "clamp(top bottom)",
          end: "clamp(bottom top)",
          scrub: true
        },
        rotation: (item.column + 1) * 2,
        xPercent: (item.column + 1) * 14,
        yPercent: item.column * -5
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
