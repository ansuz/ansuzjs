ansuzjs
=======

higher order functions for function composition, laziness, backtracking, and other magic

```quote

“We need to make books cool again. If you go home with somebody and they don't have books, don't fuck them.”

― John Waters 
```

ermm.. s/books/functional js/g

yea.

***************

I use Javascript for just about everything these days. The language features that I actually use only comprise a very small fraction of the language, though.

I accomplish nearly every task by using lambdas in conjunction with array methods.

The libraries included in this repository are the result of my efforts to implement complex behaviour generally associated with languages like Haskell and Prolog in a readable fashion. 

I found other Javascript libraries that claimed to do this, but they all seemed bent on imposing their own syntax upon the language, rather than exposing the fact that Javascript can already do these things quite easily.

Unix philosophy states that we should favour composability over monolithic design. Many of these functions work entirely on their own, but I've bundled together those which have some cohesive theme.

I haven't used the `this` or `new` keyword even once, and I don't foresee having to in the future. Stick to this subset of JS, and you will minimize the scoping and off-by-one errors so commonly encountered in imperative or object oriented JS.

Godspeed, brave hacker.

--ansuz

## How do I use it?

The actual libraries can be found in the lib directory. Each should be commented fairly well, but I'd appreciate feedback on where the explanations are lacking.

van.js is definitely a lot simpler than gen.js, so if you're going to read one of the two, start with van. Each function should have a comment explaining what it does, and a second comment specifying another script you can read for an example of the function's use.

### van.js provides functions for:

* wrapping other functions with differing argument structures (currying)
* wrapping multiple functions into a single function
* automating array instantiation
* easily handling multi-dimensional arrays
* shuffling and otherwise rearranging arrays
* membership tests for objects and arrays
* basic handlers for vector computing (as one might find in a language like 'R')
* executing functions on a timer

### gen.js provides functions for:

* lazily incrementing through arrays using generators (isolated state machines)
* creating and safely using environments for markov-chain behaviours
* memoization for recursive algorithms (which avoid recomputing the same values again and again)
* sharing resources between asynchronous functions via generators
* lazy tree traversal (backtracking and on-demand computation)
* safe concatenation of potentially infinite sequences

## Is this production ready?

**Such enterprise. Wow**.

This is mostly a hobby project. The functions contained within happen to be shared between a number of my other projects, so it made sense to keep it all in one place. That being said, I make no guarantees about anything working as stated.

I've begun to work on some tests that should improve the reliability of these libraries, but so far I'm the only one working on any of this code. If you have a use case that you'd like to see accomodated, feel free to file an issue or request it on the wiki.

Getting back to the matter about it being production ready... These functions are probably **not the most efficient way of doing things** from a mechanistic perspective. They are meant to provide a generalized framework that you can use to quickly prototype extremely complex behaviour, while minimizing the amount of boilerplate code you have to write. The fact that these are general techniques means that they introduce some overhead in performing checks on the data at each increment, or via the indirection involved in currying a function.

Hopefully that overhead is justified by the computational time saved via memoization, or the time you save by reducing the complexity of a difficult problem. You should take a little bit of time to understand what these functions do, but once you get the idea, you should be able to stop thinking about the details and just use them as tools.

## So what's the best use case?

These functions greatly reduce the amount of boilerplate code that you need to write, and will function in both client-side and server-side environments. If you need to specify some complex, dynamic behaviour on the client without explicitly building each function required for the task, these libraries are suitable for the task.

I consider this a very early version of a more complex suite of tools, but its goals are simple:

1. You shouldn't need the whole library, each function should be able to (mostly) stand on its own, allowing you to pick and choose what you want (I plan to write some scripts to filter out the crud based on the functionality you need).
2. Help the programmer extend and compose minimal implementations of functions into complex configurations while minimizing cognitive overhead.
3. Encourage the programmer to write small, modular, legible software.

If you're a data scientist or statistician, these libraries should help free you from the burden of constantly shifting approaches depending on the format of your information. Specify what you want, and how you want to get it, and allow the machine to take care of the repetitive aspects of your task.

## Additional notes

I'm a big fan of minimalism, and for any given task, there's probably a lot included in these source files that you won't use. For that reason, I've started working on some tools to sort out what you actually need.

If you look in lib/deps, you'll find `deps.js`, a tiny dependency manager. I've detailed in sourcetree.json (which is actually an informal format called "cjdson") which functions depend on each other. You can generate a list of what functions are actually necessary for your purposes by entering their names into the array in `need.json`. call deps.js, and it will produce the full array of dependencies.

I've written these libs to have minimal dependencies, but as it grows I may need to compromise that ideal. This system should help with that, and I plan to improve these script to automatically generate dependencies by interpreting your source code directly. WEEEEEEEeeeeeeeeeeeeeee!
