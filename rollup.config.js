import typescript from "@rollup/plugin-typescript";
import progress from "rollup-plugin-progress";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";
import copy from 'rollup-plugin-copy';


const config_d = {
    folder: "dist",
    input: "src/Responsive.ts",
    output: "dist/main.js",
    loader: "scr/loader.user.js",
}

const config = {
    input: `${config_d.input}`,
    output: {
        file: `${config_d.output}`,
        format: "iife",
        sourcemap: false,
        banner: ``,
    },
    treeshake: true,
    plugins: [
        copy({
            targets: [
                { src: `${config_d.loader}`, dest: `${config_d.folder}` }
            ]
        }),
        progress({ clearLine: true }),
        resolve({ browser: true }),
        typescript({ tsconfig: `tsconfig.json`, inlineSources: true }),
        commonjs(),
        cleanup({
            comments: 'none',
            sourcemap: false,
        })
    ],
}

export default config;
