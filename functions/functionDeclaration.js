const { getCurrencyConversionFromAPI, getCompanyOverviewFromApi,
     getCompanyNewsFromApi, getNewsWithSentimentFromApi, getStockPriceFromApi } = require('../APIs/vantage');
// const { getStockPriceFromApi } = require('../APIs/polygon');

const apiServicesFunctions = {
    getExchangeRate: ({ currencyFrom, currencyTo }) => getCurrencyConversionFromAPI(currencyFrom, currencyTo),
    getStockPrice: ({ ticker }) => getStockPriceFromApi(ticker),
    getCompanyOverview: ({ ticker }) => getCompanyOverviewFromApi(ticker),
    getCompanyNews: ({ ticker }) => getCompanyNewsFromApi(ticker),
    getNewsWithSentiment: ({ newsTopic }) => getNewsWithSentimentFromApi(newsTopic),
};

module.exports = {
    apiServicesFunctions,
    getCompanyOverviewFunctionDeclaration: {
        name: "getCompanyOverview",
        description: "Get company details and other financial data",
        parameters: {
            type: "object",
            properties: {
                ticker: {
                    type: "string",
                    description: "Stock ticker symbol for a company",
                },
            },
            required: ["ticker"],
        },
    },
    getCompanyNewsFunctionDeclaration: {
        name: "getCompanyNews",
        description: "Get the latest news headlines for a given company",
        parameters: {
            type: "object",
            properties: {
                ticker: {
                    type: "string",
                    description: "Stock ticker symbol for a company",
                }
            },
            required: ["ticker"],
        },
    },
    getNewsWithSentimentFunctionDeclaration: {
        name: "getNewsWithSentiment",
        description: "Returns live and historical market news and sentiment data",
        parameters: {
            type: "object",
            properties: {
                newsTopic: {
                    type: "string",
                    description: "News topic to learn about. Supported topics include competitors, earnings, ipo, mergers and acquisitions, financial markets, economy fiscal, economy monetary, economy macro, energy transportation, finance, life sciences, manufacturing, real estate, retail wholesale, and technology",
                },
            },
            required: ["newsTopic"],
        },
    },
    getStockPriceFunctionDeclaration: {
        name: "getStockPrice",
        description: "Return the current stock price of a given company",
        parameters: {
            type: "object",
            properties: {
                ticker: {
                    type: "string",
                    description: "Stock ticker symbol for a company",
                },
            },
            required: ["ticker"],
        },
    },
    getExchangeRateFunctionDeclaration: {
        name: "getExchangeRate",
        description: "Get the exchange rate for currencies between countries",
        parameters: {
            type: "object",
            properties: {
                currencyFrom: {
                    type: "string",
                    description: "The currency to convert from.",
                },
                currencyTo: {
                    type: "string",
                    description: "The currency to convert to.",
                },
            },
            required: ["currencyTo", "currencyFrom"],
        },
    },
};
