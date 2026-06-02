import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTokenBalancesByAddress() {
    try {
        const response = await client.restAPI.getTokenBalancesByAddress({
            address: 'address_example',
            tokenContractAddresses: [],
        });

        const rateLimits = response.rateLimits!;
        console.log('getTokenBalancesByAddress() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTokenBalancesByAddress() response:', data);
    } catch (error) {
        console.error('getTokenBalancesByAddress() error:', error);
    }
}

getTokenBalancesByAddress();
