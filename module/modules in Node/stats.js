/*
A JS script does not start empty. It starts with a bunch of pre-configured stuff. The stuff that 
we care about is: 
exports object
module.export 

1. MODULES OBJECT: 
 module = {
    //bunch of properties we dont care aout rn,
    exports = {} -> holds everything that will be exported when another module imports stats.js
}
    
2. EXPORTS OBJECT: 
points to module.exports. I dont know why there are two of these :(

exports ─────────────┐
                     ↓
module.exports ───→  {} both point to the same object 

Use exports.x = ... when adding properties.
Use module.exports = ... when replacing the entire exported value.
Do not use exports = ...  Becuase since exoprts simply points to module.exports, if we do this:
exports = something, then module.exports does not get updated, rather exports simply points to something 
else now. 
*/

/*
MODULES IN NODE 
In node, each file is an independent module with a private namespace.   */

const sum = (x, y)=> x + y;
const square = (x)=> x*x; 
console.log("stats module")
exports.mean = ()=> "returns mean";
exports.stddev = function(){ 
                            let m = exports.mean(); //notice we don't use mean() directly here
                            "return stddev";}



console.log("stats module ended")


/* ANOTHER CLEANER STYLE OF EXPORTING: 
1. Define public, private functions, classes objects first
2. Export the desired public functions, clases, objects, etc. 

// Define all the functions, public and private
const sum = (x, y) => x + y;
const square = x => x * x;

const mean = data => data.reduce(sum) / data.length;

const stddev = d => {
    let m = mean(d);
    return Math.sqrt(
        d.map(x => x - m)
         .map(square)
         .reduce(sum) / (d.length - 1)
    );
};

// Now export only the public ones
module.exports = { mean, stddev }; */