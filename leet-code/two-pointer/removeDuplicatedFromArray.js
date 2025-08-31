// 🔹 1. Remove Duplicates from Sorted Array

// 👉 You have a sorted array. Modify it in place so that each element appears only once and return the new length.

// Example:

// Input: [1,1,2,2,3,3,4]  
// Output: [1,2,3,4] and length = 4


function findDuplicate(arr){
    let sp = 0;
    let nf = 1;
    if(arr.length===1){
        return arr;
    }
    while(nf < arr.length){
        if(arr[sp] !== arr[nf]){
           sp++;
           arr[sp] = arr[nf];
        }
        nf++;
    }
    arr.length = sp+1;
    return arr;
}

let arr = [1,1,1,1,1,1,2,2,2,2,2,2];
console.log("Duplicate List of elements", findDuplicate(arr) );