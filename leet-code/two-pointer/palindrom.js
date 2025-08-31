function palindromeCheck(str){
    str = str.replaceAll(/[^a-z0-9]/gi, '');
    str = str.split('');
    let start = 0;
    let end = str.length-1;
    while(start < end){
        if(str[start].toLowerCase() == str[end].toLowerCase()){
            start++;
            end --;
        }else{
          return false;
        }
    }
    return true;
}


console.log("String is Palindrome", palindromeCheck("Racecar"));
console.log("String is Palindrome", palindromeCheck("madam"));
console.log("String is Palindrome", palindromeCheck("aabaa"));