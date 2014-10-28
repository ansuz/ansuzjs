var gen=require("../gen.js");

var memoFib=gen.memo(
  function(n,c){
    console.log("generating the %sth fibonacci number",n);
    return (n<2)?
      n:
      c.memo[n-1]+c.memo[n-2];
  });

console.log(memoFib());
console.log(memoFib());
console.log(memoFib());
console.log(memoFib());

console.log(memoFib(7));
console.log(memoFib(19));
