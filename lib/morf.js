/*  Javascript provides a slim but powerful api for working with strings.
    this is morf.js (from 'morpheme' http://en.wikipedia.org/wiki/Morpheme)
    it provides some minimalistic helpers for string manipulation
    all helpers are exposed as functions without modifying the string prototype
*/

var morf={};

/*  Javascript arrays have a 'splice' method, but strings do not.
    this function mimics its behaviour.
    pass:
      a string
      ,the index at which you wish to insert a new string
      ,a new string
*/

morf.splice=function(string,index,ins){
  ins=ins||"";
  var A=index?string.slice(0,index):"";
  var B=string.slice(index);
  return A+ins+B;
};

/*  swap accepts a string, and an object
    swap's regex matches any instance of curly braces containing a word
    it checks whether that word exists as a key within the passed object
    if it does, that word is replaced by the corresponding value
    if it does not, the word will be unaffected.  
    optionally accepts a third argument, a regular expression
    by default it will only consider replacing tokens within curly braces
    by passing an alternate regular expression, an alternate placeholder can be used. 
*/

morf.swap=function(s,o,r){
  r=r||/{\w+}/g;
  return s.replace(r, function(k) {
     return o[k]||k;
  });
};

module.exports=morf;
