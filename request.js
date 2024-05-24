// const fetch = require('node-fetch'); // do not need if using node 18+

/**
  * Makes an HTTP GET request to a specified URL.
  *
  * This function makes an asynchronous HTTP GET request to the provided URL
  * and returns the response body as a string if the request is successful.
  * If the request fails or encounters an error, it throws an error with details.
  *
  * @async
  * @function makeApiRequest
  * @param {string} [url=''] - The URL to make the GET request to.
  * @returns {Promise<string>} A Promise that resolves with the response body as a string.
  * @throws {Error} Throws an error if the request fails or if there is an error fetching the URL.
  *
  * @example
  * // Example usage:
  * const apiUrl = 'https://api.example.com/data';
  *
  */
async function makeApiRequest(url = '') {
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
