# Binance Web3 JavaScript Connectors

[![Build Status](https://img.shields.io/github/actions/workflow/status/binance/binance-web3-connector-js/ci.yaml)](https://github.com/binance/binance-web3-connector-js/actions)
[![Open Issues](https://img.shields.io/github/issues/binance/binance-web3-connector-js)](https://github.com/binance/binance-web3-connector-js/issues)
[![Code Style: Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4)](https://prettier.io/)
![Node.js Version](https://img.shields.io/badge/Node.js-%3E=22.12.0-brightgreen)
[![Docs](https://img.shields.io/badge/docs-online-blue?style=flat-square)](https://binance.github.io/binance-web3-connector-js/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Collection of auto-generated TypeScript connectors for Binance Web3 APIs.

## Prerequisites

Before using the connectors, ensure you have:

- **Node.js** (version 22.12.0 or later)
- **npm** (comes with Node.js)
- **nvm** (Node Version Manager)

Using nvm:

```bash
nvm install 22.12.0
nvm use 22.12.0
```

## Available Connectors

- [@binance-web3/wallet](./clients/web3-wallet/) - Web3 Wallet connector

## Documentation

For detailed information, refer to the [Binance API Documentation](https://web3.binance.com/en/dev-docs).

## Installation

Each connector is published as a separate npm package. For example:

```bash
npm install @binance-web3/wallet
```

## Contributing

Since this repository contains auto-generated code using OpenAPI Generator, we encourage you to:

1. Open a GitHub issue to discuss your ideas or report bugs
2. Allow maintainers to implement necessary changes through the code generation process

## Disclaimer

This SDK is provided by Binance on an "as is" and "as available" basis for use at your own risk. Binance makes no representations or warranties of any kind, whether express or implied, as to the operation of the SDK, its accuracy, reliability, completeness, or fitness for any particular purpose.

To the fullest extent permitted by law, Binance shall not be liable for any losses, damages, or expenses of any kind arising from or in connection with your use of, or inability to use, this SDK, including but not limited to any financial losses resulting from errors, bugs, interruptions, or inaccuracies in the SDK.

Your use of this SDK to access the Binance Platform is subject to the Binance API Key Terms and the Binance Terms of Use, which shall prevail in the event of any conflict with this disclaimer. You are solely responsible for any orders or transactions executed through the Binance Platform using this SDK.

This SDK is not intended to constitute investment advice or a recommendation to buy, sell, or hold any digital asset. You should independently evaluate and verify all information before acting.

- [Binance Terms of Use](https://www.binance.com/en/terms)
- [Binance API Key Terms](https://www.binance.com/en/about-legal/terms-binance-api)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
