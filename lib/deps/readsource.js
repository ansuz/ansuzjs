/* This script will read through your source files
  and attempt to identify all the functions you've used.
*/

var args=process.argv; // get the command line arguments

if(args.length>2){ // get the paths to the libraries being passed
  args=args.slice(2);
}else{
  console.log("try passing the path to some lib as an argument");
  process.exit();
}

var libs={}; // a place to keep all the libraries
var libkeys=[]; // so you don't have to use Object.keys all the time

args.map(function(lib){ // for every argument
  libkeys.push(lib); // add it to libkeys 
  libs[lib]={ // create an object and add it to 'libs'
    name:lib, // remember its name (which, so far, is also its relative path
    src:require(lib) // load the source
  };
});

libkeys.map(function(lib){ // for every library you have
  libs[lib].funcs=Object.keys(libs[lib].src); // list its functions
});

libkeys.map(function(lib){ // take another look at every library
  var funcs=libs[lib].funcs; // make a shorthand for its functions
  funcs.map(function(f){
    var src=libs[lib].src[f].toString();
    // this is where you would analyze the source code
    // and attempt to determine which functions it contains
    console.log("[%s] :: %s: %s\n",lib,f,src);
  });
});
