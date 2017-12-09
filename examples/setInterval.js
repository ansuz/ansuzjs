var ansuz = require("../ansuz");
var sets = require("./sets");

var f = sets('abcdefghjikl'.split(''));

var iv = setInterval(function () {
    var x = f();
    if (!x) { return clearInterval(iv); }
    console.log(`[${x.join('')}]`);
}, 100);
