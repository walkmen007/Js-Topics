// 🧩 Problem: Minimum Cost Climbing Stairs

// You are given an integer array cost where cost[i] is the cost of stepping on the i-th stair.
// Once you pay the cost, you can climb either one or two steps.
// You can start from step 0 or step 1.

// 👉 Return the minimum cost to reach the top of the staircase (beyond the last index).

// Example 1
// Input: cost = [10, 15, 20]
// Output: 15


// Explanation:

// Start at index 1: Pay 15, jump 2 steps → done.

// Or start at index 0: Pay 10, then 20 = 30 (more costly).
// So min cost = 15.


function minCostClimbingStairs(arr){
    let cost = 0;
    let i = -1;
    while(i < arr.length-2){
        let min = Math.min(arr[i+2], arr[i+1]);
        cost += min;
        i = arr[i+1] >= arr[i+2] ? i+2: i+1;
    }
    return cost;
}



//let costArr = [10, 100, 10, 10, 10, 10, 120, 100, 10, 6,7,8, 150]
//let costArr = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
let costArr = [10, 15, 25]
console.log("Minimum Cost for Climbing Stairs: ", minCostClimbingStairs(costArr));