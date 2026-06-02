import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function buildSwapTransaction() {
    try {
        const response = await client.restAPI.buildSwapTransaction({
            binanceChainId: '56',
            amount: '1000000',
            fromTokenAddress: '0x55d398326f99059fF775485246999027B3197955',
            toTokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            slippagePercent: '0.5',
            userWalletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            quoteId: 'a1b2c3d4e5f64a8b9c0d1e2f3a4b5c6d',
        });

        const rateLimits = response.rateLimits!;
        console.log('buildSwapTransaction() rate limits:', rateLimits);

        const data = await response.data();
        console.log('buildSwapTransaction() response:', data);
    } catch (error) {
        console.error('buildSwapTransaction() error:', error);
    }
}

buildSwapTransaction();
