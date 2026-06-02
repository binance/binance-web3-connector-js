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

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.
