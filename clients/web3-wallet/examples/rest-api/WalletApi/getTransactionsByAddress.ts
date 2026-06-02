import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTransactionsByAddress() {
    try {
        const response = await client.restAPI.getTransactionsByAddress({
            address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            chains: '1,56',
        });

        const rateLimits = response.rateLimits!;
        console.log('getTransactionsByAddress() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTransactionsByAddress() response:', data);
    } catch (error) {
        console.error('getTransactionsByAddress() error:', error);
    }
}

getTransactionsByAddress();
