var $=require("../ansuz");

/* Unlike the memoizing prime example
  there is a direct correlation between fibonacci numbers
  which allows us to write a much more concise example */

var memoFib=$.memo(
  function(n,c){ // make sure to give a name to the cache in your function

    // standard output gives us an idea what's happening with each call
    console.log("generating the %sth fibonacci number",n);
    return (n<2)? // the function fills the first few elements itself
      n:
      c.memo[n-1]+c.memo[n-2]; // and otherwise just refers to the cache
  });

console.log(memoFib()); // next element..
console.log(memoFib()); // next..
console.log(memoFib());
console.log(memoFib()); // you get the idea

console.log(memoFib(7));
console.log(memoFib(19));

console.log(memoFib()); // in case you weren't sure if it would keep it up
console.log(memoFib(5)); // what if we move back?
