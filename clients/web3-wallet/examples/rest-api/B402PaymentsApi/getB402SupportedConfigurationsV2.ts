import { Web3Wallet, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getB402SupportedConfigurationsV2() {
    try {
        const response = await client.restAPI.getB402SupportedConfigurationsV2({
            body: Object,
        });

        const rateLimits = response.rateLimits!;
        console.log('getB402SupportedConfigurationsV2() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getB402SupportedConfigurationsV2() response:', data);
    } catch (error) {
        console.error('getB402SupportedConfigurationsV2() error:', error);
    }
}

getB402SupportedConfigurationsV2();
