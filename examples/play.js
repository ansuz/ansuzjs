const ansuz = require("ansuz");

const fibonacci = ansuz.memo((i, c) => i < 2? i: c.memo[i-1] + c.memo[i-2]);

const firstFive = ansuz.first(fibonacci, 5);

console.log(firstFive);

const nextThree = ansuz.first(fibonacci, 3);

console.log(nextThree);

const even = n => n % 2 === 0;

const nextThreeEvenFibs = ansuz.first(ansuz.filter(fibonacci, even), 3);

console.log(nextThreeEvenFibs);

//console.log(ansuz.every(nextThreeEvenFibs, ansuz.negate(even)));


