import { Web3Wallet, Web3WalletWebsocketStreams, WEB3_WALLET_WS_STREAMS_PROD_URL } from '../../src';

const configurationWebsocketStreams = {
    apiKey: process.env.API_KEY ?? '',
    apiSecret: process.env.API_SECRET ?? '',
    wsURL: process.env.WS_STREAMS_URL ?? WEB3_WALLET_WS_STREAMS_PROD_URL,
};
const client = new Web3Wallet({ configurationWebsocketStreams });

async function marketStatsStream() {
    let connection: Web3WalletWebsocketStreams.WebsocketStreamsConnection | undefined;

    try {
        connection = await client.websocketStreams.connect();

        const stream = connection.marketStatsStream({
            chainId: 'CT_501',
            contractAddress: 'C3DwDjT17gDvvCYC2nsdGHxDHVmQRdhKfpAdqQ29pump',
        });

        stream.on('message', (data) => {
            console.info(data);
        });
    } catch (error) {
        console.error(error);
    } finally {
        // disconnect after 20 seconds
        setTimeout(async () => await connection!.disconnect(), 20000);
    }
}

marketStatsStream();
