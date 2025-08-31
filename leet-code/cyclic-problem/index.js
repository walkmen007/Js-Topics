// create a cyclic function. 
// that take one or more value and return a function that cycle thrrought those value each time it called.


const cycle = (...args)=>{
    let argsList = args;
    let index = -1;
    return ()=>{
           index++;
           index = index <= (argsList.length - 1) ? index : 0;
           return argsList[index];
        }
}

var helloFn = cycle("45", "90", "135", "180");
console.log(helloFn()); 
console.log(helloFn()); 
console.log(helloFn()); 
console.log(helloFn());
console.log(helloFn()); 
console.log(helloFn()); 
console.log(helloFn()); 
console.log(helloFn());
console.log(helloFn()); 
console.log(helloFn()); 
console.log(helloFn()); 
console.log(helloFn());


