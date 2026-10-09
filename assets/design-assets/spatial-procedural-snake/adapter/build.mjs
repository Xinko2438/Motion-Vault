// Own esbuild configuration. Never imports or runs upstream Vite/config/build scripts.
import { createRequire } from 'node:module';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const deps = resolve(process.env.MOTION_SNAKE_DEPS || resolve(root,'adapter/npm'));
const esbuild = require(process.env.ESBUILD_PATH || resolve(root, '../../../tooling/node_modules/esbuild'));
if (esbuild.version !== '0.25.10') throw new Error('Build requires pinned esbuild 0.25.10');
const result = await esbuild.build({
  absWorkingDir: root,
  entryPoints: ['adapter/src/js/main.ts'],
  outfile: 'run/effect.js',
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  minify: false,
  sourcemap: 'linked',
  sourcesContent: true,
  metafile: true,
  legalComments: 'linked',
  nodePaths: [resolve(deps, 'node_modules')],
  define: { 'import.meta.env.DEV': 'false', 'import.meta.env.PROD': 'true' },
  banner: { js: '/* Motion Vault local source adapter. Original code: Sujen / Codrops, MIT. See ../LICENSE and ../provenance.json. Runtime/visual acceptance unverified. */' },
  plugins: [{
    name: 'local-source-files-only',
    setup(build) {
      build.onResolve({ filter: /\.glsl\?raw$/ }, args => ({ path: resolve(args.resolveDir, args.path.replace(/\?raw$/, '')), namespace: 'source-glsl' }));
      build.onLoad({ filter: /.*/, namespace: 'source-glsl' }, async args => ({ contents: await readFile(args.path, 'utf8'), loader: 'text' }));
      build.onLoad({ filter: /\.css$/ }, () => ({ contents: '', loader: 'empty' }));
    },
  }],
});
await writeFile(resolve(root, 'adapter/build-metafile.json'), JSON.stringify(result.metafile, null, 2) + '\n');
for (const [name, license] of [['three', 'LICENSE'], ['simplex-noise', 'LICENSE']]) {
  await copyFile(resolve(deps, 'node_modules', name, license), resolve(root, 'vendor-licenses', name + '-LICENSE.txt'));
}
console.log('Local source bundle built. Browser and WebGL runtime not exercised.');
