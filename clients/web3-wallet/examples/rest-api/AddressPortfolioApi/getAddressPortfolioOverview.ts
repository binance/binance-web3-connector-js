import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function getAddressPortfolioOverview() {
    try {
        const response = await client.restAPI.getAddressPortfolioOverview({
            binanceChainId: '1',
            walletAddress: '0x28c6c06298d514db089934071355e5743bf21d60',
            timeFrame: Web3WalletRestAPI.GetAddressPortfolioOverviewTimeFrameEnum.TIME_FRAME_1,
        });

        const rateLimits = response.rateLimits!;
        console.log('getAddressPortfolioOverview() rate limits:', rateLimits);

        const data = await response.data();
        console.log('getAddressPortfolioOverview() response:', data);
    } catch (error) {
        console.error('getAddressPortfolioOverview() error:', error);
    }
}

getAddressPortfolioOverview();
