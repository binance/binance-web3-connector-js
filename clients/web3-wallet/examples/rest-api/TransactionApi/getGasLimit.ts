import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getGasLimit() {
    try {
        const response = await client.restAPI.getGasLimit({
            binanceChainId: 'binanceChainId_example',
            evmTx: {} as Web3WalletRestAPI.GetGasLimitRequestEvmTx,
            solTx: {} as Web3WalletRestAPI.GetGasLimitRequestSolTx,
        });

        const rateLimits = response.rateLimits!;
        console.log('getGasLimit() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getGasLimit() response:', data);
    } catch (error) {
        console.error('getGasLimit() error:', error);
    }
}

getGasLimit();
