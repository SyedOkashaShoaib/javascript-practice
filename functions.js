/**
 * functions are objects. Therefore, they can have properties, they can be assigned to variables, 
 * they can be passed as arguments to functions, they can have methods? (im not sure how)
 */

//HOISTING IN JAVASCRIPT FUNCTIONS:
/*
function DECLARATIONS are automatically hoisted to the top of their ENCLOSING BLOCK */
hoist_me_Daddy();
function hoist_me_Daddy() {
    console.log("Even though I am envoked BEFORE my declaration, due to hoisting, this is legal.");
}


/*
Function identifiers (the function's name):
the function identifier is a variable that holds the function object. ZOOWEEMAMAMAAA */



/*
FUNCTION EXPRESSIONS:
1. part of a larger expression
2. the name of the function is optional in most cases.
3. Instead you assign the fucntion expression to a variable if you want to use it more than once.
4. It is recommended to use const with the variable so that you dont reassign it. */


const sq = function (x) { //no identifier.
    return x * x;
}
console.log(sq(2)); //4

/*
However if your function needs to recursively call itself, then it needs to have a name.That name
only exists within the scope of the function and cannot be used outside the function's scope. */

const fact = function factorial(x) {
    if (x <= 1) return 1;
    else {
        return x * factorial(x - 1);
    }
};

console.log(fact(5));

/*
IMPORTANT DISTINCTION BETWEEN HOISTING IN DECLARTIONS AND FUNCTION EXPRESSIONS:
1. In functio  expressions, the expression is evaluated when the engine reaches that specific
line of code, whereas in function declarations, the declarations are created before the code runs.Therefoe,
unlike in function declarrations, hoisting does not occur in function expressions. */


/*
ARROW FUNCTIONS:
Let's dive right into **8.1.3 Arrow Functions**. If you have been doing backend 

development or using Python (which has lambda functions), you'll appreciate what ES6 brought 
to JavaScript here.

Arrow functions are a radically compact way to write function expressions. They drop the 
`function` keyword entirely and use a mathematical "arrow" (`=>`) to separate the parameters
 from the function body. Because arrow functions are always expressions, they never have a 
 declared name.

The textbook outlines several variations of the syntax, depending on how simple or complex
 your function is. Let's break them down.

### 1. The General Form

At its most basic, an arrow function looks like a standard function expression, just with an 
arrow instead of the `function` keyword.

**The Code:**

```javascript
A comma-separated list of parameters, the arrow, and a curly-brace body.
const sum = (x, y) => { return x + y;}; 
console.log(sum(5, 10)); // Output: 15

```

### 2. The Concise Body (Implicit Return)

If your function body is nothing but a single `return` statement, you can drop the curly 
braces `{}` and the `return` keyword entirely. The function will evaluate the expression and 
automatically return its value.

**The Code:**

```javascript
// Extremely compact and highly readable.
const sum = (x, y) => x + y;

console.log(sum(5, 10)); // Output: 15

```

### 3. The Single Parameter Shorthand

If your arrow function takes *exactly one* parameter, you can even drop the parentheses 
around the parameter list.

**The Code:**

```javascript
// No parentheses around 'x'. 
const polynomial = x => x*x + 2*x + 3; 

console.log(polynomial(2)); // Output: 11

```

(Note: If your function takes absolutely zero parameters, you MUST include an empty pair of 
parentheses, like `const constantFunc = () => 42;`.)

---

### The Two Major Syntax "Gotchas"

The textbook points out two specific syntax traps that catch almost every JavaScript developer
 at some point:

**Gotcha #1: No Newlines Before the Arrow**
You absolutely cannot put a line break between the function parameters and the `=>` arrow. If 
you do, JavaScript might evaluate the parameter list as a standalone assignment statement, 
breaking your code.

**Gotcha #2: Returning Object Literals**
If you are using the concise body syntax (no `return` keyword) to return an object, you run
 into a syntactic collision. JavaScript sees curly braces `{}` and assumes they are the start of a
  function block, not an object literal.
To fix this, you must wrap the object literal in parentheses.

**The Code:**

```javascript
[cite_start]// GOOD: Wrapped in parentheses, so JS knows it's an object being returned. [cite: 112]
[cite_start]const g = x => ({ value: x }); [cite: 116, 117]

// BAD: JS thinks this is a block of code containing a labeled statement. [cite_start]It 
// returns undefined. [cite: 119, 120, 124, 126]
[cite_start]const h = x => { value: x }; [cite: 119]

[cite_start]// FATAL: This causes an outright syntax error. [cite: 122, 123, 126]
[cite_start]// const i = x => { v: x, w: x }; [cite: 122]

```

---

### The Ideal Use Case: Array Callbacks

Because of their brevity, arrow functions are the absolute gold standard for passing 
inline callbacks to array methods like `.map()`, `.filter()`, and `.reduce()`.

**The Code:**

```javascript
[cite_start]// Make a copy of an array with null elements removed. [cite: 128]
let filtered = [1, null, 2, 3].filter(x => x !== null); [cite_start]// filtered == [1,2,3]
//  [cite: 129]

[cite_start]// Square some numbers: [cite: 130]
let squares = [1, 2, 3, 4].map(x => x*x); [cite_start]// squares == [1,4,9,16] [cite: 131]

```

---

### The Architectural Difference: Lexical `this`

The textbook ends this section by highlighting a massive architectural difference between arrow 

functions and traditional functions.

Traditional functions define their own `this` context depending on *how* they are invoked. 
Arrow functions do not. They **inherit** the value of the `this` keyword from the exact 
environment in which they are defined. This solves a huge historical headache in JavaScript 
regarding object methods losing their context, which the book dives into deeply later in the chapter.

Additionally, arrow functions do not have a `prototype` property, meaning they can never 
be used as constructor functions to instantiate new classes (you can't call `new ArrowFunction()`).


This is arguably the most important feature of arrow functions, and you are right to ask for a deeper dive. In JavaScript, the `this` keyword 
is notoriously one of the most confusing concepts because it behaves differently than in almost any other programming language.

To understand what arrow functions fix, we first have to understand how traditional functions break.

### The Problem: Traditional Functions and the `this` Keyword

When you use the `function` keyword, the function defines its *own* `this` value based entirely on **how the function is invoked** .

* If you invoke a function as a method (`myObject.myMethod()`), `this` refers to `myObject` .
* However, if you invoke a nested function purely as a standalone function, its `this` value will be either the global object (in non-strict mode) or 
`undefined` (in strict mode) .

This leads to a massive headache when you write a function *inside* a method (a nested function) and expect it to remember the object 
it belongs to . It doesn't. The `this` keyword is not scoped the way standard variables are; 
nested functions do not inherit the `this` value of their containing function .

**The Code: The Traditional "Gotcha"**

```javascript
let o = {                  // An object o.
    m: function() {        // Method m of the object.
        let self = this;   // We save the "this" value in a variable as a workaround.
        
        console.log(this === o); // => true: "this" is the object o.
        
        f();               // Now call the nested helper function f().

        function f() {     // A nested function f
            console.log(this === o); // => false: "this" is global or undefined
            console.log(self === o); // => true: self is the outer "this" value.
        }
    }
};

o.m(); // Invoke the method m on the object o.

```

*Note: Before ES6, developers constantly had to write `let self = this;` (or `let that = this;`) just so their inner
 functions could access the outer object . It was widely considered a flaw in the language .*

---

### The Solution: Lexical `this` in Arrow Functions

Arrow functions fix this completely. Arrow functions differ from functions defined in other ways in one critical way: 
they inherit the value of the `this` keyword from the environment in which they are defined . 
They do not define their own invocation context .

This is called **lexical scoping** for `this`. When the JavaScript interpreter sees an arrow function using `this`, 
it doesn't try to figure out how the function was called. It simply looks "up" to the surrounding block of code and grabs 
the `this` value from there.

**The Code: The Arrow Function Fix**

```javascript
let o = {
    m: function() {
        // We replace the traditional nested function with an arrow function.
        // Arrow functions don't create their own 'this', they inherit it!
        const f = () => {
            console.log(this === o); // => true! It inherited 'this' from method m.
        };
        
        f();
    }
};

o.m(); 

```

*Because the arrow function `f` was created inside method `m`, and method `m`'s `this` context is the object `o`, 
the arrow function perfectly inherits that exact same context .*

---

### Why This Matters in Practice

This behavior makes arrow functions absolutely ideal for things like array methods 
(`.map()`, `.filter()`) or asynchronous callbacks (like `setTimeout`) where you pass a 
function to be executed later, but you desperately need that function to remember the object 
it was originally attached to.

*/







/*
THE THIS VALUE IN FUNCTIONS:
in functions you rarely need the this value. 
If it is a standalone function then: 
1. In strict mode, this -> undefined.
2. In non-strict mode, this ->globalObject
*/



/*
CONDITIONAL INVOCATON:

function?.()
Basically a shorthand for :
(safely_call_Me != null && safely_call_Me != undefined)?  safely_call_Me("ARGUMENT") : undefined*/

function safely_call_Me(arg) {
    console.log(`Safely called with argument : ${arg}`);
}

safely_call_Me?.("ARGUMENT");




//METHOD INVOCATION:

let object = {
    greetings: function () { console.log("greetings"); },
    _a: 1,
    b: 2,
    user: "Me",
    // safely_call_Me : safely_call_Me(), This gives an error when called (object.safely_call_Me())
    // because by adding paranthesis to  safely_call_Me : safely_call_Me(), i tell js to immediately 
    // execute the function and save its return value. Since my function does not explicitly return anything
    // it implicitly returns undefined. Therefore  safely_call_Me : safely_call_Me() simplifies into
    //  safely_call_Me : undefined; leading to the error : 
    //TypeError: object.safely_call_Me is not a function
    safely_call_Me: safely_call_Me, //assigns the functions object. 
    add: function (x) {
        x = x + this.a;
        console.log(x);
        return this;  //within the method, this refers to the object that invoked the method.

    },
    sub: function (y) {
        y = y - this.b;
        console.log(y);
        return this;
    },
    nested: function () {
        console.log(`Parent method. this keyword refers to : ${this}`);
        nested_func();
        function nested_func() {
            console.log(`Nested method. this keyword refers to : ${this}`);
        }
    },
    solve_nested: function () {
        let self = this; //store this in a variable. Because nested function can access the variables of 
        // the parent function, it can access self, and thus the object.
        function inner() {
            console.log(self.a);
        }

        const f = () => {
            console.log(`Arrow functions inherit this from their environment ${this}`);
        }

        f();

    },
    get a() { return this._a; },
    set a(x) {
        // this.a = x; 
        /*
        the above line causes the stack overflow error. Why??
        because this.a = x recursively calls the setter again, and keeps calling it until the stack
        literally overflows and the program crashes.
        Solution (According to Gemini):
        Use a backing variable:
        1. Add an underscore to a : _a
        2. From the outside you assign "a" a value. Since a is 1-1 mapped to this setter, set a(x) is
        called eiter implicitly or explicitly, where it assigns _a the value, thus bypassing the infinite
        recursion trap. 
        The below discussion is due to this error:
        function arg(a,b){
        console.log(`${this.a} ${a } ${b}`);
        }

        arg.call(object, 1, 2);
        arg.apply(object, [1,2]);

        this.a was printing undefined. 
        1. The Overwrite
        JavaScript does not allow an object to have both a normal data property and a setter/getter 
        with the exact same name. When the engine reaches line 36, it says: "Oh, they want a to be a setter method. 
        I will delete the a: 1 data property they made on line 3 and replace it with this new setter." Because it just 
        redefined the architecture of the property rather than assigning a value to it, the number 1 is completely erased from memory.

        2. The Missing Getter (The "Write-Only" Trap)
        Because the a: 1 property was destroyed and replaced by set a(x), the property a is now exclusively an accessor property.

        However, you only gave it a set method. You didn't give it a get method.

        In JavaScript, if an object has a setter but no getter, that property becomes write-only. 
        You can push data into it (object.a = 5), but if you ever try to read data out of it (console.log(this.a)), 
        JavaScript doesn't know how to fetch it. By default, a missing getter always returns undefined.*/
        this._a = x;
        console.log("Setter invoked implictly. What if it silently changed something else as well? ");
    },
    toString: function() {
        return `${this.user}`;
    },
};

object.greetings();
object.safely_call_Me(null);
object.add(10).sub(10); //method chaining



/*this keyword in nested methods 
One major flaw in js is that the nested function within a method does not inherit the value of
this from the parent function. Therefore instead of this being refered to the object in the nested 
function, it defaults to global object (in non-strict mode). */

object.nested();
/*Parent method. this keyword refers to : [object Object]
Nested method. this keyword refers to : [object global] */



/*UNDERSTANDING CONSTRUCTOR INVOCATION: 
1. When you invoke a function with a new keyword, js does not execute it like  a normal function.
2. Js intercepts the function execution, creates a new object, makes it the invocation context, and links that object’s internal 
[[Prototype]] to the constructor’s .prototype object.. Since the invocation context is the 
new object, you can use this to add new properties to it in the constructor.

RETURN VALUE OF A CONSTRUCTOR:
1. If you explicitly return a primitive in a constructor, js will simply ignore it and return 
the newly created object instead.
2. If you return another object, then that object completely overrides the process and 
becomes the value of the invocation expression. The newly constructed this object is thrown away.
*/


function Point(x, y) {
    this.x = x;
    this.y = y;
    //adds greetings function from Point.prototype.
}

Point.prototype.greetings = function () {
    console.log("Greetings fellow men")
} //functions are also objects.
/*
WHat is the use case? Imagine if I need to amke a 1000 Point objects. Instead of assigning each object
a greetings method() separately, i assign it to the prototype obkject, which is then inherited by all the 
Point  objects. Thus 1 method for 1000 objects. */
const obj = new Point(1, 2); // returns the new this object. The object is of the data type Point. 
//we have created our own datatype. 
console.log(obj);
obj.greetings();
console.log(Point.prototype);


function return_Primitive_Constructor() {
    this.x = "The primitive will be ignored and the new object will be returned"
    return "Emo primitive";
}

const o = new return_Primitive_Constructor();
console.log(o);

function return_Another_Object_Constructor() {
    this.x = "I will be discarded.";
    return { hijacked: "I hijacked the process" };
}

const o1 = new return_Another_Object_Constructor();
console.log(o1);


//IMPLICIT INVOCATION OF FUNCTIONS:

/*
Functions can be implicitly invoked and can cause unexpected behaviour. */

//Implicit invocation of the setter/getter function. 
/*If an object property has a setter function defined, then whenever you assign that property a value,
the setter function is implicitly called. */

object.a = 2;


/*When you concatenate an object with a string or add/sub/mul/divide it with a number, js implicitly
calls the toString() and valueOf() methods. */

console.log("Currently logged in as : " + object); //toStrnig implicitly called.



/*FUNCTION ARGUMETNS AND PARAMETERS:
Javascript is weird:
1. Does not check the data types of the argument passed. The parameters dont have any data types so it
doesnt have any thing to check against. 
2. Does not check that whether the number of arguments matches the number of parameters. If the arguments 
are less than the parameters, the remaining parameters are implicitly set to undefined, whereas
if the arguments are more than the parameters, then the extra arguments are simply ignored. */


function unmatching_Args(arg1, arg2, arg3 = "default parameter", ) {
    console.log(`arg1 = ${arg1} arg2 = ${arg2}`);
}

unmatching_Args(1); //arg1 = 1 arg2 = undefined
unmatching_Args(1,2,3); //arg1 = 1 arg2 = 2


/*
JS parameters are resolved at run time, so we can assign a parameter, the value of its 
preceding parameters. */

function foo(width, height = width) {
    console.log(`Width: ${width} Height : ${height}`);
}

foo(10); //Width: 10 Height : 10



/*UNDERSTANDING REST ARGUMENTS:
1. It can scoop up multiple arguments in one parameter.
2. That parameter is converted into a js array..
3. Used when you are unsure of teh number of arguments to pass */


function restFunction(arg1, arg2,...rest) {
    console.log(`arg1 : ${arg1}, arg2 : ${arg2} ${rest}`);
    console.log(Array.isArray(rest)); //returns true
}

restFunction(1,2,3, "Be safe", "I'll be so safe");

function sumAll(...numbers) {
    let sum = 0;
    for (let num of numbers) {
        sum+=num;
    }
    console.log(sum);
}

sumAll(1,2,3,4);

/*IMPORTANT NOTE: 
The rest parameter must be the last parameter in the function. Otherwise you get a syntax error. */




/*UNDERSTANDING THE SPREAD OPERATOR FOR FUNCTION CALLS:
spreads the array in a function argument */
const arr = [1,2,3];
doSomething(...arr, ...arr);
function doSomething(arg1, arg2, arg3, arg4) {
    console.log(`${arg1} ${arg2} ${arg3} ${arg4}` );
}



//DESTRUCTERING OBJECTS AND ARRAYS IN FUNCTION PARAMETERS

/*
More than often, you will find that you are passing large objects as function arguments: 
Option 1: Pass each argument separately: */

function startServer(port, host, protocol, isSecure) {
    console.log("option 1 is too crude, especially for large objects.");
}


let base_config = {port : 8080, host : "localhost"};
let advanced_config = {protocol : "HTTP", isSecure : true};
startServer(base_config.port, base_config.host, advanced_config.protocol, advanced_config.isSecure);

/*
Option 2: 
destructure the object in the argument.
If the function parameter uses object destructuring,
JavaScript extracts matching property names from the object.
Extra properties are ignored.
Order does not matter.
*/
// function startServer({
//     port = 3000,
//     host = "localhost",
//     protocol = "HTTP",
//     isSecure = false
// } = {}) {
//     console.log(`Starting server on ${protocol}://${host}:${port}`);
//     console.log(`Secure: ${isSecure}`);
// }

// let base_config = {
//     port: 8080,
//     host: "localhost"
// };

// let advanced_config = {
//     protocol: "HTTP",
//     isSecure: true
// };

// let config = {
//     ...base_config,
//     ...advanced_config
// };

// startServer(config);

function func(x,y) {
    console.log(`${x} , ${y}`);
}

func(object); // Me , undefined. 
/*js was unable to find a property named x and y in object. THerefore no destructuring happened.
me is printed becuase here x = object, and since we are converting the object to string, we implicitly
call toString() method, which prints Me. */


/*You can also destructure arrays. The only difference is that in arrays, order is followed. Arguments 
are mapped to parameters index-wise. */



//UNDERSTANDING FUNCTIONS AS VALUES:

/*
Functions are not just block of codes, they are first-class objects(functions are treated like normal
 values. You can store them, pass them around, return them from other functions, and attach 
 properties to them.). They are just a value, and can be treated like primitives, or objects:
1. You can assign a function to variable
2. You can assign it to an object propery
3. You can pass it as a function argument
4. You can define it as an object's method
5. You can write a function in an array index */


function square(x) {
    return x*x;
}

//function obj is assigned to square variable.
s = square //now it is also assigned to s.

console.log(square(2)); //4
console.log(s(3)); //9

object.square = square
console.log(object.square(4)); //4

arr.sort((x,y)=> y-x)
console.log(arr)  //3,2,1

arr[3] = square

console.log(arr[3](2));



//DEFINING YOUR OWN FUNCTION PROPERTIES:
/*Since functions are objects, you can define your own customized function properties!! Only for $4.99! */
returnUniqueInteger.count = 0; // creating a function property. A static variable that can persist trhough multiple function invocations 

function returnUniqueInteger(){
    return returnUniqueInteger.count++;
}
console.log(returnUniqueInteger()); //0 
console.log(returnUniqueInteger()); //1


//Treating a function as an array(not really an array, it is technically an object!):
factorial[1] = 1; //base case. Treating factorial like a cache "array"!
function factorial(n) {
    if (Number.isInteger(n) && n > 0) {
        if (!factorial[n]) {
            factorial[n] = n * factorial(n-1);
        }
        return factorial[n];
    }
    return NaN;
}

console.log(factorial(5));
console.log(`${factorial[4]} ${factorial[3]} ${factorial[2]}`); //cached

//FUNCTION PROPERTIES:

/*Since functions are objects, they have properties! Surprise!! */

/*Length Property: 
Basically returns the number of arguments the function expects. 
Rest parameters are not counted for some reason.  */

function check_Par_Length(a, b, c, ...rest) {
    console.log(check_Par_Length.length); //returns 3. rest is not counted.
    console.log(`rest = ${rest}  a =  ${a} b = ${b} c = ${c}`);
}
check_Par_Length([1,2,3,4,5,6], 1,2,3,4,5);
/*Name property: 
name of the variable the function was assigned to while being created. Or the name of the variable an anonymous functoin was assigned to */
console.log(check_Par_Length.name);
console.log(object.toString.name);
const c = check_Par_Length;
console.log(c.name);


/*call and apply methods 
You can use call and apply methods to call a function from an object to which the function does not belong to, effectively making 
the object through which the function is called, the invocation context.*/

function f()  {
    console.log(typeof this);
}

f.call("obj");
f.apply(obj); //in both cases obj becomes the invocation context :[object Object]
/*There is an edge case to this:
 We already know that arrow function inherits the invocation context from its environment (where it is defined), and this behavior can't
 be overriden using call, or apply. The attempt to override the invocation context is simply ignored */
const v = () => {console.log(`${this}`)};
v.call("obj");
v.apply(obj);
f(); //[object global]
v();


/*PASSING ARGUMENTS IN CALL AND APPLY METHODS:
call()-> Every thing after the invocation context is part of the argument that the function expects.
apply()-> Same but the arguments come in an array. 
The arrow function does not ignore these arguments */

function arg(a,b){
    console.log(`${this.a} ${a } ${b}`);
}

arg.call(object, 1, 2);
arg.apply(object, [1,2]);
 

/*Understanding the bind() method:
binds a function to an object. The object is permanently set as the invocation context.
bind() is used to create a new function with a fixed this value and optionally fixed starting arguments.
1 You invoke bind on a function. 
2. It returns a new function 
3. Invoking the new function invokes the original function as a method of the object that the function has been bound to.
4. bind() does not override the inheritted this context of arrow functions. */

function foo1() {
    console.log(`${this.a}`);


}

let r = foo1.bind(object);
r();

/*Currying or Partial application:
Any argument passed after the binding object is also bound to the function. This also applies to the arrow functions  */

let sum = (x,y) => { return x + y; }
let succ = sum.bind(null, 1) //x is permanently set as 1.
/*Assigning null as the invocation context:
Devs do this when they dont care about the invocation contet, and want to make use of the partial application feature.
what is the invocation context then? 
in arrow functions, it doesnt matter, the invocation context cant be changed by bind.
In non-arrow functions, in strict mode, it stays null, whereas in non-strict mode, it becomes the global object. */
console.log(succ(2));  // 2 us assigned to y.
console.log(succ.name); //the name property is also changed. the "bound" prefix is added to the  name of the function on which bind() was called upon.
console.log(succ.toString()); //function () { [native code] } JavaScript does not show you the actual source code of the bound 
// wrapper function.

// console.log(arg.prototype);
// let ad = new arg();
// console.log(typeof(ad));