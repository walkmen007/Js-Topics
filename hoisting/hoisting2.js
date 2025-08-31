var a = 1;

function b() {
    a = 10;
    return;
    function a() {}
}

b();
console.log(a);


// Answer: 
// That's a very common misconception! Let's clarify.

// ### Hoisting and `return`

// Your understanding that code after a `return` statement is not executed is correct for a typical program flow. However, hoisting is a process that happens during the **compilation phase**, before the code is actually executed.

// Let's break down the code's execution:

// 1.  **Global Scope:** A variable `a` is declared with `var` and assigned the value `1`.

// 2.  **Function `b()` is called:** The JavaScript engine enters the scope of function `b`.

// 3.  **Hoisting in `b()`:** Before any code inside `b` is executed, the JavaScript engine scans the function for declarations. It finds `function a() {}`. The **entire function declaration** `a` is hoisted to the top of the function's scope. This is a crucial point. The `return` statement has no effect on hoisting.

// 4.  **Execution inside `b()`:**
//     * The line `a = 10;` is executed.
//     * At this point, the `a` that's being assigned a value is **not** the global `a`. Due to hoisting, a local variable `a` (the function `a`) exists within the scope of `b`.
//     * The value `10` is assigned to this local `a`. The global `a` remains untouched.

// 5.  **`return;`:** The `return` statement is executed, and the function `b` exits.

// 6.  **`console.log(a);`:** The program is back in the global scope. It logs the value of the global variable `a`. Since the assignment `a = 10` happened to the local, hoisted `a` inside the function, the global `a`'s value of `1` remains unchanged.

// ### Final Output:

// The final output will be `1`.

// Your initial assumption was that the `return` statement would prevent the hoisting of `function a() {}`, but hoisting is a compile-time behavior, not a runtime one. This is a classic example of a hoisting-related interview question that separates a basic understanding from a deeper one.
