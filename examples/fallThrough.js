var $=require("../ansuz");

var cons=$.cons(
  $.either($.range(5)),
  $.either(["A","B","C","D","E","F"])
);

// list the first 8 elements of either lazy list
// starting with the first list
console.log($.first(cons,8));

// get all remaining elements of the concatenated list
// fail safely when you reach the end.
console.log($.listall(cons));
