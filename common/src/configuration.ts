import {
    ConfigurationRestAPI as ConfigurationRestAPIBase,
    ConfigurationWebsocketStreams as ConfigurationWebsocketStreamsBase,
    parseCustomHeaders,
} from '@binance/common';

/**
 * Represents the configuration options for the REST API.
 * @property {string} [apiKey] - The API key used for authentication.
 * @property {string} [apiSecret] - The API secret used for authentication.
 * @property {string} [basePath] - The base URL of the REST API.
 * @property {Record<string, string>} [customHeaders] - Optional custom headers to include in every request.
 */
export class ConfigurationRestAPI extends ConfigurationRestAPIBase {
    constructor(param?: ConstructorParameters<typeof ConfigurationRestAPIBase>[0]) {
        super(param);

        const baseOptions = (
            this as unknown as { baseOptions?: { headers?: Record<string, unknown> } }
        ).baseOptions;

        if (baseOptions) {
            baseOptions.headers = {
                ...parseCustomHeaders(param?.customHeaders || {}),
                'Content-Type': 'application/json',
                'X-OC-APIKEY': param?.apiKey,
            };
        }
    }
}

/**
 * Represents the configuration options for the WebSocket Streams.
 *
 * @property {string} [apiKey] - The API key used for authentication (optional).
 * @property {string} [apiSecret] - The API secret used for authentication (optional).
 * @property {string | Buffer} [privateKey] - The private key used for authentication (optional).
 * @property {string} [privateKeyPassphrase] - The passphrase for the private key (optional).
 * @property {string} [basePath] - The base URL of the REST API (optional).
 * @property {string} [wsTokenEndpoint] - The endpoint to fetch the WebSocket token (optional).
 * @property {string} [wsToken] - The WebSocket token provided by the user (optional).
 *
 * @remarks
 * - If `wsToken` is provided, it will be used directly for WebSocket connections.
 * - If `apiKey` is provided, a token will be fetched from the REST API and renewed automatically.
 * - If neither `wsToken` nor `apiKey` is provided, an error will be thrown when attempting to connect.
 */
export class ConfigurationWebsocketStreams extends ConfigurationWebsocketStreamsBase {
    apiKey?: string;
    apiSecret?: string;
    privateKey?: string | Buffer;
    privateKeyPassphrase?: string;
    basePath?: string;
    wsTokenEndpoint?: string;
    wsToken?: string;

    constructor(
        param: ConstructorParameters<typeof ConfigurationWebsocketStreamsBase>[0] & {
            apiKey?: string;
            apiSecret?: string;
            privateKey?: string | Buffer;
            privateKeyPassphrase?: string;
            basePath?: string;
            wsTokenEndpoint?: string;
            wsToken?: string;
        }
    ) {
        super(param);
        this.apiKey = param.apiKey;
        this.apiSecret = param.apiSecret;
        this.privateKey = param.privateKey;
        this.privateKeyPassphrase = param.privateKeyPassphrase;
        this.basePath = param.basePath;
        this.wsTokenEndpoint = param.wsTokenEndpoint;
        this.wsToken = param.wsToken;
    }
}
