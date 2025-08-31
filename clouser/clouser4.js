// Write a function once(fn) that takes another function fn and returns a new function.
// The returned function should:

// Run fn only the first time it’s called.

// Return the same result on all later calls (without calling fn again).



function once(fn){
    let firstTime = false;
    let result = '';
    return function(a, b){
        if(!firstTime){
            firstTime = true;
            result = fn(a,b);
            return result;
        }else{
            return result;
        }

    }
}

let add = (a,b)=>{
    return a+b;
}

let result = once(add);
console.log("Result----", result(10, 20))
console.log("Result----", result(23, 34))
console.log("Result----", result(1,2))
console.log("Result----", result(22, 44))