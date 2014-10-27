var gen=require("../gen.js");

var funs =[
  [0,1]
  ,["a","b","c"]
  ,['A','B','C','D']
].map(function(x){
  return gen.cycle(x);
}); // return an array of generators like a boss

var breadth=gen.fcycle(funs);

console.log(gen.first(breadth,20));


