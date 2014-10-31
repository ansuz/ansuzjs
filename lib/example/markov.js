var gen=require("../gen.js");

/*
  gen.stateful is sort of like gen.forget.
  it's more powerful, but it's also more dangerous.
  it captures an environment, which is passed to the function at every call.
  that environment is fully exposed.
  modify it however you want from within the function, conditionally, if need be.
  you can pass a new environment at any time, and override the old one.

  pass it a function which accepts such an environment.
  If you call it without passing a new environment, it'll use the old one.
  */

// count is a function which counts..

var count=gen.stateful(
  function(c){
    c.i=(c.i>9)?c.i-5:c.i+1;
    console.log(c.i);
  },{i:5} // let's count from 5
);

count();
count();
count();

// That's easy enough, but this is designed to do a little bit more...

count({i:-5}); // reset its counter to an arbitrary number
count(); // note that the function is preserved
count();
count();

var markov=gen.stateful(function(c){
  c.str = c.str+c.str||"pew";
  return c.str;
},{str:""});


console.log(markov());
console.log(markov());
console.log(markov());
console.log(markov());
