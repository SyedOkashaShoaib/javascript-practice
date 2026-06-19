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

*/ 