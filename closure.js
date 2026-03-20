//A closure is a fucntion that remembers the variables of its outside scope even after the outer function
//has finished executing.
// function outer() {
//     const name = "Bames Jond";
//     const obj = {"x" : 1, "y" : 2};
//     return function inner() {
//         console.log(name);
//         for (const [key,value] of Object.entries(obj)) {
//             console.log(key, value);
//         }
//     }
// }

// say_name = outer(); //say_name now stores the reference to inner()
// say_name(); //inner() still remembers the name variable, and obj object despite the execution of outer() being finished.


// //Using closures for data encapsulation:
// function counter() {
//     let counter = 0;
//     return {
//         increment : function() {
//             counter++;
//             return counter;
//         },
//         decrement : function() {
//             counter--;
//             return counter;
//         }
//     }
// }

// const counter1 = counter();
// console.log(counter1.increment());
// console.log(counter1.decrement());

var var1 = 10;
console.log(global.var1);


/*Understanding the lexical scope: 
functions are executed using the variable
scope that was in effect when they were defined, not the variable scope
that is in effect when they are invoked*/

let scope = "global scope"; // global variable
let a = 1;
// function checkScope() {
//     let scope = "local scope";
//     function inner() { console.log(`${scope} ${a}` ); } 
//     /*For scope -> local scope
//     Where inner() is defined, the scope variable is binded to "local scope", not "global scope" literal,
//     therefore, it prints "local scope". */
//     inner();
// }

// checkScope();

// function checkScope() {
//     let scope = "local scope";
//     function inner() {return scope; } 
//     return inner(); //invoke inner and return what it is returning 
// }

// console.log(checkScope());



function checkScope() {
    let scope = "local scope";
    function inner() { return scope; } 
    return inner; // we are now returning a reference to the function object.
}

let s = checkScope()();  //the extra paranthesis executes the returned function object. We could have also written s() in the next line.
console.log(s); //despit checkScope being executed, the binding between scope and "local scope" is still
//there for inner.

