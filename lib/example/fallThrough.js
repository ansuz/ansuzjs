var van=require("../van.js");
var gen=require("../gen.js");

var cons=gen.cons(
  gen.either(van.range(5)),
  gen.either(["A","B","C","D","E","F"])
);

console.log(gen.first(cons,9));
