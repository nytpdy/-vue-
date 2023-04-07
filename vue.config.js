module.exports = {
  devServer: {
    port: 8888,
    open: true,
    https: false,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:4000/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  lintOnSave: false
}
