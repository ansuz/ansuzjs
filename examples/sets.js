var ansuz = require("..");

/*  given a list of indices, rearrange them in a deterministic order
    returns a new list */
var inc = function (A, l) {
    var B = A.slice(), i = A.length - 1, j;
    while (i >= 0) {
        if (B[i] !== l) {
            B[i]++;
            return B;
        }
        if (i > 0 && B[i - 1] !== B[i] - 1) {
            B[i - 1]++;
            for (j = i; j < B.length; j++) { B[j] = B[j -1] + 1; }
            return B;
        }
        i--; l--; // keep looking
    }
    return; // terminal case. return undefined
};

/*  given a list, return a function which iterates through all possible subsets
    including the empty set, and the original set */
var sets = function (A) {
    var l = A.length -1,
        t = function (B) { return B.map(function (n) { return A[n]; }); };

    /*  return a function which generates ordered possible subsets of size n
        when sets of size n are exhausted, return undefined */
    var g = function (n) {
        var B = ansuz.range(0, n);
        return function () {
            if (!B) { return; }
            var C = t(B);
            B = inc(B, l);
            return C;
        };
    };

    var size = -1,
        h;
    return function f () {
        if (size >= A.length) { return; }
        if (size === -1) { return ((h = g(++size)), []); }
        var x = h();
        if (!x) { // end of size
            return ((h = g(++size)), f());
        }
        return x;
    };
};

module.exports = sets;
