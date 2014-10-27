var gen=require("../gen.js");

var chain=gen.chain(
  [gen.either([1,2,3,4,5])
  ,gen.either([2,3,4,5])
  ,gen.either([9,4,7,3])
  ]
);

console.log(gen.first(chain,11));
//console.log(gen.listall(chain)); // breaks

