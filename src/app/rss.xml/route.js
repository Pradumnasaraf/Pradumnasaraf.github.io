import { getAllPosts } from '../../lib/blog.js';

export async function GET() {
  const baseUrl = 'https://pradumnasaraf.dev';
  const currentDate = new Date().toISOString();

  // Get all blog posts (excluding drafts and reposted content with canonical URLs)
  const allPosts = getAllPosts();

  // Filter out reposted content (posts with canonical URLs pointing elsewhere)
  const originalPosts = allPosts.filter((post) => {
    // Only include posts that don't have a canonical URL, or have canonical pointing to this site
    if (!post.canonical) return true;
    return post.canonical.startsWith(baseUrl);
  });

  // Generate RSS items for blog posts
  const rssItems = originalPosts
    .slice(0, 50) // Limit to latest 50 posts
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString();
      const description = post.excerpt || post.title || '';
      const categories = post.tags
        ? post.tags
            .map((tag) => `<category>${escapeXml(tag)}</category>`)
            .join('\n      ')
        : '';

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${postUrl}</guid>
      ${categories ? categories : ''}
    </item>`;
    })
    .join('\n');

  // RSS feed for blog posts
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pradumna Saraf - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical articles and tutorials about Docker, Kubernetes, DevOps, and Open Source</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/media/pradumna-saraf-og.png</url>
      <title>Pradumna Saraf</title>
      <link>${baseUrl}</link>
    </image>
    
${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
