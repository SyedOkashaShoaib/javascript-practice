/*
More or less the same concept as the one in CommonJS.
The primary difference is that CommonJs was added in NOde js, whereas ES modules were added
in JavaScript language itself.  */

/*MAIN DIFFERENCES: 
1. Difference between Scripts and Modules: 
In older JavaSCript, top-level declarations (a declaration that is made inside a file, or a module,
and not in a class, loop, function,..) may share the global namespace:
< script src="a.js"></script>
< script src="b.js"></script>
b.js might be able to access a.js' functions, variables, etc. 

Whereas in ES modules:
< script type='module' src="main.js"></script> //private namespace


2. Automatic Strict mode: 
Self explanatory.

3. The "this" Context at the top-level: 
In older JS, this might refer to the global object at the top-level, whereas in ES modules, it is 
undefined. 
*/
/*Since main.js wants config.js to simply load and be executed before main.js runs, it
does not explicitly import anything from config.js */
import "./config.js";
import Bitset from  "./stats.js";  //defualt export -> no curly braces, can name the imported value whatever
import { Circle, degreeToRadian as foo } from "./stats.js"; //named export-> Need to have curly braces, imported values name must match the exported value
import * as stat from './stats2.js'; 
/*stat is not a regular object, it is a namespace object that is only readable. You can't modify it. 
 */
console.log(stat.mean())

console.log(import.meta.url); // gives the absolute URL from where the module was loaded. 
/*In node js, it returns a path starting from file:..., in web browsers, the path starts from 
https:...
THe primary use case is to allow a module to reference resources relative to its own physical location.
*/

