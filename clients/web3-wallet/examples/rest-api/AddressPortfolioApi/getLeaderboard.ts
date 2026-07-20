import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getLeaderboard() {
    try {
        const response = await client.restAPI.getLeaderboard({
            binanceChainId: '1',
            timeFrame: Web3WalletRestAPI.GetLeaderboardTimeFrameEnum.TIME_FRAME_1,
            sortBy: Web3WalletRestAPI.GetLeaderboardSortByEnum.SORT_BY_1,
        });

        const rateLimits = response.rateLimits!;
        console.log('getLeaderboard() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getLeaderboard() response:', data);
    } catch (error) {
        console.error('getLeaderboard() error:', error);
    }
}

getLeaderboard();
