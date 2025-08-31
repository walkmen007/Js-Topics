// 🔹 Next Challenge

// Let’s combine multiple async calls (a very real-world case).

// 👉 Task:

// Make two functions:

// getUser() → resolves in 1s with { id: 1, name: "Ankit" }.

// getPosts(userId) → resolves in 2s with ["Post 1", "Post 2"].

// Create an async function showUserPosts() that:

// Uses await to first get the user.

// Then fetches that user’s posts.

// Logs both user info and posts.



function getUser(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
              resolve({ id: 1, name: "Ankit" })
            }, 1000);
            
    })
}

function getPosts(userId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
              console.log("USer Id", userId);
              resolve(["Post 1", "Post 2"])
            }, 2000);
            
    })
}

async function showData(){
    try{
       let user = await getUser();
       let post = await getPosts(user.id);
       console.log("User Data", user);
       console.log("Post : ", post);
    }catch (err){
       console.log("Async Await Catch", err);
    }
    
}

showData();


