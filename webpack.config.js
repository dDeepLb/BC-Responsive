import copyPlugin from 'copy-webpack-plugin';
import path from 'path';
import terser from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import 'webpack-dev-server';

import packageJson from './package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const WEBPACK_DEV_SERVER_PORT = 1000;

const testPath = 'http://localhost:' + WEBPACK_DEV_SERVER_PORT;
const prodPath = 'https://ddeeplb.github.io/BC-Responsive';

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const STATIC_DIR = path.join(__dirname, 'Static');
const RESOURCES_DIR = path.join(__dirname, 'Resources');

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
      app: path.join(SRC_DIR, 'Index.ts'),
    },
    output: {
      filename: 'main.js',
      path: DIST_DIR,
    },
    devServer: {
      hot: true,
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
    devtool: 'source-map',
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
        'Static': path.resolve(__dirname, 'node_modules/bc-deeplib/dist/Static/'),
        'Types': path.resolve(__dirname, 'node_modules/bc-deeplib/.types/'),
        '_': SRC_DIR
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
          { from: RESOURCES_DIR, to: 'Resources' },
          { from: STATIC_DIR, to: 'Static' },
        ],
      }),
      new webpack.DefinePlugin({
        PUBLIC_URL: JSON.stringify(mode === 'development' ? testPath : prodPath),
        MOD_VERSION: JSON.stringify(modVersion),
      }),
      new webpack.BannerPlugin({
        banner: '/* eslint-disable */',
        raw: true,
      }),
    ],
  };
}


