# HTTPS Agent Configuration

```typescript
import https from 'https';
import { Web3Wallet, Web3WalletRestAPI } from '@binance-web3/wallet';

const httpsAgent = new https.Agent({
    rejectUnauthorized: true,
});

const configurationRestAPI = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    httpsAgent,
};
const client = new Web3Wallet({ configurationRestAPI });

client.restAPI
    .getPriceInfo()
    .then((res) => res.data())
    .then((data: Web3WalletRestAPI.GetPriceInfoResponse) => console.log(data))
    .catch((err) => console.error(err));
```
