# Reconnect Delay Configuration

```typescript
import { Web3Wallet, Web3WalletWebsocketStreams, WEB3_WALLET_WS_STREAMS_PROD_URL } from '@binance-web3/wallet';

const configurationWebsocketStreams = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    wsURL: WEB3_WALLET_WS_STREAMS_PROD_URL,
    reconnectDelay: 3000, // Set reconnect delay to 3 seconds
};
const client = new Web3Wallet({ configurationWebsocketStreams });

client.websocketStreams
    .connect()
    .then((connection: SpotWebsocketStreams.WebsocketStreamsConnection) => {
        const stream = connection.aggTrade({ symbol: 'BNBUSDT' });
        stream.on('message', (data: SpotWebsocketStreams.AggTradeResponse) => console.info(data));
    })
    .catch((err) => console.error(err));
```
