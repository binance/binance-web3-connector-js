import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function buildSolanaSwapInstructions() {
    try {
        const response = await client.restAPI.buildSolanaSwapInstructions({
            binanceChainId: Web3WalletRestAPI.BuildSolanaSwapInstructionsBinanceChainIdEnum.CT_501,
            amount: '12000000',
            fromTokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            toTokenAddress: 'So11111111111111111111111111111111111111112',
            slippagePercent: '0.5',
            userWalletAddress: 'J5CBzXpcYn6WR2JBah8zU4Yxct985CAFGwXRcFaX2pbS',
            quoteId: 'a1b2c3d4e5f64a8b9c0d1e2f3a4b5c6d',
        });

        const rateLimits = response.rateLimits!;
        console.log('buildSolanaSwapInstructions() rate limits:', rateLimits);

        const data = await response.data();
        console.log('buildSolanaSwapInstructions() response:', data);
    } catch (error) {
        console.error('buildSolanaSwapInstructions() error:', error);
    }
}

buildSolanaSwapInstructions();
