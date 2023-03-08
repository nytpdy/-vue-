module.exports = {
  devServer : {
    port : 8888,
    open : true,
    https : false,
    host : "localhost",
    proxy : {
      "/api" : {
        target : "http://localhost:4000/",
        changeOrigin : true,
        pathRewrite : {
          "^/api" : ""
        }
      }
    }
  },
  lintOnSave : false
}
