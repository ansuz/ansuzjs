var ansuz = require("../ansuz");

var fact = ansuz.memo(function (n, c) {
    console.log('generating the %sth factorial number', n);
    return n < 2? n: n * fact(n - 1);
});

var pascal = function (n, k) {
    return (k === 0 || n === k)? 1: fact(n) / (fact(k) * fact(n - k));
};

var P = ansuz.range(0, 6).map(ansuz.fix1(pascal, 6));
console.log(P);

