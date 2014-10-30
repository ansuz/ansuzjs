var gen=require("../gen.js");

/*
  a forgetful generator
  pass it a function which takes an index
  and it will return a void function which can be called repeatedly
  incrementing the value at each invocation
  */

// count is a function which counts..
var count=gen.forget(
  function(x){console.log(x);}
);

count();
count();
count();

/* 
  gen.forget takes optional second and third arguments:
    its initial index, and its cache
  The generator that gets returned can't access either manually
  any interaction will need to be defined within the passed function

  It's useful for creating persistent variables beyond the index
  or behaviour besides incrementing
  that behaviour will remain static, however
  as such, gen.forget is the safest generator you can use.
*/

/* override the initial index with a second argument */

var countfrom5=gen.forget(function(i){
  console.log(i);
},5);

countfrom5();
countfrom5();
countfrom5();

/* implement alternative deincremental behaviour using the cache */

var countdown=gen.forget(
  function(i,c){
    console.log(c.j--);
  }
  ,5
  ,{j:10}
);

countdown();
countdown();
countdown();
countdown();
countdown();
