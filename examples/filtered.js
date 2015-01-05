var $=require("../ansuz");

// the most basic example $erator.. count through the integers
var count=$.forget(function(i){return i;});

console.log(
  $.first(
    $.filter(count // return a new $erator which throws away unsatisfactory results
      ,function(x){ // defined by a function
        return x%2==0; // such that only even numbers are satisfactory
      }),5) // get the first five results
); // and display what you found
