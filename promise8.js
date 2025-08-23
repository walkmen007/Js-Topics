// 🔹 Task 8 (Challenge)

// Now, modify the above code so that:

// promise1 resolves after 1s with "🍎 Apple".

// promise2 rejects after 2s with "Banana is rotten!".

// Use Promise.all and handle the error with .catch().

// 👉 Want to give it a try?


let promise1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{resolve("🍎 Apple")}, 1000)
})

let promise2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{reject('🍌 Banana')}, 2000)
});


let promiseAll = Promise.all([promise1, promise2]);
promiseAll.then((res)=>{console.log(res)}).catch((err)=>{console.log("Promise reject", err)})

