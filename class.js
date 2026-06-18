


// }

// var dog = new Dog("Skipper", "dog");
// dog.bark();

// class Page {
//     constructor(text) {
//         this.text = text;
//     }
//     print() {
//         console.log(this.text);
//     }
// }

/*CLASSES AND CONSTRUCTORS:
Constructors are invoked using the new keyword:
r = new Constructor_Name (args);
After invoking a constructor, the following things happen:
1. A new object is created. 
2. Inside the constructor function, the invocation context is the new object
3. The new object is implicitly returned (you dont have to write a return statement)


THE PROTOTYPE CHAIN:
All JS objects have a prototype object, however, all js functions have a prototype property as well(excluding arrow functions, 
generator functions, and async functions).
The object created by new Constructor() gets its internal prototype set to Constructor.prototype.*/

function Constructor(a, b) {
    this.a = a;
    this.b = b; // this-> new object
}
Constructor.prototype = {
    inherits_this() { console.log(`${this.a} ${this.b}`); }  /*I initially used the arrow function here
    however, you cant do that because you are using this here, and this behaves quite differently for
    arrow functions as it does for regular functions. In arrow functions, the invocation context depends
    on where the function is defined, not the object that invoked it. Therefore, if the arrow function
    was used here, then the invocation context would probably be globalThis, and this.a, this.b will print
    undefined. */
}
let a = new Constructor(1, 2); // implicitly returns a new object.
a.inherits_this();


/* Constructors, Class Identity, and instanceof
 The fundamental identity of a class depends on the prototype property, and not on the constructor.

*/
console.log(a instanceof Constructor); //returns true
/*
instance of does not check whether a was initialized with the Constructor function, rather it checks 
whether it inherits the prototype property of Constructor.
 */

function LoopHole() {

}
LoopHole.prototype = Constructor.prototype;
console.log(new LoopHole() instanceof Constructor); //still returns true
/*Returns true because Looophole has the same prototype as Constructor */


/*The constructor Property
1.every regular JavaScript function automatically has a prototype property. The value of this
property is an object that has a single, non-enumerable constructor property. The value 
of the constructor property is the function
object: */

let f = function () { };
let b = f.prototype.constructor;
if (f === b) {
    console.log("The constructor property holds a reference to the function object itself.");
}

/*If we are overriding the prototype property as we did in the Constructor function example, then 
we silently delete the constructor property of the function. There are two ways to fix this: 
1. Manually add in the constructor property while overriding the prototype property:
Constructor.prototype = {
    constructor : Constructor,
    inherits_this() { console.log(`${this.a} ${this.b}`); }  
   }
2. Append the prototype properties instead of overriding it: 
Constructor.prototype.iherits = function() {...};
 */



/*Modern JS Classes: */
// class Dog {
//     constructor(name, breed){
//         this.name = name;
//         this.breed = breed;
//     }

//     bark() {     //this is a method defiinition, that is why you dont see the funciton keyword.
//         console.log("Bark");
//     }

/*Important rules to remember:
1. JS uses strict mode inside classes.
2. Classes are not hoisted at the top of their scope. */



/*STATIC FUNCTIONS IN CLASSES:
1. Regular functions are attached to the prototype object, and are therefore inheritable by class objects,
2. Static functions are not attached to the prototype object, rather they are attached to the class, or 
the constructor function itself, and are therefore not inherited by class objects. */

class MyClass {
    regular_function() {
        console.log("This is inherited by object");
    }

    static static_function() {
        console.log("This is not inherited by the class object");
    }
}

f = new MyClass();
f.regular_function();
// f.static_function(); //ERROR:f.static_function is not a function. MyClass.prototype does not have a static_function.
MyClass.static_function(); //works perfectly fine

/*USING this in static functions. Since it is not invoked by a class object, it usually doesnt 
make much sense to use this in a static function. */



/*GETTERS AND SETTERS: */

// class ComplexNumbers {
//     constructor(i,r) {
//         this.r = r;
//         this.i = i;
//     }
//     get real() { return this.r; }
//     get imaginary() { return this.i; }
//     get magnitude() { return Math.hypot(this.r, this.i); }
// }

/*Public, Private, and static attributes.
Modern js is actually readable! MI BOMBO */
class ComplexNumbers {
    r = 0; //public attributes
    i = 0;
    #random_private_attr = 0; //private attr must be declared using the new notation, you cant declare 
    // them in teh constructor using this.#private_attr = ..
    static ZERO = new ComplexNumbers(0, 0); //Like static methods, you can also declare static attributes,

    constructor(i, r) {
        this.r = r; //still have to use this everywhere else.
        this.i = i;
    }
    plus(that) {
        return new ComplexNumbers(this.r + that.r, this.i + that.i);
    }
    times(that) {
        return new ComplexNumbers(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.i);
    }
    static sum(c, d) {
        return c.plus(d);
    }
    static product(c, d) {
        return c.times(d);
    }
    equals(that) {
        return that instanceof ComplexNumbers && that.r === this.r && that.i === this.i;
    }
    toString() {
        return `{ r = ${this.r}, i = ${this.i} }`; //always add a tostring method -> good for debugging
    }
    get real() { return this.r; }
    get imaginary() { return this.i; }
    get magnitude() { return Math.hypot(this.r, this.i); }
}

let c1 = new ComplexNumbers(1, 2);
let c2 = new ComplexNumbers(c1.i, c1.r);
console.log(c1.equals(c2));
console.log(`${ComplexNumbers.ZERO}`);
console.log(c1.plus(c2));



//ADDING METHODS TO EXISTING CLASSSES:
/*
You can add methods to already existing classes because in javascript, inheritance is dynamic! You simply add methods
to the prototype property and those methods are automatically accessible by the objects.
c1.new_function() -> js looks at c1.prototype, does not find a method named new_function, then it looks at ComplexNumbers.prototype,
and finds the method. 
*/

ComplexNumbers.prototype.new_function = function () { console.log("New function"); }

c2.new_function(); //New function





/*UNDERSTANDING INHERITANCE AND SUBCLASSES
First we need to understand object.create():
object.create(obj) creates an internal link (the link is the prototype chain; think of it like grappling
hooks between objects) between the newly returned object and the object passed in the parameter.As a result
the newly created object creates a prototype chain with the object in the parameter, and inherits its
properties.
 */

const animal_blueprint = {
    breathe() { console.log("Animal is breathing."); }
};

let dog = Object.create(animal_blueprint);
dog.name = "dog";
dog.bark = function () { console.log("bark"); }
console.log(dog);
/*{ name: 'dog', bark: [Function (anonymous)] } : does not print the breathe() function. */
dog.breathe();
/*js looks in the dog object, does not find the breathe function, climbs the prototype chain,
looks in the animal_blueprint object, finds the method, and invokes it. */

function Range(to, from) {
    this.to = to;
    this.from = from;

}

Range.prototype = {
    toString() {
        return `${this.to} ${this.from}`;
    }
}

Range.prototype.constructor = Range;
/* Range.prototype.constructor = Range makes prototype.constructor enumerable, which is not default behaviour, therefore a better approach
might be(acc. to ChatGPT:*/
// Object.defineProperty(Range.prototype, "constructor", {
//     value: Range,
//     writable: true,
//     configurable: true,
//     enumerable: false
// });

let r = new Range(1, 2);
console.log(r.toString());


/*CREATING A SPAN CLASS THAT INHERITS FROM THE RANGE CLASS */


function Span(to, from, distance) {
    this.to = to;
    this.from = from;
    this.distance = distance;
}

Span.prototype = Object.create(Range.prototype);
/*Span now inherits all the properties of Range.
Why not simply use Span.prototype = Range.prototype? 
Because then Span.prototype will point to Range.prototype. Any addition
of properties in span.prototype will lead to them being added to Range.prototype; the parent class 
as well. */
Span.prototype.constructor = Span;

s = new Span(1, 2, 3);
console.log(s.toString());

//over writing parent class methods : 

Span.prototype.toString = function () {
    console.log("Hooo");
};
s.toString();


//MODERN ES6 SYNTAX FOR DEFINING CLASS INHERITANCE.
/*You use the extends keyword to inherit the methods of a class. The special thing about 
extends is that the child class also inherits the static methods of the parent class. */

class Easy_Array extends Array { //extending a pre-defined js array
    get getfirst() { return this[0]; }
    get getLast() { return this[this.length - 1]; }
}

arr = new Easy_Array(1, 2, 3); // 1,2,3 will be passed to the parent constructor 
console.log(arr);
arr.push(4); // method inherited from parent class.

console.log(Easy_Array.isArray(arr)); // static method inherited by Easy_Array;
console.log(arr.getfirst);


/*THE SUPER KEYWORD:
1. You can use the super keyword inside the inherited class' constructor to trigger 
the parent class' constructor. 
2. If you define the child class' constructor, you must use super to call the parent's
constructor.
3. you can only use this in the child class constructor after invoking the parent class 
constructor using super() . THe idea is that parent class attributes must be initialized before 
the child class attributes.
4. If you dont need to define the child constructor, then just pass the arguments in the object 
initialization */


class Typed_Map extends Map {
    constructor(keyType, valueType, entries) { // i copied this constructor bohooo
        // If entries are specified, check their types
        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !==
                    valueType) {
                    throw new TypeError(`Wrong type for entry
[${k}, ${v}]`);
                }
            }
        }
        // Initialize the superclass with the (type-checked)
        // initial entries
        super(entries);
        // And then initialize this subclass by storing the
        // types
        this.keyType = keyType;
        this.valueType = valueType;
    }
    set(key, value) {
        // Guard 1: Is there a keyType requirement, and does the key fail it?
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }

        // Guard 2: Is there a valueType requirement, and does the value fail it?
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }

        // If it survives both guards, we confidently let the superclass store it!
        return super.set(key, value);
    }
}

let mymap = new Typed_Map("string", "number",[["2" , 2]] );
mymap.set(1, "Trap");