// For a given string find the duplicate character that appear more then once in a string. 
// And print the count of duplicate. 

function findDuplicateCharAndCount(str){
    let finalMap = new Map();
    let entrySet = new Set();
    if(str.length <=1){
        return str.length===1 ? "Empty String" : "No Duplicate";
    }
    for(let i=0;i<str.length;i++){
        if(entrySet.has(str[i])){
            let val = finalMap.has(str[i]) ? finalMap.get(str[i]) : 0
            finalMap.set(str[i], val+1)
        }
        entrySet.add(str[i]);
    }
    entrySet.clear();
    return finalMap;
}


let str='aaabbbdddchchhkkklaaakj';
let duplicateStr = findDuplicateCharAndCount(str);
for (const [key, value] of duplicateStr) {
  console.log(`${key} = ${value}`);
}
