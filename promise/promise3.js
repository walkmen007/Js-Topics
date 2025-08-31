// 🔹 Task 3 (Next Step: Chaining)

// Create a Promise that:

// Resolves with a number 5.

// In the first .then(), multiply it by 2 and return the result.

// In the next .then(), add 10 and log the final result.

// 👉 Try writing this.
// Do you want me to give a small hint on chaining, or should I let you attempt first?



let Task3 = new Promise((resolve, reject)=>{
    return resolve(5);
})

Task3.then((num)=>{
    return num*2
}).then((num2)=>{
    num2 = num2 +10;
    console.log("num2", num2)
    return num2;
});


// Review : 

// Just one tiny improvement (not a mistake, just style):

// 👉 Since you wrote return resolve(5); inside the executor, you don’t need the return. The executor automatically runs when the Promise is created.

// Example : 
// let Task3 = new Promise((resolve, reject) => {
//     resolve(5);
// });