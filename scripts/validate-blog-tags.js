#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const blogDir = path.join(rootDir, 'src/content/blog');

const ALLOWED_TAGS = new Set([
  'ai',
  'apis',
  'arm',
  'automation',
  'beginners',
  'ci-cd',
  'cli',
  'collaboration',
  'community',
  'containers',
  'conventional-commits',
  'databases',
  'developer',
  'development',
  'devops',
  'docker',
  'docker-compose',
  'docker-images',
  'dockerhub',
  'git',
  'github',
  'github-actions',
  'go',
  'golang',
  'google-gemini',
  'gpu',
  'grafana',
  'javascript',
  'llm',
  'mcp',
  'mcp-server',
  'microservices',
  'monitoring',
  'mux',
  'mysql',
  'opensource',
  'opentelemetry',
  'operating-system',
  'package',
  'postgresql',
  'prettier',
  'prometheus',
  'redis',
  'security',
  'semantic-versioning',
  'software-development',
  'technology',
  'wemakedevs',
]);

function getMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|mdx)$/.test(entry.name))
    .map((entry) => path.join(dir, entry.name));
}

function validateTags() {
  const files = getMarkdownFiles(blogDir);
  const issues = [];

  for (const filePath of files) {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(source);
    const relativePath = path.relative(rootDir, filePath);

    if (!Array.isArray(data.tags)) {
      issues.push({
        file: relativePath,
        error: 'Missing or invalid "tags" frontmatter. Expected an array.',
      });
      continue;
    }

    if (data.tags.length === 0) {
      issues.push({
        file: relativePath,
        error: 'Tags array is empty. Add at least one relevant tag.',
      });
      continue;
    }

    const seen = new Set();
    for (const rawTag of data.tags) {
      const tag = String(rawTag).trim();

      if (!tag) {
        issues.push({
          file: relativePath,
          error: 'Contains an empty tag value.',
        });
        continue;
      }

      if (seen.has(tag)) {
        issues.push({
          file: relativePath,
          error: `Duplicate tag "${tag}".`,
        });
      }
      seen.add(tag);

      if (!/^[a-z0-9-]+$/.test(tag)) {
        issues.push({
          file: relativePath,
          error: `Tag "${tag}" must be lowercase kebab-case.`,
        });
      }

      if (!ALLOWED_TAGS.has(tag)) {
        issues.push({
          file: relativePath,
          error: `Unknown tag "${tag}". Add it to ALLOWED_TAGS in scripts/validate-blog-tags.js if intentional.`,
        });
      }
    }
  }

  if (issues.length > 0) {
    console.error('Tag validation failed:\n');
    for (const issue of issues) {
      console.error(`- ${issue.file}: ${issue.error}`);
    }
    process.exit(1);
  }

  console.log(`Tag validation passed for ${files.length} blog posts.`);
}

validateTags();
