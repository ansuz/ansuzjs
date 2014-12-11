var van=require("../van.js");

/*  we want to calculate the distance between any two points on a graph
    distance is commutative
    computing a table duplicates many of the results
    comb ensures that we only compute examples once
*/

var allCombinations=van.comb(function(a,b){
  return {a:a,b:b};
},van.range(5));

console.log(allCombinations);
