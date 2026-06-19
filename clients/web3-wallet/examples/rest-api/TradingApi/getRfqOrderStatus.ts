import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getRfqOrderStatus() {
    try {
        const response = await client.restAPI.getRfqOrderStatus({
            orderId: 'oc-o-abc123def456',
        });

        const rateLimits = response.rateLimits!;
        console.log('getRfqOrderStatus() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getRfqOrderStatus() response:', data);
    } catch (error) {
        console.error('getRfqOrderStatus() error:', error);
    }
}

getRfqOrderStatus();
