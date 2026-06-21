const sum = (x, y)=> x + y;
const square = (x)=> x*x; 
console.log("stats module")
export function mean() { "returns mean";}
export function stddev(){ 
                            let m = exports.mean(); //notice we don't use mean() directly here
                            "return stddev";}