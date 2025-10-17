export async function GET() {
  const baseUrl = 'https://pradumnasaraf.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  // Video sitemap for speaking page
  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/speaking</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:thumbnail_loc>${baseUrl}/media/pradumna-saraf-og.png</video:thumbnail_loc>
      <video:title>KubeCon China 2025 - WASM vs Docker: Partners, Not Rivals</video:title>
      <video:description>Conference talk about WebAssembly and Docker development process</video:description>
      <video:content_loc>https://youtu.be/DHaVho5cf4U</video:content_loc>
      <video:player_loc allow_embed="yes">https://www.youtube.com/embed/DHaVho5cf4U</video:player_loc>
      <video:duration>1800</video:duration>
      <video:publication_date>2025-06-01T00:00:00+00:00</video:publication_date>
      <video:category>Technology</video:category>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
    <video:video>
      <video:thumbnail_loc>${baseUrl}/media/pradumna-saraf-og.png</video:thumbnail_loc>
      <video:title>KubeCon India 2025 - WASM vs Docker: Partners, Not Rivals</video:title>
      <video:description>Conference talk about WebAssembly and Docker development process</video:description>
      <video:content_loc>https://youtu.be/J8situjchtg</video:content_loc>
      <video:player_loc allow_embed="yes">https://www.youtube.com/embed/J8situjchtg</video:player_loc>
      <video:duration>1800</video:duration>
      <video:publication_date>2025-08-01T00:00:00+00:00</video:publication_date>
      <video:category>Technology</video:category>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
</urlset>`;

  return new Response(videoSitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}
