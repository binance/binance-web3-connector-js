import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function buildLpAddTransaction() {
    try {
        const response = await client.restAPI.buildLpAddTransaction({
            address: 'address_example',
            investmentId: 'investmentId_example',
            tokenList: [],
        });

        const rateLimits = response.rateLimits!;
        console.log('buildLpAddTransaction() rate limits:', rateLimits);

        const data = await response.data();
        console.log('buildLpAddTransaction() response:', data);
    } catch (error) {
        console.error('buildLpAddTransaction() error:', error);
    }
}

buildLpAddTransaction();
