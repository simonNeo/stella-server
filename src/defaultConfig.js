const config = {
  server: {
    port: process.env.port || process.env.PORT,
    path: {
      page: '/pages',
      static: '/static'
    },
    db: {
      enable: false,
      modelPath: '/models'
    },
  }
}

module.exports = config