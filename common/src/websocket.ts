import {
    WebsocketStreamsBase as WebsocketStreamsBaseCommon,
    WebsocketConnection,
} from '@binance/common';
import { ConfigurationRestAPI, ConfigurationWebsocketStreams } from './configuration';
import {
    WEB3_WALLET_REST_API_PROD_URL,
    WEB3_WALLET_WS_STREAMS_PROD_URL,
    WEB3_WALLET_WS_STREAMS_TOKEN_ENDPOINT,
} from './constants';
import { sendRequest } from './utils';

const TOKEN_RENEWAL_MS = 6 * 24 * 60 * 60 * 1000; // Tokens are valid for 7 days. We renew at 6 days to keep a 24-hour safety margin.

export class WebsocketStreamsBase extends WebsocketStreamsBaseCommon {
    private readonly restConfig: ConfigurationRestAPI | null;
    private readonly tokenEndpoint: string;
    private readonly userToken: string | undefined;
    private renewalTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(
        config: ConfigurationWebsocketStreams,
        connectionPool: WebsocketConnection[] = [],
        urlPaths: string[] = []
    ) {
        const wsBaseURL = config.wsURL ?? WEB3_WALLET_WS_STREAMS_PROD_URL;
        super({ ...config, wsURL: wsBaseURL }, connectionPool, urlPaths);
        this.userToken = config.wsToken;
        this.tokenEndpoint = config.wsTokenEndpoint ?? WEB3_WALLET_WS_STREAMS_TOKEN_ENDPOINT;
        this.restConfig =
            config.apiKey != null
                ? new ConfigurationRestAPI({
                    apiKey: config.apiKey,
                    apiSecret: config.apiSecret,
                    privateKey: config.privateKey,
                    privateKeyPassphrase: config.privateKeyPassphrase,
                    basePath: config.basePath ?? WEB3_WALLET_REST_API_PROD_URL,
                    timeout: 10_000,
                })
                : null;
    }

    /**
     * Connects to the WebSocket Streams endpoint.
     *
     * - Managed-token mode (`apiKey` supplied): fetches a fresh auth token from the
     *   REST API, stores it, and schedules a 6-day renewal timer. The token is appended
     *   to the WebSocket URL on every connection
     * - Bring-your-own-token mode (`wsToken` supplied): uses the provided token
     *   directly. No REST call is made and no renewal timer is started.
     *
     * @param stream - Stream name(s) to subscribe immediately after connect.
     * @returns A promise that resolves when the connection is established.
     */
    override async connect(stream?: string | string[]): Promise<void> {
        if (this.userToken !== undefined) {
            this.storeToken(this.userToken);
        } else {
            if (this.restConfig === null) {
                throw new Error(
                    'WebsocketStreamsBase: apiKey is required when wsToken is not provided.'
                );
            }
            const token = await this.fetchToken();
            this.storeToken(token);
            this.scheduleRenewal();
        }

        await super.connect(stream);
    }

    /**
     * Disconnects from the WebSocket Streams endpoint and clears the token renewal timer
     * (no-op in bring-your-own-token mode since no timer is started there).
     *
     * @returns A promise that resolves when the disconnection is complete.
     */
    override async disconnect(): Promise<void> {
        this.clearRenewalTimer();
        await super.disconnect();
    }

    /**
     * Overrides the base class's `initConnect` method to append the current auth token
     * to the WebSocket URL as a query parameter. This is called both on the initial
     * connection and on every server-driven 23-hour renewal — in both cases the token
     * already in memory is reused (no extra fetch).
     *
     * @param url - The WebSocket URL to connect to.
     * @param isRenewal - Whether this is a connection renewal.
     * @param connection - Optional existing connection to reuse.
     * @returns A `WebsocketConnection` instance, or `undefined`.
     */
    protected override initConnect(
        url: string,
        isRenewal = false,
        connection?: WebsocketConnection
    ): WebsocketConnection | undefined {
        const token: string | undefined = (this as unknown as { _token?: string })._token;
        const finalUrl = token
            ? `${url}${url.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`
            : url;

        return super.initConnect(finalUrl, isRenewal, connection);
    }

    /**
     * Stores the provided auth token in a private property for later use in WebSocket connections.
     *
     * @param token - The JWT auth token to store.
     */
    private storeToken(token: string): void {
        (this as unknown as { _token: string })._token = token;
    }

    /**
     * Fetches a new auth token from the REST API using the managed-mode credentials.
     * Only called in managed-token mode (when `apiKey` is present and `wsToken` is absent).
     *
     * @returns A promise that resolves to the fetched auth token as a string.
     */
    private async fetchToken(): Promise<string> {
        const response = await sendRequest<{ token?: string }>(
            this.restConfig!,
            this.tokenEndpoint,
            'GET',
            {},
            {},
            {},
            undefined,
            { isSigned: true }
        );
        const body = await response.data();
        const token = body?.token;

        if (!token) {
            throw new Error(
                'WebsocketStreamsBase: failed to obtain WebSocket auth token — the REST API response did not include a token field.'
            );
        }

        return token;
    }

    /**
     * Schedules a 6-day one-shot timer. On expiry: fetches a new token,
     * updates the stored token, then calls `initConnect(url, true, conn)` on
     * every open connection so the new token is used on the next reconnect.
     * Re-schedules itself regardless of success or failure so the renewal
     * cadence never stops while the connection is alive.
     *
     * Only active in managed-token mode.
     *
     * @returns void
     */
    private scheduleRenewal(): void {
        this.clearRenewalTimer();
        this.renewalTimer = setTimeout(async () => {
            try {
                const token = await this.fetchToken();
                this.storeToken(token);
                for (const conn of this.connectionPool) {
                    if (!conn.closeInitiated) {
                        const url = this.getReconnectURL('', conn);
                        this.initConnect(url, true, conn);
                    }
                }
            } catch (err) {
                this.logger.error('WebsocketStreamsBase: token renewal failed:', err);
            } finally {
                this.scheduleRenewal();
            }
        }, TOKEN_RENEWAL_MS);

        if (typeof this.renewalTimer === 'object' && this.renewalTimer?.unref) {
            this.renewalTimer.unref();
        }
    }

    /**
     * Clears the token renewal timer if it is currently set. This is called when disconnecting
     * to ensure that no further token fetches or connection renewals are attempted after the
     * WebSocket connection has been closed.
     *
     * @returns void
     */
    private clearRenewalTimer(): void {
        if (this.renewalTimer !== null) {
            clearTimeout(this.renewalTimer);
            this.renewalTimer = null;
        }
    }
}
