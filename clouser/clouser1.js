// 🔹 Exercise 1: Simple Counter

// Write a function createCounter() that returns a function.
// Each time you call that function, it should increase a number and return it.


function createCounter(){
    let counter = 0;
    let obj = {
        increment : ()=>{
          return ++counter;
        },
        decrement : ()=>{
          return --counter;
        },reset : ()=>{
          counter=0;
          return counter;
        }
    }
    return obj
}

let counterIncrement = createCounter();
console.log("Counter Increment", counterIncrement.increment());
console.log("Counter Increment", counterIncrement.increment())
console.log("Counter Increment", counterIncrement.increment())
console.log("Counter decrement", counterIncrement.decrement())
console.log("Counter decrement", counterIncrement.decrement())
console.log("Counter reset", counterIncrement.reset())


