import { Web3Wallet, Web3WalletRestAPI, WEB3_WALLET_REST_API_PROD_URL } from '../../../src';

const configurationRestAPI = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    basePath: process.env.BASE_PATH ?? WEB3_WALLET_REST_API_PROD_URL,
};
const client = new Web3Wallet({ configurationRestAPI });

async function listDeFiInvestments() {
    try {
        const response = await client.restAPI.listDeFiInvestments({
            investType: Web3WalletRestAPI.ListDeFiInvestmentsInvestTypeEnum.investType_example,
        });

        const rateLimits = response.rateLimits!;
        console.log('listDeFiInvestments() rate limits:', rateLimits);

        const data = await response.data();
        console.log('listDeFiInvestments() response:', data);
    } catch (error) {
        console.error('listDeFiInvestments() error:', error);
    }
}

listDeFiInvestments();
