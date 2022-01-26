module.exports = {
  // options...
  devServer: {
      proxy: process.env.VUE_APP_PROXY,
      //proxy: "*",
      host: process.env.VUE_APP_HOST,
      port: process.env.VUE_APP_PORT,
      public: process.env.VUE_APP_HOST + ':' + process.env.VUE_APP_PORT,
  }
/*    module.exports = {
        // options...
        devServer: {
            proxy: 'https://mywebsite/',
        }
    }*/
}