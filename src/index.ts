/**
 * @fileoverview Shulkers - A comprehensive TypeScript API wrapper for Minecraft plugin repositories.
 *
 * This module provides unified access to Spiget (SpigotMC), Modrinth, and Hangar (PaperMC) APIs,
 * enabling developers to search, download, and manage Minecraft plugins and mods
 * with strong TypeScript support and consistent error handling.
 *
 * @example
 * Basic usage with Spiget API:
 * ```typescript
 * import { SpigetAPI, SpigotField } from 'shulkers';
 *
 * const spiget = new SpigetAPI();
 *
 * const plugins = await spiget.searchResources("worldedit", {
 *   field: SpigotField.NAME,
 *   options: { size: 10, sort: "-downloads" }
 * });
 *
 * console.log(`Found ${plugins.length} plugins`);
 * ```
 *
 * @example
 * Basic usage with Modrinth API:
 * ```typescript
 * import { ModrinthAPI, ModrinthFacetBuilder } from 'shulkers';
 *
 * const modrinth = new ModrinthAPI();
 *
 * const facets = new ModrinthFacetBuilder()
 *   .category("optimization")
 *   .projectType("mod")
 *   .build();
 *
 * const results = await modrinth.searchProjects({
 *   query: "sodium",
 *   facets,
 *   limit: 20
 * });
 *
 * console.log(`Found ${results.hits.length} mods`);
 * ```
 *
 * @example
 * Basic usage with Hangar API:
 * ```typescript
 * import { HangarAPI, HangarCategory, HangarPlatform } from 'shulkers';
 *
 * const hangar = new HangarAPI();
 *
 * const plugins = await hangar.searchProjects({
 *   q: "worldedit",
 *   category: HangarCategory.WORLD_MANAGEMENT,
 *   platform: HangarPlatform.PAPER,
 *   limit: 10
 * });
 *
 * // Download latest version
 * const response = await hangar.downloadLatestVersion("WorldEdit", HangarPlatform.PAPER);
 * console.log(`Downloaded ${plugins.result.length} plugins`);
 * ```
 *
 * @example
 * Using the base client for custom APIs:
 * ```typescript
 * import { BaseAPIClient } from 'shulkers';
 *
 * class MyAPI extends BaseAPIClient {
 *   constructor() {
 *     super("https://api.example.com", "MyApp/1.0.0");
 *   }
 *
 *   protected handleError(error: any, code: string, message: string): never {
 *     throw new Error(`${code}: ${message}`);
 *   }
 *
 *   async getData() {
 *     return this.makeRequest<any[]>("/data");
 *   }
 * }
 * ```
 *
 * @author Shulkers Team
 * @version 1.0.0
 * @license MIT
 */

import { SpigetAPI } from "./api/spiget";
import { ModrinthAPI } from "./api/modrinth";
import { HangarAPI } from "./api/hangar";
import { BaseAPIClient } from "./utils/baseClient";
import {
  SpigetSearchField,
  SpigetError,
  SpigetErrorCode,
} from "./types/spigetType";
import {
  ModrinthError,
  ModrinthErrorCode,
  ModrinthSortIndex,
  ModrinthFacetType,
  ModrinthFacetOperation,
  ModrinthProjectType,
  ModrinthVersionType,
  ModrinthSideType,
  ModrinthDependencyType,
  ModrinthProjectStatus,
  ModrinthVersionStatus,
  ModrinthGameVersionType,
  ModrinthFacet,
  ModrinthFacetGroup,
  ModrinthFacetBuilder,
} from "./types/modrinthType";
import {
  HangarError,
  HangarErrorCode,
  HangarCategory,
  HangarPlatform,
  HangarProjectSort,
  HangarVersionChannel,
  HangarVisibility,
} from "./types/hangarType";
import * as SpigetTypes from "./types/spigetType";
import * as ModrinthTypes from "./types/modrinthType";
import * as HangarTypes from "./types/hangarType";

export { SpigetAPI, ModrinthAPI, HangarAPI, BaseAPIClient };
export { SpigetSearchField as SpigotField };
export { SpigetError, SpigetErrorCode };
export {
  ModrinthError,
  ModrinthErrorCode,
  ModrinthSortIndex,
  ModrinthFacetType,
  ModrinthFacetOperation,
  ModrinthProjectType,
  ModrinthVersionType,
  ModrinthSideType,
  ModrinthDependencyType,
  ModrinthProjectStatus,
  ModrinthVersionStatus,
  ModrinthGameVersionType,
  ModrinthFacet,
  ModrinthFacetGroup,
  ModrinthFacetBuilder,
};
export {
  HangarError,
  HangarErrorCode,
  HangarCategory,
  HangarPlatform,
  HangarProjectSort,
  HangarVersionChannel,
  HangarVisibility,
};
export { SpigetTypes, ModrinthTypes, HangarTypes };
