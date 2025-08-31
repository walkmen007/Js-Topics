// 📝 Task

// You have two APIs:

// fetchWeather() → resolves in 2s with "☀️ Sunny".

// fetchStocks() → resolves in 3s with "📈 Stocks up".

// 👉 Your tasks:

// Call them sequentially (weather first, then stocks). Measure total time.

// Call them in parallel (both start together). Measure total time.

// Expected:

// Sequential should take ~5s.

// Parallel should take ~3s.


function fetchWeather(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve("☀️ Sunny")}, 2000);
    });
}


function fetchStocks(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve("📈 Stocks up")}, 3000);
    });
}

async function sequentially(){
    try{
      let tm = new Date().getTime();
      let resp1 = await fetchWeather();
      let resp2 = await fetchStocks();
      let timeDiff = new Date().getTime() - tm;
      console.log("Resp===", resp1, resp2);
      console.log("Time Take in Sequential Execution ", timeDiff);
    }catch(err){
        console.log("Err", err);    
    }
    
}


async function parallelExecution(){
    try{
      let tm = new Date().getTime();
      let resp = await Promise.allSettled([fetchWeather(), fetchStocks()])
      let timeDiff = new Date().getTime() - tm;
      console.log("Resp===", resp);
      console.log("Time Take in Sequential Execution ", timeDiff);
    }catch(err){
        console.log("Err", err);    
    }
    
}

sequentially();
parallelExecution();