(() => {
  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // source/js/index8.js
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
    gsap.set([grid, mergedItems.map((item) => item.element)], {
      perspective: 600
    });
    gsap.timeline({
      defaults: { ease: "power2" },
      scrollTrigger: {
        trigger: grid,
        start: "clamp(top bottom)",
        end: "clamp(bottom top)",
        scrub: true
      }
    }).to(columns[0], {
      startAt: { transformOrigin: "100% 50%" },
      rotationY: 8,
      z: 20
    }, 0).to(columns[1], {
      startAt: { transformOrigin: "100% 50%" },
      rotationY: 4
    }, 0).to(columns[2], {
      startAt: { transformOrigin: "0% 50%" },
      rotationY: -3
    }, 0).to(columns[3], {
      startAt: { transformOrigin: "0% 50%" },
      rotationY: -6,
      z: 20
    }, 0);
    mergedItems.forEach((item) => {
      gsap.fromTo(item.wrapper, {
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% 0%"
      }, {
        scrollTrigger: {
          trigger: item.element,
          start: "top bottom",
          end: "clamp(center center-=25%)",
          scrub: true
        },
        opacity: 1,
        rotationX: 0
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
