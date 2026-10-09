(() => {
  gsap.registerPlugin(ScrollTrigger);
  let lenis;
  let items = [];
  let wraps = [];
  const marqueeInner = document.querySelector(".mark > .mark__inner");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preloadImages = (selector) => {
    return Promise.all(
      gsap.utils.toArray(selector).map((item) => {
        const image = new Image();
        image.src = item.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1];
        return image.decode().catch(() => {
        });
      })
    );
  };
  function initSmoothScrolling() {
    lenis = window.SourceDemo.createLenis(Lenis);
    lenis.on("scroll", ScrollTrigger.update);
    window.SourceDemo.addTicker(gsap, (time) => {
      lenis.raf(time * 1e3);
    });
    gsap.ticker.lagSmoothing(0);
  }
  function createGalleryWrappers() {
    items = gsap.utils.toArray(".gallery__item");
    items.forEach((item) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("gallery__item-wrap");
      item.parentNode.insertBefore(wrapper, item);
      wrapper.appendChild(item);
    });
    wraps = gsap.utils.toArray(".gallery__item-wrap");
  }
  function positionGalleryItems() {
    const freeSpace = (window.innerWidth - wraps[0].offsetWidth) / 2;
    const amplitude = Math.min(window.innerWidth * 0.2, freeSpace);
    wraps.forEach((wrap, i) => {
      const angle = i * 0.45;
      gsap.set(wrap, {
        x: Math.sin(angle) * amplitude
      });
    });
  }
  function initGalleryAnimation() {
    items.forEach((item) => {
      const rotationX = gsap.utils.random(240, 290);
      const rotationY = gsap.utils.random(-20, 20);
      const rotationZ = gsap.utils.random(-50, 50);
      const setZ = gsap.quickSetter(item, "z", "px");
      gsap.fromTo(
        item,
        {
          rotationX,
          rotationY,
          rotationZ
        },
        {
          rotationX: -rotationX,
          rotationY: -rotationY,
          rotationZ: -rotationZ,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom+=20%",
            end: "bottom top-=20%",
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const z = Math.pow(Math.sin(self.progress * Math.PI), 4) * -300;
              setZ(z);
            }
          }
        }
      );
    });
  }
  const animateMarquee = () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector(".gallery"),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    }).fromTo(
      marqueeInner,
      {
        x: "100vw"
      },
      {
        x: "-100%",
        ease: "none"
      }
    );
  };
  function initEvents() {
    window.addEventListener("resize", positionGalleryItems);
  }
  function init() {
    createGalleryWrappers();
    positionGalleryItems();
    if (!reduceMotion) animateMarquee();
    initEvents();
    if (reduceMotion) return;
    initSmoothScrolling();
    initGalleryAnimation();
  }
  document.addEventListener("DOMContentLoaded", () => {
    window.SourceDemo.bindInitialization((async () => {
      await preloadImages(".gallery__item");
      if (window.SourceDemo.disposed) {
        return;
      }
      document.body.classList.remove("loading");
      init();
    })());
  });
})();
