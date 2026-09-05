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
