/*
1. ONE TIME EXECUTION: 
-> If we want a function to execute after a specific interval only once, we use setTimeout. 
THINGS TO KEEP IN MIND: 
setTimeout is obviosuly non-blocking because what would be the point otherwise.
Parameters to pass: 
1. Function reference 
2. Delay in milliseconds
3. any argument added after the delay arg, is passed to the function. 

IMPORTANT THING TO REMEMBER:
Yes, your mental model is correct, but your terminology needs to be sharpened to reflect how the engine actually works.

In JavaScript, what you called the "execution pipeline" is divided into two distinct components: the **Call Stack** (where code actively runs) and the **Callback Queue** (where asynchronous tasks wait to be executed).

When you set a timer for 5000ms, the 5000ms duration is spent entirely inside Node's background timer thread. The absolute millisecond that timer expires, Node pushes your callback function into the **Callback Queue**.

If there are already 5 functions sitting ahead of it in that queue, your function cannot move. It must wait for those 5 functions to be pulled into the Call Stack and executed one by one.

To understand exactly how this delay occurs and how it can degrade backend performance, you must understand the exact rules the **Event Loop** follows when clearing this pipeline.

### The Strict Rules of the Event Loop

The Event Loop acts as a continuous loop that coordinates the Call Stack and the Callback Queue. It operates under a single, inflexible rule: **It will never look at or clear the Callback Queue until the Call Stack is completely empty.**

There are two scenarios where your 5000ms timer will experience significant execution delay because it is forced to wait its turn.

#### Scenario A: The 5 functions are currently blocking the Call Stack

If your server is currently executing a heavy, synchronous operation (like a loop processing 5 massive JSON files), the Call Stack is occupied. Even if your 5000ms timer expires and jumps to the front of the Callback Queue, it cannot execute. It will sit in the queue waiting until the main thread completely finishes processing those files.

#### Scenario B: The 5 functions are ahead of it in the Callback Queue

If 5 other asynchronous operations (like 5 incoming database responses or other timers) finished a fraction of a millisecond *before* your timer expired, they populate the Callback Queue first. Because the queue is a strict **FIFO (First-In, First-Out)** data structure, the engine must execute those 5 callbacks completely before your timer callback is allowed to touch the Call Stack.

### The Hidden Trap: Microtasks vs. Macrotasks

To make matters more complex for backend design, JavaScript actually manages **two** different queues for asynchronous actions, and they have strict priority over each other.

1. **Macrotask Queue (or Task Queue):** This is where `setTimeout`, `setInterval`, and I/O operations (like reading a file or network socket) go.
2. **Microtask Queue:** This is where `Promise` callbacks (`.then()`, `.catch()`, and `await` continuations) go.

**The Priority Rule:** The Event Loop will completely empty the *entire* Microtask Queue before it executes even a *single* task from the Macrotask Queue.

If your 5000ms timer expires and enters the Macrotask Queue, but your server suddenly generates a flood of resolved Promises (Microtasks), the Event Loop will continually prioritize those Promises. Your timer will be starved of execution time and forced to wait until every single Promise callback is cleared.

---

To help you visualize exactly how these queues interact and see why a timer gets delayed when the system is busy, use the interactive simulator below. You can queue up synchronous tasks, promises, and timeouts, then step through the Event Loop to observe the exact mechanical execution order.
 */

// const { exit } = require('process');
// const { EventEmitter } = require('events');
// const database = new EventEmitter();

// const databasetimer = setTimeout(()=>{
//                         database.emit('connected', {'status' : 'connected', 'port' : 8500});
//                     }, 1000)

// const exittimer = setTimeout(()=>{
//                         console.error("System did not connect to the database in time. Exiting now.");
//                         process.exit(1);
//                     }, 5000);

// database.on('connected', (data)=>{
//             clearTimeout(exittimer);
//             console.log("Database connected succesfully!\n %o", data);
            
//         });

/*REPEATED EXECUTION:
If we want a function to repeat after an interval, we must use setinterval.  */

const {EventEmitter} = require('events');
const database = new EventEmitter();
let connected = false;
const databasetimer =  setTimeout(()=> {
        database.emit('connected', {'status' : 'connected', });
}, 1000);

const pingtimer = setInterval(()=>{
    console.log("Pinging database..");
    if (connected === true) {
        clearInterval(pingtimer);
        console.log('Pinged successfully');
    }
}, 100);

database.on('connected', (data)=> {
        connected = true;
    });