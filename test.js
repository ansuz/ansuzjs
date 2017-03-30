var $=require("./ansuz.js");
var Assert = require("assert");
var Refute = function (x) { Assert.ok(!x); };

var Equal = function (a, b, m) {
    Assert.deepStrictEqual(a, b, m);
};

Equal($.find({
    a:{b:{c:{d:5}}}
}, ['a', 'b', 'c', 'd']), 5);

Refute($.find({
    a: {b: {c: 5}}
}, ['a', 'd']));

// incrementing 3 by two yields 5
Equal($.count({x: 3}, 'x', 2), 5);

// incrementing 7 by negative two yields 5
Equal($.count({x:7}, 'x', -2), 5);

// incrementing x by the default 1 will yield 5
Equal($.count({x: 4}, 'x'), 5);

// undefined maps return false
Equal($.count(null, '5'), false);

// count works on anything that has attributes
Equal($.count([1,2,3], '1'), 3);

Equal( // 2 cubed is 8 
  $.fix1(Math.pow,2)(3)
  ,8
);

Equal(
  $.fix2(Math.pow,3)(2)
  ,8
);

Equal(
  $.isArray([0,1,2])
  ,true
);

Equal(
  $.fixN(function(a,b,c){return c;},5,2)(1,2)
  ,5
);

Equal(
  $.negate($.fix1($.is,4))(3)
  ,true
);

Equal(
  $.compose($.negate,$.negate($.fix1($.is,4)))(4)
  ,true
);

Equal(
  $.sum($.range(4))
  ,10
);

Equal(
  $.sum([])
  ,0
);

Equal(
  $.nullArray(3)
  ,[null,null,null]
);

Equal(
  $.flatten([[1],[2],[3]])
  ,$.range(1,3)
);

Equal(
  $.flatten($.carte(function(x,y){return x*y;},[1,2],[3,4]))
  ,[3,4,6,8]
);

Equal(
  $.flatten($.carteSquare(function(x,y){return x+y;},[0,1]))
  ,[0,1,1,2]
);

Equal(
  $.flatten([])
  ,[]
);

Equal(
  $.unique($.shuffle([0,1,2,3]))
  ,['0','1','2','3']
);

Equal(
  function(x){return x>-1 && x<4;}($.die(4))
  ,true
);

// comb

Equal(
  $.cut([0,1,2,3],2)
  ,[2,3,0,1]
);

Equal(
  $.vals({x:5,y:6})
  ,[5,6]
);

Equal(
  $.keys({a:1,b:true})
  ,['a','b']
);

Equal(
  $.clone({a:1,b:2})
  ,{a:1,b:2}
);

Equal(
  $.vals($.merge({a:1,b:2},{b:3},function(x,y){return x*y;}))
  ,[1,6]
);

Equal(
  $.stdDev([2,4,4,4,5,5,7,9])
  ,2
);

Equal(
  $.first($.forget(function(x){return x*x;}),5)
  ,[0,1,4,9,16]
);

Equal(
  $.listall($.either([5,7,2,4]))
  ,[5,7,2,4]
);

Equal(
  $.first($.stateful(function(c){
    return c.i=c.i*2;
  },{i:1}),5)
  ,[2,4,8,16,32]
);

Equal(
  $.splice("pewpew",3,"pew")
  ,"pewpewpew"
);

Equal(
  $.swap("pew{BANG}pew",{"{BANG}":'pew'})
  ,'pewpewpew'
);

// ngraph
Equal(
  function(x){return $.exists(x,$.choose(x));}([0,1,2,3,4,5])
  ,true
);

Equal(
    $.exists({a:1,b:2,c:3},2),
    true
);

Refute($.exists({a:1,b:2,c:3},5));

Equal(
    5,
    $.least([5,6,7])
);

Refute($.least());
Refute($.least([]));

Equal(
    7,
    $.most([5,6,7])
);

Refute($.most());
Refute($.most([]));


// functions that still need to be tested...

// weighted
// schedule
// memo
// cycle
// fcycle
// fail
// done
// all
// filter
// cons
// chain
// combinatorial

Equal(
  $.intersection([0,1,2,3],[2,3,4,5])
  ,[2,3]
);

Equal(
  $.difference([0,1,2,3],[2,3,4,5])
  ,[0,1]
);

Equal(
  $.distinction([0,1,2,3],[2,3,4,5])
  ,[0,1,4,5]
);

Assert($.superset([0,1,2],[1,2]));
Refute($.superset([0],[1]));

// every element of [1,2] exists in [0,1,2,3,4]
Assert($.subset([1,2],[0,1,2,3,4]));

Assert($.every([1,2,3]));
Refute($.every([0,1,2]));
Assert($.every([15,1.5,0x00], function (n) {
    return !isNaN(n);
}));

// TODO test 'every' on objects
Assert($.every({x: 5, y: 7, z: 0}, function (e, i) {
    return !isNaN(e) && i.toLowerCase() === i;
}));

Refute($.some({
    x: 5,
    y: 7,
    z: 9
}, function (v, k) {
    return v > 10;
}));

Assert($.some([
    12, 13, 14
], function (v, k) {
    return k < 10;
}));

Equal(
    [3, 5, 1].sort($.invert($.subtract)),
    [5, 3, 1]);

// check that every function has a docString
Equal(
    $.keys($).length,
    $.keys($).map(function (k) {
        return $.docString($[k]) || console.log("function [%s] is missing a docString", k);
    }).filter($.identity).length,
    "Check that every function has a doctring"
    );

