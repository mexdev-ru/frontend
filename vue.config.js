module.exports = {
  // options...
  devServer: {
      proxy: process.env.VUE_APP_PROXY,
      //proxy: "*",
      port: process.env.VUE_APP_PORT
  }
/*    module.exports = {
        // options...
        devServer: {
            proxy: 'https://mywebsite/',
        }
    }*/
}