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

        const prompt1 = "How much is the price of MSFT stock? ";
        console.log(prompt1 + '\n');
        let result1 = await chat.sendMessage(prompt1);
        await handleFunctionCalls(result1, chat);

        const  prompt2 = "What are the latest developments from their competitors?";
        console.log(prompt2 + '\n');
        const result2 = await chat.sendMessage(prompt2);
        await handleFunctionCalls(result2, chat);
    } catch (error) {
        console.error(`Error in main function: ${error.message}, exiting`);
        // TODO  adding more robust error handling, such as retry logic or
        // specific error messages to the user.
        process.exit(1); // Exit the process on error.
    }
};

main().catch((error) => {
    console.error(`Unhandled error: ${error.message}`);
    process.exit(1);
});



