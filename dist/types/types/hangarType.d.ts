/**
 * Type definitions for Hangar API (PaperMC's plugin distribution platform)
 * Based on Hangar OpenAPI v3 specification
 */
/**
 * Available project categories in Hangar
 */
export declare enum HangarCategory {
    ADMIN_TOOLS = "admin_tools",
    CHAT = "chat",
    DEV_TOOLS = "dev_tools",
    ECONOMY = "economy",
    GAMEPLAY = "gameplay",
    GAMES = "games",
    PROTECTION = "protection",
    ROLE_PLAYING = "role_playing",
    WORLD_MANAGEMENT = "world_management",
    MISC = "misc"
}
/**
 * Supported platforms for Hangar projects
 */
export declare enum HangarPlatform {
    PAPER = "PAPER",
    VELOCITY = "VELOCITY",
    WATERFALL = "WATERFALL"
}
/**
 * Project visibility settings
 */
export declare enum HangarVisibility {
    PUBLIC = "public",
    UNLISTED = "unlisted",
    PRIVATE = "private"
}
/**
 * Sort options for project searches
 */
export declare enum HangarProjectSort {
    VIEWS = "views",
    DOWNLOADS = "downloads",
    NEWEST = "newest",
    STARS = "stars",
    UPDATED = "updated",
    RECENT_DOWNLOADS = "recent_downloads",
    RECENT_VIEWS = "recent_views"
}
/**
 * Version channel types
 */
export declare enum HangarVersionChannel {
    RELEASE = "Release",
    SNAPSHOT = "Snapshot",
    ALPHA = "Alpha",
    BETA = "Beta"
}
/**
 * Hangar-specific error codes
 */
export declare enum HangarErrorCode {
    API_REQUEST_FAILED = "API_REQUEST_FAILED",
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    INVALID_SEARCH_PARAMETERS = "INVALID_SEARCH_PARAMETERS",
    NETWORK_ERROR = "NETWORK_ERROR",
    DOWNLOAD_FAILED = "DOWNLOAD_FAILED",
    VALIDATION_ERROR = "VALIDATION_ERROR"
}
/**
 * Basic user information
 */
export interface HangarUser {
    id: number;
    name: string;
    avatarUrl?: string;
    roles?: string[];
}
/**
 * Project statistics
 */
export interface HangarProjectStats {
    views: number;
    downloads: number;
    recentViews: number;
    recentDownloads: number;
    stars: number;
    watchers: number;
}
/**
 * Project settings and configuration
 */
export interface HangarProjectSettings {
    homepage?: string;
    issues?: string;
    sources?: string;
    support?: string;
    wiki?: string;
    discord?: string;
    license: {
        name?: string;
        url?: string;
        type?: string;
    };
    keywords: string[];
    sponsors: string[];
}
/**
 * Version platform dependency information
 */
export interface HangarVersionPlatformDependency {
    platform: HangarPlatform;
    versions: string[];
}
/**
 * Plugin dependency information
 */
export interface HangarVersionPluginDependency {
    name: string;
    required: boolean;
    externalUrl?: string;
    platformDependency?: HangarVersionPlatformDependency;
}
/**
 * Version file information
 */
export interface HangarVersionFile {
    name: string;
    sizeBytes: number;
    sha256Hash: string;
    downloadUrl: string;
}
/**
 * Project version details
 */
export interface HangarVersion {
    id: number;
    createdAt: string;
    name: string;
    description?: string;
    stats: {
        totalDownloads: number;
        platformDownloads: Record<string, number>;
    };
    author: string;
    reviewState: string;
    channel: HangarVersionChannel;
    pinned: boolean;
    downloads: Record<HangarPlatform, HangarVersionFile>;
    platformDependencies: Record<HangarPlatform, string[]>;
    pluginDependencies: Record<HangarPlatform, HangarVersionPluginDependency[]>;
}
/**
 * Compact version information for listings
 */
export interface HangarVersionCompact {
    createdAt: string;
    name: string;
    description?: string;
    stats: {
        totalDownloads: number;
    };
    author: string;
    reviewState: string;
    channel: HangarVersionChannel;
    pinned: boolean;
}
/**
 * Main project information
 */
export interface HangarProject {
    id: number;
    createdAt: string;
    name: string;
    slug: string;
    owner: string;
    description: string;
    lastUpdated: string;
    visibility: HangarVisibility;
    avatarUrl: string;
    category: HangarCategory;
    postId?: number;
    topicId?: number;
    publicVersions: number;
    stats: HangarProjectStats;
    settings: HangarProjectSettings;
}
/**
 * Compact project information for search results
 */
export interface HangarProjectCompact {
    slug: string;
    owner: string;
    name: string;
    description: string;
    lastUpdated: string;
    avatarUrl: string;
    category: HangarCategory;
    stats: HangarProjectStats;
}
/**
 * Paginated response wrapper
 */
export interface HangarPaginatedResult<T> {
    pagination: {
        limit: number;
        offset: number;
        count: number;
    };
    result: T[];
}
/**
 * Project search options
 */
export interface HangarProjectSearchOptions {
    /** Search query string */
    q?: string;
    /** Project category filter */
    category?: HangarCategory | HangarCategory[];
    /** Platform filter */
    platform?: HangarPlatform | HangarPlatform[];
    /** Project owner filter */
    owner?: string;
    /** Sort method */
    sort?: HangarProjectSort;
    /** Number of results per page (max 25) */
    limit?: number;
    /** Offset for pagination */
    offset?: number;
}
/**
 * Version search options
 */
export interface HangarVersionSearchOptions {
    /** Platform filter */
    platform?: HangarPlatform | HangarPlatform[];
    /** Version channel filter */
    channel?: HangarVersionChannel | HangarVersionChannel[];
    /** Number of results per page */
    limit?: number;
    /** Offset for pagination */
    offset?: number;
}
/**
 * Custom error class for Hangar API errors
 */
export declare class HangarError extends Error {
    readonly code: HangarErrorCode;
    readonly context?: Record<string, any>;
    constructor(code: HangarErrorCode, message: string, context?: Record<string, any>);
    /**
     * Returns a JSON representation of the error
     */
    toJSON(): Record<string, any>;
}
/**
 * Options for constructing HangarAPI client
 */
export interface HangarAPIOptions {
    baseUrl?: string;
    userAgent?: string;
    timeout?: number;
}
/**
 * Download statistics for a specific time period
 */
export interface HangarDownloadStats {
    total: number;
    period: string;
    data: Array<{
        day: string;
        downloads: number;
    }>;
}
/**
 * User's project permissions (for future authenticated endpoints)
 */
export interface HangarProjectPermissions {
    canEdit: boolean;
    canDelete: boolean;
    canCreateVersion: boolean;
    canEditVersions: boolean;
}
//# sourceMappingURL=hangarType.d.ts.map