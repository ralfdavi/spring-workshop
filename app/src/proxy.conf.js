const PROXY_CONFIG = [
    {
      context: ['/api'],
      target: 'http://localhost:8080',
      secure: false,
      logLevel: 'debug',
      pathRewrite: {
      "^/posts": ""
    },
      changeOrigin: true
    }
  ]
  
  module.exports = PROXY_CONFIG;