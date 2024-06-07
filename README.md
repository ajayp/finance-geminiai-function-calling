### Leveraging Function Calling with Google Gemini API

This project demonstrates function calling with the Google Gemini API. It provides custom functions to interact with financial APIs, retrieving real-time stock prices, company overviews, news headlines, and sentiment analysis. Gemini can call these functions based on user queries, enhancing its capabilities within conversations.

#### What is Function Calling?

Function calling is a powerful feature that allows Gemini to interact with external code and tools. Instead of being limited to just generating text, Gemini can now call custom functions written in various programming languages, like Python. This enables the model to perform complex actions, access data, and complete tasks beyond its core language capabilities.

#### How it works

1. User provides functions: The user defines functions that perform specific actions, providing the code for Gemini to access. These functions could be simple calculations, accessing APIs, or interacting with databases.
2. Gemini identifies actions: When processing a query, Gemini identifies parts where a function call is necessary to complete the task. This could be based on the query itself, context, or even user-specified instructions.
3. Structured data output: Instead of directly executing the function, Gemini generates structured data output that contains:
   - Function name: The name of the function to be called.
   - Arguments: The specific values (or suggestions) to pass as input to the function.
4. External execution: This output is then processed by a separate system or environment that can execute the function based on the provided information. The results of the function call are then relayed back to Gemini to be incorporated into its final response.

#### Use Cases for Function Calling

1. **Automated Financial Data Retrieval:**
   - Developers can create custom functions that interact with financial APIs (such as Alpha Vantage and Polygon) to retrieve real-time stock prices, historical data, company overviews, and news headlines.
   - Gemini can call these functions based on user queries, providing relevant financial information without leaving the conversation.

2. **Dynamic Currency Conversion:**
   - Suppose a user wants to convert an amount from one currency to another. By defining a `getExchangeRate` function, Gemini can calculate the exchange rate and perform the conversion seamlessly.
   - Example query: "Convert 100 USD to EUR."

3. **Sentiment Analysis Integration:**
   - A sentiment analysis API can be integrated into Gemini using a custom function. When discussing a specific stock or company, Gemini can call this function to provide sentiment scores based on recent news articles.
   - Example query: "What is the sentiment around Tesla stock?"

4. **Interactive Financial Planning:**
   - Gemini can guide users through financial planning scenarios by calling functions related to investment strategies, risk assessment, and portfolio diversification.
   - Example query: "What would happen if I invested 10% more in tech stocks?"

#### Functions in the code

Code consists of several functions:

- `getExchangeRate`: Get the exchange rate for currencies between countries.
- `getStockPrice`: Fetch the current stock price of a given company.
- `getCompanyOverview`: Get company details and other financial data.
- `getCompanyNews`: Get the latest news headlines for a given company.
- `getNewsWithSentiment`: Gets live and historical market news and sentiment data.

#### Function Calling with Prompts

The function calling capability allows Gemini to not only execute functions based on prompts but also maintain context throughout a conversation.

Example:

```javascript
// Prompt 1:
let prompt = "How much is the price of Microsoft stock?";
let result = await chat.sendMessage(prompt);
await handleFunctionCalls(result, chat);
console.log(result.response.text() + '\n');

// Prompt 2:
prompt = "What are the latest developments from their competitors?";
result = await chat.sendMessage(prompt);
await handleFunctionCalls(result, chat);
console.log(result.response.text() + '\n');
```
**Explanation:**

**Prompt 1:**
* **How much is the price of Microsoft stock?** - triggers Gemini to call the `getStockPrice` function. Gemini identifies the intent of the prompt and determines that the ticker symbol "MSFT" is required. This results in the following function call:

```json
[{"name":"getStockPrice","args":{"ticker":"MSFT"}}]
```
* **Response:** `The current price of MSFT is 278.14`

**Prompt 2:**
* **What are the latest developments from their competitors?** - leverages the context established in the previous prompt. Gemini recognizes that the "company" refers to Microsoft (MSFT) and executes the following function call:

```json
[{"name":"getCompanyNews","args":{"ticker":"MSFT"}}]
```

* **Response:** `The latest news headlines I found about MSFT competitors include:`

#### Prerequisites

To use these functions, you need to obtain API keys for Alpha Vantage, Polygon, and Google Gemini.

- [Alpha Vantage API Key](https://www.alphavantage.co/support/#api-key)
- [Polygon API Key](https://polygon.io/dashboard/api-keys)
- [Google Gemini API Key](https://aistudio.google.com/app/apikey)

Set these keys as environment variables: `ALPHA_VANTAGE_API_KEY`, `POLYGON_API_KEY`, and `GEMINI_API_KEY`.

This project demonstrates the use of different APIs for data retrieval and analysis. Specifically, it utilizes the Polygon API to showcase an alternative to Alpha Vantage.

_Note - Alpha Vantage API has rate limits that restrict the number of requests per day, and using a different key will not work unless your IP address is changed._

#### Installation

Before running the code, install the required dependencies using npm:

```bash
npm install
```

#### Usage

```bash
node main.js
```

### Integration Tests

Here are the integration tests that mimic the main function calls:

To run the tests, use the following command:

```sh
npx jest
```
