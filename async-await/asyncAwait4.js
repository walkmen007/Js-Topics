// 🔹 Task (Parallel calls with async/await)

// Make two functions:

// getWeather() → resolves in 2s with "☀️ Sunny".

// getNews() → resolves in 3s with "📰 Breaking News".

// Write an async function showDashboard() that:

// Uses Promise.all with await to run both at the same time.

// Logs the results together once both are done.


function getWeather(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
     resolve("☀️ Sunny");
    }, 2000);
  })
}

function getNews(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        resolve("📰 Breaking News");
        }, 3000);
    })
}

async function showDashboard(){
    try{
        let resp = await Promise.all([getNews(), getWeather()]);
        console.log("Promise Resolve", resp);
    }catch(err){
        console.log("Error", err);
    }
    
}

showDashboard();