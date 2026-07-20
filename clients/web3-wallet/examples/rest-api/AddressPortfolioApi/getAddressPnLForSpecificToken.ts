import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getAddressPnLForSpecificToken() {
    try {
        const response = await client.restAPI.getAddressPnLForSpecificToken({
            binanceChainId: '1',
            walletAddress: '0x28c6c06298d514db089934071355e5743bf21d60',
            tokenContractAddress: '0x6982508145454ce325ddbe47a25d4ec3d2311933',
        });

        const rateLimits = response.rateLimits!;
        console.log('getAddressPnLForSpecificToken() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getAddressPnLForSpecificToken() response:', data);
    } catch (error) {
        console.error('getAddressPnLForSpecificToken() error:', error);
    }
}

getAddressPnLForSpecificToken();
