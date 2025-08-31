// 🔹 Next Task (Task 2)

// Create a Promise that:

// Rejects after 1 second with the message "Something went wrong!".

// Use .catch() to handle the error and log it.

// 👉 Try this, and paste your code. Would you like me to give hints before you try, or do you want to attempt fully on your own first?


let Task2 = new Promise((resolve, reject)=>{
    setTimeout(reject("Something went wrong!"), 1000);
})

Task2.catch((msg)=>{
  console.log(msg);
})


// Review: 

// Here one Mistake above. in setTimeout(reject("Something went wrong!"), 1000);
// reject() will execute immediately. we need to provice this in callback function. 


// Correct Way
let Task2r = new Promise((resolve, reject)=>{
    setTimeout(()=>{reject("Something went wrong!")}, 1000);
})

Task2r.catch((msg)=>{
  console.log(msg);
}) 
