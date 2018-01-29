const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const cmrhConf = require('./cmrh.conf');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  devtool: isProd ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[chunkhash].js',
    filename: 'bundle.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: [
                  'last 2 Chrome versions',
                  'last 2 ChromeAndroid versions',
                  'last 2 Edge versions',
                  'last 2 Firefox versions',
                  'last 2 FirefoxAndroid versions',
                  'last 2 iOS versions',
                  'last 2 Safari versions',
                ],
              },
              useBuiltIns: true,
            }],
            'stage-0',
          ],
          plugins: [
            ['transform-react-jsx', { pragma: 'preact.h' }],
            ['transform-runtime'],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                getLocalIdent(context, localIdentName, localName) {
                  return cmrhConf.generateScopedName(localName, context.resourcePath);
                },
                minimize: true,
                modules: true,
                sourceMap: !isProd,
              },
            },
            {
              loader: 'sass-loader',
              query: { sourceMap: true },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: true,
          pure_getters: true,
          toplevel: true,
          unsafe_math: true,
          warnings: !isProd,
        },
        mangle: {
          toplevel: true,
        },
        output: {
          // beautify: true,
        },
      },
    }),
    new ExtractTextPlugin({
      allChunks: true,
      disable: !isProd,
      filename: '[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      googleAnalytics: process.env.GA_TRACKING_ID,
      signalingServer: isProd && 'https://webrtc-discovery.herokuapp.com/',
      template: './src/template.ejs',
      title: 'Pong',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
