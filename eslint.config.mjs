import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Base directory for resolving extends
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'), // Use the Next.js recommended ESLint rules
  {
    ignores: ['node_modules', 'dist'], // Ensure these directories are ignored
  },
];

export default eslintConfig;
