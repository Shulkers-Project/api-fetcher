export enum SpigetSearchField {
  NAME = "name",
  TAG = "tag",
}

export enum SpigetVersionMethod {
  ANY = "any",
  ALL = "all",
}

/**
 * Enum for Spiget API error codes
 */
export enum SpigetErrorCode {
  EXTERNAL_FILE_DOWNLOAD = "EXTERNAL_FILE_DOWNLOAD",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  INVALID_SEARCH_PARAMETERS = "INVALID_SEARCH_PARAMETERS",
  API_REQUEST_FAILED = "API_REQUEST_FAILED",
  NETWORK_ERROR = "NETWORK_ERROR",
  INVALID_RESPONSE = "INVALID_RESPONSE",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  UNAUTHORIZED = "UNAUTHORIZED",
  INVALID_VERSION = "INVALID_VERSION",
  DOWNLOAD_FAILED = "DOWNLOAD_FAILED",
}

/**
 * Custom error class for Spiget API operations
 */
export class SpigetError extends Error {
  /**
   * Creates a new SpigetError instance
   * @param code - The error code
   * @param message - The error message
   * @param details - Additional error details
   */
  constructor(
    public code: SpigetErrorCode,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = "SpigetError";
  }
}

export interface SpigetSearchOptions {
  size?: number;
  page?: number;
  sort?: string;
  fields?: string;
}

export interface SpigetFile {
  type: string;
  size: number;
  sizeUnit: string;
  url: string;
  externalUrl: string;
}

export interface SpigetRating {
  count: number;
  average: number;
}

export interface SpigetIcon {
  url: string;
  data: string;
}

export interface SpigetAuthor {
  id: number;
  name?: string;
  icon?: SpigetIcon;
}

export interface SpigetCategory {
  id: number;
  name?: string;
}

export interface SpigetVersion {
  id: number;
  uuid: string;
  name?: string;
  releaseDate?: number;
  downloads?: number;
  rating?: SpigetRating;
}

export interface SpigetReview {
  id: number;
  author?: SpigetAuthor;
  rating?: SpigetRating;
  message?: string;
  responseMessage?: string;
  version?: string;
  date?: number;
}

export interface SpigetUpdate {
  id: number;
  resource?: number;
  title?: string;
  description?: string;
  date?: number;
  likes?: number;
}

export interface SpigetAPIStatus {
  status: {
    fetch: {
      start: number;
      end: number;
      active: boolean;
      page: {
        amount: number;
        index: number;
        item: {
          index: number;
        };
      };
    };
  };
  stats: {
    resources: number;
    authors: number;
    categories: number;
    resource_updates: number;
    resource_versions: number;
  };
}

export interface SpigetWebhookEvent {
  events: string[];
}

export interface SpigetWebhookRegistration {
  id: string;
  secret: string;
}

export interface SpigetWebhookStatus {
  status: number;
  failedConnections: number;
}

export interface SpigetWebhookError {
  error: string;
}

export interface SpigetResourcesForVersionResponse {
  check: string[];
  method: string;
  match: SpigetResource[];
}

export interface SpigetResource {
  id: number;
  name: string;
  tag: string;
  contributors: string;
  likes: number;
  file: SpigetFile;
  testedVersions: string[];
  links: Record<string, any>;
  rating: SpigetRating;
  releaseDate: number;
  updateDate: number;
  downloads: number;
  external: boolean;
  icon: SpigetIcon;
  premium: boolean;
  price: number;
  currency: string;
  author: SpigetAuthor;
  category: SpigetCategory;
  version: SpigetVersion;
  reviews: SpigetReview[];
  versions: SpigetVersion[];
  updates: SpigetUpdate[];
  description: string;
  documentation: string;
  sourceCodeLink: string;
  donationLink: string;
}
