const stats = require('./stats.js'); // Omitting .js is fine in CommonJS. 
const {Bitset} = require('./sets.js');
console.log(stats.mean())
bitset = new Bitset()

/*
Flow: 
Load stats.js
Execute stats.js (thats why we see the console.log statements in the terminal)
return module.export.
Node js also caches modules. For example, if stats.js was loaded twice, it would be retrieved from
cache for the second require statement (I think) */

// Importing Nodes built-in module: 
const fs = require('fs'); // we didnt use ./ to let Node know that fs is not a local file 


/*1. In Node, each file is its own module.
2. Top-level variables inside a Node module are private to that module.
3. `require()` imports another module.
4. `require()` returns whatever that module assigned to `module.exports`.
5. `exports.x = value` adds a property to the exported object.
6. `module.exports = value` replaces the exported value entirely.
7. Use `exports.x = ...` for multiple named exports.
8. Use `module.exports = ...` for one main exported value or final export object.
9. Do not use `exports = ...` to replace the export.
10. Local files need `./` or `../`; built-in and installed packages do not. */