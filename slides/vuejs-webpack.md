# VueJS - WebPack
<img src="./images/vue-file.png" width="400px" /><br>
<small>by Peter Cosemans</small>

---

# Vue Component Spec

> The *.vue files syntax

----

## .vue file

```html
<template lang="html">
  <div class="example">
    <h1>{{ title }}</h1>
    <other-component/>
</template>
```
```html
<script>
import otherComponent from 'component/otherComponent'
export default {
    data () {
        return {
            title: 'Hello world!'
        }
    }
}
</script>
```
```html
<style lang="sass" scoped>
$font-stack: Helvetica;
$primary-color: #333;
.example {
    font: 100% $font-stack;
    color: $primary-color;
}
</style>
```

---

# Setup

> Lets build with WebPack, ES6+ and .vue files

----

## Index.html

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Vue with WebPack</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="/bundle/bundle.js"></script>
    </body>
</html>
```

----

## Vue App and component

Create our vue app (notice the render function)

```js
// main.js
import Vue from 'vue'
import App from './app.vue'
new Vue({
    el: '#app',
    render: h => h(App),
})
```

The app (root) component

```html
<template>
  <div id="app">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        title: 'Vue with WebPack'
    }
  }
}
</script>
```

----

## WebPack & Npm Modules

Now we take VueJS via npm

```bash
$ npm install vue --save
```

To process .vue files we need the vue-loader

```bash
$ npm install vue-loader vue-template-compiler --save-dev
```

And configure it

```js
// webpack.config.js
module: {
    rules: [
        ...
        { test: /\.vue$/, loader: 'vue-loader' },
    ],
},
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            // this is required for vue.common.js (default)
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
    }),
],
```

----

## Optional

Optional you can configure the vue build and aliases for easy access

```js
// webpack.config.js
resolve: {
    alias: {
        // easy access to components
        'components': path.resolve(__dirname, '../app/components'),
        // specifies the full commonJS build: default
        // https://github.com/vuejs/vue/blob/dev/dist/README.md
        'vue': 'vue/dist/vue.common.js',
    },
},
```

> More info about vue-loader: https://vue-loader.vuejs.org/en/

---

# Components

> Just a collection of .vue files

----

## Register components

Javascript style

```js
var MyComponent = Vue.extend({
...
})
Vue.component('my-component', MyComponent)
```

app.vue (local registration)

```js
import Message from './components/message.vue'
export default {
  components: {
    // list the components used in this component
    Message,
  },
  data () {
    ...
  }
}
```

----

## .vue Component

./components/message.vue

```html
<template>
    <div>
        <h1>{{message}}</h1>
    </div>
</template>

<script>
export default {
    name: 'message',
    data() {
        return {
            message: 'Hello from messsage'
        }
    },
}
</script>
```

> Notice the name property

----

## Template Based Component (ES6)

```js
import Vue from 'vue'

export default Vue.extend({
    template: `
        <div>
            <span>{{title}}</span>
        </div>
    `,
    name: 'sample',
    data () {
        return {
            title: 'My awesome component',
        }
    },
})
```

Or you can import template & style (need html & less loader)

```js
import Vue from 'vue'
import template from './sample.html'
import './sample.less'

export default Vue.extend({
    template,
    name: 'sample',
    data () {
        ...
    },
})
```

---

# Styling

> Power to your styles

----

## Styling in .vue file

```html
<!-- message.vue -->
<template>
</template>

<script>
</script>

<style>
h1 {
    color: red
}
</style>
```

Notice that the style is applied to the full application

----

## Scoped styling

```html
<!-- message.vue -->
<style scoped>
h1 {
    color: red
}
</style>
```

Notice that not the styling is now only applied to the `Message` component

> CSS Modules are also supported
> https://vue-loader.vuejs.org/en/features/css-modules.html

----

## Less

Less loader and dependencies

```bash
npm install less-loader less --save-dev
```

Specify less as language

```html
<!-- message.vue -->
<style lang="less">
@alert-color: red
h1 {
    color: @alert-color
}
</style>
```

----

## Webpack Extract CSS

```bash
npm install extract-text-webpack-plugin@2.x --save-dev
```

```js
// webpack.config.js
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  // other options...
```
```js
  module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    less: ExtractTextPlugin.extract({
                        loader: 'css-loader!less-loader',
                        fallbackLoader: 'vue-style-loader',
                    }),
                },
            },
        },
    ]
  },
```
```js
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
}
```

---

# Exercise

> Refactor the bootstrap Alert component (from previous exercise) to a .vue component.

- You need to import bootstrap as npm module
- Make bootstrap globally available

---

# ESLint your vue files

> Don't forget your linting

----

## Setup

Install

```bash
npm install --save-dev eslint-plugin-vue eslint-config-vue
```

Config .eslintrc

```json
{
    extends: ["vue", /* your usual extends */ ],
    plugins: ["vue"],
}
```

Setup script: package.json

```json
"scripts": {
    "lint": "eslint 'app/**/*.{js,vue}'"
},
```

> Linting vue files doesn't work in VSCode!

---

# Resources

- [vue-loader](https://vue-loader.vuejs.org/en/)

- [Vue tooling for VSCode](https://marketplace.visualstudio.com/items?itemName=octref.vetur)


