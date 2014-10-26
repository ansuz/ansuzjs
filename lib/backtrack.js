var gen={};

/* A forgetful generator, as simple as it gets! */ 

gen.forget=function(f){
  var i=0;
  return function(){
    return f(i++);
  };
};

/* A memoizing generator with reflection */

gen.memo=function(f,c){
  if(!c){
    var c=c||{};
    c.i=c.i||0;
    c.memo=c.memo||[];
    c.last=c.last||null;
    c.f=f;
  }
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
  return c.fn;
};

/* capture an array in a closure and increment through its members
    returns undefined when it exceeds its bounds */

gen.either=function(a){
  var i=0;
  return function(){
    return a[i++];
  };
};

/* once again, capture an array in a closure and increment through its memebers
    however, this time loop back to the beginning when you exceed its bounds */

gen.cycle=function(a){
  var i=0,l=a.length;
  return function(){
    return a[i++ % l];
  };
};

/* like gen.cycle, but each element is a function which which is called
    its result is returned, and we move onto the next function
    pass it a bunch of lazy generators and you basically have breadth-first search */

gen.fcycle=function(a){
  var i=0,l=a.length;
  return function(){
    return a[i++ % l]();
  };
};

/* increment a lazy function a number of times, collect the results, and return them */

gen.first=function(lz,n,cond){
  var i=0;
  n=n||1;
  var acc=[];
  cond=cond||function(x){return typeof x === 'undefined';};
  while(n>i++){
    var res=lz();
    if(cond(res))break;
    acc.push(res);
  }
  return acc;
};

/* increment a lazy function, and throw away the results.
    only useful if you're after the side effects and not the results 
    accepts a condition under which it should terminate
    since your lazy generator is quite likely an infinite one */

gen.all=function(lz,cond){
  while(1){
    if(!cond(lz()))break;
  }
};

/* just like gen.all, except it returns the results in a list */

gen.listall=function(lz,cond){
  var acc=[];
  while(1){
    var res=lz();
    if(!cond(res))break;
    acc.push(res);
  }
  return acc;
};

/* returns a function which increments a generator
    and returns only the results which satisfy some predicate */

gen.filter=function(lz,sat){
  sat=sat||function(x){return true;};
  return function(){
    while(1){
      var res=lz();
      if(sat(res))return res;
    }
  };
};

/* A general condition under which you probably want your generator to fail */

gen.fail=function(x){
  return typeof x==="undefined";
};

/* The default callback used at the termination of a lazy sequence
    feel free to override with `gen.done=function(){/* .... */

gen.done=function(){
  console.log("done!");
};



gen.fall=function(lz,next,cond){
  next=next||gen.done;
  cond=cond||gen.fail;

  return function(){
    var res=lz();
    if(cond(res)){
      next();
      return false;
    }else
      return res;
  };
};

/* take an array of generators and return a function which sequences them
    at some terminal condition, it increments the array and uses the next
    basically depth first search... */

gen.chain=function(F,cond){ // the end of this chain is dangerous!
  var l=F.length;
  var i=0;
  cond=cond||gen.fail;

  return function(){
    var res=F[i]();
    if(cond(res)){
      if(i==(l-1))return;
      res=F[++i]();
    }
    return res;
  };
};

module.exports=gen;
