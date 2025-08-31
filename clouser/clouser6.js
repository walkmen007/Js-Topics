// 👉 Question 5: Implement compose with Closures

// Suppose you have multiple functions that transform a value:

// function add5(x) { return x + 5; }
// function multiply3(x) { return x * 3; }
// function square(x) { return x * x; }
// You want to compose them so that:

// js
// Copy code
// const composedFn = compose(add5, multiply3, square);
// console.log(composedFn(2)); // ?
// ❓ Your Task
// Explain what output you expect and why (order of execution is important).

// Implement compose using closures so that it works for any number of functions.

let add5 = (x)=>{ return x + 5; }
let multiply3 = (x)=>{ return x * 3; }
let square = (x)=>{ return x * x; }


function composeFunction(...fn){
    return  (value)=>{
       return fn.reduce((acc, afn)=>afn(acc), value)
    }
    
}

let compose = composeFunction(add5, multiply3, square)

console.log("Compose", compose(5))



// Important Concept: 

// you actually wrote a pipe function instead of compose.

// Pipe function execute from right to left. 
// Where as compose function execute from left to right. 

// We can convert above function pipe function by just reversing reduce operation from bottom to top. 
// using : reduceRight



function composeFunction2(...fns) {
  return function (value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
  };
}

let compose2 = composeFunction2(add5, multiply3, square)
console.log("Compose---2", compose2(5)) //Output 80.