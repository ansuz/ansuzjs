var van=require("./van.js");
var gen=require("./gen.js");
var buster=require("buster");
var assert=buster.assert;
var refute=buster.refute;

buster.testCase("My thing", {

  "vanguard tests":function(){
    assert.equals( // 2 cubed is 8 
      van.fix1(Math.pow,2)(3),
      8
    );
    assert.equals( // 3 squared is 9
      van.fix2(Math.pow,2)(3),
      9
    );
    assert.equals( // the square root of 9 is 3
      van.fixN(Math.sqrt,9,0)(),
      3
    );
    refute( // four is NOT odd
      van.negate(function(x){
        return x%2===0;
      })(4)
    );
    assert.equals(
      van.compose( // (4*2)/2 is 4
        function(x){return x*2;},
        function(y){return y/2;})(4),
      4
    );
    assert.equals(
      van.range(5),
      [0,1,2,3,4,5]
    );
    assert.equals(
      van.range(2,5),
      [2,3,4,5]
    );
    assert.equals(
      van.nullArray(5),
      [null,null,null,null,null]
    );
    assert.equals(
      van.flatten(
        van.carteSquare(
          function(x,y){return x*y;},
          [0,1,2])
      ),
      [0,0,0,0,1,2,0,2,4]
    );
    assert.equals(
      van.carte(
        function(x,y){
          return x+y;
        },
        [2,3],
        van.range(1,4)
      ),
      [[3,4,5,6],[4,5,6,7]]
    );
    assert(
      function(x){
        return (x > -1)&&(x<5);
      }(van.die(5))
    );
    assert.equals(
      van.shuffle([0,1,2,3,4]).length,
      5
    );
    assert.equals(
      van.cut(van.range(5),3)[0],
      3
    );
    assert(
      van.exists(van.range(2,5),2)
    );

    assert.equals( // the fifth triangular number is 15
      van.sum(van.range(5)),
      15
    );

    assert.equals(
      van.range(5),
      [0,1,2,3,4,5]
    );
  },



  "generator tests": function () {

    assert.equals(gen.first(
      gen.cons(
        gen.either([0,1,2]),
        gen.either(['a','b','c'])
      ),5),
    [0,1,2,'a','b']
    );

    assert.equals(gen.first( // a string rewriting system
      gen.stateful(function(x){
        x.s=x.s+x.s||"pew";
        return x.s;
        },{s:""})
        ,3),
      ["pew","pewpew","pewpewpewpew"]
    );
      


//    assert.equals(true,false,"this just isn't right");
    




    assert.equals(
      gen.listall(
        gen.fcycle(
          [gen.cycle([0,1])
          ,gen.cycle(['a','b','c'])
          ,gen.either(['A','B','C','D'])
        ])),
      [0,'a','A',1,'b','B',0,'c','C',1,'a','D',0,'b']
    );



  },

  

  "states the obvious": function () {
    assert(true);
  }



});
