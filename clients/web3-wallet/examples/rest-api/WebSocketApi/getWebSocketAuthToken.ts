import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getWebSocketAuthToken() {
    try {
        const response = await client.restAPI.getWebSocketAuthToken();

        const rateLimits = response.rateLimits!;
        console.log('getWebSocketAuthToken() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getWebSocketAuthToken() response:', data);
    } catch (error) {
        console.error('getWebSocketAuthToken() error:', error);
    }
}

getWebSocketAuthToken();
