import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function searchToken() {
    try {
        const response = await client.restAPI.searchToken({
            chains: '1,56,CT_501',
            search: 'USDT',
        });

        const rateLimits = response.rateLimits!;
        console.log('searchToken() rate limits:', rateLimits);

        const data = await response.data();
        console.log('searchToken() response:', data);
    } catch (error) {
        console.error('searchToken() error:', error);
    }
}

searchToken();
