//Que: What's the output and why? Explain the event loop, microtask queue, and macrotask queue interactions here.

console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => {
    console.log('3');
    setTimeout(() => console.log('4'), 0);
});

Promise.resolve().then(() => console.log('5'));

console.log('6');



// My Answer:

//Output: 
// 1
// 6
// 3
// 5
// 2
// 4


// Explaination : 
// Why Output: 
// Here first priority will be given to call stack que Task List. 
// before async code. 
// Once call stack get empty. now Execution will get priority for micro task queue Execution. 
//  Task queu execution priority is : 
//  Call stack -> Micro Task -> Macro Task.
//  Promise, async await, eventListners are come under microtask queu. 
//  Where as Settimeout timeinterval are come under macro task queu. 

//  In above case, 
// First, synchronous logs run: 1 and 6.
// Next, the microtasks run in order: the first promise logs 3 and enqueues a timeout for 4; the second promise logs 5.
// Then the event loop moves to the macrotask queue: the original setTimeout logs 2, and finally the timeout enqueued inside the promise logs 4.
// So the order is: 1, 6, 3, 5, 2, 4.

