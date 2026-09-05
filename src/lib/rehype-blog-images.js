import path from 'path';
import { getImageSize } from './image-size.js';

const publicDir = path.join(process.cwd(), 'public');

// Post content renders inside .blog-post-container (800px, 2rem padding each
// side), so an in-body image is never laid out wider than 736 CSS px.
const CONTENT_WIDTH = 736;
const SIZES = `(max-width: 768px) 100vw, ${CONTENT_WIDTH}px`;

// Must be values Next's image optimizer accepts (config deviceSizes).
const CANDIDATE_WIDTHS = [640, 750, 828, 1080, 1200, 1920];

// Animated GIFs would be flattened to a single frame by the optimizer, and SVG
// is already vector. Both keep their original src.
const SKIP_OPTIMIZE = new Set(['.gif', '.svg']);

function optimizedUrl(src, width) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

function buildSrcSet(src, intrinsicWidth) {
  const widths = CANDIDATE_WIDTHS.filter((w) => w <= intrinsicWidth);
  // Source narrower than the smallest candidate: one entry at its own width.
  if (widths.length === 0) widths.push(CANDIDATE_WIDTHS[0]);
  return {
    srcSet: widths.map((w) => `${optimizedUrl(src, w)} ${w}w`).join(', '),
    fallback: optimizedUrl(src, widths[widths.length - 1]),
  };
}

function isLocal(src) {
  return (
    typeof src === 'string' && src.startsWith('/') && !src.startsWith('//')
  );
}

function transformImage(node) {
  const props = node.properties || (node.properties = {});
  const src = props.src;
  if (!isLocal(src)) return;

  // Defer offscreen screenshots; the featured image above the fold carries
  // `priority` and stays the LCP element.
  props.loading = 'lazy';
  props.decoding = 'async';

  const filePath = path.join(publicDir, decodeURIComponent(src));
  const size = getImageSize(filePath);
  if (!size) return;

  props.width = size.width;
  props.height = size.height;

  if (SKIP_OPTIMIZE.has(path.extname(src).toLowerCase())) return;

  const { srcSet, fallback } = buildSrcSet(src, size.width);
  props.srcSet = srcSet;
  props.sizes = SIZES;
  props.src = fallback;
}

function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'img') transformImage(node);
  if (Array.isArray(node.children)) node.children.forEach(walk);
}

/**
 * Rewrites in-body blog images to lazy-load, carry intrinsic width/height (so
 * they reserve layout space and do not shift the page), and stream through
 * Next's image optimizer instead of shipping the raw multi-megabyte PNG.
 *
 * Runs before rehype-sanitize, so the attributes it sets must be allowed by the
 * schema in blog.js.
 */
export default function rehypeBlogImages() {
  return (tree) => {
    walk(tree);
  };
}
