import crypto from 'crypto';
import https from 'https';
import { JSONParse } from 'json-with-bigint';
import globalAxios, {
    AxiosError,
    AxiosResponse,
    AxiosResponseHeaders,
    RawAxiosRequestConfig,
    RawAxiosResponseHeaders,
} from 'axios';
import {
    type AxiosRequestArgs,
    type ConfigurationRestAPI,
    type TimeUnit,
    BadRequestError,
    ConnectorClientError,
    delay,
    ForbiddenError,
    NetworkError,
    normalizeScientificNumbers,
    NotFoundError,
    RateLimitBanError,
    ServerError,
    setSearchParams,
    shouldRetryRequest,
    toPathString,
    TooManyRequestsError,
    UnauthorizedError,
    RequestSigner,
    SignerConfig,
} from '@binance/common';
import type { RestApiRateLimit, RestApiResponse } from './types';

/**
 * Wraps every successful Binance Web3 response. The `data` field
 * carries the typed payload that callers actually want; `httpRequestFunction`
 * unwraps it before returning.
 */
interface Web3ResponseEnvelope<T> {
    code: number;
    msg: string;
    data: T;
    timestamp?: number;
}

/**
 * Web3-specific request signer that extends the base {@link RequestSigner}.
 *
 * Reuses the parent's key loading (file/PEM/Buffer), passphrase handling,
 * and KeyObject creation. Adds a `signWeb3()` method with the Web3 prehash
 * format (timestamp + method + path + body) and base64 output encoding.
 *
 * Only HMAC-SHA256 and Ed25519 are supported for Web3 signing.
 */
class Web3RequestSigner extends RequestSigner {
    constructor(configuration: SignerConfig) {
        super(configuration);

        if (this.keyType && this.keyType !== 'ed25519') {
            throw new Error('Web3 signing only supports HMAC-SHA256 or Ed25519 keys.');
        }
    }

    signWeb3(timestamp: string, method: string, requestPath: string, body: string): string {
        const preHash = timestamp + method + requestPath + body;

        if (this.apiSecret) {
            return crypto
                .createHmac('sha256', this.apiSecret)
                .update(preHash, 'utf8')
                .digest('base64');
        }

        return crypto.sign(null, Buffer.from(preHash, 'utf8'), this.keyObject!).toString('base64');
    }
}

let web3SignerCache = new WeakMap<SignerConfig, Web3RequestSigner>();

export const clearWeb3KeyCache = function (): void {
    web3SignerCache = new WeakMap<SignerConfig, Web3RequestSigner>();
};

/**
 * Generates a Binance Web3 signature.
 *
 * The prehash is the concatenation of `timestamp`, `method`, `requestPath`,
 * and `body` with no separators. The output is base64-encoded. Two key
 * types are supported:
 * 1. HMAC-SHA256 using an `apiSecret`.
 * 2. Ed25519 using a `privateKey`.
 *
 * @param configuration - Configuration object containing API secret or Ed25519 private key.
 * @param timestamp - ISO-8601 timestamp matching the `X-OC-TIMESTAMP` header.
 * @param method - Uppercase HTTP method (e.g. `GET`, `POST`).
 * @param requestPath - URL path plus raw query string, exactly as sent on the wire.
 * @param body - The raw request body, or `''` for methods without a body.
 * @returns A base64-encoded signature for the `X-OC-SIGN` header.
 * @throws {Error} If neither `apiSecret` nor `privateKey` is provided.
 */
export const getWeb3Signature = function (
    configuration: SignerConfig,
    timestamp: string,
    method: string,
    requestPath: string,
    body: string
): string {
    if (!configuration.apiSecret && !configuration.privateKey) {
        throw new Error(
            'Either \'apiSecret\' or an Ed25519 \'privateKey\' must be provided for Web3 signed requests.'
        );
    }

    let signer = web3SignerCache.get(configuration);
    if (!signer) {
        signer = new Web3RequestSigner(configuration);
        web3SignerCache.set(configuration, signer);
    }

    return signer.signWeb3(timestamp, method, requestPath, body);
};

/**
 * Parses the rate limit headers from the Axios response headers and returns an array of `RestApiRateLimit` objects.
 *
 * @param headers - The Axios response headers.
 * @returns An array of `RestApiRateLimit` objects containing the parsed rate limit information.
 */
export const parseRateLimitHeaders = function (
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders
): RestApiRateLimit[] {
    const headerInt = (name: string): number | undefined => {
        const raw = headers[name] ?? headers[name.toLowerCase()];
        if (raw === undefined || raw === null) return undefined;
        const value = Array.isArray(raw) ? raw[0] : raw;
        const n = parseInt(String(value), 10);
        return Number.isFinite(n) ? n : undefined;
    };

    const rateLimit: RestApiRateLimit = {};
    const limit = headerInt('x-oc-ratelimit-limit');
    const remaining = headerInt('x-oc-ratelimit-remaining');
    const usedWeight = headerInt('x-oc-used-weight');
    const retryAfter = headerInt('retry-after');

    if (limit !== undefined) rateLimit.limit = limit;
    if (remaining !== undefined) rateLimit.remaining = remaining;
    if (usedWeight !== undefined) rateLimit.usedWeight = usedWeight;
    if (retryAfter !== undefined) rateLimit.retryAfter = retryAfter;

    return Object.keys(rateLimit).length > 0 ? [rateLimit] : [];
};

/**
 * Sends an HTTP request and parses the Web3 response envelope.
 *
 * The response's `data()` accessor resolves to the inner `data` field of the
 * gateway envelope (`{ code, msg, data, timestamp }`); rate-limit
 * information is parsed from the `X-OC-*` response headers.
 *
 * @param axiosArgs The request arguments to be passed to Axios.
 * @param configuration The configuration options for the request.
 * @returns A Promise that resolves to the API response, including the data and rate limit headers.
 */
export const httpRequestFunction = async function <T>(
    axiosArgs: AxiosRequestArgs,
    configuration?: ConfigurationRestAPI
): Promise<RestApiResponse<T>> {
    const axiosRequestArgs = {
        ...axiosArgs.options,
        url: (globalAxios.defaults?.baseURL ? '' : (configuration?.basePath ?? '')) + axiosArgs.url,
    };

    const baseOptions = (configuration as unknown as { baseOptions?: RawAxiosRequestConfig })
        ?.baseOptions;
    if (configuration?.keepAlive && !baseOptions?.httpsAgent) {
        axiosRequestArgs.httpsAgent = new https.Agent({ keepAlive: true });
    }

    if (configuration?.compression) {
        axiosRequestArgs.headers = {
            ...axiosRequestArgs.headers,
            'Accept-Encoding': 'gzip, deflate, br',
        };
    }

    const retries = configuration?.retries ?? 0;
    const backoff = configuration?.backoff ?? 0;
    let attempt = 0;
    let lastError: Error | undefined;

    while (attempt <= retries) {
        try {
            const response: AxiosResponse = await globalAxios.request({
                ...axiosRequestArgs,
                responseType: 'text',
            });
            const rateLimits = parseRateLimitHeaders(response.headers);

            return {
                data: async (): Promise<T> => {
                    try {
                        const envelope = JSONParse(response.data) as Web3ResponseEnvelope<T>;
                        return envelope.data;
                    } catch (err) {
                        throw new Error(`Failed to parse JSON response: ${err}`);
                    }
                },
                status: response.status,
                headers: response.headers as Record<string, string>,
                rateLimits,
            };
        } catch (error) {
            attempt++;
            const axiosError = error as AxiosError;

            if (
                shouldRetryRequest(
                    axiosError,
                    axiosRequestArgs?.method?.toUpperCase(),
                    retries - attempt
                )
            ) {
                await delay(backoff * attempt);
            } else {
                if (axiosError.response && axiosError.response.status) {
                    const status = axiosError.response.status;
                    const responseData = axiosError.response.data;

                    let data: Record<string, unknown> = {};
                    if (responseData && responseData !== null) {
                        if (typeof responseData === 'string' && responseData !== '') {
                            try {
                                data = JSONParse(responseData);
                            } catch {
                                data = {};
                            }
                        } else if (typeof responseData === 'object') {
                            data = responseData as Record<string, unknown>;
                        }
                    }

                    const errorMsg = (data as { msg?: string }).msg;
                    const errorCode =
                        typeof (data as { code?: unknown }).code === 'number'
                            ? (data as { code: number }).code
                            : undefined;

                    switch (status) {
                    case 400:
                        throw new BadRequestError(errorMsg, errorCode);
                    case 401:
                        throw new UnauthorizedError(errorMsg, errorCode);
                    case 403:
                        throw new ForbiddenError(errorMsg, errorCode);
                    case 404:
                        throw new NotFoundError(errorMsg, errorCode);
                    case 418:
                        throw new RateLimitBanError(errorMsg, errorCode);
                    case 429:
                        throw new TooManyRequestsError(errorMsg, errorCode);
                    default:
                        if (status >= 500 && status < 600)
                            throw new ServerError(`Server error: ${status}`, status);
                        throw new ConnectorClientError(errorMsg, errorCode);
                    }
                } else {
                    if (retries > 0 && attempt >= retries)
                        lastError = new Error(`Request failed after ${retries} retries`);
                    else lastError = new NetworkError('Network error or request timeout.');

                    break;
                }
            }
        }
    }

    throw lastError;
};

/**
 * Generic function to send a request with optional API key and signature.
 *
 * @param configuration - The configuration containing API credentials and HTTP options.
 * @param endpoint - The API endpoint to call.
 * @param method - HTTP method to use (GET, POST, DELETE, etc.).
 * @param queryParams - Query parameters for the request.
 * @param bodyParams - Body parameters for the request.
 * @param headerParams - Per-request headers.
 * @param _timeUnit - Reserved for parity with `@binance/common` `sendRequest` signature.
 * @param options - Additional request options.
 * @param options.isSigned - Whether to sign the request with HMAC-SHA256 or Ed25519.
 * @returns A promise resolving to the response data object.
 */
export const sendRequest = function <T>(
    configuration: ConfigurationRestAPI,
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
    queryParams: Record<string, unknown> = {},
    bodyParams: Record<string, unknown> = {},
    headerParams: Record<string, unknown> = {},
    _timeUnit?: TimeUnit,
    options: { isSigned?: boolean } = {}
): Promise<RestApiResponse<T>> {
    const url = new URL(endpoint, configuration?.basePath);
    const baseOptions = (configuration as unknown as { baseOptions?: RawAxiosRequestConfig })
        .baseOptions;
    const requestOptions: RawAxiosRequestConfig = {
        method,
        ...baseOptions,
    };
    const headers: Record<string, unknown> = {
        ...((requestOptions.headers as Record<string, unknown> | undefined) || {}),
        ...headerParams,
    };
    requestOptions.headers = headers as RawAxiosRequestConfig['headers'];

    setSearchParams(url, normalizeScientificNumbers(queryParams));

    let bodyString = '';
    if (Object.keys(bodyParams).length > 0) {
        bodyString = JSON.stringify(bodyParams);
        requestOptions.data = bodyString;
    }

    if (options.isSigned) {
        const basePathSegment = configuration?.basePath
            ? new URL(configuration.basePath).pathname.replace(/\/$/, '')
            : '';
        const requestPath = basePathSegment + toPathString(url);
        const timestamp = new Date().toISOString();
        const signature = getWeb3Signature(
            configuration,
            timestamp,
            method,
            requestPath,
            bodyString
        );
        headers['X-OC-TIMESTAMP'] = timestamp;
        headers['X-OC-SIGN'] = signature;
    }

    return httpRequestFunction<T>(
        { url: toPathString(url), options: requestOptions },
        configuration
    );
};
