import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getLeaderboardList() {
    try {
        const response = await client.restAPI.getLeaderboardList({
            binanceChainId: '1',
            timeFrame: Web3WalletRestAPI.GetLeaderboardListTimeFrameEnum.TIME_FRAME_1,
            sortBy: Web3WalletRestAPI.GetLeaderboardListSortByEnum.SORT_BY_1,
        });

        const rateLimits = response.rateLimits!;
        console.log('getLeaderboardList() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getLeaderboardList() response:', data);
    } catch (error) {
        console.error('getLeaderboardList() error:', error);
    }
}

getLeaderboardList();
