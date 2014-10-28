var van=require("../van.js");

/* 'Reduce' is an array method which successively applies a binary function
  against each element in an array, passing along the accumulated value
  as the first argument for the next application.

  I've used it to make a 'sum' function, which sums an array */

/* Combine sum and range to produce the triangular numbers */

/* There are more efficient ways to generate triangular numbers
  This method is useful for other expressions
  which may not have an algebraic shorthand */

console.log(van.range(9).map(function(x){
    return van.sum(van.range(x));
  })
);

/* You can use compose to produce the same function
  by passing it an array of the component functions and using 'reduce' */

console.log(van.range(9).map(
  [van.range,van.sum]
    .reduce(compose)));

/* This technique can be used to dynamically produce complicated behaviour */
