var $=require("../ansuz");

/* It just so happens that many of the functions found in $.js
  are really useful for statistics, since we can crunch datasets in elegant ways.

  It's simple enough to imitate vector languages like Matlab or R
  we'd need more of the usual statistical functions, but here's a start */

(function(){
  var data=$.nullArray(20)
    .map($.fixN($.die,100,0));

  console.log("Calculating Standard deviation of:");
  console.log(data);
  console.log($.stdDev(data));
})();
