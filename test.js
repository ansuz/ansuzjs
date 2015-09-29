var $=require("./ansuz.js");
var buster=require("buster");
var assert=buster.assert;
var refute=buster.refute;

buster.testCase("ansuzjs", {
  "tests":function(){

    assert.equals( // 2 cubed is 8 
      $.fix1(Math.pow,2)(3)
      ,8
    );

    assert.equals(
      $.fix2(Math.pow,3)(2)
      ,8
    );

    assert.equals(
      $.isArray([0,1,2])
      ,true
    );

    assert.equals(
      $.fixN(function(a,b,c){return c;},5,2)(1,2)
      ,5
    );

    assert.equals(
      $.negate($.fix1($.is,4))(3)
      ,true
    );

    assert.equals(
      $.compose($.negate,$.negate($.fix1($.is,4)))(4)
      ,true
    );

    assert.equals(
      $.sum($.range(4))
      ,10
    );

    assert.equals(
      $.nullArray(3)
      ,[null,null,null]
    );

    assert.equals(
      $.flatten([[1],[2],[3]])
      ,$.range(1,3)
    );

    assert.equals(
      $.flatten($.carte(function(x,y){return x*y;},[1,2],[3,4]))
      ,[3,4,6,8]
    );

    assert.equals(
      $.flatten($.carteSquare(function(x,y){return x+y;},[0,1]))
      ,[0,1,1,2]
    );

    assert.equals(
      $.unique($.shuffle([0,1,2,3]))
      ,['0','1','2','3']
    );

    assert.equals(
      function(x){return x>-1 && x<4;}($.die(4))
      ,true
    );

    // comb

    assert.equals(
      $.cut([0,1,2,3],2)
      ,[2,3,0,1]
    );

    assert.equals(
      $.vals({x:5,y:6})
      ,[5,6]
    );

    assert.equals(
      $.keys({a:1,b:true})
      ,['a','b']
    );

    assert.equals(
      $.clone({a:1,b:2})
      ,{a:1,b:2}
    );

    assert.equals(
      $.vals($.merge({a:1,b:2},{b:3},function(x,y){return x*y;}))
      ,[1,6]
    );

    assert.equals(
      $.stdDev([2,4,4,4,5,5,7,9])
      ,2
    );

    assert.equals(
      $.first($.forget(function(x){return x*x;}),5)
      ,[0,1,4,9,16]
    );

    assert.equals(
      $.listall($.either([5,7,2,4]))
      ,[5,7,2,4]
    );

    assert.equals(
      $.first($.stateful(function(c){
        return c.i=c.i*2;
      },{i:1}),5)
      ,[2,4,8,16,32]
    );

    assert.equals(
      $.splice("pewpew",3,"pew")
      ,"pewpewpew"
    );

    assert.equals(
      $.swap("pew{BANG}pew",{"{BANG}":'pew'})
      ,'pewpewpew'
    );

    // ngraph
    assert.equals(
      function(x){return $.exists(x,$.choose(x));}([0,1,2,3,4,5])
      ,true
    );

    assert.equals(
        $.exists({a:1,b:2,c:3},2),
        true
    );

    refute.equals(
        $.exists({a:1,b:2,c:3},5),
        true
    );

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

    assert.equals(
      $.intersection([0,1,2,3],[2,3,4,5])
      ,[2,3]
    );

    assert.equals(
      $.difference([0,1,2,3],[2,3,4,5])
      ,[0,1,4,5]
    );

    assert($.superset([0,1,2],[1,2]));
    refute($.superset([0],[1]));

    assert($.subset([1,2],[0,1,2,3,4]));



  }
});
