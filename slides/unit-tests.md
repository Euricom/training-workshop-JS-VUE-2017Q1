# Javascript Unit Testing
<img src="./images/testing.jpeg" width="400px" /><br>
<small>by Peter Cosemans</small>
<small>v1.0 - 18 jan 2017</small>

---

# What do I need?

> There are so many frameworks & libraries

----

## Setups

* Browser
    - [Karma](https://karma-runner.github.io/1.0/index.html) with [Jasmine](https://jasmine.github.io/)
    - [Karma](https://karma-runner.github.io/1.0/index.html) with [Mocha](https://mochajs.org/]) & [Chai](http://chaijs.com/)

* Node
    * [Mocha](https://mochajs.org/]) & [Chai](http://chaijs.com/)
    * [Jest]([https://facebook.github.io/jest/])

* Integrated
    * [Angular-CLI](https://github.com/angular/angular-cli) (Karma/Jasmine)

* End-to-end
    * Protractor (Angular)
    * Selenium

----

## Libraries

* Assertion Libraries
    - [Chai](http://chaijs.com/) - Assertions
    - [Should](http://github.com/visionmedia/should.js) - Assertions
    - [Expect](https://github.com/mjackson/expect) - Assertions
    - [Should](https://shouldjs.github.io/) - Assertions
    - [Chai-Sinon](https://github.com/domenic/sinon-chai) - Chai Assertions for sinon
    - [Chai-Subset](https://www.npmjs.com/package/chai-subset) - Extra Assertions
    - [Chai-AsPromised](http://chaijs.com/plugins/chai-as-promised/) - Extra Assertions

* HTTP Integration Tests
    - [Chai-http](http://chaijs.com/plugins/chai-http/)
    - [SuperTest](https://github.com/visionmedia/supertest)

* Mocking Libraries
    - [Sinon.JS](http://sinonjs.org/)
    - [testdouble.js](https://github.com/testdouble/testdouble.js)

----

## Libraries - 2

* DOM
    - [JSDom](https://github.com/tmpvar/jsdom)
    - [mocha-jsdom](https://www.npmjs.com/package/mocha-jsdom)
* WebPack
    - [mocha-webpack](https://www.npmjs.com/package/mocha-webpack)

---

# Mocha and Chai

> Lets get started

----

## Setup

Install

```bash
$ npm init
$ npm install mocha chai --save-dev  # or yarn add mocha chai --dev
```

Config

```json
// package.json
"scripts": {
  "test": "mocha *.spec.js --watch"
}
```

First test

```js
const chai = require('chai')
const expect = chai.expect

describe('my first test', () => {

    it('should work', () => {
        expect(true).to.equal(true)
    })
})
```

----

## Run

Run

```bash
$ yarn test
yarn test v0.18.1
$ mocha *.spec.js --watch

  Test
    ✓ should work

  1 passing (7ms)

```

> Any file change will trigger test run

----

## Setup and teardown

```js
const chai = require('chai')
const expect = chai.expect

describe('my first test', () => {
```
```js
    beforeEach(() => {
        // setup before each test
    })

    afterEach(() => {
        // cleanup after each
    })
```
```js
    it('should ...', () => {
        ...
    })
})
```

----

## Config & Helper

./test/mocha.opts
<br><small>(make sure it's in the test folder)</small>

```
--reporter dot
--require ./test/test-helper.js
```

./test/test-helper.js

```js
var chai = require('chai')
global.expect = chai.expect

before(() => {
    // global setup
})

after(() => {
    // global cleanup
})
```

----

## ES.Next

```bash
# install & configure babel
$ npm install babel-core babel-preset-latest --save-dev
```

```json
// .babelrc
{
    "presets": ["latest"]
}
```

```bash
# startup (or place it in mocha.opts)
mocha --compilers js:babel-core/register
```

```js
// test.spec.js
import { expect } from 'chai'

describe('my first test', () => {
    it('should ...', () => {
        ...
    })
})
```

----

### Mocha - Special tests cases

Pending tests

    it('should return -1 when the value is not present');

Exclusive tests

    describe.only   only this block
    it.only         only run this test

Inclusive tests

    describe.skip   exclude/ignore this block
    it.skip         exclude/ignore this test

----

## Chai

Expect syntax chai

    expect(value).to.exist
    expect(value).to.not.exist

    expect(value).to.equal('ababa')
    expect(value).to.not.equal('ababa')

    expect([]).to.be.empty
    expect('').to.be.empty

    expect(object).to.be.an.instanceof(HttpError)

[More Chai Expect](https://gist.github.com/patocallaghan/6154431)

---

# Async Testing Patterns

> All my Javascript is asynchronous

----

## An async test

```js
// myService.js
export function find(query, callback) {
    setTimeout(() => {
        if (!query) {
            callback('bad value')
        }
        callback(null, 'abc')
    }, 1)
}
```
```js
// myService.spec.js
import { find } from './myService'
import { expect } from 'chai'

describe('test', () => {
    it ('should fail', () => {
        find('query', function(err, data) {
            expect(data).to.equal('cba')
        })
    });
});
```
<!-- .element: class="fragment" data-fragment-index="2" -->
This should fail, why doesn't it?
<!-- .element: class="fragment" data-fragment-index="2" -->

> The test is done before the callback is finished
<!-- .element: class="fragment" data-fragment-index="3" -->

----

## Fix - Wait for the end

```js
// myService.spec.js
import { find } from './myService'
import { expect } from 'chai'

describe('test', () => {
    it ('should fail', (done) => {
        find(null, function(err, data) {
            expect(data).to.equal('cba')
            done()
        })
    })
})
```

> 'done' can also be used in 'beforeEach' & 'afterEach'

----

## Async test with promise

```js
// myService.spec.js
import { find } from './myService'
import { expect } from 'chai'

describe('test', () => {
    it ('should work', () => {
        // return the promise here
        return find('query')
            .then(data => {
                expect(data).to.equal('abc')
            })
        })
    });
});
```

> Returning the promise let the test wait until the end. And it works with errors also :)

<span style="color:orange;">Alert: This doesn't work with Jasmine!</span>

---

# Spies, stubs and mocks

> Test the untestable :)

----

# A Use Case

```js
// myRepo.js
import User from 'userModel'
import domainService from ''
export function updateUser(id, updatedUser) {
    return User.findById(id)
        .then(user => {
            if (domainService.applyCustomer(user) == 'canceled') {
                return true
            }
            return false
        })
}
```

```js
import myRepo from './myRepo'
describe('test myRepo', () => {
    it('should ...', () => {
        // how to test without the DB?
        // how to test if applyCustomer is called
        // ?????
        myRepo.updateUser({ id: 122, 'name': 'peter'});
    })
})

```

----

## Sinon.JS

Standalone and test framework agnostic JavaScript test spies, stubs and mocks (pronounced "sigh-non").

Install

```bash
    $ npm install sinon --save-dev
```

Can handle

- ***Spies*** : Watch and report a function
- ***Stubs*** : Replace and spies existing function
- ***Mocks*** : Like stub but verifies expectations.

----

## Spies

The primary use for spies is to gather information about function calls
A more common pattern is to replace another function with a spy.

```js
var service = {
  ...
  doAction: function(name){
     this.name = name
  }
}

// Create a spy for the setName function
var spy = sinon.spy(user, 'doAction')

// Now, any time we call the function,
// the spy logs information about it
service.doAction('Angular')
```
```js
//Which we can see by looking at the spy object
console.log(spy.callCount)          //output: 1
```

----

## Spies

```js
    var spy = sinon.spy();

    spy(); // Invoke the spy function

    spy.called;             // true when called
    spy.calledOnce;         // true when called once
    spy.callCount;          // the number function was called
    spy.calledWith(arg1);   // true when called with arg1
    spy.threw();            // threw an error
    spy.returned(obj);      // returned the obj

    spy.firstCall.args;     // arguments
    spy.args;               // calls / args - [0][0]: first call, first
    spy.exception;          // the exception teh spy threw
    spy.returnValue;        // the returned value of the spy
    argument
```

----

## Sinon-Chai

Install

```bash
    $ npm install sinon-chai --save-dev
```

Chai helpers for easier sinon testing

```js
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import myService from './myService'
chai.use(sinonChai)

    ...
    it('should work', () => {
        var spy = sinon.spy(myService, 'methodToStub')
        myService.methodToSpy('Hello')
        expect(spy).to.have.been.calledWith('Hello', 'World')
        expect(spy).to.have.returned(1234)
    })
```

Chai-Sinon syntax: https://github.com/domenic/sinon-chai

More: [The Ultimate Unit Testing Cheat-sheet](https://gist.github.com/yoavniran/1e3b0162e1545055429e)

----

## Sinon Sandbox

You can only stub or spy a function once!

```js
let sandbox;
beforeEach(() => {
    sandbox = sinon.sandbox.create()
});

afterEach(() => {
    sandbox.restore()
});

it('test', () => {
    const spy = sandbox.spy(service, 'method')
                        .throws(new Error('bad bad bad'))
    ...
})
```

----

## Stubs

Stubs have the functionality of spies, but instead of just spying on what a function does, a stub completely replaces it. In other words, when using a spy, the original function still runs, but when using a stub, it doesn’t.

Spy

    var spy = sinon.spy(myService, 'methodToSpy')

Stub

    var stub = sinon.stub(myService, 'methodToStub').returns(arg);

> Most of the time the 'stub' is what you need.

----

## Stubs

```js
// create stub
var stub = sinon.stub();
var stub = sinon.stub(service, 'method');

// define the behavior
stub.returns("World");
stub.withArgs("Hello").returns("World");
stub.withArgs("Kapow").throws(new Error());
stub.withArgs("Hello").returns(Promise.resolve(123));
stub.withArgs("Hello").returns(Promise.reject(123));
```

----

## Stubs - Replace

Replacing Ajax

```js
function saveUser(user) {
    $.post('/users', {
        first: user.firstname,
        last: user.lastname
    });
}
```

```js
it('should call callback after saving', () => {
    // We'll stub $.post so a request is not sent
    var stub = sinon.stub($, 'post')
    saveUser({ firstname: 'Han', lastname: 'Solo' })
    expect(stub).to.have.been.calledWith({first: 'Han', last:'Solo'})
});

```

----

## Stubs - Returns or Throws

Triggering different code paths

```js
function saveUser(user) {
    if (myService.count() === 100) {
        ...
    }
}
```

```js
it('should call callback after saving', () => {
    // We'll stub $.post so a request is not sent
    var stub = sinon.stub(myService, 'count').returns(100)
    saveUser({ firstname: 'Han', lastname: 'Solo' })
    expect(stub).to.have.been.calledWith({first: 'Han', last:'Solo'})
});

```

```js
// throwing an exception
var stub = sinon.stub(myService, 'count')
                .throws(new Error('bad bad'))
```

----

## Mocks

Mocks is about mocking objects, not functions.
A mock will fail your test if it is not used as expected.

```js
describe('incrementStoredData', () => {
    it('should increment stored value by one', () => {
        // arrange
        var storeMock = sinon.mock(store)
        storeMock.expects('get').withArgs('data').returns(0)
        storeMock.expects('set').once().withArgs('data', 1)

        // act
        incrementStoredData();

        // arrange
        storeMock.verify();
    });
});
```

----

## Fake timers

Fake timers is a synchronous implementation of 'setTimeout'.

```js
// replace the global setTimeout and stop time.
var clock = sinon.useFakeTimers();

// The code won't do anything as the timer is not running now.
setTimeout( function() { console.log('One second has elapsed.'); }, 1000 );

// tick the clock ahead 1000 ms
clock.time(1000);

// now the timer function is executed
```

Don't forget to cleanup

```js
beforeEach(function () {
     clock = sinon.useFakeTimers();
 });

afterEach(function () {
    clock.restore();
});
```

----

## Fake server

Provides a fake implementation of XMLHttpRequest.

```js
// replace XMLHttpRequest object
const server = sinon.fakeServer.create();

// specifies response on GET
server.respondWith('GET', '/api/stuff', [200,
    { 'Content-Type': 'application/json' },     // headers
    '{ "stuff": "is", "awesome": "in here" }',  // content
])

```

```js

// fetch data
jQuery.ajax({
  url: "/something",
  success: function(result) {
    console.log(result)
  }
});
```

```js
// Process all requests so far
server.respond();

// restore original XMLHttpRequest
server.restore()
```

----

## Testing fetch api

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

## Testing fetch api

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
    const stubfetch = sinon.stub(window, 'fetch')
                           .returns(Promise.resolve(res))
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
it ('formats the response correctly', () => {
    // arrange
    const stubfetch = sinon.stub(window, 'fetch')
                           .returns(jsonOk('{"hello":"world"}'))

    // act
    return client('/foobar')
        .then((json) => {
            // assert
            expect(json.hello).toBe('WORLD');
        });
});

```

> Alternative you can use 'fetch-mock' for any fetch testing.

---

# API Integration Testing

> Testing it all together

----

## Test a RESTful API

The app

```js
// app.js
...
const app = express();
app.use(bodyParser.json());
app.get("/book", (req, res) => {
    // get books from db
    const books = [
        { id: 1, title: 'Advanced Javascript'},
        { id: 2, title: 'Webpack, the build master'}
    ]
    res.status(200).json(books)
});
export app;

// listening on port is done in server.js
```

----

## Test a RESTful API

The test

```js
// import chai & chai-http
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';

// extend chai with http
chai.use(chaiHttp);
```
```js

// test
describe('/GET book', () => {
    it('it should GET all the books', () => {
        return chai.request(app)
            .get('/book')
            .then(res => {
                expect(res).to.have.status(200);
                expect(req).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.length(2);
            })
    })
})
```

----

## API Scenario Testing

A login scenario

```js
var agent = chai.request.agent(app)
agent
    .post('/session')
    .send({ username: 'me', password: '123' })
    .then( res => {
        expect(res).to.have.cookie('sessionid');
        // The `agent` now has the sessionid cookie saved, and will send it
        // back to the server in the next request:
        return agent.get('/user/me')
    })
    .then( res => {
        expect(res).to.have.status(200);
        ...
    })
```

More see: [http://chaijs.com/plugins/chai-http/](http://chaijs.com/plugins/chai-http/)

----

## MongoDB testing

```js
// ./test/helper/mongoose.js
import mongoose from 'mongoose';

export function connectDB() {
    //fix cannot overwrite compiled
    mongoose.models = {}
    mongoose.modelSchemas = {}
    // contect to test db
    return mongoose.connect(`mongodb://localhost:27017/myapp-test`, {
        config: { autoIndex: true }
    });
}
```
```js
export function dropDB() {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.dropDatabase(err => {
            if (err) reject(err)
            else resolve()
        })
    })
}
```
```js
export function disconnectDB() {
    return mongoose.disconnect()
}

```

----

## MongoDB testing

The setup, test and teardown

```js
    import {
        connectDB,
        dropDB,
        disconnectDB
    } from '../test/helper/mongoose';

    before(() => connectDB())
    before(() => dropDB())
```
```js
    it('your test', () => {
        const user = new User({ name: 'peter' });
        return user.save()
            .then(user => {
                expect(user._ID).to.exist;
                expect(user.name).to.equal('peter')
            })
    })

```
```js
    after(() => disconnectDB())
```
