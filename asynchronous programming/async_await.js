/*UNDERSTANDING ASYNC AND AWAIT */
/*
-> The await keyword is permitted inside async fuctions only, in CommonJS.
->async and await are used to  avoid explicitly writing promise chains
An example:  */

// function normalFunction() {
//     return new Promise((resolve )=>{
//         setTimeout(()=>{resolve("resolved");}, 2000);
//     });
// }
// async function asyncFunction() {
//     console.log("Beginning async function")
//     response = await normalFunction();
//     console.log("independent synchronous statement (runs after normalFunction resolves into a value");
//     console.log(response);
    
// }

// asyncFunction();

/*
-> Use of async and await allows the programmer to catch both asyncrhonous and syncrhonous errors using the catch block: */

// rejected_promise = Promise.reject((new Error("Rejected")));
// async function asyncfoo2() {
//     try {
//         await rejected_promise;
//     }
//     catch(error) { 
//         console.log(error);
//     }
// }
// asyncfoo2();

/*If there is an uncaught error in the async function, the object returned by it is rejected with that uncaught exception */
/*Async function declaration returns an AsyncFunction object.
-> Each time it is called, it returns a NEW promise object.
-> This promise object either       
                -> Resolves into a value.
                -> Rejects with an uncaught exception in the async function  */

// async function asyncfoo3() {
//     await Promise.reject(new Error("Catch meeee"));
// }
// asyncfoo3().catch((err)=> {
//     console.log(err);
// })
// function foo() {
//     return Promise.resolve(1).then(response=> undefined); //immediately returns a promise object
// }

// console.log(foo()) //Promise { <pending> }

// async function asyncfoo() {
//     await 1;
// }

// console.log(`await also returns: ${asyncfoo()}`); //await also returns: [object Promise]


/*RETURN VALUE OF ASYNC FUNCTIONS:
=> Async functions always return a promise. 
=> if the return value of an async function is not explicitly a promise, then it is implicitly wrapped in a promise. */

// async function asyncfoo4() {
//     return;
// }

// return_value= asyncfoo4();
// console.log(return_value); //Promise { undefined }

// async function asyncfoo5() {
//     return 1;
// }
// return_value = asyncfoo5();
// console.log(return_value); //Promise { 1 }


/*UNDERSTANDING THENABLE OBJECTS */
/*
 */


// async function example() {
//     console.log("A");
//     const value = await 42; //synchronous expressoin
//     console.log("B");
// }

// console.log("Before");
// example();
// console.log("After");

// Before
// A
// After
// B

/*Flow:

await expression
      ↓
Evaluate expression synchronously
      ↓
Convert/adopt result like Promise.resolve(result)
      ↓
Pause the surrounding async function
      ↓
Return control to its caller
      ↓
Wait for the Promise to settle
      ↓
Resume the async function in a microtask
      ↓
Fulfilled → await produces the fulfillment value
Rejected  → await throws the rejection reason */


// async function foo(name) {
//     console.log("first ", name);
//     await console.log("middle ",name)
//     console.log("end ", name);
// }

// foo("first");
// foo("second");
// /*All of the instructions below are synchronous, and must be done in one "tick". After this "tick" is completed, only then will js 
// return to the queued microtasks, I/O, timers etc.*/
// console.log("gay sex"); 
// (() => {
//     for(let i =0; i <= 10; i++) {
//         console.log(i);
//     }
// })();
// //the function below is also synchronous. just be writing async does not automatically make a function asynchronous, it just guarantees that the function will return a promise.
// (async function() {
//     for(let i =11; i <= 20; i++) {
//         console.log(i);
//     }
// })();



/*Understanding queueMicroTask() 
-> QueueMicroTask is used to queue a microtask!!
-> The order of execution of microtasks is based on the order of scheduling. 
*/

let i= 0;
queueMicrotask(function test() {
    i++;
    console.log("microtask ", i);
    if (i < 3) {
        queueMicrotask(test);
    }
});


(async () =>{
   console.log("async function starting..");
   for (let i = 0; i < 3; i++) {
    await null;
    console.log("async function resume", i);
   } 
   await null;
   console.log("async function end..");
})()

queueMicrotask(()=> {
    console.log("QueueMicroTask after after calling async function");
})

console.log("script sync part ending..");
/*
-> test is queued.
-> async function staritng..
-> encounter await
-> queue micro task
-> script sync part is ending.
->microtask 1
-> test is queued once more.
->async function resume 0
-> await encoutnered.
->*/