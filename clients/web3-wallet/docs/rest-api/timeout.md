# Timeout

```typescript
import { Web3Wallet, Web3WalletRestAPI } from '@binance-web3/wallet';

const configurationRestAPI = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    timeout: 5000,
};
const client = new Web3Wallet({ configurationRestAPI });

client.restAPI.getPriceInfo().catch((error) => console.error(error));
```
