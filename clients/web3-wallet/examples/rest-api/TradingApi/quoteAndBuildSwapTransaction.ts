import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function quoteAndBuildSwapTransaction() {
    try {
        const response = await client.restAPI.quoteAndBuildSwapTransaction({
            binanceChainId: '56',
            amount: '1000000',
            fromTokenAddress: '0x55d398326f99059fF775485246999027B3197955',
            toTokenAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            userWalletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
            vendor: Web3WalletRestAPI.QuoteAndBuildSwapTransactionVendorEnum.LiquidMesh,
        });

        const rateLimits = response.rateLimits!;
        console.log('quoteAndBuildSwapTransaction() rate limits:', rateLimits);

        const data = await response.data();
        console.log('quoteAndBuildSwapTransaction() response:', data);
    } catch (error) {
        console.error('quoteAndBuildSwapTransaction() error:', error);
    }
}

quoteAndBuildSwapTransaction();
