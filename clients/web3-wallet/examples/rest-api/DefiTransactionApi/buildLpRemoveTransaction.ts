import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function buildLpRemoveTransaction() {
    try {
        const response = await client.restAPI.buildLpRemoveTransaction({
            address: 'address_example',
            investmentId: 'investmentId_example',
            nftId: 'nftId_example',
            ratio: 'ratio_example',
        });

        const rateLimits = response.rateLimits!;
        console.log('buildLpRemoveTransaction() rate limits:', rateLimits);

        const data = await response.data();
        console.log('buildLpRemoveTransaction() response:', data);
    } catch (error) {
        console.error('buildLpRemoveTransaction() error:', error);
    }
}

buildLpRemoveTransaction();
