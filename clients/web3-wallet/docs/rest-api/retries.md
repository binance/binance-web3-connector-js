# Retries Configuration

```typescript
import { Web3Wallet, Web3WalletRestAPI } from '@binance-web3/wallet';

const configurationRestAPI = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    retries: 5, // Retry up to 5 times
    backoff: 2000, // 2 seconds between retries
};
const client = new Web3Wallet({ configurationRestAPI });

client.restAPI
    .getPriceInfo()
    .then((res) => res.data())
    .then((data: Web3WalletRestAPI.GetPriceInfoResponse) => console.log(data))
    .catch((err) => console.error(err));
```
