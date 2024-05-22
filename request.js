// const fetch = require('node-fetch'); // do not need if using node 18+
async function makeApiRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error(`Error fetching URL ${url}: ${error.message}`);
        throw error;
    }
}
exports.makeApiRequest = makeApiRequest;
