import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

jest.mock('../src/utils', () => ({
    ...jest.requireActual<object>('../src/utils'),
    sendRequest: jest.fn(),
}));

import { WebsocketStreamsBase } from '../src/websocket';
import { ConfigurationWebsocketStreams } from '../src/configuration';
import { sendRequest } from '../src/utils';

const mockSendRequest = sendRequest as jest.MockedFunction<typeof sendRequest>;

function makeTokenResponse(token: string) {
    return {
        data: jest.fn<() => Promise<{ token: string }>>().mockResolvedValue({ token }),
    };
}

function makeManagedConfig(
    overrides: Partial<ConstructorParameters<typeof ConfigurationWebsocketStreams>[0]> = {}
): ConfigurationWebsocketStreams {
    return new ConfigurationWebsocketStreams({
        apiKey: 'test-api-key',
        apiSecret: 'test-api-secret',
        wsURL: 'wss://mock.example.com/ws',
        ...overrides,
    });
}

function makeByoConfig(
    wsToken: string,
    overrides: Partial<ConstructorParameters<typeof ConfigurationWebsocketStreams>[0]> = {}
): ConfigurationWebsocketStreams {
    return new ConfigurationWebsocketStreams({
        wsURL: 'wss://mock.example.com/ws',
        wsToken,
        ...overrides,
    });
}

function makeBase(config: ConfigurationWebsocketStreams): {
    base: WebsocketStreamsBase;
    superConnect: jest.Mock;
    superDisconnect: jest.Mock;
    superInitConnect: jest.Mock;
} {
    const base = new WebsocketStreamsBase(config);
    const upstreamProto = Object.getPrototypeOf(Object.getPrototypeOf(base));

    const superConnect = jest
        .spyOn(upstreamProto, 'connect')
        .mockResolvedValue(undefined) as jest.Mock;
    const superDisconnect = jest
        .spyOn(upstreamProto, 'disconnect')
        .mockResolvedValue(undefined) as jest.Mock;
    const superInitConnect = jest
        .spyOn(upstreamProto, 'initConnect')
        .mockReturnValue(undefined) as jest.Mock;

    return { base, superConnect, superDisconnect, superInitConnect };
}

describe('WebsocketStreamsBase', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('constructor', () => {
        it('uses WEB3_WALLET_WS_STREAMS_PROD_URL when no wsURL supplied', () => {
            const base = new WebsocketStreamsBase(
                new ConfigurationWebsocketStreams({ apiKey: 'k', apiSecret: 's' })
            );
            const wsUrl = (base as unknown as { configuration: { wsURL: string } }).configuration
                ?.wsURL;
            expect(wsUrl).toBe('wss://web3-stream.binance.com/w3w');
        });

        it('uses caller-supplied wsURL', () => {
            const { base } = makeBase(makeManagedConfig({ wsURL: 'wss://custom.example.com/ws' }));
            const wsUrl = (base as unknown as { configuration: { wsURL: string } }).configuration
                ?.wsURL;
            expect(wsUrl).toBe('wss://custom.example.com/ws');
        });

        it('uses WEB3_WALLET_WS_STREAMS_TOKEN_ENDPOINT when wsTokenEndpoint not supplied', () => {
            const { base } = makeBase(makeManagedConfig());
            expect((base as unknown as { tokenEndpoint: string }).tokenEndpoint).toBe(
                '/api/v1/dex/market/wss/auth/token'
            );
        });

        it('uses caller-supplied wsTokenEndpoint', () => {
            const { base } = makeBase(makeManagedConfig({ wsTokenEndpoint: '/custom/token/path' }));
            expect((base as unknown as { tokenEndpoint: string }).tokenEndpoint).toBe(
                '/custom/token/path'
            );
        });

        it('stores userToken when wsToken is provided', () => {
            const { base } = makeBase(makeByoConfig('my-static-token'));
            expect((base as unknown as { userToken: string }).userToken).toBe('my-static-token');
        });
    });

    describe('managed-token mode — connect()', () => {
        it('fetches a token before calling super.connect', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('jwt-abc') as never);
            const { base, superConnect } = makeBase(makeManagedConfig());
            await base.connect();

            expect(mockSendRequest).toHaveBeenCalledTimes(1);
            const [, endpoint, method, , , , , options] = mockSendRequest.mock.calls[0];
            expect(endpoint).toBe('/api/v1/dex/market/wss/auth/token');
            expect(method).toBe('GET');
            expect(options).toEqual({ isSigned: true });

            expect((base as unknown as { _token: string })._token).toBe('jwt-abc');
            expect(superConnect).toHaveBeenCalledTimes(1);
        });

        it('passes stream argument through to super.connect', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('tok') as never);
            const { base, superConnect } = makeBase(makeManagedConfig());
            await base.connect('some/stream');
            expect(superConnect).toHaveBeenCalledWith('some/stream');
        });

        it('uses custom wsTokenEndpoint when fetching the token', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('tok2') as never);
            const { base } = makeBase(makeManagedConfig({ wsTokenEndpoint: '/custom/auth/token' }));
            await base.connect();
            expect(mockSendRequest.mock.calls[0][1]).toBe('/custom/auth/token');
        });

        it('throws when REST response contains no token field', async () => {
            mockSendRequest.mockResolvedValueOnce({
                data: jest.fn<() => Promise<Record<string, never>>>().mockResolvedValue({}),
            } as never);
            const { base, superConnect } = makeBase(makeManagedConfig());
            await expect(base.connect()).rejects.toThrow(
                'WebsocketStreamsBase: failed to obtain WebSocket auth token'
            );
            expect(superConnect).not.toHaveBeenCalled();
        });

        it('throws when no apiKey and no wsToken provided', async () => {
            const { base, superConnect } = makeBase(
                new ConfigurationWebsocketStreams({ wsURL: 'wss://mock.example.com/ws' })
            );
            await expect(base.connect()).rejects.toThrow(
                'WebsocketStreamsBase: apiKey is required when wsToken is not provided.'
            );
            expect(superConnect).not.toHaveBeenCalled();
        });

        it('schedules the 6-day renewal timer after connecting', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('tok') as never);
            const { base } = makeBase(makeManagedConfig());
            await base.connect();
            expect((base as unknown as { renewalTimer: unknown }).renewalTimer).not.toBeNull();
        });

        it('fetches a fresh token on reconnect after disconnect', async () => {
            mockSendRequest
                .mockResolvedValueOnce(makeTokenResponse('first-token') as never)
                .mockResolvedValueOnce(makeTokenResponse('second-token') as never);
            const { base, superConnect, superDisconnect } = makeBase(makeManagedConfig());

            await base.connect();
            expect((base as unknown as { _token: string })._token).toBe('first-token');

            await base.disconnect();
            expect((base as unknown as { renewalTimer: unknown }).renewalTimer).toBeNull();

            await base.connect();
            expect(mockSendRequest).toHaveBeenCalledTimes(2);
            expect((base as unknown as { _token: string })._token).toBe('second-token');
            expect((base as unknown as { renewalTimer: unknown }).renewalTimer).not.toBeNull();
            expect(superConnect).toHaveBeenCalledTimes(2);
            expect(superDisconnect).toHaveBeenCalledTimes(1);
        });

        it('passes privateKey to the REST config for signing', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('tok') as never);
            const { base } = makeBase(
                makeManagedConfig({ apiSecret: undefined, privateKey: 'my-ed25519-key' })
            );
            await base.connect();
            const restConfig = (base as unknown as { restConfig: { privateKey?: string } })
                .restConfig;
            expect(restConfig?.privateKey).toBe('my-ed25519-key');
        });
    });

    describe('bring-your-own-token mode — connect()', () => {
        it('uses the caller-supplied token without calling sendRequest', async () => {
            const { base, superConnect } = makeBase(makeByoConfig('static-token-xyz'));
            await base.connect();

            expect(mockSendRequest).not.toHaveBeenCalled();
            expect((base as unknown as { _token: string })._token).toBe('static-token-xyz');
            expect(superConnect).toHaveBeenCalledTimes(1);
        });

        it('does NOT schedule a renewal timer', async () => {
            const { base } = makeBase(makeByoConfig('static-token-xyz'));
            await base.connect();
            expect((base as unknown as { renewalTimer: unknown }).renewalTimer).toBeNull();
        });

        it('appends the wsToken to the URL via initConnect', async () => {
            const { base, superInitConnect } = makeBase(makeByoConfig('byo-token'));
            await base.connect();

            (base as unknown as { initConnect(u: string): void }).initConnect(
                'wss://example.com/stream?streams=a'
            );

            expect(superInitConnect).toHaveBeenCalledWith(
                'wss://example.com/stream?streams=a&token=byo-token',
                false,
                undefined
            );
        });

        it('still passes stream argument to super.connect', async () => {
            const { base, superConnect } = makeBase(makeByoConfig('tok'));
            await base.connect('a/stream');
            expect(superConnect).toHaveBeenCalledWith('a/stream');
        });
    });

    describe('initConnect() — URL token injection', () => {
        it('appends &token=<jwt> when URL already has a query string', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('my-jwt') as never);
            const { base, superInitConnect } = makeBase(makeManagedConfig());
            await base.connect();

            (base as unknown as { initConnect(u: string, r?: boolean): void }).initConnect(
                'wss://example.com/stream?streams=a%2Fb'
            );

            expect(superInitConnect).toHaveBeenCalledWith(
                'wss://example.com/stream?streams=a%2Fb&token=my-jwt',
                false,
                undefined
            );
        });

        it('appends ?token=<jwt> when URL has no query string', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('tok-xyz') as never);
            const { base, superInitConnect } = makeBase(makeManagedConfig());
            await base.connect();

            (base as unknown as { initConnect(u: string): void }).initConnect(
                'wss://example.com/stream'
            );

            expect(superInitConnect).toHaveBeenCalledWith(
                'wss://example.com/stream?token=tok-xyz',
                false,
                undefined
            );
        });

        it('URL-encodes special characters in the token', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('a+b/c=d') as never);
            const { base, superInitConnect } = makeBase(makeManagedConfig());
            await base.connect();

            (base as unknown as { initConnect(u: string): void }).initConnect(
                'wss://example.com/stream?streams=x'
            );

            const calledUrl = superInitConnect.mock.calls[0][0] as string;
            expect(calledUrl).toContain('token=a%2Bb%2Fc%3Dd');
        });

        it('passes URL through unchanged when no token is stored yet', () => {
            const { base, superInitConnect } = makeBase(makeManagedConfig());

            (base as unknown as { initConnect(u: string): void }).initConnect(
                'wss://example.com/stream?streams=x'
            );

            expect(superInitConnect).toHaveBeenCalledWith(
                'wss://example.com/stream?streams=x',
                false,
                undefined
            );
        });

        it('reuses the stored token at the 23-hour server reconnect — no extra fetch', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('initial-tok') as never);
            const { base, superInitConnect } = makeBase(makeManagedConfig());
            await base.connect();
            superInitConnect.mockClear();
            expect(mockSendRequest).toHaveBeenCalledTimes(1);
            (
                base as unknown as { initConnect(u: string, r: boolean, c?: unknown): void }
            ).initConnect('wss://example.com/stream?streams=a', true);

            expect(mockSendRequest).toHaveBeenCalledTimes(1);
            expect(superInitConnect.mock.calls[0][0]).toContain('token=initial-tok');
        });
    });

    describe('disconnect()', () => {
        it('clears the managed-mode renewal timer before calling super.disconnect', async () => {
            mockSendRequest.mockResolvedValueOnce(makeTokenResponse('tok') as never);
            const { base, superDisconnect } = makeBase(makeManagedConfig());
            await base.connect();

            expect((base as unknown as { renewalTimer: unknown }).renewalTimer).not.toBeNull();
            await base.disconnect();

            expect((base as unknown as { renewalTimer: unknown }).renewalTimer).toBeNull();
            expect(superDisconnect).toHaveBeenCalledTimes(1);
        });

        it('is safe to call disconnect before connect', async () => {
            const { base, superDisconnect } = makeBase(makeManagedConfig());
            await expect(base.disconnect()).resolves.not.toThrow();
            expect(superDisconnect).toHaveBeenCalledTimes(1);
        });

        it('is safe to call disconnect in BYO-token mode (no timer to clear)', async () => {
            const { base, superDisconnect } = makeBase(makeByoConfig('tok'));
            await base.connect();
            await expect(base.disconnect()).resolves.not.toThrow();
            expect(superDisconnect).toHaveBeenCalledTimes(1);
        });
    });

    describe('managed-token renewal (6-day timer)', () => {
        it('re-fetches token and calls initConnect on open connections after 6 days', async () => {
            mockSendRequest
                .mockResolvedValueOnce(makeTokenResponse('initial-token') as never)
                .mockResolvedValueOnce(makeTokenResponse('renewed-token') as never);

            const { base, superInitConnect } = makeBase(makeManagedConfig());

            const fakeConn = { closeInitiated: false };
            (base as unknown as { connectionPool: unknown[] }).connectionPool = [fakeConn];
            (
                jest.spyOn(
                    Object.getPrototypeOf(Object.getPrototypeOf(base)) as {
                        getReconnectURL: () => string;
                    },
                    'getReconnectURL'
                ) as jest.MockedFunction<() => string>
            ).mockReturnValue('wss://mock.example.com/ws/stream?streams=a');

            await base.connect();
            expect((base as unknown as { _token: string })._token).toBe('initial-token');
            superInitConnect.mockClear();

            await jest.advanceTimersByTimeAsync(6 * 24 * 60 * 60 * 1000);

            expect(mockSendRequest).toHaveBeenCalledTimes(2);
            expect((base as unknown as { _token: string })._token).toBe('renewed-token');

            const renewalCall = superInitConnect.mock.calls.find(([url]) =>
                (url as string).includes('renewed-token')
            );
            expect(renewalCall).toBeDefined();
        });

        it('skips initConnect for connections that are already closing', async () => {
            mockSendRequest
                .mockResolvedValueOnce(makeTokenResponse('tok1') as never)
                .mockResolvedValueOnce(makeTokenResponse('tok2') as never);

            const { base, superInitConnect } = makeBase(makeManagedConfig());

            const closedConn = { closeInitiated: true };
            (base as unknown as { connectionPool: unknown[] }).connectionPool = [closedConn];

            await base.connect();
            superInitConnect.mockClear();

            await jest.advanceTimersByTimeAsync(6 * 24 * 60 * 60 * 1000);

            expect(superInitConnect).not.toHaveBeenCalled();
        });

        it('reschedules itself after a failed renewal so the timer keeps running', async () => {
            mockSendRequest
                .mockResolvedValueOnce(makeTokenResponse('tok1') as never)
                .mockRejectedValueOnce(new Error('network timeout'))
                .mockResolvedValueOnce(makeTokenResponse('tok3') as never);

            const { base } = makeBase(makeManagedConfig());
            await base.connect();

            await jest.advanceTimersByTimeAsync(6 * 24 * 60 * 60 * 1000);
            expect((base as unknown as { _token: string })._token).toBe('tok1');

            await jest.advanceTimersByTimeAsync(6 * 24 * 60 * 60 * 1000);
            expect((base as unknown as { _token: string })._token).toBe('tok3');
        });

        it('does NOT fire in BYO-token mode even after 6 days', async () => {
            const { base } = makeBase(makeByoConfig('static-tok'));
            await base.connect();

            await jest.advanceTimersByTimeAsync(6 * 24 * 60 * 60 * 1000);

            expect(mockSendRequest).not.toHaveBeenCalled();
            expect((base as unknown as { _token: string })._token).toBe('static-tok');
        });
    });

    describe('ConfigurationWebsocketStreams', () => {
        it('stores all managed-token fields from constructor param', () => {
            const cfg = new ConfigurationWebsocketStreams({
                apiKey: 'k',
                apiSecret: 's',
                privateKey: 'pk',
                privateKeyPassphrase: 'pp',
                basePath: 'https://api.example.com',
                wsTokenEndpoint: '/custom/token',
            });
            expect(cfg.apiKey).toBe('k');
            expect(cfg.apiSecret).toBe('s');
            expect(cfg.privateKey).toBe('pk');
            expect(cfg.privateKeyPassphrase).toBe('pp');
            expect(cfg.basePath).toBe('https://api.example.com');
            expect(cfg.wsTokenEndpoint).toBe('/custom/token');
            expect(cfg.wsToken).toBeUndefined();
        });

        it('stores wsToken in BYO-token mode, all other fields optional', () => {
            const cfg = new ConfigurationWebsocketStreams({ wsToken: 'my-byo-token' });
            expect(cfg.wsToken).toBe('my-byo-token');
            expect(cfg.apiKey).toBeUndefined();
            expect(cfg.apiSecret).toBeUndefined();
        });

        it('all optional fields default to undefined', () => {
            const cfg = new ConfigurationWebsocketStreams({ apiKey: 'k' });
            expect(cfg.apiSecret).toBeUndefined();
            expect(cfg.privateKey).toBeUndefined();
            expect(cfg.privateKeyPassphrase).toBeUndefined();
            expect(cfg.basePath).toBeUndefined();
            expect(cfg.wsTokenEndpoint).toBeUndefined();
            expect(cfg.wsToken).toBeUndefined();
        });
    });
});
