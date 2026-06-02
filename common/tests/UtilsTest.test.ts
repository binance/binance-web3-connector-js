import crypto from 'crypto';
import axios from 'axios';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
    ConfigurationRestAPI,
    clearWeb3KeyCache,
    getWeb3Signature,
    httpRequestFunction,
    parseRateLimitHeaders,
    sendRequest,
} from '../src';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const restConfiguration = new ConfigurationRestAPI({
    apiKey: 'test-api-key',
    apiSecret: 'test-api-secret',
    basePath: 'https://web3basepath.com',
});

function getLastAxiosCall(): {
    url: string;
    method: string;
    headers: Record<string, unknown>;
    data?: string;
    } {
    const call = mockAxios.request.mock.calls.at(-1)?.[0];
    if (!call) throw new Error('axios.request was not called');
    return call as never;
}

describe('@binance-web3/common', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('ConfigurationRestAPI', () => {
        it('replaces upstream MBX headers with X-OC-APIKEY + Content-Type', () => {
            const cfg = new ConfigurationRestAPI({
                apiKey: 'web3-key',
                apiSecret: 'web3-secret',
                basePath: 'https://web3basepath.com',
            });
            const headers = (
                cfg as unknown as { baseOptions?: { headers?: Record<string, unknown> } }
            ).baseOptions?.headers;
            expect(headers).toBeDefined();
            expect(headers!['X-MBX-APIKEY']).toBeUndefined();
            expect(headers!['X-OC-APIKEY']).toBe('web3-key');
            expect(headers!['Content-Type']).toBe('application/json');
        });

        it('preserves user-supplied customHeaders through the header replacement', () => {
            const cfg = new ConfigurationRestAPI({
                apiKey: 'web3-key',
                apiSecret: 'web3-secret',
                basePath: 'https://web3basepath.com',
                customHeaders: { 'X-Trace-Id': 'abc-123' },
            });
            const headers = (
                cfg as unknown as { baseOptions?: { headers?: Record<string, unknown> } }
            ).baseOptions?.headers;
            expect(headers!['X-Trace-Id']).toBe('abc-123');
            expect(headers!['X-OC-APIKEY']).toBe('web3-key');
            expect(headers!['X-MBX-APIKEY']).toBeUndefined();
        });
    });

    describe('getWeb3Signature()', () => {
        const timestamp = '2026-05-11T10:08:57.715Z';
        const method = 'GET';
        const requestPath = '/api/v1/dex/market/price?chainId=1&symbol=ETH%20USDT';
        const body = '';
        const expectedPreHash = timestamp + method + requestPath + body;

        beforeEach(() => {
            clearWeb3KeyCache();
        });

        it('generates a base64 HMAC-SHA256 signature when apiSecret is provided', () => {
            const config = { apiSecret: 'test-secret' };
            const signature = getWeb3Signature(config, timestamp, method, requestPath, body);

            const expected = crypto
                .createHmac('sha256', config.apiSecret)
                .update(expectedPreHash, 'utf8')
                .digest('base64');

            expect(signature).toBe(expected);
        });

        it('matches a known reference value (HMAC) — guards prehash format', () => {
            const secret = 'test-secret';
            const expected = crypto
                .createHmac('sha256', secret)
                .update(
                    '2026-05-11T10:08:57.715ZGET/api/v1/dex/market/price?chainId=1&symbol=ETH%20USDT',
                    'utf8'
                )
                .digest('base64');

            const signature = getWeb3Signature(
                { apiSecret: secret },
                '2026-05-11T10:08:57.715Z',
                'GET',
                '/api/v1/dex/market/price?chainId=1&symbol=ETH%20USDT',
                ''
            );

            expect(signature).toBe(expected);
        });

        it('includes the body in the prehash for POST requests', () => {
            const postBody = '{"chainId":1,"fromToken":"0xEEEE"}';
            const signature = getWeb3Signature(
                { apiSecret: 'test-secret' },
                timestamp,
                'POST',
                '/api/v1/dex/swap',
                postBody
            );

            const expected = crypto
                .createHmac('sha256', 'test-secret')
                .update(timestamp + 'POST' + '/api/v1/dex/swap' + postBody, 'utf8')
                .digest('base64');

            expect(signature).toBe(expected);
        });

        it('generates a base64 Ed25519 signature when an Ed25519 privateKey is provided', () => {
            const { privateKey } = crypto.generateKeyPairSync('ed25519');
            const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }) as string;

            const signature = getWeb3Signature(
                { privateKey: pem },
                timestamp,
                method,
                requestPath,
                body
            );

            const expected = crypto
                .sign(null, Buffer.from(expectedPreHash, 'utf8'), privateKey)
                .toString('base64');

            expect(signature).toBe(expected);
        });

        it('rejects RSA private keys (Web3 only supports Ed25519)', () => {
            const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 });
            const pem = privateKey.export({ type: 'pkcs1', format: 'pem' }) as string;

            expect(() =>
                getWeb3Signature({ privateKey: pem }, timestamp, method, requestPath, body)
            ).toThrowError('Web3 signing only supports HMAC-SHA256 or Ed25519 keys.');
        });

        it('throws when neither apiSecret nor privateKey is provided', () => {
            expect(() => getWeb3Signature({}, timestamp, method, requestPath, body)).toThrowError(
                'Either \'apiSecret\' or an Ed25519 \'privateKey\' must be provided for Web3 signed requests.'
            );
        });

        it('reuses the cached KeyObject for repeated Ed25519 calls', () => {
            const { privateKey } = crypto.generateKeyPairSync('ed25519');
            const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }) as string;
            const config = { privateKey: pem };

            const createKeySpy = jest.spyOn(crypto, 'createPrivateKey');

            getWeb3Signature(config, timestamp, method, requestPath, body);
            getWeb3Signature(config, timestamp, method, requestPath, body);

            expect(createKeySpy).toHaveBeenCalledTimes(1);
            createKeySpy.mockRestore();
        });
    });

    describe('sendRequest()', () => {
        beforeEach(() => {
            clearWeb3KeyCache();
        });

        afterEach(() => {
            mockAxios.request.mockReset();
        });

        it('sends an unsigned GET with X-OC-APIKEY (from baseOptions) and no X-OC-SIGN', async () => {
            mockAxios.request.mockResolvedValue({ data: '{}', status: 200, headers: {} });

            await sendRequest(
                restConfiguration,
                '/api/v1/dex/market/price',
                'GET',
                { chainId: 1, symbol: 'ETH USDT' },
                {},
                {},
                undefined,
                {}
            );

            const { headers } = getLastAxiosCall();
            expect(headers['X-OC-APIKEY']).toBe('test-api-key');
            expect(headers['X-OC-SIGN']).toBeUndefined();
            expect(headers['X-OC-TIMESTAMP']).toBeUndefined();
            expect(headers['X-MBX-APIKEY']).toBeUndefined();
        });

        it('signs with X-OC-* headers and does not put timestamp/signature on the query (GET)', async () => {
            mockAxios.request.mockResolvedValue({ data: '{}', status: 200, headers: {} });

            await sendRequest(
                restConfiguration,
                '/api/v1/dex/market/price',
                'GET',
                { chainId: 1, symbol: 'ETH USDT' },
                {},
                {},
                undefined,
                { isSigned: true }
            );

            const { url, headers } = getLastAxiosCall();
            const parsed = new URL(url);

            expect(parsed.searchParams.get('timestamp')).toBeNull();
            expect(parsed.searchParams.get('signature')).toBeNull();
            expect(parsed.searchParams.get('chainId')).toBe('1');
            expect(parsed.searchParams.get('symbol')).toBe('ETH USDT');

            expect(headers['X-OC-APIKEY']).toBe('test-api-key');
            expect(headers['X-OC-TIMESTAMP']).toEqual(expect.any(String));
            expect(headers['X-OC-SIGN']).toEqual(expect.any(String));
            expect(headers['X-MBX-APIKEY']).toBeUndefined();
        });

        it('sends body params as raw JSON and includes them in the prehash (POST)', async () => {
            mockAxios.request.mockResolvedValue({ data: '{}', status: 200, headers: {} });

            await sendRequest(
                restConfiguration,
                '/api/v1/dex/swap',
                'POST',
                {},
                { chainId: 1, fromToken: '0xEEEE' },
                {},
                undefined,
                { isSigned: true }
            );

            const { url, headers, data } = getLastAxiosCall();

            expect(headers['Content-Type']).toBe('application/json');
            expect(data).toBe('{"chainId":1,"fromToken":"0xEEEE"}');

            const sentTimestamp = headers['X-OC-TIMESTAMP'] as string;
            const parsed = new URL(url);
            const requestPath = parsed.pathname + parsed.search + parsed.hash;
            const expected = crypto
                .createHmac('sha256', 'test-api-secret')
                .update(sentTimestamp + 'POST' + requestPath + (data as string), 'utf8')
                .digest('base64');

            expect(headers['X-OC-SIGN']).toBe(expected);
        });

        it('throws when neither apiSecret nor privateKey is configured on a signed request', () => {
            const cfg = new ConfigurationRestAPI({
                apiKey: 'test-api-key',
                basePath: 'https://web3basepath.com',
            });
            cfg.apiSecret = undefined;

            expect(() =>
                sendRequest(cfg, '/api/v1/dex/market/price', 'GET', {}, {}, {}, undefined, {
                    isSigned: true,
                })
            ).toThrowError(
                'Either \'apiSecret\' or an Ed25519 \'privateKey\' must be provided for Web3 signed requests.'
            );
        });

        it('merges per-request headerParams onto the outgoing request', async () => {
            mockAxios.request.mockResolvedValue({ data: '{}', status: 200, headers: {} });

            await sendRequest(
                restConfiguration,
                '/api/v1/dex/market/price',
                'GET',
                {},
                {},
                { 'X-Trace-Id': 'req-1', 'X-Custom': 'value' },
                undefined,
                {}
            );

            const { headers } = getLastAxiosCall();
            expect(headers['X-Trace-Id']).toBe('req-1');
            expect(headers['X-Custom']).toBe('value');
            expect(headers['X-OC-APIKEY']).toBe('test-api-key');
        });

        it('lets headerParams override matching keys baked into baseOptions.headers', async () => {
            mockAxios.request.mockResolvedValue({ data: '{}', status: 200, headers: {} });

            await sendRequest(
                restConfiguration,
                '/api/v1/dex/market/price',
                'GET',
                {},
                {},
                { 'Content-Type': 'application/octet-stream' },
                undefined,
                {}
            );

            const { headers } = getLastAxiosCall();
            expect(headers['Content-Type']).toBe('application/octet-stream');
        });

        it('signs the path including the basePath path segment (e.g. /build)', async () => {
            mockAxios.request.mockResolvedValue({ data: '{}', status: 200, headers: {} });

            const cfg = new ConfigurationRestAPI({
                apiKey: 'test-api-key',
                apiSecret: 'test-api-secret',
                basePath: 'https://gateway.example.com/build',
            });

            await sendRequest(cfg, '/api/v1/dex/swap', 'POST', {}, { chainId: 1 }, {}, undefined, {
                isSigned: true,
            });

            const { url, headers, data } = getLastAxiosCall();
            const parsed = new URL(url);
            const wirePath = parsed.pathname + parsed.search + parsed.hash;
            expect(wirePath).toBe('/build/api/v1/dex/swap');

            const expected = crypto
                .createHmac('sha256', 'test-api-secret')
                .update(
                    (headers['X-OC-TIMESTAMP'] as string) + 'POST' + wirePath + (data as string),
                    'utf8'
                )
                .digest('base64');
            expect(headers['X-OC-SIGN']).toBe(expected);
        });
    });

    describe('parseRateLimitHeaders()', () => {
        it('parses all four X-OC-* / Retry-After headers when present', () => {
            const headers = {
                'x-oc-ratelimit-limit': '1200',
                'x-oc-ratelimit-remaining': '987',
                'x-oc-used-weight': '13',
                'retry-after': '5',
            };
            expect(parseRateLimitHeaders(headers)).toEqual([
                { limit: 1200, remaining: 987, usedWeight: 13, retryAfter: 5 },
            ]);
        });

        it('omits absent headers (still returns one entry if any header is set)', () => {
            const headers = { 'x-oc-ratelimit-limit': '1200' };
            expect(parseRateLimitHeaders(headers)).toEqual([{ limit: 1200 }]);
        });

        it('returns an empty array when no rate-limit headers are present', () => {
            expect(parseRateLimitHeaders({})).toEqual([]);
            expect(parseRateLimitHeaders({ 'content-type': 'application/json' })).toEqual([]);
        });

        it('handles header values returned as arrays (axios edge case)', () => {
            const headers = { 'x-oc-ratelimit-limit': ['1200'] };
            expect(parseRateLimitHeaders(headers as never)).toEqual([{ limit: 1200 }]);
        });

        it('ignores non-numeric header values', () => {
            const headers = { 'x-oc-ratelimit-limit': 'not-a-number' };
            expect(parseRateLimitHeaders(headers)).toEqual([]);
        });
    });

    describe('httpRequestFunction()', () => {
        afterEach(() => {
            mockAxios.request.mockReset();
        });

        it('unwraps the envelope: data() resolves to envelope.data, not the whole envelope', async () => {
            mockAxios.request.mockResolvedValue({
                data: '{"code":0,"msg":"success","data":{"gasLimit":"21000"},"timestamp":1748601600000}',
                status: 200,
                headers: {},
            });

            const response = await httpRequestFunction<{ gasLimit: string }>(
                { url: '/api/v1/test', options: { method: 'GET' } },
                restConfiguration
            );

            await expect(response.data()).resolves.toEqual({ gasLimit: '21000' });
            expect(response.status).toBe(200);
        });

        it('exposes parsed rate limits on the response', async () => {
            mockAxios.request.mockResolvedValue({
                data: '{"code":0,"msg":"success","data":{}}',
                status: 200,
                headers: {
                    'x-oc-ratelimit-limit': '1200',
                    'x-oc-ratelimit-remaining': '999',
                    'x-oc-used-weight': '7',
                },
            });

            const response = await httpRequestFunction(
                { url: '/api/v1/test', options: { method: 'GET' } },
                restConfiguration
            );

            expect(response.rateLimits).toEqual([{ limit: 1200, remaining: 999, usedWeight: 7 }]);
        });

        it('passes through non-zero envelope code without throwing — caller decides', async () => {
            mockAxios.request.mockResolvedValue({
                data: '{"code":-1234,"msg":"insufficient funds","data":null,"timestamp":1}',
                status: 200,
                headers: {},
            });

            const response = await httpRequestFunction(
                { url: '/api/v1/test', options: { method: 'GET' } },
                restConfiguration
            );

            await expect(response.data()).resolves.toBeNull();
            expect(response.status).toBe(200);
        });

        it('throws Failed to parse JSON when the response body is malformed', async () => {
            mockAxios.request.mockResolvedValue({
                data: 'not-json',
                status: 200,
                headers: {},
            });

            const response = await httpRequestFunction(
                { url: '/api/v1/test', options: { method: 'GET' } },
                restConfiguration
            );

            await expect(response.data()).rejects.toThrow(/Failed to parse JSON response/);
        });

        it('maps HTTP 401 to UnauthorizedError using the envelope code/msg', async () => {
            const axiosError = {
                isAxiosError: true,
                response: {
                    status: 401,
                    data: '{"code":-2014,"msg":"API-key format invalid","data":null}',
                },
            };
            mockAxios.request.mockRejectedValue(axiosError);

            await expect(
                httpRequestFunction(
                    { url: '/api/v1/test', options: { method: 'GET' } },
                    restConfiguration
                )
            ).rejects.toThrow('API-key format invalid');
        });

        it('parses Retry-After on a 429 and surfaces it as a TooManyRequestsError', async () => {
            mockAxios.request.mockRejectedValue({
                isAxiosError: true,
                response: {
                    status: 429,
                    data: '{"code":-1003,"msg":"Too many requests","data":null}',
                    headers: { 'retry-after': '12' },
                },
            });

            await expect(
                httpRequestFunction(
                    { url: '/api/v1/test', options: { method: 'GET' } },
                    restConfiguration
                )
            ).rejects.toThrow('Too many requests');
        });
    });
});
