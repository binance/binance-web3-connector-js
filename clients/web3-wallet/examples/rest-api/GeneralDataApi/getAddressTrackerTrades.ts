import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getAddressTrackerTrades() {
    try {
        const response = await client.restAPI.getAddressTrackerTrades({
            trackerType: Web3WalletRestAPI.GetAddressTrackerTradesTrackerTypeEnum.TRACKER_TYPE_1,
        });

        const rateLimits = response.rateLimits!;
        console.log('getAddressTrackerTrades() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getAddressTrackerTrades() response:', data);
    } catch (error) {
        console.error('getAddressTrackerTrades() error:', error);
    }
}

getAddressTrackerTrades();
