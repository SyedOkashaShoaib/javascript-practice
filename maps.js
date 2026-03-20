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