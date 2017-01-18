# training-workshop-JS-VUE-2017Q1

### Content

- JavaScript
    + [Know your javascript](./slides/js-know-your-javascript.md)
    + [ES6 and beyond](./slides/js-es6-and-beyond.md)
    + [Unit Tests](./slides/unit-tests.md)
- WebPack
    + [Intro to WebPack](./slides/webpack.md)
- VueJS
    + [Intro to VueJS](./slides/vuejs.md)
    + [VueJS with WebPack](./slides/vuejs-webpack.md)

### Templates projects

- JS: Babel and ESLint (js-node)
- UT: Mocha, Chai and Sinon (mocha-chai-sinon)
- UT: Mocha, Chai and testdouble (mocha-chai-td)
- VueJS: VueJS with WebPack (vuejs)
- WebPack: Dev, Test & Prod setup (webpack)

To start with a project

    yarn install

And view the package.json 'script' tag for the available commands

    // package.json
    "script": {
        "test": "mocha ./app/*.spec.js"
    }

### View Slides (in presentation style)

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

Copyright (c) 2016 Zeal, LLC.  Licensed under the [MIT license](https://opensource.org/licenses/MIT).
