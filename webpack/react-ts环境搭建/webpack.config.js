const path = require('path');
const Webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
  mode:'development',
  entry:path.resolve(__dirname,'src/index.tsx'),
  output:{
    filename:'[name].[hash:8].js',
    path:path.resolve(__dirname,'dist')
  },
  devServer:{
    port:4002,
    hot:true,
    contentBase:'dist',
    open:true
  },
  cache:{
    type: 'filesystem',
    cacheLocation: path.resolve(__dirname, './cache'),
    buildDependencies: {
      config: [__filename],
    }
  },
  module:{
    rules:[
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset/resource'
      },
      {
        test:/\.(t|j)sx?$/,
        loader:'babel-loader',
        exclude: /node_modules/,
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','postcss-loader','less-loader']
      }
    ]
  },
  resolve:{
    alias:{
      "@assets":path.resolve(__dirname,'src/assets'),
      "@":path.resolve(__dirname,'src')
    },
    extensions:['*','.json','.js','.jsx','.ts','.tsx']
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'src/index.html')
    }),
    new Webpack.HotModuleReplacementPlugin(),

  ]
}