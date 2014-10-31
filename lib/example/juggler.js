var van=require("../van.js");
var gen=require("../gen.js");

/* This isn't really an example of anything I haven't already demonstrated
  but I think the juggler's sequence is cool!
  http://en.wikipedia.org/wiki/Juggler_sequence
*/

var juggler=function(c){ // juggler is a function which takes a cache
  if(c.n===1)return; // the strict definition of the sequence is infinite
  c.n= (c.n%2===0)? // if the previous number is infinite
    Math.floor(Math.pow(c.n,1/2)): // return the floor of its root
    Math.floor(Math.pow(c.n,1.5)); // otherwise return an exponent of it
  return c.n; // don't forget to return the number, for your iterators..
};

var juggleN=function(n){ // wrap up the juggler function in a state machine
  return gen.stateful(juggler,{n:n}); // provide its argument in the cache you pass
};

van.range(2,9).map(function(n){ // map juggleN over a few integers
  console.log("\nThe first 10 elements of the juggler sequence, for N == %s",n);
  console.log(gen.first(juggleN(n),10)); // generate the first 10
    // but don't bother continuing if you hit an undefined result
});
