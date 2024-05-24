const { handleFunctionCalls, generativeModel } = require('./llm');

/**
 * Main function to demonstrate interaction with the Gemini model.
 *
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
    try {
         // Start a new chat session with the Gemini model.
        const chat = generativeModel.startChat();

        const msftStockPricePrompt = "What is the most recent price of MSFT stock? ";
        console.log(msftStockPricePrompt + '\n');
        const stockPriceResult = await chat.sendMessage(msftStockPricePrompt);
        await handleFunctionCalls(stockPriceResult, chat);

        const  competitorNewsPrompt = "What are the latest developments from their competitors?";
        console.log(competitorNewsPrompt + '\n');
        const competitorNewsResult = await chat.sendMessage(competitorNewsPrompt);
        await handleFunctionCalls(competitorNewsResult, chat);
    } catch (error) {
        console.error(`Error in main function: ${error.message}, exiting`);
        // TODO  adding more robust error handling, such as retry logic or
        // specific error messages to the user.
        process.exit(1);
    }
};

main().catch((error) => {
    console.error(`Unhandled error: ${error.message}`);
    process.exit(1);
});



