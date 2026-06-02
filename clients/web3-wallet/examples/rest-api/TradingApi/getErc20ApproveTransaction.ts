import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getErc20ApproveTransaction() {
    try {
        const response = await client.restAPI.getErc20ApproveTransaction({
            binanceChainId: '1',
            tokenContractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            approveAmount: '1000000',
        });

        const rateLimits = response.rateLimits!;
        console.log('getErc20ApproveTransaction() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getErc20ApproveTransaction() response:', data);
    } catch (error) {
        console.error('getErc20ApproveTransaction() error:', error);
    }
}

getErc20ApproveTransaction();
