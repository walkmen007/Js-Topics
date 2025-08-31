// ⚡ Next Step: Combine async/await + Promise.race
// So you can handle timeouts or take the fastest response.

// 👉 Task for you:

// Create two promises:

// fastAPI → resolves in 1s with "⚡ Fast API".

// slowAPI → resolves in 4s with "🐢 Slow API".

// Use Promise.race with await inside showDashboard().

// Log the winner result.

// Do you want me to give you a starter skeleton, or do you want to attempt directly?




function fasApi(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
     resolve("⚡ Fast API");
    }, 1000);
  })
}

function slowApi(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        resolve("🐢 Slow API");
        }, 4000);
    })
}

async function showDashboard(){
    try{
        let resp = await Promise.race([fasApi(), slowApi()]);
        console.log("Promise Resolve", resp);
    }catch(err){
        console.log("Error", err);
    }
    
}

showDashboard();