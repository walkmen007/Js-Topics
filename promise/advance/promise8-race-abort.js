// Have you encountered situations where this "promises continue running" behavior caused issues in production? How did you handle it?
// What's your approach to implementing true cancellation with Promises?

Answer: 
// Promise object is not provided any way to cancel ongoing promises. 
// spacially when promise.reace has settled one promise. Other promise will keep running in background.

// To handle the situation : 
// y default, Promise.race does not cancel the other promises — but you can manually cancel them if the API supports cancellation.

// In modern JavaScript, the standard way is to use AbortController (works with fetch).

// ✅ Example: Canceling pending requests in Promise.race

function fetchWithCancel(url, controller) {
  return fetch(url, { signal: controller.signal });
}

const controller1 = new AbortController();
const controller2 = new AbortController();
const controller3 = new AbortController();

Promise.race([
  fetchWithCancel("https://jsonplaceholder.typicode.com/posts/1", controller1),
  fetchWithCancel("https://jsonplaceholder.typicode.com/posts/2", controller2),
  fetchWithCancel("https://jsonplaceholder.typicode.com/posts/3", controller3),
])
  .then(res => res.json())
  .then(data => {
    console.log("Winner response:", data);

    // Cancel other pending requests
    controller1.abort();
    controller2.abort();
    controller3.abort();
  })
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request aborted");
    } else {
      console.error("Error:", err);
    }
  });


//   🔹 How this works

// We create a separate AbortController for each request.

// When Promise.race resolves with the first finished request, we abort the others.

// Aborted fetch calls throw an AbortError, which we can handle gracefully.

// 🔹 Notes

// This works for fetch (native support for AbortController).

// If you’re using Axios, it has its own cancellation mechanism (CancelToken or AbortController in recent versions).

// For custom async tasks (like setTimeout or DB queries), you’d need to design your own cancellation logic.