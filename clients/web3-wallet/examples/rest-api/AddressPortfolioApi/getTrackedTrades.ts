import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getTrackedTrades() {
    try {
        const response = await client.restAPI.getTrackedTrades({
            trackerType: Web3WalletRestAPI.GetTrackedTradesTrackerTypeEnum.TRACKER_TYPE_1,
        });

        const rateLimits = response.rateLimits!;
        console.log('getTrackedTrades() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getTrackedTrades() response:', data);
    } catch (error) {
        console.error('getTrackedTrades() error:', error);
    }
}

getTrackedTrades();
