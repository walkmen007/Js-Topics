// 👉 Problem Statement

// Write a function remember(limit) that returns another function.
// Each time you call it with a value, it should store that value.

// If the stored values exceed limit, remove the oldest one.

// Always return the list of remembered values.



function remember(){
    let arr = [];
    let limit = 3;
    return function(val){
        if(arr.length < limit){
            arr.push(val)
        }else{
            arr.shift();
            arr.push(val)
        }
        return arr;
    }
}

let result = remember();

console.log("Add Value : ", result(34))
console.log("Add Value : ", result(44))
console.log("Add Value : ", result(54))
console.log("Add Value : ", result(64))
console.log("Add Value : ", result(74))
// console.log("Add Value : ", result(34))
// console.log("Add Value : ", result(34))
// console.log("Add Value : ", result(34))
// console.log("Add Value : ", result(34))
// console.log("Add Value : ", result(34))