const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [{ test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  devtool: 'eval-source-map',
};

const renderConfig = {
  ...commonConfig,
  name: 'renderConfig',
  target: 'electron-renderer',
  entry: './src/render/index.jsx',
  output: {
    path: `${__dirname}/build`,
    filename: 'render.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(s[ac]ss|css)$/,
        use: ['style-loader', { loader: 'css-loader', options: { url: false } }, 'sass-loader'],
        exclude: /\.module\.(s[ac]ss|css)$/,
      },

      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'sass-loader',
        ],
        include: /\.module\.(s[ac]ss|css)$/,
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './build',
    host: require('os').hostname().toLowerCase(),
    port: 8000,
  },
};

const mainConfig = {
  ...commonConfig,
  name: 'mainConfig',
  target: 'electron-main',
  entry: './src/main/index.js',
  output: {
    path: `${__dirname}/build`,
    filename: 'main.js',
  },
};

const clientConfig = {
  ...commonConfig,
  name: 'clientConfig',
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
    }),
  ],
};

module.exports = (env, argv) => [renderConfig, mainConfig, clientConfig];
