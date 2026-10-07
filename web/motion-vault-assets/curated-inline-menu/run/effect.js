(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // globals:imagesloaded
  var require_imagesloaded = __commonJS({
    "globals:imagesloaded"(exports, module) {
      module.exports = window.imagesLoaded;
    }
  });

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-inline-menu/source/src/js/utils.js
  var imagesLoaded = require_imagesloaded();
  var calcWinsize = () => {
    return { width: window.innerWidth, height: window.innerHeight };
  };
  var preloadImages = (selector = "img") => {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll(selector), resolve);
    });
  };

  // globals:gsap
  var gsap = window.gsap;
  var gsap_default = window.gsap;

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-inline-menu/source/src/js/gallery.js
  var Gallery = class {
    constructor(el) {
      this.DOM = { el };
      this.DOM.images = this.DOM.el.querySelectorAll(".gallery__img");
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-inline-menu/source/src/js/menuItem.js
  var MenuItem = class {
    constructor(item) {
      this.DOM = { item };
      this.DOM.gallery = document.querySelector(this.DOM.item.href.substring(this.DOM.item.href.indexOf("#")));
      this.gallery = new Gallery(this.DOM.gallery);
    }
  };

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-inline-menu/source/src/js/menu.js
  var winsize = calcWinsize();
  window.addEventListener("resize", () => winsize = calcWinsize());
  var Menu = class {
    constructor() {
      this.DOM = {};
      this.DOM.frameLinks = [...document.querySelectorAll(".oh")];
      this.DOM.frameLinksContent = this.DOM.frameLinks.filter((el) => el.classList.contains("view-content"));
      this.DOM.frameLinksInitial = this.DOM.frameLinks.filter((el) => !this.DOM.frameLinksContent.includes(el));
      this.DOM.closeCtrl = document.querySelector(".frame__close");
      this.DOM.content = document.querySelector(".content");
      this.DOM.menuItems = [...this.DOM.content.querySelectorAll(".menu-item")];
      this.menuItems = [];
      this.DOM.menuItems.forEach((item) => this.menuItems.push(new MenuItem(item)));
      this.DOM.textWords = [...this.DOM.content.querySelectorAll(".content__quote > span.whitespace, .content__quote > span.word")];
      this.DOM.galleryDeco = document.querySelector(".galleries > .galleries__deco");
      this.DOM.galleryButton = document.querySelector(".galleries > .galleries__button");
      this.isMenuPage = false;
      this.init();
    }
    init() {
      gsap.set(this.DOM.frameLinksContent, {
        pointerEvents: "none"
      });
      gsap.set(this.DOM.frameLinksContent.map((el) => el.children), {
        y: "-100%"
      });
      this.initEvents();
    }
    initEvents() {
      this.DOM.menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", this.openMenu.bind(this));
      });
      this.DOM.closeCtrl.addEventListener("click", this.closeMenu.bind(this));
      window.addEventListener("resize", () => {
        if (!this.isMenuPage) return;
        gsap.set(this.DOM.menuItems, {
          x: (_, target) => winsize.width * 0.6 - target.offsetLeft
        }, 0);
      });
    }
    // show/hide gallery deco element
    toggleGalleryDeco() {
      return gsap.timeline({
        defaults: {
          duration: !this.isMenuPage ? 1 : 0.3,
          ease: "power4"
        },
        onStart: () => !this.isMenuPage ? gsap.set(this.DOM.galleryDeco, { x: "15%", y: "100%" }) : null
      }).to(this.DOM.galleryDeco, {
        opacity: !this.isMenuPage ? 1 : 0,
        x: !this.isMenuPage ? "0%" : "5%",
        y: !this.isMenuPage ? "0%" : "100%"
      }, !this.isMenuPage ? 0.5 : 0);
    }
    showGalleryEntryButton() {
      return gsap.timeline({
        onStart: () => gsap.set(this.DOM.galleryButton, {
          scale: 0.9
        })
      }).to(this.DOM.galleryButton, {
        duration: 0.8,
        ease: "power4",
        opacity: 1,
        scale: 1
      }, !this.isMenuPage ? 0.5 : 0);
    }
    hideGalleryEntryButton() {
      return gsap.timeline().to(this.DOM.galleryButton, {
        duration: 0.3,
        ease: "power4",
        opacity: 0,
        scale: 0.9
      }, !this.isMenuPage ? 0.5 : 0);
    }
    // show links for the content or initial page
    toggleFrameLinks() {
      return gsap.timeline({
        defaults: {
          duration: !this.isMenuPage ? 1 : 0.6,
          ease: !this.isMenuPage ? "power4.inOut" : "power4"
        },
        onStart: () => {
          gsap.set(!this.isMenuPage ? this.DOM.frameLinksInitial : this.DOM.frameLinksContent, {
            pointerEvents: "none"
          });
          gsap.set(!this.isMenuPage ? this.DOM.frameLinksContent : this.DOM.frameLinksInitial, {
            pointerEvents: "auto"
          });
        }
      }).to(this.DOM.frameLinksInitial.map((el) => el.children), {
        y: !this.isMenuPage ? "100%" : "0%"
      }).to(this.DOM.frameLinksContent.map((el) => el.children), {
        y: !this.isMenuPage ? "0%" : "-100%"
      }, 0);
    }
    openMenu(ev) {
      ev.preventDefault();
      const clickedMenuItemIndex = this.DOM.menuItems.indexOf(ev.target);
      if (this.isAnimating || this.isMenuPage && this.currentMenuItem === clickedMenuItemIndex) return;
      this.isAnimating = true;
      if (this.isMenuPage) {
        this.previousMenuItem = this.currentMenuItem;
        this.DOM.menuItems[this.currentMenuItem].classList.remove("menu-item--active");
      }
      this.currentMenuItem = clickedMenuItemIndex;
      ev.target.classList.add("menu-item--active");
      if (!this.isMenuPage) {
        this.DOM.content.classList.add("content--menu");
        this.togglePage();
      } else {
        Promise.all([this.hideGalleryEntryButton(), this.closeGallery(this.previousMenuItem)]).then(() => Promise.all([this.openGallery(), this.showGalleryEntryButton()])).then(() => this.isAnimating = false);
      }
    }
    closeMenu() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      this.DOM.menuItems[this.currentMenuItem].classList.remove("menu-item--active");
      this.DOM.content.classList.remove("content--menu");
      this.togglePage();
    }
    togglePage() {
      Promise.all([
        this.toggleFrameLinks(),
        this.toggleLinksToMenu(),
        this[!this.isMenuPage ? "openGallery" : "closeGallery"](),
        this.toggleGalleryDeco(),
        this[!this.isMenuPage ? "showGalleryEntryButton" : "hideGalleryEntryButton"]()
      ]).then(() => {
        this.isMenuPage = !this.isMenuPage;
        this.isAnimating = false;
      });
    }
    // animate links to the right side and the remaining text to the left, fading out
    // or vice versa
    toggleLinksToMenu() {
      return gsap.timeline({
        defaults: {
          duration: !this.isMenuPage ? 1 : 0.6,
          ease: !this.isMenuPage ? "power4.inOut" : "power4"
        }
      }).to(this.DOM.menuItems, {
        x: (_, target) => !this.isMenuPage ? winsize.width * 0.6 - target.offsetLeft : 0,
        stagger: !this.isMenuPage ? {
          from: this.currentMenuItem,
          amount: 0.15
        } : 0
      }, 0).to(this.DOM.textWords.sort((a, b) => {
        if (a.offsetLeft < b.offsetLeft) {
          return -1;
        } else if (a.offsetLeft > b.offsetLeft) {
          return 1;
        }
        return 0;
      }), {
        x: !this.isMenuPage ? -300 : 0,
        opacity: !this.isMenuPage ? 0 : 1,
        stagger: !this.isMenuPage ? 4e-3 : -4e-3
      }, 0);
    }
    openGallery() {
      const gallery = this.menuItems[this.currentMenuItem].gallery;
      return gsap.timeline({
        onStart: () => {
          gsap.set(gallery.DOM.images, { opacity: 0 }, 0);
          gallery.DOM.el.classList.add("gallery--current");
        }
      }).to(gallery.DOM.images, {
        duration: 0.1,
        ease: "expo.inOut",
        opacity: (pos) => Math.max(1 - (pos * 0.1 + 0.1), 0.1),
        x: "0%",
        stagger: -0.08
      }, !this.isMenuPage ? 0.5 : 0);
    }
    closeGallery(menuItemIndex = this.currentMenuItem) {
      const galleryCurrent = this.menuItems[menuItemIndex].gallery;
      return gsap.timeline().to(galleryCurrent.DOM.images, {
        duration: 0.3,
        ease: "expo",
        opacity: 0,
        stagger: -0.04,
        onComplete: () => galleryCurrent.DOM.el.classList.remove("gallery--current")
      }, 0);
    }
  };

  // globals:splitting
  var splitting_default = window.Splitting;

  // .runtime/hybrid-assets/staged/motion-vault-assets/curated-inline-menu/source/src/js/index.js
  var splitting = splitting_default({ by: "words" });
  preloadImages().then(() => {
    document.body.classList.remove("loading");
    new Menu();
  });
})();
