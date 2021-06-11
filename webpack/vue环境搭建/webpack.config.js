const path = require('path');
const Webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.argv.indexOf('--mode=production') === -1;
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),    
  },
  cache:{
      type: 'filesystem',
        cacheLocation: path.resolve(__dirname, './cache'),
        buildDependencies: {
          config: [__filename],
        }
    },
  devServer:{
    port:3000,
    hot:true,
    contentBase:'dist',
    open: true, 
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
     {
       test:/\.(le|c)ss$/,
       use:[
         {
          loader:devMode?'vue-style-loader':MiniCssExtractPlugin.loader,
          options:{
            publicPath:"dist/css/",
            hmr:devMode
          }
       },'css-loader', {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [["autoprefixer", {}], ["postcss-preset-env"]]
          }
        }
      }]
     },
     {
      test: /\.(t|j)sx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.png/,
      type: 'asset/resource'
    },
    ]

  },
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    },
    extensions:['*','.js','.json','.vue','.ts']
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'./src/index.html')
    }),
    new VueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    })

  ]



}