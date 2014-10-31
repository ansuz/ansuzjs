var big=require("../contrib/bignumber.js");
var gen=require("../gen.js");

var x=big(1); // the first factorial number is 1

var factorials=gen.memo(function(n,c){
  return big( // these are going to get pretty big
    ((n-1)>1)?c.memo[n-1]:1 // cover your base case 
  ).times(n) // multiply the last factorial by the current number
  .toFixed() // convert it to a fixed number instead of exponential
  .toString(); // convert it to a string
});


// memoize and print the first 1000 factorial numbers
console.log(gen.first(factorials,1000)); 

console.log(factorials()); // getting the 1001th factorial is easy too

module.exports=factorials;
