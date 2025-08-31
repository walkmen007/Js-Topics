async function problematicFunction() {
    try {
        const result = await Promise.resolve('success');
        throw new Error('Oops');
        return result;
    } catch (error) {
        console.log('Caught:', error.message);
        throw error;
    } finally {
        return 'finally block';
    }
}

problematicFunction()
    .then(result => console.log('Then:', result))
    .catch(error => console.log('Catch:', error.message));



    //Output: 
//     For Que 3: 
// "Caught:  Oops" error will print. 
// then control come un catch of problematicFunction()
// and print : 
// catch: Oops
// and then finally will execute 
// Then: Finally block



// You correctly identified that:

// The error is caught and re-thrown
// The finally block's return statement overrides the thrown error
// The function resolves with 'finally block' instead of rejecting

