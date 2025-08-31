// 🔹 Task 5 (Mixing Success + Failure)

// Make a Promise that:

// Resolves with 10.

// First .then() adds 5.

// Second .then() throws an error "Something went wrong in step 2!".

// .catch() logs the error.

// Add a .then() after the .catch() that logs "Recovered and continuing...".

// 👉 Try this one. It will show how chains can recover after errors.

let Task5 = new Promise((resolve, reject)=>{
    resolve(10);
});

Task5.
then((num)=>{return num+5}).
then((num)=>{throw new Error("Something went wrong in step 2!")}).
catch((err)=>{console.log(err); return "Recovered and continuing..."}).then((res)=>{
    console.log(res);
});

// Learning : 
// 👉 A .catch() can recover from an error and allow the chain to continue.


