//MD5 69A9916A949CFAD7
'use strict'
const modeEnv = process.env.VUE_APP_MODE_ENV
const port = 8080
let publicPath = '/'
switch (modeEnv) {
  case 'production':
    publicPath = '/'
    break
  case 'test':
    publicPath = '/hzms/hzht'
    break
  default:
    break
}
module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    publicPath: publicPath,
    outputDir: 'hzht',
    lintOnSave: true,
    devServer: {
      open: true,
      port: port,
      overlay: {
        warnings: false,
        errors: true
      },
        proxy: {
          '/api': {
            target: process.env.VUE_APP_PROXY_URL,
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
          },
          '/tyshxydm': {
            target: 'https://public.creditchina.gov.cn',
            changeOrigin: true,
            pathRewrite: {
              '^/tyshxydm': ''
            }
          },
          [process.env.VUE_APP_PROXY_API]: {
            target: `http://127.0.0.1:${port}/mock`,
            changeOrigin: true,
            pathRewrite: {
              ['^' + process.env.VUE_APP_PROXY_API]: ''
            }
          }
        }
    }
}