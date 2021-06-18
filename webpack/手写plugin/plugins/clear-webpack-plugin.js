const fs = require('fs-extra')
const path = require('path');

class ClearWebpackPlugin{
  constructor(){

  }
  apply(compiler){
    compiler.hooks.beforeRun.tapAsync('ClearWebpackPlugin',(compilation,callback)=>{
        fs.remove(path.resolve(__dirname,'../dist'),(err)=>{
          console.error(err,"===")
        })
        callback()
    })
  }
}
module.exports = ClearWebpackPlugin