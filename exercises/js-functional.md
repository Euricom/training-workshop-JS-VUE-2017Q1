# Javascript Function Problems

## What is x?

	function funkey(o) {
		o = null;
	}

	var x = [];
	funkey(x);
	alert(x);

    // what is x?
    a. null
    b. []
    c. undefined
    d. throw

<img src="./questions-answers.png" width="100"> Answer:

    a. null
    b. []        <--
    c. undefined
    d. throw

## What is x?

    function swap(a, b) {
        var temp = a;
        a = b;
        b = temp;
    }

    var x = 1, y = 2;
    swap(x, y);
    alert(x);

    // What is x?
    a. 1
    b. 2
    c. undefined
    d. throw

<img src="./questions-answers.png" width="100"> Answer:

    a. 1    <--
    b. 2
    c. undefined
    d. throw

## Write a function that takes an argument and returns that argument.

    identify(3)  // 3

<img src="./questions-answers.png" width="100"> Answer:

    function identity(x) {
        return x;
    }

    // or
    var identity = function(x) {
        return x;
    }

## Write two binary functions add and mul, that takes two numbers and return their sum and products.

    add(3, 4)   // 7
    mul(3, 4)   // 12

<img src="./questions-answers.png" width="100"> Answer:

    function add(x, y) {
        return x + y;
    }

    function mul(x, y) {
        return x * y;
    }

## Write a function that takes an argument and return a function that returns that argument;

    idf = identityf(3);
    idf();  // 3

<img src="./questions-answers.png" width="100"> Answer:

    function identityf(arg) {
        return function() {
            return arg;
        }
    }

## Write a function that adds from two invocations:

    addf(3)(4)  // 7

<img src="./questions-answers.png" width="100"> Answer:

    function addf(x) {
        return function(y) {
            return x + 7;
        }
    }

## Write a function that takes a binary function (like add), and makes it callable with two invocations.

    addf = applyf(add);
    addf(3)(4)           // 7
    applyf(mul)(5)(6)    // 30

<img src="./questions-answers.png" width="100"> Answer:

    function applyf(fn) {
        return function(x) {
            return function(y) {
                return fn(x, y);
            }
        }
    }

## Write a function that takes a function and an argument, and returns a function that can supply a second argument.

    add3 = curry(add, 3);
    add3(4)             // 7
    curry(mul, 5)(6)    // 30

<img src="./questions-answers.png" width="100"> Answer:

    function curry(fn, x) {
        return function(y) {
            return fn(x, y);
        }
    }

## Without writing any new function (using existing functions), show three ways to create the inc function

    inc(5)          // 6
    inc(inc(5))     // 7

<img src="./questions-answers.png" width="100"> Answer:

    inc = addf(1);
    inc = applyf(add)(1);
    inc = curry(add, 1);

## Write 'methodize', a function that converts a binary function to a method.

    Number.prototype.add = methodize(add);
    (3).add(4)      // 7

<img src="./questions-answers.png" width="100"> Answer:

    function methodize(fn) {
        return function(y) {
            return fn(this, y);
        }
    }

## Write 'demethodize', a function that converts a method to a binary function

    demethodize(Number.prototype.add)(5, 6) // 11

<img src="./questions-answers.png" width="100"> Answer:

    function demethodize(fn) {
        return function(that, y) {
            return fn.call(that,y);
        }
    }

# Write a function 'twice' that takes a binary function and returns a unary function that passes its argument to the binary function twice.

    var double = twice(add);
    double(11)  // 22
    var square = twice(mul);
    square(11)  // 121

<img src="./questions-answers.png" width="100"> Answer:

    function twice(fn) {
        return function(x) {
            return fn(x, x);
        }
    }


## Write a function 'composue' that takes two unary functions and return a unary function that calls them both.

    composeu(double, square)(3)     // 36

<img src="./questions-answers.png" width="100"> Answer:

    function composeu(fn1,fn2) {
        return function(x) {
            return fn2(fn1(x));
        }
    }

## Write a function 'composeb' that takes two binary functions and return a function that calls them both.

    composeb(add, mul)(2,3,5);      // 25

<img src="./questions-answers.png" width="100"> Answer:

    function composeb(fn1, fn2) {
        return function(x,y,z) {
            return fn2(fn1(x,y), z);
        }
    }

## Write a function that allows another function to only be called once.

    add_once    = once(add);
    add_once(3, 4)  // 7
    add_once(3, 4)  // throw;

<img src="./questions-answers.png" width="100"> Answer:

    function once(fn) {
        return function(x, y) {
            var f = fn;
            fn = null;
            return f.apply(this, arguments);
        }
    }

## Write a factory function that returns two functions that implement and up/down counter;

    counter = counterf(10);
    counter.inc();  // 11
    counter.dec();  // 10

<img src="./questions-answers.png" width="100"> Answer:

    function counterf(x) {
        return {
            inc: function() {
                x = x + 1;
                return x;
            }
            dec: function() {
                x = x - 1;
                return x;
            }
        }
    }

## Write a revocable function that takes a 'nice' function, and returns a 'revoke' function that denies access to the nice function, and invoke function that can invoke the nice function until it is revoked.

(don't use a boolean flag)

    temp = revocable(alert);
    temp.invoke(7);     // alert: 7
    temp.revoke();
    temp.invoke(8);     // throw;

<img src="./questions-answers.png" width="100"> Answer:

    function revocable(fn) {
        return {
            invoke: function(x) {
                fn.apply(x, arguments);
            },
            revoke: function() {
                fn = null;
            }
        }
    }


