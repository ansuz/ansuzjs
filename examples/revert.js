var $=require("../ansuz");

var hex=$.range(9).concat(['A','B','C','D','E','F']);
var octal=$.combinatorial(hex,hex);

console.log($.first(octal,20).map(function(x){return x.join("");}));
