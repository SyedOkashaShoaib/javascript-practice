/*
Arrays are untyped -> You can have elements of different types in the same array
Arrays are dynamic -> Their size shrinks and grows with each deletion and insertion
Arrays are just like objects, the only difference is that the property keys in arrays are integers.
Arrays can be sparse -> Elements may not be stored in contiguous indexes.
*/


//CREATING ARRAYS

//Using array literals:

let array = [1, 'Happyyyy', { x: 1 }];
let base = 100;
let array2 = [base, base + 1]; // [100,101]
let array3 = [1, , 3]; //sparse array [1, undefined, 3]
let array4 = [, ,];
console.log(array4.length); // says 2. Because js allows an extra comma after the last array element.

//Using the spread operator:

let array5 = [{ y: 2 }, ...array, 3]; //[{y : 2},1, 'Happyyyy', {x : 1},3 ]

//the spread operator creates a shallow copy. A shallow copy duplicates the container, but not the nested objects.
//the spread operator works on any iterable:
//strings are iterable:
let array6 = [..."ukasha"];
console.log(array6); //['u','k','a',...]
//using spread operator to remove duplicates:
let array7 = [... new Set(array6)]; //set doesnt have duplicate elements.
console.log(array7);


//USING THE ARRAY CONSTRUCTOR:

let array8 = new Array(); //creates [];
let array9 = new Array(10); //An array of length 10. if you write only 1 integer in the constructor argument
// , then that integer becomes the array length
let array10 = new Array(10, 11, 12); //[10,11,12]
let array11 = new Array('does this count as a length?'); //prolly not.
//you can use Array.of() if you want to create an array with a single element.
let array12 = Array.of(1); //[1]


//UNDERSTANDING Array.from:
//Used to make array-copies of:
/**
 1. iterables
 2. array-like objects
 It works like the spread operator for the most part

 */

//for array-like Objects:
/*
Many APIs return objects that look like arrays but are actually not. They have numbered indices, and
length property but are not actual arrays. You cant use array-based methods on them. But you can 
convert them into arrays using array.from(). 
*/

let array_like = {
    0: "hello",
    1: "world",
    length: 2
}

let new_arr = Array.from(array_like);
console.log(new_arr);  // ['jello','world']

/*You can also map these array-like objects to a mapping function.
For each element, you pass it to a function and add the functions output to new array.
Array.from(array_like, mapping_FUnction) */



/*
An array is a specialized-form of an object, js converts the numeric array indexes into strings.
However, only arrays(key names are integers ranging between 0-2^(32)-2) have the special 
behavior of automatically mainting the length property*/

new_arr["string index"] = "WIll this work?"; //a regular object property, not an array index, 
// thus not counted in length property.
console.log(new_arr);
console.log(new_arr.length); //length is 2... despite there being 3 elements. 

//Note: Length = highest index + 1

/*OUT OF BOUNDS ERROR:
Since arrays are simply objects, there is no out of nounds. If you access a property 
which does not exist, then you get undefined (in non-strict mode) */



//ADDING AND DELETING ARRAY ELEMENTS:

let a = [1, 2, 3];
a.push(1, "string", true); //push is basically : a[a.length + 1] = whatever element.
console.log(a);

console.log(a.pop()); //Removes the last element from an array and returns it.
//  If the array is empty, undefined is returned and the array is not modified

console.log(a.shift()); //Removes the first element from an array and returns it. 
// If the array is empty, undefined is returned and the array is not modified. It reduces the 
//array length by 1 and shifts all elements down one index.

/*
DELETING ARRAY ELEMENTS:
1. Similar to assigning undefined to that index.
2. The length property remains the same.
3. The array becomes sparse.
4. No shifting occurs.
 */
console.log(a.length); //4
delete a[1];

if (1 in a) {  //condition : propertyname in object. Here, the index is the property name.
    console.log("BOMBACLAAAAT");
} else {
    console.log(false);
}

console.log(a.length); //remains 4. 
console.log(a); //[ 2, <1 empty item>, 1, 'string' ]

for (let x of a) {
    console.log(x); // index 1 returns undefined here not <1 empty item>
}

const letters = [..."Hello World"];
let even_letters = "";
for (let [index, letter] of letters.entries()) { // entries() also gives the index of  each element.
    if (index % 2 === 0) {
        even_letters += letter;
    }
}

console.log(even_letters);




//ARRAY METHODS:
/*
forEach() method: Runs a function for each element of the array.
You cant break out of the for loop until all the elements have been traversed.

        forEach(function(value,index, array))
        
    js internally passes these arguments to the function, however these arguments are optional*/

let arr = [1, 2, 3];
arr.forEach(function fun() {
    console.log("Using no arguments");
});

arr.forEach(function fun(value) {
    console.log(value);
    
})
arr.forEach(function fun(value,index) {  //for each expects parameters in the order: value, index, array.
    console.log( index);
})


//UNDERSTANDING THE MAP() FUNCTOIN:
/*
1.map takes a function as input.
2.the function must return a value.
3.it passes each value of the array through the func, and the output becomes an element for the new array at the same index number.
4.if the function does not return a value, then undefined is returned every time
5.Sparcity is preserved.
6. the functions parameters work just like they do in forEach()
*/

let b = [1,,3,4];
let c = b.map(function (x) {
    return x*x;
})

console.log(c); //[ 1, <1 empty item>, 9, 16 ]


//USING array.filter()
/*
1.Returns a subset of the array based on the output of a predicate function
2. A predicate function returns either true or false. 
3. Skips sparse indexes -> output is a sparse-free array (dense array)*/
let x = [1,2,3,4,5,,]
let d = x.filter(function(x) { 
    return x > 2;
});
console.log(d); //[ 3, 4, 5 ] => sparcity removed.

//removing sparcity from an array using filter: 
x = x.filter(function() { return true; }); 
console.log(x); //[ 1, 2, 3, 4, 5 ]



/*
FIND() AND FINDINDEX()
The find() and findIndex() methods are like filter() in that
they iterate through your array looking for elements for which your
predicate function returns a truthy value. Unlike filter(), however,
these two methods stop iterating the first time the predicate finds an
element. When that happens, find() returns the matching element,
and findIndex() returns the index of the matching element. If no
matching element is found, find() returns undefined and
findIndex() returns -1:
let a = [1,2,3,4,5];
a.findIndex(x => x === 3) // => 2; the value 3 appears at
index 2
a.findIndex(x => x < 0) // => -1; no negative numbers in
the array
a.find(x => x % 5 === 0) // => 5: this is a multiple of 5
a.find(x => x % 7 === 0) // => undefined: no multiples of 7
in the array

 */


//UNDERSTANDING THE REDUCE FUNCTION:

//iterates over an array and accumulates a result.
/*
A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
Calls the specified callback function for all the elements in an array. The return value of the callback 
function is the accumulated result, and is provided as an argument in the next call to the callback function.
array.reduce(reducerfunction, initial value)
reducerfunction(accumulator, current_value_from_array, index, array)
*/

let z = [1,2,3,4,5];
let result = z.reduce((accumulator, current)=> accumulator + current, 0);  //0 is the initial value.
console.log(result); //15


let count_1 = z.reduce((counter, curr) => (curr === 1) ? counter + 1: counter + 0, 0);
console.log(count_1);

/*
What if you skip the initial value parameter?
js automatically chooses the first element of the array as the initial value, and the current value starts from the second element. */


//UNDERSTANDING array.reduceright():
//works just like reduce but processes the array from the right to left.



//UNDERSTANDING array.splice():
/*
array.splice(starting index, deletecount, item1, item2, ..)
deletecount -> number of items to delete
item1,item2, .. -> Optional argument to add items

returns the deleted items 
*/

let h = [1,2,3,4,5];
console.log(h.splice(2), h); //since no deletecount given all elements from index 2 onwards will be removed and returned. Return value = [3,4,5]
h = [1,2,3,4,5];
console.log(h.splice(2,1), h); // return value : [3]
console.log(h.splice(2,0,"Adding an item"), h); //return value = [] empty array as nothing was deleeted
console.log(h.splice(2, 1 , "Replacing the item at index 2"), h); //return value  ["Adding an item"]
