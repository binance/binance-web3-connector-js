import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function verifyB402PaymentV2() {
    try {
        const response = await client.restAPI.verifyB402PaymentV2({
            body: {} as Web3WalletRestAPI.VerifyB402PaymentV2RequestBody,
        });

        const rateLimits = response.rateLimits!;
        console.log('verifyB402PaymentV2() rate limits:', rateLimits);

        const data = await response.data();
        console.log('verifyB402PaymentV2() response:', data);
    } catch (error) {
        console.error('verifyB402PaymentV2() error:', error);
    }
}

verifyB402PaymentV2();
