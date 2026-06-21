export function degreeToRadian() {
    return 'degree to radian';
}

export class Circle {
    constructor() {

    }
}


//You can also do this:
/*
function degreeToRadian() {
}

class Circle {
    constructor(){
    }
}

export {degreeToRadian, Circle}; One must keep in mind that this is not an object, the curly braces
are simply a poart of the syntax.
 */
/*DEFAULT EXPORT:
Some modules only export onething, for this they can use the default export option. 
A module can bhave only one default export. 
While importing default export, you dont use curly braces.
You can make an anonymous function a default export as well. 
 */
export default class  {
    constructor () {

    }
}

/*Modules are "statically analyzable", i.e., ES6 javasctipt created a module dependency
graph before executing the code, and preloads the dependencies. This is the reason why 
exports and imports must be declared at the top-level, so that the modules remain "statically 
analzyable". 
This is allowed: 
export function foo() {}

But this is not allowed: 
function top_level() {
    export function inner() {
    }
}*/

