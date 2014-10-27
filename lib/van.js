/* 'van.js' (vanguard), because I load this module in advance of all others
 * Ubiquitious functional-style support functions
 * no dependencies
 */

var van = {};

/* Currying functions */
/* Example uses found in example/curring.js */

van.fixN = fixN = function(f,a,n){
  n=n||0;
  return function(b){
    args=Array.prototype.slice.call(arguments); // more general now
    args.splice(n,0,a);
    return f.apply(null,args);
  };
};

van.die = die = function(r){
  return Math.floor(Math.random()*r);
};

van.nullArray = nullArray = function(n){
  var temp = [];
  while(n-- > 0)temp.push(null);
  return temp;
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

van.negate = negate = function(p){
  return function(x){
    return !p(x);
  };
};

/*
 * When we want to chain functions into a new function, we use 'compose'
 */

van.compose = compose = function(f,g){
  return function(x){
    return g(f(x));
  };
};

/*
 * we commonly need to sum an array.
 * conveniently, the functional way of summing also demonstrates a useful technique.
 */

van.sum = sum = function(A){
  return A.reduce(function(a,b){
    return a+b;
  });
};

/*
var expter = function(a,b){return Math.pow(a,b);};
console.log([fix2(expter,2),fix1(expter,3),fix1(expter,2)]
    .reduce(compose)(2));
*/

/*
 * In its most common form, Reduce continually applies a binary function to a list
 * until nothing remains.
 * by reducing an array of functions with compose,
 * we can chain an arbitrarily long series of functions into one.
 */

/*
console.log(compose(
  function(x){return x*3;},
  function(x){return x*4;})(5)
);
*/

// These sequential arrays are getting repetitive
// never leave home without a range function.
// FYI, I like my range functions to be inclusive
// I took some shortcuts making this a unary/binary function
// if its arguments are equal, it will default the first to 0
// deal with it.

van.range = range = function(a,b){
  var temp=[];
  b = b || a;
  if(a===b)a=0;
  while(a<=b)temp.push(a++);
  return temp;
};

van.carte = carte = function(f,A,B){
  return A.map(function(a){
    return B.map(fix1(f,a));
  });
};

van.carteSquare = carteSquare = function(f,A){
  return A.map(function(a,i,z){
    return z.map(fix1(f,a));
  });
};

van.flatten = flatten = function(AA){
  return AA.reduce(function(A,B){
    return A.concat(B);
  });
};

/* A few basic membership handlers */

van.exists = exists = function(A,e){
  return A.indexOf(e);
};

van.vals = vals = function(O){
  return Object.keys(O).map(function(k){
    return O[k];
  });
};

/*
console.log(van.vals({a:"0",b:"1",c:2}));
*/

van.keys = keys = function(O){
  return Object.keys(O);
};

van.is = is = function(a,b){
  return a === b;
};

/* Standard Deviation and other statistical measures */

van.stdDev = stdDev = function(A){
  var S = sum(A),
  L = A.length;
  mean = S/L;
  var variance = sum(A.map(function(x){
    return Math.pow(x-mean,2);
  }))/A.length;
  return Math.pow(variance,0.5);
};

/*
console.log(stdDev([1,2,2,1]));
*/

/* Scheduling */

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

/*
schedule(function(x){
  console.log(x);
},1000,5);
*/

// dat parsimony
if(typeof module!=="undefined"&&module.exports)module.exports=van;
