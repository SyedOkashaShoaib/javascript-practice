//MAPS IN JAVASCRIPT
// Just like objects they hold key-value pairs.
//WHats the difference then?
//In objects, the key must be a string, whereas in maps, the key can be anything.
// In objects, the preservation of insertion order is not guaranteed, whereas in maps it is
// Retrieval takes O(1) time -> Internally uses hashing.

let mymap = new Map();
mymap.set(1,'One');

//using a function as a key: 
function greet(){
    console.log("Greetings fellow earthlings!");
}

mymap.set(greet, "A greet function");

console.log(mymap.get(greet));
//How does map know what greet is? 
// HOW IT WORKS:
//You create the function greet-> A function object is created. The greet variable now points to that 
//function object. When I write mymap.set(greet, "A greet function"), the engine looks up greet in the 
//lexical environment and identifies that greet points to the function obj.
//Memory:
// FunctionObject@0x1234

// Environment Record:
// greet → 0x1234
//map.set(FunctionObject@0x1234, "This is a greeting function");


//REVISITING MAP FROM CHAPTER 11 OF JS THE DEFINTIVE GUIDE:


/*basically a set of key value pairs. Maps are quite close to arrays in concept, the primary difference 
is that arrays can only have numbered indexes, whereas maps can have any arbritrary value as index(key).  */

/*CREATING A MAP variable:
 */
let m = new Map();
console.log(m);

/*
The optional argument to the Map() constructor must be an iterable object that 
yields two-element [key, value] arrays: */
let a = new Map(
    [
        ["one" , 1],
        ["two", 2],
    ]
);
console.log(a); //Map(2) { 'one' => 1, 'two' => 2 }

let obj = {"key" : "value", "hello" : "world"};
let b = new Map(Object.entries(obj)); //Map(2) { 'key' => 'value', 'hello' => 'world' }
console.log(b);
// let m = new Map({"key": "value"});TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))



// if you a map a value to a key that already exists in the map, you essentially rewrite the prexisting
//key's value. 

m = new Map();

m.set(1 ,"one");
console.log(m)
console.log(m.size); // 1

m.set(2 ,"two");
console.log(m)
console.log(m.size); // 2

console.log(m.get(1)); //one
console.log(m.get(3)); //undefined

console.log(m.delete(1)); //true
console.log(m.delete(1)); //false

/*Chaining: Set returns the map object on which it was invoked, therefore we can chain methods */

console.log(m.set(4, "four").delete(4)); //true


/*ANYTHING CAN BE USED AS A KEY, AND MAPS COMPARE KEYS BY IDENTITY,therefore if you use an 
object or an array as a key, it is considered distinctly different from every other object 
or array, even if they contain exactly the same elements or properties.   */

m.set({}, 1);
console.log(m.get({}))// returns undefined;

m.set(null, 'Hooooooo');
console.log(m.get(null)); //Hooooooo
console.log(m);
/*ITERATION: 
1. Insertion order is maintained. 
2.  */