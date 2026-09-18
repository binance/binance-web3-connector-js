export { Web3Wallet, type ConfigurationWeb3Wallet } from './web3-wallet';
export * as Web3WalletRestAPI from './rest-api';

export * as Web3WalletWebsocketStreams from './websocket-streams';

export {
    WEB3_WALLET_REST_API_PROD_URL,
    WEB3_WALLET_WS_STREAMS_PROD_URL,
    ConnectorClientError,
    RequiredError,
    UnauthorizedError,
    ForbiddenError,
    TooManyRequestsError,
    RateLimitBanError,
    ServerError,
    NetworkError,
    NotFoundError,
    BadRequestError,
} from '@binance/common';
