// 👉 Question 6: Middleware System with Closures

// Imagine you want to build a middleware runner like Express does.

// Requirements

// You have an array of middleware functions.

// Each middleware receives a context object and a next function.

// Calling next() runs the next middleware in the chain.

// When all middlewares are done, execution stops.

var validateUser = (logs, next)=>{
    console.log("validateUser Start")
    next();
    console.log("validateUser End")
}

var getToken= (prams, next)=>{
   console.log("getToken Start")
    next();
    console.log("getToken End")
}

var getUserInfo=  (prams)=>{
   console.log("getUserInfo Start")
    next();
   console.log("getUserInfo End")
}

let middleWareArray = [
 validateUser, getToken, getUserInfo
];

 

