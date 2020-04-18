const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const dist = path.join(__dirname, 'dist')
const PROD = process.env.NODE_ENV === 'production' || 'development'

module.exports = {
  entry: ['babel-polyfill', './src/index.tsx'],
  mode: PROD,
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: dist,
  },
  devtool: PROD ? 'source-map' : 'eval',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
