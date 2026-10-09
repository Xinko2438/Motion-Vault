// Author-specific, adapter-only reduced-motion patches. source/ is never written.
// Every normal animation body is retained; only owned timelines are captured so a
// live preference change can commit the same navigation intent immediately.
export const contractById = {
  'mv2-art-directed-slideshow': {
    reducedMotionStrategy: 'instant-current-slide-with-author-css-and-hidden-transition-decorations',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'author-native-previous-next-buttons-preserved-runtime-unverified',
    notes: [
      'All 16 pinned variants preserve next/previous wraparound and reconcile the selected slide without translation, scale, rotation, brightness or transition-cover animation.',
      'Live preference changes kill the owned transition, commit its already-selected slide, and clear only animation-owned styles. CSS image sizing and backgrounds remain authored.',
      'Node state/callback tests are not a browser or visual acceptance pass.'
    ]
  },
  'mv2-paranoia-filter': {
    reducedMotionStrategy: 'instant-three-slideshow-title-and-background-synchronization',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'focusable-labeled-nav-enter-space-same-intent-callback-runtime-unverified',
    notes: [
      'Main, previous-preview and next-preview slideshow indices retain their authored offsets and wraparound; selected title and original body color are committed synchronously.',
      'Focusable navigation retains the authored nav composition; trusted Enter/Space input calls the same intent callback as pointer input, without dispatching a synthetic click.',
      'Live preference changes stop owned transitions and settle slide, title and body state. Real keyboard, layout and visual acceptance remain unrun.'
    ]
  },
  'mv2-stack-content': {
    reducedMotionStrategy: 'instant-author-stack-reparent-content-navigation-and-return',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'semantic-stack-entry-enter-space-native-back-and-focus-return-runtime-unverified',
    notes: [
      'Reduced open/close preserves the authored stack destinations, selected content classes, current index, observer enablement and scroll position; next/previous uses the authored stack step with no interpolated motion.',
      'Live preference changes commit the pending open, close or navigation intent, remove only known Flip-owned properties, and restore content/title/back/navigation end states.',
      'Stack entries gain labeled button semantics and trusted Enter/Space activation through open(item). The existing native Back control calls close(), returns keyboard focus to the entry, and preserves repeat/reopen. Native arrows keep their original callbacks.',
      'Source/state tests do not establish real focus behavior, assistive-technology acceptance, CSS geometry or visual parity.'
    ]
  }
};

function once(source, before, after, label) {
  if (source.indexOf(before) < 0 || source.indexOf(before) !== source.lastIndexOf(before)) {
    throw new Error('Pinned reduced-motion source mismatch: ' + label);
  }
  return source.replace(before, after);
}

// Preference listeners use change, not a paused input event, and are also
// explicitly removed at disposal. No polling, timing threshold or replayed input.
const watch = `
function __vaultWatchReducedMotion(settle) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const changed = () => {
    if (media.matches && !window.SourceDemo.disposed) settle();
  };
  media.addEventListener('change', changed);
  window.SourceDemo.register({dispose() { media.removeEventListener('change', changed); }});
  changed();
}
`;

const artMethods = `
  // All variants finish with one full, undistorted image. Transition covers
  // have no persistent semantic content and return to their authored CSS state.
  __vaultSettleReducedSlide() {
    this.__vaultTimeline?.kill();
    this.tl?.kill();
    const decorations = this.DOM.deco ? (this.DOM.deco.nodeType ? [this.DOM.deco] : [...this.DOM.deco]) : [];
    const targets = [...this.DOM.slides, ...this.DOM.slidesInner, ...decorations];
    gsap.killTweensOf(targets);
    gsap.set(this.DOM.slides, {clearProps: 'transform,transformOrigin,opacity,visibility,zIndex'});
    gsap.set(this.DOM.slidesInner, {clearProps: 'transform,transformOrigin,filter'});
    if (decorations.length) gsap.set(decorations, {clearProps: 'transform,opacity,visibility'});
    this.DOM.slides.forEach((slide, index) => slide.classList.toggle('slide--current', index === this.current));
    this.isAnimating = false;
  }
`;

function transformArt(source, relative) {
  if (!/^js\/demo(?:[1-9]|1[0-6])\/slideshow\.js$/.test(relative)) return source;
  source = once(source, 'export class Slideshow {', 'export class Slideshow {' + artMethods, relative + ' class');
  const constructorEnd = relative === 'js/demo6/slideshow.js' ? "  }\n\n  /**\n     * Navigate to the next slide." : "  }\n\n  /**\n   * Navigate to the next slide.";
  source = once(source, constructorEnd, '    __vaultWatchReducedMotion(() => this.__vaultSettleReducedSlide());\n' + constructorEnd, relative + ' constructor');
  source = once(source, '    // Animation sequence using GSAP', `    if (window.SourceDemo.reducedMotion) {
      this.__vaultSettleReducedSlide();
      return;
    }

    // Animation sequence using GSAP`, relative + ' navigation');
  if (source.includes('    this.tl = gsap')) {
    source = once(source, '    this.tl = gsap', '    this.__vaultTimeline = this.tl = gsap', relative + ' timeline');
  } else {
    source = once(source, '    gsap\n      .timeline({', '    this.__vaultTimeline = gsap\n      .timeline({', relative + ' timeline');
  }
  return source + watch;
}

const paranoiaMethods = `
    __vaultSettleReducedSlide() {
        this.timeline?.kill();
        const outer = this.slidesArr.map(slide => slide.DOM.outer);
        const inner = this.slidesArr.map(slide => slide.DOM.inner);
        gsap.killTweensOf([...outer, ...inner]);
        gsap.set(outer, {clearProps: 'transform,opacity'});
        gsap.set(inner, {clearProps: 'transform,filter'});
        this.slidesArr.forEach((slide, index) => slide.DOM.outer.classList.toggle('slides__img--current', index === this.current));
        this.currentSlide = this.slidesArr[this.current];
        this.upcomingSlide = this.currentSlide;
        this.isAnimating = false;
    }
`;

const paranoiaEntry = `
let __vaultBodyTimeline;
const __vaultSettleReducedPresentation = () => {
    __vaultBodyTimeline?.kill();
    gsap.killTweensOf([bodyEl, ...titleElems]);
    gsap.set(bodyEl, {backgroundColor: bodyColor});
    titleElems.forEach((title, index) => gsap.set(title, {y: '0%', opacity: index === slideshowMain.current ? 1 : 0}));
};
`;

function transformParanoia(source, relative) {
  if (relative === 'src/js/slideshow.js') {
    source = once(source, 'export class Slideshow {', 'export class Slideshow {' + paranoiaMethods, relative + ' class');
    source = once(source, '        this.slidesTotal = this.DOM.slides.length;', '        this.slidesTotal = this.DOM.slides.length;\n        __vaultWatchReducedMotion(() => this.__vaultSettleReducedSlide());', relative + ' constructor');
    source = once(source, '        // Animation\n', `        if (window.SourceDemo.reducedMotion) {
            this.__vaultSettleReducedSlide();
            return;
        }

        // Animation
`, relative + ' navigation');
    // Initial navigation preview positions are set after construction.
    source = once(source, "        this.DOM.slides[this.current].classList.add('slides__img--current');", "        this.DOM.slides[this.current].classList.add('slides__img--current');\n        if (window.SourceDemo.reducedMotion) this.__vaultSettleReducedSlide();", relative + ' initial position');
    return source + watch;
  }
  if (relative !== 'src/js/index.js') return source;
  source = once(source, '// Animates the body color', paranoiaEntry + '\n// Animates the body color', relative + ' presentation');
  source = once(source, '    gsap.timeline()', '    __vaultBodyTimeline = gsap.timeline()', relative + ' body timeline');
  source = once(source, '    if ( slideshowMain.isAnimating ) return;', `    if ( slideshowMain.isAnimating ) return;

    if (window.SourceDemo.reducedMotion) {
        slideshowMain[dir]();
        slideshowNavPrev[dir]();
        slideshowNavNext[dir]();
        __vaultSettleReducedPresentation();
        return;
    }`, relative + ' intent');
  source = once(source, "navCtrls.next.addEventListener('click', () => onClickNavCtrlEv('next'));", `navCtrls.next.addEventListener('click', () => onClickNavCtrlEv('next'));
// Semantic keyboard activation uses the same intent, never click() or dispatchEvent().
for (const [dir, control] of Object.entries(navCtrls)) {
    control.addEventListener('keydown', event => {
        if (!event.isTrusted || event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
        event.preventDefault();
        onClickNavCtrlEv(dir);
    });
}
__vaultWatchReducedMotion(__vaultSettleReducedPresentation);`, relative + ' keyboard');
  return source + watch;
}

const stackMethods = `
    __vaultInitKeyboard() {
        this.DOM.items.forEach((item, index) => {
            const title = this.contentItems[index].DOM.title?.textContent?.trim().replace(/\\s+/g, ' ');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', 'Open ' + (title || 'image ' + (index + 1)));
            item.addEventListener('keydown', event => {
                if (!event.isTrusted || event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
                event.preventDefault();
                if (this.isOpen || this.isAnimating) return;
                this.__vaultKeyboardOpener = item;
                this.__vaultKeyboardFocusPending = true;
                this.open(item);
            });
        });
        this.DOM.navArrows.prev.setAttribute('aria-label', 'Previous image');
        this.DOM.navArrows.next.setAttribute('aria-label', 'Next image');
        this.__vaultFinishKeyboardState();
    }

    __vaultFinishKeyboardState() {
        const open = this.isOpen;
        this.DOM.items.forEach((item, index) => {
            item.tabIndex = open ? -1 : 0;
            item.setAttribute('aria-expanded', open && index === this.current ? 'true' : 'false');
        });
        this.DOM.backCtrl.tabIndex = open ? 0 : -1;
        this.DOM.navArrows.prev.tabIndex = open && this.current > 0 ? 0 : -1;
        this.DOM.navArrows.next.tabIndex = open && this.current < this.totalItems - 1 ? 0 : -1;
        this.contentItems.forEach((item, index) => item.DOM.el.setAttribute('aria-hidden', open && index === this.current ? 'false' : 'true'));
        if (!this.__vaultKeyboardOpener || window.SourceDemo.disposed) return;
        if (open && this.__vaultKeyboardFocusPending) {
            this.DOM.backCtrl.focus({preventScroll: true});
            this.__vaultKeyboardFocusPending = false;
        } else if (!open) {
            this.__vaultKeyboardOpener.focus({preventScroll: true});
            this.__vaultKeyboardOpener = null;
            this.__vaultKeyboardFocusPending = false;
        }
    }

    // These are the exact properties the pinned Flip build can temporarily
    // write. Authored background-image and the CSS composition are preserved.
    __vaultClearFlipState() {
        this.__vaultTimeline?.kill();
        Flip.killFlipsOf(this.DOM.items, false);
        gsap.killTweensOf([this.DOM.el, ...this.DOM.items, ...this.DOM.mainTitleTexts,
            ...this.contentItems.flatMap(item => item.DOM.texts), this.DOM.backCtrl,
            this.DOM.navArrows.prev, this.DOM.navArrows.next]);
        gsap.set(this.DOM.items, {clearProps: 'transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight,paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition'});
    }

    __vaultCommitReducedState() {
        const open = this.__vaultIntent === 'open' || (this.__vaultIntent == null && this.isOpen);
        const restoreScrollY = this.__vaultPendingScrollY;
        this.__vaultClearFlipState();
        const destination = open ? this.DOM.slides : this.DOM.stackWrap;
        if (this.DOM.el.parentNode !== destination) destination.appendChild(this.DOM.el);
        body.classList.toggle('oh', open);
        this.DOM.content.classList.toggle('content--open', open);
        this.DOM.items.forEach((item, index) => item.classList.toggle('stack__item--current', open && index === this.current));
        this.contentItems.forEach((item, index) => {
            const selected = open && index === this.current;
            item.DOM.el.classList.toggle('content__item--current', selected);
            gsap.set(item.DOM.texts, {yPercent: selected ? 0 : -101});
        });
        gsap.set(this.DOM.el, {y: open ? this.__vaultTargetY : 0});
        gsap.set(this.DOM.mainTitleTexts, {yPercent: open ? -101 : 0});
        gsap.set(this.DOM.backCtrl, {opacity: open ? 1 : 0});
        gsap.set(this.DOM.navArrows.prev, {y: open ? 0 : -100, opacity: open && this.current > 0 ? 1 : 0});
        gsap.set(this.DOM.navArrows.next, {y: open ? 0 : 100, opacity: open && this.current < this.totalItems - 1 ? 1 : 0});
        if (open) this.scrollObserver.enable(); else this.scrollObserver.disable();
        this.isOpen = open;
        this.isAnimating = false;
        if (open && restoreScrollY != null) document.documentElement.scrollTop = document.body.scrollTop = restoreScrollY;
        this.__vaultPendingScrollY = null;
        if (!open) this.current = -1;
        this.__vaultFinishKeyboardState();
    }

    __vaultOpenReduced(stackItem) {
        this.current = this.DOM.items.indexOf(stackItem);
        this.__vaultIntent = 'open';
        const scrollY = window.scrollY;
        body.classList.add('oh');
        this.DOM.content.classList.add('content--open');
        this.DOM.slides.appendChild(this.DOM.el);
        const itemCenter = stackItem.offsetTop + stackItem.offsetHeight / 2;
        this.__vaultTargetY = winsize.height / 2 - itemCenter + scrollY;
        // Match the author's Firefox scroll correction without an animation.
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.__vaultCommitReducedState();
        document.documentElement.scrollTop = document.body.scrollTop = scrollY;
    }

    __vaultNavigateReduced(direction) {
        const step = winsize.height / 2 + winsize.height * .02;
        this.__vaultTargetY = Number(gsap.getProperty(this.DOM.el, 'y')) + (direction === 'next' ? -step : step);
        this.current += direction === 'next' ? 1 : -1;
        this.__vaultIntent = 'open';
        this.__vaultCommitReducedState();
    }
`;

function transformStack(source, relative) {
  if (relative !== 'src/js/slideshow.js') return source;
  source = once(source, 'export class Slideshow {', 'export class Slideshow {' + stackMethods, relative + ' class');
  source = once(source, '\t\tthis.initEvents();', '\t\tthis.initEvents();\n        this.__vaultInitKeyboard();\n        __vaultWatchReducedMotion(() => this.__vaultCommitReducedState());', relative + ' constructor');
  source = once(source, '\t\tthis.isAnimating = true;\n\t\t\n\t\t// Update the current value', `        if (window.SourceDemo.reducedMotion) {
            this.__vaultOpenReduced(stackItem);
            return;
        }
        this.__vaultIntent = 'open';
\t\tthis.isAnimating = true;
\t\t
\t\t// Update the current value`, relative + ' open branch');
  source = once(source, '\t\tconst itemCenter = stackItem.offsetTop + stackItem.offsetHeight/2;', '\t\tconst itemCenter = stackItem.offsetTop + stackItem.offsetHeight/2;\n        this.__vaultTargetY = winsize.height/2 - itemCenter + scrollY;', relative + ' open geometry');
  source = once(source, '\t\tconst scrollY = window.scrollY;', '\t\tconst scrollY = window.scrollY;\n        this.__vaultPendingScrollY = scrollY;', relative + ' pending scroll');
  source = once(source, '\t\t\t\tthis.isOpen = true;', '\t\t\t\tthis.isOpen = true;\n                this.__vaultPendingScrollY = null;', relative + ' completed scroll');
  source = once(source, '\t\tthis.isAnimating = true;\n\n\t\tthis.scrollObserver.disable();', `        this.__vaultIntent = 'closed';
        if (window.SourceDemo.reducedMotion) {
            this.__vaultCommitReducedState();
            return;
        }
\t\tthis.isAnimating = true;

\t\tthis.scrollObserver.disable();`, relative + ' close branch');
  source = once(source, '\t\tthis.isAnimating = true;\n\n\t\tconst previousCurrent', `        if (window.SourceDemo.reducedMotion) {
            this.__vaultNavigateReduced(direction);
            return;
        }
        this.__vaultIntent = 'open';
        const __vaultStep = winsize.height / 2 + winsize.height * .02;
        this.__vaultTargetY = Number(gsap.getProperty(this.DOM.el, 'y')) + (direction === 'next' ? -__vaultStep : __vaultStep);
\t\tthis.isAnimating = true;

\t\tconst previousCurrent`, relative + ' navigate branch');
  const flipCalls = source.match(/\t\tFlip\.from\(state, \{/g) || [];
  if (flipCalls.length !== 2) throw new Error('Pinned reduced-motion source mismatch: Stack Flip calls');
  source = source.replace(/\t\tFlip\.from\(state, \{/g, '\t\tthis.__vaultTimeline = Flip.from(state, {');
  source = once(source, '\t\tgsap.timeline()', '\t\tthis.__vaultTimeline = gsap.timeline()', relative + ' navigation timeline');
  const completions = source.match(/\t\t\t\tthis\.isAnimating = false;/g) || [];
  if (completions.length !== 3) throw new Error('Pinned reduced-motion source mismatch: Stack completion callbacks');
  source = source.replace(/\t\t\t\tthis\.isAnimating = false;/g, '\t\t\t\tthis.isAnimating = false;\n                this.__vaultFinishKeyboardState();');
  return source + watch;
}

export async function transformSource({id, relative, source}) {
  if (id === 'mv2-art-directed-slideshow') return transformArt(source, relative);
  if (id === 'mv2-paranoia-filter') return transformParanoia(source, relative);
  if (id === 'mv2-stack-content') return transformStack(source, relative);
  return source;
}

export async function transformHTML({id, html}) {
  if (id === 'mv2-paranoia-filter') {
    for (const [dir, label] of [['prev', 'Previous slide'], ['next', 'Next slide']]) {
      const original = '<nav class="nav nav--' + dir + '">';
      const replacement = '<nav class="nav nav--' + dir + '" role="button" tabindex="0" aria-label="' + label + '">';
      if (html.includes(original)) html = once(html, original, replacement, 'Paranoia ' + dir + ' semantics');
    }
    // The complete nav is the one focus target, including on narrow layouts
    // where the authored nav__text is hidden. Avoid a nested interactive button.
    html = html.replace(/<button class="unbutton nav__text no-select">(Previous|Next)<\/button>/g, '<span class="unbutton nav__text no-select">$1</span>');
    if (!html.includes('data-vault-paranoia-keyboard')) {
      html = html.replace('</head>', '<style data-vault-paranoia-keyboard>.slideshow .nav[role="button"]:focus-visible{outline:2px solid currentColor;outline-offset:4px}@media(prefers-reduced-motion:reduce){.showreel:hover::before{animation:none}}</style></head>');
    }
  } else if (id === 'mv2-stack-content' && !html.includes('data-vault-stack-reduced')) {
    html = html.replace('</head>', '<style data-vault-stack-reduced>.stack__item[role="button"]:focus-visible,.content__back:focus-visible,.content__nav:focus-visible{outline:2px solid currentColor;outline-offset:4px}@media(prefers-reduced-motion:reduce){.stack__item,.content__nav svg{transition:none}}</style></head>');
  }
  return html;
}
