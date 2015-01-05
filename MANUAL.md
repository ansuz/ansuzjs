## ansuzjs usage manual

So you've decided you want to give ansuzjs a try? I'm flattered. Really, I am.

The purpose of this document is to prepare you for the road ahead. There's a lot of functionality packed into this little library, but that doesn't necessarily mean it will be easy to use. 

My aim in producing this software was to make it easier to define extremely complex functions with very little code. While I think I've succeeded in creating something worthwhile, you will still need to understand how these functions behave in order to use them.

Before exploring the individual functions, I'll provide a bit of an overview:

## A note on metaprogramming

As I write this, wikipedia defines _metaprogramming_ as:

```
...the writing of computer programs with the ability to treat programs as their data.
```

Javascript has two notable features which make it quite suitable as a metaprogramming language:

1. Functions are first class objects.
2. Functions have a `toString` method, which allows us to inspect the source of any function at runtime.

**ansuzjs** leverages the first characteristic to provide high level functions which makes function creation easier. In particular, there are functions for:

* [currying](http://en.wikipedia.org/wiki/Currying)
* [lazy evaluation](http://en.wikipedia.org/wiki/Lazy_evaluation)
* [backtracking](http://en.wikipedia.org/wiki/Backtracking) **(in progress)**

It leverages the second property to provide two functions which will allow you to reshape the library so as to only include the functions you are using:

1. `ansuz.deps` accepts a list of functions. It inspects the functions in your running library (as strings), and searches for annotations detailing that function's dependencies. It recurses through the resulting dependency tree, and returns an array of unique function names (the dependencies of your functions).
2. `ansuz.compile` accepts a list of functions, and returns a string which can be written to file and used independently of the original ansuz.js source.

I decided to implement these functions because as much as I hate software bloat, the software ultimately became easier to manage by throwing it all in together. `deps` and `compile` allow me to work on one file, and programmatically extract only the functions I need for any given task. This isn't really a concern for serverside code, but since ansuzjs is an [isomorphic](http://isomorphic.net/) library, I wanted to make it easy to ship subsets of the library for use in clientside code.

ansuzjs is 100% vanilla. There are no external dependencies, and I intend to keep it that way. If you want to hack on ansuzjs, I recommend using the test cases I've included. They're written using the `buster` framework, which you can install manually using:

```Bash
npm install buster
```

If you add or change functions, remember that you will need to annotate them with their dependencies in order to use `ansuz.deps`. Do so by including a comment at the top of the function:

```Javascript
var foo=function(){
  // the annotation is a single line comment containing an array
  // leave no spaces between the double slash and the square brace
  // do not enclose the function name single or double quotes.
  //[bar,baz]
  // additional dependency annotations beyond the first will be ignored
  //[this,has,no,effect]
  return bar(baz());
}
```

## Functions

* ansuz.all
* ansuz.carte
* ansuz.carteSquare
* ansuz.chain
* ansuz.choose
* ansuz.clone
* ansuz.comb
* ansuz.combinatorial
* ansuz.compile
* ansuz.compose
* ansuz.cons
* ansuz.cut
* ansuz.cycle
* ansuz.deps
* ansuz.die
* ansuz.done
* ansuz.either
* ansuz.exists
* ansuz.fail
* ansuz.fcycle
* ansuz.filter
* ansuz.first
* ansuz.fix1
* ansuz.fix2
* ansuz.fixN
* ansuz.flatten
* ansuz.forget
* ansuz.is
* ansuz.isArray
* ansuz.keys
* ansuz.listall
* ansuz.memo
* ansuz.merge
* ansuz.negate
* ansuz.ngraphs
* ansuz.nullArray
* ansuz.range
* ansuz.schedule
* ansuz.shuffle
* ansuz.splice
* ansuz.stateful
* ansuz.stdDev
* ansuz.sum
* ansuz.swap
* ansuz.unique
* ansuz.vals
* ansuz.weightedArray
