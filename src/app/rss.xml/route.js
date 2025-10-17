export async function GET() {
  const baseUrl = 'https://pradumnasaraf.dev';
  const currentDate = new Date().toISOString();

  // RSS feed for blog posts
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pradumna Saraf - Blog</title>
    <link>https://blog.pradumnasaraf.dev</link>
    <description>Technical articles and tutorials about Docker, Kubernetes, DevOps, and Open Source</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/media/pradumna-saraf-og.png</url>
      <title>Pradumna Saraf</title>
      <link>${baseUrl}</link>
    </image>
    
    <item>
      <title>Feature Flags in Backend Development</title>
      <link>https://www.freecodecamp.org/news/feature-flags-backend-development/</link>
      <description>How Feature Flags can be helpful in backend development like building APIs</description>
      <pubDate>2024-11-01T00:00:00+00:00</pubDate>
      <guid>https://www.freecodecamp.org/news/feature-flags-backend-development/</guid>
      <category>Backend Development</category>
      <category>Feature Flags</category>
    </item>
    
    <item>
      <title>Docker Scout in CI/CD for Safer Software Supply Chains</title>
      <link>https://youtu.be/hRp4PaZ6FS4</link>
      <description>Automating Container Security: Docker Scout in CI/CD for Safer Software Supply Chains</description>
      <pubDate>2024-12-01T00:00:00+00:00</pubDate>
      <guid>https://youtu.be/hRp4PaZ6FS4</guid>
      <category>Docker</category>
      <category>Security</category>
      <category>CI/CD</category>
    </item>
    
    <item>
      <title>WASM vs Docker: Partners, Not Rivals</title>
      <link>https://youtu.be/DHaVho5cf4U</link>
      <description>Conference talk about WebAssembly and Docker development process</description>
      <pubDate>2025-06-01T00:00:00+00:00</pubDate>
      <guid>https://youtu.be/DHaVho5cf4U</guid>
      <category>WebAssembly</category>
      <category>Docker</category>
      <category>Conference</category>
    </item>
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
    },
  });
}
