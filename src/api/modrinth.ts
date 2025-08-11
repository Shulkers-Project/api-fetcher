import { BaseAPIClient } from "../utils/baseClient";
import {
  ModrinthError,
  ModrinthErrorCode,
  ModrinthSortIndex,
  ModrinthFacetBuilder,
  ModrinthFacetGroup,
  ModrinthFacet,
} from "../types/modrinthType";
import type {
  ModrinthSearchOptions,
  ModrinthSearchResults,
  ModrinthProject,
  ModrinthVersion,
  ModrinthUser,
  ModrinthTeamMember,
  ModrinthCategoryTag,
  ModrinthLoaderTag,
  ModrinthGameVersionTag,
  ModrinthStatistics,
  ModrinthForgeUpdates,
  ModrinthHashVersionMap,
  ModrinthGetLatestVersionFromHashBody,
  ModrinthGetLatestVersionsFromHashesBody,
  ModrinthHashList,
  ModrinthProjectResult,
} from "../types/modrinthType";

/**
 * Modrinth API client class
 */
/**
 * Modrinth API client for accessing Modrinth projects, versions, and data.
 *
 * This class provides a comprehensive interface to the Modrinth API (api.modrinth.com),
 * which offers access to Minecraft mods, plugins, resource packs, and related data.
 * It supports advanced search capabilities, version management, and file downloads.
 *
 * @example
 * Basic usage:
 * ```typescript
 * const modrinth = new ModrinthAPI();
 *
 * // Search for projects with facets
 * const results = await modrinth.searchProjects({
 *   query: "sodium",
 *   facets: [["categories:optimization"], ["project_type:mod"]],
 *   limit: 20
 * });
 *
 * // Get project details
 * const project = await modrinth.getProject("AANobbMI");
 *
 * // Download latest version
 * const response = await modrinth.downloadLatestProjectFile("sodium", {
 *   loaders: ["fabric"],
 *   game_versions: ["1.20.1"]
 * });
 * ```
 *
 * @example
 * Advanced facet usage:
 * ```typescript
 * import { ModrinthFacetBuilder, ModrinthFacetType } from 'shulkers';
 *
 * const facets = new ModrinthFacetBuilder()
 *   .category("optimization")
 *   .projectType("mod")
 *   .gameVersion("1.20.1")
 *   .build();
 *
 * const results = await modrinth.searchProjects({ facets });
 * ```
 *
 * @example
 * Version management:
 * ```typescript
 * // Get all versions for a project
 * const versions = await modrinth.getProjectVersions("sodium", {
 *   loaders: ["fabric"],
 *   game_versions: ["1.20.1"],
 *   featured: true
 * });
 *
 * // Get version by hash
 * const version = await modrinth.getVersionFromHash(
 *   "abc123def456",
 *   "sha1"
 * );
 * ```
 *
 * @see {@link https://docs.modrinth.com/api-spec/} Modrinth API Documentation
 * @since 1.0.0
 */
export class ModrinthAPI extends BaseAPIClient {
  constructor(options: { baseUrl?: string; userAgent?: string } = {}) {
    super(
      options.baseUrl || "https://api.modrinth.com/v2",
      options.userAgent || "shulkers/1.0.0"
    );
  }

  /**
   * Searches for projects with optional filters
   * @param options - Search options including query, facets, and pagination
   * @returns Promise resolving to search results
   * @throws {ModrinthError} When the API request fails
   */
  async searchProjects(
    options: ModrinthSearchOptions = {}
  ): Promise<ModrinthSearchResults> {
    const {
      query,
      facets,
      index = ModrinthSortIndex.RELEVANCE,
      offset = 0,
      limit = 10,
    } = options;

    const params: any = { index, offset, limit };
    if (query) params.query = query;
    if (facets) params.facets = this.processFacets(facets);

    return this.makeRequest<ModrinthSearchResults>("/search", params);
  }

  /**
   * Processes facets into a string format for API requests
   * @param facets - Facets in various formats
   * @returns Processed facets string
   */
  private processFacets(
    facets: string | ModrinthFacetBuilder | ModrinthFacetGroup | ModrinthFacet[]
  ): string {
    if (typeof facets === "string") return facets;
    if (facets instanceof ModrinthFacetBuilder) return facets.build();
    if (facets instanceof ModrinthFacetGroup)
      return JSON.stringify([facets.toArray()]);
    if (Array.isArray(facets))
      return JSON.stringify([facets.map((f) => f.toString())]);
    return "";
  }

  /**
   * Retrieves a specific project by ID or slug
   * @param id - Project ID or slug
   * @returns Promise resolving to the project
   * @throws {ModrinthError} When the API request fails
   */
  async getProject(id: string): Promise<ModrinthProject> {
    return this.makeRequest<ModrinthProject>(`/project/${id}`);
  }

  /**
   * Retrieves multiple projects by IDs or slugs
   * @param ids - Array of project IDs or slugs
   * @returns Promise resolving to an array of projects
   * @throws {ModrinthError} When the API request fails
   */
  async getProjects(ids: string[]): Promise<ModrinthProject[]> {
    return this.makeRequest<ModrinthProject[]>("/projects", { ids });
  }

  /**
   * Retrieves random projects
   * @param count - Number of random projects to return (max 100)
   * @returns Promise resolving to an array of random projects
   * @throws {ModrinthError} When the API request fails
   */
  async getRandomProjects(count: number = 10): Promise<ModrinthProject[]> {
    if (count < 0 || count > 100) {
      throw new ModrinthError(
        ModrinthErrorCode.INVALID_SEARCH_PARAMETERS,
        "Count must be between 0 and 100"
      );
    }
    return this.makeRequest<ModrinthProject[]>("/projects_random", { count });
  }

  /**
   * Checks if a project slug/ID is valid
   * @param id - Project ID or slug to check
   * @returns Promise resolving to project identifier info
   * @throws {ModrinthError} When the API request fails
   */
  async checkProjectValidity(id: string): Promise<{ id: string }> {
    return this.makeRequest<{ id: string }>(`/project/${id}/check`);
  }

  /**
   * Retrieves a project's dependencies
   * @param id - Project ID or slug
   * @returns Promise resolving to project dependencies
   * @throws {ModrinthError} When the API request fails
   */
  async getProjectDependencies(id: string): Promise<{
    projects: ModrinthProject[];
    versions: ModrinthVersion[];
  }> {
    return this.makeRequest(`/project/${id}/dependencies`);
  }

  /**
   * Retrieves a project's team members
   * @param id - Project ID or slug
   * @returns Promise resolving to an array of team members
   * @throws {ModrinthError} When the API request fails
   */
  async getProjectTeamMembers(id: string): Promise<ModrinthTeamMember[]> {
    return this.makeRequest<ModrinthTeamMember[]>(`/project/${id}/members`);
  }

  /**
   * Retrieves a project's versions
   * @param id - Project ID or slug
   * @param options - Optional filters for loaders, game versions, and featured status
   * @returns Promise resolving to an array of versions
   * @throws {ModrinthError} When the API request fails
   */
  async getProjectVersions(
    id: string,
    options: {
      loaders?: string[];
      game_versions?: string[];
      featured?: boolean;
    } = {}
  ): Promise<ModrinthVersion[]> {
    return this.makeRequest<ModrinthVersion[]>(
      `/project/${id}/version`,
      options
    );
  }

  /**
   * Retrieves a specific version by ID
   * @param id - Version ID
   * @returns Promise resolving to the version
   * @throws {ModrinthError} When the API request fails
   */
  async getVersion(id: string): Promise<ModrinthVersion> {
    return this.makeRequest<ModrinthVersion>(`/version/${id}`);
  }

  /**
   * Retrieves multiple versions by IDs
   * @param ids - Array of version IDs
   * @returns Promise resolving to an array of versions
   * @throws {ModrinthError} When the API request fails
   */
  async getVersions(ids: string[]): Promise<ModrinthVersion[]> {
    return this.makeRequest<ModrinthVersion[]>("/versions", { ids });
  }

  /**
   * Retrieves a version by project ID/slug and version number or ID
   * @param projectId - Project ID or slug
   * @param versionId - Version ID or version number
   * @returns Promise resolving to the version
   * @throws {ModrinthError} When the API request fails
   */
  async getVersionFromProject(
    projectId: string,
    versionId: string
  ): Promise<ModrinthVersion> {
    return this.makeRequest<ModrinthVersion>(
      `/project/${projectId}/version/${versionId}`
    );
  }

  /**
   * Retrieves version from file hash
   * @param hash - File hash
   * @param algorithm - Hash algorithm (sha1 or sha512)
   * @param multiple - Whether to return multiple results
   * @returns Promise resolving to the version
   * @throws {ModrinthError} When the API request fails
   */
  async getVersionFromHash(
    hash: string,
    algorithm: string = "sha1",
    multiple: boolean = false
  ): Promise<ModrinthVersion> {
    return this.makeRequest<ModrinthVersion>(`/version_file/${hash}`, {
      algorithm,
      multiple,
    });
  }

  /**
   * Retrieves versions from multiple hashes
   * @param hashList - List of hashes and algorithm
   * @returns Promise resolving to a hash-version map
   * @throws {ModrinthError} When the API request fails
   */
  async getVersionsFromHashes(
    hashList: ModrinthHashList
  ): Promise<ModrinthHashVersionMap> {
    return this.makePostRequest<ModrinthHashVersionMap>(
      "/version_files",
      hashList
    );
  }

  /**
   * Retrieves latest version from hash with loader and game version filters
   * @param hash - File hash
   * @param algorithm - Hash algorithm (sha1 or sha512)
   * @param updateInfo - Loader and game version information
   * @returns Promise resolving to the latest version
   * @throws {ModrinthError} When the API request fails
   */
  async getLatestVersionFromHash(
    hash: string,
    algorithm: string = "sha1",
    updateInfo: ModrinthGetLatestVersionFromHashBody
  ): Promise<ModrinthVersion> {
    return this.makePostRequest<ModrinthVersion>(
      `/version_file/${hash}/update`,
      updateInfo,
      { algorithm }
    );
  }

  /**
   * Retrieves latest versions from multiple hashes
   * @param updateInfo - Hashes, algorithm, loaders, and game versions
   * @returns Promise resolving to a hash-version map
   * @throws {ModrinthError} When the API request fails
   */
  async getLatestVersionsFromHashes(
    updateInfo: ModrinthGetLatestVersionsFromHashesBody
  ): Promise<ModrinthHashVersionMap> {
    return this.makePostRequest<ModrinthHashVersionMap>(
      "/version_files/update",
      updateInfo
    );
  }

  /**
   * Retrieves a user by ID or username
   * @param id - User ID or username
   * @returns Promise resolving to the user
   * @throws {ModrinthError} When the API request fails
   */
  async getUser(id: string): Promise<ModrinthUser> {
    return this.makeRequest<ModrinthUser>(`/user/${id}`);
  }

  /**
   * Retrieves multiple users by IDs or usernames
   * @param ids - Array of user IDs or usernames
   * @returns Promise resolving to an array of users
   * @throws {ModrinthError} When the API request fails
   */
  async getUsers(ids: string[]): Promise<ModrinthUser[]> {
    return this.makeRequest<ModrinthUser[]>("/users", { ids });
  }

  /**
   * Retrieves a user's projects
   * @param id - User ID or username
   * @returns Promise resolving to an array of projects
   * @throws {ModrinthError} When the API request fails
   */
  async getUserProjects(id: string): Promise<ModrinthProject[]> {
    return this.makeRequest<ModrinthProject[]>(`/user/${id}/projects`);
  }

  /**
   * Retrieves team members for multiple teams
   * @param teamIds - Array of team IDs
   * @returns Promise resolving to an array of team member arrays
   * @throws {ModrinthError} When the API request fails
   */
  async getTeams(teamIds: string[]): Promise<ModrinthTeamMember[][]> {
    return this.makeRequest<ModrinthTeamMember[][]>("/teams", { ids: teamIds });
  }

  /**
   * Retrieves a team's members
   * @param teamId - Team ID
   * @returns Promise resolving to an array of team members
   * @throws {ModrinthError} When the API request fails
   */
  async getTeamMembers(teamId: string): Promise<ModrinthTeamMember[]> {
    return this.makeRequest<ModrinthTeamMember[]>(`/team/${teamId}/members`);
  }

  /**
   * Retrieves available categories
   * @returns Promise resolving to an array of categories
   * @throws {ModrinthError} When the API request fails
   */
  async getCategories(): Promise<ModrinthCategoryTag[]> {
    return this.makeRequest<ModrinthCategoryTag[]>("/tag/category");
  }

  /**
   * Retrieves available loaders
   * @returns Promise resolving to an array of loaders
   * @throws {ModrinthError} When the API request fails
   */
  async getLoaders(): Promise<ModrinthLoaderTag[]> {
    return this.makeRequest<ModrinthLoaderTag[]>("/tag/loader");
  }

  /**
   * Retrieves available game versions
   * @returns Promise resolving to an array of game versions
   * @throws {ModrinthError} When the API request fails
   */
  async getGameVersions(): Promise<ModrinthGameVersionTag[]> {
    return this.makeRequest<ModrinthGameVersionTag[]>("/tag/game_version");
  }

  /**
   * Retrieves available project types
   * @returns Promise resolving to an array of project types
   * @throws {ModrinthError} When the API request fails
   */
  async getProjectTypes(): Promise<string[]> {
    return this.makeRequest<string[]>("/tag/project_type");
  }

  /**
   * Retrieves available side types
   * @returns Promise resolving to an array of side types
   * @throws {ModrinthError} When the API request fails
   */
  async getSideTypes(): Promise<string[]> {
    return this.makeRequest<string[]>("/tag/side_type");
  }

  /**
   * Retrieves available report types
   * @returns Promise resolving to an array of report types
   * @throws {ModrinthError} When the API request fails
   */
  async getReportTypes(): Promise<string[]> {
    return this.makeRequest<string[]>("/tag/report_type");
  }

  /**
   * Retrieves Forge updates JSON for a project
   * @param id - Project ID or slug
   * @returns Promise resolving to Forge updates information
   * @throws {ModrinthError} When the API request fails
   */
  async getForgeUpdates(id: string): Promise<ModrinthForgeUpdates> {
    return this.makeRequest<ModrinthForgeUpdates>(
      `/updates/${id}/forge_updates.json`
    );
  }

  /**
   * Retrieves Modrinth statistics
   * @returns Promise resolving to statistics
   * @throws {ModrinthError} When the API request fails
   */
  async getStatistics(): Promise<ModrinthStatistics> {
    return this.makeRequest<ModrinthStatistics>("/statistics");
  }

  /**
   * Downloads a version file by direct URL
   * @param url - Direct download URL from version file
   * @returns Promise resolving to the download response
   * @throws {ModrinthError} When the download fails
   */
  async downloadFile(url: string): Promise<Response> {
    return this.makeRawRequest(url);
  }

  /**
   * Downloads the primary file of a version
   * @param versionId - Version ID
   * @returns Promise resolving to the download response
   * @throws {ModrinthError} When the download fails
   */
  async downloadVersionFile(versionId: string): Promise<Response> {
    const version = await this.getVersion(versionId);
    const primaryFile =
      version.files.find((file) => file.primary) || version.files[0];

    if (!primaryFile) {
      throw new ModrinthError(
        ModrinthErrorCode.RESOURCE_NOT_FOUND,
        `No files found for version ${versionId}`
      );
    }

    return this.downloadFile(primaryFile.url);
  }

  /**
   * Downloads a specific file from a version
   * @param versionId - Version ID
   * @param filename - Specific filename to download
   * @returns Promise resolving to the download response
   * @throws {ModrinthError} When the download fails
   */
  async downloadVersionFileByName(
    versionId: string,
    filename: string
  ): Promise<Response> {
    const version = await this.getVersion(versionId);
    const file = version.files.find((f) => f.filename === filename);

    if (!file) {
      throw new ModrinthError(
        ModrinthErrorCode.RESOURCE_NOT_FOUND,
        `File ${filename} not found in version ${versionId}`
      );
    }

    return this.downloadFile(file.url);
  }

  /**
   * Downloads the latest version file of a project
   * @param projectId - Project ID or slug
   * @param options - Optional filters for loaders and game versions
   * @returns Promise resolving to the download response
   * @throws {ModrinthError} When the download fails
   */
  async downloadLatestProjectFile(
    projectId: string,
    options: {
      loaders?: string[];
      game_versions?: string[];
    } = {}
  ): Promise<Response> {
    const versions = await this.getProjectVersions(projectId, options);

    if (versions.length === 0) {
      throw new ModrinthError(
        ModrinthErrorCode.RESOURCE_NOT_FOUND,
        `No versions found for project ${projectId}`
      );
    }

    return this.downloadVersionFile(versions[0]!.id);
  }

  /**
   * Gets file content as ArrayBuffer
   * @param url - Direct download URL from version file
   * @returns Promise resolving to the file content as ArrayBuffer
   * @throws {ModrinthError} When the download fails
   */
  async getFileContent(url: string): Promise<ArrayBuffer> {
    const response = await this.downloadFile(url);
    return response.arrayBuffer();
  }

  /**
   * Gets file content as Blob
   * @param url - Direct download URL from version file
   * @returns Promise resolving to the file content as Blob
   * @throws {ModrinthError} When the download fails
   */
  async getFileBlob(url: string): Promise<Blob> {
    const response = await this.downloadFile(url);
    return response.blob() as unknown as Promise<Blob>;
  }

  /**
   * Handles errors from API requests and throws appropriate ModrinthError
   * @param error - The original error
   * @param defaultCode - Default error code to use
   * @param defaultMessage - Default error message to use
   * @returns Never returns, always throws
   */
  protected handleError(
    error: any,
    defaultCode: ModrinthErrorCode,
    defaultMessage: string
  ): never {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new ModrinthError(
          ModrinthErrorCode.RESOURCE_NOT_FOUND,
          "Resource not found",
          { status, modrinthError: error }
        );
      } else if (status === 401) {
        throw new ModrinthError(
          ModrinthErrorCode.UNAUTHORIZED,
          "Unauthorized access",
          { status, modrinthError: error }
        );
      } else if (status === 429) {
        throw new ModrinthError(
          ModrinthErrorCode.RATE_LIMIT_EXCEEDED,
          "Rate limit exceeded",
          { status, modrinthError: error }
        );
      } else if (status >= 400 && status < 500) {
        throw new ModrinthError(
          ModrinthErrorCode.INVALID_SEARCH_PARAMETERS,
          "Invalid request parameters",
          { status, modrinthError: error }
        );
      } else if (status >= 500) {
        throw new ModrinthError(
          ModrinthErrorCode.API_REQUEST_FAILED,
          "Server error",
          { status, modrinthError: error }
        );
      }
    }

    if (
      error.name === "NetworkError" ||
      error.code === "ECONNRESET" ||
      error.code === "ENOTFOUND"
    ) {
      throw new ModrinthError(
        ModrinthErrorCode.NETWORK_ERROR,
        "Network error occurred",
        { modrinthError: error }
      );
    }

    throw new ModrinthError(defaultCode, defaultMessage, {
      modrinthError: error,
    });
  }
}
