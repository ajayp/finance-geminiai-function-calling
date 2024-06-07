
const { generativeModel } = require('../llm');

jest.setTimeout(30000);

describe('main function integration tests', () => {

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  test('should handle stock price query correctly', async () => {

    const chat = generativeModel.startChat();
    const prompt = "What is the most recent price of microsoft stock?";
    const resp = await chat.sendMessage(prompt);
    expect(resp.response.functionCalls()[0].name).toEqual('getStockPrice');
    expect(resp.response.functionCalls()[0].args.ticker).toEqual('MSFT');
  });

  test('should handle competitor news query correctly', async () => {
    await delay(1000); //due to quotas
    const chat = generativeModel.startChat();
    const prompt = "What are the latest developments from MSFT's competitors?";
    const resp = await chat.sendMessage(prompt);
    expect(resp.response.functionCalls()[0].name).toEqual('getNewsWithSentiment');
    expect(resp.response.functionCalls()[0].args.newsTopic).toEqual('competitors');
  });

  test('should handle currency conversion query correctly', async () => {
    await delay(1000);
    const chat = generativeModel.startChat();
    const prompt = "What is the FX rate between the USD and EUR?";
    const resp = await chat.sendMessage(prompt);
    expect(resp.response.functionCalls()[0].name).toEqual('getExchangeRate');
    expect(resp.response.functionCalls()[0].args.currencyFrom).toEqual('USD');
    expect(resp.response.functionCalls()[0].args.currencyTo).toEqual('EUR');
  });
});
