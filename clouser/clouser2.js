// 👉 Your task:
// Write a function greetingGenerator(greeting) that returns another function.
// When you call that returned function with a name, it should print a personalized message.

// Example usage:

function greetingGenerator(greetings){
  return function(name){
   return greetings + name;
  }
}


let functionFactory = greetingGenerator('Hello, ');
console.log("Show Greeting : ", functionFactory('Ankit') );
