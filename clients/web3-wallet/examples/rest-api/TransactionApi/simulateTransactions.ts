import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function simulateTransactions() {
    try {
        const response = await client.restAPI.simulateTransactions({
            binanceChainId: 'binanceChainId_example',
        });

        const rateLimits = response.rateLimits!;
        console.log('simulateTransactions() rate limits:', rateLimits);

        const data = await response.data();
        console.log('simulateTransactions() response:', data);
    } catch (error) {
        console.error('simulateTransactions() error:', error);
    }
}

simulateTransactions();
