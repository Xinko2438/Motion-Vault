(() => {
  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // source/js/demo2/index.js
  var lenis;
  var __vaultLayoutFrame = null;
  var __vaultLayoutScrollFn = null;
  var contentEl = document.querySelector(".content");
  var contentItems = [...contentEl.querySelectorAll(".item")];
  var reflectionEl = document.querySelector(".content--reflection");
  var reflectionItems = [...reflectionEl.querySelectorAll(".item")];
  var initSmoothScrolling = () => {
    lenis = window.SourceDemo.createLenis(Lenis, {
      lerp: 0.2,
      // Lower values create a smoother scroll effect
      smoothWheel: true
      // Enables smooth scrolling for mouse wheel events
    });
    lenis.on("scroll", () => ScrollTrigger.update);
    __vaultLayoutScrollFn = (time) => {
      __vaultLayoutFrame = null;
      if (__vaultLayoutStopped || __vaultLayoutDisposed || window.SourceDemo.disposed || window.SourceDemo.reducedMotion || !lenis) return;
      lenis.raf(time);
      __vaultQueueLayoutFrame();
      reflectionEl.style.transform = `translateY(${-lenis.actualScroll}px)`;
    };
    __vaultQueueLayoutFrame();
  };
  var scroll = () => {
    contentItems.forEach((item, pos) => {
      const itemImg = item.querySelector(".item__img");
      const itemImgInner = itemImg.querySelector(".item__img-inner");
      const itemCaption = item.querySelector(".item__caption");
      const reflectionItem = reflectionItems[pos];
      const reflectionItemImg = reflectionItem.querySelector(".item__img");
      const reflectionItemImgInner = reflectionItemImg.querySelector(".item__img-inner");
      const reflectionItemCaption = reflectionItem.querySelector(".item__caption");
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          scrub: true
        }
      }).fromTo([itemImg, reflectionItemImg], {
        filter: "brightness(120%) blur(0px)",
        transformOrigin: "50% 100%"
      }, {
        ease: "power3.in",
        filter: "brightness(50%) blur(25px)",
        skewX: 3,
        borderRadius: 100,
        scaleY: 0,
        scaleX: 1.1
      }, 0).to([itemImg, reflectionItemImg], {
        ease: "power4.in",
        skewY: -3
      }, 0).fromTo([itemImgInner, reflectionItemImgInner], {
        scale: 1
      }, {
        ease: "none",
        scale: 2
      }, 0).to([itemCaption, reflectionItemCaption], {
        ease: "power4.in",
        opacity: 0,
        scale: 0
      }, 0);
    });
  };
  var init = () => {
    __vaultStartScrollLayout();
  };
  var __vaultLayoutContext = null;
  var __vaultLayoutInitialized = false;
  var __vaultLayoutStopped = window.SourceDemo.inspect().paused;
  var __vaultLayoutDisposed = false;
  var __vaultLayoutMode = null;
  var __vaultLayoutPreference = matchMedia("(prefers-reduced-motion: reduce)");
  var __vaultReflectionWrap = reflectionEl.closest(".wrap");
  var __vaultReflectionTransform = reflectionEl.style.transform;
  var __vaultReflectionAttributes = __vaultReflectionWrap ? {
    hidden: __vaultReflectionWrap.getAttribute("aria-hidden"),
    inert: __vaultReflectionWrap.getAttribute("inert")
  } : null;
  function __vaultRestoreReflectionAttribute(name, value) {
    if (!__vaultReflectionWrap) return;
    if (value === null) __vaultReflectionWrap.removeAttribute(name);
    else __vaultReflectionWrap.setAttribute(name, value);
  }
  function __vaultApplyStaticLayout(reduced) {
    document.documentElement.classList.toggle("vault-static-scroll-layout", reduced);
    if (__vaultReflectionWrap) {
      if (reduced) {
        __vaultReflectionWrap.setAttribute("aria-hidden", "true");
        __vaultReflectionWrap.setAttribute("inert", "");
      } else {
        __vaultRestoreReflectionAttribute("aria-hidden", __vaultReflectionAttributes.hidden);
        __vaultRestoreReflectionAttribute("inert", __vaultReflectionAttributes.inert);
      }
    }
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
    reflectionEl.style.transform = __vaultReflectionTransform;
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
  window.SourceDemo.bindInitialization(preloadImages(".item__img-inner").then(() => {
    if (window.SourceDemo.disposed) return;
    document.body.classList.remove("loading");
    init();
  }));
})();
