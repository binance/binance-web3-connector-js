import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function buildDeFiDepositTransaction() {
    try {
        const response = await client.restAPI.buildDeFiDepositTransaction({
            address: 'address_example',
            investmentId: 'investmentId_example',
            token: {} as Web3WalletRestAPI.BuildDeFiDepositTransactionRequestToken,
        });

        const rateLimits = response.rateLimits!;
        console.log('buildDeFiDepositTransaction() rate limits:', rateLimits);

        const data = await response.data();
        console.log('buildDeFiDepositTransaction() response:', data);
    } catch (error) {
        console.error('buildDeFiDepositTransaction() error:', error);
    }
}

buildDeFiDepositTransaction();
