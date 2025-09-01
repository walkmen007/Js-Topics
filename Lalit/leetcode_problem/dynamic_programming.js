// Question 1 Min Cost Climbing Stairs
// https://leetcode.com/problems/min-cost-climbing-stairs/description/

var minCostClimbingStairs = function(cost) {
  let prev1 = 0;
  let prev2 = 0;

    for (let i = 0; i < cost.length; i++) {
        let curr = cost[i] + Math.min(prev2, prev1);
        prev2 = prev1;
        prev1 = curr;
    }

    return Math.min(prev2, prev1);
}