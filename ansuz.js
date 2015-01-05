var ansuz={};

var isArray=ansuz.isArray=function(obj){
/*  Check if an object is an array */
  return Object.prototype.toString.call(obj)==='[object Array]';
};

var fixN=ansuz.fixN=function (f,a,n){
/* fix the nth argument of a function */
  n=n||0;
  return function(b){
    args=Array.prototype.slice.call(arguments); // more ansuz.ral now
    args.splice(n,0,a);
    return f.apply(null,args);
  };
};

var fix1=ansuz.fix1=function (f,a){
/* fix the first argument of a binary function */
  return function(b){
    return f(a,b);
  };
};

var fix2=ansuz.fix2=function (f,b){
/* fix the second argument of a binary function */
  return function(a){
    return f(a,b);
  };
};

var negate=ansuz.negate=function (p){
/* return the inverse of a predicate */
  return function(x){
    return !p(x);
  };
};

var compose=ansuz.compose=function (f,g){
/* chain two unary functions */
  return function(x){
    return g(f(x));
  };
};

var sum=ansuz.sum=function (A){
/* sum an array of integers */
  return A.reduce(function(a,b){
    return a+b;
  });
};

var range=ansuz.range=function (a,b){
/* generate an inclusive range between two integers */
  var temp=[];
  b = b || a;
  if(a===b)a=0; // beware, if a and b are equal, it indexes from 0
    // maybe that's not what you expect
  while(a<=b)temp.push(a++);
  return temp;
};

var nullArray=ansuz.nullArray=function (n){
/* produce an array of nulls of length n */
  var temp = [];
  while(n-- > 0)temp.push(null);
  return temp;
};

var flatten=ansuz.flatten=function (AA){
/* flatten an array of arrays into a single array */
  return AA.reduce(function(A,B){
    return A.concat(B);
  });
};

var carte=ansuz.carte=function (f,A,B){
  //[fix1]
/* map a binary function over the cartesian product of arrays */
  return A.map(function(a){
    return B.map(fix1(f,a));
  });
};

var carteSquare=ansuz.carteSquare=function (f,A){
  //[carte]
/* easy wrapper around carte for when you want a square */
  return carte(f,A,A);
};

var comb=ansuz.comb=function (f,A){
  //[fix1]
 /*  produce a heteroansuz.us array consisting of all
    unique pairwise combinations of elements from an array */

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

var die=ansuz.die=function (r){
/* simulated die */
  return Math.floor(Math.random()*r);
};

var shuffle=ansuz.shuffle=function (A){
/* shuffle an array (destructive, use slice for pure functional) */
  var i=A.length;
  while(i){
    var r=die(i--);
    var temp=A[i];
    A[i]=A[r];
    A[r]=temp;
  }
  return A;
};

var cut=ansuz.cut=function (A,n){
/* cut an array in two and return the two halves, concatenated in reverse */
  n=Math.min(n,A.length);
  A=A.slice(n).concat(A.slice(0,n));
  return A;
};

var exists=ansuz.exists=function (A,e){
  //[isArray]
/* test if an element exists in an array */
  if(isArray(A)) return (A.indexOf(e)!==-1)?true:false;
  if(typeof A==='object')return (e in A);
};

var vals=ansuz.vals=function (O){
/* return all the values in an object */
  return Object.keys(O).map(function(k){
    return O[k];
  });
};

var keys=ansuz.keys=function (O){
/* return all the keys in an object */
  return Object.keys(O);
};

var clone=ansuz.clone=function(A){
/* clone return a clone of an objet */
  return JSON.parse(JSON.stringify(A));
};

var merge=ansuz.merge=function (X,B,f){
  //[clone,keys]
 /*  merge two objects, 
    resolve conflicts with a third, optional argument, a function f
    which overwrites attributes of the first with the second by default */

  var A=clone(X); // don't break the original
  f=f||function(a,b){return b;}; // default behaviour in conflict is overwrite
  keys(B).map(function(b){ // just for side effects
    A[b]=(b in A)?
      f(A[b],B[b]):
      B[b];
  });
  return A;
};

var is=ansuz.is=function (a,b){
/* alias for equality, for when you want to curry */
  return a === b;
};

var stdDev=ansuz.stdDev=function (A){
  //[sum]
/* take the standard deviation of an array of numbers */
  var S = sum(A),
  L = A.length;
  mean = S/L;
  var variance = sum(A.map(function(x){
    return Math.pow(x-mean,2);
  }))/A.length;
  return Math.pow(variance,0.5);
};

var schedule=ansuz.schedule=function (f,t,n){
/* execute a function f every t seconds, to a maximum of n times */
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

var forget=ansuz.forget=function (f,i,c){
/*  accept a function and return a forgetful generator */
  // make sure the cache is initialized, 'i' has a default value of 0
  c=c||{i:i||0};
  // return the generator, passing the value of the index
  // and a reference to the cache
  return function(){
    return f(c.i++,c);
  };
};

var stateful=ansuz.stateful=function (f,c){
/*  accept a function and return a stateful generator */
  // no default values for this generator
  // you're expected to do it yourself..
  return function(cache){
    // when a new cache is passed, it overrides the original
    c=cache||c;
    return f(c);
  };
};

var memo=ansuz.memo=function (f,c){
/*  accept a function and return a memoizing generator */
  // initialize the cache with an empty object if it was not passed as an argument
  c=c||{};
  // if the cache does not contain 'i' (its index) initialize it as 'zero'
  c.i=c.i||0;
  // the memoization process depends on an array which can be filled and referenced
  c.memo=c.memo||[];
  // c.last stores the last value which was modified
  c.last=c.last||null;
  // using c.f, you can reference the initial function which was passed (and recurse)
  c.f=f;

  // c.fn is the new function which will be returned (which increments c.f)
  c.fn=function(n){
    if(isNaN(n)){
      c.memo[c.i]=c.last=f(c.i,c);
      c.i++;
      return c.last;
    }else if(c.memo[n]){
      return c.memo[n];
    }else{
      n=Math.floor(n);
      while(typeof c.memo[n] === "undefined"){
        c.fn();
      }
      return c.memo[n];
    }
  };
  // return the memoizing generator
  return c.fn;
};

var either=ansuz.either=function (a){
/* accept an array and return a function which returns successive elements */
  var i=0;
  return function(){
    return a[i++];
  };
};

var cycle=ansuz.cycle=function (a){
/* accept an array and cycle through its elements */
  var i=0,l=a.length;
  return function(){
    return a[i++ % l];
  };
};

var fcycle=ansuz.fcycle=function (a){
 /*  accept an array of functions and return a generator
    which cycles through executing each function */
 var i=0,l=a.length;
  return function(){
    return a[i++ % l]();
  };
};

var fail=ansuz.fail=function (x){
/* global default fail condition for generators */
  return typeof x==="undefined";
};

var done=ansuz.done=function (){
/* global default completion callback */
  return;
};

var first=ansuz.first=function (lz,n,cond){
  //[fail]
/* a little misleading, get the next N elements from a generator */
  var i=0; // what element are we currently working on?
  n=n||1; // default number of elements to return
  var acc=[]; // the accumulator you will return
  cond=cond||ansuz.fail; // default to checking for undefined
  while(n>i++){
    var res=lz();
    if(cond(res))break;
    acc.push(res);
  }
  return acc;
};

var all=ansuz.all=function (lz,cond){
  //[fail]
/* generate (and discard) all elements of a lazy list (potentially infinite!!!) */
  cond=cond||ansuz.fail;
  while(1){
    if(cond(lz()))break;
  }
};

var listall=ansuz.listall=function (lz,cond){
  //[fail]
/* generate (and collect) all elements of a lazy list (potentially infinite!!!) */
  cond=cond||ansuz.fail;
  var acc=[];
  while(1){
    var res=lz();
    if(cond(res))break;
    acc.push(res);
  }
  return acc;
};

var filter=ansuz.filter=function (lz,sat,cond){
  //[fail]
/*  return a function which takes a lazy list
    and returns the next element from that list that matches some predicate */

sat=sat||function(x){return true;};
  cond=cond||ansuz.fail; // default to checking for an undefined result
  return function(){ // return a generator
    var res=lz(); // which increments the generator you gave it
    while(!cond(res)){ // as long as it fails to meet some terminal condition
      if(sat(res)) // if you find a satisfactory result, return it
        return res;
      res=lz(); // otherwise, keep on looking
    }
    return; // return an undefined result if you reach a terminal condition
  };
};

var cons=ansuz.cons=function (lz,next,cond,done){
  //[done,fail]
/* return a construct a generator which produces elements
    from the concatenation of two lazy lists */

  next=next||ansuz.done; // return undefined if no second function is provided 
  cond=cond||ansuz.fail; // default failure behaviour if no terminal condition
  done=done||ansuz.done; // fail at the end of the second list
  var f=function(){return lz();}; // start by fetching elements from the first list
  var failed=false; // this keeps us from an infinite loop
  var fn=function(){ // the generator we will return
    var res=f(); // get the first result
    if(cond(res)&&failed){ // if we've failed twice, then we're done
      return; // return an undefined result
    }else if(cond(res)){ // otherwise, if we fail, try moving on
      f=function(){return next();} // our generator now uses the second list
      failed=true; // but remember that we failed once
      return fn(); // return the next element
    }else
      return res; // otherwise, we must have a good result, return it
  };
  return fn; // return the handler function
}

var chain=ansuz.chain=function (F,cond,done){ 
  //[fail,done,cons]
/* chain together an array of lazy generators */ 
  cond=cond||ansuz.fail;
  done=done||ansuz.done;

  var fn=F.concat(done) // add done to the end
    .reverse() // we need to start from the end
      // since the nth function needs to be passed as the 'next' to the (n-1)th
    .reduce(function(next,current){
      return ansuz.cons(current,next,cond,done); // chain each function together
    });
  return fn; // return the lazy handler you've produced.
};

var combinatorial=ansuz.combinatorial=function (f,g,cond,done){
  //[fail,done,either]
/* an attempt at backtracking */
  cond=cond||ansuz.fail; // default to a standard fail condition
  done=done||ansuz.done; // default to a standard callback
  var temp; // a temp variable to store the latest parent value
  var kid; // a variable to store the current child generator
  var fz=either(f); // the parent function
  var failed=false; // track if the parent function has failed
  var par=function(){ // this is the parent function handler
    temp=fz(); // it increments the parent function and stores the value in temp
    if(cond(temp)){ // if the parent function has failed..
      failed=true; // indicate that
      return; // and return
    } // but you still have a child function to pass over
    kid=either(g); // generate it
  };
  par(); // now that the parent handler is defined, increment it
  var fn=function(){ // the main generator you'll return
    var res=kid(); // call the child function and store the result
    if(cond(res)&&failed){ // if both generators have failed
      return done(); // then you're done
    }else if(cond(res)){ // if just the child has failed
      par(); // regenerate the child array
      return fn(); // return the next child value
    }else{ // otherwise.. 
      return [temp,res]; // return the current combined values of parent and child
    }
  }; // end of generator function
  return fn; // now return it and start using it
};

var splice=ansuz.splice=function (string,index,ins){
/* splice into a string as you would with an array */
  ins=ins||"";
  var A=index?string.slice(0,index):"";
  var B=string.slice(index);
  return A+ins+B;
};

var swap=ansuz.swap=function (s,o,r){
/* replace tokens in a string with their definitions in a dictionary */
  r=r||/{\w+}/g;
  return s.replace(r, function(k) {
     return o[k]||k;
  });
};

var ngraphs=ansuz.ngraphs=function(S,n,d){
/* accept an array of strings and generate weighted directional graph */
  S=S.slice(0);
  n=(typeof n!=='undefined')?n:1;
  d=(typeof d!=='undefined')?d:' ';
  var C={};
  while(S.length>(n+1))
    (function(){
      var id=S.slice(0,n+1).join(d);
      var fol=S[n+1];
      C[id]=C[id]||{};
      C[id][fol]=(C[id][fol]||0)+1;
      S.shift();
    })();
  return C;
};

var choose=ansuz.choose=function(A){
  //[die,keys]
/*  choose accepts an array, string, or object
    it chooses and returns an element, attribute, or character */
  if(typeof A === 'string')
    A=A.split("");
  if(typeof A === 'object')
   return (function(){
        var T=keys(A);
        return A[T[die(T.length)]];
      })();
  return A[die(A.length)];
};


var unique=ansuz.unique=function(A){
  //[keys]
/*  Accept an array
    return a copied array with duplicate elements removed 
    WARNING:: returns values as strings!!!
    */
  var U={};
  A.map(function(x){U[x]=true;});
  return keys(U);
};

var weightedArray=ansuz.weightedArray=function(C){
  //[flatten,nullArray,keys]
/*  chooseWeighted accepts an object C, in which keys correspond to integers
    each integer corresponding to the occurences of that key in a corpus,
    and a key k, which is taken as */
  return flatten(keys(C).map(function(k){
    return nullArray(C[k]).map(function(x){
      return k;
    });
  }));
};

var meta=ansuz.meta=function(D,L){ // a list of deps and an optional lib
  //[keys,vals,unique,flatten] // functions must be annotated like so.
  var L=L||ansuz; // use this for other compliant libraries, default to ansuz
  // only the first matched dependency array will be used
  // put it at the top of your function!
  var F=keys(ansuz); // an array of all the functions
  var R={};
  F.map(function(f){
    var d;
    ansuz[f].toString()
      .replace(/\/\/\[.*\]/,function(deps){
        d=deps;
      });
    R[f]=d?d.slice(3,-1).split(","):[];
  });

//  console.log(R);

  var C={};
  var getDepsOf=function(d){
    if(!C[d]){
      C[d]=R[d]||true; // DRY
      R[d].map(getDepsOf);
    }
  };

  flatten(D.map(function(d){
    return R[d];
  })).map(getDepsOf);
  return keys(C);  
};

var compile=ansuz.compile=function(D,L,T){
  //[swap]
  L=L||ansuz;
  T=T||'$';


  // boilerplate
  var plate=function(){/*var {TITLE}={};

{BODY}

if(typeof module!== 'undefined')
  module.exports={TITLE}
*/}.toString().slice(14,-3);

  var B=D.map(function(d){
    return swap("var {FUNCTION}={TITLE}.{FUNCTION}={SOURCE};"
      ,{'{TITLE}':T
        ,'{FUNCTION}':d
        ,'{SOURCE}':L[d].toString()
      });
  }).join("\n\n")

  return swap(plate
    ,{
      '{TITLE}':T
      ,'{BODY}':B
    });
};


if(typeof module !== 'undefined')
  module.exports=ansuz;
