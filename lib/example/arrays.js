var van=require("../van.js");

/* Good functional programming style usually involves passing an array as a value
  or using javascripts functional array methods (map, filter, reduce)
  by passing functions as arguments to be applied to the array's values.

  These methods are more reliable than for loops for several reasons
  * they are guaranteed to stay within the bounds of the array (no off by ones)
  * they can be chained, since they are each guaranteed to return an array
  * they introduce their own scope, and do not pollute the global namespace

  this library features some higher level functions
  designed to make working with arrays in this manner even easier.
*/

/* creating an null filled array of length N */

console.log(van.nullArray(10));

/* creating a pre-initialized array */

console.log(van.range(5));

/* creating a pre-initialized array with values ranging from x to y)

console.log(van.range(2.7));

/* finding only the even numbers in an array */

// functions which take a single argument and return true or false
//  are commonly referred to as 'predicates'

console.log(van.range(3,17)
  .filter(function(x){
    return x%2===0;
  }));

/* We can use 'negate' to invert our function
  and retrieve the compliment of the even numbers (the odds) */

console.log(van.range(3,17)
  .filter(van.negate(function(x){
    return x%2===0;
  })));

/* Cool, now what if we want to play around with multidimensional arrays? */

/* we can make a square matrix fairly easily */

console.log(van.carteSquare(function(x,y){
  return x*y;
},van.range(12)));

/* if we want a rectangular matrix, we have to pass two arrays */

console.log(van.carte(function(x,y){
  return x*y;
},van.range(2,5),van.range(7)));

/* Suppose we want to flatten a multidimensional array so that we can map over it? */

console.log(van.flatten(
  van.carteSquare(function(x,y){
    return Math.pow(x,y);
  },van.range(2,5))));
