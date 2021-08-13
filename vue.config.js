module.exports = {
  // options...
  devServer: {
      proxy: process.env.VUE_APP_PROXY,
      port: process.env.VUE_APP_PORT
  }
}