import { build } from 'esbuild';
import copy from 'esbuild-copy-files-plugin';
import progress from 'esbuild-plugin-progress';
import time from 'esbuild-plugin-time';
import fs from 'fs';

(async () => {
  const testPath = 'http://127.0.0.1:1000/dist';
  const prodPath = 'https://ddeeplb.github.io/BC-Responsive';
  /** @type {boolean | undefined} */
  let isTestServerUp = undefined;

  await new Promise((resolve) => {
    fetch(testPath)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  }).then((result) => {
    isTestServerUp = result;
  });

  await build({
    entryPoints: ['./src/Responsive.ts'],
    outfile: './dist/main.js',
    format: 'iife',
    globalName: 'Responsive',
    bundle: true,
    sourcemap: isTestServerUp,
    loader: {
      '.css': 'text',
      '.html': 'text'
    },
    treeShaking: true,
    keepNames: true,
    plugins: [
      copy({
        source: ['./src/Translations'],
        target: './dist/translations',
        copyWithFolder: false
      }),
      progress(),
      time()
    ],
  }).then(() => {
    let bundleContent = fs.readFileSync('./dist/main.js', 'utf-8');
    bundleContent = bundleContent.replace(
      '(() => {',
      `(() => {\nconst serverUrl = '${isTestServerUp ? testPath : prodPath}';`
    );
    fs.writeFileSync('./dist/main.js', bundleContent);
  }).catch(() => {
    process.exit(1);
  });
})();
