const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');
const imgPath = path.resolve(__dirname, './src/assets/img');

// Common plugins
const plugins = [
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
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    path: distPath,
    filename: 'index.html',
  })
]

// Common rules
const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      'babel-loader',
    ],
  },
  {
    test: /\.css/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.(jpg|jpeg|png|gif|ico|eot|svg|ttf|woff|woff2|otf)$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: 'assets/[name]-[hash].[ext]'
    },
  },
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
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
    })
  )
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  );
}

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  context: srcPath,
  entry: {
    app: './index.js',
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: distPath,
    filename: 'app-[hash].js',
  },
  module: {
    rules,
  },
  resolve: {
    // These extensions are tried when resolving a file.
    extensions: [
      '.js',
      '.jsx',
      '.json',
    ],
  },
  plugins,
  devServer: {
    contentBase: isProd ? distPath : srcPath,
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
  }
};
