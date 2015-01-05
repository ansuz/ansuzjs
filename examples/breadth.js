var $=require("../ansuz");

var funs =[
  [0,1]
  ,["a","b","c"]
  ,['A','B','C','D']
].map(function(x){
  return $.cycle(x);
}); // return an array of generators like a boss

var breadth=$.fcycle(funs);

console.log($.first(breadth,20));


