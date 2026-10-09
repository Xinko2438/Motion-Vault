import { lifecycle } from './lifecycle.js';
import { preloadResources } from './resources.js';
(async()=>{await preloadResources();if(!lifecycle.disposed)await import('./author/src/js/main.ts');})().catch(error=>lifecycle.fail(error));
