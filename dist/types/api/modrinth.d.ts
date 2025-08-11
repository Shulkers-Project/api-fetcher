import { BaseAPIClient } from "../utils/baseClient";
import { ModrinthErrorCode } from "../types/modrinthType";
import type { ModrinthSearchOptions, ModrinthSearchResults, ModrinthProject, ModrinthVersion, ModrinthUser, ModrinthTeamMember, ModrinthCategoryTag, ModrinthLoaderTag, ModrinthGameVersionTag, ModrinthStatistics, ModrinthForgeUpdates, ModrinthHashVersionMap, ModrinthGetLatestVersionFromHashBody, ModrinthGetLatestVersionsFromHashesBody, ModrinthHashList } from "../types/modrinthType";
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
export declare class ModrinthAPI extends BaseAPIClient {
    constructor(options?: {
        baseUrl?: string;
        userAgent?: string;
    });
    /**
     * Searches for projects with optional filters
     * @param options - Search options including query, facets, and pagination
     * @returns Promise resolving to search results
     * @throws {ModrinthError} When the API request fails
     */
    searchProjects(options?: ModrinthSearchOptions): Promise<ModrinthSearchResults>;
    /**
     * Processes facets into a string format for API requests
     * @param facets - Facets in various formats
     * @returns Processed facets string
     */
    private processFacets;
    /**
     * Retrieves a specific project by ID or slug
     * @param id - Project ID or slug
     * @returns Promise resolving to the project
     * @throws {ModrinthError} When the API request fails
     */
    getProject(id: string): Promise<ModrinthProject>;
    /**
     * Retrieves multiple projects by IDs or slugs
     * @param ids - Array of project IDs or slugs
     * @returns Promise resolving to an array of projects
     * @throws {ModrinthError} When the API request fails
     */
    getProjects(ids: string[]): Promise<ModrinthProject[]>;
    /**
     * Retrieves random projects
     * @param count - Number of random projects to return (max 100)
     * @returns Promise resolving to an array of random projects
     * @throws {ModrinthError} When the API request fails
     */
    getRandomProjects(count?: number): Promise<ModrinthProject[]>;
    /**
     * Checks if a project slug/ID is valid
     * @param id - Project ID or slug to check
     * @returns Promise resolving to project identifier info
     * @throws {ModrinthError} When the API request fails
     */
    checkProjectValidity(id: string): Promise<{
        id: string;
    }>;
    /**
     * Retrieves a project's dependencies
     * @param id - Project ID or slug
     * @returns Promise resolving to project dependencies
     * @throws {ModrinthError} When the API request fails
     */
    getProjectDependencies(id: string): Promise<{
        projects: ModrinthProject[];
        versions: ModrinthVersion[];
    }>;
    /**
     * Retrieves a project's team members
     * @param id - Project ID or slug
     * @returns Promise resolving to an array of team members
     * @throws {ModrinthError} When the API request fails
     */
    getProjectTeamMembers(id: string): Promise<ModrinthTeamMember[]>;
    /**
     * Retrieves a project's versions
     * @param id - Project ID or slug
     * @param options - Optional filters for loaders, game versions, and featured status
     * @returns Promise resolving to an array of versions
     * @throws {ModrinthError} When the API request fails
     */
    getProjectVersions(id: string, options?: {
        loaders?: string[];
        game_versions?: string[];
        featured?: boolean;
    }): Promise<ModrinthVersion[]>;
    /**
     * Retrieves a specific version by ID
     * @param id - Version ID
     * @returns Promise resolving to the version
     * @throws {ModrinthError} When the API request fails
     */
    getVersion(id: string): Promise<ModrinthVersion>;
    /**
     * Retrieves multiple versions by IDs
     * @param ids - Array of version IDs
     * @returns Promise resolving to an array of versions
     * @throws {ModrinthError} When the API request fails
     */
    getVersions(ids: string[]): Promise<ModrinthVersion[]>;
    /**
     * Retrieves a version by project ID/slug and version number or ID
     * @param projectId - Project ID or slug
     * @param versionId - Version ID or version number
     * @returns Promise resolving to the version
     * @throws {ModrinthError} When the API request fails
     */
    getVersionFromProject(projectId: string, versionId: string): Promise<ModrinthVersion>;
    /**
     * Retrieves version from file hash
     * @param hash - File hash
     * @param algorithm - Hash algorithm (sha1 or sha512)
     * @param multiple - Whether to return multiple results
     * @returns Promise resolving to the version
     * @throws {ModrinthError} When the API request fails
     */
    getVersionFromHash(hash: string, algorithm?: string, multiple?: boolean): Promise<ModrinthVersion>;
    /**
     * Retrieves versions from multiple hashes
     * @param hashList - List of hashes and algorithm
     * @returns Promise resolving to a hash-version map
     * @throws {ModrinthError} When the API request fails
     */
    getVersionsFromHashes(hashList: ModrinthHashList): Promise<ModrinthHashVersionMap>;
    /**
     * Retrieves latest version from hash with loader and game version filters
     * @param hash - File hash
     * @param algorithm - Hash algorithm (sha1 or sha512)
     * @param updateInfo - Loader and game version information
     * @returns Promise resolving to the latest version
     * @throws {ModrinthError} When the API request fails
     */
    getLatestVersionFromHash(hash: string, algorithm: string | undefined, updateInfo: ModrinthGetLatestVersionFromHashBody): Promise<ModrinthVersion>;
    /**
     * Retrieves latest versions from multiple hashes
     * @param updateInfo - Hashes, algorithm, loaders, and game versions
     * @returns Promise resolving to a hash-version map
     * @throws {ModrinthError} When the API request fails
     */
    getLatestVersionsFromHashes(updateInfo: ModrinthGetLatestVersionsFromHashesBody): Promise<ModrinthHashVersionMap>;
    /**
     * Retrieves a user by ID or username
     * @param id - User ID or username
     * @returns Promise resolving to the user
     * @throws {ModrinthError} When the API request fails
     */
    getUser(id: string): Promise<ModrinthUser>;
    /**
     * Retrieves multiple users by IDs or usernames
     * @param ids - Array of user IDs or usernames
     * @returns Promise resolving to an array of users
     * @throws {ModrinthError} When the API request fails
     */
    getUsers(ids: string[]): Promise<ModrinthUser[]>;
    /**
     * Retrieves a user's projects
     * @param id - User ID or username
     * @returns Promise resolving to an array of projects
     * @throws {ModrinthError} When the API request fails
     */
    getUserProjects(id: string): Promise<ModrinthProject[]>;
    /**
     * Retrieves team members for multiple teams
     * @param teamIds - Array of team IDs
     * @returns Promise resolving to an array of team member arrays
     * @throws {ModrinthError} When the API request fails
     */
    getTeams(teamIds: string[]): Promise<ModrinthTeamMember[][]>;
    /**
     * Retrieves a team's members
     * @param teamId - Team ID
     * @returns Promise resolving to an array of team members
     * @throws {ModrinthError} When the API request fails
     */
    getTeamMembers(teamId: string): Promise<ModrinthTeamMember[]>;
    /**
     * Retrieves available categories
     * @returns Promise resolving to an array of categories
     * @throws {ModrinthError} When the API request fails
     */
    getCategories(): Promise<ModrinthCategoryTag[]>;
    /**
     * Retrieves available loaders
     * @returns Promise resolving to an array of loaders
     * @throws {ModrinthError} When the API request fails
     */
    getLoaders(): Promise<ModrinthLoaderTag[]>;
    /**
     * Retrieves available game versions
     * @returns Promise resolving to an array of game versions
     * @throws {ModrinthError} When the API request fails
     */
    getGameVersions(): Promise<ModrinthGameVersionTag[]>;
    /**
     * Retrieves available project types
     * @returns Promise resolving to an array of project types
     * @throws {ModrinthError} When the API request fails
     */
    getProjectTypes(): Promise<string[]>;
    /**
     * Retrieves available side types
     * @returns Promise resolving to an array of side types
     * @throws {ModrinthError} When the API request fails
     */
    getSideTypes(): Promise<string[]>;
    /**
     * Retrieves available report types
     * @returns Promise resolving to an array of report types
     * @throws {ModrinthError} When the API request fails
     */
    getReportTypes(): Promise<string[]>;
    /**
     * Retrieves Forge updates JSON for a project
     * @param id - Project ID or slug
     * @returns Promise resolving to Forge updates information
     * @throws {ModrinthError} When the API request fails
     */
    getForgeUpdates(id: string): Promise<ModrinthForgeUpdates>;
    /**
     * Retrieves Modrinth statistics
     * @returns Promise resolving to statistics
     * @throws {ModrinthError} When the API request fails
     */
    getStatistics(): Promise<ModrinthStatistics>;
    /**
     * Downloads a version file by direct URL
     * @param url - Direct download URL from version file
     * @returns Promise resolving to the download response
     * @throws {ModrinthError} When the download fails
     */
    downloadFile(url: string): Promise<Response>;
    /**
     * Downloads the primary file of a version
     * @param versionId - Version ID
     * @returns Promise resolving to the download response
     * @throws {ModrinthError} When the download fails
     */
    downloadVersionFile(versionId: string): Promise<Response>;
    /**
     * Downloads a specific file from a version
     * @param versionId - Version ID
     * @param filename - Specific filename to download
     * @returns Promise resolving to the download response
     * @throws {ModrinthError} When the download fails
     */
    downloadVersionFileByName(versionId: string, filename: string): Promise<Response>;
    /**
     * Downloads the latest version file of a project
     * @param projectId - Project ID or slug
     * @param options - Optional filters for loaders and game versions
     * @returns Promise resolving to the download response
     * @throws {ModrinthError} When the download fails
     */
    downloadLatestProjectFile(projectId: string, options?: {
        loaders?: string[];
        game_versions?: string[];
    }): Promise<Response>;
    /**
     * Gets file content as ArrayBuffer
     * @param url - Direct download URL from version file
     * @returns Promise resolving to the file content as ArrayBuffer
     * @throws {ModrinthError} When the download fails
     */
    getFileContent(url: string): Promise<ArrayBuffer>;
    /**
     * Gets file content as Blob
     * @param url - Direct download URL from version file
     * @returns Promise resolving to the file content as Blob
     * @throws {ModrinthError} When the download fails
     */
    getFileBlob(url: string): Promise<Blob>;
    /**
     * Handles errors from API requests and throws appropriate ModrinthError
     * @param error - The original error
     * @param defaultCode - Default error code to use
     * @param defaultMessage - Default error message to use
     * @returns Never returns, always throws
     */
    protected handleError(error: any, defaultCode: ModrinthErrorCode, defaultMessage: string): never;
}
//# sourceMappingURL=modrinth.d.ts.map