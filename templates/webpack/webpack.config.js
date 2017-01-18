function config () {
    switch (process.env.NODE_ENV) {
    case 'production':
    case 'prod':
        return 'production'
    case 'test':
        return 'test'
    default:
        return 'development'
    }
}

module.exports = require(`./webpack/${config()}.js`)
