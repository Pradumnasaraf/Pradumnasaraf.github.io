import { OG_IMAGE_URL, SITE_URL } from './constants.js';

/**
 * Utility functions for blog-related operations
 */

/**
 * Get absolute thumbnail URL from a relative or absolute URL
 * @param {string} thumbnail - The thumbnail URL (can be relative or absolute)
 * @returns {string} Absolute URL
 */
export function getThumbnailUrl(thumbnail) {
  if (!thumbnail) {
    return OG_IMAGE_URL;
  }
  // If thumbnail is already absolute URL, use it
  if (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) {
    return thumbnail;
  }
  // If thumbnail is relative, make it absolute
  return `${SITE_URL}${thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`}`;
}

/**
 * Strip a post down to the fields the listing UI actually renders.
 *
 * getAllPosts() carries the full raw markdown in `content`. BlogPostExplorer is
 * a client component, so anything handed to it is serialized into the RSC
 * payload of every listing page - that would ship ~250KB of article text no
 * visitor ever reads. Project first, then pass.
 *
 * @param {object} post - A post from getAllPosts()
 * @returns {object} Listing-safe summary
 */
export function toPostSummary(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags || [],
    thumbnail: post.thumbnail,
    readingTime: post.readingTime,
  };
}

const TAG_LABELS = {
  ai: 'AI',
  apis: 'APIs',
  arm: 'ARM',
  'ci-cd': 'CI/CD',
  cli: 'CLI',
  devops: 'DevOps',
  dockerhub: 'Docker Hub',
  github: 'GitHub',
  'github-actions': 'GitHub Actions',
  golang: 'Golang',
  gpu: 'GPU',
  javascript: 'JavaScript',
  llm: 'LLM',
  mcp: 'MCP',
  'mcp-server': 'MCP Server',
  mysql: 'MySQL',
  opensource: 'Open Source',
  opentelemetry: 'OpenTelemetry',
  postgresql: 'PostgreSQL',
  wemakedevs: 'WeMakeDevs',
};

/**
 * Human-readable label for a tag slug (URLs keep the slug).
 * @param {string} tag - Tag slug, e.g. "github-actions"
 * @returns {string} Display label, e.g. "GitHub Actions"
 */
export function tagLabel(tag) {
  const key = String(tag || '').toLowerCase();
  if (TAG_LABELS[key]) return TAG_LABELS[key];
  return key
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
