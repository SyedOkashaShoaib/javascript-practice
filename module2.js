// const modules = {}; [cite: 79]
// function require (moduleName) { return modules [moduleName]; } [cite: 80]

// modules ["sets.js"] = (function() { [cite: 81]
//   const exports = {}; [cite: 83]
//   // The contents of the sets.js file go here: [cite: 84]
//   exports.BitSet = class BitSet { }; [cite: 84]
//   return exports; [cite: 85]
// }()); [cite: 82]

// modules ["stats.js"] = (function() { [cite: 86]
//   const exports = {}; [cite: 86]
//   // The contents of the stats.js file go here: [cite: 87]
//   const sum = (x, y) => x + y; [cite: 88]
//   const square = x => x * x; [cite: 88]
//   exports.mean = function(data) { ... }; [cite: 88]
//   exports.stddev = function(data) { ... }; [cite: 88]
//   return exports; [cite: 90]
// }()); [cite: 89]


const {mean} = require('./module_1.js');
let average = mean([1,2,3]);
console.log(average);