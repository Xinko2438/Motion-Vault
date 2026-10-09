// This build file belongs to the adapter. No upstream Next config or lifecycle scripts run.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dependencyWorkspace = process.env.KINETIC_DEPS || path.resolve(root, '../../build/spatial-kinetic-images');
const tooling = process.env.MOTION_TOOLING || path.resolve(root, '../../../tooling');
const esbuild = createRequire(path.join(tooling, 'package.json'))('esbuild');
const sass = createRequire(path.join(dependencyWorkspace, 'package.json'))('sass');
const result = await esbuild.build({
    absWorkingDir: root,
    entryPoints: ['adapter/entry.jsx'], outfile: 'run/effect.js',
    bundle: true, format: 'iife', target: 'es2022', jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    minify: false, sourcemap: true, sourcesContent: true, legalComments: 'eof',
    nodePaths: [path.join(dependencyWorkspace, 'node_modules')],
    alias: { '@': path.join(root, 'adapter/src'), '@adapter': path.join(root, 'adapter') },
    loader: { '.js': 'jsx' }, metafile: true,
    plugins: [{name:'local-sass-library', setup(build) {
        build.onLoad({ filter: /\.scss$/ }, args => {
            const compiled = sass.compile(args.path, { style: 'expanded', silenceDeprecations: ['legacy-js-api', 'import'] });
            return { contents: compiled.css, loader: args.path.endsWith('.module.scss') ? 'local-css' : 'css', resolveDir: path.dirname(args.path) };
        });
    }}],
});
await fs.writeFile(path.join(root,'build-evidence.json'), JSON.stringify({ tool: 'esbuild', version: esbuild.version, sass: sass.info, ownConfig: true, upstreamScriptsExecuted: false, browserExecuted: false, metafile: result.metafile }, null, 2) + '\n');
console.log(`Bundled ${Object.keys(result.metafile.inputs).length} inputs locally; upstream runtime not executed.`);
