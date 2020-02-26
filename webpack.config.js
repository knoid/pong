const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    chunkFilename: '[name].[chunkhash].js',
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: isProd ? 'production' : 'development',
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent(context, localIdentName, localName) {
                  return cmrhConf.generateScopedName(localName, context.resourcePath);
                },
              },
              sourceMap: !isProd,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
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
