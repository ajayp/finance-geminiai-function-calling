const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getExchangeRateFunctionDeclaration, getStockPriceFunctionDeclaration,
    getCompanyOverviewFunctionDeclaration, getCompanyNewsFunctionDeclaration,
    getNewsWithSentimentFunctionDeclaration, apiServicesFunctions } = require('./functions/functionDeclaration');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
    tools: {
        functionDeclarations: [
            getExchangeRateFunctionDeclaration,
            getStockPriceFunctionDeclaration,
            getCompanyOverviewFunctionDeclaration,
            getCompanyNewsFunctionDeclaration,
            getNewsWithSentimentFunctionDeclaration
        ]
    },
});
exports.generativeModel = generativeModel;

/**
 * Processes function calls specified in the response from the Gemini model, executes corresponding API calls,
 * and sends the results back to the Gemini NLP system.
 *
 * @async
 * @function handleFunctionCalls
 * @param {Object} resp - The response object from the Gemini model, which contains potential function calls.
 * @param {Object} chat - The chat object used to interact with the Gemini model, facilitating communication.
 * @throws {Error} Throws an error if the response does not include any function calls, indicating potential issues
 * with the Language Learning Model (LLM) or usage quotas.
 *
 * The function performs the following steps:
 * 1. Checks if there are any function calls in the response object. If none are found, it throws an error.
 * 2. Iterates over each function call in the response.
 * 3. For each function call, it:
 *    a. Executes the corresponding API call defined in `apiServicesFunctions`.
 *    b. Sends the API response back to the Gemini model using the `chat` object.
 *    c. Logs the text response from the Gemini model to the console.
 * 4. If any error occurs during the API call execution or response handling, it logs the error message to the console.
 */
async function handleFunctionCalls(resp ={}, chat ={}) {
    const functionCallsLength = resp?.response?.functionCalls()?.length || 0;
    if (functionCallsLength === 0) {
        throw Error('LLM is experiencing problems, check quotas');
    }
    for (let i = 0; i < functionCallsLength; i++) {
        const call = resp.response.functionCalls()[0];
        if (call) {
            try {
                // Call external API
                const apiResponse = await apiServicesFunctions[call.name](call.args);
                // Send the API response back to Gemini which will use NLP and send back a response
                const llmResponse = await chat.sendMessage([{
                    functionResponse: {
                        name: call.name,
                        response: typeof apiResponse === 'string' ? JSON.parse(apiResponse) : apiResponse
                    }
                }]);
                console.log(llmResponse.response.text() + '\n');
            } catch (error) {
                console.error(`Error executing API call: ${error.message}`);
            }
        }
    }
}
exports.handleFunctionCalls = handleFunctionCalls;

