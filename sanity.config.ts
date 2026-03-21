// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { sanityConfig } from './sanity/config';

export default defineConfig({
  name: 'analyst-online',
  title: 'Analyst Online CMS',
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
