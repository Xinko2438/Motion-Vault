// Reproducible adapter-only repair. Never changes source/, vault-isolation.js, or project/.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { moveCSPToFront } from './lifecycle-tools/dom-csp-order.mjs';
const R = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esbuild = createRequire(import.meta.url)(process.env.MOTION_VAULT_ESBUILD || 'esbuild');
const configs = [JSON.parse(await fs.readFile(path.join(R, 'adapter/source-config.json')))];
const controls = await fs.readFile(path.join(R, 'adapter/lifecycle-tools/dom-lifecycle-controls.js'), 'utf8');
const supported = {
  'mv2-repeating-image': 'author-crossfade-and-native-scroll',
  'mv2-rotating-image-scroll': 'author-flat-native-scroll-plus-static-marquee',
  'mv2-hover-grid-reveal': 'instant-author-end-states-and-paused-video',
};
const initialPathLimitations = {
  'mv2-repeating-image': ['The authored crossfade checks the live preference, but the smooth-scroller choice is made on initial load. A preference change requires reloading to fully reconfigure the scroll mode.'],
  'mv2-rotating-image-scroll': ['Each author variant captures reduceMotion during initialization. Normal/reduced initial loads have source paths; live preference changes require reloading to reconfigure the geometry and scroll mode.'],
  'mv2-hover-grid-reveal': ['Reveal end states check the live preference and reduced mode pauses media. Automatic video restart when moving from reduced to normal motion is not implemented; reload is needed to recover the original autoplay state.'],
};
const blockers = {
  'mv2-art-directed-slideshow': 'All 16 authored variants attach wheel/touch/pointer Observer navigation and directional GSAP clip/scale timelines without a reduced-motion branch. Completing navigation and returning state must be tested per variant.',
  'mv2-satto-type-motion': 'ScrollSmoother, Flip reparenting/position changes, and ScrambleText initialize unconditionally. A static text arrangement has not yet been proved readable across the authored scroll groups.',
  'mv2-reflection-editorial': 'Both variants always initialize Lenis and reflected 3D/filter/scale scroll timelines. A static reflection and full readable item layout need explicit acceptance.',
  'mv2-grid-push': 'All three variants use Flip movement for both the selected image and neighboring positions. A zero-movement open/return path is absent and must preserve fullscreen state and item ownership.',
  'mv2-column-row-depth': 'All ten variants always initialize Lenis and scroll-triggered position/rotation/depth/image-scale animations. A static column/row layout has not been accepted.',
  'mv2-sticky-grid-story': 'The pinned grid timeline also controls content visibility, delays, and zoom. Simply skipping its initialization may hide narrative content, so no generic freeze/skip is claimed as a fallback.',
  'mv2-paranoia-filter': 'Next/previous changes drive three synchronized slideshows, titles, background color, and SVG/filter animation. The synchronized reduced-motion final states are not yet implemented.',
  'mv2-stack-content': 'The stack slideshow changes content layout, visibility, and open/close navigation. An immediate accessible content handoff and restoration path remain unproved.',
};
// Extension interface: each group owns one module, never this builder or pinned source.
// Hooks receive POSIX source-relative JS paths, or run-relative HTML names.
const reducedMotionDirectory = path.join(R, 'adapter/lifecycle-tools/reduced-motion');
const extensionModuleNames = new Set(['editorial.mjs', 'grid-push.mjs', 'scroll-layouts.mjs', 'slideshow.mjs']);
const extensionModules = [];
const extensionById = new Map();
let extensionNames = [];
try { extensionNames = (await fs.readdir(reducedMotionDirectory)).filter(name => extensionModuleNames.has(name)).sort(); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const name of extensionNames) {
  const filename = path.join(reducedMotionDirectory, name);
  const module = await import(pathToFileURL(filename).href);
  if (!module.contractById || typeof module.transformSource !== 'function') throw new Error('Invalid reduced-motion module interface: ' + name);
  const extension = { name, module, sha256: createHash('sha256').update(await fs.readFile(filename)).digest('hex') };
  extensionModules.push(extension);
  for (const id of Object.keys(module.contractById)) {
    if (!configs.some(config => config.id === id)) continue; // This standalone build owns only one asset.
    if (extensionById.has(id)) throw new Error('Two reduced-motion modules own the same adapter: ' + id);
    extensionById.set(id, extension);
  }
}
const relativePath = (root, filename) => path.relative(root, filename).split(path.sep).join('/');
async function extendSource(id, relative, source, isEntry) {
  const extension = extensionById.get(id);
  if (!extension) return source;
  const transformed = await extension.module.transformSource({ id, relative, source, isEntry });
  if (typeof transformed !== 'string') throw new Error('transformSource must return source text: ' + extension.name + '/' + relative);
  return transformed;
}
async function extendHTML(id, relative, html) {
  const extension = extensionById.get(id);
  if (!extension?.module.transformHTML) return html;
  const transformed = await extension.module.transformHTML({ id, relative, html });
  if (typeof transformed !== 'string') throw new Error('transformHTML must return HTML text: ' + extension.name + '/' + relative);
  return transformed;
}
const report = [];
function once(source, before, after, label) {
  if (!source.includes(before) || source.indexOf(before) !== source.lastIndexOf(before)) throw new Error('Expected one pinned-source match: ' + label);
  return source.replace(before, after);
}
function transformCommon(source) {
  source = source.replace(/new Lenis\(/g, 'window.SourceDemo.createLenis(Lenis,').replace(/gsap\.ticker\.add\(/g, 'window.SourceDemo.addTicker(gsap,').replace(/gsap\.ticker\.remove\(/g, 'window.SourceDemo.removeTicker(gsap,').replace(/(image\.decode\(\)\.then\(\(\) => \{)/g, '$1\n      if (window.SourceDemo.disposed) return;');
  // Imported animation runtimes must also be visible to the lifecycle adapter.
  // This covers nested modules (not just entries), notably Stack's Observer.
  if (/from\s+['"]gsap(?:\/gsap-core)?['"]/.test(source)) source += '\nwindow.gsap = gsap;\n';
  if (/from\s+['"]gsap\/Observer['"]/.test(source)) source += '\nwindow.Observer = Observer;\n';
  if (/from\s+['"]gsap\/ScrollTrigger['"]/.test(source)) source += '\nwindow.ScrollTrigger = ScrollTrigger;\n';
  return source;
}
function bindFinalPreload(source, id) {
  const index = source.lastIndexOf('\npreloadImages(');
  if (index < 0) throw new Error('No pinned preload tail: ' + id);
  let tail = source.slice(index + 1).trim();
  if (tail.endsWith(';')) tail = tail.slice(0, -1);
  if (tail.includes('.then(() => {')) tail = tail.replace('.then(() => {', '.then(() => {\n  if (window.SourceDemo.disposed) return;');
  else if (tail.includes('.then(() =>\n')) tail = tail.replace('.then(() =>\n', '.then(() => !window.SourceDemo.disposed &&\n');
  else if (tail.includes('.then(() => ')) tail = tail.replace('.then(() => ', '.then(() => !window.SourceDemo.disposed && ');
  else if (tail.includes('.then( _ => ')) tail = tail.replace('.then( _ => ', '.then( _ => !window.SourceDemo.disposed && ');
  else throw new Error('Unknown preload callback: ' + id);
  return source.slice(0, index + 1) + 'window.SourceDemo.bindInitialization(' + tail + ');\n';
}
function transformEntry(source, config, entry) {
  const id = config.id;
  if (id === 'mv2-repeating-image') {
    source = source.replace('sheets.load(imgURL).then(() => {', 'sheets.load(imgURL).then(() => {\n    if (window.SourceDemo.disposed) return;');
    source = once(source, "Promise.all([\n  preloadImages(", "window.SourceDemo.bindInitialization(Promise.all([\n  preloadImages(", id);
    source = once(source, "  document.body.classList.remove('loading');\n  init();\n});", "  if (window.SourceDemo.disposed) return;\n  document.body.classList.remove('loading');\n  init();\n}));", id + ' initialization');
    source += `\nwindow.SourceDemo.register({dispose() {\n  if (sheets) {\n    sheets.stop();\n    for (const entry of Object.values(sheets.programs || {})) sheets.gl.deleteProgram(entry.program);\n    sheets.gl.deleteBuffer(sheets.uvBuffer);\n    sheets.gl.getExtension('WEBGL_lose_context')?.loseContext();\n    sheets.canvas.remove(); sheets = null;\n  }\n  document.querySelectorAll('.mover').forEach(element => element.remove());\n}});\n`;
  } else if (id === 'mv2-rotating-image-scroll') {
    const prefix = "document.addEventListener('DOMContentLoaded', async () => {";
    source = once(source, prefix, "document.addEventListener('DOMContentLoaded', () => {\n  window.SourceDemo.bindInitialization((async () => {", id + ' init event');
    source = source.replace(/  animateMarquee\(\);/g, '  if (!reduceMotion) animateMarquee();');
    const isWebGL = source.includes("import * as THREE");
    if (isWebGL) source = once(source, "  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));", "  window.SourceDemo.watchRenderer(renderer);\n  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));", id + ' shader failure hook');
    source = once(source, "  document.body.classList.remove('loading');\n  init();\n});", "  if (window.SourceDemo.disposed) { " + (isWebGL ? "textures.forEach(texture => texture.dispose());" : "") + " return; }\n  document.body.classList.remove('loading');\n  init();\n" + (isWebGL ? "  render(); // First renderer submission is part of initialization; runtime visual acceptance remains separate.\n" : '') + "  })());\n});", id + ' init tail');
    if (isWebGL) source += `\nwindow.SourceDemo.register({dispose() {\n  for (const plane of planes) { plane.geometry?.dispose(); if (Array.isArray(plane.material)) plane.material.forEach(material => material.dispose()); else plane.material?.dispose(); }\n  textures.forEach(texture => texture.dispose());\n  renderer?.dispose(); renderer?.forceContextLoss();\n  scene?.clear(); planes = []; textures = [];\n}});\n`;
  } else if (id === 'mv2-satto-type-motion') {
    source = source.replace("const relatedItems = relatedEl.querySelectorAll('.grid__item');", "const relatedItems = relatedEl?.querySelectorAll('.grid__item') || [];");
    source = once(source, 'initFlips();\ninitScramble();\ninitRelatedDemos();', `window.SourceDemo.bindInitialization(Promise.resolve().then(() => {\n  if (window.SourceDemo.disposed) return;\n  initFlips();\n  initScramble();\n  if (relatedEl) initRelatedDemos();\n}));`, id);
  } else {
    source = bindFinalPreload(source, id);
    if (id === 'mv2-hover-grid-reveal') {
      const marker = '  // Cancel any ongoing animations to avoid conflicts';
      const fallback = `  // Adapter reduced-motion path: same author visibility/end states without displacement.\n  if (window.SourceDemo.reducedMotion) {\n    event.target.tlEnter?.kill(); event.target.tlLeave?.kill();\n    contentElement.classList.toggle('content--current', isShowing);\n    gsap.set(contentElement, {zIndex: isShowing ? 1 : 0});\n    gsap.set(bgElement, {opacity: isShowing ? 1 : 0});\n    gsap.set(contentTitle, {opacity: isShowing ? 1 : 0, scale: 1});\n    gsap.set(contentImages, {xPercent: 0, yPercent: 0, filter: 'brightness(100%)', clipPath: (index, target) => getClipPath(target)[isShowing ? 'to' : 'from']});\n    gsap.set(contentInnerImages, {scale: 1});\n    return;\n  }\n\n`;
      source = once(source, marker, fallback + marker, id + ' reduced toggle');
      source = source.replace(/duration: 0\.6,/g, 'duration: window.SourceDemo.reducedMotion ? 0 : 0.6,');
      source = source.replace("  workLinks.forEach(workLink => {", "  if (window.SourceDemo.reducedMotion) { video.pause(); video.autoplay = false; }\n  workLinks.forEach(workLink => {\n    workLink.addEventListener('focus', showWork);\n    workLink.addEventListener('blur', hideWork);");
    }
  }
  if (/from\s+['"]gsap['"]/.test(source)) source += '\nimport {gsap as __vaultLifecycleGsap} from "gsap"; window.gsap = __vaultLifecycleGsap;\n';
  if (/from\s+['"]gsap\/ScrollTrigger['"]/.test(source)) source += '\nwindow.ScrollTrigger = ScrollTrigger;\n';
  return transformCommon(source);
}
for (const config of configs) {
  const dir = R, sourceDir = path.join(dir, 'source'), run = path.join(dir, 'run');
  const adapter = path.join(dir, 'adapter');
  let jobs = JSON.parse(await fs.readFile(path.join(adapter, 'rebuild-jobs.json'), 'utf8')).map(job => ({ ...job, entry: path.join(R, job.entry), output: path.join(R, job.output) }));
  if (config.id === 'mv2-rotating-image-scroll') for (let i = 1; i <= 6; i++) jobs.push({ entry: path.join(sourceDir, 'js', i === 1 ? 'index.js' : `index${i}.js`), output: path.join(run, 'js', i === 1 ? 'index.js' : `index${i}.js`), classic: true });
  if (config.id === 'mv2-satto-type-motion') jobs.push({ entry: path.join(sourceDir, 'js/index.js'), output: path.join(run, 'js/index.js'), classic: true });
  const jobReport = [];
  const extension = extensionById.get(config.id);
  const groupContract = extension?.module.contractById[config.id] || {};
  const evidence = groupContract.reducedMotionStrategy || supported[config.id] || 'unsupported-needs-author-specific-fallback';
  const reducedMotionSupport = groupContract.reducedMotionSupport || (supported[config.id] ? 'source_path_present_runtime_unverified' : 'unsupported');
  if (!['source_path_present_runtime_unverified', 'unsupported'].includes(reducedMotionSupport)) throw new Error('Reduced-motion support must retain a runtime-unverified status: ' + config.id);
  const keyboardSupport = groupContract.keyboardSupport || 'author-controls-runtime-unverified';
  const reducedMotionLiveChangeSupport = groupContract.reducedMotionLiveChangeSupport || (initialPathLimitations[config.id] ? 'reload_required_for_full_mode_restore' : 'source_path_present_runtime_unverified');
  const header = controls + '\nwindow.SourceDemo.configure(' + JSON.stringify({ id: config.id, reducedMotion: evidence, reducedMotionSupport, reducedMotionLiveChangeSupport, keyboardSupport }) + ');\n';
  await fs.writeFile(path.join(run, 'vault-controls.js'), header);
  for (const job of jobs) {
    const original = await fs.readFile(job.entry, 'utf8');
    const rel = relativePath(sourceDir, job.entry);
    const transformed = await extendSource(config.id, rel, transformEntry(original, config, job.entry), true);
    const adapterEntry = path.join(adapter, 'lifecycle-entries', rel);
    await fs.mkdir(path.dirname(adapterEntry), { recursive: true });
    await fs.writeFile(adapterEntry, transformed);
    const result = await esbuild.build({
      absWorkingDir: dir, stdin: { contents: transformed, resolveDir: path.dirname(job.entry), sourcefile: job.entry, loader: 'js' },
      outfile: job.output, bundle: !job.classic, platform: 'browser', format: 'iife', target: 'es2020', minify: false, legalComments: 'inline', metafile: true,
      nodePaths: [path.join(adapter, 'node_modules')], loader: { '.glsl': 'text', '.vert': 'text', '.frag': 'text', '.jpg': 'file', '.png': 'file', '.webp': 'file' }, logLevel: 'warning',
      plugins: job.classic ? [] : [{ name: 'source-lifecycle-hooks', setup(build) {
        build.onLoad({filter: /\.js$/}, async args => {
          if (!args.path.startsWith(sourceDir + path.sep) || /\.min\.js$/.test(args.path)) return;
          return { contents: await extendSource(config.id, relativePath(sourceDir, args.path), transformCommon(await fs.readFile(args.path, 'utf8')), false), loader: 'js' };
        });
      } }],
    });
    await fs.writeFile(job.output + '.meta.json', JSON.stringify(result.metafile, null, 2));
    jobReport.push({ entry: path.relative(dir, job.entry), output: path.relative(dir, job.output), authorInitialization: 'explicit-promise-bound', firstRender: config.id === 'mv2-rotating-image-scroll' && !job.classic ? 'first-render-hook-present-runtime-not-run' : 'not-applicable', runtimeVerification: 'not_run' });
  }
  if (config.id === 'mv2-repeating-image') {
    const smoothPath = path.join(sourceDir, 'js/smoothscroll.js');
    await fs.writeFile(path.join(run, 'js/smoothscroll.js'), await extendSource(config.id, 'js/smoothscroll.js', transformCommon(await fs.readFile(smoothPath, 'utf8')), false));
  }
  for (const name of await fs.readdir(run)) if (/^index.*\.html$/.test(name)) {
    const filename = path.join(run, name); let html = await fs.readFile(filename, 'utf8');
    // Remove the old global reduced-motion CSS override too: author crossfades must remain semantic.
    html = html.replace(/@media\(prefers-reduced-motion:reduce\)\{\*,\*::before,\*::after\{animation-duration:\.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important\}\}/g, '');
    if (config.id === 'mv2-satto-type-motion') html = html.replace(/\s*<section class="related">[\s\S]*?<\/section>/, '');
    if (config.id === 'mv2-column-row-depth') html = html.replace(/\s*<section class="outro">[\s\S]*?<\/section>/, '');
    if (!html.includes('data-vault-reduced-loader')) html = html.replace('</head>', '<style data-vault-reduced-loader>@media(prefers-reduced-motion:reduce){.loading::after{animation:none!important;transform:none!important}}</style></head>');
    if (config.id === 'mv2-hover-grid-reveal') html = html.replace('<video autoplay muted loop class="background__video">', '<video autoplay muted loop preload="auto" playsinline class="background__video">');
    html = await extendHTML(config.id, name, html);
    html = moveCSPToFront(html);
    await fs.writeFile(filename, html);
  }
  const groupNotes = [...(Array.isArray(groupContract.notes) ? groupContract.notes : groupContract.notes ? [String(groupContract.notes)] : []), ...(initialPathLimitations[config.id] || [])];
  const item = { id: config.id, compatibility: 'needs_runtime', readiness: 'author-init-promise-plus-required-resources', reducedMotionStrategy: evidence, reducedMotionSupport, reducedMotionLiveChangeSupport, keyboardSupport,
    ...(extension ? { reducedMotionModule: 'adapter/lifecycle-tools/reduced-motion/' + extension.name, reducedMotionModuleSha256: extension.sha256 } : {}),
    variants: jobReport, sourceRepairNotes: groupNotes,
    limitations: ['No browser runtime or visual acceptance was performed by this repair.',
      ...(reducedMotionSupport === 'unsupported' ? [blockers[config.id], 'Reduced-motion fallback is not yet proved; do not integrate this family as compatible.'] : ['Reduced-motion source path exists; interactive layout, visual, keyboard, and interrupted-state acceptance remain runtime-pending.'])],
  };
  await fs.writeFile(path.join(adapter, 'lifecycle-contract.json'), JSON.stringify(item, null, 2));
  report.push(item); console.log(config.id, jobs.length, evidence);
}
await fs.writeFile(path.join(R, 'adapter/lifecycle-tools/rebuild-results.json'), JSON.stringify(report, null, 2));

await fs.writeFile(path.join(R, 'adapter/lifecycle-tools/reduced-module-results.json'), JSON.stringify({ modules: extensionModules.map(extension => ({ name: extension.name, sha256: extension.sha256, ids: Object.keys(extension.module.contractById) })), runtimeVerification: 'not_run' }, null, 2));
