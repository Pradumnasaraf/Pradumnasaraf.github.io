export async function GET() {
  const baseUrl = 'https://pradumnasaraf.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  // Image sitemap for photography page
  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/photography</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${baseUrl}/media/pradumna-saraf.png</image:loc>
      <image:title>Pradumna Saraf Photography Portfolio</image:title>
      <image:caption>Professional photography portfolio showcasing various subjects and styles</image:caption>
    </image:image>
  </url>
</urlset>`;

  return new Response(imageSitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}
