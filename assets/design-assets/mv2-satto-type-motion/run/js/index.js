(() => {
  const __vaultCreateEditorialController = function createEditorialController({ id, gsap: gsap2, styleSelector, textSelector, startMotion, rebuildOnResize = false }) {
    const api = window.SourceDemo;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const styleSnapshots = [...document.querySelectorAll(styleSelector)].map((element) => ({
      element,
      style: element.getAttribute("style")
    }));
    const textSnapshots = textSelector ? [...document.querySelectorAll(textSelector)].map((element) => ({
      element,
      text: element.textContent,
      className: element.getAttribute("class")
    })) : [];
    let context = null;
    let cleanup = null;
    let activeMode = null;
    let disposed = false;
    function restoreContent() {
      for (const { element, style } of styleSnapshots) {
        if (style === null) element.removeAttribute("style");
        else element.setAttribute("style", style);
      }
      for (const { element, text, className } of textSnapshots) {
        element.textContent = text;
        if (className === null) element.removeAttribute("class");
        else element.setAttribute("class", className);
      }
    }
    function clearMotion() {
      const priorContext = context;
      const priorCleanup = cleanup;
      context = null;
      cleanup = null;
      activeMode = null;
      try {
        priorCleanup?.();
      } finally {
        try {
          priorContext?.revert();
        } finally {
          restoreContent();
        }
      }
    }
    function applyMode(force = false) {
      if (disposed || api.disposed) return;
      const next = media.matches ? "static" : "motion";
      if (!force && activeMode === next) return;
      clearMotion();
      document.documentElement.setAttribute("data-vault-editorial-mode", id + ":" + next);
      if (next === "static") {
        activeMode = next;
        return;
      }
      if (api.inspect?.().paused) return;
      activeMode = next;
      context = gsap2.context(() => {
        cleanup = startMotion();
      });
    }
    function onChange() {
      try {
        applyMode();
      } catch (error) {
        api.fail(error);
      }
    }
    function onResize() {
      if (!media.matches && !api.inspect?.().paused) {
        try {
          applyMode(true);
        } catch (error) {
          api.fail(error);
        }
      }
    }
    const controller = {
      start: applyMode,
      run(callback) {
        if (disposed || api.disposed || media.matches || activeMode !== "motion") return;
        if (context) context.add(callback);
        else callback();
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        media.removeEventListener("change", onChange);
        if (rebuildOnResize) window.removeEventListener("resize", onResize);
        clearMotion();
        document.documentElement.removeAttribute("data-vault-editorial-mode");
      }
    };
    media.addEventListener("change", onChange);
    if (rebuildOnResize) window.addEventListener("resize", onResize);
    api.register({ dispose: controller.dispose, resume: onChange });
    return controller;
  };
  let __vaultEditorial;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip, ScrambleTextPlugin);
  function __vaultCreateAuthorSmoother() {
    return ScrollSmoother.create({ smooth: 1, normalizeScroll: true });
  }
  const textElements = document.querySelectorAll(".el");
  const logoEl = document.querySelector(".logo > span");
  const relatedEl = document.querySelector(".related");
  const relatedItems = relatedEl?.querySelectorAll(".grid__item") || [];
  const logoText = logoEl.textContent;
  textElements.forEach((el) => {
    el.dataset.text = el.textContent;
  });
  logoEl.dataset.text = logoText;
  function resetTextElements() {
    textElements.forEach((el) => {
      gsap.set(el, {
        clearProps: "transform,opacity,filter"
      });
    });
  }
  function initFlips() {
    resetTextElements();
    textElements.forEach((el) => {
      const originalClass = [...el.classList].find((c) => c.startsWith("pos-"));
      const targetClass = el.dataset.altPos;
      const flipEase = el.dataset.flipEase || "expo.inOut";
      el.classList.add(targetClass);
      el.classList.remove(originalClass);
      const flipState = Flip.getState(el, {
        props: "opacity, filter, width"
      });
      el.classList.add(originalClass);
      el.classList.remove(targetClass);
      Flip.to(flipState, {
        ease: flipEase,
        scrollTrigger: {
          trigger: el,
          start: "clamp(bottom bottom-=10%)",
          end: "clamp(center center)",
          scrub: true
        }
      });
      Flip.from(flipState, {
        ease: flipEase,
        scrollTrigger: {
          trigger: el,
          start: "clamp(center center)",
          end: "clamp(top top)",
          scrub: true
        }
      });
    });
  }
  const scrambleChars = "upperAndLowerCase";
  function scramble(el, { duration, revealDelay = 0 } = {}) {
    const text = el.dataset.text ?? el.textContent;
    const finalDuration = duration ?? (el.dataset.scrambleDuration ? parseFloat(el.dataset.scrambleDuration) : 1);
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { scrambleText: { text: "", chars: "" } },
      {
        scrambleText: {
          text,
          chars: scrambleChars,
          revealDelay
        },
        duration: finalDuration
      }
    );
  }
  function initScramble() {
    killScrambleTriggers();
    textElements.forEach((el) => {
      ScrollTrigger.create({
        id: "scramble",
        // used for targeted cleanup
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => __vaultEditorial.run(() => scramble(el)),
        onEnterBack: () => __vaultEditorial.run(() => scramble(el))
      });
    });
    scramble(logoEl, { revealDelay: 0.5 });
  }
  function killScrambleTriggers() {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.id === "scramble") {
        st.kill();
      }
    });
  }
  const relatedConfig = {
    logo: {
      fadeOut: { duration: 0.7, ease: "expo", opacity: 0 },
      fadeIn: { duration: 0.5, ease: "power3.in", opacity: 1 }
    },
    items: {
      initial: { xPercent: 100, scale: 0, opacity: 0 },
      animate: {
        duration: 0.7,
        ease: "expo",
        stagger: 0.1,
        xPercent: 0,
        scale: 1,
        opacity: 1
      },
      reverse: {
        duration: 0.5,
        ease: "power3.in",
        scale: 0,
        opacity: 0,
        xPercent: 100,
        stagger: 0.05
      }
    }
  };
  function initRelatedDemos() {
    gsap.set(relatedItems, relatedConfig.items.initial);
    ScrollTrigger.create({
      trigger: relatedEl,
      start: "top center+=25%",
      onEnter: () => __vaultEditorial.run(() => animateRelatedEnter()),
      onLeaveBack: () => __vaultEditorial.run(() => animateRelatedLeave())
    });
  }
  function animateRelatedEnter() {
    gsap.to(logoEl, relatedConfig.logo.fadeOut);
    gsap.fromTo(
      relatedItems,
      relatedConfig.items.initial,
      relatedConfig.items.animate
    );
  }
  function animateRelatedLeave() {
    gsap.to(logoEl, relatedConfig.logo.fadeIn);
    gsap.to(relatedItems, relatedConfig.items.reverse);
  }
  window.SourceDemo.bindInitialization(Promise.resolve().then(() => {
    if (window.SourceDemo.disposed) return;
    __vaultEditorial = __vaultCreateEditorialController({
      id: "mv2-satto-type-motion",
      gsap,
      styleSelector: ".el, .logo > span, .related .grid__item",
      textSelector: ".el, .logo > span",
      rebuildOnResize: true,
      startMotion() {
        const smoother = __vaultCreateAuthorSmoother();
        initFlips();
        initScramble();
        if (relatedEl) initRelatedDemos();
        ScrollTrigger.refresh(true);
        return () => smoother.kill();
      }
    });
    __vaultEditorial.start();
  }));
})();
