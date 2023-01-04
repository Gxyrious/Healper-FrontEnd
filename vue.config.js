const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://81.68.102.171:8081/',
        // target: 'http://localhost:8081/',
        changeOrigin: true
      },
    }
  }
})

