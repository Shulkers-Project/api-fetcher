import { BaseAPIClient } from "../utils/baseClient";
import type {
  HangarProject,
  HangarProjectCompact,
  HangarVersion,
  HangarVersionCompact,
  HangarUser,
  HangarPaginatedResult,
  HangarProjectSearchOptions,
  HangarVersionSearchOptions,
  HangarAPIOptions,
  HangarDownloadStats,
} from "../types/hangarType";
import {
  HangarError,
  HangarErrorCode,
  HangarCategory,
  HangarPlatform,
  HangarProjectSort,
  HangarVersionChannel,
} from "../types/hangarType";

/**
 * Hangar API client for accessing PaperMC's plugin distribution platform.
 *
 * This class provides a comprehensive interface to the Hangar API (hangar.papermc.io),
 * which hosts plugins for Paper, Velocity, and Waterfall server platforms.
 * It focuses on public, non-authenticated endpoints for browsing and downloading plugins.
 *
 * @example
 * Basic usage:
 * ```typescript
 * const hangar = new HangarAPI();
 *
 * // Search for plugins
 * const searchResults = await hangar.searchProjects({
 *   q: "worldedit",
 *   category: HangarCategory.WORLD_MANAGEMENT,
 *   platform: HangarPlatform.PAPER,
 *   sort: HangarProjectSort.DOWNLOADS,
 *   limit: 10
 * });
 *
 * // Get project details
 * const project = await hangar.getProject("WorldEdit");
 *
 * // Get project versions
 * const versions = await hangar.getProjectVersions("WorldEdit", {
 *   platform: HangarPlatform.PAPER,
 *   limit: 5
 * });
 *
 * // Download a version
 * const response = await hangar.downloadVersion("WorldEdit", "7.2.15", HangarPlatform.PAPER);
 * const jarFile = await response.arrayBuffer();
 * ```
 *
 * @example
 * With custom configuration:
 * ```typescript
 * const hangar = new HangarAPI({
 *   baseUrl: "https://hangar.papermc.io/api/v1",
 *   userAgent: "MyPlugin/1.0.0",
 *   timeout: 10000
 * });
 * ```
 *
 * @example
 * Advanced search with multiple categories:
 * ```typescript
 * const results = await hangar.searchProjects({
 *   q: "permissions",
 *   category: [HangarCategory.ADMIN_TOOLS, HangarCategory.PROTECTION],
 *   platform: [HangarPlatform.PAPER, HangarPlatform.VELOCITY],
 *   sort: HangarProjectSort.RECENT_DOWNLOADS,
 *   limit: 20
 * });
 *
 * for (const project of results.result) {
 *   console.log(`${project.name} by ${project.owner} - ${project.stats.downloads} downloads`);
 * }
 * ```
 *
 * @see {@link https://hangar.papermc.io/} Hangar Platform
 * @see {@link https://docs.papermc.io/hangar/api} Hangar API Documentation
 * @since 1.0.0
 */
export class HangarAPI extends BaseAPIClient {
  constructor(options: HangarAPIOptions = {}) {
    super(
      options.baseUrl || "https://hangar.papermc.io/api/v1",
      options.userAgent || "shulkers/1.0.0"
    );
  }

  /**
   * Searches for projects on Hangar with various filtering and sorting options.
   *
   * @param options - Search parameters including query, filters, and pagination
   * @returns Promise resolving to paginated search results
   * @throws {HangarError} When the API request fails
   *
   * @example
   * ```typescript
   * // Simple text search
   * const results = await hangar.searchProjects({ q: "worldedit" });
   *
   * // Advanced search with filters
   * const results = await hangar.searchProjects({
   *   q: "economy",
   *   category: HangarCategory.ECONOMY,
   *   platform: HangarPlatform.PAPER,
   *   sort: HangarProjectSort.DOWNLOADS,
   *   limit: 25
   * });
   *
   * // Search by specific owner
   * const results = await hangar.searchProjects({
   *   owner: "sk89q",
   *   sort: HangarProjectSort.STARS
   * });
   * ```
   */
  async searchProjects(
    options: HangarProjectSearchOptions = {}
  ): Promise<HangarPaginatedResult<HangarProjectCompact>> {
    const params: Record<string, any> = {};

    if (options.q) params.q = options.q;
    if (options.owner) params.owner = options.owner;
    if (options.sort) params.sort = options.sort;
    if (options.limit !== undefined) params.limit = Math.min(options.limit, 25);
    if (options.offset !== undefined) params.offset = options.offset;

    // Handle category filter (single or multiple)
    if (options.category) {
      if (Array.isArray(options.category)) {
        params.category = options.category;
      } else {
        params.category = [options.category];
      }
    }

    // Handle platform filter (single or multiple)
    if (options.platform) {
      if (Array.isArray(options.platform)) {
        params.platform = options.platform;
      } else {
        params.platform = [options.platform];
      }
    }

    return this.makeRequest<HangarPaginatedResult<HangarProjectCompact>>(
      "/projects",
      params
    );
  }

  /**
   * Retrieves detailed information about a specific project.
   *
   * @param slugOrId - Project slug (e.g., "WorldEdit") or numeric ID
   * @returns Promise resolving to the project details
   * @throws {HangarError} When the project is not found or API request fails
   *
   * @example
   * ```typescript
   * // Get project by slug
   * const project = await hangar.getProject("WorldEdit");
   * console.log(`${project.name}: ${project.description}`);
   *
   * // Get project by ID
   * const project = await hangar.getProject("1234");
   *
   * // Access project statistics
   * console.log(`Downloads: ${project.stats.downloads}`);
   * console.log(`Stars: ${project.stats.stars}`);
   * ```
   */
  async getProject(slugOrId: string | number): Promise<HangarProject> {
    return this.makeRequest<HangarProject>(`/projects/${slugOrId}`);
  }

  /**
   * Retrieves information about a project's owner/author.
   *
   * @param username - Username of the project owner
   * @returns Promise resolving to user information
   * @throws {HangarError} When the user is not found or API request fails
   *
   * @example
   * ```typescript
   * const user = await hangar.getUser("sk89q");
   * console.log(`${user.name} has ${user.roles?.join(", ")} roles`);
   * ```
   */
  async getUser(username: string): Promise<HangarUser> {
    return this.makeRequest<HangarUser>(`/users/${username}`);
  }

  /**
   * Retrieves a list of versions for a specific project.
   *
   * @param slugOrId - Project slug or numeric ID
   * @param options - Filtering and pagination options
   * @returns Promise resolving to paginated version list
   * @throws {HangarError} When the project is not found or API request fails
   *
   * @example
   * ```typescript
   * // Get all versions
   * const versions = await hangar.getProjectVersions("WorldEdit");
   *
   * // Get versions for specific platform
   * const paperVersions = await hangar.getProjectVersions("WorldEdit", {
   *   platform: HangarPlatform.PAPER,
   *   limit: 10
   * });
   *
   * // Get only release versions
   * const releases = await hangar.getProjectVersions("WorldEdit", {
   *   channel: HangarVersionChannel.RELEASE
   * });
   * ```
   */
  async getProjectVersions(
    slugOrId: string | number,
    options: HangarVersionSearchOptions = {}
  ): Promise<HangarPaginatedResult<HangarVersionCompact>> {
    const params: Record<string, any> = {};

    if (options.limit !== undefined) params.limit = options.limit;
    if (options.offset !== undefined) params.offset = options.offset;

    // Handle platform filter
    if (options.platform) {
      if (Array.isArray(options.platform)) {
        params.platform = options.platform;
      } else {
        params.platform = [options.platform];
      }
    }

    // Handle channel filter
    if (options.channel) {
      if (Array.isArray(options.channel)) {
        params.channel = options.channel;
      } else {
        params.channel = [options.channel];
      }
    }

    return this.makeRequest<HangarPaginatedResult<HangarVersionCompact>>(
      `/projects/${slugOrId}/versions`,
      params
    );
  }

  /**
   * Retrieves detailed information about a specific project version.
   *
   * @param slugOrId - Project slug or numeric ID
   * @param version - Version name/number
   * @returns Promise resolving to version details
   * @throws {HangarError} When the version is not found or API request fails
   *
   * @example
   * ```typescript
   * const version = await hangar.getProjectVersion("WorldEdit", "7.2.15");
   *
   * // Check available platforms
   * const availablePlatforms = Object.keys(version.downloads);
   * console.log(`Available on: ${availablePlatforms.join(", ")}`);
   *
   * // Get download info
   * const paperDownload = version.downloads[HangarPlatform.PAPER];
   * if (paperDownload) {
   *   console.log(`File: ${paperDownload.name} (${paperDownload.sizeBytes} bytes)`);
   * }
   * ```
   */
  async getProjectVersion(
    slugOrId: string | number,
    version: string
  ): Promise<HangarVersion> {
    return this.makeRequest<HangarVersion>(
      `/projects/${slugOrId}/versions/${version}`
    );
  }

  /**
   * Downloads a specific version file for a given platform.
   *
   * @param slugOrId - Project slug or numeric ID
   * @param version - Version name/number
   * @param platform - Target platform
   * @returns Promise resolving to the download response
   * @throws {HangarError} When the version/platform is not available or download fails
   *
   * @example
   * ```typescript
   * // Download Paper version
   * const response = await hangar.downloadVersion("WorldEdit", "7.2.15", HangarPlatform.PAPER);
   * const jarFile = await response.arrayBuffer();
   *
   * // Save to file (Node.js example)
   * import { writeFileSync } from 'fs';
   * writeFileSync('worldedit.jar', new Uint8Array(jarFile));
   * ```
   */
  async downloadVersion(
    slugOrId: string | number,
    version: string,
    platform: HangarPlatform
  ): Promise<Response> {
    // Get version details to find the download URL
    const versionDetails = await this.getProjectVersion(slugOrId, version);
    const downloadInfo = versionDetails.downloads[platform];

    if (!downloadInfo) {
      throw new HangarError(
        HangarErrorCode.RESOURCE_NOT_FOUND,
        `Version ${version} is not available for platform ${platform}`,
        {
          slugOrId,
          version,
          platform,
          availablePlatforms: Object.keys(versionDetails.downloads),
        }
      );
    }

    return this.makeRawRequest(downloadInfo.downloadUrl);
  }

  /**
   * Gets the latest version of a project for a specific platform.
   *
   * @param slugOrId - Project slug or numeric ID
   * @param platform - Target platform (optional, returns first available if not specified)
   * @param channel - Version channel filter (optional)
   * @returns Promise resolving to the latest version details
   * @throws {HangarError} When no versions are found
   *
   * @example
   * ```typescript
   * // Get latest version for Paper
   * const latest = await hangar.getLatestVersion("WorldEdit", HangarPlatform.PAPER);
   *
   * // Get latest release version (any platform)
   * const latestRelease = await hangar.getLatestVersion("WorldEdit", undefined, HangarVersionChannel.RELEASE);
   *
   * // Download the latest version
   * if (latest.downloads[HangarPlatform.PAPER]) {
   *   const response = await hangar.downloadVersion("WorldEdit", latest.name, HangarPlatform.PAPER);
   * }
   * ```
   */
  async getLatestVersion(
    slugOrId: string | number,
    platform?: HangarPlatform,
    channel?: HangarVersionChannel
  ): Promise<HangarVersion> {
    const options: HangarVersionSearchOptions = { limit: 1 };
    if (platform) options.platform = platform;
    if (channel) options.channel = channel;

    const versionsResult = await this.getProjectVersions(slugOrId, options);

    if (versionsResult.result.length === 0) {
      throw new HangarError(
        HangarErrorCode.RESOURCE_NOT_FOUND,
        `No versions found for project ${slugOrId}`,
        { slugOrId, platform, channel }
      );
    }

    const latestVersionCompact = versionsResult.result[0]!;
    return this.getProjectVersion(slugOrId, latestVersionCompact.name);
  }

  /**
   * Downloads the latest version of a project for a specific platform.
   *
   * @param slugOrId - Project slug or numeric ID
   * @param platform - Target platform
   * @param channel - Version channel filter (optional)
   * @returns Promise resolving to the download response
   * @throws {HangarError} When no compatible version is found
   *
   * @example
   * ```typescript
   * // Download latest Paper version
   * const response = await hangar.downloadLatestVersion("WorldEdit", HangarPlatform.PAPER);
   * const jarFile = await response.arrayBuffer();
   *
   * // Download latest release for Velocity
   * const response = await hangar.downloadLatestVersion(
   *   "LuckPerms",
   *   HangarPlatform.VELOCITY,
   *   HangarVersionChannel.RELEASE
   * );
   * ```
   */
  async downloadLatestVersion(
    slugOrId: string | number,
    platform: HangarPlatform,
    channel?: HangarVersionChannel
  ): Promise<Response> {
    const latestVersion = await this.getLatestVersion(
      slugOrId,
      platform,
      channel
    );
    return this.downloadVersion(slugOrId, latestVersion.name, platform);
  }

  /**
   * Retrieves download statistics for a project (if available).
   *
   * @param slugOrId - Project slug or numeric ID
   * @param fromDate - Start date for statistics (YYYY-MM-DD format)
   * @param toDate - End date for statistics (YYYY-MM-DD format)
   * @returns Promise resolving to download statistics
   * @throws {HangarError} When statistics are not available or API request fails
   *
   * @example
   * ```typescript
   * // Get download stats for the last 30 days
   * const thirtyDaysAgo = new Date();
   * thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
   *
   * const stats = await hangar.getProjectStats("WorldEdit",
   *   thirtyDaysAgo.toISOString().split('T')[0],
   *   new Date().toISOString().split('T')[0]
   * );
   *
   * console.log(`Total downloads: ${stats.total}`);
   * ```
   */
  async getProjectStats(
    slugOrId: string | number,
    fromDate: string,
    toDate: string
  ): Promise<HangarDownloadStats> {
    return this.makeRequest<HangarDownloadStats>(
      `/projects/${slugOrId}/stats`,
      { fromDate, toDate }
    );
  }

  /**
   * Gets a list of all available project categories.
   *
   * @returns Promise resolving to available categories
   * @throws {HangarError} When API request fails
   *
   * @example
   * ```typescript
   * const categories = await hangar.getCategories();
   * console.log(`Available categories: ${categories.join(", ")}`);
   * ```
   */
  async getCategories(): Promise<string[]> {
    return this.makeRequest<string[]>("/data/categories");
  }

  /**
   * Gets a list of all supported platforms.
   *
   * @returns Promise resolving to supported platforms
   * @throws {HangarError} When API request fails
   *
   * @example
   * ```typescript
   * const platforms = await hangar.getPlatforms();
   * console.log(`Supported platforms: ${platforms.join(", ")}`);
   * ```
   */
  async getPlatforms(): Promise<string[]> {
    return this.makeRequest<string[]>("/data/platforms");
  }

  /**
   * Handles errors from API requests and throws appropriate HangarError
   * @param error - The original error
   * @param defaultCode - Default error code to use
   * @param defaultMessage - Default error message to use
   * @returns Never returns, always throws
   */
  protected handleError(
    error: any,
    defaultCode: HangarErrorCode,
    defaultMessage: string
  ): never {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new HangarError(
          HangarErrorCode.RESOURCE_NOT_FOUND,
          "Resource not found",
          { status, hangarError: error }
        );
      } else if (status === 401 || status === 403) {
        throw new HangarError(
          HangarErrorCode.UNAUTHORIZED,
          "Unauthorized access - this endpoint may require authentication",
          { status, hangarError: error }
        );
      } else if (status === 429) {
        throw new HangarError(
          HangarErrorCode.RATE_LIMIT_EXCEEDED,
          "Rate limit exceeded",
          { status, hangarError: error }
        );
      } else if (status === 422) {
        throw new HangarError(
          HangarErrorCode.VALIDATION_ERROR,
          "Validation error - check your request parameters",
          { status, hangarError: error }
        );
      } else if (status >= 400 && status < 500) {
        throw new HangarError(
          HangarErrorCode.INVALID_SEARCH_PARAMETERS,
          "Invalid request parameters",
          { status, hangarError: error }
        );
      } else if (status >= 500) {
        throw new HangarError(
          HangarErrorCode.API_REQUEST_FAILED,
          "Server error",
          { status, hangarError: error }
        );
      }
    }

    if (
      error.name === "NetworkError" ||
      error.code === "ECONNRESET" ||
      error.code === "ENOTFOUND"
    ) {
      throw new HangarError(
        HangarErrorCode.NETWORK_ERROR,
        "Network error occurred",
        { hangarError: error }
      );
    }

    throw new HangarError(defaultCode, defaultMessage, {
      hangarError: error,
    });
  }
}
