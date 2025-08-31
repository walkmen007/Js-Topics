const promises = [
    new Promise(resolve => setTimeout(() => resolve('A'), 100)),
    new Promise((_, reject) => setTimeout(() => reject('B'), 50)),
    new Promise(resolve => setTimeout(() => resolve('C'), 200))
];

Promise.race(promises)
    .then(result => console.log('Success:', result))
    .catch(error => console.log('Error:', error));

// What happens to the other promises after race settles?
// How would you implement a "cancellable" race?



// Anwer: Error: B

// Promise.race() does NOT terminate or cancel the other promises. Once a JavaScript Promise starts executing, it continues running until completion, regardless of whether race() has already settled.

// 🔹 How Promise.race() works

// Promise.race([p1, p2, p3]) settles (resolves or rejects) as soon as the first promise settles.

// But the other promises are not canceled. They keep running in the background until they finish (resolve/reject).

// Example Below: 
function delay(ms, label) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(label, "done");
      resolve(label);
    }, ms);
  });
}

Promise.race([
  delay(1000, "A"),
  delay(2000, "B"),
  delay(3000, "C"),
]).then(result => console.log("Race winner:", result));