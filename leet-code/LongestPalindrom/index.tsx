// Given a string s, return the longest palindromic substring in s.

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"


var longestPalindrome = function(s) {
    let palindrome = '';
    if(s.length ===1){
        return s[0];
    }
    for(let i=0; i < s.length; i++){
        let right = s.length-1;
        if(palindrome.length >(right-i)){
            break;
        }
        while(right>i){
            let str = s.slice(i,right+1)
            if(isPalindrome(str)){
                palindrome =  str.length > palindrome.length ? str: palindrome;
                break;
            }
            right--;
        }
    }
    palindrome = palindrome === '' ? s[0] : palindrome;
    return palindrome;
};

var isPalindrome = (str)=>{
    let right = str.length-1;
    let mid = Math.ceil(str.length/2);
    for(let i=0; i< mid; i++){
      if(str[i] === str[right]){
        right--;
      }else{
        return false
      }
    }
    return true;
}
let str = longestPalindrome('ab');
console.log("isPalindrome-----", str)


