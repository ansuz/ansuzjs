var gen=require("../backtrack.js");

/*
  a memoizing generator
  pass it a function which takes an index
  and it will return variadic function which can be called repeatedly
  incrementing the value at each invocation
  and returning the generated value
  
  generated values are stored within a closure
  and can be retrieved by passing the index of that value

  if that index has not yet been generated
  the generator will be incremented
  and the intermediary values stored
  until it reaches the desired index
  at which point that value will be returned
  */

var memoed=gen.memo(function(x){
  return Math.floor(Math.random()*10);
});


console.log(memoed()); // zero'th increment
console.log(memoed()); // 1st increment
console.log(memoed()); // 2nd increment

console.log(memoed(0)); // reference the zero'th increment without triggering execution
console.log(memoed(0)); // do it again, just to prove it..

var env=gen.memo(function(i,c){
  console.log(JSON.stringify(c));
  return i*10;
});

console.log();

console.log(env()); // first call, cache is empty at invocation time
console.log(env()); // internal log call shows what variables the last call created..
console.log(env()); // internal cache is growing, and you can reference the last few calls
console.log(env()); // see what's happening?
