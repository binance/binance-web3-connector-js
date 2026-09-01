import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function verifyB402PaymentV1() {
    try {
        const response = await client.restAPI.verifyB402PaymentV1({
            body: {} as Web3WalletRestAPI.VerifyB402PaymentV1RequestBody,
        });

        const rateLimits = response.rateLimits!;
        console.log('verifyB402PaymentV1() rate limits:', rateLimits);

        const data = await response.data();
        console.log('verifyB402PaymentV1() response:', data);
    } catch (error) {
        console.error('verifyB402PaymentV1() error:', error);
    }
}

verifyB402PaymentV1();
