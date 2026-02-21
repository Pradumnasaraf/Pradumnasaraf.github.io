import { sitemapPages } from '../sitemap/data.js';
import { getAllPosts } from '../../lib/blog.js';

export async function GET() {
  const baseUrl = 'https://pradumnasaraf.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  // Get all blog posts (excluding drafts and reposted content with canonical URLs)
  const allPosts = getAllPosts();

  // Filter out reposted content (posts with canonical URLs pointing elsewhere)
  const originalPosts = allPosts.filter((post) => {
    // Only include posts that don't have a canonical URL, or have canonical pointing to this site
    if (!post.canonical) return true;
    return post.canonical.startsWith(baseUrl);
  });

  // Generate sitemap entries for static pages
  const staticPages = sitemapPages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.url === '' ? currentDate : '2025-01-27'}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

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

  // Generate clean XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${blogPages}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}
