// You are climbing a staircase.
// It takes n steps to reach the top.

// Each time you can climb 1 step or 2 steps.

// In how many distinct ways can you climb to the top?


function distinctWays(count){
   let memo = {1:1, 2:2};
   let current = 3;
   if(memo[count]){
    return memo[count];
   }
   while(current <= count){
      memo[current] = memo[current-1] + memo[current-2];
      current++;
   }
   return memo[count];
}


console.log("Distinct Ways to climb stairs: ", distinctWays(6));