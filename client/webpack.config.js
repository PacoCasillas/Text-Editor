const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Added html webpack plugin
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),

      // Added workbox plugin
      new InjectManifest(
        {
          swSrc: './src-sw.js',
          swDest: 'sw.js',
        }
      ),

      // Added manifest plugin
      new WebpackPwaManifest({
        // name of the generated manifest file
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple note taking app',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        // path to the icon
        start_url: '/',
        publicPath: '/',
        // configure the icons
        icons: [
          {
            // path to the generated icon file
            src: path.resolve('src/images/logo.png'),
            // multiple icon generation (different sizes)
            sizes: [96, 128, 192, 256, 384, 512],
            // destination folder
            destination: path.join('src', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel-preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
