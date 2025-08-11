import { BaseAPIClient } from "../utils/baseClient";
import { SpigetSearchField, SpigetVersionMethod, SpigetErrorCode } from "../types/spigetType";
import type { SpigetSearchOptions, SpigetResource, SpigetAuthor, SpigetCategory, SpigetVersion, SpigetReview, SpigetUpdate, SpigetAPIStatus, SpigetResourcesForVersionResponse } from "../types/spigetType";
/**
 * Spiget API client for accessing SpigotMC resources and data.
 *
 * This class provides a comprehensive interface to the Spiget API (api.spiget.org),
 * which offers access to SpigotMC resources, authors, categories, and related data.
 * It supports searching, downloading, and managing Minecraft server plugins.
 *
 * @example
 * Basic usage:
 * ```typescript
 * const spiget = new SpigetAPI();
 *
 * // Search for resources
 * const resources = await spiget.searchResources("worldedit", {
 *   field: SpigetSearchField.NAME,
 *   options: { size: 10, sort: "-downloads" }
 * });
 *
 * // Get resource details
 * const resource = await spiget.getResource(28140);
 *
 * // Download a resource (if not external)
 * if (!resource.external) {
 *   const response = await spiget.downloadResource(28140);
 *   const buffer = await response.arrayBuffer();
 * }
 * ```
 *
 * @example
 * With custom configuration:
 * ```typescript
 * const spiget = new SpigetAPI({
 *   baseUrl: "https://api.spiget.org/v2",
 *   userAgent: "MyPlugin/1.0.0"
 * });
 * ```
 *
 * @see {@link https://spiget.org/} Spiget API Documentation
 * @since 1.0.0
 */
export declare class SpigetAPI extends BaseAPIClient {
    constructor(options?: {
        baseUrl?: string;
        userAgent?: string;
    });
    /**
     * Searches for resources by query.
     * @param query - Search query
     * @param field - Field to search in
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resources
     * @throws {SpigetError} When the API request fails
     */
    searchResources(query: string, { field, options, }: {
        field: SpigetSearchField;
        options?: SpigetSearchOptions;
    }): Promise<SpigetResource[]>;
    /**
     * Retrieves API status information.
     * @returns Promise resolving to API status information
     * @throws {SpigetError} When the API request fails
     */
    getStatus(): Promise<SpigetAPIStatus>;
    /**
     * Retrieves a list of all resources.
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resources
     * @throws {SpigetError} When the API request fails
     */
    getResources(options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Retrieves a list of premium resources.
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of premium resources
     * @throws {SpigetError} When the API request fails
     */
    getPremiumResources(options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Retrieves a list of free resources.
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of free resources
     * @throws {SpigetError} When the API request fails
     */
    getFreeResources(options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Retrieves a list of new resources.
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of new resources
     * @throws {SpigetError} When the API request fails
     */
    getNewResources(options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Retrieves resources for specific version(s).
     * @param version - Version(s) to filter by, separated by commas
     * @param method - Method to use for version checking (any or all)
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resources
     * @throws {SpigetError} When the API request fails
     */
    getResourcesForVersion(version: string, method?: SpigetVersionMethod, options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Retrieves detailed version search results including metadata.
     * @param version - Version(s) to filter by, separated by commas
     * @param method - Method to use for version checking (any or all)
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to the full version search response
     * @throws {SpigetError} When the API request fails
     */
    getResourcesForVersionDetailed(version: string, method?: SpigetVersionMethod, options?: SpigetSearchOptions): Promise<SpigetResourcesForVersionResponse>;
    /**
     * Retrieves a specific resource by ID.
     * @param resourceId - ID of the resource to retrieve
     * @returns Promise resolving to the resource
     * @throws {SpigetError} When the API request fails
     */
    getResource(resourceId: number): Promise<SpigetResource>;
    /**
     * Retrieves the author of a specific resource.
     * @param resourceId - ID of the resource
     * @returns Promise resolving to the resource author
     * @throws {SpigetError} When the API request fails
     */
    getResourceAuthor(resourceId: number): Promise<SpigetAuthor>;
    /**
     * Downloads a resource by redirecting to its download URL.
     * @param resourceId - ID of the resource to download
     * @returns Promise resolving to the download response
     * @throws {SpigetError} When the resource is external and cannot be downloaded
     */
    downloadResource(resourceId: number): Promise<Response>;
    /**
     * Retrieves versions of a specific resource.
     * @param resourceId - ID of the resource
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resource versions
     * @throws {SpigetError} When the API request fails
     */
    getResourceVersions(resourceId: number, options?: SpigetSearchOptions): Promise<SpigetVersion[]>;
    /**
     * Retrieves a specific version of a resource.
     * @param resourceId - ID of the resource
     * @param versionId - ID of the version
     * @returns Promise resolving to the resource version
     * @throws {SpigetError} When the API request fails
     */
    getResourceVersion(resourceId: number, versionId: number): Promise<SpigetVersion>;
    /**
     * Retrieves the latest version of a resource.
     * @param resourceId - ID of the resource
     * @returns Promise resolving to the latest resource version
     * @throws {SpigetError} When the API request fails
     */
    getResourceLatestVersion(resourceId: number): Promise<SpigetVersion>;
    /**
     * Downloads a specific version of a resource.
     * @param resourceId - ID of the resource
     * @param versionId - ID of the version or 'latest'
     * @returns Promise resolving to the download response
     * @throws {SpigetError} When the resource is external and cannot be downloaded
     */
    downloadResourceVersion(resourceId: number, versionId: string | number): Promise<Response>;
    /**
     * Retrieves updates of a specific resource.
     * @param resourceId - ID of the resource
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resource updates
     * @throws {SpigetError} When the API request fails
     */
    getResourceUpdates(resourceId: number, options?: SpigetSearchOptions): Promise<SpigetUpdate[]>;
    /**
     * Retrieves the latest update of a resource.
     * @param resourceId - ID of the resource
     * @returns Promise resolving to the latest resource update
     * @throws {SpigetError} When the API request fails
     */
    getResourceLatestUpdate(resourceId: number): Promise<SpigetUpdate>;
    /**
     * Retrieves reviews of a specific resource.
     * @param resourceId - ID of the resource
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resource reviews
     * @throws {SpigetError} When the API request fails
     */
    getResourceReviews(resourceId: number, options?: SpigetSearchOptions): Promise<SpigetReview[]>;
    /**
     * Retrieves a list of all authors.
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of authors
     * @throws {SpigetError} When the API request fails
     */
    getAuthors(options?: SpigetSearchOptions): Promise<SpigetAuthor[]>;
    /**
     * Retrieves a specific author by ID.
     * @param authorId - ID of the author to retrieve
     * @returns Promise resolving to the author
     * @throws {SpigetError} When the API request fails
     */
    getAuthor(authorId: number): Promise<SpigetAuthor>;
    /**
     * Retrieves resources by a specific author.
     * @param authorId - ID of the author
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resources
     * @throws {SpigetError} When the API request fails
     */
    getAuthorResources(authorId: number, options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Retrieves reviews by a specific author.
     * @param authorId - ID of the author
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of reviews
     * @throws {SpigetError} When the API request fails
     */
    getAuthorReviews(authorId: number, options?: SpigetSearchOptions): Promise<SpigetReview[]>;
    /**
     * Retrieves a list of all categories.
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of categories
     * @throws {SpigetError} When the API request fails
     */
    getCategories(options?: SpigetSearchOptions): Promise<SpigetCategory[]>;
    /**
     * Retrieves a specific category by ID.
     * @param categoryId - ID of the category to retrieve
     * @returns Promise resolving to the category
     * @throws {SpigetError} When the API request fails
     */
    getCategory(categoryId: number): Promise<SpigetCategory>;
    /**
     * Retrieves resources in a specific category.
     * @param categoryId - ID of the category
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of resources
     * @throws {SpigetError} When the API request fails
     */
    getCategoryResources(categoryId: number, options?: SpigetSearchOptions): Promise<SpigetResource[]>;
    /**
     * Searches for authors by query.
     * @param query - Search query
     * @param field - Field to search in
     * @param options - Optional parameters for pagination and sorting
     * @returns Promise resolving to an array of authors
     * @throws {SpigetError} When the API request fails
     */
    searchAuthors(query: string, field?: "name", options?: SpigetSearchOptions): Promise<SpigetAuthor[]>;
    /**
     * Handles errors from API requests and throws appropriate SpigetError
     * @param error - The original error
     * @param defaultCode - Default error code to use
     * @param defaultMessage - Default error message to use
     * @returns Never returns, always throws
     */
    protected handleError(error: any, defaultCode: SpigetErrorCode, defaultMessage: string): never;
}
//# sourceMappingURL=spiget.d.ts.map