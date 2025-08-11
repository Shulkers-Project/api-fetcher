var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/index.ts
var exports_src = {};
__export(exports_src, {
  SpigotField: () => SpigetSearchField,
  SpigetTypes: () => exports_spigetType,
  SpigetErrorCode: () => SpigetErrorCode,
  SpigetError: () => SpigetError,
  SpigetAPI: () => SpigetAPI,
  ModrinthVersionType: () => ModrinthVersionType,
  ModrinthVersionStatus: () => ModrinthVersionStatus,
  ModrinthTypes: () => exports_modrinthType,
  ModrinthSortIndex: () => ModrinthSortIndex,
  ModrinthSideType: () => ModrinthSideType,
  ModrinthProjectType: () => ModrinthProjectType,
  ModrinthProjectStatus: () => ModrinthProjectStatus,
  ModrinthGameVersionType: () => ModrinthGameVersionType,
  ModrinthFacetType: () => ModrinthFacetType,
  ModrinthFacetOperation: () => ModrinthFacetOperation,
  ModrinthFacetGroup: () => ModrinthFacetGroup,
  ModrinthFacetBuilder: () => ModrinthFacetBuilder,
  ModrinthFacet: () => ModrinthFacet,
  ModrinthErrorCode: () => ModrinthErrorCode,
  ModrinthError: () => ModrinthError,
  ModrinthDependencyType: () => ModrinthDependencyType,
  ModrinthAPI: () => ModrinthAPI,
  HangarVisibility: () => HangarVisibility,
  HangarVersionChannel: () => HangarVersionChannel,
  HangarTypes: () => exports_hangarType,
  HangarProjectSort: () => HangarProjectSort,
  HangarPlatform: () => HangarPlatform,
  HangarErrorCode: () => HangarErrorCode,
  HangarError: () => HangarError,
  HangarCategory: () => HangarCategory,
  HangarAPI: () => HangarAPI,
  BaseAPIClient: () => BaseAPIClient
});
module.exports = __toCommonJS(exports_src);

// src/utils/baseClient.ts
var import_ky = __toESM(require("ky"));

class BaseAPIClient {
  baseUrl;
  userAgent;
  constructor(baseUrl, userAgent) {
    this.baseUrl = baseUrl;
    this.userAgent = userAgent || "shulkers/1.0.0";
  }
  buildSearchParams(options) {
    const params = {};
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          params[key] = JSON.stringify(value);
        } else {
          params[key] = value;
        }
      }
    }
    return params;
  }
  getHeaders() {
    return {
      "User-Agent": this.userAgent
    };
  }
  async makeRequest(endpoint, searchParams) {
    try {
      const response = await import_ky.default.get(`${this.baseUrl}${endpoint}`, {
        searchParams: searchParams ? this.buildSearchParams(searchParams) : undefined,
        headers: this.getHeaders()
      });
      return response.json();
    } catch (error) {
      throw this.handleError(error, "API_REQUEST_FAILED", `Failed to fetch ${endpoint}`);
    }
  }
  async makePostRequest(endpoint, body, searchParams) {
    try {
      const response = await import_ky.default.post(`${this.baseUrl}${endpoint}`, {
        json: body,
        searchParams: searchParams ? this.buildSearchParams(searchParams) : undefined,
        headers: this.getHeaders()
      });
      return response.json();
    } catch (error) {
      throw this.handleError(error, "API_REQUEST_FAILED", `Failed to post to ${endpoint}`);
    }
  }
  async makeRawRequest(url) {
    try {
      return await import_ky.default.get(url, {
        headers: this.getHeaders()
      });
    } catch (error) {
      throw this.handleError(error, "DOWNLOAD_FAILED", `Failed to download from ${url}`);
    }
  }
}

// src/types/spigetType.ts
var exports_spigetType = {};
__export(exports_spigetType, {
  SpigetVersionMethod: () => SpigetVersionMethod,
  SpigetSearchField: () => SpigetSearchField,
  SpigetErrorCode: () => SpigetErrorCode,
  SpigetError: () => SpigetError
});
var SpigetSearchField;
((SpigetSearchField2) => {
  SpigetSearchField2["NAME"] = "name";
  SpigetSearchField2["TAG"] = "tag";
})(SpigetSearchField ||= {});
var SpigetVersionMethod;
((SpigetVersionMethod2) => {
  SpigetVersionMethod2["ANY"] = "any";
  SpigetVersionMethod2["ALL"] = "all";
})(SpigetVersionMethod ||= {});
var SpigetErrorCode;
((SpigetErrorCode2) => {
  SpigetErrorCode2["EXTERNAL_FILE_DOWNLOAD"] = "EXTERNAL_FILE_DOWNLOAD";
  SpigetErrorCode2["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
  SpigetErrorCode2["INVALID_SEARCH_PARAMETERS"] = "INVALID_SEARCH_PARAMETERS";
  SpigetErrorCode2["API_REQUEST_FAILED"] = "API_REQUEST_FAILED";
  SpigetErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  SpigetErrorCode2["INVALID_RESPONSE"] = "INVALID_RESPONSE";
  SpigetErrorCode2["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
  SpigetErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  SpigetErrorCode2["INVALID_VERSION"] = "INVALID_VERSION";
  SpigetErrorCode2["DOWNLOAD_FAILED"] = "DOWNLOAD_FAILED";
})(SpigetErrorCode ||= {});

class SpigetError extends Error {
  code;
  details;
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "SpigetError";
  }
}

// src/api/spiget.ts
class SpigetAPI extends BaseAPIClient {
  constructor(options = {}) {
    super(options.baseUrl ?? "https://api.spiget.org/v2", options.userAgent);
  }
  async searchResources(query, {
    field,
    options = {}
  }) {
    return this.makeRequest(`/search/resources/${query}`, {
      field,
      ...options
    });
  }
  async getStatus() {
    return this.makeRequest("/status");
  }
  async getResources(options = {}) {
    return this.makeRequest("/resources", options);
  }
  async getPremiumResources(options = {}) {
    return this.makeRequest("/resources/premium", options);
  }
  async getFreeResources(options = {}) {
    return this.makeRequest("/resources/free", options);
  }
  async getNewResources(options = {}) {
    return this.makeRequest("/resources/new", options);
  }
  async getResourcesForVersion(version, method = "any" /* ANY */, options = {}) {
    const data = await this.makeRequest(`/resources/for/${version}`, { method, ...options });
    return data.match;
  }
  async getResourcesForVersionDetailed(version, method = "any" /* ANY */, options = {}) {
    return this.makeRequest(`/resources/for/${version}`, { method, ...options });
  }
  async getResource(resourceId) {
    return this.makeRequest(`/resources/${resourceId}`);
  }
  async getResourceAuthor(resourceId) {
    return this.makeRequest(`/resources/${resourceId}/author`);
  }
  async downloadResource(resourceId) {
    const resource = await this.getResource(resourceId);
    if (resource.external) {
      throw new SpigetError("EXTERNAL_FILE_DOWNLOAD" /* EXTERNAL_FILE_DOWNLOAD */, `Cannot download external resource ${resourceId}. Use externalUrl instead.`, { resourceId, externalUrl: resource.file.externalUrl });
    }
    return this.makeRawRequest(`${this.baseUrl}/resources/${resourceId}/download`);
  }
  async getResourceVersions(resourceId, options = {}) {
    return this.makeRequest(`/resources/${resourceId}/versions`, options);
  }
  async getResourceVersion(resourceId, versionId) {
    return this.makeRequest(`/resources/${resourceId}/versions/${versionId}`);
  }
  async getResourceLatestVersion(resourceId) {
    return this.makeRequest(`/resources/${resourceId}/versions/latest`);
  }
  async downloadResourceVersion(resourceId, versionId) {
    const resource = await this.getResource(resourceId);
    if (resource.external) {
      throw new SpigetError("EXTERNAL_FILE_DOWNLOAD" /* EXTERNAL_FILE_DOWNLOAD */, `Cannot download external resource ${resourceId}. Use externalUrl instead.`, { resourceId, versionId, externalUrl: resource.file.externalUrl });
    }
    return this.makeRawRequest(`${this.baseUrl}/resources/${resourceId}/versions/${versionId}/download`);
  }
  async getResourceUpdates(resourceId, options = {}) {
    return this.makeRequest(`/resources/${resourceId}/updates`, options);
  }
  async getResourceLatestUpdate(resourceId) {
    return this.makeRequest(`/resources/${resourceId}/updates/latest`);
  }
  async getResourceReviews(resourceId, options = {}) {
    return this.makeRequest(`/resources/${resourceId}/reviews`, options);
  }
  async getAuthors(options = {}) {
    return this.makeRequest("/authors", options);
  }
  async getAuthor(authorId) {
    return this.makeRequest(`/authors/${authorId}`);
  }
  async getAuthorResources(authorId, options = {}) {
    return this.makeRequest(`/authors/${authorId}/resources`, options);
  }
  async getAuthorReviews(authorId, options = {}) {
    return this.makeRequest(`/authors/${authorId}/reviews`, options);
  }
  async getCategories(options = {}) {
    return this.makeRequest("/categories", options);
  }
  async getCategory(categoryId) {
    return this.makeRequest(`/categories/${categoryId}`);
  }
  async getCategoryResources(categoryId, options = {}) {
    return this.makeRequest(`/categories/${categoryId}/resources`, options);
  }
  async searchAuthors(query, field = "name", options = {}) {
    return this.makeRequest(`/search/authors/${query}`, {
      field,
      ...options
    });
  }
  handleError(error, defaultCode, defaultMessage) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new SpigetError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, "Resource not found", { status, spigetError: error });
      } else if (status === 401) {
        throw new SpigetError("UNAUTHORIZED" /* UNAUTHORIZED */, "Unauthorized access", { status, spigetError: error });
      } else if (status === 429) {
        throw new SpigetError("RATE_LIMIT_EXCEEDED" /* RATE_LIMIT_EXCEEDED */, "Rate limit exceeded", { status, spigetError: error });
      } else if (status >= 400 && status < 500) {
        throw new SpigetError("INVALID_SEARCH_PARAMETERS" /* INVALID_SEARCH_PARAMETERS */, "Invalid request parameters", { status, spigetError: error });
      } else if (status >= 500) {
        throw new SpigetError("API_REQUEST_FAILED" /* API_REQUEST_FAILED */, "Server error", { status, spigetError: error });
      }
    }
    if (error.name === "NetworkError" || error.code === "ECONNRESET" || error.code === "ENOTFOUND") {
      throw new SpigetError("NETWORK_ERROR" /* NETWORK_ERROR */, "Network error occurred", { spigetError: error });
    }
    throw new SpigetError(defaultCode, defaultMessage, {
      spigetError: error
    });
  }
}

// src/types/modrinthType.ts
var exports_modrinthType = {};
__export(exports_modrinthType, {
  ModrinthVersionType: () => ModrinthVersionType,
  ModrinthVersionStatus: () => ModrinthVersionStatus,
  ModrinthSortIndex: () => ModrinthSortIndex,
  ModrinthSideType: () => ModrinthSideType,
  ModrinthProjectType: () => ModrinthProjectType,
  ModrinthProjectStatus: () => ModrinthProjectStatus,
  ModrinthGameVersionType: () => ModrinthGameVersionType,
  ModrinthFacetType: () => ModrinthFacetType,
  ModrinthFacetOperation: () => ModrinthFacetOperation,
  ModrinthFacetGroup: () => ModrinthFacetGroup,
  ModrinthFacetBuilder: () => ModrinthFacetBuilder,
  ModrinthFacet: () => ModrinthFacet,
  ModrinthErrorCode: () => ModrinthErrorCode,
  ModrinthError: () => ModrinthError,
  ModrinthDependencyType: () => ModrinthDependencyType
});
var ModrinthFacetType;
((ModrinthFacetType2) => {
  ModrinthFacetType2["PROJECT_TYPE"] = "project_type";
  ModrinthFacetType2["CATEGORIES"] = "categories";
  ModrinthFacetType2["VERSIONS"] = "versions";
  ModrinthFacetType2["CLIENT_SIDE"] = "client_side";
  ModrinthFacetType2["SERVER_SIDE"] = "server_side";
  ModrinthFacetType2["OPEN_SOURCE"] = "open_source";
  ModrinthFacetType2["TITLE"] = "title";
  ModrinthFacetType2["AUTHOR"] = "author";
  ModrinthFacetType2["FOLLOWS"] = "follows";
  ModrinthFacetType2["PROJECT_ID"] = "project_id";
  ModrinthFacetType2["LICENSE"] = "license";
  ModrinthFacetType2["DOWNLOADS"] = "downloads";
  ModrinthFacetType2["COLOR"] = "color";
  ModrinthFacetType2["CREATED_TIMESTAMP"] = "created_timestamp";
  ModrinthFacetType2["MODIFIED_TIMESTAMP"] = "modified_timestamp";
})(ModrinthFacetType ||= {});
var ModrinthFacetOperation;
((ModrinthFacetOperation2) => {
  ModrinthFacetOperation2["EQUAL"] = ":";
  ModrinthFacetOperation2["NOT_EQUAL"] = "!=";
  ModrinthFacetOperation2["GREATER_THAN"] = ">";
  ModrinthFacetOperation2["GREATER_THAN_OR_EQUAL"] = ">=";
  ModrinthFacetOperation2["LESS_THAN"] = "<";
  ModrinthFacetOperation2["LESS_THAN_OR_EQUAL"] = "<=";
})(ModrinthFacetOperation ||= {});

class ModrinthFacet {
  type;
  operation;
  value;
  constructor(type, operation, value) {
    this.type = type;
    this.operation = operation;
    this.value = value;
  }
  toString() {
    return `${this.type}${this.operation}${this.value}`;
  }
  static projectType(value) {
    return new ModrinthFacet("project_type" /* PROJECT_TYPE */, ":" /* EQUAL */, value);
  }
  static categories(value) {
    return new ModrinthFacet("categories" /* CATEGORIES */, ":" /* EQUAL */, value);
  }
  static versions(value) {
    return new ModrinthFacet("versions" /* VERSIONS */, ":" /* EQUAL */, value);
  }
  static clientSide(value) {
    return new ModrinthFacet("client_side" /* CLIENT_SIDE */, ":" /* EQUAL */, value);
  }
  static serverSide(value) {
    return new ModrinthFacet("server_side" /* SERVER_SIDE */, ":" /* EQUAL */, value);
  }
  static openSource(value) {
    return new ModrinthFacet("open_source" /* OPEN_SOURCE */, ":" /* EQUAL */, value);
  }
  static title(value) {
    return new ModrinthFacet("title" /* TITLE */, ":" /* EQUAL */, value);
  }
  static author(value) {
    return new ModrinthFacet("author" /* AUTHOR */, ":" /* EQUAL */, value);
  }
  static follows(operation, value) {
    return new ModrinthFacet("follows" /* FOLLOWS */, operation, value);
  }
  static projectId(value) {
    return new ModrinthFacet("project_id" /* PROJECT_ID */, ":" /* EQUAL */, value);
  }
  static license(value) {
    return new ModrinthFacet("license" /* LICENSE */, ":" /* EQUAL */, value);
  }
  static downloads(operation, value) {
    return new ModrinthFacet("downloads" /* DOWNLOADS */, operation, value);
  }
  static color(value) {
    return new ModrinthFacet("color" /* COLOR */, ":" /* EQUAL */, value);
  }
  static createdTimestamp(operation, value) {
    return new ModrinthFacet("created_timestamp" /* CREATED_TIMESTAMP */, operation, value);
  }
  static modifiedTimestamp(operation, value) {
    return new ModrinthFacet("modified_timestamp" /* MODIFIED_TIMESTAMP */, operation, value);
  }
}

class ModrinthFacetGroup {
  facets = [];
  constructor(facets = []) {
    this.facets = [...facets];
  }
  addFacet(facet) {
    this.facets.push(facet);
    return this;
  }
  addFacets(facets) {
    this.facets.push(...facets);
    return this;
  }
  removeFacet(facet) {
    const index = this.facets.indexOf(facet);
    if (index > -1) {
      this.facets.splice(index, 1);
    }
    return this;
  }
  clear() {
    this.facets = [];
    return this;
  }
  getFacets() {
    return [...this.facets];
  }
  isEmpty() {
    return this.facets.length === 0;
  }
  size() {
    return this.facets.length;
  }
  toArray() {
    return this.facets.map((facet) => facet.toString());
  }
  toString() {
    return JSON.stringify(this.toArray());
  }
  static projectTypes(types) {
    const group = new ModrinthFacetGroup;
    types.forEach((type) => group.addFacet(ModrinthFacet.projectType(type)));
    return group;
  }
  static categories(categories) {
    const group = new ModrinthFacetGroup;
    categories.forEach((category) => group.addFacet(ModrinthFacet.categories(category)));
    return group;
  }
  static versions(versions) {
    const group = new ModrinthFacetGroup;
    versions.forEach((version) => group.addFacet(ModrinthFacet.versions(version)));
    return group;
  }
}

class ModrinthFacetBuilder {
  groups = [];
  constructor() {}
  addGroup(group) {
    if (!group.isEmpty()) {
      this.groups.push(group);
    }
    return this;
  }
  addGroups(groups) {
    groups.forEach((group) => this.addGroup(group));
    return this;
  }
  addFacet(facet) {
    const group = new ModrinthFacetGroup([facet]);
    this.groups.push(group);
    return this;
  }
  addFacets(facets) {
    facets.forEach((facet) => this.addFacet(facet));
    return this;
  }
  removeGroup(group) {
    const index = this.groups.indexOf(group);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    return this;
  }
  clear() {
    this.groups = [];
    return this;
  }
  getGroups() {
    return [...this.groups];
  }
  isEmpty() {
    return this.groups.length === 0;
  }
  size() {
    return this.groups.length;
  }
  build() {
    if (this.groups.length === 0) {
      return "";
    }
    const facetArray = this.groups.map((group) => group.toArray());
    return JSON.stringify(facetArray);
  }
}
var ModrinthErrorCode;
((ModrinthErrorCode2) => {
  ModrinthErrorCode2["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
  ModrinthErrorCode2["INVALID_SEARCH_PARAMETERS"] = "INVALID_SEARCH_PARAMETERS";
  ModrinthErrorCode2["API_REQUEST_FAILED"] = "API_REQUEST_FAILED";
  ModrinthErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ModrinthErrorCode2["INVALID_RESPONSE"] = "INVALID_RESPONSE";
  ModrinthErrorCode2["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
  ModrinthErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ModrinthErrorCode2["INVALID_VERSION"] = "INVALID_VERSION";
  ModrinthErrorCode2["DOWNLOAD_FAILED"] = "DOWNLOAD_FAILED";
  ModrinthErrorCode2["EXTERNAL_FILE_DOWNLOAD"] = "EXTERNAL_FILE_DOWNLOAD";
})(ModrinthErrorCode ||= {});

class ModrinthError extends Error {
  code;
  details;
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "ModrinthError";
  }
}
var ModrinthProjectType;
((ModrinthProjectType2) => {
  ModrinthProjectType2["MOD"] = "mod";
  ModrinthProjectType2["MODPACK"] = "modpack";
  ModrinthProjectType2["RESOURCEPACK"] = "resourcepack";
  ModrinthProjectType2["SHADER"] = "shader";
})(ModrinthProjectType ||= {});
var ModrinthVersionType;
((ModrinthVersionType2) => {
  ModrinthVersionType2["RELEASE"] = "release";
  ModrinthVersionType2["BETA"] = "beta";
  ModrinthVersionType2["ALPHA"] = "alpha";
})(ModrinthVersionType ||= {});
var ModrinthSideType;
((ModrinthSideType2) => {
  ModrinthSideType2["REQUIRED"] = "required";
  ModrinthSideType2["OPTIONAL"] = "optional";
  ModrinthSideType2["UNSUPPORTED"] = "unsupported";
  ModrinthSideType2["UNKNOWN"] = "unknown";
})(ModrinthSideType ||= {});
var ModrinthDependencyType;
((ModrinthDependencyType2) => {
  ModrinthDependencyType2["REQUIRED"] = "required";
  ModrinthDependencyType2["OPTIONAL"] = "optional";
  ModrinthDependencyType2["INCOMPATIBLE"] = "incompatible";
  ModrinthDependencyType2["EMBEDDED"] = "embedded";
})(ModrinthDependencyType ||= {});
var ModrinthProjectStatus;
((ModrinthProjectStatus2) => {
  ModrinthProjectStatus2["APPROVED"] = "approved";
  ModrinthProjectStatus2["ARCHIVED"] = "archived";
  ModrinthProjectStatus2["REJECTED"] = "rejected";
  ModrinthProjectStatus2["DRAFT"] = "draft";
  ModrinthProjectStatus2["UNLISTED"] = "unlisted";
  ModrinthProjectStatus2["PROCESSING"] = "processing";
  ModrinthProjectStatus2["WITHHELD"] = "withheld";
  ModrinthProjectStatus2["SCHEDULED"] = "scheduled";
  ModrinthProjectStatus2["PRIVATE"] = "private";
  ModrinthProjectStatus2["UNKNOWN"] = "unknown";
})(ModrinthProjectStatus ||= {});
var ModrinthVersionStatus;
((ModrinthVersionStatus2) => {
  ModrinthVersionStatus2["LISTED"] = "listed";
  ModrinthVersionStatus2["ARCHIVED"] = "archived";
  ModrinthVersionStatus2["DRAFT"] = "draft";
  ModrinthVersionStatus2["UNLISTED"] = "unlisted";
  ModrinthVersionStatus2["SCHEDULED"] = "scheduled";
  ModrinthVersionStatus2["UNKNOWN"] = "unknown";
})(ModrinthVersionStatus ||= {});
var ModrinthGameVersionType;
((ModrinthGameVersionType2) => {
  ModrinthGameVersionType2["RELEASE"] = "release";
  ModrinthGameVersionType2["SNAPSHOT"] = "snapshot";
  ModrinthGameVersionType2["ALPHA"] = "alpha";
  ModrinthGameVersionType2["BETA"] = "beta";
})(ModrinthGameVersionType ||= {});
var ModrinthSortIndex;
((ModrinthSortIndex2) => {
  ModrinthSortIndex2["RELEVANCE"] = "relevance";
  ModrinthSortIndex2["DOWNLOADS"] = "downloads";
  ModrinthSortIndex2["FOLLOWS"] = "follows";
  ModrinthSortIndex2["NEWEST"] = "newest";
  ModrinthSortIndex2["UPDATED"] = "updated";
})(ModrinthSortIndex ||= {});

// src/api/modrinth.ts
class ModrinthAPI extends BaseAPIClient {
  constructor(options = {}) {
    super(options.baseUrl || "https://api.modrinth.com/v2", options.userAgent || "shulkers/1.0.0");
  }
  async searchProjects(options = {}) {
    const {
      query,
      facets,
      index = "relevance" /* RELEVANCE */,
      offset = 0,
      limit = 10
    } = options;
    const params = { index, offset, limit };
    if (query)
      params.query = query;
    if (facets)
      params.facets = this.processFacets(facets);
    return this.makeRequest("/search", params);
  }
  processFacets(facets) {
    if (typeof facets === "string")
      return facets;
    if (facets instanceof ModrinthFacetBuilder)
      return facets.build();
    if (facets instanceof ModrinthFacetGroup)
      return JSON.stringify([facets.toArray()]);
    if (Array.isArray(facets))
      return JSON.stringify([facets.map((f) => f.toString())]);
    return "";
  }
  async getProject(id) {
    return this.makeRequest(`/project/${id}`);
  }
  async getProjects(ids) {
    return this.makeRequest("/projects", { ids });
  }
  async getRandomProjects(count = 10) {
    if (count < 0 || count > 100) {
      throw new ModrinthError("INVALID_SEARCH_PARAMETERS" /* INVALID_SEARCH_PARAMETERS */, "Count must be between 0 and 100");
    }
    return this.makeRequest("/projects_random", { count });
  }
  async checkProjectValidity(id) {
    return this.makeRequest(`/project/${id}/check`);
  }
  async getProjectDependencies(id) {
    return this.makeRequest(`/project/${id}/dependencies`);
  }
  async getProjectTeamMembers(id) {
    return this.makeRequest(`/project/${id}/members`);
  }
  async getProjectVersions(id, options = {}) {
    return this.makeRequest(`/project/${id}/version`, options);
  }
  async getVersion(id) {
    return this.makeRequest(`/version/${id}`);
  }
  async getVersions(ids) {
    return this.makeRequest("/versions", { ids });
  }
  async getVersionFromProject(projectId, versionId) {
    return this.makeRequest(`/project/${projectId}/version/${versionId}`);
  }
  async getVersionFromHash(hash, algorithm = "sha1", multiple = false) {
    return this.makeRequest(`/version_file/${hash}`, {
      algorithm,
      multiple
    });
  }
  async getVersionsFromHashes(hashList) {
    return this.makePostRequest("/version_files", hashList);
  }
  async getLatestVersionFromHash(hash, algorithm = "sha1", updateInfo) {
    return this.makePostRequest(`/version_file/${hash}/update`, updateInfo, { algorithm });
  }
  async getLatestVersionsFromHashes(updateInfo) {
    return this.makePostRequest("/version_files/update", updateInfo);
  }
  async getUser(id) {
    return this.makeRequest(`/user/${id}`);
  }
  async getUsers(ids) {
    return this.makeRequest("/users", { ids });
  }
  async getUserProjects(id) {
    return this.makeRequest(`/user/${id}/projects`);
  }
  async getTeams(teamIds) {
    return this.makeRequest("/teams", { ids: teamIds });
  }
  async getTeamMembers(teamId) {
    return this.makeRequest(`/team/${teamId}/members`);
  }
  async getCategories() {
    return this.makeRequest("/tag/category");
  }
  async getLoaders() {
    return this.makeRequest("/tag/loader");
  }
  async getGameVersions() {
    return this.makeRequest("/tag/game_version");
  }
  async getProjectTypes() {
    return this.makeRequest("/tag/project_type");
  }
  async getSideTypes() {
    return this.makeRequest("/tag/side_type");
  }
  async getReportTypes() {
    return this.makeRequest("/tag/report_type");
  }
  async getForgeUpdates(id) {
    return this.makeRequest(`/updates/${id}/forge_updates.json`);
  }
  async getStatistics() {
    return this.makeRequest("/statistics");
  }
  async downloadFile(url) {
    return this.makeRawRequest(url);
  }
  async downloadVersionFile(versionId) {
    const version = await this.getVersion(versionId);
    const primaryFile = version.files.find((file) => file.primary) || version.files[0];
    if (!primaryFile) {
      throw new ModrinthError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, `No files found for version ${versionId}`);
    }
    return this.downloadFile(primaryFile.url);
  }
  async downloadVersionFileByName(versionId, filename) {
    const version = await this.getVersion(versionId);
    const file = version.files.find((f) => f.filename === filename);
    if (!file) {
      throw new ModrinthError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, `File ${filename} not found in version ${versionId}`);
    }
    return this.downloadFile(file.url);
  }
  async downloadLatestProjectFile(projectId, options = {}) {
    const versions = await this.getProjectVersions(projectId, options);
    if (versions.length === 0) {
      throw new ModrinthError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, `No versions found for project ${projectId}`);
    }
    return this.downloadVersionFile(versions[0].id);
  }
  async getFileContent(url) {
    const response = await this.downloadFile(url);
    return response.arrayBuffer();
  }
  async getFileBlob(url) {
    const response = await this.downloadFile(url);
    return response.blob();
  }
  handleError(error, defaultCode, defaultMessage) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new ModrinthError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, "Resource not found", { status, modrinthError: error });
      } else if (status === 401) {
        throw new ModrinthError("UNAUTHORIZED" /* UNAUTHORIZED */, "Unauthorized access", { status, modrinthError: error });
      } else if (status === 429) {
        throw new ModrinthError("RATE_LIMIT_EXCEEDED" /* RATE_LIMIT_EXCEEDED */, "Rate limit exceeded", { status, modrinthError: error });
      } else if (status >= 400 && status < 500) {
        throw new ModrinthError("INVALID_SEARCH_PARAMETERS" /* INVALID_SEARCH_PARAMETERS */, "Invalid request parameters", { status, modrinthError: error });
      } else if (status >= 500) {
        throw new ModrinthError("API_REQUEST_FAILED" /* API_REQUEST_FAILED */, "Server error", { status, modrinthError: error });
      }
    }
    if (error.name === "NetworkError" || error.code === "ECONNRESET" || error.code === "ENOTFOUND") {
      throw new ModrinthError("NETWORK_ERROR" /* NETWORK_ERROR */, "Network error occurred", { modrinthError: error });
    }
    throw new ModrinthError(defaultCode, defaultMessage, {
      modrinthError: error
    });
  }
}

// src/types/hangarType.ts
var exports_hangarType = {};
__export(exports_hangarType, {
  HangarVisibility: () => HangarVisibility,
  HangarVersionChannel: () => HangarVersionChannel,
  HangarProjectSort: () => HangarProjectSort,
  HangarPlatform: () => HangarPlatform,
  HangarErrorCode: () => HangarErrorCode,
  HangarError: () => HangarError,
  HangarCategory: () => HangarCategory
});
var HangarCategory;
((HangarCategory2) => {
  HangarCategory2["ADMIN_TOOLS"] = "admin_tools";
  HangarCategory2["CHAT"] = "chat";
  HangarCategory2["DEV_TOOLS"] = "dev_tools";
  HangarCategory2["ECONOMY"] = "economy";
  HangarCategory2["GAMEPLAY"] = "gameplay";
  HangarCategory2["GAMES"] = "games";
  HangarCategory2["PROTECTION"] = "protection";
  HangarCategory2["ROLE_PLAYING"] = "role_playing";
  HangarCategory2["WORLD_MANAGEMENT"] = "world_management";
  HangarCategory2["MISC"] = "misc";
})(HangarCategory ||= {});
var HangarPlatform;
((HangarPlatform2) => {
  HangarPlatform2["PAPER"] = "PAPER";
  HangarPlatform2["VELOCITY"] = "VELOCITY";
  HangarPlatform2["WATERFALL"] = "WATERFALL";
})(HangarPlatform ||= {});
var HangarVisibility;
((HangarVisibility2) => {
  HangarVisibility2["PUBLIC"] = "public";
  HangarVisibility2["UNLISTED"] = "unlisted";
  HangarVisibility2["PRIVATE"] = "private";
})(HangarVisibility ||= {});
var HangarProjectSort;
((HangarProjectSort2) => {
  HangarProjectSort2["VIEWS"] = "views";
  HangarProjectSort2["DOWNLOADS"] = "downloads";
  HangarProjectSort2["NEWEST"] = "newest";
  HangarProjectSort2["STARS"] = "stars";
  HangarProjectSort2["UPDATED"] = "updated";
  HangarProjectSort2["RECENT_DOWNLOADS"] = "recent_downloads";
  HangarProjectSort2["RECENT_VIEWS"] = "recent_views";
})(HangarProjectSort ||= {});
var HangarVersionChannel;
((HangarVersionChannel2) => {
  HangarVersionChannel2["RELEASE"] = "Release";
  HangarVersionChannel2["SNAPSHOT"] = "Snapshot";
  HangarVersionChannel2["ALPHA"] = "Alpha";
  HangarVersionChannel2["BETA"] = "Beta";
})(HangarVersionChannel ||= {});
var HangarErrorCode;
((HangarErrorCode2) => {
  HangarErrorCode2["API_REQUEST_FAILED"] = "API_REQUEST_FAILED";
  HangarErrorCode2["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
  HangarErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  HangarErrorCode2["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
  HangarErrorCode2["INVALID_SEARCH_PARAMETERS"] = "INVALID_SEARCH_PARAMETERS";
  HangarErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  HangarErrorCode2["DOWNLOAD_FAILED"] = "DOWNLOAD_FAILED";
  HangarErrorCode2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
})(HangarErrorCode ||= {});

class HangarError extends Error {
  code;
  context;
  constructor(code, message, context) {
    super(message);
    this.name = "HangarError";
    this.code = code;
    this.context = context;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HangarError);
    }
  }
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      context: this.context
    };
  }
}

// src/api/hangar.ts
class HangarAPI extends BaseAPIClient {
  constructor(options = {}) {
    super(options.baseUrl || "https://hangar.papermc.io/api/v1", options.userAgent || "shulkers/1.0.0");
  }
  async searchProjects(options = {}) {
    const params = {};
    if (options.q)
      params.q = options.q;
    if (options.owner)
      params.owner = options.owner;
    if (options.sort)
      params.sort = options.sort;
    if (options.limit !== undefined)
      params.limit = Math.min(options.limit, 25);
    if (options.offset !== undefined)
      params.offset = options.offset;
    if (options.category) {
      if (Array.isArray(options.category)) {
        params.category = options.category;
      } else {
        params.category = [options.category];
      }
    }
    if (options.platform) {
      if (Array.isArray(options.platform)) {
        params.platform = options.platform;
      } else {
        params.platform = [options.platform];
      }
    }
    return this.makeRequest("/projects", params);
  }
  async getProject(slugOrId) {
    return this.makeRequest(`/projects/${slugOrId}`);
  }
  async getUser(username) {
    return this.makeRequest(`/users/${username}`);
  }
  async getProjectVersions(slugOrId, options = {}) {
    const params = {};
    if (options.limit !== undefined)
      params.limit = options.limit;
    if (options.offset !== undefined)
      params.offset = options.offset;
    if (options.platform) {
      if (Array.isArray(options.platform)) {
        params.platform = options.platform;
      } else {
        params.platform = [options.platform];
      }
    }
    if (options.channel) {
      if (Array.isArray(options.channel)) {
        params.channel = options.channel;
      } else {
        params.channel = [options.channel];
      }
    }
    return this.makeRequest(`/projects/${slugOrId}/versions`, params);
  }
  async getProjectVersion(slugOrId, version) {
    return this.makeRequest(`/projects/${slugOrId}/versions/${version}`);
  }
  async downloadVersion(slugOrId, version, platform) {
    const versionDetails = await this.getProjectVersion(slugOrId, version);
    const downloadInfo = versionDetails.downloads[platform];
    if (!downloadInfo) {
      throw new HangarError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, `Version ${version} is not available for platform ${platform}`, {
        slugOrId,
        version,
        platform,
        availablePlatforms: Object.keys(versionDetails.downloads)
      });
    }
    return this.makeRawRequest(downloadInfo.downloadUrl);
  }
  async getLatestVersion(slugOrId, platform, channel) {
    const options = { limit: 1 };
    if (platform)
      options.platform = platform;
    if (channel)
      options.channel = channel;
    const versionsResult = await this.getProjectVersions(slugOrId, options);
    if (versionsResult.result.length === 0) {
      throw new HangarError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, `No versions found for project ${slugOrId}`, { slugOrId, platform, channel });
    }
    const latestVersionCompact = versionsResult.result[0];
    return this.getProjectVersion(slugOrId, latestVersionCompact.name);
  }
  async downloadLatestVersion(slugOrId, platform, channel) {
    const latestVersion = await this.getLatestVersion(slugOrId, platform, channel);
    return this.downloadVersion(slugOrId, latestVersion.name, platform);
  }
  async getProjectStats(slugOrId, fromDate, toDate) {
    return this.makeRequest(`/projects/${slugOrId}/stats`, { fromDate, toDate });
  }
  async getCategories() {
    return this.makeRequest("/data/categories");
  }
  async getPlatforms() {
    return this.makeRequest("/data/platforms");
  }
  handleError(error, defaultCode, defaultMessage) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        throw new HangarError("RESOURCE_NOT_FOUND" /* RESOURCE_NOT_FOUND */, "Resource not found", { status, hangarError: error });
      } else if (status === 401 || status === 403) {
        throw new HangarError("UNAUTHORIZED" /* UNAUTHORIZED */, "Unauthorized access - this endpoint may require authentication", { status, hangarError: error });
      } else if (status === 429) {
        throw new HangarError("RATE_LIMIT_EXCEEDED" /* RATE_LIMIT_EXCEEDED */, "Rate limit exceeded", { status, hangarError: error });
      } else if (status === 422) {
        throw new HangarError("VALIDATION_ERROR" /* VALIDATION_ERROR */, "Validation error - check your request parameters", { status, hangarError: error });
      } else if (status >= 400 && status < 500) {
        throw new HangarError("INVALID_SEARCH_PARAMETERS" /* INVALID_SEARCH_PARAMETERS */, "Invalid request parameters", { status, hangarError: error });
      } else if (status >= 500) {
        throw new HangarError("API_REQUEST_FAILED" /* API_REQUEST_FAILED */, "Server error", { status, hangarError: error });
      }
    }
    if (error.name === "NetworkError" || error.code === "ECONNRESET" || error.code === "ENOTFOUND") {
      throw new HangarError("NETWORK_ERROR" /* NETWORK_ERROR */, "Network error occurred", { hangarError: error });
    }
    throw new HangarError(defaultCode, defaultMessage, {
      hangarError: error
    });
  }
}
