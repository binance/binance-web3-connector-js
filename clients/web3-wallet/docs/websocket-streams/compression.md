# Compression Configuration

```typescript
import { Web3Wallet, Web3WalletWebsocketStreams, WEB3_WALLET_WS_STREAMS_PROD_URL } from '@binance-web3/wallet';

const configurationWebsocketStreams = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    wsURL: WEB3_WALLET_WS_STREAMS_PROD_URL,
    compression: false, // Disable compression
};
const client = new Web3Wallet({ configurationWebsocketStreams });

client.websocketStreams.connect().then(console.log).catch(console.error);
```
