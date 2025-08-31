// 1. Call an API with Promise. 
// Approach 1. 
function fetchApiData(){
    return new Promise((resolve, reject)=>{
        fetch('https://dummyjson.com/products/category-list').
        then((response)=>response.json()).
        then((data)=>resolve((data))).
        catch((error)=>{reject(`Api Error" + ${error.message}`)});
    });
}

// let data = fetchApiData();
// data.then((data)=>{ console.log("Data---", data) }).
// catch((err)=>{console.log("Error", err)});



//Approach 2
function getCategoryList2(){
    return  fetch('https://dummyjson.com/products/category-list').
        then((response)=>response.json()).
        then((data)=>data).
        catch((error)=>{`Api Error" + ${error.message}`});
}
// let approach2 =  getCategoryList2();
// approach2.then((response)=>{console.log("Apporach2---", response)}).catch((err)=>{console.log("Approach2:", err)});


//Approach 3 using async await:
async function getDataUsingAsync(){
    try{
      let data = await getCategoryList2();
      console.log("Data Using Async Await", data)
    }catch(err){
      console.log("Error", err);
    }
}
getDataUsingAsync();
