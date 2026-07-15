import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getRwaUnderlyingInfo() {
    try {
        const response = await client.restAPI.getRwaUnderlyingInfo({
            binanceChainId: '56',
            tokenContractAddress: '0x8755c5c39b1aa9053a83ac731242a2cf4d04b0fe',
        });

        const rateLimits = response.rateLimits!;
        console.log('getRwaUnderlyingInfo() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getRwaUnderlyingInfo() response:', data);
    } catch (error) {
        console.error('getRwaUnderlyingInfo() error:', error);
    }
}

getRwaUnderlyingInfo();
