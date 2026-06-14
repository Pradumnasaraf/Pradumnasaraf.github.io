import { OG_IMAGE_URL, SITE_URL } from '../../lib/constants.js';
import speakingTalks from '../speaking/speaking.json' with { type: 'json' };

function escapeXml(value) {
  if (value == null) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Extract a YouTube video ID from any of the common URL shapes used in
 * speaking.json: youtu.be/<id>, youtube.com/watch?v=<id>,
 * youtube.com/live/<id>, youtube.com/embed/<id>. Strips query strings.
 */
function youtubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([\w-]+)/
  );
  return match ? match[1] : null;
}

/**
 * Parse the human-readable date strings used in speaking.json (e.g.
 * "6th August 2025", "27th May, 2023") into an ISO 8601 timestamp suitable
 * for <video:publication_date>. Returns null if the date can't be parsed.
 */
function toIsoPublicationDate(dateStr) {
  if (!dateStr) return null;
  const cleaned = dateStr
    .replace(/(\d+)(st|nd|rd|th)/gi, '$1')
    .replace(/,/g, '');
  const parsed = new Date(cleaned);
  if (Number.isNaN(parsed.getTime())) return null;
  return `${parsed.toISOString().split('.')[0]}+00:00`;
}

export async function GET() {
  const baseUrl = SITE_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  const videos = speakingTalks
    .filter((talk) => talk.recording)
    .map((talk) => {
      const id = youtubeId(talk.recording);
      if (!id) return null;
      const titleParts = [talk.event, talk.title].filter(Boolean);
      return {
        id,
        title: titleParts.join(' - '),
        description: talk.topic || talk.title || '',
        publicationDate: toIsoPublicationDate(talk.date),
      };
    })
    .filter(Boolean);

  const videoEntries = videos
    .map(
      (v) => `    <video:video>
      <video:thumbnail_loc>${OG_IMAGE_URL}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>
      <video:content_loc>https://youtu.be/${v.id}</video:content_loc>
      <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${v.id}</video:player_loc>${v.publicationDate ? `\n      <video:publication_date>${v.publicationDate}</video:publication_date>` : ''}
      <video:category>Technology</video:category>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>`
    )
    .join('\n');

  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/speaking</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
${videoEntries}
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
