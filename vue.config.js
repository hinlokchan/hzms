module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // proxy: {
        //     '/api':{
        //         target:'http://demo.hinlok.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/api': {
              target: 'http://demo.hinlok.com',
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          },
    }
}