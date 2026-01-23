import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  // глобальные игноры
  globalIgnores(['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts']),

  // игнорим конфиги/генераторы (там часто CJS/require и др.)
  {
    ignores: ['tailwind.config.*', 'postcss.config.*', 'next.config.*', 'components.json'],
  },

  // Next правила
  ...nextCoreVitals,
  ...nextTs,

  // всегда последним
  prettier,
]);
