// 🔹 Promise.any()

// Similar to Promise.race, but it only cares about the first successful (fulfilled) promise.

// If all promises fail, it rejects with an AggregateError (special error containing all the reasons).

// 🔑 Summary of Promise Combinators

// Promise.all → Waits for all success, fails fast on first rejection.

// Promise.allSettled → Waits for all, gives results of both success/fail.

// Promise.race → First settled (resolve or reject) decides outcome.

// Promise.any → First success wins, fails only if all reject.




// Create 3 promises:

// One rejects after 1s with "❌ Error 1".

// One rejects after 2s with "❌ Error 2".

// One resolves after 3s with "✅ Success 3".

// 👉 Use Promise.any to log the first success.
// 👉 If you comment out the success promise, make sure you see AggregateError with all failures.



let promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{reject("❌ Error 1")}, 1000);
});

let promise2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{reject("❌ Error 2")}, 2000);
});

let promise3 = new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve("✅ Success 3")}, 3000);
});

Promise.any([promise1, promise2, promise3]).then((res)=>{console.log("First Success : ", res)}).catch((err)=>{console.log("Error---", err)});




