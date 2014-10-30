var van=require("../van.js");
var gen=require("../gen.js");

var cons=gen.cons(
  gen.either(van.range(5)),
  gen.either(["A","B","C","D","E","F"])
);

// list the first 8 elements of either lazy list
// starting with the first list
console.log(gen.first(cons,8));

// get all remaining elements of the concatenated list
// fail safely when you reach the end.
console.log(gen.listall(cons));
