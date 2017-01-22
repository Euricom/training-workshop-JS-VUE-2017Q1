// polyfills for PhantomJS
require('phantomjs-polyfill')
require('core-js/es6/promise')

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context('../app', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)
