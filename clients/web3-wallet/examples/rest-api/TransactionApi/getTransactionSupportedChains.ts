import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTransactionSupportedChains() {
    try {
        const response = await client.restAPI.getTransactionSupportedChains();

        const rateLimits = response.rateLimits!;
        console.log('getTransactionSupportedChains() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTransactionSupportedChains() response:', data);
    } catch (error) {
        console.error('getTransactionSupportedChains() error:', error);
    }
}

getTransactionSupportedChains();
