// 3. Refactoring Challenge:
// How would you refactor this code to maintain the cleanup logic but avoid the error masking:

async function betterImplementation() {
    let cleanup = null;
    try {
        const resource = await acquireResource();
        cleanup = () => resource.release();
        const result = await processResource(resource);
        throw new Error('Something went wrong');
        return result;
    } catch (error) {
        console.log('Caught:', error.message);
        throw error;
    } finally {
        if (cleanup) cleanup();
        // How do you handle cleanup without masking errors?
        return 'cleanup complete'; // This is problematic
    }
}