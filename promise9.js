// 🔹 Task for You

// Make 3 promises:

// One resolves in 1s with "✅ Success 1".

// One rejects in 2s with "❌ Failed 2".

// One resolves in 3s with "✅ Success 3".

// Run both:

// Promise.race() → log who “wins”.

// Promise.allSettled() → log the full array of results.

// 👉 Do you want me to give a skeleton code for you to fill in, or let you try fully yourself?


let promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve("✅ Success 1")}, 1000);
});

let promise2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{reject("❌ Failed 2")}, 2000);
});

let promise3 = new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve("✅ Success 3")}, 3000);
});

Promise.race([promise1, promise2, promise3]).then((res)=>{console.log(res)}).catch((err)=>{console.log("Error---", err)});


Promise.allSettled([promise1, promise2, promise3]).then((res)=>{console.log(res)}).catch((err)=>{console.log("Error All settle", err)});



// 🔑 Key Takeaway

// Promise.race → first settled promise decides the result (winner).

// Promise.allSettled → gives results of all promises, regardless of pass/fail.