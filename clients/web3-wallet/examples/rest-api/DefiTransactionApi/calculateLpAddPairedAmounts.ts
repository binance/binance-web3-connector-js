import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function calculateLpAddPairedAmounts() {
    try {
        const response = await client.restAPI.calculateLpAddPairedAmounts({
            address: 'address_example',
            investmentId: 'investmentId_example',
            inputToken: {} as Web3WalletRestAPI.BuildDeFiDepositTransactionRequestToken,
        });

        const rateLimits = response.rateLimits!;
        console.log('calculateLpAddPairedAmounts() rate limits:', rateLimits);

        const data = await response.data();
        console.log('calculateLpAddPairedAmounts() response:', data);
    } catch (error) {
        console.error('calculateLpAddPairedAmounts() error:', error);
    }
}

calculateLpAddPairedAmounts();
