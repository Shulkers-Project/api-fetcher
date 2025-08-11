import { BaseAPIClient } from "../utils/baseClient";

import {
  SpigetSearchField,
  SpigetVersionMethod,
  SpigetError,
  SpigetErrorCode,
} from "../types/spigetType";

import type {
  SpigetSearchOptions,
  SpigetResource,
  SpigetAuthor,
  SpigetCategory,
  SpigetVersion,
  SpigetReview,
  SpigetUpdate,
  SpigetAPIStatus,
  SpigetWebhookEvent,
  SpigetWebhookRegistration,
  SpigetWebhookStatus,
  SpigetWebhookError,
  SpigetResourcesForVersionResponse,
} from "../types/spigetType";

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
export class SpigetAPI extends BaseAPIClient {
  constructor(options: { baseUrl?: string; userAgent?: string } = {}) {
    super(options.baseUrl ?? "https://api.spiget.org/v2", options.userAgent);
  }

  /**
   * Searches for resources by query.
   * @param query - Search query
   * @param field - Field to search in
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resources
   * @throws {SpigetError} When the API request fails
   */
  async searchResources(
    query: string,
    {
      field,
      options = {},
    }: { field: SpigetSearchField; options?: SpigetSearchOptions }
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>(`/search/resources/${query}`, {
      field,
      ...options,
    });
  }

  /**
   * Retrieves API status information.
   * @returns Promise resolving to API status information
   * @throws {SpigetError} When the API request fails
   */
  async getStatus(): Promise<SpigetAPIStatus> {
    return this.makeRequest<SpigetAPIStatus>("/status");
  }

  /**
   * Retrieves a list of all resources.
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resources
   * @throws {SpigetError} When the API request fails
   */
  async getResources(
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>("/resources", options);
  }

  /**
   * Retrieves a list of premium resources.
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of premium resources
   * @throws {SpigetError} When the API request fails
   */
  async getPremiumResources(
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>("/resources/premium", options);
  }

  /**
   * Retrieves a list of free resources.
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of free resources
   * @throws {SpigetError} When the API request fails
   */
  async getFreeResources(
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>("/resources/free", options);
  }

  /**
   * Retrieves a list of new resources.
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of new resources
   * @throws {SpigetError} When the API request fails
   */
  async getNewResources(
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>("/resources/new", options);
  }

  /**
   * Retrieves resources for specific version(s).
   * @param version - Version(s) to filter by, separated by commas
   * @param method - Method to use for version checking (any or all)
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resources
   * @throws {SpigetError} When the API request fails
   */
  async getResourcesForVersion(
    version: string,
    method: SpigetVersionMethod = SpigetVersionMethod.ANY,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    const data = await this.makeRequest<SpigetResourcesForVersionResponse>(
      `/resources/for/${version}`,
      { method, ...options }
    );
    return data.match;
  }

  /**
   * Retrieves detailed version search results including metadata.
   * @param version - Version(s) to filter by, separated by commas
   * @param method - Method to use for version checking (any or all)
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to the full version search response
   * @throws {SpigetError} When the API request fails
   */
  async getResourcesForVersionDetailed(
    version: string,
    method: SpigetVersionMethod = SpigetVersionMethod.ANY,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResourcesForVersionResponse> {
    return this.makeRequest<SpigetResourcesForVersionResponse>(
      `/resources/for/${version}`,
      { method, ...options }
    );
  }

  /**
   * Retrieves a specific resource by ID.
   * @param resourceId - ID of the resource to retrieve
   * @returns Promise resolving to the resource
   * @throws {SpigetError} When the API request fails
   */
  async getResource(resourceId: number): Promise<SpigetResource> {
    return this.makeRequest<SpigetResource>(`/resources/${resourceId}`);
  }

  /**
   * Retrieves the author of a specific resource.
   * @param resourceId - ID of the resource
   * @returns Promise resolving to the resource author
   * @throws {SpigetError} When the API request fails
   */
  async getResourceAuthor(resourceId: number): Promise<SpigetAuthor> {
    return this.makeRequest<SpigetAuthor>(`/resources/${resourceId}/author`);
  }

  /**
   * Downloads a resource by redirecting to its download URL.
   * @param resourceId - ID of the resource to download
   * @returns Promise resolving to the download response
   * @throws {SpigetError} When the resource is external and cannot be downloaded
   */
  async downloadResource(resourceId: number): Promise<Response> {
    const resource = await this.getResource(resourceId);

    if (resource.external) {
      throw new SpigetError(
        SpigetErrorCode.EXTERNAL_FILE_DOWNLOAD,
        `Cannot download external resource ${resourceId}. Use externalUrl instead.`,
        { resourceId, externalUrl: resource.file.externalUrl }
      );
    }

    return this.makeRawRequest(
      `${this.baseUrl}/resources/${resourceId}/download`
    );
  }

  /**
   * Retrieves versions of a specific resource.
   * @param resourceId - ID of the resource
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resource versions
   * @throws {SpigetError} When the API request fails
   */
  async getResourceVersions(
    resourceId: number,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetVersion[]> {
    return this.makeRequest<SpigetVersion[]>(
      `/resources/${resourceId}/versions`,
      options
    );
  }

  /**
   * Retrieves a specific version of a resource.
   * @param resourceId - ID of the resource
   * @param versionId - ID of the version
   * @returns Promise resolving to the resource version
   * @throws {SpigetError} When the API request fails
   */
  async getResourceVersion(
    resourceId: number,
    versionId: number
  ): Promise<SpigetVersion> {
    return this.makeRequest<SpigetVersion>(
      `/resources/${resourceId}/versions/${versionId}`
    );
  }

  /**
   * Retrieves the latest version of a resource.
   * @param resourceId - ID of the resource
   * @returns Promise resolving to the latest resource version
   * @throws {SpigetError} When the API request fails
   */
  async getResourceLatestVersion(resourceId: number): Promise<SpigetVersion> {
    return this.makeRequest<SpigetVersion>(
      `/resources/${resourceId}/versions/latest`
    );
  }

  /**
   * Downloads a specific version of a resource.
   * @param resourceId - ID of the resource
   * @param versionId - ID of the version or 'latest'
   * @returns Promise resolving to the download response
   * @throws {SpigetError} When the resource is external and cannot be downloaded
   */
  async downloadResourceVersion(
    resourceId: number,
    versionId: string | number
  ): Promise<Response> {
    const resource = await this.getResource(resourceId);

    if (resource.external) {
      throw new SpigetError(
        SpigetErrorCode.EXTERNAL_FILE_DOWNLOAD,
        `Cannot download external resource ${resourceId}. Use externalUrl instead.`,
        { resourceId, versionId, externalUrl: resource.file.externalUrl }
      );
    }

    return this.makeRawRequest(
      `${this.baseUrl}/resources/${resourceId}/versions/${versionId}/download`
    );
  }

  /**
   * Retrieves updates of a specific resource.
   * @param resourceId - ID of the resource
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resource updates
   * @throws {SpigetError} When the API request fails
   */
  async getResourceUpdates(
    resourceId: number,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetUpdate[]> {
    return this.makeRequest<SpigetUpdate[]>(
      `/resources/${resourceId}/updates`,
      options
    );
  }

  /**
   * Retrieves the latest update of a resource.
   * @param resourceId - ID of the resource
   * @returns Promise resolving to the latest resource update
   * @throws {SpigetError} When the API request fails
   */
  async getResourceLatestUpdate(resourceId: number): Promise<SpigetUpdate> {
    return this.makeRequest<SpigetUpdate>(
      `/resources/${resourceId}/updates/latest`
    );
  }

  /**
   * Retrieves reviews of a specific resource.
   * @param resourceId - ID of the resource
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resource reviews
   * @throws {SpigetError} When the API request fails
   */
  async getResourceReviews(
    resourceId: number,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetReview[]> {
    return this.makeRequest<SpigetReview[]>(
      `/resources/${resourceId}/reviews`,
      options
    );
  }

  /**
   * Retrieves a list of all authors.
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of authors
   * @throws {SpigetError} When the API request fails
   */
  async getAuthors(options: SpigetSearchOptions = {}): Promise<SpigetAuthor[]> {
    return this.makeRequest<SpigetAuthor[]>("/authors", options);
  }

  /**
   * Retrieves a specific author by ID.
   * @param authorId - ID of the author to retrieve
   * @returns Promise resolving to the author
   * @throws {SpigetError} When the API request fails
   */
  async getAuthor(authorId: number): Promise<SpigetAuthor> {
    return this.makeRequest<SpigetAuthor>(`/authors/${authorId}`);
  }

  /**
   * Retrieves resources by a specific author.
   * @param authorId - ID of the author
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resources
   * @throws {SpigetError} When the API request fails
   */
  async getAuthorResources(
    authorId: number,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>(
      `/authors/${authorId}/resources`,
      options
    );
  }

  /**
   * Retrieves reviews by a specific author.
   * @param authorId - ID of the author
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of reviews
   * @throws {SpigetError} When the API request fails
   */
  async getAuthorReviews(
    authorId: number,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetReview[]> {
    return this.makeRequest<SpigetReview[]>(
      `/authors/${authorId}/reviews`,
      options
    );
  }

  /**
   * Retrieves a list of all categories.
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of categories
   * @throws {SpigetError} When the API request fails
   */
  async getCategories(
    options: SpigetSearchOptions = {}
  ): Promise<SpigetCategory[]> {
    return this.makeRequest<SpigetCategory[]>("/categories", options);
  }

  /**
   * Retrieves a specific category by ID.
   * @param categoryId - ID of the category to retrieve
   * @returns Promise resolving to the category
   * @throws {SpigetError} When the API request fails
   */
  async getCategory(categoryId: number): Promise<SpigetCategory> {
    return this.makeRequest<SpigetCategory>(`/categories/${categoryId}`);
  }

  /**
   * Retrieves resources in a specific category.
   * @param categoryId - ID of the category
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of resources
   * @throws {SpigetError} When the API request fails
   */
  async getCategoryResources(
    categoryId: number,
    options: SpigetSearchOptions = {}
  ): Promise<SpigetResource[]> {
    return this.makeRequest<SpigetResource[]>(
      `/categories/${categoryId}/resources`,
      options
    );
  }

  /**
   * Searches for authors by query.
   * @param query - Search query
   * @param field - Field to search in
   * @param options - Optional parameters for pagination and sorting
   * @returns Promise resolving to an array of authors
   * @throws {SpigetError} When the API request fails
   */
  async searchAuthors(
    query: string,
    field: "name" = "name",
    options: SpigetSearchOptions = {}
  ): Promise<SpigetAuthor[]> {
    return this.makeRequest<SpigetAuthor[]>(`/search/authors/${query}`, {
      field,
      ...options,
    });
  }

  /**
   * Handles errors from API requests and throws appropriate SpigetError
   * @param error - The original error
   * @param defaultCode - Default error code to use
   * @param defaultMessage - Default error message to use
   * @returns Never returns, always throws
   */
  protected handleError(
    error: any,
    defaultCode: SpigetErrorCode,
    defaultMessage: string
  ): never {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new SpigetError(
          SpigetErrorCode.RESOURCE_NOT_FOUND,
          "Resource not found",
          { status, spigetError: error }
        );
      } else if (status === 401) {
        throw new SpigetError(
          SpigetErrorCode.UNAUTHORIZED,
          "Unauthorized access",
          { status, spigetError: error }
        );
      } else if (status === 429) {
        throw new SpigetError(
          SpigetErrorCode.RATE_LIMIT_EXCEEDED,
          "Rate limit exceeded",
          { status, spigetError: error }
        );
      } else if (status >= 400 && status < 500) {
        throw new SpigetError(
          SpigetErrorCode.INVALID_SEARCH_PARAMETERS,
          "Invalid request parameters",
          { status, spigetError: error }
        );
      } else if (status >= 500) {
        throw new SpigetError(
          SpigetErrorCode.API_REQUEST_FAILED,
          "Server error",
          { status, spigetError: error }
        );
      }
    }

    if (
      error.name === "NetworkError" ||
      error.code === "ECONNRESET" ||
      error.code === "ENOTFOUND"
    ) {
      throw new SpigetError(
        SpigetErrorCode.NETWORK_ERROR,
        "Network error occurred",
        { spigetError: error }
      );
    }

    throw new SpigetError(defaultCode, defaultMessage, {
      spigetError: error,
    });
  }
}
