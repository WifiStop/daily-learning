const path = require('path');
const webpack = require('webpack')
const HtmlWbpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const firstPlugin = require('./plugin/webpack-firstPlugin')

module.exports={
  mode:'development',
  entry:path.resolve(__dirname,'src/index.js'),
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(__dirname,'dist')
  },
  devServer:{
    port:4001,
    hot:true,
    contentBase:'dist',
    // open:true
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"]
            }
          }        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWbpackPlugin({
      template:path.resolve(__dirname,'src/index.html')
    }),
    new CleanWebpackPlugin(),
    new firstPlugin()
  ]
}