/**
 * Enum for Modrinth facet types
 */
export enum ModrinthFacetType {
  PROJECT_TYPE = "project_type",
  CATEGORIES = "categories",
  VERSIONS = "versions",
  CLIENT_SIDE = "client_side",
  SERVER_SIDE = "server_side",
  OPEN_SOURCE = "open_source",
  TITLE = "title",
  AUTHOR = "author",
  FOLLOWS = "follows",
  PROJECT_ID = "project_id",
  LICENSE = "license",
  DOWNLOADS = "downloads",
  COLOR = "color",
  CREATED_TIMESTAMP = "created_timestamp",
  MODIFIED_TIMESTAMP = "modified_timestamp",
}

/**
 * Enum for Modrinth facet operations
 */
export enum ModrinthFacetOperation {
  EQUAL = ":",
  NOT_EQUAL = "!=",
  GREATER_THAN = ">",
  GREATER_THAN_OR_EQUAL = ">=",
  LESS_THAN = "<",
  LESS_THAN_OR_EQUAL = "<=",
}

/**
 * Represents a single facet filter for Modrinth search API
 *
 * @example
 * ```typescript
 * const facet = new ModrinthFacet(ModrinthFacetType.PROJECT_TYPE, ModrinthFacetOperation.EQUAL, "mod");
 * // or use the static methods
 * const facet = ModrinthFacet.projectType("mod");
 * const facet = ModrinthFacet.categories("forge");
 * ```
 */
export class ModrinthFacet {
  /**
   * Creates a new ModrinthFacet instance
   * @param type - The facet type
   * @param operation - The facet operation
   * @param value - The facet value
   */
  constructor(
    public readonly type: ModrinthFacetType,
    public readonly operation: ModrinthFacetOperation,
    public readonly value: string | number | boolean
  ) {}

  /**
   * Converts the facet to a string representation for API queries
   * @returns The facet string in format "type:operation:value"
   */
  toString(): string {
    return `${this.type}${this.operation}${this.value}`;
  }

  /**
   * Creates a facet for filtering by project type
   * @param value - The project type (mod, modpack, resourcepack, shader)
   * @returns A new ModrinthFacet instance
   */
  static projectType(value: ModrinthProjectType | string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.PROJECT_TYPE,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by categories
   * @param value - The category name
   * @returns A new ModrinthFacet instance
   */
  static categories(value: string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.CATEGORIES,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by game versions
   * @param value - The game version
   * @returns A new ModrinthFacet instance
   */
  static versions(value: string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.VERSIONS,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by client side compatibility
   * @param value - The client side type (required, optional, unsupported, unknown)
   * @returns A new ModrinthFacet instance
   */
  static clientSide(value: ModrinthSideType | string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.CLIENT_SIDE,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by server side compatibility
   * @param value - The server side type (required, optional, unsupported, unknown)
   * @returns A new ModrinthFacet instance
   */
  static serverSide(value: ModrinthSideType | string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.SERVER_SIDE,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by open source status
   * @param value - Whether the project is open source
   * @returns A new ModrinthFacet instance
   */
  static openSource(value: boolean | string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.OPEN_SOURCE,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by title
   * @param value - The title to search for
   * @returns A new ModrinthFacet instance
   */
  static title(value: string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.TITLE,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by author
   * @param value - The author username
   * @returns A new ModrinthFacet instance
   */
  static author(value: string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.AUTHOR,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by follows count
   * @param operation - The comparison operation
   * @param value - The follows count
   * @returns A new ModrinthFacet instance
   */
  static follows(
    operation: ModrinthFacetOperation,
    value: number
  ): ModrinthFacet {
    return new ModrinthFacet(ModrinthFacetType.FOLLOWS, operation, value);
  }

  /**
   * Creates a facet for filtering by project ID
   * @param value - The project ID
   * @returns A new ModrinthFacet instance
   */
  static projectId(value: string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.PROJECT_ID,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by license
   * @param value - The license identifier
   * @returns A new ModrinthFacet instance
   */
  static license(value: string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.LICENSE,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by downloads count
   * @param operation - The comparison operation
   * @param value - The downloads count
   * @returns A new ModrinthFacet instance
   */
  static downloads(
    operation: ModrinthFacetOperation,
    value: number
  ): ModrinthFacet {
    return new ModrinthFacet(ModrinthFacetType.DOWNLOADS, operation, value);
  }

  /**
   * Creates a facet for filtering by color
   * @param value - The color value
   * @returns A new ModrinthFacet instance
   */
  static color(value: number | string): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.COLOR,
      ModrinthFacetOperation.EQUAL,
      value
    );
  }

  /**
   * Creates a facet for filtering by created timestamp
   * @param operation - The comparison operation
   * @param value - The timestamp
   * @returns A new ModrinthFacet instance
   */
  static createdTimestamp(
    operation: ModrinthFacetOperation,
    value: string | number
  ): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.CREATED_TIMESTAMP,
      operation,
      value
    );
  }

  /**
   * Creates a facet for filtering by modified timestamp
   * @param operation - The comparison operation
   * @param value - The timestamp
   * @returns A new ModrinthFacet instance
   */
  static modifiedTimestamp(
    operation: ModrinthFacetOperation,
    value: string | number
  ): ModrinthFacet {
    return new ModrinthFacet(
      ModrinthFacetType.MODIFIED_TIMESTAMP,
      operation,
      value
    );
  }
}

/**
 * Represents a group of facets for Modrinth search API
 * Groups multiple facets together with AND/OR logic
 *
 * @example
 * ```typescript
 * const group = new ModrinthFacetGroup()
 *   .addFacet(ModrinthFacet.projectType("mod"))
 *   .addFacet(ModrinthFacet.categories("forge"))
 *   .addFacet(ModrinthFacet.versions("1.20.1"));
 *
 * // OR logic within the group
 * const orGroup = new ModrinthFacetGroup()
 *   .addFacet(ModrinthFacet.versions("1.20.1"))
 *   .addFacet(ModrinthFacet.versions("1.19.4"));
 * ```
 */
export class ModrinthFacetGroup {
  private facets: ModrinthFacet[] = [];

  /**
   * Creates a new ModrinthFacetGroup instance
   * @param facets - Initial facets to add to the group
   */
  constructor(facets: ModrinthFacet[] = []) {
    this.facets = [...facets];
  }

  /**
   * Adds a facet to the group
   * @param facet - The facet to add
   * @returns The ModrinthFacetGroup instance for method chaining
   */
  addFacet(facet: ModrinthFacet): ModrinthFacetGroup {
    this.facets.push(facet);
    return this;
  }

  /**
   * Adds multiple facets to the group
   * @param facets - The facets to add
   * @returns The ModrinthFacetGroup instance for method chaining
   */
  addFacets(facets: ModrinthFacet[]): ModrinthFacetGroup {
    this.facets.push(...facets);
    return this;
  }

  /**
   * Removes a facet from the group
   * @param facet - The facet to remove
   * @returns The ModrinthFacetGroup instance for method chaining
   */
  removeFacet(facet: ModrinthFacet): ModrinthFacetGroup {
    const index = this.facets.indexOf(facet);
    if (index > -1) {
      this.facets.splice(index, 1);
    }
    return this;
  }

  /**
   * Clears all facets from the group
   * @returns The ModrinthFacetGroup instance for method chaining
   */
  clear(): ModrinthFacetGroup {
    this.facets = [];
    return this;
  }

  /**
   * Gets all facets in the group
   * @returns Array of facets
   */
  getFacets(): ModrinthFacet[] {
    return [...this.facets];
  }

  /**
   * Checks if the group is empty
   * @returns True if the group has no facets
   */
  isEmpty(): boolean {
    return this.facets.length === 0;
  }

  /**
   * Gets the number of facets in the group
   * @returns The number of facets
   */
  size(): number {
    return this.facets.length;
  }

  /**
   * Converts the facet group to an array of facet strings
   * @returns Array of facet strings
   */
  toArray(): string[] {
    return this.facets.map((facet) => facet.toString());
  }

  /**
   * Converts the facet group to a JSON string representation
   * @returns JSON string representation of the facet group
   */
  toString(): string {
    return JSON.stringify(this.toArray());
  }

  /**
   * Creates a new ModrinthFacetGroup with project type facets
   * @param types - The project types to include
   * @returns A new ModrinthFacetGroup instance
   */
  static projectTypes(
    types: (ModrinthProjectType | string)[]
  ): ModrinthFacetGroup {
    const group = new ModrinthFacetGroup();
    types.forEach((type) => group.addFacet(ModrinthFacet.projectType(type)));
    return group;
  }

  /**
   * Creates a new ModrinthFacetGroup with category facets
   * @param categories - The categories to include
   * @returns A new ModrinthFacetGroup instance
   */
  static categories(categories: string[]): ModrinthFacetGroup {
    const group = new ModrinthFacetGroup();
    categories.forEach((category) =>
      group.addFacet(ModrinthFacet.categories(category))
    );
    return group;
  }

  /**
   * Creates a new ModrinthFacetGroup with game version facets
   * @param versions - The game versions to include
   * @returns A new ModrinthFacetGroup instance
   */
  static versions(versions: string[]): ModrinthFacetGroup {
    const group = new ModrinthFacetGroup();
    versions.forEach((version) =>
      group.addFacet(ModrinthFacet.versions(version))
    );
    return group;
  }
}

/**
 * Builder class for creating complex facet queries
 * Combines multiple facet groups with AND logic
 *
 * @example
 * ```typescript
 * const builder = new ModrinthFacetBuilder()
 *   .addGroup(ModrinthFacetGroup.projectTypes(["mod"]))
 *   .addGroup(ModrinthFacetGroup.versions(["1.20.1", "1.19.4"]))
 *   .addFacet(ModrinthFacet.categories("forge"));
 *
 * const facetString = builder.build();
 * ```
 */
export class ModrinthFacetBuilder {
  private groups: ModrinthFacetGroup[] = [];

  /**
   * Creates a new ModrinthFacetBuilder instance
   */
  constructor() {}

  /**
   * Adds a facet group to the builder
   * @param group - The facet group to add
   * @returns The ModrinthFacetBuilder instance for method chaining
   */
  addGroup(group: ModrinthFacetGroup): ModrinthFacetBuilder {
    if (!group.isEmpty()) {
      this.groups.push(group);
    }
    return this;
  }

  /**
   * Adds multiple facet groups to the builder
   * @param groups - The facet groups to add
   * @returns The ModrinthFacetBuilder instance for method chaining
   */
  addGroups(groups: ModrinthFacetGroup[]): ModrinthFacetBuilder {
    groups.forEach((group) => this.addGroup(group));
    return this;
  }

  /**
   * Adds a single facet as a new group
   * @param facet - The facet to add
   * @returns The ModrinthFacetBuilder instance for method chaining
   */
  addFacet(facet: ModrinthFacet): ModrinthFacetBuilder {
    const group = new ModrinthFacetGroup([facet]);
    this.groups.push(group);
    return this;
  }

  /**
   * Adds multiple facets as separate groups
   * @param facets - The facets to add
   * @returns The ModrinthFacetBuilder instance for method chaining
   */
  addFacets(facets: ModrinthFacet[]): ModrinthFacetBuilder {
    facets.forEach((facet) => this.addFacet(facet));
    return this;
  }

  /**
   * Removes a facet group from the builder
   * @param group - The facet group to remove
   * @returns The ModrinthFacetBuilder instance for method chaining
   */
  removeGroup(group: ModrinthFacetGroup): ModrinthFacetBuilder {
    const index = this.groups.indexOf(group);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    return this;
  }

  /**
   * Clears all facet groups from the builder
   * @returns The ModrinthFacetBuilder instance for method chaining
   */
  clear(): ModrinthFacetBuilder {
    this.groups = [];
    return this;
  }

  /**
   * Gets all facet groups in the builder
   * @returns Array of facet groups
   */
  getGroups(): ModrinthFacetGroup[] {
    return [...this.groups];
  }

  /**
   * Checks if the builder is empty
   * @returns True if the builder has no groups
   */
  isEmpty(): boolean {
    return this.groups.length === 0;
  }

  /**
   * Gets the number of facet groups in the builder
   * @returns The number of facet groups
   */
  size(): number {
    return this.groups.length;
  }

  /**
   * Builds the final facet string for API queries
   * @returns The facet string in JSON format
   */
  build(): string {
    if (this.groups.length === 0) {
      return "";
    }

    const facetArray = this.groups.map((group) => group.toArray());
    return JSON.stringify(facetArray);
  }
}

/**
 * Enum for Modrinth API error codes
 */
export enum ModrinthErrorCode {
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  INVALID_SEARCH_PARAMETERS = "INVALID_SEARCH_PARAMETERS",
  API_REQUEST_FAILED = "API_REQUEST_FAILED",
  NETWORK_ERROR = "NETWORK_ERROR",
  INVALID_RESPONSE = "INVALID_RESPONSE",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_VERSION = "INVALID_VERSION",
  DOWNLOAD_FAILED = "DOWNLOAD_FAILED",
  EXTERNAL_FILE_DOWNLOAD = "EXTERNAL_FILE_DOWNLOAD",
}

/**
 * Custom error class for Modrinth API operations
 */
export class ModrinthError extends Error {
  /**
   * Creates a new ModrinthError instance
   * @param code - The error code
   * @param message - The error message
   * @param details - Additional error details
   */
  constructor(
    public code: ModrinthErrorCode,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ModrinthError";
  }
}

export enum ModrinthProjectType {
  MOD = "mod",
  MODPACK = "modpack",
  RESOURCEPACK = "resourcepack",
  SHADER = "shader",
}

export enum ModrinthVersionType {
  RELEASE = "release",
  BETA = "beta",
  ALPHA = "alpha",
}

export enum ModrinthSideType {
  REQUIRED = "required",
  OPTIONAL = "optional",
  UNSUPPORTED = "unsupported",
  UNKNOWN = "unknown",
}

export enum ModrinthDependencyType {
  REQUIRED = "required",
  OPTIONAL = "optional",
  INCOMPATIBLE = "incompatible",
  EMBEDDED = "embedded",
}

export enum ModrinthProjectStatus {
  APPROVED = "approved",
  ARCHIVED = "archived",
  REJECTED = "rejected",
  DRAFT = "draft",
  UNLISTED = "unlisted",
  PROCESSING = "processing",
  WITHHELD = "withheld",
  SCHEDULED = "scheduled",
  PRIVATE = "private",
  UNKNOWN = "unknown",
}

export enum ModrinthVersionStatus {
  LISTED = "listed",
  ARCHIVED = "archived",
  DRAFT = "draft",
  UNLISTED = "unlisted",
  SCHEDULED = "scheduled",
  UNKNOWN = "unknown",
}

export enum ModrinthGameVersionType {
  RELEASE = "release",
  SNAPSHOT = "snapshot",
  ALPHA = "alpha",
  BETA = "beta",
}

export enum ModrinthSortIndex {
  RELEVANCE = "relevance",
  DOWNLOADS = "downloads",
  FOLLOWS = "follows",
  NEWEST = "newest",
  UPDATED = "updated",
}

export interface ModrinthSearchOptions {
  query?: string;
  facets?: string | ModrinthFacetBuilder | ModrinthFacetGroup | ModrinthFacet[];
  index?: ModrinthSortIndex;
  offset?: number;
  limit?: number;
}

export interface ModrinthVersionFile {
  hashes: {
    sha512: string;
    sha1: string;
  };
  url: string;
  filename: string;
  primary: boolean;
  size: number;
  file_type?: string;
}

export interface ModrinthVersion {
  id: string;
  project_id: string;
  author_id: string;
  featured: boolean;
  name: string;
  version_number: string;
  changelog?: string;
  dependencies: ModrinthVersionDependency[];
  game_versions: string[];
  version_type: ModrinthVersionType;
  loaders: string[];
  date_published: string;
  downloads: number;
  changelog_url?: string;
  files: ModrinthVersionFile[];
  status: ModrinthVersionStatus;
  requested_status?: ModrinthVersionStatus;
}

export interface ModrinthVersionDependency {
  version_id?: string;
  project_id?: string;
  file_name?: string;
  dependency_type: ModrinthDependencyType;
}

export interface ModrinthProjectLicense {
  id: string;
  name: string;
  url?: string;
}

export interface ModrinthProjectDonationURL {
  id: string;
  platform: string;
  url: string;
}

export interface ModrinthGalleryImage {
  url: string;
  featured: boolean;
  title?: string;
  description?: string;
  created: string;
  ordering: number;
}

export interface ModrinthProject {
  id: string;
  slug: string;
  project_type: ModrinthProjectType;
  team: string;
  title: string;
  description: string;
  body: string;
  body_url?: string;
  published: string;
  updated: string;
  approved?: string;
  queued?: string;
  status: ModrinthProjectStatus;
  requested_status?: ModrinthProjectStatus;
  moderator_message?: {
    message: string;
    body?: string;
  };
  license: ModrinthProjectLicense;
  client_side: ModrinthSideType;
  server_side: ModrinthSideType;
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories?: string[];
  game_versions: string[];
  loaders: string[];
  versions: string[];
  icon_url?: string;
  issues_url?: string;
  source_url?: string;
  wiki_url?: string;
  discord_url?: string;
  donation_urls?: ModrinthProjectDonationURL[];
  gallery?: ModrinthGalleryImage[];
  color?: number;
  thread_id?: string;
  monetization_status?: string;
}

export interface ModrinthProjectResult {
  project_id: string;
  project_type: ModrinthProjectType;
  slug: string;
  author: string;
  title: string;
  description: string;
  categories: string[];
  display_categories: string[];
  versions: string[];
  downloads: number;
  follows: number;
  icon_url?: string;
  date_created: string;
  date_modified: string;
  latest_version?: string;
  license: string;
  client_side: ModrinthSideType;
  server_side: ModrinthSideType;
  gallery?: string[];
  featured_gallery?: string;
  color?: number;
}

export interface ModrinthSearchResults {
  hits: ModrinthProjectResult[];
  offset: number;
  limit: number;
  total_hits: number;
}

export interface ModrinthUser {
  id: string;
  username: string;
  name?: string;
  email?: string;
  bio?: string;
  avatar_url: string;
  created: string;
  role: string;
  badges: number;
  auth_providers?: string[];
  email_verified?: boolean;
  has_password?: boolean;
  has_totp?: boolean;
  github_id?: number;
  payout_data?: {
    balance: number;
    payout_wallet: string;
    payout_wallet_type: string;
    payout_address: string;
  };
}

export interface ModrinthTeamMember {
  team_id: string;
  user: ModrinthUser;
  role: string;
  permissions: number;
  accepted: boolean;
  payouts_split: number;
  ordering: number;
}

export interface ModrinthCategoryTag {
  icon: string;
  name: string;
  project_type: string;
  header: string;
}

export interface ModrinthLoaderTag {
  icon: string;
  name: string;
  supported_project_types: string[];
}

export interface ModrinthGameVersionTag {
  version: string;
  version_type: ModrinthGameVersionType;
  date: string;
  major: boolean;
}

export interface ModrinthStatistics {
  projects: number;
  versions: number;
  files: number;
  authors: number;
}

export interface ModrinthForgeUpdates {
  homepage: string;
  promos: Record<string, string>;
}

export interface ModrinthHashVersionMap {
  [hash: string]: ModrinthVersion;
}

export interface ModrinthGetLatestVersionFromHashBody {
  loaders: string[];
  game_versions: string[];
}

export interface ModrinthGetLatestVersionsFromHashesBody
  extends ModrinthGetLatestVersionFromHashBody {
  hashes: string[];
  algorithm: string;
}

export interface ModrinthHashList {
  hashes: string[];
  algorithm: string;
}
