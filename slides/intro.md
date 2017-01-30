# Javascript / VueJS Workshop
<small>by Peter Cosemans</small>
<br>
<br>
<small>
Copyright (c) 2017 Euricom nv. Licensed under the [MIT license](https://opensource.org/licenses/MIT).
</small>

---

# Content

### [https://github.com/Euricom/training-workshop-JS-VUE-2017Q1](https://github.com/Euricom/training-workshop-JS-VUE-2017Q1)

- Slides
- Templates
- Examples
- Exercises

---

# Me

- Peter Cosemans (Euricom)
    - peter.cosemans@euri.com
    - https://github.com/mjrio
    - http://github.com/euricom
- 12 year Microsoft .NET Development
- 4 year Front-end Development
- Architect, Tech Coach, Trainer
    + JavaScript
    + Angular, React, VueJS
    + NodeJS, MongoDB
    + Mobile (hybrid)

---

# Agenda

- Day 1: Javascript
- Day 2: WebPack & VueJS
- Day 3: VueJS (continue) & Intro Unit Testing
- Day 4: VueJS Unit Testing & QA

----

# Agenda
### Mon - Day 1

- Know your javascript
    + Lexical Scope
    + Closure
    + This
    + Prototype
- ES6 and beyond
    + TC39
    + Linting
    + Babel
    + ES6+ Features

----

# Agenda
### Tue - Day 2
+ WebPack
    * Setup
    * DevServer
    * Rules
    * Plugins
    * Dev vs Production
- VueJS Intro
    + Setup
    + Binding
    + Events
    + Components
    + Forms

----

# Agenda
### Mon - Day 3

- VueJS with ES6 & WebPack
    + .vue files
    + vue-loader (for webpack)
    + styling (scoped, less)
    + routing
    + vuex
+ Unit Testing
    * Setup: Mocha/Chai
    * Async
    * Spies & stubs
    * Testing API calls

----

# Agenda
### Mon - Day 4

+ Unit Testing & VueJS
    * Setup (mocha vs karma & WebPack)
    * Testing services
    * Testing components
+ Questions & Answers

---

# Prerequisites

- Knowledge / Experience
    + Javascript (jquery)
    + HTML / CSS / BootStrap
    + Chrome Dev Tools

- System Setup
    + GIT client ([git cli](https://git-scm.com/), [SourceTree](https://www.sourcetreeapp.com/))
    + [NodeJS 7.x](https://nodejs.org/en/download/current/)
    + [Visual Studio Code](https://code.visualstudio.com/)
    + [Chrome](https://www.google.com/chrome/)
    + Optional but usefull
        * [Yarn](https://yarnpkg.com/)
        * Improved terminal ([iTerm](https://www.iterm2.com/), [cmdr](http://cmder.net/) + bash)

---

# Topics

- [Know your javascript](./js-know-your-javascript.md)
- [ES6 and beyond](./js-es6-and-beyond.md)
- [WebPack](./webpack.md)
- [VueJS Intro](./vuejs.md)
- [VueJS with WebPack](./vuejs-webpack.md)
- [VueJS Router & Vuex](./vuejs-plugins.md)
- [Unit Testing](./unit-tests.md)
- [Unit Testing with WebPack](./webpack-mocha.md)
- [Unit Testing with VueJS](./vuejs-unit-tests.md)

---

# A better VSCode

> Powercharge your editor

----

## Plugins - Must have

| Plugin                    | Remark                           |
| ------------------------- | ---------------------------------|
| EditorConfig for VS Code  | -                                |
| ESLint                    | -                                |
| Git History (git log)     | Git commits logs                 |
| Git Blame                 | See Git Blame info in status bar |
| Git Flow                  | Git Flow Branching commands      |
| beautify                  | Format JS, CSS, and HTML         |
| npm Intellisense          | Autocompletes npm modules        |
| Path Intellisense         | Autocompletes path and filenames |

----

## Plugins - Usefull

| Plugin                    | Remark                           |
| ------------------------- | ---------------------------------|
| vetur                     | Syntax highlighting .vue files   |
| VueHelper                 | Vue code snippets                |
| mssql                     | Autocomplete & exec sql scripts  |
| Spelling and Grammer      | -                                |
| Document This             | JSDoc comments                   |
| ES6 Mocha Snippets        | -                                |
| SVG preview               | -                                |

----

## Custom config

Goto `preferences - user settings`

```json
    // auto save on close
    "files.autoSave": "onFocusChange",

    // let ESlint validate my JS code
    "javascript.validate.enable": false,

    // default exclude on search
    "search.exclude": {
        "**/*bundle.js": true,
        "**/node_modules": true,
        "**/bower_components": true
    },
```
```json
    // don't check typescript version'
    "typescript.check.tscVersion": false,

    // linting vue files
    "files.associations": {
        "*.vue": "vue"
    },

    // github markdown preview
    "markdown.styles": [
        "https://gitcdn.xyz/repo/aui/vs-code-github-markdown-theme/master/index.css"
    ],
```
