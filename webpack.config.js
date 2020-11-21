const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV | 'development';

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, 'src', 'renderer', 'index.tsx'),
  cache: true,
  mode: mode,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist', 'renderer'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.join(__dirname, 'dist', 'renderer'),
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist', 'renderer'),
    compress: true,
    hot: true,
    port: 4000,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/renderer/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
