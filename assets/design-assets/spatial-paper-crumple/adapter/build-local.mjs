// Motion Vault's own build config. Upstream npm scripts/configs are not executed.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire(import.meta.url);
const esbuild = require(process.env.VAULT_ESBUILD || 'esbuild');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const result = await esbuild.build({
  absWorkingDir: path.join(root, 'adapter'), entryPoints: ['entry.js'],
  bundle: true, format: 'iife', platform: 'browser', target: ['chrome113','safari16.4'],
  outfile: path.join(root, 'run/effect.js'), legalComments: 'eof', minify: true,
  metafile: true, sourcemap: false, jsx: 'automatic',
  define: { 'import.meta.env.DEV': 'false', 'process.env.NODE_ENV': '"production"' },
  loader: { '.glsl': 'text', '.webp': 'file', '.glb': 'file', '.png': 'file' },
  assetNames: 'assets/[name]-[hash]', publicPath: './',
  plugins: [{name:'local-author-source',setup(build) {
    build.onResolve({filter:/\?(raw|url)$/}, args => ({path:path.resolve(args.resolveDir,args.path.replace(/\?(raw|url)$/,''))}));
    build.onResolve({filter:/^@\//}, async args => {
      const p=path.join(root,'adapter/author/src',args.path.slice(2));
      return build.resolve(p,{kind:args.kind,resolveDir:args.resolveDir});
    });
  }}],
});
fs.writeFileSync(path.join(root,'build-metafile.json'),JSON.stringify(result.metafile,null,2));
