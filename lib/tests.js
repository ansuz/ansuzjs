var van=require("./van.js");
var gen=require("./gen.js");

var assert={};
assert.equals=function(first,second,failmessage){
  if(first!=second)
    console.log(failmessage);
};

assert.equals(true,true,"this had better work");
