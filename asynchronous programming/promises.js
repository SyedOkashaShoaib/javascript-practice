/* 
Flaws in using callbacks for asynchronous programming: 
Flaw 1:
-> You end up with a complex set of nested callbacks that make code readabiliity and debugging horribly difficult. 
Flaw 2: 
-> In asynchronous programming, if an asynchronous computation throws an exception, the function that called it, might
have already ended, therefore, there is nowehere for the exception to go.

*/

/*
What is a promise? 
-> A promise is an object that represents the result of an asynchronous computation. 
-> Instead of waiting for the asynchronous computation to finish, javascript reutrns a promise object. 
The promise object is a way of js saying that it owes us the result of an asynchronous computation. That result 
is guaranteed to exist at some point in the future. 
-> You cant look inside a promise object, you can only ask js to trigger a callback function when the computation's result
is returned. */

/*
Promises are for single computation only: 
-> Promises are strictly designed to represent the result of a single asynchronous computation. 
Keeping that in mind: 
1. You can use promises to execute  the logic of settimeout
2. You cant use promises to imitate the logic of setinterval, as it requires repeated computation.
 */


/*
Using promises: 

What is then? 
think of then like an addeventlistener method. 
fetch immediately returns a promise object, and we attach a then method to it, which is fired when the 
asynchronous computation returns its result. 
There are three strict rules regarding .then() that you must memorize for backend engineering:
1. Multiple Registrations: You can call .then() multiple times on the exact same Promise object, passing different functions. 
2. Single Invocation: Because a Promise represents a single computation, each function you register with
then() will be invoked strictly only once.  
3. Guaranteed Asynchrony: Even if the network request is already finished and the data is sitting in memory 
before you call .then(), the function you pass to it will always be invoked asynchronously. The JavaScript 
engine explicitly puts Promise callbacks into a separate microtask queue to guarantee execution order 
predictability. */

function getText(url) {
    fetch(url).then(data => console.log(data)).then(()=>console.log("Multipe thensssss"));
};


// getText('https://jsonplaceholder.typicode.com/todos/1');

/*Handling errors:  */

/*Method 1: 
.then actually accepts two arguments: one callback when the asynchronous computation succesfully returns
a result, and the other when the asynchronous computation fails to do so.
However, this is highly unidiomatic, and rarely used.  */

function getText2(url) {
    fetch(url).then(data => console.log(data), error => console.log("mama ima criminal",error));
}

// getText2('https://jsonplaceholder.typicode.com/todos/1');


/*Method 2: 
It is more appropriate to use a catch method: 

->If fetch throws an exception, or if then() throws an exception, it is safely caught by catch.
catch is simply then() with a null as the first argument, and the error handler as the second argument.*/


function getText3(url) {
    fetch(url).then(data=>console.log(data)).catch(error=>console.log("Catch errors: ", error));
}


// getText3('https://jsonplaceholder.typicode.com/todos/1');
// setTimeout(()=>console.log("Does it get here when catch() catches an error? "), 500);


/*
Chaining methods: 
->You can chain multiple thens!
-> Each .then returns a new promise object. That promise will not be fulfilled until the function that you have 
passed in the corresponding .then has finished executing. 


*/

function getText4(url) {
    fetch(url)
    .then(response => response.json()) // initially only the header is returned initially. response.json returns a promise object. That is why we can chain another then. 
    /*response.json waits for the stream, reads it, and runs json.parse() to it. since this is done asynchronously, 
    and takes time, it returns a promise object.  */
    .then(data => console.log(data))
    .catch(error=>console.log(error));
};
 getText4('https://jsonplaceholder.typicode.com/todos/1');

 /*
 1. On the first line, fetch() is invoked with a URL. It initiates
an HTTP GET request for that URL and returns a Promise.
We’ll call this HTTP request “task 1” and we’ll call the
Promise “promise 1”.
2. On the second line, we invoke the then() method of
promise 1, passing the callback1 function that we want to
be invoked when promise 1 is fulfilled. The then() method
stores our callback somewhere, then returns a new Promise.
We’ll call the new Promise returned at this step “promise 2”,
and we’ll say that “task 2” begins when callback1 is
invoked.
3. On the third line, we invoke the then() method of promise
2, passing the callback2 function we want invoked when
promise 2 is fulfilled. This then() method remembers our
callback and returns yet another Promise. We’ll say that “task
3” begins when callback2 is invoked. We can call this
latest Promise “promise 3”, but we don’t really need a name
for it because we won’t be using it at all.
4. The previous three steps all happen synchronously when the
expression is first executed. Now we have an asynchronous
pause while the HTTP request initiated in step 1 is sent out
across the internet.
5. Eventually, the HTTP response starts to arrive. The
asynchronous part of the fetch() call wraps the HTTP
status and headers in a Response object and fulfills promise 1
with that Response object as the value.
6. When promise 1 is fulfilled, its value (the Response object) is
passed to our callback1() function, and task 2 begins. The
job of this task, given a Response object as input, is to obtain
the response body as a JSON object.
7. Let’s assume that task 2 completes normally and is able to
parse the body of the HTTP response to produce a JSON
object. This JSON object is used to fulfill promise 2.
8. The value that fulfills promise 2 becomes the input to task 3
when it is passed to the callback2() function. This third
task now displays the data to the user in some unspecified
way. When task 3 is complete (assuming it completes
normally), then promise 3 will be fulfilled. But because we
never did anything with promise 3, nothing happens when that
Promise settles, and the chain of asynchronous computation
ends at this point.
 */