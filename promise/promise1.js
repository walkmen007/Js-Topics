//Task1. Write a simple Promise that:
//Resolves with "Hello, Promise!" after 2 seconds.
//Logs the resolved value using .then(). 


let task1 = new Promise(resolve, reject);
task1.then(()=>{
    setTimeout(()=>{return "Hello, Promise!"}, 2000);
}); 


// Problem in Above Code: 
// 1. Wrong decleration of Promise. 
// 2. In setTimout function, it already return callback function, "return" is not require here.

// Correct Way

let Task1 = new Promise((resolve, reject)=>{
    setTimeout( resolve("Hello, Promise!"), 2000);
})

Task1.then((message)=>{
   console.log(message);
})