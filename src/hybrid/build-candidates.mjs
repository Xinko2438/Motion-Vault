// Refresh candidate data and the same gallery, without rebuilding the unchanged formal effect engine.
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {root,buildCandidateCatalog,assembleGallery} from '../../scripts/build-hybrid.mjs';
const formal=JSON.parse(await readFile(path.join(root,'catalog.json'),'utf8'));
const candidates=await buildCandidateCatalog(formal.taxonomy);
const gallery=await assembleGallery(formal,candidates);
console.log(JSON.stringify({...gallery,staged:'.runtime/hybrid-assets/staged',pending:candidates.count-candidates.localReady,productionChanged:false}));
