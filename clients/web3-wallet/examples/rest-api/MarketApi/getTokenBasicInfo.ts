import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTokenBasicInfo() {
    try {
        const response = await client.restAPI.getTokenBasicInfo({
            binanceChainId: '1',
            tokenContractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        });

        const rateLimits = response.rateLimits!;
        console.log('getTokenBasicInfo() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTokenBasicInfo() response:', data);
    } catch (error) {
        console.error('getTokenBasicInfo() error:', error);
    }
}

getTokenBasicInfo();
