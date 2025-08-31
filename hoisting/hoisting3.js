var a = 5;

(function () {
    console.log(a);
    var a = 10;
    console.log(a);
})();

console.log(a);


// Answer: 
// Correct Breakdown:
// console.log(a); (inside the IIFE): This will log undefined.

// Reasoning: Inside the Immediately Invoked Function Expression (IIFE), the var a = 10; declaration is hoisted to the top of its local function scope. At this point, a exists within this scope, but its value has not yet been assigned. Therefore, it is undefined. This local a shadows the global a.

// console.log(a); (inside the IIFE): This will log 10.

// Reasoning: The line var a = 10; has now been executed. The hoisted a within the function's scope is assigned the value 10.

// console.log(a); (global scope): This will log 5.

// Reasoning: The IIFE creates its own private scope. The var a declaration and the subsequent assignment to 10 are confined to that function. They do not affect the a variable in the global scope. The global a remains unchanged with its initial value of 5.

// You've demonstrated a solid understanding of how hoisting interacts with different scopes in JavaScript. This is a very common interview question designed to test this specific knowledge.

