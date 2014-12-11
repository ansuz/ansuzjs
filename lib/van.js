/* 'van.js' (vanguard), because I load this module in advance of all others
 * Ubiquitious functional-style support functions
 * no dependencies
 */

var van = {};

/* Currying functions :: which take a function and some of its parameters as arguments
  and return a new function which calls the original with some of its arguments fixed.
  Using fix1 or fix2, we can 'fix' either argument of a binary function,
  and produce a new unary function.

  This is useful for when you want to map a function over an array.

  Use fixN when you have a function with more than two arguments,
  simply provide the new argument, and the index (from zero) of the arg you replace  */

/* Example uses found in example/currying.js */

van.fixN = fixN = function(f,a,n){
  n=n||0;
  return function(b){
    args=Array.prototype.slice.call(arguments); // more general now
    args.splice(n,0,a);
    return f.apply(null,args);
  };
};

van.fix1 = fix1 = function(f,a){
  return function(b){
    return f(a,b);
  };
};

van.fix2 = fix2 = function(f,b){
  return function(a){
    return f(a,b);
  };
};

/* function negation is useful when you intend to filter an array.
  negating the 'predicate' function you pass to the filter method,
  will return the 'set complement' of the original subset */

/* Example usage in example/arrays.js */

van.negate = negate = function(p){
  return function(x){
    return !p(x);
  };
};

/* Like currying or function negation, compose returns a new function
  which returns the result of the first function's output
  passed as an argument to the second.

  Use compose with the 'reduce' method to chain an arbitrary number of functions */

/* Example usage found in example/compose.js */

van.compose = compose = function(f,g){
  return function(x){
    return g(f(x));
  };
};

/* Compared to the previous functions, this one is rather boring
  It returns the sum of an array, an operation common enough (used within this lib)
  that I decided to include it here.
  Similarly, you could make a 'product' function by using multiplication */

/* See usage in van.stdDev, found below */

van.sum = sum = function(A){
  return A.reduce(function(a,b){
    return a+b;
  });
};

/* Array functions :: starting with 'range'
  range is a variadic function, taking zero, one, or two arguments.
  given no arguments, it returns [0]
  given one, it produces an inclusive range from zero to its argument.
  given two, it returns a range from its first to its second argument. */

/* example usage ALL OVER THE PLACE, range is a staple when working with arrays */

van.range = range = function(a,b){
  var temp=[];
  b = b || a;
  if(a===b)a=0; // beware, if a and b are equal, it indexes from 0
    // maybe that's not what you expect
  while(a<=b)temp.push(a++);
  return temp;
};

/* nullArray, for those times when you don't care about what's in an array
  instantiate an array of the appropriate length
  use map to fill it, or use it strictly for its side effects
  guaranteed not to exceed its bounds */

van.nullArray = nullArray = function(n){
  var temp = [];
  while(n-- > 0)temp.push(null);
  return temp;
};

/* Flatten :: accepts an array of arrays, and returns a new array
  the resulting array is the concatenation of all the nested arrays
  meaning the result will be one dimension smaller.
  A two dimensional array becomes a one dimensional array containing
  all the elements of the original data.
  If you want to flatten an n-dimensional array, you can just use recursion */

/* example usage found in example/arrays.js */

van.flatten = flatten = function(AA){
  return AA.reduce(function(A,B){
    return A.concat(B);
  });
};

/* Cartesian products!! take a binary function and two arrays
  return a two dimensional array containing the results of the binary function
  for every possible combination of arguments */

/* example usage found in example/array.js */

van.carte = carte = function(f,A,B){
  return A.map(function(a){
    return B.map(fix1(f,a));
  });
};

/* As above, except that it only takes a single array as an argument
  the two dimensional array that it returns is the product of that array
  applied against itself. */

van.carteSquare = carteSquare = function(f,A){
  return A.map(function(a,i,z){
    return z.map(fix1(f,a));
  });
};

/*  The results of commutative binary functions
    such as multiplication are repeated when you use 'carteSquare'
    If you want to avoid repeating the same argument combinations
    use van.comb, which reduces the size of the array with each iteration */
/* See example/comb.js for a demonstration */
van.comb=comb=function(f,A){
  // make a copy of the array in question
  var B=A.slice(0);
  // map over the initial array
  return A.map(function(a){
    // compute the results of the current iteration
    var R=B.map(fix1(f,a));
    // remove the first element
    B.shift();
    // return the results
    return R;
  });
};


/* Aleatoric functions (randomness) */

/* van.die returns a random integer between 0 and r-1 */

van.die = die = function(r){
  return Math.floor(Math.random()*r);
};

/* shuffle takes an array and returns a new array containing all the same elements
  those elements will have had their order changed in a random fashion */
/* example usage found in example/cards.js */

van.shuffle=shuffle=function(A){
  var i=A.length;
  while(i){
    var r=die(i--);
    var temp=A[i];
    A[i]=A[r];
    A[r]=temp;
  }
  return A;
};

van.cut=cut=function(A,n){
  n=Math.min(n,A.length);
  A=A.slice(n).concat(A.slice(0,n));
  return A;
};

/* A few basic membership handlers */

/* van.exists packages the array.indexOf method in a form which is easier to curry
  This means you can fix an array as the first argument
  then filter another array using the resulting function
  and remove elements common between both arrays.
  Used in conjunction with negate, you can find set complements, differences, unions, etc. */

van.exists = exists = function(A,e){
  return (A.indexOf(e)!==false)?true:false;
};

/* vals takes an object, and returns every value contained as an array */

van.vals = vals = function(O){
  return Object.keys(O).map(function(k){
    return O[k];
  });
};

/* This is just a trivial wrapper around Object.keys
  you probably want to just use Object.keys directly
  but I included it here for completeness, since I included vals */

van.keys = keys = function(O){
  return Object.keys(O);
};

/* merge is a function which merges two objects.
  If they have any keys in common, the keys of the first will be overwritten
  Objects in Javascript are passed *by reference*
  This object doesn't modify the existing objects
  instead, it returns a new object with the merged properties
*/

van.merge = merge = function(A,B){
  var o={}; // the new object
  Object.keys(A).map(function(k){
    o[k]=A[k]; // can't quite tell if it would be faster to do this conditionally
  });
  Object.keys(B).map(function(k){
    o[k]=B[k]; // will overwrite if key already exists (via A)
  });
  return o;// return the new object
};

/* another trivial wrapper, use with filter and length to check
  how many instances of an element are contained within an array */

van.is = is = function(a,b){
  return a === b;
};

/* Standard Deviation and other statistical measures 
  Example usage in example/stats.js */

van.stdDev = stdDev = function(A){
  var S = sum(A),
  L = A.length;
  mean = S/L;
  var variance = sum(A.map(function(x){
    return Math.pow(x-mean,2);
  }))/A.length;
  return Math.pow(variance,0.5);
};

/* Scheduling */

/* van.schedule takes a function (f) and a number of milliseconds (t)
  it then calls 'f' every 't' milliseconds
  it optionally takes a third argument 'n', which it will deincrement
  at each function call. When 'n' reaches 0, the loop will terminate. */

/* Example usage in example/cron.js */

van.schedule = schedule = function(f,t,n){
  n = n || -1;
  n -= 1;
  if(n===0){
    setTimeout(function(){
      f(n);
    },t);
  }else{
    setTimeout(function(){
      f(n);
      schedule(f,t,n);
    },t);
  }
};

// datParsimony™
/* exporting the contents of the module in this fashion
  allows us to use the module within a nodejs script
  or in the browser */
if(typeof module!=="undefined"&&module.exports)module.exports=van;
