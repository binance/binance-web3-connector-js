import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTransactionStatus() {
    try {
        const response = await client.restAPI.getTransactionStatus({
            binanceChainId: '56',
            txHash: '0xabc123def4567890abc123def4567890abc123def4567890abc123def4567890',
        });

        const rateLimits = response.rateLimits!;
        console.log('getTransactionStatus() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTransactionStatus() response:', data);
    } catch (error) {
        console.error('getTransactionStatus() error:', error);
    }
}

getTransactionStatus();
