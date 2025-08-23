// 📝 Your Task

// Write a reusable withTimeout(promise, ms) function.

// 👉 Rules:

// withTimeout should take any promise and a timeout in ms.

// If the promise resolves/rejects before timeout, return its result.

// If the timeout happens first, reject with "⏰ Timeout after X ms".


async function withTimeout(promise, ms){
    try{
        let result  = await Promise.race([promise, timeout(ms)]);
        return result;
    }catch(err){
        return err;
    }
   
}

function timeout(ms){
  return new Promise((resolve ,reject)=> {
    setTimeout(()=>{
      reject(`⏰ Timeout after ${ms} ms`);
    }, ms);
  });
}

async function getUserInfo(){
    try{

         let promise1 = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve("Promise Resolved");
            }, 2000);
         });
        let res = await withTimeout(promise1, 7000);
        console.log("Result---", res)
    }catch(err){
       console.log("err--", err)
    }
   
}

getUserInfo();
