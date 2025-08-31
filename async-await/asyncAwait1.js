// 🔹 Task for You

// Write a function getData() that returns a Promise which resolves after 2s with "✅ Data fetched!".

// Write an async function called showData() that uses await getData() and logs the message.

// Add try...catch in case something goes wrong.

// 👉 Want me to give you a skeleton code to fill in, or do you want to attempt it fully on your own?


function getData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve("✅ Data fetched!")}, 2000);
    })
}

async function showData(){
    try{
       let data = await getData();
       console.log("Async Await Success", data);
    }catch (err){
       console.log("Async Await Catch", err);
    }
    
}