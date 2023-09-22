const esbuild = require('esbuild');

(async () => {
  const startTime = Date.now();

  try {
    await esbuild.build({
      entryPoints: ['./src/Responsive.ts'],
      bundle: true,
      outfile: './dist/main.js',
      format: 'iife',
      globalName: 'BCResponsive'
      
    });

    const endTime = Date.now();
    const buildTime = endTime - startTime;

    const currentDate = new Date(endTime);
    const whenBuildedTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}`

    console.log('\x1b[32m✔ Done in ' + buildTime + 'ms at ' + whenBuildedTime + '.\x1b[0m');
  } catch (error) {
    console.error('\x1b[31m✖ Build failed:', error, '\x1b[0m');
    process.exit(1);
  }
})();