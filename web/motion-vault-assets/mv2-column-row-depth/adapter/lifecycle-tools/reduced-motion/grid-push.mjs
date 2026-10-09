/** Adapter-only transforms for pinned Codrops PushGridItems. Author sources stay immutable. */
export const contractById = {
  'mv2-grid-push': {
    reducedMotionStrategy: 'instant-fullscreen-reparent-and-return-without-Flip-or-neighbor-motion',
    reducedMotionSupport: 'source_path_present_runtime_unverified',
    keyboardSupport: 'source_path_present_runtime_unverified',
    notes: [
      'All three variants share the same selected-image intent for click, Enter, Space, and Escape. No synthetic pointer or click events are dispatched.',
      'Reduced motion reparents the original selected photo immediately, preserves every photo and its original grid owner, and restores the exact authored grid classes and inline styles on return.',
      'Normal-mode Flip durations, ease, scale/absolute/prune options, and direction logic remain authored. Input is locked until both animations complete; Escape, interruption, motion-preference changes, and disposal settle ownership deterministically.',
      'Source/state tests are not browser, visual, focus, assistive-technology, or mobile acceptance. Browser runtime remains unrun.'
    ],
  },
};

const marker = '// MotionVault Grid Push semantic state adapter.';
const adapter = String.raw`
// MotionVault Grid Push semantic state adapter.
let __vaultSelectedImage = null;
let __vaultSelectedItem = null;
let __vaultTransitioning = false;
let __vaultTargetFullscreen = false;
let __vaultSerial = 0;
let __vaultPending = 0;
let __vaultAnimations = [];
let __vaultEventsBound = false;
const __vaultInitialInert = gridElement.inert;
const __vaultOriginalNodes = [...gridItems, ...gridImages].map(node => ({
  node, className: node.getAttribute('class'), style: node.getAttribute('style'),
}));
const __vaultOriginalSemantics = [...gridImages].map(node => ({
  node, attrs: ['role', 'tabindex', 'aria-label', 'aria-expanded', 'aria-controls'].map(name => [name, node.getAttribute(name)]),
}));
const __vaultFullscreenAttrs = ['id', 'role', 'aria-label'].map(name => [name, fullscreenElement.getAttribute(name)]);
const __vaultSetAttribute = (node, name, value) => value === null ? node.removeAttribute(name) : node.setAttribute(name, value);
const __vaultRestoreGrid = () => {
  // Clear GSAP's transform cache as well as its inline declarations before restoring author styles.
  gsap.set(__vaultOriginalNodes.map(record => record.node), { clearProps: 'all' });
  __vaultOriginalNodes.forEach(({node, className, style}) => {
    __vaultSetAttribute(node, 'class', className);
    __vaultSetAttribute(node, 'style', style);
  });
};
const __vaultUpdateAccess = (open) => {
  gridElement.inert = open || __vaultInitialInert;
  gridImages.forEach((image, position) => {
    const selected = open && image === __vaultSelectedImage;
    image.tabIndex = open && !selected ? -1 : 0;
    image.setAttribute('aria-expanded', selected ? 'true' : 'false');
    image.setAttribute('aria-label', (selected ? 'Return image ' : 'Open image ') + (position + 1) + ' of ' + gridImages.length + (selected ? ' to grid' : ''));
  });
};
const __vaultCommit = (open, normalize, focus = true) => {
  const image = __vaultSelectedImage;
  const item = __vaultSelectedItem;
  if (image && item) (open ? fullscreenElement : item).appendChild(image);
  if (normalize || !open) __vaultRestoreGrid();
  isFullscreen = open && Boolean(image);
  __vaultTargetFullscreen = isFullscreen;
  __vaultTransitioning = false;
  __vaultPending = 0;
  __vaultAnimations = [];
  __vaultUpdateAccess(isFullscreen);
  if (focus && image && !window.SourceDemo.disposed) image.focus({ preventScroll: true });
  if (!isFullscreen) { __vaultSelectedImage = null; __vaultSelectedItem = null; }
};
const __vaultSettle = (open, focus = true) => {
  // Invalidate callbacks before killing them: a stale completion must never invert the state.
  ++__vaultSerial;
  const animations = __vaultAnimations;
  __vaultAnimations = [];
  animations.forEach(animation => animation?.kill());
  gsap.killTweensOf([...gridItems, ...gridImages]);
  __vaultCommit(open, true, focus);
};
const __vaultCompletePart = (serial) => {
  if (serial !== __vaultSerial || !__vaultTransitioning || window.SourceDemo.disposed) return;
  if (--__vaultPending === 0) __vaultCommit(__vaultTargetFullscreen, false);
};
const __vaultInterrupt = (serial) => {
  if (serial === __vaultSerial && __vaultTransitioning) __vaultSettle(__vaultTargetFullscreen);
};
const __vaultTrack = (animation) => {
  if (__vaultTransitioning && animation) __vaultAnimations.push(animation);
};
const __vaultKeyboard = (event) => {
  if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
  event.preventDefault();
  if (!event.repeat) __vaultActivateImage(event.currentTarget);
};
const __vaultEscape = (event) => {
  if (event.key !== 'Escape' || !__vaultSelectedImage || window.SourceDemo.disposed) return;
  event.preventDefault();
  if (__vaultTransitioning) __vaultSettle(false);
  else __vaultActivateImage(__vaultSelectedImage);
};
const __vaultMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const __vaultMotionChanged = () => {
  if (__vaultMotionQuery.matches && !window.SourceDemo.disposed && __vaultSelectedImage) {
    __vaultSettle(__vaultTransitioning ? __vaultTargetFullscreen : isFullscreen);
  }
};
__vaultMotionQuery.addEventListener('change', __vaultMotionChanged);
document.addEventListener('keydown', __vaultEscape);
window.SourceDemo.register({ dispose() {
  __vaultSettle(false, false);
  __vaultMotionQuery.removeEventListener('change', __vaultMotionChanged);
  document.removeEventListener('keydown', __vaultEscape);
  if (__vaultEventsBound) gridImages.forEach(image => {
    image.removeEventListener('click', toggleImage);
    image.removeEventListener('keydown', __vaultKeyboard);
  });
  __vaultEventsBound = false;
  __vaultOriginalSemantics.forEach(({node, attrs}) => attrs.forEach(([name, value]) => __vaultSetAttribute(node, name, value)));
  __vaultFullscreenAttrs.forEach(([name, value]) => __vaultSetAttribute(fullscreenElement, name, value));
  gridElement.inert = __vaultInitialInert;
} });
`;

function once(source, before, after, label) {
  if (!source.includes(before) || source.indexOf(before) !== source.lastIndexOf(before)) throw new Error('Grid Push pinned-source mismatch: ' + label);
  return source.replace(before, after);
}

export async function transformSource({ id, relative, source, isEntry }) {
  if (id !== 'mv2-grid-push' || !isEntry || !/^js\/demo[123]\/index\.js$/.test(relative)) return source;
  if (source.includes(marker)) return source;
  const variant = Number(relative.match(/demo([123])/)[1]);
  source = once(source, '// Animation defaults', adapter + '\n// Animation defaults', relative + ' insertion');
  source = once(source, 'const flipImage = (gridItem, gridImage) => {', 'const flipImage = (gridItem, gridImage) => {\n  const __vaultToken = __vaultSerial;', relative + ' flip token');
  const otherSignature = variant === 3 ? 'const moveOtherItems = (gridItem, directionClass) => {' : 'const moveOtherItems = (gridItem, gridImage) => {';
  source = once(source, otherSignature, otherSignature + '\n  const __vaultToken = __vaultSerial;', relative + ' neighbor token');
  const completion = `    onComplete: () => {\n      if (isFullscreen) {\n        gsap.set(gridItem, { zIndex: 'auto' });\n      }\n      isFullscreen = !isFullscreen;\n    }\n`;
  source = once(source, completion, '', relative + ' author completion');
  if (source.split('  Flip.from(state, {').length !== 3 || source.split('    ...animationDefaults,').length !== 3) throw new Error('Grid Push expected exactly two authored Flip paths: ' + relative);
  source = source.replaceAll('  Flip.from(state, {', '  return Flip.from(state, {').replaceAll('    ...animationDefaults,', '    ...animationDefaults,\n    onComplete: () => __vaultCompletePart(__vaultToken),\n    onInterrupt: () => __vaultInterrupt(__vaultToken),');
  const originalToggle = `const toggleImage = (ev) => {\n  const gridImage = ev.target;\n  const gridItem = gridItems[gridImage.dataset.index];\n  flipImage(gridItem, gridImage);\n${variant === 3 ? '  const directionClass = determineDirectionClassFromData(gridItem);\n  moveOtherItems(gridItem, directionClass);' : '  moveOtherItems(gridItem, gridImage);'}\n};`;
  const intent = `const __vaultActivateImage = (gridImage) => {
  if (window.SourceDemo.disposed || __vaultTransitioning || !Array.from(gridImages).includes(gridImage)) return;
  const gridItem = gridItems[gridImage.dataset.index];
  if (!gridItem || (isFullscreen && gridImage !== __vaultSelectedImage)) return;
  const opening = !isFullscreen;
  __vaultSelectedImage = gridImage;
  __vaultSelectedItem = gridItem;
  __vaultTargetFullscreen = opening;
  if (window.SourceDemo.reducedMotion) {
    __vaultSettle(opening);
    return;
  }
  ++__vaultSerial;
  __vaultPending = 2;
  __vaultTransitioning = true;
  __vaultAnimations = [];
  __vaultUpdateAccess(opening);
  __vaultTrack(flipImage(gridItem, gridImage));
  ${variant === 3 ? 'const directionClass = determineDirectionClassFromData(gridItem);\n  __vaultTrack(moveOtherItems(gridItem, directionClass));' : '__vaultTrack(moveOtherItems(gridItem, gridImage));'}
  gridImage.focus({ preventScroll: true });
};
const toggleImage = (event) => __vaultActivateImage(event.currentTarget || event.target);`;
  source = once(source, originalToggle, intent, relative + ' shared intent');
  source = once(source, 'const initEvents = () => {', `const initEvents = () => {
  if (__vaultEventsBound || window.SourceDemo.disposed) return;
  __vaultEventsBound = true;
  if (!fullscreenElement.id) fullscreenElement.id = 'vault-grid-fullscreen';
  fullscreenElement.setAttribute('role', 'region');
  fullscreenElement.setAttribute('aria-label', 'Selected image');`, relative + ' fullscreen semantics');
  source = once(source, '    gridImage.dataset.index = position;', `    gridImage.dataset.index = position;
    gridImage.setAttribute('role', 'button');
    gridImage.tabIndex = 0;
    gridImage.setAttribute('aria-expanded', 'false');
    gridImage.setAttribute('aria-controls', fullscreenElement.id);
    gridImage.setAttribute('aria-label', 'Open image ' + (position + 1) + ' of ' + gridImages.length);
    gridImage.addEventListener('keydown', __vaultKeyboard);`, relative + ' keyboard semantics');
  return source;
}

export async function transformHTML({ id, relative, html }) {
  if (id !== 'mv2-grid-push' || !/^index(?:2|3)?\.html$/.test(relative) || html.includes('data-vault-grid-focus')) return html;
  return once(html, '</head>', '<style data-vault-grid-focus>.grid__img[role="button"]:focus-visible{outline:3px solid #fff;outline-offset:-5px;box-shadow:inset 0 0 0 7px #111}</style></head>', relative + ' focus style');
}
