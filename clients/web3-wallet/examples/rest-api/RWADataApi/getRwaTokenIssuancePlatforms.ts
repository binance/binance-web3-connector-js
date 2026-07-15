import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getRwaTokenIssuancePlatforms() {
    try {
        const response = await client.restAPI.getRwaTokenIssuancePlatforms();

        const rateLimits = response.rateLimits!;
        console.log('getRwaTokenIssuancePlatforms() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getRwaTokenIssuancePlatforms() response:', data);
    } catch (error) {
        console.error('getRwaTokenIssuancePlatforms() error:', error);
    }
}

getRwaTokenIssuancePlatforms();
