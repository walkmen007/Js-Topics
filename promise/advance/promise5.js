// A junior developer writes this code:

// What's wrong with this implementation? How would you refactor it and why?

function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        fetch(`/api/users/${userId}`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}



//Answer: 
//Option1. Remove the promise constructor: 
function fetchUserData(userId){
    let response =  fetch(`/api/users/${userId}`)
    return response.json()
}


// Option 2: If we want to use promise constructor then use below logic: 
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        fetch(`/api/users/${userId}`)
            .then(response => response.json())
            .then(data => resolve(data))  // Wait for json() Promise to resolve
            .catch(error => reject(error));
    });
}

