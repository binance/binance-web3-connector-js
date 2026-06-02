/**
 * Represents the rate limit information for a REST API response.
 * @property {number} [limit] - The maximum number of requests allowed within the current window.
 * @property {number} [remaining] - The number of requests remaining in the current window.
 * @property {number} [usedWeight] - The cumulative request weight consumed by the caller.
 * @property {number} [retryAfter] - The time (in seconds) to wait before making another request after a rate limit response.
 */
export interface RestApiRateLimit {
    limit?: number;
    remaining?: number;
    usedWeight?: number;
    retryAfter?: number;
}

/**
 * Represents the response from a REST API request.
 * @template T - The type of the data returned in the response.
 * @property {() => Promise<T>} data - A function that returns a Promise resolving to the data from the API response.
 * @property {number} status - The HTTP status code of the response.
 * @property {Record<string, string>} headers - The headers of the response.
 * @property {RestApiRateLimit[]} [rateLimits] - An optional array of rate limit information for the response.
 */
export interface RestApiResponse<T> {
    data: () => Promise<T>;
    status: number;
    headers: Record<string, string>;
    rateLimits?: RestApiRateLimit[];
}
