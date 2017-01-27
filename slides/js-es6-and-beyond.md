# ES6 and beyond
<img src="./images/beyond.jpg" width="600px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

---

# ES5, ES6, ES2016, ES.Next

> What's going on with JavaScript versioning

----

## Terms of terminology

- ECMAScript
- JavaScript
- ECMAScript 5 (ES5) - 2009
- ECMAScript 6 (ES6/ES2015) - 2015
- ECMAScript 2016 (ES7) - 2016
- ECMAScript 2017 - 2017
- ES.Next
- TC39

Note:
- ECMAScript: A language standardized by ECMA International.
- JavaScript: The commonly used name for implementations of the ECMAScript standard
- ECMAScript 5 (ES5): The 5th edition of ECMAScript, standardized in 2009
- ECMAScript 6 (ES6/ES2015): The 6th edition of ECMAScript, standardized in 2015.
- ECMAScript 2016: The 7th edition of ECMAScript

----

## ES6 Today

<img src="./images/compatibility-table.png" width="1000px" /><br>

- Edge, Chrome, Firefox and Safari: +95%
- Node 7.x: +98%

> http://kangax.github.io/compat-table/es6/


----

## TC39

The Ecma TC39 committee is responsible for evolving the ECMAScript programming language and authoring the specification. The committee operates by consensus and has discretion to alter the specification as it sees fit.

The process:

- Stage 0: Initial input
- Stage 1: Proposal (spec, polyfill, demo)
- Stage 2: Draft (ready for testing)
- Stage 3: Candidate (almost there, last bits)
- Stage 4: Finished (ready)

[TC39 on GitHub](https://github.com/tc39)

---

# A good start

> Follow a styleguide and make it count

----

## Style Guide

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [JavaScript Standard Style Guide](http://standardjs.com/)
<br>

## Linting tools

- JSLint (outdated)
- JSHint (outdated)
- [ESLint](http://eslint.org/) for ES and ES.Next
- [TSLint](https://palantir.github.io/tslint/) for Typescript

----

### ESLint with AirBnb JavaScript Style Guide

```
    npm install eslint eslint-config-airbnb-base eslint-plugin-import --save-dev
```

```
    // .eslintrc
    {
       "extends": "airbnb-base",
       "globals": { },
       "env": {
            "browser": true,
            "node": true
       },
       "rules": {
           "indent": [2, 4],    // tab = 4 spaces
           // ...
       }
    }
```

```
    // package.json
    {
        "scripts": {
            "lint": "eslint ."
        }
    }
```

More config: [http://eslint.org/docs/user-guide/configuring](http://eslint.org/docs/user-guide/configuring)

----

### ESLint with 'Standard' JavaScript Style Guide

One JavaScript Style Guide to Rule Them All. No decisions to make. No .eslintrc, .jshintrc, or .jscsrc files to manage. It just works.

    // install (cli)
    npm install standard

    // VSCode plugin
    https://marketplace.visualstudio.com/items/chenxsan.vscode-standardjs

Alternatively you can setup the standardjs with eslint

    // install
    npm install eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise --save-dev

    // .eslintrc
    {
       "extends": "standard"
    }

More config: [http://eslint.org/docs/user-guide/configuring](http://eslint.org/docs/user-guide/configuring)

---

# Babel

> The compiler for writing next generation JavaScript

----

## Babel

Babel has been split into multiple packages:

- `babel-cli`, which contains the babel command line interface
- `babel-core`, the compiler
- `babel-polyfill`, sets you up with a full ES2015-ish environment

To install

    // global
    npm install babel-cli -g

    // local
    npm install babel-core --save-dev

----

## Babel - Presets

Every transformation is a plugin, and as a result, nothing happens by default. So you’ll need to install the correct plugins. Babel 6 adds presets, or collections of plugins.

To install

    npm install babel-core babel-preset-latest --save-dev

But even after installing a preset, you need to tell Babel to use it.

    // .babelrc
    {
      "presets": ["latest"]
    }

***Some usefull presets:***

    `babel-preset-es2015`: All ES2015/ES6 features
    `babel-preset-latest`: All released ES features (es2015, es2016, es2017)
    `babel-preset-es2015-node6`: Make node@6 ES2015 compatible
    `babel-preset-es2017-node7`: Make node@7 ES2017 compatible
    `babel-preset-modern-browsers`: ES support for modern browsers (static)
    `babel-preset-env`: ES support for specified browsers (dynamic)
    `babel-preset-react`: Adds support for jsx and flow
    `babel-preset-babili`: Adds ES6 minifier
    `babel-preset-stage-2`: Adds all ES features in stage 2 (and greater)
    `babel-preset-angular2`: Wite Angular2 in Javascript
    ...

----

## Babel - Plugins

You can add individual plugins yourself

    // install
    npm install babel-plugin-transform-runtime

    // .babelrc
    {
        "presets": ["latest"],
        "plugins": ["transform-runtime"]
    }

> https://babeljs.io/docs/plugins/

----

## Environment depending configuration

If you want different transformation depending of your environment (`process.env.BABEL_ENV`)

```
    // .babelrc
    {
      "presets": ["es2015"],
      "env": {
        "production": {
          "presets": ["babili"]
        },
        "test": {
          "plugins": [ "istanbul" ]
        }
      }
    }
```

```
    // package.json
    {
        "scripts": {
            "build": "cross-env BABEL_ENV=production babel . --out-dir dist",
            "test": "cross-env BABEL_ENV=test karma start --single-run",
        }
    }
```

----

## Don't forget the polyfills

For Map, Set, Object.xxx, ...
<br><small>If you target older browsers (IE, PhantomJS, ...)</small>

```js
    // index.js
    import 'core-js';
    // or babel/polyfill
    // or es6-shim
```

```js
    // polyfills.ts
    import 'core-js/es6/symbol';
    import 'core-js/es6/object';
    import 'core-js/es6/function';
    import 'core-js/es6/parse-int';
    import 'core-js/es6/parse-float';
    import 'core-js/es6/number';
    import 'core-js/es6/math';
    import 'core-js/es6/string';
    import 'core-js/es6/date';
    import 'core-js/es6/array';
    ...
    import 'core-js/es7/reflect';
```

----

## Enable NS.Next features in your ESLint

Install

```
    # install
    npm install eslint
    npm install babel-eslint
```

Config

```json
    {
        "extends": "airbnb-base",
        "parser": "babel-eslint",
        "rules": {
            ...
        }
    }
```

----

## Babel - Node

> Node 7.x supports 99% of ES6

But what about the 1% and ES7+

    // install
    npm install babel-cli --save-dev
    npm install babel-preset-es2017-node7 babel-preset-stage-2 --save-dev

```
// .babelrc
{
    "presets": ["es2017-node7", "stage-2"]
}
```

To run it

```
// package.json
{
    ...
    "scripts": {
        "start": "babel-node main.js",
        "nodemon": "nodemon main.js --exec babel-node"
    },
    ...
}
```

----

## Babel - Node

Alternative you can embed the babel runtime in your app

```
// index.js (this file is ES6 with commonJS)
require('babel-core/register');
require('./server');

// server.js (fully ES.Next ready)
import app from './express';
```

```bash
// startup
node index.js
```

For the production build, make sure you transpile

    babel -d ./build ./server -s --ignore *.test.js"

---

# The Basic Features of ES6

> What you probably already know.

----

## The let keyword

```js
    // ES5 - function scoping
    var message = 'hi';
    function greet() {
        var message = 'bye';
    }
    greet();                  --> Output ?
```

```js
    // ES5 - block scoping
    var message = 'hi';
    {
        var message = 'bye';
    }
    console.log(message)      --> output: ?
```
<!-- .element: class="fragment" data-fragment-index="1" -->

```js
    // ES6 - block scoping with let
    let message = 'hi';
    {
        let message = 'bye';
    }
    console.log(message)      --> output: ?
```
<!-- .element: class="fragment" data-fragment-index="2" -->

----

## The const keyword

```js
    // ES5
    var message = 'hi';
    return message;

    // ES6
    const message = 'hi'
    message = 'hello'           <-- ERROR
```

> const is not immutable!

<!-- .element: class="fragment" data-fragment-index="2" -->

```js
    const names = [];
    names.push( "Jordan" );     <-- No Error
    console.log( names );
```

<!-- .element: class="fragment" data-fragment-index="3" -->

'const' defines a constant Reference, Not a Value

<!-- .element: class="fragment" data-fragment-index="3" -->

----

## Property value shorthand

```js
    // ES3/ES5
    function getCar(make, model, value) {
        return {
            make: make,
            model: model,
            value: value
        };
    }
```

vs

```js
    // ES6
    // With property value shorthand syntax, you can omit the property
    // value if key matches variable name.
    function getCar(make, model, value) {
        return {
            make,
            model,
            value
        };
    }
```

----

## Method definition shorthand

```js
    // ES5
    function getCar(make, model, value) {
        return {
            depreciate: function() {
                this.value -= 2500;
            }
        };
    }
```

vs

```js
    // ES6
    // Method definition shorthand syntax omits `function` keyword & colon
    function getCar(make, model, value) {
        return {
            depreciate () {
                this.value -= 2500;
            }
        };
    }
```

----

## The arrow function

Simplified syntax

```js
    var createGreeting = function(message, name) {
        return message + name;
    }

    // version 1
    const arrowGreeting = (message, name) => {
        return message + name;
    }

    // version 2
    const arrowGreeting = (message, name) => message + name;
```

Shorter

```js
    function createAction(name) {
        return {
            name: name,
            role: 'user'
        }
    }

    // alternative
    const createAction = (name) => ({
        name,
        role: 'user'
    })
```

----

## The arrow function

This reference

```js
    const service = {
      foo: 'peter',
      delayLog(timeout) {
        setTimeout(function() {
          console.log(this.foo)
        }.bind(this), timeout)
      }
    }
    service.delayAction(500)
```

Easier with arrow function
<!-- .element: class="fragment" data-fragment-index="2" -->

```js
    const service = {
      foo: 'peter',
      delayAction(timeout) {
        delayLog(() => {
          console.log(this.foo)
        }, timeout)
      }
    }
```
<!-- .element: class="fragment" data-fragment-index="2" -->

> The this reference in an arrow function is comming from outer scope
<!-- .element: class="fragment" data-fragment-index="2" -->

----

## The arrow function

When not to use!

```js
    // Object literal
    const calculator = {
        array: [ 1,2,3 ],
        sum: () => {
            console.log(this)  // OUTPUT?
            return this.array.reduce((result, item) => result + item)
        }
    }
    console.log(this)          // OUTPUT?
    calculator.sum();
```

```js
    // Object prototype
    function MyCat(name) {
        this.catName = name;
    }
    MyCat.prototype.sayCatName = () => {
        console.log(this);      // OUTPUT?
        return this.catName;
    };
    var cat = new MyCat('Mew');
    cat.sayCatName(); // => undefined
```

----

<!-- .slide: data-transition="none" -->

## The arrow function

When not to use

```js
    // Object literal
    const calculator = {
        array: [ 1,2,3 ],
        sum: () => {
            console.log(this == window)  // OUTPUT: true
            return this.array.reduce((result, item) => result + item)
        }
    }
    console.log(this == window)          // OUTPUT: true
    calculator.sum();
```

```js
    // Object prototype
    function MyCat(name) {
        this.catName = name;
    }
    MyCat.prototype.sayCatName = () => {
        console.log(this == window)      // OUTPUT: true
        return this.catName;
    };
    var cat = new MyCat('Mew');
    cat.sayCatName(); // => undefined
```

----

<!-- .slide: data-transition="none" -->

## The arrow function

Solution

```js
    // Object literal
    const calculator = {
        array: [ 1,2,3 ],
        sum()
            console.log(this == window)  // OUTPUT: false
            return this.array.reduce((result, item) => result + item)
        }
    }
    console.log(this == window)          // OUTPUT: true
    calculator.sum();
```

```js
    // Object prototype
    function MyCat(name) {
        this.catName = name;
    }
    MyCat.prototype.sayCatName = function() {
        console.log(this == window)      // OUTPUT: false
        return this.catName;
    };
    var cat = new MyCat('Mew');
    cat.sayCatName(); // => Mew
```

----

## ES6 Modules (Import / Export)

```javascript
    // service.js
    export const MAX_LENGTH = 1000      // named export
    export class Car() {                // named export
        ...
    }
    const config = {
        ...
    }
    export default config               // default export
```

```javascript
    import 'core-js';                  // load module (no future references)
    import config from 'service'                // default import
    import { MAX_LENGTH, Car } from 'service'   // named import

    import * as lib from 'service'              // import all
    console.log(lib.MAX_LENGTH)
    const car = new lib.Car()

    import config, { MAX_LENGTH, Car } from 'service'

```

Bye, bye IIFE ( Immediately-Invoked Function Expression )

ALWAYS user npm, NEVER use Bower again.

----

## The class

```javascript
    // ES6
    class Car {
        constructor(make, model, value) {
            this.make = make;
            this.model = model;
            this.value = value;
        }

        depreciate() {
            this.value -= 2500;
        }

        static create(make) {
            return new Car(make)
        }
    }
```

```javascript
    // ES5 constructor function
    function Car(make, model, value) {
        this.make = make;
        this.model = model;
        this.value = value;
    }

    Car.prototype.depreciate = function() {
        this.value -= 2500;
    }

    Car.create = function(make) {
        return new Car(make)
    }
```

----

## Classes don't hoist

```javascript
    // this works
    var foo = new Foo(1, 2);
    function Foo(x, y) {
       this.x = x;
       this.y = y;
    }

    // ReferenceError
    var foo = new Foo(1, 2);
    class Foo {
       constructor(x, y) {
          this.x = x;
          this.y = y;
       }
    }
```

----

## Don't overuse classes!

```js
    export class Utils {
        trim(text) {
        }
        parseDate(dateString) {
        }
    }

    import { Util } from './util'
    var utils = new Util();
    utils.trim(' abc    ');
```

The class don't hold state, better to use functions

```js
    // better
    export const trim = (text) => {
        ...
    }
    export const parseDate = (dateString) => {
        ...
    }

    import { trim } from './util'
    trim(' abc    ');
```

----

## String interpollation

Multiline with interpollation

```js
    const message = 'world'
    const template = `
        <div>
            <span>Hello ${message}</span>
        </div>
    `;
```

```js
    const message = `1 and 1 make ${1 + 1}`;
    console.log(message);
```

Inside (${ and }) is treated as a JavaScript expression

> No more string concatenation!

----

## Default Argument Values

```js
    var myFunction = function(a, b, c){
        a = a || 10;
        b = b || 5;
        c = c || 8;
        return a*b*c;
    };
```

```js
    var myFunction = function(a=10, b=5, c=8){
        return a*b*c;
    };
```

```js
    const INITIAL_STATE = { ... }
    var myFunction = function(state = INITIAL_STATE, action){
        ...
    };
```

----

## Computed property keys

```js
    // ES3/ES5
    function getCar(make, model, value) {
        var car = {};
        car['make' + make] = true;
        return car;
    }

    var o = getCar('Bmw', '5', 50000);
    o.makeBmw === true;
```

vs

```js
    // ES6
    // Computed values now work with object literals
    function getCar(make, model, value) {
        return {
            ['make' + make]: true
        };
    }
```

----

## Property accessors

```javascript
function getCar(make, model, value) {
    return {
        _value: value,
        get value() {
            return this._value;
        },
        set value(value) {
            if (value < 0)
                throw new Error('invalid value');
            this._value = value;
        }
    }
}

let car = getCar('Volvo', 'V70', 30000);
console.log(car.value);     // OUTPUT: 30000
car.value = -1;             <- ERROR
```

<small>A less known ECMAScript 5 feature</small>

----

## Property accessors in class

```js
    class Car {
        constructor(make, value) {
            this.make = make;
            this._value = value;
        }

        get value() {
            return this._value;
        }

        set value(value) {
            if (value < 0)
                throw new Error('invalid value');
            this._value = value;
        }
    }
```

----

## Computed property accessor names

```js
    var expr = "foo";

    var obj = {
        get [expr]() { return "bar"; }
    };

    console.log(obj.foo); // "bar"
```

---

# More advanced ES6

> What you should know.

----

## Rest operator

```js
    // ES5: remember this one
    function join() {
        var arg = Array.prototype.slice.call(arguments);
        var separator = arg[0];
        arg.shift();
        return arg.join(separator);
    }
    console.log(join('//', 'one', 'two', 'three'));

```

```js
    // ES6: easy
    function join(separator, ...values) {
        return values.join(separator);
    }
```

----

## Spread operator

```js
    function volume(width, length, height) {
        return width * length * height;
    };

    console.log(volume(...[2, 8, 5]));
```

Example: modify an immutable array

```js
    // mutable change
    function addElement(array, element) {
        array.push(element);
        return array;
    }

    // immutable change, pure function (redux!)
    function addElement(array, element) {
        return [
            ...array,
            element
        ]
    }
```

----

<!-- .slide: data-transition="concave" -->
## Spread operator

Example: Clone an array

```js
    // old way
    const newArray = oldArray.splice(0);
```

```js
    //es6 way
    const newArray = [...oldArray];
```

Example: Combine two arrays

```js
    var x = [1, 2];
    var y = [3, 4];
    x.push(...y);  // x is [1, 2, 3, 4]
```

----

## Promises

Replaces Q, Bluebird, ... One to rules them all

```js
    function timeout(duration = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        })
    }
```

```js
    var p = timeout(1000)
        .then(() => {
            return timeout(2000);
        })
        .then(() => {
            throw new Error("hmm");
        })
        .catch(err => {
            return Promise.all([timeout(100), timeout(200)]);
        })
```

```js
    // wait for multiple promises
    Promise.all([p1, p2, p3]).then(values => {
        console.log(values); // [3, 1337, "foo"]
    });
```

> Don't mix callbacks and promises, go promises all the way

----

## Object Destructuring

```js
    var myConfig = {
        url: 'www.google.com/api',
        data: 'some value',
        methodType: 'POST'
    };

    // ES5
    function makeAjaxRequest(config){
        var url = config.url;
        var method = config.methodType;
        var data = config.data;
        console.log(url, method, data );
    }
```

```js
    // ES6
    function makeAjaxRequest(config){
        var { url, methodType, data } = config;
        console.log(url, methodType, data );
    }

    // or
    function makeAjaxRequest({ url, methodType }){
        console.log(url, methodType );
    }
```

Destructuring is also possible on arrays.

----

### Object.assign

```js
    // combine object
    const obj = { foo: 123 };
    Object.assign(obj, { bar: true });
    console.log(JSON.stringify(obj));  // OUTPUT: {"foo":123,"bar":true}
```

```js
    // adding properties to this
    class Point {
       constructor(x, y) {
            Object.assign(this, {x, y});
        }
    }
```

```js
   // Providing default values for object properties
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    };
    function processContent(options) {
        options = Object.assign({}, DEFAULTS, options); // (A)
        ···
    }
```

----

## Still using underscore?

Euhhhh, way?

```js
    // Underscore                       ES5/6
    // ----------------------           ---------------------
    _.each(array, iteratee)             array.forEach(iteratee)
    _.map(array, iteratee)              array.map(iteratee)
    _.reduce(array, iteratee, memo)     array.reduce(iteratee, memo)
    _.every(array, predicate)           array.every(predicate)
    _.some(array, predicate)            array.some(predicate)
    _.find(array, predicate)            array.find(predicate)
    _.includes(array, element)          array.includes(element)
    _.toArray(arguments)                [...arguments]
    _.compact(array)                    array.filter(x => !!x)
    _.indexOf(array, value)             array.indexOf(value)
    _.keys(object)                      Object.keys(object)
```
<!-- .element: class="fragment" data-fragment-index="2" -->

```js
    _.assign({}, source, {a:false})     Object.assign({},source,{a:false})
    _.extendOwn({}, object)             { ...object }
    _.isArray(object)                   Array.isArray(object)
    _.noop                              () => {}
    _.template("hello <%= name %>")     `hello ${name}`
    _.deepClone(source)                 X
```
<!-- .element: class="fragment" data-fragment-index="2" -->

---

# ES.next features

> This is good to know

----

### Class Fields

```js
    class MyClass {
        myProp = 42;
        static myStaticProp = 21;
        constructor() {}
    }
```

<small>Stage 2<br>Babel plugins:[transform-class-properties], TS 1.5+ </small>

> Yes more typescript like

----

## Object spread operator

```js
    const myObject = { id: 12345, name: 'abc' }

    // my immutable object change
    const newObject = {
        ...myObject
        id: 54321
    }
```

<small>Stage 2<br>Babel plugins:[transform-object-rest-spread], TS 2.0+ </small>

> Great for immutable objects!

----

## Async / Await

```js
    // an async function
    const fetchSomething = () => new Promise((resolve) => {
        setTimeout(() => resolve('future value'), 500);
    });
```

```js
    // ES5
    const promiseFunc = () => new Promise((resolve) => {
        fetchSomething().then(result => {
            resolve(result + ' 2');
        });
    });

    // ES7
    async function asyncFunction() {
        const result = await fetchSomething(); // returns promise
        return result + ' 2';
    }
```

<small>Stage 3<br>Babel plugins:[transform-async-to-generator], TS 1.7+ </small>

> Makes unit tests much more easier

Note: It is supported by TypeScript 1.7+

----

## Trailing Function Commas

```js

    // Trailing commas are ignored in object literals and arrays
    const myObject = {
        id: 1234,
        name: 'peter',
    }
    const cities = {
        'antwerp',
        'mechelen',
        'brussel',
    }
```

```js
    // ES8 - makes it possible on function arguments
    function doThis(
        commandName,
        isMandatory,
    )
```

<small>Stage 3<br>Babel plugins:[syntax-trailing-function-commas], TS 2.0 </small>

> Cleaner diff in your git repo

---

# Less used ES6

> If you really want to be good at it

----

## Array Destructuring

```js
    // Array destructuring: uses an iterator to get to the elements of a source
    let [x, ...y] = 'abc';   // x='a'; y=['b', 'c']
```

Combines desctructering with spread operator

```js
    // ES5 - Result of multiple promises
    Promise.all([promiseGetUsers, promiseGetCustomers])
        .then((result) => {
            var users = result[0];
            var customers = result[1];
            console.log(users, customers);
        });

    // ES6: Array destructuring result
    Promise.all([promiseGetUsers, promiseGetCustomers])
        .then(([users, customers]) => {
            console.log(users, customers);
        });
```
Less lines to write, less confusion

----

## Decorators

```js
    // A simple decorator
    @annotation
    class MyClass { }

    function annotation(target) {
       target.annotated = true;  // Add a property on target
    }
```

```js
    // A decorator with argument
    @displayName('Auto')
    class Car { }

    function displayName(target, name) {
       target.displayName = name;
    }
```

<small>Stage 1<br>Babel plugins:[transform-decorators-legacy], TS 1.5+ </small><br>

> Angular2 in ES6: use ["es2015", "angular2"]

----

## String interpollation

Tagged templates

```js
    const id = 1;
    const query = graphql `
        query {
            user(id: ${id})
        }
    `

    function grahql(literals, ...placeholders) {
      console.log('literals', literals);
      console.log('placeholder', placeholders);
      console.log('raw', literals.raw[0]);
    }
```

You get the opportunity to pre process the template string literals plus the values.

----

## Symbols

Properties of an object can be either a string (as in ES5)
or symbol (new in ES6)

```js
    var key = Symbol("key");
    const myObject = {
        [key]: 'abc'
    }
```

Can be used as private variable

```js
    var key = Symbol("key");

    class MyClass {
        constructor(privateData) {
            this[key] = privateData;
        }
    }

    var x = new MyClass('hello')
    console.log(JSON.stringify(x))    > Output: {}
```

----

### Object.keys

Retrieves all string keys of all properties.

```js
    const x = {
        id: 1234,
        name: 'abc',
    }
    Object.keys(x) === ['id', 'name']
```

Alternative

```js
    for (const key in obj) {
        ...
    }
```

----

### Object.is

```js
    // we all know
    “0” == 0  // true
    “0” === 0 // false (better to use this)

    // but this doesn't work
    NaN == NaN  // false
    NaN === NaN  // false

    var result = isNan(NaN) // workaround
```

```js
    // ES6 - this is ALWAYS correct
    Object.is(0 ,”0”) // false
    Object.is(0 ,0) // true
    Object.is(NaN, NaN) // true
```

----

### Generators

The basics

```js
    function *foo() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        yield 5;
    }
```

```js
    // get an iterator
    var it = foo();

    // get the result
    it.foo();     // 1
    it.foo();     // 2
    it.foo();     // 3
    ...

    // loop over
    for(const i of it) {
        console.log(i)
    }
```

----

### Generators

More practical example

```js
    var activeUsers = _.filter(users, function(user) {
        return user.isActive
    });
    var ages = _.map(activeUsers, function(user) {
        return user.age
    });
```

```js
    function *map(items, transform) {
      for (item of items)
        yield transform(item);
    }
    function *filter(items, predicate) {
      for (item of items)
        if (predicate(item))
          yield item;
    }
```

```js
    for (const user of activeusers) {
        console.log(user);
    }
```

---

## Resources

- [You-Dont-Know-JS Book series](https://github.com/getify/You-Dont-Know-JS)
- [Frontendmasters - Kyle Simpson](https://frontendmasters.com/courses/)
- [JavaScript Weekly](http://javascriptweekly.com/)
- [TOP 10 JAVASCRIPT TRAPS FOR A C# DEVELOPER](http://prasadhonrao.com/top-10-javascript-traps-for-a-csharp-developer/)

---

# May the JS-Force be with you


