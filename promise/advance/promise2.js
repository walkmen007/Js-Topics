// Question 2: Error Handling Edge Cases
// What gets logged and why? What are the implications of returning from a finally block?

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


   // Output: 
    //Error will be thro from  -> throw new Error('Oops');
