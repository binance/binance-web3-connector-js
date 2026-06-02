import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getAggregatedQuote() {
    try {
        const response = await client.restAPI.getAggregatedQuote({
            binanceChainId: '56',
            amount: '1000000',
            fromTokenAddress: '0x55d398326f99059fF775485246999027B3197955',
            toTokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        });

        const rateLimits = response.rateLimits!;
        console.log('getAggregatedQuote() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getAggregatedQuote() response:', data);
    } catch (error) {
        console.error('getAggregatedQuote() error:', error);
    }
}

getAggregatedQuote();
