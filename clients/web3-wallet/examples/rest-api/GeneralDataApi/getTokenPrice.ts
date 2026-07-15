import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTokenPrice() {
    try {
        const response = await client.restAPI.getTokenPrice();

        const rateLimits = response.rateLimits!;
        console.log('getTokenPrice() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTokenPrice() response:', data);
    } catch (error) {
        console.error('getTokenPrice() error:', error);
    }
}

getTokenPrice();
