const path = require('path')

const webpackConfig = require('./webpack.config.js')
const {merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')//拷贝静态资源
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')//压缩js


module.exports = merge(webpackConfig,{
  mode:'production',
  devtool:'cheap-module-source-map',
  devServer:{
    port:3000,
    hot:true,
    contentBase:'dist'
  },
  plugins:[
    new CopyWebpackPlugin({
      patterns:[{
        from:path.resolve(__dirname,'src/assets'),
        to:path.resolve(__dirname,'dist/assets'),
      }]
    })
  ],
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        cache:true,
        parallel:true,
        sourceMap:true
      }),
      new OptimizeCssAssetsPlugin({}),

    ],
    splitChunks:{
      chunks:'all',
      cacheGroups:{
        libs:{
          name:"chunk-libs",
          test:/[\\/]node_modules[\\/]/,
          priority:10,
          chunks:"initial"
        }
      }
    }
  }
})
