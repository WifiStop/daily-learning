const path = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool:'eval-cheap-module-source-map',
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer:{
    port:4000,
    hot:true,
    contentBase:'dist',
    open:true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          path.resolve(__dirname,'./loader/drop-console.js')
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWbpackPlugin({
      title: '去除console的loader',
      template:path.resolve(__dirname,'./src/index.html')
    }),
    new CleanWebpackPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}