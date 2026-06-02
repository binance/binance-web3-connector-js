import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function broadcastTransactions() {
    try {
        const response = await client.restAPI.broadcastTransactions({
            binanceChainId: 'binanceChainId_example',
            signedTransaction: 'signedTransaction_example',
            address: 'address_example',
        });

        const rateLimits = response.rateLimits!;
        console.log('broadcastTransactions() rate limits:', rateLimits);

        const data = await response.data();
        console.log('broadcastTransactions() response:', data);
    } catch (error) {
        console.error('broadcastTransactions() error:', error);
    }
}

broadcastTransactions();
