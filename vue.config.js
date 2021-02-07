const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/resources/web/wyl/threeText/' : '/',//新路径//http://game.vrupup.com
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  //webpack中loader配置
  chainWebpack: (config) => {
    config.resolve.alias
    .set('vue$', 'vue/dist/vue.esm.js')
    .set('@',resolve('src'))
    .set('components',resolve('src/components'))
    .set('views',resolve('src/views'))
    .set('assets',resolve('src/assets'))
    .set('base',resolve('src/base'))
    .set('api',resolve('src/api'))
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: 8888,// 端口
    proxy: {
      '/api': {
        target: 'https://api.topsales.net.cn/open', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 输出文件目录
  outputDir: 'dist',
  // css相关配置
  css: {
    sourceMap: true, // 开启 CSS source maps
    loaderOptions: {// css预设器配置项
      less: {
        javascriptEnabled: true,
      },
      stylus: {
        // import: path.resolve(__dirname, './src/styles/global.styl')
      }
    }
  },
  //webpack配置
  configureWebpack: config => {},
  // 第三方插件配置
  pluginOptions: { }
}