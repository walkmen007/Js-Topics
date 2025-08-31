function findFibonacciNumber(num, memo={}){
    if(num<=1){
        return 1;
    }
    memo['0'] = 0;
    memo['1'] = 1;
    let index = 2;
    while(index<= num){
        memo[index] = memo[index-1] + memo[index-2];
        index++;
    }
    return memo[num];
}

console.log("Fibonacci Number is : ", findFibonacciNumber(45));



// Here We are storing last result in memo. 
// and time complexity will become O(n)
// Space Complexity : O(n)
// We can reduce space complexity to O(1) by storing last 2 number in momo. 

