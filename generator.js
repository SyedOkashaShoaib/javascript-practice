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


/*Some stuff that you can do with generators: 
 */

/*Fibonacci sequence: 
You can use never ending loops in generators: */

function *fibonacciSequence() {
    let x = 0, y = 1;
    while(true) {
        yield y;
        [x,y] = [y, x + y];
        
    }   
}
/*However if we run fibonacciSequence as it is it will keep on running forever.  */

function fibonacci(n) {
    for(let f of fibonacciSequence()) {
        if (n-- <= 0){
            return f;
        }
    }
}

console.log(fibonacci(20));


/*
Since infinite generators are dangerous if left unchecked, it is a common functional programming pattern to 
wrap them in a utility that limits how many items they can yield.

Textbook Example: The take Generator
The textbook introduces take(n, iterable) . This generator grabs the iterator of whatever iterable you pass to it,
 and yields exactly n items before intentionally returning and closing the stream */


 function *take(n, iterable) {
    let iterator = iterable[Symbol.iterator]();

    while (n-- >= 0) {
        let next = iterator.next();
        if (next.done) {
            return;
        }
        else {
            yield next.value;
        }
    }
 }

 console.log([...take(10, fibonacciSequence())]);



 function *zip(...iterables) {
    let iterator = iterables.map(x=>x[Symbol.iterator]());
    let index = 0;
    while(iterator.length > 0) {
        if (index >= iterator.length) { 
            index = 0;
        }
        let next = iterator[index].next();
        if (next.done ) {
            iterator.splice(index,1);
        }
        else {
            yield next.value;
            // index++;
        }
    }
 }

 console.log(...zip(oneDigitPrime(), new Range(1,10), 'abcd', [1,2,3] ));
/*
UNDERSTANDING yield*:
 what does yield* do? 
 it essentially says, that I am pausing my own execution, and I am handing complete control over to this other 
 iterable object. I will not resume my own code until that other iterable has completely finished yielding every 
 single one of its values.*/

 function *zip_2(...iterable) {
    let iterator = iterable.map(x=>x[Symbol.iterator]());
    index = 0;
    for (let iter of iterable) {
        yield* iter;
    }
    
// [
//   2,   3,   5,   7,   1, 2, 3,
//   4,   5,   6,   7,   8, 9, 10,
//   'a', 'b', 'c', 'd', 1, 2, 3
// ]
 }

 console.log([...zip_2(oneDigitPrime(), new Range(1,10), 'abcd', [1,2,3] )]);





