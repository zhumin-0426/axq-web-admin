/*
 * @Author: 码上talk|RC
 * @Date: 2021-05-05 08:09:30
 * @LastEditTime: 2021-08-27 16:01:45
 * @LastEditors: 码上talk|RC
 * @Description:
 * @FilePath: /web-admin/vue.config.js
 * @微信:  13680065830
 * @邮箱:  3189482282@qq.com
 * @oops: Just do what I think it is right
 */

const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/apiOpen/': {
        target: 'http://localhost:4003/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apiOpen': '/'
        }
      },
      '/apiPy/': {
        target: 'http://localhost:8100/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apiPy': '/'
        }
      },
      '/apiV1/': {
        target: 'http://localhost:11000/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apiV1': '/'
        }
      },
      '/apiAdmin/': {
        target: 'http://localhost:4000/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apiAdmin': '/'
        }
      }
    }
  },
  configureWebpack: {
    entry: ['@babel/polyfill', './src/main.js'],
    devtool: 'source-map'
  },
  css: {
    extract: false, // false表示开发环境,true表示生成环境
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 1920,
            viewportHeight: 1080,
            unitPrecision: 3,
            propList: [
              '*'
            ],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );
  }
};
function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('./src/assets/styles/mixins.less'),
        resolve('./src/assets/styles/var.less')
      ]
    });
}
function resolve (url) {
  return path.resolve(__dirname, url);
}
