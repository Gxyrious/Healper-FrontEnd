const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://81.68.102.171:8081/',
        changeOrigin: true
      },
    }
  }
})
