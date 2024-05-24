const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getExchangeRateFunctionDeclaration, getStockPriceFunctionDeclaration,
    getCompanyOverviewFunctionDeclaration, getCompanyNewsFunctionDeclaration,
    getNewsWithSentimentFunctionDeclaration, apiServicesFunctions } = require('./functions/functionDeclaration');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({
    model: 'gemini-1.0-pro',
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
 * Handles function calls from the Gemini model, executing corresponding API calls and sending responses back.
 *
 * @async
 * @function handleFunctionCalls
 * @param {Object} result - The response object from the Gemini model, containing potential function calls.
 * @param {Object} chat - The chat object used to interact with the Gemini model.
 * @throws {Error} Throws an error if the model doesn't return any function calls,
 *                  indicating potential issues with the LLM or quotas.
 */
async function handleFunctionCalls(result, chat) {
    const functionCallsLength = result?.response?.functionCalls()?.length || 0;
    if (functionCallsLength === 0) {
        throw Error('LLM is experiencing problems, check quotas');
    }
    for (let i = 0; i < functionCallsLength; i++) {
        const call = result.response.functionCalls()[0];
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

