import {
    ConfigurationRestAPI as ConfigurationRestAPIBase,
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
