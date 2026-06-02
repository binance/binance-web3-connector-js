# Proxy Configuration

```typescript
import { Web3Wallet, Web3WalletRestAPI } from '@binance-web3/wallet';

const configurationRestAPI = {
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    proxy: {
        host: '127.0.0.1',
        port: 8080,
        protocol: 'http', // or 'https'
        auth: {
            username: 'proxy-user',
            password: 'proxy-password',
        },
    },
};
const client = new Web3Wallet({ configurationRestAPI });

client.restAPI
    .getPriceInfo()
    .then((res) => res.data())
    .then((data: Web3WalletRestAPI.GetPriceInfoResponse) => console.log(data))
    .catch((err) => console.error(err));
```
