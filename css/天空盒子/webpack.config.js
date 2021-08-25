const path = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer:{
    port:3050,
    hot:true,
    contentBase:'dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use:['style-loader','css-loader','postcss-loader','less-loader']

      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      }
    ]

  },
  resolve:{
    extensions:['*','.json','.js','.jsx','.ts','.tsx']
  },
  plugins: [
    new HtmlWbpackPlugin({
      title: '主入口',
      filename: 'index.html',
      chunks: ['main'],
      template:path.resolve(__dirname,'src/index.html')
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new Webpack.HotModuleReplacementPlugin()
  ],


}