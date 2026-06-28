// iterator -> holds a reference to a data source.

// const array = [1,2,3];
// const obj = {x: "Juan",
//             y : "Joseph"
// };
 

// for (let x of array ) {
//     console.log(`Value of iterator: ${x}`);
// }

// for (let x of obj) {
//     console.log(`Itertor value: ${x} `);
// }  --> This throws an error because "Objects are not iterable". You cant iterate over an object, you can only iterate over its keys and values.

// for (const x in obj) {
//     console.log(x);
// }  //This iterates over its keys.

// for (const key in obj) {
//     console.log(obj[key]);
// }

// for (const key in Object.keys(obj)) {
//     console.log(obj[key]);
// } // This works because Object.keys(obj) returns an array of keys and arrays are iterable.

// const copy_array = [...array];  //Creates a shallow copy (A shallow copy creates a new object or array, 
// but only the values of primitive data types are duplicated. For any nested objects or arrays, 
// only their references are copied. This means changes to the nested structures in the copied 
// object will also affect the original object.)

// console.log(copy_array);

//An iterable has a [symbol.iterator]() method that returns an iterator object. That iterator has a next() method 
//which iterates over all the indexes until the end.
/*
Every time the iterator obejct calls the next() method, it returns the iterator result object and moves one step 
ahead. 
The iterator result object contains two properties:
value -> Holds the value that has been iterated over.
done -> a boolean which is false as long as there is data remaining to be iterated over. */
//for 
// const copy_array = [...array];
//js does:
// const iterator = array[Symbol.iterator]();

// const copy = [];     // ← this is what becomes your copy

// let step = iterator.next();

// while (!step.done) {
//   copy.push(step.value);
//   step = iterator.next();
// }
// doSomething(...array);
// function doSomething(...args) {
//     for(const x of args) {
//         console.log(x);
//     }
// }


//The iterator can only consume an iterable only once, if you want to consume an iterable more than once,
//then you must create a new iterable.

//ITERATING OVER MAPS

const mymap = new Map([[1,'One'],[2,'two'],[3,'three']]);
for (let [key, value] of mymap) {
    console.log(key,value);
}

for (const x of mymap) {
    console.log(x);
}

for (const key of mymap.keys()) {
    console.log(key)
}

for(const value of mymap.values()) {
    console.log(value);
}

for (const [index, value] of mymap.entries()) {
    console.log(index, value);
}


/*Partially Used Iterators: 
Iterators objects are iterable themselve.. 
Meaning that they have a symbol.iterator method that returns the same iterator object. 
An iterator object is more or less structured like this: 
// Conceptual representation of the array iterator
{
  targetArray: [1, 2, 3, 4, 5],
  currentIndex: 0,
  next() {
    if (this.currentIndex < this.targetArray.length) {
      return { value: this.targetArray[this.currentIndex++], done: false };
    } else {
      return { value: undefined, done: true };
    }
  },
  [Symbol.iterator]() {
    return this; // Returns itself!
  }
}
  
Keeping this in mind, we can do this:*/

const list = [1,2,3,4,5];
let iterator = list[Symbol.iterator](); 
let head = iterator.next().value; //currentindex goes from 0 -> 1
/*
The spread operator (...) is programmed to do exactly three things:It looks at the object provided (iter) and 
calls its [Symbol.iterator]() method to get an iterator.Because of the quirk mentioned in the textbook, 
iter[Symbol.iterator]() simply returns iter itself.  The spread operator then runs a while loop, 
repeatedly calling next() on that iterator until it receives { done: true }.Because the iter object's 
internal cursor is already at 1, the spread operator's first call to next() returns 2. Its second call returns 3,
 and so on. The spread operator blindly collects these returned values into a new array: [2, 3, 4, 5] */
let tail = [...iterator]; 


/*Making a class iterable: */

class Range {
    constructor(from, to){
        this.from = from;
        this.to = to;

    }

    [Symbol.iterator]() {
        let next_val = Math.ceil(this.from);
        let last_val = Math.ceil(this.to);

        return {
            next() {
                return (next_val <= last_val) ? { 'value' : next_val++, 'done' : false} : {'done' : true};
            },
            [Symbol.iterator]() { return this; } //making the iterator iterable
        }
    }
}

for (let x of new Range(1,20)) { 
    console.log(x); //prints from 1-20.
}
let range_arr = [...new Range(1,10)];
console.log(range_arr);


/*the map method requires the data structure to be an array. 
We are creating a custom map method that can be executed over any iterable. */


function map(iterable, map_function) {
    iterator = iterable[Symbol.iterator](); //iterator object of our custom iterable Range class obj. 
    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            obj = iterator.next();
            if (obj.done) {
                return {'done' : true};
            }
            return {'value' : map_function(obj.value), 'done' : false};
        }
    }

}

let arr = [...map(new Range(1,10), n=> n * n)];
console.log(arr);


/*
Making our custom filter function for un array like iterables. */

function filter(iterable, predicate) {
    iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() { return this; },
        next() {
            while(true) {
                obj = iterator.next();
                if (obj.done || predicate(obj.value)) {
                    return obj;
                }
            }
        }
    };
}

let filter_arr = [...filter(new Range(1,10), x=> x % 2 === 0 )];
console.log(filter_arr);


/*PROBLEM: PREMATURE ITERATION TERMINATION: 
Not always do iterators completely iterate over an iterable: 
1. The loop may terminate prematurely due to a break statement
2. An exception being thrown inside the loop
...
Assume that you are iterating over a file, and the iteration loop is terminated prematurely. However since the 
iterator obj is linked to the file, the file remains open. 
How do we fix this? 
WHenever an iteration is terminated prematurely, js engine looks for a return method inside the iterator, and executes
it. Inside this return method, we can do the required garbage collection or whatnot.

Note: The return statement must return an object. */

