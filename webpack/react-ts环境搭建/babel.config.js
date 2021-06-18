
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 按需引入 polyfill
        corejs: 3,
      },
    ],
    "@babel/preset-react",
   "@babel/preset-typescript"
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
    '@babel/plugin-proposal-class-properties',// 类属性插件
    '@babel/plugin-proposal-object-rest-spread',// 扩展运算符
  ],
}