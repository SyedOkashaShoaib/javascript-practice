//UNDERSTANDING PROTOTYPES
//Prototype is a connection between two or more objects.
//It is the mechanism by which objects inherit properties in javascript.

const homework = { "topic" : "JS"};
//its default prototype linkage links it to the Object.prototype object; through this object, homework
//can access Object.prototype's methods like tostring() etc.

//When you access a property of an object, then js first checks in the object, then in the prototype
//of the object, then in the prototype of the prototype, until the end of the prototype chain, in which
//case it returns undefined.


//CREATING A PROTOTYPE:
let prototype_obj = Object.create(homework);
console.log(prototype_obj.topic);

prototype_obj.topic = 'MATHS';

console.log(prototype_obj.topic);
console.log(homework.topic); 