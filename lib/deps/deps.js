/* This script is meant to help you manage your dependencies
  load two JSON files, one specifying the functions you will use
  and another specifying which functions depend on one another
  then construct a custom source file which satisfies those dependencies
  on demand :)
*/

var fs=require("fs");

var cjdson2json=function(cjdO){
  return JSON.parse(cjdO
    .split("\n")
    .map(function(line){
      return line.replace(/\/\/.*$/g,"");
    })
    .join("")
    .replace(/\/\*([\s\S]*?)\*\//g,"") // split multiline comments
  );
};

var tree=cjdson2json(fs.readFileSync("./sourcetree.json","utf8"));
var need=cjdson2json(fs.readFileSync("./need.json","utf8"));

var dependencies={};
var checked={};

var safedep=function(f){
//  console.log("%s needs %s",f,tree[f]); 

  if(!checked[f]){
 //   console.log("you need %s",f);
    checked[f]=true; // insert it so you don't repeat yourself
    dependencies[f]=true; // take note of the fact that you need it
    tree[f].map(safedep); // take note of that fact for everything it depends on
  }
};

need.needed.map(safedep)

console.log(Object.keys(dependencies));
