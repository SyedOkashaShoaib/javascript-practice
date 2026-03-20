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
// } // This works because Object.keys(obj) returns an array of objects and arrays are iterable.

// const copy_array = [...array];  //Creates a shallow copy (A shallow copy creates a new object or array, 
// but only the values of primitive data types are duplicated. For any nested objects or arrays, 
// only their references are copied. This means changes to the nested structures in the copied 
// object will also affect the original object.)

// console.log(copy_array);

//An iterable has a [symbol.iterator]() method that returns an iterator. That iterator has a next() method 
//which iterates over all the indexes until the end.
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

