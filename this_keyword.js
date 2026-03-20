//UNDERSTANDING THE this KEYWORD:
//COMMON MISCONCEPTIONS:
/*
1. this refers to the function itself -> wrong
2. This refers to the object the method belongs to. -> wrong

the "value" of this is determined at runtime.

*/

function classroom(teacher) {
    return function assignment() {
        console.log(`${teacher} says to study the topic : ${this.topic}`);
    }
}


assignment = classroom("Karen");
const obj = { 'topic' : 'Javascript', 'assignment' : assignment};
obj.assignment(); // this.topic refers to obj.topic
//another way: 
assignment.call(obj); // does the same thing.