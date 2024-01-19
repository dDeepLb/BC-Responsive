import { build } from 'esbuild';
import progress from 'esbuild-plugin-progress';
import time from 'esbuild-plugin-time';
import copy from 'esbuild-copy-files-plugin';
import fs from 'fs';

const config = {
  development: {
    serverPath: 'http://127.0.0.1:1000/dist'
  },
  production: {
    serverPath: 'https://ddeeplb.github.io/BC-Responsive'
  }
};

(async () => {
  const environment = process.env.NODE_ENV || 'development';

  const serverPath = config[environment].serverPath;

  await build({
    entryPoints: ['./src/Responsive.ts'],
    bundle: true,
    sourcemap: true,
    outfile: './dist/main.js',
    format: 'iife',
    globalName: 'Responsive',
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
      `(() => {\nconst serverUrl = '${serverPath}';`
    );
    fs.writeFileSync('./dist/main.js', bundleContent);
  }).catch((error) => {
    process.exit(1);
  });
})();
