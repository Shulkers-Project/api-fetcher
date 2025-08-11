/**
 * Base API client with common functionality for both Spiget and Modrinth APIs.
 *
 * This abstract class eliminates code duplication by providing shared HTTP request handling,
 * parameter building, and header management. It implements the Template Method pattern where
 * each API implementation provides specific error handling logic.
 *
 * @example
 * ```typescript
 * class MyAPI extends BaseAPIClient {
 *   constructor() {
 *     super("https://api.example.com", "MyApp/1.0.0");
 *   }
 *
 *   protected handleError(error: any, code: string, message: string): never {
 *     throw new MyError(code, message, { originalError: error });
 *   }
 * }
 * ```
 *
 * @since 1.0.0
 * @abstract
 */
export declare abstract class BaseAPIClient {
    /** Base URL for all API requests */
    protected readonly baseUrl: string;
    /** User-Agent header value for all requests */
    protected readonly userAgent: string;
    /**
     * Creates a new BaseAPIClient instance.
     *
     * @param baseUrl - The base URL for all API requests (e.g., "https://api.example.com/v2")
     * @param userAgent - Optional User-Agent string, defaults to "shulkers/1.0.0"
     *
     * @example
     * ```typescript
     * const client = new MyAPI("https://api.example.com/v1", "MyApp/2.0.0");
     * ```
     */
    constructor(baseUrl: string, userAgent?: string);
    /**
     * Builds search parameters object from options, filtering out undefined values.
     *
     * This utility method processes a key-value object and:
     * - Filters out undefined values to avoid sending empty parameters
     * - Automatically converts arrays to JSON strings for API compatibility
     * - Preserves other primitive types (string, number, boolean)
     *
     * @param options - Key-value pairs to convert to search parameters
     * @returns Filtered and formatted search parameters object
     *
     * @example
     * ```typescript
     * const params = this.buildSearchParams({
     *   query: "minecraft",
     *   tags: ["bukkit", "spigot"], // Becomes JSON string
     *   limit: 10,
     *   featured: true,
     *   empty: undefined // Filtered out
     * });
     * // Result: { query: "minecraft", tags: '["bukkit","spigot"]', limit: 10, featured: true }
     * ```
     *
     * @protected
     */
    protected buildSearchParams(options: Record<string, any>): Record<string, string | number | boolean>;
    /**
     * Gets default headers with User-Agent for all requests.
     *
     * This method provides consistent headers across all API requests.
     * Subclasses can override this method to add additional headers
     * like authentication tokens.
     *
     * @returns Standard headers object with User-Agent set
     *
     * @example
     * ```typescript
     * // Override in subclass to add auth
     * protected getHeaders(): Record<string, string> {
     *   return {
     *     ...super.getHeaders(),
     *     'Authorization': `Bearer ${this.apiKey}`
     *   };
     * }
     * ```
     *
     * @protected
     */
    protected getHeaders(): Record<string, string>;
    /**
     * Makes a GET request with consistent error handling and parameter processing.
     *
     * This is the primary method for GET requests. It handles:
     * - Automatic URL construction with baseUrl + endpoint
     * - Query parameter serialization via buildSearchParams
     * - Consistent header injection
     * - JSON response parsing
     * - Error handling through the abstract handleError method
     *
     * @template T - The expected response type
     * @param endpoint - API endpoint path (relative to baseUrl, should start with "/")
     * @param searchParams - Optional query parameters object
     * @returns Promise resolving to the parsed JSON response of type T
     * @throws Error as defined by the concrete implementation's handleError method
     *
     * @example
     * ```typescript
     * // GET https://api.example.com/v2/projects?limit=10&featured=true
     * const projects = await this.makeRequest<Project[]>("/projects", {
     *   limit: 10,
     *   featured: true
     * });
     * ```
     *
     * @protected
     */
    protected makeRequest<T>(endpoint: string, searchParams?: Record<string, any>): Promise<T>;
    /**
     * Makes a POST request with consistent error handling.
     *
     * This method handles POST requests with JSON payloads. It provides:
     * - Automatic JSON serialization of request body
     * - Optional query parameters
     * - Consistent header management
     * - Error handling through the abstract handleError method
     *
     * @template T - The expected response type
     * @param endpoint - API endpoint path (relative to baseUrl, should start with "/")
     * @param body - Request body data to be JSON-serialized
     * @param searchParams - Optional query parameters object
     * @returns Promise resolving to the parsed JSON response of type T
     * @throws Error as defined by the concrete implementation's handleError method
     *
     * @example
     * ```typescript
     * // POST https://api.example.com/v2/search?algorithm=sha1
     * const results = await this.makePostRequest<SearchResults>("/search", {
     *   hashes: ["abc123", "def456"]
     * }, { algorithm: "sha1" });
     * ```
     *
     * @protected
     */
    protected makePostRequest<T>(endpoint: string, body?: any, searchParams?: Record<string, any>): Promise<T>;
    /**
     * Makes a raw HTTP request for file downloads and other non-JSON responses.
     *
     * This method is designed for downloading files or getting responses that
     * should not be JSON-parsed. It returns the raw Response object for
     * maximum flexibility in handling binary data, streams, etc.
     *
     * @param url - Full URL to request (not relative to baseUrl)
     * @returns Promise resolving to the raw Response object
     * @throws Error as defined by the concrete implementation's handleError method
     *
     * @example
     * ```typescript
     * // Download a file
     * const response = await this.makeRawRequest("https://cdn.example.com/file.jar");
     * const blob = await response.blob();
     * const buffer = await response.arrayBuffer();
     * ```
     *
     * @protected
     */
    protected makeRawRequest(url: string): Promise<Response>;
    /**
     * Abstract method for API-specific error handling.
     *
     * Each API implementation must provide its own error mapping logic.
     * This method should examine the original error, determine the appropriate
     * error type and code for the specific API, and throw a properly formatted
     * error with contextual information.
     *
     * Common error scenarios to handle:
     * - HTTP status codes (404, 401, 429, 500, etc.)
     * - Network errors (ECONNRESET, ENOTFOUND)
     * - Timeout errors
     * - API-specific error responses
     *
     * @param error - The original error from the HTTP request
     * @param defaultCode - Fallback error code to use if specific mapping fails
     * @param defaultMessage - Fallback error message to use if specific mapping fails
     * @throws Never returns normally, must always throw an error
     *
     * @example
     * ```typescript
     * protected handleError(error: any, defaultCode: string, defaultMessage: string): never {
     *   if (error.response?.status === 404) {
     *     throw new MyAPIError("RESOURCE_NOT_FOUND", "Resource not found");
     *   }
     *   // ... other status code handling
     *   throw new MyAPIError(defaultCode, defaultMessage, { originalError: error });
     * }
     * ```
     *
     * @abstract
     * @protected
     */
    protected abstract handleError(error: any, defaultCode: string, defaultMessage: string): never;
}
//# sourceMappingURL=baseClient.d.ts.map