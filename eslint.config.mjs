import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  // СНАЧАЛА игноры (в т.ч. конфиги tailwind/postcss/next)
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'node_modules/**',
    'next-env.d.ts',

    'tailwind.config.*',
    'postcss.config.*',
    'next.config.*',
    'components.json',
  ]),

  // Next.js recommended
  ...nextCoreVitals,

  ...nextTs,

  // ПОСЛЕДНИМ prettier
  prettier,
]);
