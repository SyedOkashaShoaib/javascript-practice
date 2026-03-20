/*UNDERSTANDING MODULES IN NODE JS:
1. Each file is treated as an independent module with a private namespace
2. Any variable, function, class, etc declared within a module is inaccessable to the 
outside modules, unless the module exports it , and the other module imports it.
3. You import using the require() function
4. You export by making your public API a property of the exports object, or by replacing the 
modules.export object entirely. */


/*UNDERSTANDING NODE EXPORTS
1. The exports object is pre-defined in every file.
There are several ways of exporting your Public APIS:
 1.  */

const sum = (x,y) => x + y; //sum is not exported. It remains a private helper function to mean -> Encapsulation.

exports.mean = (data) => data.reduce(sum) / data.length; //added to the exports object.

