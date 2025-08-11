# @shulkers/api-fetcher

A comprehensive TypeScript API wrapper for Minecraft plugin repositories including Spiget (SpigotMC), Modrinth, and Hangar (PaperMC).

## Features

- 🚀 **Full TypeScript Support** - Complete type definitions for all APIs
- 🔄 **Unified Interface** - Consistent API across different plugin repositories
- 📦 **ESM & CommonJS** - Supports both module systems
- ⚡ **Built with Bun** - Optimized for modern JavaScript runtimes
- 🛡️ **Error Handling** - Robust error handling and retry mechanisms
- 🎯 **Rich Filtering** - Advanced search and filtering capabilities

## Installation

```bash
# npm
npm install @shulkers/api-fetcher

# yarn
yarn add @shulkers/api-fetcher

# pnpm
pnpm add @shulkers/api-fetcher

# bun
bun add @shulkers/api-fetcher
```

## Quick Start

### Spiget API (SpigotMC)

```typescript
import { SpigetAPI, SpigotField } from '@shulkers/api-fetcher';

const spiget = new SpigetAPI();

const plugins = await spiget.searchResources("worldedit", {
  field: SpigotField.NAME,
  options: { size: 10, sort: "-downloads" }
});

console.log(`Found ${plugins.length} plugins`);
```

### Modrinth API

```typescript
import { ModrinthAPI, ModrinthFacetBuilder } from '@shulkers/api-fetcher';

const modrinth = new ModrinthAPI();

const facets = new ModrinthFacetBuilder()
  .category("optimization")
  .projectType("mod")
  .build();

const results = await modrinth.searchProjects({
  query: "sodium",
  facets,
  limit: 20
});

console.log(`Found ${results.hits.length} mods`);
```

### Hangar API (PaperMC)

```typescript
import { HangarAPI, HangarCategory, HangarPlatform } from '@shulkers/api-fetcher';

const hangar = new HangarAPI();

const projects = await hangar.searchProjects({
  query: "essentials",
  category: HangarCategory.ADMIN_TOOLS,
  platform: HangarPlatform.PAPER,
  limit: 10
});

console.log(`Found ${projects.result.length} projects`);
```

## API Documentation

### Supported APIs

- **Spiget**: SpigotMC resource API
- **Modrinth**: Modern mod platform API  
- **Hangar**: PaperMC plugin repository API

### Key Features

- Search plugins/mods across platforms
- Get detailed resource information
- Download resources and versions
- Advanced filtering and sorting
- Type-safe responses

## License

MIT License - see [LICENSE](../../LICENSE) file for details.

## Contributing

See the main [shulkers repository](https://github.com/Crysta1221/shulkers) for contribution guidelines.
