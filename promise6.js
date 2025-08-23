// 🔹 Task 6 (Real-world style: user data simulation)

// Let’s now try the user data fetching example I gave earlier:

// After 1 second, resolve with { id: 1, name: "Ankit" }.

// First .then() should extract the name.

// Second .then() should log: "User name is: Ankit".

// Add a .catch() just in case something goes wrong.

// 👉 Can you write this?


let Task6 = new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve({ id: 1, name: "Ankit" })}, 1000);
});

Task6.then((res)=>{return res.name}).
then((val)=>{console.log(`User name is: ${val}.`)}).
catch((err)=>{console.log("Error---", err)});