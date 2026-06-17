//OBJECTS KEYS: 
/*key → {
    value,
    writable,
    enumerable,
    configurable
} */


// const x = { "": "Emptyyyy"};
// console.log(x[""]);  //Empty strings are allowed as keys.
// const y = { for : "For is a reserved keyword but reserved keywords can be used as keys in objects because they are identified as identifiers"};

//Trailing comma after the last key-value pair is legal.

//CREATING OBJECTS USING NEW:

let object = new Object(); //same as {}
//CREATING A NEW PROPERTY
object.newproperty = "This is a new property.";
// console.log(object.newproperty);
// console.log(object["newproperty"]); //Using square bracket notation. This looks like array access,
//but with strings as indexes -> assosiative arrays 


//PROPERTY ACCESS ERRORS:
/*->Accessing a property that does not exist ->NOT AN ERROR (Returns undefined)
 ->Accessing a property of an object that does not exist is an error. */

// console.log(object.newpropertys); //undefined
// console.log(object.newpropertys.someproperty); //returns an error because newpropertys is not an object.

/*
JavaScript evaluates in this order:

Step 1: Is o null or undefined?

→ Throw TypeError

Step 2: Does o have own property p?

If writable → update

If read-only → fail

Step 3: Does prototype chain contain p?

If accessor with setter → call setter  (Setters will be explained later on)

If data property and writable → create own property

If data property and read-only → fail

Step 4: If property doesn’t exist anywhere

If object is extensible → create property

If not extensible → fail */



//DELETING PROPERTIES:

/*
In order to delete a property, it must be configurable 
-> key → {
    value,
    writable,
    enumerable,
    configurable
} -> These values must be changeable. 

delete returns true when:
1.the property is successfully deleted.
2.the delete operation has no effect.
*/

// let delete_obj = {x : 1};
// console.log(delete delete_obj.x);
// console.log(delete delete_obj.x); //evaluates to true because the delete op had no effect.
// console.log(delete "1");


let obj1 = {
        x : 1,
        greet: function() { console.log("Greetingss"); },
        y : { a: 2},
};
let obj2 = Object.create(obj1);
obj2.y = 2;

for (const x in obj2) {
    console.log(x);
}

for ( const x of Object.keys(obj2)) {
    console.log(x);
} // no inherited stuff printed apparently. Pbject.keys does not include
// non-enumerable properties, inherited properties, or properties
// whose name is a Symbol 

//COPYING OBJECTS IN JAVASCRIPT:
/* 
Object.assign(target, source1, source2, ...)
all enumerable and own properties (nothing from the prototype chain is copied) of the sources are copied in the target object. Only the target
object is modified.
*/
let source = {x:1};
let target = {};
// Object.assign(target, source);
// console.log(target); 

/*
Overriding properties: If properties have the same name, the right one overrides the left one.
Order of precedence:
target < source1 < source2 < ...
*/
let source2 = {x : 2};
Object.assign(target, source, source2);
console.log(target); // overrides x:1 with source2's property x:2

//shallow copy:

source.y = { y : 2};
Object.assign(target, source);
console.log(target); // the nested object's reference is copied. 

target.y.y = 3;
console.log(source.y); //changed in source object as well.

let o = {x: 1, y: 2};

for (let key in o) {
    console.log(o[key]);
}