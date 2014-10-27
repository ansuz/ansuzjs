var gen=require("../backtrack.js");

var isPrime=function(n){
  if (isNaN(n)||!isFinite(n)||n%1||n<2)
    return false; 
  var m=Math.sqrt(n);
  for (var i=2;i<=m;i++)
    if(n%i==0)
      return false;
  return true;
}

var memoPrime=gen.memo(
  function(){// let's make a closure
    var count=gen.forget(function(x){return x+1;}); // which keeps track of the highest number we've checked for primality
    var cur; // we need a place to put the current number
    return function(){ // our closure returns a function which uses that number to find the next prime
      cur=count(); // since you must have checked the last number, move on to the next
      while(!isPrime(cur)) // keep going until you find a prime
        cur=count();
      return cur; // got one? return it!
    };
  }() // need to invoke our closure to return the interal function
); // and that function gets passed to our memoizer
  // which remembers the nth prime once it's been generated.

      
console.log(memoPrime()); // finds the first prime
console.log(memoPrime()); // the second prime
console.log(memoPrime()); // the third prime

console.log(memoPrime(7)); // generates the seventh prime 
  // and fills the cache with all the previous prime
  // (but only if they hadn't already been generated

/* using 'gen.first'
  'first' takes the first N results of some lazy list
  the position of these results is relative to the current index */

console.log(gen.first(memoPrime)); 
  // since we've generated the 7th prime, this will actually return the 8th

console.log(gen.first(memoPrime,3));
  // this will return the 9th, 10th, and 11th

console.log([3,15,4,7].map(memoPrime));
  // if we want specific indices, we use map.

/* 
There are more efficient ways to find primes, so this isn't a breakthrough sieve
It is, however, a fairly compact way of expressing the problem
and the approach can be generalized to other infinitely long sequences
*/

