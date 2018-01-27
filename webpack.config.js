const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cmrhConf = require('./cmrh.conf');
const path = require('path');
const webpack = require('webpack');

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
                browsers: 'last 2 versions',
                uglify: true,
              },
              useBuiltIns: true,
            }],
            'stage-0',
          ],
          plugins: [
            ['transform-react-jsx', { pragma: 'preact.h' }],
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true,
        warnings: !isProd,
      },
      sourceMap: true,
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
