(function () {

var ansuz={};

var identity = ansuz.identity = function (x) {
/* given x, return x */
    return x;
};

var is = ansuz.is = function (a,b) {
    /* alias for equality, for when you want to curry */
    return a === b;
};

var toString = ansuz.toString = function (obj) {
/*  call toString on an object, best used for determining types */
    return Object.prototype.toString.call(obj);
};

var compose = ansuz.compose = function (f,g) {
/* given two unary functions, return a new function which
    returns the result of the first passed to the second */
    return function(x){
        return g(f(x));
    };
};

var once = ansuz.once = function (f) {
/* given a function, return a function wrapper which will will only call
the original function once */
    var called;
    return function () {
        if (called) { return; }
        called = true;
        f.apply(null, Array.prototype.slice.call(arguments));
    };
};

var fixN = ansuz.fixN = function (f,a,n) {
/* fix the nth argument of a function */
    n=n||0;
    return function(b){
        args=Array.prototype.slice.call(arguments); // more general now
        args.splice(n,0,a);
        return f.apply(null,args);
    };
};

var fix1 = ansuz.fix1 = function (f,a) {
/* fix the first argument of a binary function */
    return function (b) {
        return f(a,b);
    };
};

var fix2 = ansuz.fix2 = function (f,b) {
/* fix the second argument of a binary function */
    return function (a) {
        return f(a,b);
    };
};

var isArray = ansuz.isArray = function (obj) {
    //[toString]
/*    Check if an object is an array */
    return toString(obj)==='[object Array]';
};

var isRegExp = ansuz.isRegExp = function (obj) {
/* test if an object is a regular expression


equivalent of compose(toString, fix1(is, '[object RegExp]'));
*/
    //[toString]
    return toString(obj) === '[object RegExp]';
};

var find = ansuz.find = function (map, path) {
/* safely search for nested values in an object via a path */
    var l = path.length;
    for (var i = 0; i < l; i++) {
        if (typeof(map[path[i]]) === 'undefined') { return; }
        map = map[path[i]];
    }
    return map;
};

var count = ansuz.count = function (map, key, inc) {
/* safely increment a value in a map by its key by one or an optional number */
    if (!map) { return false; }
    var val = map[key] || 0;
    return map[key] = typeof(inc) === 'number'?
        (val) + inc:
        typeof(inc) === 'function'?
            inc(val):
            val + 1;
};

var negate = ansuz.negate = function (p) {
/* given a predicate, return a new predicate which is its inverse */
    return function(x){
        return !p(x);
    };
};

var invert = ansuz.invert = function (f) {
/* return the inverse of a binary function */
    return function (a, b) {
        return f(b, a);
    };
};

var some = ansuz.some = function (O, f) {
/* test if some element in a structure satisfies a predicate */
    //[isArray]
    if (!O) { return false; }
    if (isArray(O)) { return O.some(f); }
    else if (typeof(O) === 'object') {
        return Object.keys(O).some(function (k, i) {
            return f(O[k], k, O);
        });
    }
    else { return false; }
};

var every = ansuz.every = function (E, f) {
/* test if every element in a structure satisfies a predicate */
    //[some,identity]
    f = typeof(f) === 'function'? f: identity;
    return !some(E, function (e, i, E) {
        return !f(e, i, E);
    });
};

var add = ansuz.add = function (a, b) {
/* add two numbers */
    return a + b;
};

var subtract = ansuz.subtract = function (a, b) {
/* subtract two numbers */
    return a - b;
};

var sum = ansuz.sum = function (A) {
    //[add]
/* sum an array of integers */
    return A.reduce(add, 0);
};

var mean = ansuz.mean = function (A) {
/* take the mean (average) of a list of numbers */
    //[sum]
    return sum(A) / A.length;
};

var range = ansuz.range = function (a,b) {
/* generate an inclusive range between two integers */
    var temp=[];
    b = b || a;
    if(a===b)a=0; // beware, if a and b are equal, it indexes from 0
        // maybe that's not what you expect
    while(a<=b)temp.push(a++);
    return temp;
};

var least = ansuz.least = function (A) {
/* return the smallest number in a list */
    if (!A || !A.length) { return undefined; }
    return A.reduce(function (a, b) {
        return Math.min(a, b);
    });
};

var most = ansuz.most = function (A) {
/* return the greatest number in a list */
    if (!A || !A.length) { return undefined; }
    return A.reduce(function (a, b) {
        return Math.max(a, b);
    });
};

var nullArray = ansuz.nullArray = function (n) {
/* produce an array of nulls of length n */
    return new Array(n).fill(null);
};

var array = ansuz.array = function (n, v) {
/* (n, v) fill an 'n' element array with 'v', which can be a function */
    var a = new Array(n);
    if (typeof(v) === 'function') {
        return a.fill().map(v);
    }
    return a.fill(v);
};

var flatten = ansuz.flatten = function (AA) {
/* flatten an array of arrays into a single array */
    return AA.reduce(function(A,B){
        return A.concat(B);
    },[]);
};

var carte = ansuz.carte = function (f,A,B) {
    //[fix1]
/* map a binary function over the cartesian product of arrays */
    return A.map(function(a){
        return B.map(fix1(f,a));
    });
};

var carteSquare = ansuz.carteSquare = function (f,A) {
    //[carte]
/* easy wrapper around carte for when you want a square */
    return carte(f,A,A);
};

var comb = ansuz.comb = function (f,A) {
    //[fix1]
 /*    produce a heterogenous array consisting of all
        unique pairwise combinations of elements from an array */

 // make a copy of the array in question
    var B=A.slice(0);
    // map over the initial array
    return A.map(function(a){
        // compute the results of the current iteration
        var R=B.map(fix1(f,a));
        // remove the first element
        B.shift();
        // return the results
        return R;
    });
};

var die = ansuz.die = function (r) {
/* simulated die */
    return Math.floor(Math.random()*r);
};

var shuffle = ansuz.shuffle = function (A) {
/* shuffle an array (destructive, use slice for pure functional) */
    var i=A.length;
    while(i){
        var r=die(i--);
        var temp=A[i];
        A[i]=A[r];
        A[r]=temp;
    }
    return A;
};

var cut = ansuz.cut = function (A,n) {
/* cut an array in two and return the two halves, concatenated in reverse */
    n=Math.min(n,A.length);
    A=A.slice(n).concat(A.slice(0,n));
    return A;
};

var exists = ansuz.exists = function (A,e) {
    //[isArray]
    /*  test if an element exists in an array 
        if the provided argument is an object, instead test if one of the keys
        corresponds to such a value
    */
    if(typeof e === 'undefined'){
        return A;
    }
    if(isArray(A)) return (A.indexOf(e)!==-1);
    if(typeof A==='object'){
        for(a in A){
            if(A[a] == e){
                return true;
            }
        }
        return false;
    }
};

var addIfAbsent = ansuz.addIfAbsent = function (A,e,f,n) {
/*  (A, e, f, n) Given an list and an item, push the element to the list
    if it is not already present. Optionally provide two callbacks: (f, n).
    f is called with e if e is absent. Otherwise n is called with e. */
    if(A.indexOf(e) === -1){
        A.push(e);
        if(typeof f === 'function'){
            f(e);
        }
        return true;
    }else if(typeof n === 'function'){
        n(e);
        return false;
    }
};

var vals = ansuz.vals = function (O) {
/* return all the values in an object */
    return Object.keys(O).map(function(k){
        return O[k];
    });
};

var keys = ansuz.keys = function (O) {
/* return all the keys in an object */
    return Object.keys(O);
};

var vals = ansuz.vals = function (O) {
/* return all the values in an object */
    return keys(O).map(function(k){
        return O[k];
    });
};

var clone = ansuz.clone = function (A) {
/* clone return a clone of an objet */
    return JSON.parse(JSON.stringify(A));
};

// FIXME make this more than a shallow merge
var merge = ansuz.merge = function (X,B,f) {
    //[clone,keys]
 /*    merge two objects, 
        resolve conflicts with a third, optional argument, a function f
        which overwrites attributes of the first with the second by default */

    var A=clone(X); // don't break the original
    f=f||function(a,b){return b;}; // default behaviour in conflict is overwrite
    keys(B).map(function(b){ // just for side effects
        A[b]=(b in A)?
            f(A[b],B[b]):
            B[b];
    });
    return A;
};

var log = ansuz.log = function (a,b) {
    /* arbitrary base logarithm, since I always seem to end up needing it */
    return Math.log(a)/Math.log(b);
};

var intersection = ansuz.intersection = function (A,B) {
/* (A, B) return all elements of a list 'A' which exist in 'B' */
    //[fix1,exists]
    return A.filter(fix1(exists,B));
};

var difference = ansuz.difference = function (A,B) {
/*  (A, B) return all elements in A which are not in B */
    //[negate,fix1,exists]
    return A.filter(negate(fix1(exists, B)));
};

var distinction = ansuz.distinction = function (A, B) {
/* (A, B) return distinct elements from lists A and B */
    //[difference]
    return difference(A, B).concat(difference(B, A));
};

var superset = ansuz.superset = function (A,B) {
/* (A, B) return true if A is a superset of B */
    //[negate,fix1,exists]
    var b=B.filter(negate(fix1(exists,A)));
    var a=A.filter(negate(fix1(exists,B)));
    return b.length==0 && A.length > 0;
};

var subset = ansuz.subset = function (A,B) {
/* (A, B) return true if A is a subset of B */
    //[negate,fix1,exists]
    var x=A.filter(negate(fix1(exists,B))).length;
    var y=B.filter(negate(fix1(exists,A))).length;
    return x === 0 && y > 0;
};

var stdDev = ansuz.stdDev = function (A) {
    //[sum]
/* take the standard deviation of an array of numbers */
    var S = sum(A),
    L = A.length;
    mean = S/L;
    var variance = sum(A.map(function(x){
        return Math.pow(x-mean,2);
    }))/A.length;
    return Math.pow(variance,0.5);
};

var schedule = ansuz.schedule = function (f,t,n) {
/* execute a function f every t seconds, to a maximum of n times */
    n = n || -1;
    n -= 1;
    if (n===0) {
        setTimeout(function(){
            f(n);
        },t);
    } else {
        setTimeout(function(){
            f(n);
            schedule(f,t,n);
        },t);
    }
};

var forget = ansuz.forget = function (f,i,c) {
/*    accept a function and return a forgetful generator */
    // make sure the cache is initialized, 'i' has a default value of 0
    c=c||{i:i||0};
    // return the generator, passing the value of the index
    // and a reference to the cache
    return function(){
        return f(c.i++,c);
    };
};

var stateful = ansuz.stateful = function (f,c) {
/*    accept a function and return a stateful generator */
    c=c||{};
    return function(cache){
        // when a new cache is passed, it overrides the original
        c=cache||c;
        return f(c);
    };
};

var memo = ansuz.memo = function (f,c) {
/*    accept a function and return a memoizing generator */
    // initialize the cache with an empty object if one was not passed
    c=c||{};
    // if the cache does not contain 'i' (its index) initialize it as 'zero'
    c.i=c.i||0;
    // memoization depends on an array which can be filled and referenced
    c.memo=c.memo||[];
    // c.last stores the last value which was modified
    c.last=c.last||null;
    // using c.f, reference the initial function which was passed (and recurse)
    c.f=f;

    // c.fn is the new function which will be returned (which increments c.f)
    c.fn=function(n){
        if(isNaN(n)){
            c.memo[c.i]=c.last=f(c.i,c);
            c.i++;
            return c.last;
        }else if(c.memo[n]){
            return c.memo[n];
        }else{
            n=Math.floor(n);
            while(typeof c.memo[n] === "undefined"){
                c.fn();
            }
            return c.memo[n];
        }
    };
    // return the memoizing generator
    return c.fn;
};

var either = ansuz.either = function (a) {
/* accept an array and return a function which returns successive elements */
    var i=0;
    return function(){
        return a[i++];
    };
};

var cycle = ansuz.cycle = function (a) {
/* accept an array and cycle through its elements */
    var i=0,l=a.length;
    return function(){
        return a[i++ % l];
    };
};

var fcycle = ansuz.fcycle = function (a) {
 /*    accept an array of functions and return a generator
        which cycles through executing each function */
    var F = cycle(a);
    return function () {
        return F()();
    };
};

var fail = ansuz.fail = function (x) {
/* global default fail condition for generators */
    return typeof x==="undefined";
};

var done = ansuz.done = function (){
/* global default completion callback */
    return;
};

var first = ansuz.first = function (lz,n,cond) {
    //[fail]
/* a little misleading, get the next N elements from a generator */
    var i=0; // what element are we currently working on?
    n=n||1; // default number of elements to return
    var acc=[]; // the accumulator you will return
    cond=cond||ansuz.fail; // default to checking for undefined
    while(n>i++){
        var res=lz();
        if(cond(res))break;
        acc.push(res);
    }
    return acc;
};

var all = ansuz.all = function (lz,cond) {
    //[fail]
/* generate (and discard) all elements of a lazy list
    (potentially infinite!!!) */
    cond=cond||ansuz.fail;
    while(1){
        if(cond(lz()))break;
    }
};

var listall = ansuz.listall = function (lz,cond) {
    //[fail]
/* generate (and collect) all elements of a lazy list
    (potentially infinite!!!) */
    cond=cond||ansuz.fail;
    var acc=[];
    while(1){
        var res=lz();
        if(cond(res))break;
        acc.push(res);
    }
    return acc;
};

var filter = ansuz.filter = function (lz,sat,cond) {
    //[fail]
/*    return a function which takes a lazy list
        and returns the next element from that list
        that matches some predicate */

    sat=sat||function(x){return true;};
    cond=cond||ansuz.fail; // default to checking for an undefined result
    return function(){ // return a generator
        var res=lz(); // which increments the generator you gave it
        while(!cond(res)){ // while failing to meet some terminal condition
            if(sat(res)) // if you find a satisfactory result, return it
                return res;
            res=lz(); // otherwise, keep on looking
        }
        return; // return undefined if you reach a terminal condition
    };
};

var cons = ansuz.cons = function (lz,next,cond,done) {
    //[done,fail]
/* return a construct a generator which produces elements
        from the concatenation of two lazy lists */

    next=next||ansuz.done; // fall back to undefined if no successor
    cond=cond||ansuz.fail; // failure behaviour if no terminal condition
    done=done||ansuz.done; // fail at the end of the second list
    var f=function(){return lz();}; // fetch elements from the first list
    var failed=false; // this keeps us from an infinite loop
    var fn=function(){ // the generator we will return
        var res=f(); // get the first result
        if(cond(res)&&failed){ // if we've failed twice, then we're done
            return; // return an undefined result
        }else if(cond(res)){ // otherwise, if we fail, try moving on
            f=function(){return next();} // now use the second list
            failed=true; // but remember that we failed once
            return fn(); // return the next element
        }else
            return res; // otherwise, we must have a good result, return it
    };
    return fn; // return the handler function
};

var chain = ansuz.chain = function (F,cond,done) {
    //[fail,done,cons]
/* chain together an array of lazy generators */
    cond=cond||ansuz.fail;
    done=done||ansuz.done;

    var fn=F.concat(done) // add done to the end
        .reverse() // we need to start from the end
        // the nth function needs to be passed as the 'next' to the (n-1)th
        .reduce(function(next,current){
            // chain function together
            return ansuz.cons(current,next,cond,done);
        },function(){});
    return fn; // return the lazy handler you've produced.
};

var combinatorial = ansuz.combinatorial = function (f,g,cond,done) {
    //[fail,done,either]
/* an attempt at backtracking */
    cond=cond||ansuz.fail; // default to a standard fail condition
    done=done||ansuz.done; // default to a standard callback
    var temp; // a temp variable to store the latest parent value
    var kid; // a variable to store the current child generator
    var fz=either(f); // the parent function
    var failed=false; // track if the parent function has failed
    var par=function(){ // this is the parent function handler
        temp=fz(); // increment the parent function and store the value in temp
        if(cond(temp)){ // if the parent function has failed..
            failed=true; // indicate that
            return; // and return
        } // but you still have a child function to pass over
        kid=either(g); // generate it
    };
    par(); // now that the parent handler is defined, increment it
    var fn=function(){ // the main generator you'll return
        var res=kid(); // call the child function and store the result
        if(cond(res)&&failed){ // if both generators have failed
            return done(); // then you're done
        }else if(cond(res)){ // if just the child has failed
            par(); // regenerate the child array
            return fn(); // return the next child value
        }else{ // otherwise.. 
            return [temp,res]; // return combined parent and child values
        }
    }; // end of generator function
    return fn; // now return it and start using it
};

var splice = ansuz.splice = function (string,index,ins) {
/* splice into a string as you would with an array */
    ins=ins||"";
    var A=index?string.slice(0,index):"";
    var B=string.slice(index);
    return A+ins+B;
};

var swap = ansuz.swap = function (s,o,r) {
/* replace tokens in a string with their definitions in a dictionary 
     swap is deprecated, use substitute instead */
    r=r||/{\w+}/g;
    return s.replace(r, function(k) {
         return o[k]||k;
    });
};

var substitute = ansuz.substitute = function (opt) {
/* substitute is a more flexible version of 'swap' */
    if(!opt)return;
    var pattern=opt.pattern||/\{[\s\S]+\}/g;
    var values=opt.values||{};
    var callback=opt.callback||function(key){
        return values[key.slice(1,-1)]||key;
    };
    return opt.source.replace(pattern,callback);
};

var ngraphs = ansuz.ngraphs = function (S, n, d, C) {
/* accept an array of strings and generate weighted directional graph */
    if (isArray(S)) {
        S = S.slice(0);
        d = typeof d !== 'undefined'? d: ' ';
    } else if (typeof(S) === 'string') {
        S = S.split("");
        d = typeof(d) !== 'undefined'? d: '';
    }

    n=(typeof n!=='undefined')?n:1;
    C = C || {};
    while(S.length>(n+1))
        (function(){
            var id=S.slice(0,n+1).join(d);
            var fol=S[n+1];
            C[id]=C[id]||{};
            C[id][fol]=(C[id][fol]||0)+1;
            S.shift();
        })();
    return C;
};

var choose = ansuz.choose = function (A) {
    //[die,keys]
/*    choose accepts an array, string, or object
        it chooses and returns an element, attribute, or character */
    if(typeof A === 'string')
        A=A.split("");
    if(typeof A === 'object')
     return (function(){
                var T=keys(A);
                return A[T[die(T.length)]];
            }());
    return A[die(A.length)];
};

var unique = ansuz.unique = function (A) {
/*  Given a list, return a new list of deduplicated elements
    (by strict equality) */
    //[fix1,addIfAbsent]
    var B = [];
    A.forEach(fix1(addIfAbsent, B));
    return B;
};

var weightedArray = ansuz.weightedArray = function (C) {
    //[flatten,nullArray,keys]
/*    weightedArray accepts an object C, in which keys correspond to integers
        each integer corresponding to the occurences of that key in a corpus,
        and a key k, which is taken as */
    return flatten(keys(C).map(function(k){
        return nullArray(C[k]).map(function(x){
            return k;
        });
    }));
};

var docString = ansuz.docString = function (f) {
    /*
        accepts a function
        returns the first block comment in the function's source text
    */
    var res=/\/\*[\s\S]+?\*\//.exec(f.toString());
    return !res?'':res[0].slice(2,-2)
            .split('\n')
            .map(function(line){
                return line.trim();
            })
            .join('\n');
};

var globs = ansuz.globs = function (D,L) {
/* given a list of function names and an ansuz-annotated module,
    return a list of global dependencies
*/
    //[keys]
    var G={};
    // for every function name in the list of dependencies
    D.map(function(d){
        L[d] && L[d].toString() // find the source
                // for every such source
            .replace(/\/\/\{.*\}/,function(s){
                // find global libs annotated with curly braces
                s.slice(3,-1).split(",").map(function(g){ G[g]=true; });
            });
    });
    return keys(G);
};

var deps = ansuz.deps = function (D,L) {
/* given a list of function names and an ansuz-annotated module,
    return a list of local dependencies
*/
    // a list of deps and an optional lib
    //[keys,vals,unique,flatten] // functions must be annotated like so.
    var L=L||ansuz; // use this for other compliant libraries, default to ansuz
    // only the first matched dependency array will be used
    // put it at the top of your function!
    var F=keys(ansuz); // an array of all the functions
    var R={};
    F.map(function(f){
        var d;
        ansuz[f].toString()
            .replace(/\/\/\[.*\]/,function(deps){
                d=deps;
            });
        R[f]=d?d.slice(3,-1).split(","):[];
    });

    var C={};
    var getDepsOf=function(d){
        if(!C[d]){

            C[d]=R[d]||true; // DRY

            (R[d]||[]).map(getDepsOf);
        }
    };

    flatten(D.map(function(d){
        return R[d];
    })).map(getDepsOf);
    return keys(C);
};

var compile = ansuz.compile = function (D,L,T,G) {
/* compile requires at least one argument, an array of dependencies (strings)
     each dependency is the name of a function
        that has been imported into the current scope.

 it will optionally accept a number of other options:
    a library L (an object), from which the functions will be extracted
        this defaults to the current library (ansuz)
    a title T (a string), to which the resulting library will refer
        this defaults to '$'
    a list of globally accessible libraries that will be required G (an array)
        this defaults to []

returns a string */

    //[swap]
    L=L||ansuz;
    T=T||'$';
    G=G||[];

    // boilerplate
    var plate=function(){/*
(function () {

var {TITLE}={};

{BODY}

if(typeof module !== 'undefined') {
    module.exports = {TITLE};
} else if (typeof(define) === 'function' && define.amd) {
    define(function () {
        return {TITLE};
    });
} else {
    window.{TITLE} = {TITLE};
}

}());
*/}.toString().slice(14,-3);

    var B=D.map(function(d){
        return swap("var {FUNCTION} = {TITLE}.{FUNCTION} = {SOURCE};"
            ,{'{TITLE}':T
                ,'{FUNCTION}':d
                ,'{SOURCE}':L[d].toString()
            });
    }).join("\n\n")

    return G.map(function(g){
        return 'var '+g+'=require("'+g+'");\n';
    }).join("")+
    swap(plate
        ,{
            '{TITLE}':T
            ,'{BODY}':B
        });
};

var autocompile = ansuz.autocompile = function (D,L,T) {
/* given a list of function names, a module, and a module title,
    compile a source-string which includes all necessary functions
*/

    //[glob,deps,compile]
    //{fs}
    L=L||ansuz;
    T=T||'ansuz';
    var G=globs(D,L);
    var F=deps(D,L,T);
    return compile(D.concat(F),L,T,G);
};

if(typeof module !== 'undefined') {
    module.exports = ansuz;
} else if (typeof(define) === 'function' && define.amd) {
    define(function () {
        return ansuz;
    });
} else {
    window.ansuz = ansuz;
}

}());
