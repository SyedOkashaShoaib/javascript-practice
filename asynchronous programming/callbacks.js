//*JS is inherently single-threaded and synchronous. The asynchronous capabilities are provided by the 
// hosting environemnt.  */

// const { version } = require("react");


/*
CALLBACK: Simply a function that you can pass on as an argument to antoher function, which holds on to the passed
function, and executes it after a certain condition is fulfilled.  */

/*Asynchronous Programming using callbacks: */

/*Using timers. We have already looked at this */

/*USING EVENTS: 
In js, client side programming is mostly event-driven; the program initializes, registers eventhandlers against 
certain events, and then the program waits for those events to occur and triggers the corresponding event handlers.

*/ 
/*This code cant run in node environment. */
// function applyUpdate() {
    
// }
// let okay = document.querySelector('#confirmUpdateDialog button.okay'); 

// okay.addEventListener('click', applyUpdate);

/*USING NETWORK EVENTS
XML hattp requests are used in legacy systems. 
Also this code cant run in a node js environment. */


function getCurrentVersion(versionCallBack) 
/*Why pass versioncallBack as an argument? -> Separation of concerns. By decoupling getCurrentVersion,a nd the callback
we have made getCurrentVersion a generic function which can be reused elsewhere with a different callback. */
{
    let request = new XMLHttpRequest();
    /*XMLHttpRequest (XHR) objects are used to interact with servers. You can retrieve data from a URL 
    without having to do a full page refresh. This enables a Web page to update just part of a page without 
    disrupting what the user is doing. */
    request.open('GET', 'http://www.example.com/api/version');
    /*The XMLHttpRequest method open() initializes a newly-created request, or re-initializes an existing one. */
    request.send();
    /*Error-First callback convention: 
     Since the request recieving process is asynchronous, by the time the server responds, the execution of the
     function might have ended. Therefore the function uses callback functoins( here versionCallback is an example of
     callback functions), for error handling and payload logic. 
     In the callback functoin here, the first argument is for any potential errors faced. the second is for payload. */
    request.onload = function() {
        if(request.status === 200) {
            let getCurrentVersion = parseFloat(request.responseText);
            /*The read-only XMLHttpRequest property responseText returns the text received from a server 
            following a request being sent. */
            versionCallBack(null, getCurrentVersion);
        }
        else {
            versionCallBack(request.statusText, null);

        }

        request.onerror = request.ontimeout = (event_obj)=>{versionCallBack(event_obj.type, null);};
    }
}

function versionCallBack(error, payload) {
    if (error) {
        console.log("An error was returned with the following reason: ", error);
    }
    else {
        console.log("Payload:", payload);
    }
}



/*Callbacks and Events in Node:
Node is by design, asynchronous. 
This means practically every built-in API that touches the file system, the network, or a database is asynchronous and relies heavily on callbacks and events. 
 */
const { error } = require('console');
const fs = require('fs');

let content = { };

function readFile() {
    fs.readFile('random.json','utf-8', (error, text)=> {
        //Asynchronously reads the entire contents of a file.
        //Node’s fs.readFile() function takes a two-parameter callback as its last argument.
        if (error) {
            console.log("An error occured while reading the file.");
        }
        else {
            
            Object.assign(content, JSON.parse(text));
            onDone(content);
        }
    })
}
readFile();

function onDone(obj) {
     console.log(obj);
}



const https = require("https");

function getText(url, callback) {
    let request = https.get(url); //// Read the text content of the URL and asynchronously pass
//it to the callback.
    request.on('response', (response)=> {
        //response event means that the header has been recieved. 
        http_status = response.statusCode;

        //body of the http response has not been recieved yet. 
        // we register another handler for recieving the body.
        response.setEncoding('utf-8');
        let body = '';
        response.on('data',( data)=>{
            body += data;
        });

        response.on('end', ()=> {
            if(http_status === 200) {
                callback(null, body);
            }
            else {
                callback(http_status, null);
            }
        })
    })
}


function getText_callback(error, data) {
    if (error) {
        console.log("An error occured while fetching the URL.HTTP status code: ", error);
    } else {
        console.log(data);
    }
}

getText('https://jsonplaceholder.typicode.com/todos/1', getText_callback);