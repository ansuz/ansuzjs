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

/* Example usage in example/arrays.js */

van.negate = negate = function(p){
  return function(x){
    return !p(x);
  };
};

/* Example usage found in example/compose.js */

van.compose = compose = function(f,g){
  return function(x){
    return g(f(x));
  };
};

van.sum = sum = function(A){
  return A.reduce(function(a,b){
    return a+b;
  });
};

van.range = range = function(a,b){
  var temp=[];
  b = b || a;
  if(a===b)a=0; // beware, if a and b are equal, it indexes from 0
    // maybe that's not what you expect
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

/* Shuffle an array */

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

// dat parsimony
if(typeof module!=="undefined"&&module.exports)module.exports=van;
