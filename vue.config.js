module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    host: '127.0.0.1',
    open: true,
    // port: 8081,
    proxy: {
      '/': {
        ws: false,
        target: 'http://47.97.195.97:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '',
}