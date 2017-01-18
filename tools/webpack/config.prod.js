// see https://webpack.js.org/guides/hmr-react/
// see https://github.com/Stanko/react-redux-webpack2-boilerplate

const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const srcPath = resolve(__dirname, '../../src');
const distPath = resolve(__dirname, '../../dist');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  entry: {
    app: './index.js',
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    filename: 'app-[hash].js',
    // the output file

    path: distPath,
  },

  context: srcPath,

  devtool: 'hidden-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader!sass-loader',
        }),
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        include: join(srcPath, 'assets'),
        query: {
          limit: 10000,
          name: 'assets/[name]-[hash].[ext]'
        },
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor-[hash].js',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new HtmlWebpackPlugin({
      template: join(srcPath, 'index.html'),
      // where to find the html template

      path: distPath,
      // where to put the generated file

      filename: 'index.html'
      // the output file name
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              'last 3 version',
              'ie >= 10',
            ],
          }),
        ],
        context: srcPath,
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),

    new ExtractTextPlugin('style-[hash].css'),
  ],

  devServer: {
    contentBase: distPath,
    historyApiFallback: true,
    port: 8080,
    compress: true,
    inline: false,
    hot: false,
  }
};
