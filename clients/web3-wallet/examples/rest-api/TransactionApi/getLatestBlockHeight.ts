import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getLatestBlockHeight() {
    try {
        const response = await client.restAPI.getLatestBlockHeight({
            binanceChainId: '1',
        });

        const rateLimits = response.rateLimits!;
        console.log('getLatestBlockHeight() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getLatestBlockHeight() response:', data);
    } catch (error) {
        console.error('getLatestBlockHeight() error:', error);
    }
}

getLatestBlockHeight();
