import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function settleB402PaymentV1() {
    try {
        const response = await client.restAPI.settleB402PaymentV1({
            body: {} as Web3WalletRestAPI.B402SettleEnvelopeV1Body,
        });

        const rateLimits = response.rateLimits!;
        console.log('settleB402PaymentV1() rate limits:', rateLimits);

        const data = await response.data();
        console.log('settleB402PaymentV1() response:', data);
    } catch (error) {
        console.error('settleB402PaymentV1() error:', error);
    }
}

settleB402PaymentV1();
