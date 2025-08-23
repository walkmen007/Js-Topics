// 👉 Challenge for you:


// 📝 Your Task

// Write a reusable withTimeout(promise, ms) function.

// 👉 Rules:

// withTimeout should take any promise and a timeout in ms.

// If the promise resolves/rejects before timeout, return its result.

// If the timeout happens first, reject with "⏰ Timeout after X ms".

//In Above task we need modification as below. 

// Can you extend this so that instead of rejecting on timeout, it returns a fallback value (like "⚠️ Default Data") if the API is too slow?


function withTimeout(promise, ms, defaultData){
  return Promise.race([promise, timeout(ms, defaultData)])
}

function timeout(ms, defaultData){

      return new Promise((resolve, reject)=>{
          setTimeout(()=>{
           resolve({responseType: "fallback", data: defaultData});
          }, ms)
      });
}


async function getData(){
    try{
        let promise1 = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({responseType:"from Api", data: "User Data"});
        },4000)
        });

        let resp = await withTimeout(promise1, 3000, "Default Data Str.");
        console.log("Response : ", resp.responseType, resp.data)

    }catch(err){
        console.log("Err", err);
    }
}

getData();