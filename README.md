# Javascript / VueJS Workshop

# Agenda

- Day 1: Javascript
- Day 2: WebPack & VueJS
- Day 3: VueJS (continue) & Intro Unit Testing
- Day 4: VueJS Unit Testing & QA

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
        * Improved terminal/command window ([iTerm](https://www.iterm2.com/), [cmdr](http://cmder.net/) + bash)

# Content

### TOC

- [Intro](./slides/intro.md)
- JavaScript
    + [Know your javascript](./slides/js-know-your-javascript.md)
    + [ES6 and beyond](./slides/js-es6-and-beyond.md)
    + [Unit Tests](./slides/unit-tests.md)
- WebPack
    + [Intro to WebPack](./slides/webpack.md)
    + [Unit Testing with WebPack](./webpack-mocha.md)
- VueJS
    + [VueJS Intro](./slides/vuejs.md)
    + [VueJS with WebPack](./slides/vuejs-webpack.md)
    + [VueJS Router & Vuex](./vuejs-plugins.md)
    + [VueJS Unit Testing](./vuejs-unit-tests.md)

### View Slides (in presentation style)

The slides are written in markdown and can be presented with 'reveal-md'.

// install reveal-md
> npm install -g reveal-md

// open it (dark)
> reveal-md .
> reveal-md . --theme moon

// other theme (light)
> reveal-md . --theme solarized --highlightTheme github-gist

// specific presentation
> reveal-md ./slides/unit-tests.md --title 'Unit-Tests' --theme solarized --highlightTheme github-gist

## License

Copyright (c) 2017 Euricom nv. Licensed under the [MIT license](https://opensource.org/licenses/MIT).
