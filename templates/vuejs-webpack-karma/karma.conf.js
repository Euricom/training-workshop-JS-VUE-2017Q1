const webpackConfig = require('./webpack/test.config')

module.exports = config => {
  config.set({

    files: [
      // only specify one entry point
      // and require all tests in there
      './test/karma.entry.js',
    ],

    preprocessors: {
      // add webpack as preprocessor
      './test/karma.entry.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      stats: 'errors-only',
    },

    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai-sinon'],
    reporters: ['mocha'],
    logLevel: config.LOG_INFO,
    singleRun: false,
    autoWatch: true,

  })
}
