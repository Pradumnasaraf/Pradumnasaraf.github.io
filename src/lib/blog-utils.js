import { OG_IMAGE_URL, SITE_URL } from './constants.js';

/**
 * Get absolute thumbnail URL from a relative or absolute URL
 * @param {string} thumbnail - The thumbnail URL (can be relative or absolute)
 * @returns {string} Absolute URL
 */
export function getThumbnailUrl(thumbnail) {
  if (!thumbnail) {
    return OG_IMAGE_URL;
  }
  if (thumbnail.startsWith('http://') || thumbnail.startsWith('https://')) {
    return thumbnail;
  }
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

const POST_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

/**
 * Formats a post's YYYY-MM-DD date as "July 10, 2026". Formatted in UTC so
 * the day never shifts with the visitor's time zone.
 * @param {string} date - Frontmatter date
 * @returns {string} Display date, or '' when missing or invalid
 */
export function formatPostDate(date) {
  if (!date) return '';
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? '' : POST_DATE_FORMAT.format(parsed);
}
