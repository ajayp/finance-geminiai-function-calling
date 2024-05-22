const { handleFunctionCalls, generativeModel } = require("./llm");

async function main() {
    try {
        const chat = generativeModel.startChat();

        let prompt = "How much is the price of MSFT stock? ";
        let result = await chat.sendMessage(prompt);
        result = await handleFunctionCalls(result, chat);
        console.log(result.response.text() + '\n');

        prompt = "Market news about the company?";
        result = await chat.sendMessage(prompt);
        result = await handleFunctionCalls(result, chat);
        console.log(result.response.text() + '\n');
    } catch (error) {
        console.error(`Error in main function: ${error.message}, exiting`);
    }
};

main().catch((error) => {
    console.error(`Unhandled error: ${error.message}`);
    process.exit(1);
});



