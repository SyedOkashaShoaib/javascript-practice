/*Making custom iterators manually as we did in iteration.js can be buggy. Modern JS replaces that with 
generators. 

Creating a Generator: 
-> You define a generator function by using * after the functoin keyword. 
-> A generator fucntion is not executed when invoked, rather it returns a generator object. (like how symbol.iterator
returns an iterator obj)
-> Yield -> A return statement that pauses the execution of the function rather than ending it. 
-> when you call next on the generator obj, the generator function is executed until it hits its first yield statement. */


/*Stupid generator example: */
function *oneDigitPrime() {
    console.log("Starting..");
    yield 2;
    yield 3;
    yield 5;
    yield 7;
}

let prime = oneDigitPrime();
console.log(prime.next().value); //(stops after starting... as the statement is yield. returns 2 and pauses execution of function)
console.log(prime.next().value);
console.log(prime.next().value);
console.log(prime.next().value);
console.log(prime.next().value); //undefined. 
console.log(prime.next().done); //true


/*ALTERNATIVE SYNTAX DEFINITIONS: 
1. Generator Expression:  */

let generator = function*(from, to) { for (let i = from; i <= to; i++) { yield i; }}

console.log([...generator(1, 10)]);


/*As an object method:
->Shorthand in object method literals and classes: 
You dont need the function keyword at all */

let obj = { 
    "key" : "value",
    *g() {
        for (let keys of Object.keys(this)) {
            yield keys;
        }
    }
}

console.log([...obj.g()]);


/*You cant write a generator function using the arrow function syntax. */

/*Making our Range class (from iterationjs ) iterable using genenrators: */
class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    *[Symbol.iterator]() {
      for (let x = this.from ; x <= this.to ; x++ ) {
        yield x;
      }

    }
}

console.log([...new Range(1, 10)]);
