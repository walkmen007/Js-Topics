// 🔹 Task for You

// Update getNews() so that sometimes it fails (rejects with "❌ Failed to fetch news!").
// Then:

// Use Promise.allSettled([getNews(), getWeather()]) in showDashboard.

// Log whether each result was "fulfilled" or "rejected".

// Would you like me to give you a skeleton code for allSettled, or do you want to try fully by yourself?


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
        reject("❌ Failed to fetch news!");
        }, 3000);
    })
}

async function showDashboard(){
    try{
        let resp = await Promise.allSettled([getNews(), getWeather()]);
        resp.forEach((item)=>{
            console.log(`Result: ${item.status} `);
        })
        //console.log("Promise Resolve", resp);
    }catch(err){
        console.log("Error", err);
    }
    
}

showDashboard();