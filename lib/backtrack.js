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

gen.either=function(a){
  var i=0;
  return function(){
    return a[i++];
  };
};

gen.cycle=function(a){
  var i=0,l=a.length;
  return function(){
    return a[i++ % l];
  };
};

gen.fcycle=function(a){
  var i=0,l=a.length;
  return function(){
    return a[i++ % l]();
  };
};

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

gen.all=function(lz,cond){
  while(1){
    if(!cond(lz()))break;
  }
};

gen.listall=function(lz,cond){
  var acc=[];
  while(1){
    var res=lz();
    if(!cond(res))break;
    acc.push(res);
  }
  return acc;
};

gen.filter=function(lz,sat){
  sat=sat||function(x){return true;};
  return function(){
    while(1){
      var res=lz();
      if(sat(res))return res;
    }
  };
};

gen.fail=function(x){
  return typeof x==="undefined";
};

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
