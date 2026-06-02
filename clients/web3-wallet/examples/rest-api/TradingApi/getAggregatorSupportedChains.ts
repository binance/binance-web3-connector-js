import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getAggregatorSupportedChains() {
    try {
        const response = await client.restAPI.getAggregatorSupportedChains();

        const rateLimits = response.rateLimits!;
        console.log('getAggregatorSupportedChains() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getAggregatorSupportedChains() response:', data);
    } catch (error) {
        console.error('getAggregatorSupportedChains() error:', error);
    }
}

getAggregatorSupportedChains();
