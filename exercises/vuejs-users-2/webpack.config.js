const env = process.env.NODE_ENV || 'development'

function config() {
  switch (env) {
    case 'production':
    case 'prod':
      return 'production'
    case 'development':
    case 'dev':
      return 'development'

    default:
      throw new Error(`Invalid or unknow environment: ${env}`)
  }
}

// eslint-disable-next-line
module.exports = require(`./webpack/${config()}.config.js`)
