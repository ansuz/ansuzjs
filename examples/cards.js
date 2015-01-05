var $=require("../ansuz");

/* Random reordering of a set can be useful when backtracking
  because while it provides a guarantee that you will still traverse
  every element of the set, it modifies the order in which it is traversed.
  deterministic search behaves identically each time it is repeated.
  That behaviour is sometimes guaranteed to be optimal,
  in other circumstances, it is guaranteed to be suboptimal.

  stochastic reordering avoids repetition of failed searches,
  while making it possible (however unlikely) to behave in a best case manner,
  no matter the search space.

  Unfortunately, this method can not be applied to infinitely long sequences. */

// Shuffle things up a bit.
console.log($.shuffle($.range(12)));

// 'cut the deck' such that you begin from the middle of your sequence
console.log($.cut($.range(12),4));
