import { build } from "esbuild";

(async () => {
  const startTime = new Date(Date.now());

  try {
    await build({
      entryPoints: ["./src/Responsive.ts"],
      bundle: true,
      sourcemap: true,
      outfile: "./dist/main.js",
      format: "iife",
      globalName: "BCResponsive",
      loader: {
        ".css": "text" // This tells esbuild to treat .css files as text files
      },
      treeShaking: true,
      keepNames: true
    });

    const endTime = new Date(Date.now());
    const buildTime = endTime - startTime;

    const whenBuildedTime = endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    console.log("\x1b[32m✔ Done in " + buildTime + "ms at " + whenBuildedTime + ".\x1b[0m");
  } catch (error) {
    console.error("\x1b[31m✖ Build failed:", error, "\x1b[0m");
    process.exit(1);
  }
})();
