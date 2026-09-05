import { SITE_URL } from '../../lib/constants.js';
import { sitemapPages } from '../sitemap/data.js';
import { getFeedEligiblePosts, getAllTags } from '../../lib/blog.js';

// TEMPORARY - remove once Search Console reports /cv as
// "Excluded by 'noindex' tag" (check via URL Inspection, GOOGLE INDEX tab).
//
// /cv is served with `noindex` and is intentionally absent from sitemap/data.js,
// so it never appears on the /sitemap page. But nothing links to it either,
// which left it an orphan Google had no reason to recrawl - so an index entry
// from before the noindex was added kept ranking. Search Console's "Request
// indexing" refuses pages carrying noindex, so a sitemap entry is the only way
// left to invite the crawl that lets Google see the tag and drop the page.
const DEINDEX_NUDGE_PAGES = [
  { url: '/cv', changefreq: 'monthly', priority: '0.1' },
];

export async function GET() {
  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  // Drafts and articles canonicalized to another domain are excluded here
  // (see getFeedEligiblePosts).
  const originalPosts = getFeedEligiblePosts();

  // Generate sitemap entries for static pages. Pages can pin an explicit
  // lastmod via sitemap/data.js; otherwise we report the current build date
  // (the sitemap regenerates on every deploy).
  const staticPages = sitemapPages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const deindexNudgePages = DEINDEX_NUDGE_PAGES.map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n');

  // Generate sitemap entries for blog posts
  const blogPages = originalPosts
    .map((post) => {
      const postDate = post.date
        ? new Date(post.date).toISOString().split('T')[0]
        : currentDate;
      return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n');

  // Generate sitemap entries for blog tag landing pages. Each surfaces a
  // topical archive (e.g. /blog/tag/docker) and is a real ranking surface
  // for tag-named queries.
  const tagPages = getAllTags()
    .map(
      ({ tag }) => `  <url>
    <loc>${baseUrl}/blog/tag/${tag}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n');

  // Generate clean XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${deindexNudgePages}
${blogPages}
${tagPages}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}
