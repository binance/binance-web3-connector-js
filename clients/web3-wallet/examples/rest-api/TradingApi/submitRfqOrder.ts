import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function submitRfqOrder() {
    try {
        const response = await client.restAPI.submitRfqOrder({
            requestId: 'requestId_example',
            userSignature: 'userSignature_example',
            vendor: Web3WalletRestAPI.SubmitRfqOrderVendorEnum.vendor_example,
            quoteId: 'quoteId_example',
        });

        const rateLimits = response.rateLimits!;
        console.log('submitRfqOrder() rate limits:', rateLimits);

        const data = await response.data();
        console.log('submitRfqOrder() response:', data);
    } catch (error) {
        console.error('submitRfqOrder() error:', error);
    }
}

submitRfqOrder();
