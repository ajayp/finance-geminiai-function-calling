const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getExchangeRateFunctionDeclaration, getStockPriceFunctionDeclaration,
    getCompanyOverviewFunctionDeclaration, getCompanyNewsFunctionDeclaration,
     getNewsWithSentimentFunctionDeclaration, apiServicesFunctions } = require("./functions/functionDeclaration");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({
    model: "gemini-1.0-pro", tools: {
        functionDeclarations: [
            getExchangeRateFunctionDeclaration,
            getStockPriceFunctionDeclaration,
            getCompanyOverviewFunctionDeclaration,
            getCompanyNewsFunctionDeclaration,
            getNewsWithSentimentFunctionDeclaration
        ],
    },
});
exports.generativeModel = generativeModel;

async function handleFunctionCalls(result, chat) {
    const functionCallsLength = result?.response?.functionCalls()?.length || 0;
    if (functionCallsLength === 0) {
        throw Error("LLM is experiencing problems, check quotas");
    }
    for (let i = 0; i < functionCallsLength; i++) {
        const call = result.response.functionCalls()[0];
        if (call) {
            try {
                const apiResponse = await apiServicesFunctions[call.name](call.args);
                result = await chat.sendMessage([{
                    functionResponse: {
                        name: call.name,
                        response: typeof apiResponse === 'string' ? JSON.parse(apiResponse) : apiResponse
                    }
                }]);
            } catch (error) {
                console.error(`Error executing API call: ${error.message}`);

            }
        }
    }
    return result;
}
exports.handleFunctionCalls = handleFunctionCalls;

