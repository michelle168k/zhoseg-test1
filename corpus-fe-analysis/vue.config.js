const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_ENV === 'development' ? 'http://noj.tw:8787/api' : 'http://backend:8787/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        }
      }
    }
  },
  configureWebpack: {
    // plugins: [new VuetifyLoaderPlugin()]
  },
  transpileDependencies: ["vuetify"]
};
