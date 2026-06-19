/*
Main Purpose of modulation:
Each module exposes a public API, and hides the internal logic, helper functions etc..
*/

/*
USING CLOSURES TO IMPLEMENT MODULATION: 
This approach was used in older times, and has been replaced with new methods. 
 */

const stats = function() {
    const sum = (x , y) => x + y; //helper functions that shouldnt be accessible outside
    const square = (x) => x * x; 
    /*FUNCTIONS THAT ARE GOING TO BE EXPOSED TO OTHER MODULES */
    function mean(data) {
        return 'mean of data';
    }

    function stddev(data) {
        return 'stddev of data';
    }
    return {mean, stddev};
}();

console.log(stats.mean());

console.log(stats.stddev());

// stats.sum(); //TypeError: stats.sum is not a function -> sum is not accessible outside!!

