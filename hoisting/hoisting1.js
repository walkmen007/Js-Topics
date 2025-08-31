console.log(a);
console.log(b);
console.log(c);

var a = 1;
let b = 2;
const c = 3;

function c() {
    console.log("I am a function");
}

// Answer: 
// Your response is partially correct, but it misses a critical detail. Let's analyze the code step by step to determine the full output.

// Breakdown of Output
// console.log(a); will output undefined.

// Reasoning: The var a = 1; declaration is hoisted to the top of its scope. However, only the declaration is hoisted, not the initialization. So at this point, a exists but its value is undefined.

// console.log(b); will result in a ReferenceError.

// Reasoning: The let b = 2; declaration is hoisted, but it is not initialized and is placed in the Temporal Dead Zone (TDZ). You cannot access a let variable from the TDZ, and attempting to do so will immediately throw a ReferenceError because the variable has been declared but not yet initialized.

// console.log(c); is where it gets tricky. It will also result in a TypeError.

// Reasoning: You have two declarations for c: a function and a constant. In JavaScript, function declarations are hoisted before variable declarations. So the function c() is hoisted to the top. However, the subsequent const c = 3; declaration creates a variable with the same name. When the code reaches console.log(c);, the engine sees the const declaration, and because const is also hoisted to the TDZ, it throws a TypeError because you're trying to re-declare a const variable. The function declaration for c is effectively overwritten or shadowed by the const declaration, leading to this error. The engine sees the const and throws an error before it ever gets to execute the line console.log(c); in the traditional sense.

// The execution will stop at the first error encountered, which is the ReferenceError for b. The code for c will not even get a chance to run.

// Summary of Output
// The code will throw a ReferenceError on the second console.log(b); statement, and the program will terminate at that point. The lines after that will not be executed.
