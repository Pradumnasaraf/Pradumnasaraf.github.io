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
