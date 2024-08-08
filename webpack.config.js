import copyPlugin from 'copy-webpack-plugin';
import path from 'path';
import terser from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import 'webpack-dev-server';

import packageJson from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testPath = 'http://127.0.0.1:1000/dist';
const prodPath = 'https://ddeeplb.github.io/BC-Responsive';
/** @type {boolean | undefined} */
const isTestServerUp = undefined;



const WEBPACK_DEV_SERVER_PORT = 1000;

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_DIR = path.join(__dirname, 'static');
const RESOURCES_DIR = path.join(__dirname, 'resources');

/**
 * 
 * @param {boolean} env
 * @returns {Promise<import('webpack').Configuration>}
 */
export default async function (env) {
  const mode = env.prod ? 'production' : 'development';
  const modVersion = packageJson.version;

  return {
    entry: {
      app: './src/Index.ts',
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      hot: false,
      open: false,
      client: false,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Expose-Headers': 'Content-Length',
        'Access-Control-Allow-Headers': 'Accept, Authorization, Content-Type, X-Requested-With, Range',
      },
      port: WEBPACK_DEV_SERVER_PORT,
    },
    mode: mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: 'css-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: 'sass-loader',
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.css', '.html'],
      alias: {
        '@Static': path.resolve(__dirname, 'node_modules/bc-deeplib/dist', 'Static'),
        '@Types': path.resolve(__dirname, 'node_modules/bc-deeplib/.types'),
        '_': path.resolve(__dirname, 'src')
      }
    },
    optimization: {
      minimize: false,
      minimizer: [
        new terser(),
      ],
    },
    plugins: [
      new copyPlugin({
        patterns: [
          { from: './src/Translations', to: 'translations' },
        ],
      }),
      new webpack.DefinePlugin({
        serverUrl: JSON.stringify(isTestServerUp ? testPath : prodPath),
      }),
      new webpack.BannerPlugin({
        banner: '/* eslint-disable */',
        raw: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
}


