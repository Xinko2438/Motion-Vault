// Importing utility function for preloading images
import { preloadImages } from '../utils.js';

// Registering Flip plugin
gsap.registerPlugin(Flip);

// Constants for class names
const POSITION_CLASSES = {
  NORTH: 'pos-north',
  SOUTH: 'pos-south',
  WEST: 'pos-west',
  EAST: 'pos-east',
};

const DIRECTIONS = ['pos-north', 'pos-south', 'pos-west', 'pos-east'];

// Selecting DOM elements
const gridElement = document.querySelector('.grid');
const gridItems = Array.from(gridElement.querySelectorAll('.grid__item')); // Convert NodeList to Array
const gridImages = gridElement.querySelectorAll('.grid__img');
const fullscreenElement = document.querySelector('.fullscreen');

// Flag to track fullscreen mode
let isFullscreen = false;


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

// Animation defaults
const animationDefaults = { duration: 0.6, ease: 'expo' };

// Function to flip the clicked image and animate its movement
const flipImage = (gridItem, gridImage) => {
  const __vaultToken = __vaultSerial;
  gsap.set(gridItem, { zIndex: 99 });
  const state = Flip.getState(gridImage);
  if (isFullscreen) {
    gridItem.appendChild(gridImage);
  } else {
    fullscreenElement.appendChild(gridImage);
  }

  return Flip.from(state, {
    ...animationDefaults,
    onComplete: () => __vaultCompletePart(__vaultToken),
    onInterrupt: () => __vaultInterrupt(__vaultToken),
    scale: true,
    prune: true,
  });
};

// Function to determine the direction class from data attribute
const determineDirectionClassFromData = (gridItem) => {
  const direction = gridItem.dataset.directionItems;
  switch (direction) {
    case 'north':
      return POSITION_CLASSES.NORTH;
    case 'south':
      return POSITION_CLASSES.SOUTH;
    case 'west':
      return POSITION_CLASSES.WEST;
    case 'east':
      return POSITION_CLASSES.EAST;
    default:
      // If no valid direction is specified, use a random direction
      return determineRandomDirectionClass();
  }
};

// Function to determine a random direction class
const determineRandomDirectionClass = () => {
  const randomIndex = Math.floor(Math.random() * DIRECTIONS.length);
  return DIRECTIONS[randomIndex];
};

// Function to move other items based on their position relative to the clicked item
const moveOtherItems = (gridItem, directionClass) => {
  const __vaultToken = __vaultSerial;
  // For the remaining images
  const otherGridItems = gridItems.filter(item => item !== gridItem);
  const state = Flip.getState(otherGridItems);

  otherGridItems.forEach(item => {
    if (directionClass) {
      item.classList.toggle(directionClass, !isFullscreen);
      //gsap.set(item, {scale: isFullscreen ? 1 : 0.8});
    }
  });

  return Flip.from(state, {
    ...animationDefaults,
    onComplete: () => __vaultCompletePart(__vaultToken),
    onInterrupt: () => __vaultInterrupt(__vaultToken),
    scale: true,
    prune: true,
    /*
    stagger: {
      each: 0.01,
      from: 'random'
    }
    */
  });
};

// Click event handler for the grid images
const __vaultActivateImage = (gridImage) => {
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
  const directionClass = determineDirectionClassFromData(gridItem);
  __vaultTrack(moveOtherItems(gridItem, directionClass));
  gridImage.focus({ preventScroll: true });
};
const toggleImage = (event) => __vaultActivateImage(event.currentTarget || event.target);

// Function to initialize event listeners for grid images
const initEvents = () => {
  if (__vaultEventsBound || window.SourceDemo.disposed) return;
  __vaultEventsBound = true;
  if (!fullscreenElement.id) fullscreenElement.id = 'vault-grid-fullscreen';
  fullscreenElement.setAttribute('role', 'region');
  fullscreenElement.setAttribute('aria-label', 'Selected image');
  gridImages.forEach((gridImage, position) => {
    // Save the index of the image
    gridImage.dataset.index = position;
    gridImage.setAttribute('role', 'button');
    gridImage.tabIndex = 0;
    gridImage.setAttribute('aria-expanded', 'false');
    gridImage.setAttribute('aria-controls', fullscreenElement.id);
    gridImage.setAttribute('aria-label', 'Open image ' + (position + 1) + ' of ' + gridImages.length);
    gridImage.addEventListener('keydown', __vaultKeyboard);
    // Add click event listener to the image
    gridImage.addEventListener('click', toggleImage);
  });
};

// Preloading images and initializing setup when complete
window.SourceDemo.bindInitialization(preloadImages('.grid__img').then(() => {
  if (window.SourceDemo.disposed) return;
  // Remove the loading class from the body
  document.body.classList.remove('loading');
  // Initialize event listeners
  initEvents();
}));
