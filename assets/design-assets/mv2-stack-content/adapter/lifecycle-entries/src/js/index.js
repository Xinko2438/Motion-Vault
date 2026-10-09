import { preloadImages } from './utils';
import { Slideshow } from './slideshow';

const slideshow = new Slideshow(document.querySelector('.stack'));

// Preload images
window.SourceDemo.bindInitialization(preloadImages('.stack__item').then( _ => !window.SourceDemo.disposed && document.body.classList.remove('loading')));
