var van=require("../van.js");

/* functions are just another kind of data in javascript
  that means we can pass them around like any other data type
  currying is one of the things you can do with such a passed function
  it's a method of wrapping up a function in another function which calls it
  fixing one of the original variables with a static value
  and effectively transforming an 'n-ary' functoin into an '(n-1)-ary' function
*/

// I'll be demonstrating these functions by mapping them over arrays
// so to make my life easier, I'm also going to use my 'range' function

console.log(van.range(9));

// To show how this works, we need a function to transform...

var div = function(a,b){
  return a/b;
};

/* suppose we want this binary function to be unary instead...
   we fix the second argument using 'fix2'
  and pass the value 3 as its new constant */

var divBy3=van.fix2(div,3);

console.log(van.range(9)
  .map(divBy3)
);

/* we can do the opposite by using fix1 */
var div3By=van.fix1(div,3);

console.log(van.range(9)
  .map(div3By)
);

/* Either option extends the usefulness of many functions
  they are only useful for binary functions, though
  To work with variadic functions, you need 'fixN', which is more complex
  it introduces a little more overhead
  this lib is about making YOUR life easier
  your CPU is probably underutilized anyway, so we can abuse it a little
  */

van.fixN(function(){
  console.log(arguments); // 'arguments' is a part of the standard js api
  }
  ,"pew" // the argument we'd like to splice in..
  ,1) // the index we'd like to splice it into (count from zero)
("pow","pow") // the "zeroth" and second arguments, after the fact..

/* Use fixN to transform a function of any arity into a null-ary function */

console.log(van.nullArray(6)
  .map(van.fixN(van.die,100,0) // die returns a random integer
));


