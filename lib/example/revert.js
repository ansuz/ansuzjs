var van=require("../van.js");
var gen=require("../gen.js");

//var F=van.range(7);
//var G=van.range(7);

var hex=van.range(9).concat(['A','B','C','D','E','F']);

var octal=gen.combinatorial(hex,hex);

console.log(gen.first(octal,20).map(function(x){return x.join("");}));
