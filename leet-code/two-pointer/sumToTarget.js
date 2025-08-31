// 📝 Program 1: Check if Array has a Pair that Sums to Target

// 👉 Classic two-pointer problem.

// Problem:

// Given a sorted array of integers and a target, check if there exist two numbers that add up to the target.

// Example:
// arr = [1, 2, 4, 6, 8, 9], target = 10  
// Output: true   // because 2 + 8 = 10



function CheckPairExist(arr, target){
    let left = 0;
    let right = arr.length-1;
    while(left < right){
        let sum =  arr[left] + arr[right];
        if(sum === target){
            return [arr[left],arr[right]]
        }else if(sum > target){
            right--;
        }else{
            left++; 
        }
    }
    return [];
}

let arr = [1, 2, 4, 6, 8, 9];
let target = 10;
console.log("CheckPairExist: ", CheckPairExist(arr, target))