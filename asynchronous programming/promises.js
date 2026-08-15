// /* 
// Flaws in using callbacks for asynchronous programming: 
// Flaw 1:
// -> You end up with a complex set of nested callbacks that make code readabiliity and debugging horribly difficult. 
// Flaw 2: 
// -> In asynchronous programming, if an asynchronous computation throws an exception, the function that called it, might
// have already ended, therefore, there is nowehere for the exception to go.

// */

// /*
// What is a promise? 
// -> A promise is an object that represents the result of an asynchronous computation. 
// -> Instead of waiting for the asynchronous computation to finish, javascript reutrns a promise object. 
// The promise object is a way of js saying that it owes us the result of an asynchronous computation. That result 
// is guaranteed to exist at some point in the future. 
// -> You cant look inside a promise object, you can only ask js to trigger a callback function when the computation's result
// is returned. */

// /*
// Promises are for single computation only: 
// -> Promises are strictly designed to represent the result of a single asynchronous computation. 
// Keeping that in mind: 
// 1. You can use promises to execute  the logic of settimeout
// 2. You cant use promises to imitate the logic of setinterval, as it requires repeated computation.
//  */


// /*
// Using promises: 

// What is then? 
// think of then like an addeventlistener method. 
// fetch immediately returns a promise object, and we attach a then method to it, which is fired when the 
// asynchronous computation returns its result. 
// There are three strict rules regarding .then() that you must memorize for backend engineering:
// 1. Multiple Registrations: You can call .then() multiple times on the exact same Promise object, passing different functions. 
// 2. Single Invocation: Because a Promise represents a single computation, each function you register with
// then() will be invoked strictly only once.  
// 3. Guaranteed Asynchrony: Even if the network request is already finished and the data is sitting in memory 
// before you call .then(), the function you pass to it will always be invoked asynchronously. The JavaScript 
// engine explicitly puts Promise callbacks into a separate microtask queue to guarantee execution order 
// predictability. */

// // function getText(url) {
// //     fetch(url).then(data => console.log(data)).then(()=>console.log("Multipe thensssss"));
// // };

// promise = Promise.resolve("What does this do?");
// console.log(promise);
// promise.then ((data) => { console.log("Then function");})
// // getText('https://jsonplaceholder.typicode.com/todos/1');

// /*Handling errors:  */

// /*Method 1: 
// .then actually accepts two arguments: one callback when the asynchronous computation succesfully returns
// a result, and the other when the asynchronous computation fails to do so.
// However, this is highly unidiomatic, and rarely used.  */

// function getText2(url) {
//     fetch(url).then(data => console.log("data"), error => console.log("mama ima criminal",error));
// }

// getText2('https://jsonplaceholder.typicode.com/todos/1');


// /*Method 2: 
// It is more appropriate to use a catch method: 

// ->If fetch throws an exception, or if then() throws an exception, it is safely caught by catch.
// catch is simply then() with a null as the first argument, and the error handler as the second argument.*/


// function getText3(url) {
//     fetch(url).then(data=>console.log(data)).catch(error=>console.log("Catch errors: ", error));
// }


// getText3('https://jsonplaceholder.typicode.com/todos/1');
// setTimeout(()=>console.log("Does it get here when catch() catches an error? "), 500);


// /*
// Chaining methods: 
// ->You can chain multiple thens!
// -> Each .then returns a new promise object. That promise will not be fulfilled until the function that you have 
// passed in the corresponding .then has finished executing. 


// */

// function getText4(url) {
//     fetch(url)
//     .then((response )=> {
//         console.log("then(c1)", response);
//         return response.json();}) // initially only the header is returned initially. response.json returns a promise object. That is why we can chain another then. 
//     /*response.json waits for the stream, reads it, and runs json.parse() to it. since this is done asynchronously, 
//     and takes time, it returns a promise object.  */
//     .then((data) => console.log("then(c2):\n", data))
//     .catch(error=>console.log(error));
// };
//  getText4('https://jsonplaceholder.typicode.com/todos/1');

//  /*
//  1. On the first line, fetch() is invoked with a URL. It initiates
// an HTTP GET request for that URL and returns a Promise.
// We’ll call this HTTP request “task 1” and we’ll call the
// Promise “promise 1”.
// 2. On the second line, we invoke the then() method of
// promise 1, passing the callback1 function that we want to
// be invoked when promise 1 is fulfilled. The then() method
// stores our callback somewhere, then returns a new Promise.
// We’ll call the new Promise returned at this step “promise 2”,
// and we’ll say that “task 2” begins when callback1 is
// invoked.
// 3. On the third line, we invoke the then() method of promise
// 2, passing the callback2 function we want invoked when
// promise 2 is fulfilled. This then() method remembers our
// callback and returns yet another Promise. We’ll say that “task
// 3” begins when callback2 is invoked. We can call this
// latest Promise “promise 3”, but we don’t really need a name
// for it because we won’t be using it at all.
// 4. The previous three steps all happen synchronously when the
// expression is first executed. Now we have an asynchronous
// pause while the HTTP request initiated in step 1 is sent out
// across the internet.
// 5. Eventually, the HTTP response starts to arrive. The
// asynchronous part of the fetch() call wraps the HTTP
// status and headers in a Response object and fulfills promise 1
// with that Response object as the value.
// 6. When promise 1 is fulfilled, its value (the Response object) is
// passed to our callback1() function, and task 2 begins. The
// job of this task, given a Response object as input, is to obtain
// the response body as a JSON object.
// 7. Let’s assume that task 2 completes normally and is able to
// parse the body of the HTTP response to produce a JSON
// object. This JSON object is used to fulfill promise 2.
// 8. The value that fulfills promise 2 becomes the input to task 3
// when it is passed to the callback2() function. This third
// task now displays the data to the user in some unspecified
// way. When task 3 is complete (assuming it completes
// normally), then promise 3 will be fulfilled. But because we
// never did anything with promise 3, nothing happens when that
// Promise settles, and the chain of asynchronous computation
// ends at this point.
//  */
// /**
//  Important terms:
//  Pending → fetch(url) hasn't gotten a response yet.
// Fulfilled (commonly called "resolved") → response arrived, .then() runs.
// Rejected → network failure, .catch() runs.
// Settled → either of the above happened; the Promise isn't pending anymore.
//  */

// /*
// RESOLVING A PROMISE:
// ->Not the same as a promise being settled. 
// The engine evaluates fetch(url).then(callback1).then(callback2) synchronously and instantly.
// This means that the first .then mmust return a promise object to the second .then immediately. first then()
// returns p2 to then(c2). When fetch(url)'s promise is fulfilled, then(c1) is evaluated; rsponse.json() must wait 
// for all the incoming packets, therefore it must return a promise object -> p4.This means that p2 is now RESOLVED 
// into p4. Its fate is locked on that of p4; if p4 is fulfilled, p2 is fulfilled, and if p4 is rejected, p2 is as well.

// Because p2 is the structural link that the rest of the chain is waiting on, it acts as a proxy. It looks at p4 and 
// essentially says: "I will mimic whatever you do. If you fulfill, I will fulfill with your data. If you reject with
//  a syntax error, I will reject with your error." .
 
//  THEN WHY DOES THE SAME LOGIC NOT APPLY BETWEEN FETCH AND THEN(C1)? 
//  Because fetch() is not a part of Javascript promise architecture, it is a host api. When we call fetch we are 
//  calling a lwo level C++ function and therefore it behaves differently.  */


//  /*More on Promises and errors: 
//  Promise errors trickle down until they find a catch() invocation. 
//  Questions:
//  1. Does a promise chain only have one catch method? I know that theoretically you can have as many you want as 
//  catch is simply then() with the first argument set to null, but what is the industry standard?
 
//  We already know that error-handling must be done exceptionally well when it comes to asynchronous code, as in the 
//  case of synchronous code, you get a stack trace which can be used to trace the bug, however in asynchronous coede,
//  errors may occur silently and can be hard to trace.s*/


// /*UNDERSTANDING THE finally() method 
// 1. The finally method will be invoked regardless of whether the promise is rejected, or fulfilled. Finally() 
// is therefore invoked when the promise settles. 
// 2. The purpose of the finally method is cleanup (closing an open file). Since this cleanup is independent of the 
// fact whether the promise was fulfilled or rejected, finally() is not passed any arguments. 
// */
// console.log("Is finally() passed any arguments?")
// fetch('https://jsonplaceholder.typicode.com/todos/1').finally(data => {(data === undefined)? console.log("No finally() is not passed any arguements!"): console.log(data);}) 
//  /*Since finally is not passed any arguments, data evaluates to undefined, which then leads to the condition in
//  finally() being evaluated to true. */

//  /*Finally() also returns a promise object. But the promise object returned by finally() resolves or rejects with
//  the promise object on which finally was invoked on: */

// console.log("Checking what finally() returns!")
// fetch('https://jsonplaceholder.typicode.com/todos/1').then(data => 10 ).finally(() => 99).then((data)=>{console.log(data)}) //prints 10.
// fetch('https://jsonplaceholder.typicode.com/todos/1').then(data => {throw new Error("error!")} ).finally(() => 99).catch((error)=>{console.log(error)}) //prints error.
// /**Edge case: when finally itself throws an error, it overrides the return value of the promise object on which it
//  * was invoked upon:
//  */
// fetch('https://jsonplaceholder.typicode.com/todos/1').then(data => 10 ).finally(() => {throw new Error("Finally() is throwing an error!")}).catch((error)=>{console.log(error)}) //prints Finally() is throwing an error!.


/*PROMISES IN PARALLEL
Understanding Promise.all():
1. Allows you to wait for multiple promises to fulfill.
Understanding by example: */

// const url_array = ["https://example.com/a","https://example.com/b", "https://example.com/c"]

// promise_array = url_array.map(url=>fetch(url).then(response=> response.text())) // for every element in the array response.text returns a promise object which is saved in the new array pormise_array
// console.log(promise_array) //[ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]
// Promise.all(promise_array).then(response => console.log(response))  
/**
 Promise.all takes an array of promises as input and returns a new promise.
 if any of the promsies in the input array is rejected, the promise returned by Promise.all is also rejected. 
 The input array can contain non-promise values as well. if the input array contains a non-promise value, Promise.all
 returns it as it is, by treating it as a value returned by a fulfilled promise. 
 */


 /*
 UNDERSTANDING Promise.allSettled()
 Promise.allsettled also takes an array of promises as input, and returns a promise.
 The difference is that it never rejects that promise, unlike Promise.all(). 
 It waits for all the input promise objects to be setttled and then settles its returned prmoise.
 Each promise obejct has a status property, which can be either fulfilled or rejected. 
 If the status is rejected, then there will also be a value property, however, if the status is rejected, then there will be a reason property.*/

//  const new_promise_array = [Promise.resolve(42), Promise.reject( new Error("Pooping in pants"))]

//  Promise.allSettled(new_promise_array).then(response => {console.log(response)})
// //  [
//     { status: 'fulfilled', value: 42 },
//     { status: 'rejected', reason: 'Pooping in pants' }
//   ]

/*MAKING PROMISES FROM SCRATCH */

/*
Uptil now, we have been using fetch, which already returns a promise object.
If we want to create our own promise object, we can use the Promise() constructor. 
the Promise constructor is passed an executor function, which is then passed resolve, and reject functions (these are predefined by JS).
Javascript creates a new pending promise object, and synchronously calls the executor function.
The promise object is then returned, with its status depending on the executor function: 
    1. The executor function resolves synchronously -> resolved.
    2. The executor function rejects syncrhonously -> rejected
    3. The executor function completes its synchronous task, and an asynchronous computation (like setTimeout) is running -> pending   */

function wait(duration) {
    return new Promise((resolve, reject) => {
        if (duration < 0 ) {
            reject(new Error("Duration can not be a negative number."));
            return;
        }
        setTimeout(resolve(`A duration of ${duration} ms has passed.`), duration);
    })
}

const promise = wait(-2000);
promise.then(text => {console.log(text);});

/*
Why is it called promise.resolve, and not promise.fulfilled
    Scenario 1: 
        promise.resolve(42) -> In this case, the promise is fulfilled with he value of 42
        promise.resovle(anotherpromise) -> This promise is resolved into an another promise.
 */