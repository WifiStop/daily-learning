const path = require('path');
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),    
  },
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
     {
       test:/\.vue$/i,
       use:['vue-loader']
     }
    ]

  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      '@':path.resolve(__dirname,'./src')
    },
    extensions:['*','.js','.json','.vue']
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'vue测试',
      filename:'index.html'
    }),
    new vueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    
  ]



}