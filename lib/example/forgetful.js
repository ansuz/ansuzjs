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
