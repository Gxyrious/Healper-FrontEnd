const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', // 暂时后端放在本地，后续调研自动化部署方法如jekins
        changeOrigin: true
      },
    }
  }
})
