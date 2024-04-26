import { build } from 'esbuild';
import copy from 'esbuild-copy-files-plugin';
import fs from 'fs';

(async () => {
  const serverPath = 'https://ddeeplb.github.io/BC-Responsive';

  await build({
    entryPoints: ['./src/Responsive.ts'],
    outfile: './dist/main.js',
    format: 'iife',
    globalName: 'Responsive',
    bundle: true,
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
      })
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
