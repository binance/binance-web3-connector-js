import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getDeFiPositions() {
    try {
        const response = await client.restAPI.getDeFiPositions({
            addresses: ['null'],
        });

        const rateLimits = response.rateLimits!;
        console.log('getDeFiPositions() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getDeFiPositions() response:', data);
    } catch (error) {
        console.error('getDeFiPositions() error:', error);
    }
}

getDeFiPositions();
