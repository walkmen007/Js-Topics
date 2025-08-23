// 🔹 Task 4 (Introduce Error Handling in Chain)

// Make a Promise chain that:

// Starts with resolving 2.

// First .then() multiplies it by 3.

// Second .then() throws an error "Unexpected error!".

// Add a .catch() at the end to log the error.

// 👉 Try this out!


let Task4 = new Promise((resolve, reject)=>{
    resolve(2);
});


// Task4.then((num)=>{return num*3}).then(()=>{return new Error("Unexpected error!")}).catch((err)=>{console.log("Error---", err)});


// Mistake Above : 
// then(()=>{return new Error("Unexpected error!")})
// This does not throw an error.
// It just creates an Error object and passes it down as a resolved value.
// So .catch() won’t run — instead, your next .then() (if you had one) would just receive that error object as a normal value.


//Correct Way

Task4.then((num)=>{return num*3}).then(()=>{throw new Error("Unexpected error!")}).catch((err)=>{console.log("Error---", err)});


// 🔑 Key Concept

// If you throw inside .then(), the error is automatically passed to the nearest .catch().

// .catch() will handle any error that happened earlier in the chain.
// If you return new Error(...) → it’s just a value.

// If you throw new Error(...) → it’s an actual rejection.

// Inside a .then(), both throw and Promise.reject() will move control to .catch().