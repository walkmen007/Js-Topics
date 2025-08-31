// 🔹 Next Step: Error Case

// Let’s make it more realistic: sometimes APIs fail.

// 👉 Modify getData() so that:

// 50% of the time it resolves with "✅ Data fetched!".

// 50% of the time it rejects with "❌ Failed to fetch data!".

// Then run showData() multiple times to see success vs error handling with try...catch.



function getData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let random = Math.random()*10;
            if(random<5){
               resolve("✅ Data fetched!")
            }
            reject("❌ Failed to fetch data!")
            }, 2000);
            
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


showData();
showData();
showData();
showData();
showData();




// 🔑 Key Concepts You Just Mastered

// await pauses only inside async function, not blocking the whole program.

// try...catch is the async/await version of .then().catch().

// This pattern is exactly how you handle real-world APIs like fetch().
