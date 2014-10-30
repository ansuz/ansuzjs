var gen=require("../gen.js");

// the most basic example generator.. count through the integers
var count=gen.forget(function(i){return i;});

console.log(
  gen.first(
    gen.filter(count // return a new generator which throws away unsatisfactory results
      ,function(x){ // defined by a function
        return x%2==0; // such that only even numbers are satisfactory
      }),5) // get the first five results
); // and display what you found
