// 🔹 Task 7 (Next Level — Promise.all)

// Create two Promises:

// First resolves after 1 second with "🍎 Apple".

// Second resolves after 2 seconds with "🍌 Banana".

// Use Promise.all to log:


let promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
       resolve( '🍎 Apple');
    }, 3000);
});

let promise2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
       resolve( '🍌 Banana');
    }, 1000);
    
});


let pro = Promise.all([promise1, promise2]);
pro.then((res)=>{console.log(res)}).catch((err)=>{return "Error In Promise Execution."});
