var van=require("./van.js");
var gen=require("./gen.js");
var buster=require("buster");
var assert=buster.assert;
var refute=buster.refute;

assert.equals(true,true,"this had better work"); // tautology

buster.testCase("My thing", {
  "first generator test": function () {
    assert.equals(gen.first(
      gen.cons(
        gen.either([0,1,2]),
        gen.either(['a','b','c'])
      ),5),
    [0,1,2,'a','b']
    );
  },
  "states the obvious": function () {
    assert(true);
  }
});
