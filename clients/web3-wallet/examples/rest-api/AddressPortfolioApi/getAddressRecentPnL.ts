import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getAddressRecentPnL() {
    try {
        const response = await client.restAPI.getAddressRecentPnL({
            binanceChainId: '1',
            walletAddress: '0x28c6c06298d514db089934071355e5743bf21d60',
        });

        const rateLimits = response.rateLimits!;
        console.log('getAddressRecentPnL() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getAddressRecentPnL() response:', data);
    } catch (error) {
        console.error('getAddressRecentPnL() error:', error);
    }
}

getAddressRecentPnL();
