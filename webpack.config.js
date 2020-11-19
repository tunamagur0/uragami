const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  // ファイルタイプ毎の処理を記述する
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        // ローダーの指定
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
      template: './dist/renderer/index.html',
    }),
  ],
};
