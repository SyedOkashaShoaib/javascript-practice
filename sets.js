/*
Sets are just like arrays, but:
1. Sets are unindexed. 
2. Sets don't allow duplicates. 

*/

/*Creating and Initialzing a set:
 */

let s = new Set();
let a = new Set([1, 2, s]);  // the argument can be any iterable. 
console.log(a);

let unique = new Set("MISSISSIPI"); // the set will unpack the string, and remove the duplicates
console.log(unique); //Set(4) { 'M', 'I', 'S', 'P' }


/*the size property is the set equivalent of array.length() */

/*ADDING, AND DELETING */

let b = new Set();
console.log(b.size); //0 
b.add(1);
console.log(b.size); // 1
b.add(true);
console.log(b.size); // 2

b.add([1, 23]);
console.log(b.size);//3 -> the array was added, not 1, 23 individually. 

b.delete(1);
console.log(b.size); // 2

b.delete("test") // returns false as there is no test 
console.log(b.size); //2

b.add([1, 2, 3]);
console.log(b.size); //3

b.delete([1, 2, 3]); //returns false. Why? due to strict equality checking, objects are compared using their memory locations. 
console.log(b.size);  //3

/*Add returns the set object on which it was invoked. Therefore we can use chaining with add:  */

b.add(5).add(6);
console.log(b.size); //5



/*PRIMARY USE CASE OF SETS: MEMBERSHIP TESTING:
the has method of sets is highly optimized. And can be used for scanning  a large set.

Real-World Scenario: If you are building an API gateway and need to check if an incoming 
JSON Web Token (JWT) exists in a blacklist of 500,000 revoked tokens, storing that blacklist
in an Array will stall your server on every request. Storing it in a Set allows the check to 
happen almost instantly.*/

let oneDigitPrimes = new Set([2, 3, 5, 7,]);

console.log(oneDigitPrimes.has(1));
console.log(oneDigitPrimes.has(2));


/*Sets are iterable:  */
let sum = 0;
for (let digit of oneDigitPrimes) {
    sum += digit;
}
console.log(sum);

/*Sets can be converted into an array using the spread operator */

let oneDigitPrimesArray = [...oneDigitPrimes];
console.log(oneDigitPrimesArray);


/*
IN JavaScript, the insertion order of elements in a set is preserved. */

/*For each method of sets: */

product = 1;

oneDigitPrimes.forEach(n => { product *= n; });

console.log(product); //210