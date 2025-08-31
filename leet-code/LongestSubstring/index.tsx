// 3. Longest Substring Without Repeating Characters
// Medium
// Topics
// premium lock icon
// Companies
// Hint
// Given a string s, find the length of the longest substring without duplicate characters.

 

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

var lengthOfLongestSubstring1 = function(s) {
   let maxSubString = {};
   let temp = {};
   let maxLengthSubString = 0;
   let count = 0;
   for(let i=0; i < s.length; i++){
     let remainingStrLength = s.length - i;
     temp = {};
     count = 0;
     temp[s[i]] = 1;
     count++;
     console.log("remainingStrLength", i, remainingStrLength, maxLengthSubString)
     if(remainingStrLength > maxLengthSubString){
       for(let j=i+1; j<s.length; j++){
         if(temp.hasOwnProperty(s[j])){
            maxLengthSubString = count > maxLengthSubString? count :  maxLengthSubString;
            maxSubString = count > maxLengthSubString ? temp : maxSubString;
            j = s.length;
         }else{
            temp[s[j]] = 1;
            count++;
         }
       }
       maxLengthSubString = count > maxLengthSubString? count :  maxLengthSubString;
       maxSubString = count > maxLengthSubString ? JSON.stringify(temp) : maxSubString;
     }else{
        i = s.length;
     }
   }
    return maxLengthSubString;
};

//  let len = lengthOfLongestSubstring1("pwwkew")

// console.log("Largest Substring", len)



//Review Points: 

// 1. Inefficient Time complexcity O(n2).

//    You are restarting the search from each index (i) and scanning ahead with j.

//    For large strings (say length 10⁵), this will time out in interviews / online judges.

//    Optimal solution is O(n) using a sliding window + HashSet/Map.

// 2. Code complexity : 

//     Using if (remainingStrLength > maxLengthSubString) with else { i = s.length; } is unusual — interviewers may see this as confusing flow.

//     You’re force-setting j = s.length; inside loop instead of just break;.

// 3.  Not idiomatic JS

//     Using temp.hasOwnProperty(s[j]) is verbose — better to use a Set for duplicate check.

//     Splitting string into array (s = s.split('')) is unnecessary — you can index a string directly in JS.




var lengthOfLongestSubstring2 = function(s) {
   let maxSubString = 0;
   for(let i=0; i < s.length; i++){
     let temp = new Set();
     temp.add(s[i]);
     let remainingList = s.length - i;
     if(remainingList > maxSubString){
        for(let j=i+1; j<s.length; j++){
            if(temp.has(s[j])){
                break;
            }else{
                temp.add(s[j]);
            }
        }
     }else{
        break;
     }
      maxSubString = Math.max(maxSubString, temp.size);;
   }
   return maxSubString;
};


let output = lengthOfLongestSubstring2('abcabcbb');
console.log("Size----", output)
  


