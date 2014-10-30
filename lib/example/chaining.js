var gen=require("../gen.js");

/* chain is a higher level wrapper around gen.cons
  it accepts an array of lazy functions
  and reduces it into a single function
  which will fall through to the next function in the array
  at the 'end' of the current function */

var chain=gen.chain(
  [gen.either([1,2,3,4,5])
  ,gen.either([2,3,4,5])
  ,gen.either([9,4,7,3])
  ]
);

console.log(gen.listall(chain)); // list every element in the chain of generators
