const { makeApiRequest } = require('../request');

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

async function getStockPriceFromApi(ticker) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
    return await makeApiRequest(url);
}
exports.getStockPriceFromApi = getStockPriceFromApi;

async function getCompanyOverviewFromApi(ticker) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
    return await makeApiRequest(url);
}
exports.getCompanyOverviewFromApi = getCompanyOverviewFromApi;

async function getCompanyNewsFromApi(ticker) {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&limit=20&sort=RELEVANCE&apikey=${apiKey}`;
    return await makeApiRequest(url);
}
exports.getCompanyNewsFromApi = getCompanyNewsFromApi;

async function getNewsWithSentimentFromApi(newsTopic) {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${newsTopic}&limit=20&sort=RELEVANCE&apikey=${apiKey}`;
    return await makeApiRequest(url);
}
exports.getNewsWithSentimentFromApi = getNewsWithSentimentFromApi;

async function getCurrencyConversionFromAPI(currencyFrom, currencyTo,) {
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyFrom}&to_currency=${currencyTo}&apikey=${apiKey}`;
    return await makeApiRequest(url);
}
exports.getCurrencyConversionFromAPI = getCurrencyConversionFromAPI;
