import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  // Next.js recommended (Core Web Vitals)
  ...nextCoreVitals,

  // Next.js TypeScript rules
  ...nextTs,

  // Ignores
  globalIgnores([
    // Next default ignores + extra
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    'next-env.d.ts',
  ]),

  // IMPORTANT: must be last — disables rules that conflict with Prettier
  prettier,
]);

export default eslintConfig;
