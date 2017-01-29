// ES5 - with IFFE
for(var i = 0; i <= 5; i++) {
    (function(cnt) {
        setTimeout(function() {
            console.log('i: ' + cnt);
        }, cnt*1000)
    })(i);
}

// ES6 - with let
for(let i = 0; i <= 5; i++) {
    setTimeout(() => {
        console.log('i: ' + i);
    }, i*1000)
}
