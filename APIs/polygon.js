const { makeApiRequest } = require('../request');
const apiKey = process.env.POLYGON_API_KEY;

async function getStockPriceFromApi(ticker='') {
    const url = `https://api.polygon.io/v3/reference/tickers?ticker=${ticker}&active=true&limit=100&apiKey=${apiKey}`;
    return await makeApiRequest(url);
}
exports.getStockPriceFromApi = getStockPriceFromApi;
