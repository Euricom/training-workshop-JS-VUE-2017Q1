# Unit Testing
## testdouble
<img src="./images/testing.jpeg" width="400px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

---

# testdouble

> If you want a better alternative then 'Sinon'

----

## testDouble

A minimal test double library for TDD with JavaScript.

Install

```bash
    $ npm install testdouble --save-dev
```

Stub function with return values

```js
var td = require('testdouble');

var fetch = td.function();
td.when(fetch(42)).thenReturn('Jane User');

fetch(42); // -> 'Jane User'
```

Verifying a function was invoked

```js
var td = require('testdouble');

var save = td.function('.save');
save(41, 'Jane');

td.verify(save(41, 'Jill'));
```

----

## Creating test doubles

```js
    // single function
    const bark = td.function()
    const woof = td.function('.woof')

    bark();
```

```js
    // function of object
    const myObj = {
        getInfo() {
        }
    }

    // prototype function of class
    class Service {
        doAction() {          // Service.prototype.doAction
        }
    }

    // create test double
    const mockObj = td.object(myObj);
    const mockService = td.object(Service);

    // stub functions
    mockObj.getInfo      // a test double function named:  'myObj#getInfo'
    mockService.doAction // a test double function named:  'Service#doAction'
```

----

## Stubbing response

The basic structure of a stubbing

```js
var quack = td.function('quack')
td.when(quack('soft')).thenReturn('quack')
td.when(quack('soft', 2)).thenReturn('quack quack')
td.when(quack('soft', 2, 'hard', 3)).thenReturn('quack quack QUACK QUACK QUACK')quack() // 'some return value'

quack('soft') // 'quack'
quack('soft', 2) // 'quack quack'
quack('soft', 2, 'hard', 3) // 'quack quack QUACK QUACK QUACK'
```

> By default there is an exact stubbing

Use argument matchers
<!-- .element: class="fragment" data-fragment-index="2" -->

```js
var bark = td.function()
td.when(bark(td.matchers.anything())).thenReturn('woof')
td.when(bark(td.matchers.isA(Number))).thenReturn('yum')
td.when(bark(td.matchers.contains({ingredient: 'meat'}))).thenReturn('grow')
```
<!-- .element: class="fragment" data-fragment-index="2" -->
Configure
<!-- .element: class="fragment" data-fragment-index="2" -->

```js
whatever = td.function()
td.when(whatever(), {ignoreExtraArgs: true}).thenReturn('yesss')
```
<!-- .element: class="fragment" data-fragment-index="2" -->

----

## Stubbing response

Exceptions

```js
var save = td.function()
td.when(save('bob')).thenThrow(new Error('Name taken'))
save('bob') // throws error 'Name taken'
```

Promises

```js
var fetch = td.function()
td.when(fetch('/user')).thenResolve('Jane')

fetch('/user').then(function (value) {
  console.log(value) // prints "Jane"
})
```

```js
var fetch = td.function()
td.when(fetch('/user')).thenReject('Joe')

fetch('/user').catch(function (value) {
  console.log(value) // prints "Joe"
})
```

----

## Verify interaction

Basic

```js
var quack = td.function('quack')
quack('QUACK')

// success verification
td.verify(quack('QUACK')) // ok

// failed verification
td.verify(quack())
```

Output

```
Error: Unsatisfied verification on test double `quack`.

  Wanted:
    - called with `()`.

  But was actually called:
    - called with `("QUACK")`.
  at Object.module.exports [as verify] (/Users/justin/code/testdouble/testdouble.js/lib/verify.js:22:15)
```

> Argument matchers (and config) can also be used here

----

## Custom verification

```js
var quack = td.function('send')
quack({ msg: '123456789010'}, 1000)

// custom check on first argument
td.verify(
    quack(
        // custom check on first arg
        td.matchers.argThat(arg => {
            return arg.msg.length > 10
        }),
        // anything on second arg
        td.matchers.anything(),
    )
)
```

----

## testdouble-chai

Install

```bash
    $ npm install testdouble-chai --save-dev
```

See: https://github.com/BaseCase/testdouble-chai

Chai helpers for easier testdouble testing

```js
import chai, { expect } from 'chai'
import td from 'testdouble'
import tdChai from 'testdouble-chai'
chai.use(tdChai(td)); // make sure to call tdChai with td to inject the dependency

...
it("can tell you if a testdouble object was called", function() {
      var stub = td.function();
      stub();

      // instead of `verify(stub())`!
      expect(stub).to.have.been.called;

      // instead of `verify(stub("hi"))`!
      expect(stub).to.have.been.calledWith("hi");
});
```

> Custom matching is not supported

----

## Replacing Real Dependencies

Object-property replacement.

```js
const stubGetItem = td.replace(window, 'getItem');
td.when(stubGetItem('userId')).thenReturn('peter');
```

Node.js module replacement.

```js
const stubService = td.replace('./myService')
td.when(stubService.action(1234)).thenReturn(0);

const myService = require('./myService');
myService.action();
```

----

## Cleanup

Restore those real properties back to their original owners

```js
import td from 'testdouble'

afterEach(() => {
    td.reset()
});
```

----

## Fake timers

Fake timers is a synchronous implementation of 'setTimeout'.

Install

```bash
npm install --save-dev testdouble-timers
```

Use

```js
import td from 'testdouble';
import timers from 'testdouble-timers';
timers.use(td);  // Install fake timers API to testdouble

// replace the global setTimeout and stop time.
var clock = td.timers();

// The code won't do anything as the timer is not running now.
setTimeout( function() { console.log('One second has elapsed.'); }, 1000 );

// tick the clock ahead 1000 ms
clock.tick(1000);

// now the timer function is executed
```

----

## Case: Testing fetch api

Our client

```js
export const client = (path) => {
    return window.fetch(path)
        .then(res => res.json())
        .then(json => {
            return {
                hello: json.hello.toUpperCase()
            }
        })
};
```

----

## Case: Testing fetch api

Our test

```
it ('formats the response correctly', function() {
```

```
    // create response
    var res = new window.Response('{"hello":"world"}', {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    });

    // stub fetch function and return response
    const fetchStub = td.replace(window, 'fetch')
    td.when(fetchStub('/foobar')).thenResolve(res)
```

```js
    // act
    return client('/foobar')
        .then((json) => {
            // assert
            expect(json.hello).toBe('WORLD');
        });
});

```

----

## Fetch - Test Helpers

```js
function jsonOk (body) {
    const mockResponse = new window.Response(JSON.stringify(body), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
    return new Promise.resolve(mockResponse)
}
```

```js
function jsonError (status, body) {
    const mockResponse = new window.Response(JSON.stringify(body), {
        status: status,
        headers: {
        'Content-type': 'application/json'
        }
    })
    return new Promise.reject(mockResponse)
}

```

----

## Testing fetch api - simplified

Our test

```js
import td from 'testdouble'

describe('test', () => {
    afterEach(() => {
        td.reset()
    })

    it ('formats the response correctly', () => {
        // arrange
        const stubFetch = td.replace(window, 'fetch')
        td.when(stubFetch('/foobar')).thenReturn(jsonOk('{"hello":"world"}'))

        // act
        return client('/foobar')
            .then((json) => {
                // assert
                expect(json.hello).toBe('WORLD');
            });
    });
})
```
