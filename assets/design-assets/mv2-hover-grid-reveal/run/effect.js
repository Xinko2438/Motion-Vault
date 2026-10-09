(() => {
  // source/js/utils.js
  var preloadImages = (selector = "img") => {
    return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
    });
  };

  // source/js/index.js
  var workNav = document.querySelector(".frame__works");
  var workLinks = [...workNav.querySelectorAll("a")];
  var title = document.querySelector(".frame__title-main");
  var bgImageElements = [...document.querySelectorAll(".background__image")];
  var video = document.querySelector(".background__video");
  var getClipPath = (imageElement) => {
    const clipPathDirections = {
      right: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      left: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      top: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      bottom: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
    };
    const imageDirection = imageElement.dataset.dir;
    const clipPath = {
      from: clipPathDirections[imageDirection] || "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    };
    return clipPath;
  };
  var toggleWork = (event, isShowing) => {
    const href = event.target.getAttribute("href");
    const contentElement = document.querySelector(href);
    const bgId = contentElement.dataset.bg;
    const bgElement = document.querySelector(`#${bgId}`);
    const contentTitle = contentElement.querySelector(".content__title");
    const contentImages = [...contentElement.querySelectorAll(".content__img")];
    const contentInnerImages = [...contentElement.querySelectorAll(".content__img-inner")];
    if (window.SourceDemo.reducedMotion) {
      event.target.tlEnter?.kill();
      event.target.tlLeave?.kill();
      contentElement.classList.toggle("content--current", isShowing);
      gsap.set(contentElement, { zIndex: isShowing ? 1 : 0 });
      gsap.set(bgElement, { opacity: isShowing ? 1 : 0 });
      gsap.set(contentTitle, { opacity: isShowing ? 1 : 0, scale: 1 });
      gsap.set(contentImages, { xPercent: 0, yPercent: 0, filter: "brightness(100%)", clipPath: (index, target) => getClipPath(target)[isShowing ? "to" : "from"] });
      gsap.set(contentInnerImages, { scale: 1 });
      return;
    }
    if (event.target.tlEnter) {
      event.target.tlEnter.kill();
    }
    if (event.target.tlLeave) {
      event.target.tlLeave.kill();
    }
    if (isShowing) {
      gsap.set(contentElement, { zIndex: 1 });
      contentElement.classList.add("content--current");
      event.target.tlEnter = gsap.timeline({
        defaults: {
          duration: 0.95,
          ease: "power4"
        }
      }).set(bgElement, { opacity: 1 }).fromTo(contentTitle, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, 0).fromTo(contentImages, {
        xPercent: () => gsap.utils.random(-10, 10),
        yPercent: () => gsap.utils.random(-10, 10),
        filter: "brightness(300%)",
        clipPath: (index, target) => getClipPath(target)["from"]
      }, {
        xPercent: 0,
        yPercent: 0,
        filter: "brightness(100%)",
        clipPath: (index, target) => getClipPath(target)["to"]
      }, 0).fromTo(contentInnerImages, { scale: 1.5 }, { scale: 1 }, 0);
    } else {
      gsap.set(contentElement, { zIndex: 0 });
      event.target.tlLeave = gsap.timeline({
        defaults: {
          duration: 0.95,
          ease: "power4"
        },
        onComplete: () => {
          contentElement.classList.remove("content--current");
        }
      }).set(bgElement, { opacity: 0 }, 0.05).to(contentTitle, { opacity: 0 }, 0).to(contentImages, { clipPath: (index, target) => getClipPath(target)["from"] }, 0).to(contentInnerImages, { scale: 1.5 }, 0);
    }
  };
  var showWork = (event) => {
    toggleWork(event, true);
  };
  var hideWork = (event) => {
    toggleWork(event, false);
  };
  var initEvents = () => {
    if (window.SourceDemo.reducedMotion) {
      video.pause();
      video.autoplay = false;
    }
    workLinks.forEach((workLink) => {
      workLink.addEventListener("focus", showWork);
      workLink.addEventListener("blur", hideWork);
      let hoverTimer;
      workLink.addEventListener("mouseenter", (event) => {
        hoverTimer = setTimeout(() => showWork(event), 30);
      });
      workLink.addEventListener("mouseleave", (event) => {
        clearTimeout(hoverTimer);
        hideWork(event);
      });
    });
    workNav.addEventListener("mouseenter", () => {
      gsap.killTweensOf([video, title]);
      gsap.to([video, title], {
        duration: window.SourceDemo.reducedMotion ? 0 : 0.6,
        ease: "power4",
        opacity: 0
      });
    });
    workNav.addEventListener("mouseleave", () => {
      gsap.killTweensOf([video, title]);
      gsap.to([video, title], {
        duration: window.SourceDemo.reducedMotion ? 0 : 0.6,
        ease: "sine.in",
        opacity: 1
      });
    });
  };
  var init = () => {
    initEvents();
  };
  window.SourceDemo.bindInitialization(preloadImages(".content__img-inner").then(() => {
    if (window.SourceDemo.disposed) return;
    document.body.classList.remove("loading");
    init();
  }));
})();
