var $=require("../ansuz");

/* Lindenmayer Systems!!!
  aka L-systems http://en.wikipedia.org/wiki/L-system
  aka string rewriting systems, aka something a markov chain does quite well
  Its current state is stored in its cache, and overwritten with every generation.

  If we use the original function and gen.stateful, we can produce 'n' generations
  and then allow the garbage collector to kick in and clean up
  once our 'experiment' is over.
*/ 

console.log("An Algae system\n");

var algae=$.stateful(function(c){ // an algal generator
  // each iteration of this function represents the death of the previous generation
  // and the birth of the next one

  c.s=c.s.replace(/B/g,"0"); // this isn't elegant, but it gets the job done
  c.s=c.s.replace(/A/g,"1"); // replace the source strings with tokens

  c.s=c.s.replace(/1/g,"AB"); // replace those tokens with the new values
  c.s=c.s.replace(/0/g,"A"); // since the intermediary tokens cause no conflict

  return c.s; // return the new population
},{s:"A"});


console.log(console.log($.first(algae,7))); // let's see the first 7 generations

console.log("\nA Tree system\n"); // what about a tree system? 
// these symbols are instructions, to be converted to a graphical depiction
// via a drawing algorithm that interprets this as nested stacks of instructions

var tree=$.stateful(function(c){
  c.s =c.s
    .replace(/1/g,"11")
    .replace(/0/g,"1[0]0");
  return c.s;
},{s:"0"});

console.log($.first(tree,4));

console.log("\nA scary dragon!\n");

var dragon=$.stateful(function(c){
  c.s=c.s
    .replace(/X/g,"0")
    .replace(/Y/g,"1")
    .replace(/0/g,"X+YF")
    .replace(/1/g,"FX-Y");
  return c.s;
},{s:"FX"});

console.log($.first(dragon,5));
