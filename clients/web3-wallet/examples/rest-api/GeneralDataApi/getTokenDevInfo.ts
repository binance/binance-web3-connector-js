import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTokenDevInfo() {
    try {
        const response = await client.restAPI.getTokenDevInfo({
            binanceChainId: 'CT_501',
            tokenContractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        });

        const rateLimits = response.rateLimits!;
        console.log('getTokenDevInfo() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTokenDevInfo() response:', data);
    } catch (error) {
        console.error('getTokenDevInfo() error:', error);
    }
}

getTokenDevInfo();
