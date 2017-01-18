# Introduction to WebPack
<img src="./images/webpack.png" width="800px" /><br>
<small>by Peter Cosemans</small>

---

# WebPack (quick start)

> Webpack is easier then you think

----

## Install webpack

```
npm install webpack -g
```

> The webpack command is now available globally.
However, this is not a recommended practice. This locks you down to a specific version of webpack and might fail in projects that use a different version.

Install webpack (v2.x) locally

```bash
npm install webpack@2.2.0 --save-dev  # yarn add webpack@2.2.0 --dev
```

----

## A sample service

userService.js

```js
// a commonJS module
function userService() {
    this.getById = function(id) {
        return { id: 123, name: 'peter' }
    }
    this.getAll = function() {
        return [
            { id: 123, name: 'peter' },
            { id: 222, name: 'robbert' }
        ]
    }
}
module.exports = new userService();
```

main.js

```js
var userService = require('./userService');
var users = userService.getAll();
users.forEach(function(user) {
  console.log(user.id, user.name);
});
```

----

## A sample service

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webpack 101</title>
</head>
<body>
  <h1>Webpack 101</h1>
  <script src="bundle.js"></script>
</body>
</html>
```

----

## Config

A minimal config file

```js
// webpack.config.js
module.exports = {
    entry: './main.js',                 // app entry file
    output: {
        filename: 'bundle.js'           // bundle output filename
    }
};
```

A more complete config

```js
// webpack.config.js
module.exports = {
    entry: {
        app: './main.js',               // app entry file
        vendor: './vendor.js',          // vendor entry file
    },
    output: {
        path: __dirname + '/dist'       // output folder
        filename: 'bundle.js',          // bundle output filename
        publicPath: "/dist/"            // path used inside bundle file
    },
    module: {
        rules: [...],                   // rules how to process files
    },
    plugins: [...]                      // additional plugins
};
```

----

## Bundle it

Via command line (when installed globally)

```
webpack         // for building once for development
webpack -p      // for production (minification)
webpack --watch // watch file changes and rebuild
webpack -d      // include source maps
```

Via npm (when installed locally)

```json
"scripts": {
    "build": "webpack"
}
```

----

### Run the app

Open your app with [serve](https://www.npmjs.com/package/serve) or [live-server](https://www.npmjs.com/package/live-server)

```
$ live-server
Serving "/Users/me/git/vue-webpack" at http://127.0.0.1:8080
```

----

### WebPack 2 : Native Support for ES6 Modules

```js
// ./userService.js
export function userService() {
    this.getById = function(id) {
        return { id: 123, name: 'peter' }
    }
    this.getAll = function() {
        return [
            { id: 123, name: 'peter' },
            { id: 222, name: 'robbert' }
        ]
    }
}
```

```js
// ./main.js
import { userService } from './userService';
var users = userService.getAll();
users.forEach(function(user) {
    console.log(user.id, user.name);
});
```

> It just works

----

## Add jquery

Install

```bash
npm install jquery --save # yarn add jquery
```

Add some html

```html
<ul id="list" />
```

and use it

```js
// main.js
var userService = require('./userService');
var $ = require('jquery');

var users = userService.getAll();
users.forEach(function(user) {
    $('#list').append('<li>' + user.name + '</li>');
});
```

----

## Add jquery

When running webpack we can see jquery is bundled with our own code.

```
$ webpack
Hash: f7e4f8b006ab65596006
Version: webpack 2.2.0-rc.3
Time: 295ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  271 kB       0  [emitted]  [big]  main
   [0] ./~/jquery/dist/jquery.js 267 kB {0} [built]
   [1] ./userService.js 621 bytes {0} [built]
   [2] ./main.js 227 bytes {0} [built]
```

---

# Dev Server

> No need to start your own web server

The Webpack-dev-server combines automatic refresh (after bundle rebuild), faster bundeling and hot module replacement.

----

## Setup

Setup

```bash
# install
npm install webpack-dev-server@2.2.0-rc.0 --save-dev
```

```json
// package.json
...
"scripts": {
    "build": "webpack",
    "serve": "webpack-dev-server --open"
}
```

```js
// webpack.config.js
module.exports = {
    output: {
        filename: 'bundle.js',
        publicPath: '/'                 // required for webpack-dev-server
    },
    ...
    devServer: {
        historyApiFallback: true,       // support for html5 mode
        noInfo: true,                   // limit output
        proxy: {                        // proxy all url from /api  to ...
            '/api': {
                target: 'https://other-server.example.com',
            }
        }
    }
    ...
}
```

----

## Run

```
yarn serve v0.18.1
$ webpack-dev-server --open
Project is running at http://localhost:8008/
webpack output is served from /
404s will fallback to /index.html
webpack: wait until bundle finished: /
Hash: 2ad2b42ecd25c7fccb01
Version: webpack 2.2.0-rc.6
Time: 1232ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  515 kB       0  [emitted]  [big]  main
chunk    {0} bundle.js (main) 500 kB [entry] [rendered]
   [34] ./main.js 175 bytes {0} [built]
   [35] (webpack)-dev-server/client?http://localhost:8008 4.66 kB {0} [built]
   [36] ./~/ansi-regex/index.js 135 bytes {0} [built]
   [37] ./userService.js 170 bytes {0} [built]
   [39] ./~/events/events.js 8.33 kB {0} [built]
   [40] ./~/jquery/dist/jquery.js 267 kB {0} [built]
   [42] ./~/punycode/punycode.js 14.7 kB {0} [built]
   [45] ./~/querystring-es3/index.js 127 bytes {0} [built]
   [48] ./~/sockjs-client/lib/entry.js 244 bytes {0} [built]
   [74] ./~/strip-ansi/index.js 161 bytes {0} [built]
   [76] ./~/url/url.js 23.3 kB {0} [built]
   [77] ./~/url/util.js 314 bytes {0} [built]
   [78] (webpack)-dev-server/client/socket.js 856 bytes {0} [built]
   [80] (webpack)/hot/emitter.js 77 bytes {0} [built]
   [81] multi (webpack)-dev-server/client?http://localhost:8008 ./main.js 40 bytes {0} [built]
     + 67 hidden modules
webpack: bundle is now VALID.
```

>  The browser is automatically opened.

Mark that no bundle file is created. All is done in memory.

----

## Output to folder

```js
    output: {
        filename: 'bundle.js',
        path: __dirname + '/bundle',        // separate folder
        publicPath: '/bundle/'
    },
```

The `publicPath` specifies the public URL address of the output files when referenced in a browser.

Specify the bundle folder in your html file

```html
<script src="bundle/bundle.js"></script>
```

---

# Modules (and rules)

> Webpack can bundle any kind of file.

Webpack 'Modules' determine how the different types of modules (files) within a project will be handled.

----

## Add babel support

Babel can help us with:

- ES.Next
- JSX

Install babel-loader (webpack) & babel

```bash
yarn add babel-core babel-preset-latest babel-preset-stage-2 --dev
yarn add babel-loader --dev
```

Configure babel (simplified)

```json
// .babelrc
{
  "presets": ["latest", "stage-2"]
}
```

> More information about babel and its configuration see:[https://babeljs.io/](https://babeljs.io/).

----

## Add babel support

Configure babel-loader in webpack

```js
  // webpack.config.js
  output: {
    ...
  },
  module: {
    rules: [
        {
            test: /\.js$/,              // apply babel-loader for any js file
            loader: 'babel-loader',
            exclude: /node_modules/     // except in node_modules
        }
    ]
  }
  ...
```

> More information about the babel-loader see: [https://github.com/babel/babel-loader](https://github.com/babel/babel-loader)

----

## Add CSS support

Install some more loaders:

    npm install style-loader css-loader url-loader --save-dev

Add the css rule in your webpack.config.js

    { test: /\.css$/, loader: 'style-loader!css-loader' }

Add a style sheet

    // style.css
    body {
        background: tomato;
    }

And require the file in your main.js

```js
// in your modules just require the stylesheet
// This has the side effect that a <style>-tag is added to the DOM.
require("./style.css");
```

> Re-run webpack and “ta-da”!

----

## Add SASS support

Install loader (and dependencies):

```bash
npm install sass-loader node-sass --save-dev
```

Add the rule in your webpack.config.js

```js
{ test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }
```

----

## Add SASS support

rename your css to sass

```bash
mv style.css style.scss
```

require (or import) your scss file

```js
require("./style.scss");
```

and write some sass code

```css
$primary-color: LightGray;
body {
    background: $primary-color;
}
```

---

# Plugins

> All what you can't do with a rule

Global extentions on top of the WebPack functionality

Plugin configuration

```
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [...]         // <- add your plugins here
};
```

----

## Add predefined variables

Injected variable into our javascript code:

```js
const webpack = require('webpack')
const pkg = require('./package.json')

const env = {
  NODE_ENV: process.env.NODE_ENV || 'dev',
  VERSION: pkg.version,
  BUILD_DATE: Date.now(),
}
```

```js
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(env)
        })
    ]
};
```

In your code you can use the variable:

```js
console.log('Environment: ', process.env);
```

----

## Uglify & Minimize

```js
plugins: [

    // uglify JS (obscure & minimize)
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    // minimize other files (css, ...)
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })

]
```

----

## Many more plugins

* Utility
    * webpack.NoErrorsPlugin
    * webpack.ProvidePlugin
    * html-webpack-plugin
    * extract-text-webpack-plugin
    * browser-sync-webpack-plugin
    * ...

* Optimize

    - webpack.optimize.UglifyJsPlugin
    - webpack.optimize.DedupePlugin
    - webpack.optimize.CommonsChunkPlugin
    - compression-webpack-plugin
    - ...

---

# More advanced setup

> A more production ready config

----

## DevTool

Choose a developer tool to enhance debugging.

```js
module.exports = {
    ...
    devtool: 'sourcemap'
}
```

See https://webpack.github.io/docs/configuration.html#devtool

----

## Build for other environments

```bash
# OSX
NODE_ENV=production webpack

# Windows
set NODE_ENV=production && webpack

# Multi platform
cross-env NODE_ENV=production webpack
```

```json
// package.json
...
"scripts": {
    "build": "cross-env NODE_ENV=production webpack",
}
```

```js
module.exports = {
    output: {
        ...
    }
    ...
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        // add here your optimize plugins
    ])
}
```

----

## Extract text (css) from bundle

By default webpack will bundle all in one module. But for css we typically want a separate style.css file.

```bash
npm install --save-dev extract-text-webpack-plugin@^2.0.0-beta # beta !!!
```

setup config

```js
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    ...
    module: {
        rules: [
            // {  test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader"
                })
            }
        ]
    },
    plugins: [ new ExtractTextPlugin("styles.css") ]
}
```

----

## Add fonts

Install font

```bash
npm install font-awesome --save-dev
```

Install webpack loaders

```bash
# the file-loader emits files
npm install file-loader --save-dev
 # the url-loader uses DataUrls
npm install url-loader --save-dev
```

Config in webpack

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }
        ]
    }
};
```

----

## Add fonts - 2

Require (import) the css in your main file

```js
import 'font-awesome/css/font-awesome.css'
```

Or import the scss in your scss file

```css
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";
```

Add an icon in your html

```html
<i class="fa fa-font-awesome fa-5x"></i>
```

And your icon is on your page!

> Mark that webpack has renamed the font file and modified the css.



----

## Hot Module Replacement

```json
"scripts": {
    "build": "corss-env NODE_ENV=production webpack",
    "serve": "webpack-dev-server --open --hot --inline"
}
```

Restart webpack-dev-server and thats all. Try to change a css/sass file

> Hot module replacement doesn't work together with the 'ExtractTextPlugin' plugin.

----

## Tree Shaking

Tree shaking eliminates unused exports

```js
export function getById(id) {
    return { id: 123, name: 'john' }
}

export function getAll() {
    return [
        { id: 123, name: 'peter' },
        { id: 222, name: 'robbert' }
    ]
}
```

```js
import { getAll } from './userService';
var users = getAll();
users.forEach(function(user) {
    console.log(user.id, user.name);
});
```

----

## Tree Shaking - 2

Specify babel will not generate CommonJS modules

```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

And run webpack with the optimise flag

```bash
$ webpack --optimize-minimize
```

---

## Resources

Books

    https://github.com/survivejs/webpack

Articles

    https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9
    https://blog.madewithlove.be/post/webpack-your-bags/

Tools

    https://github.com/survivejs/webpack-merge
