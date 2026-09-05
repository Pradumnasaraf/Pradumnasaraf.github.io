import { SITE_URL } from '../../lib/constants.js';
import { getFeedEligiblePosts } from '../../lib/blog.js';
import photos from '../photography/images.json' with { type: 'json' };

const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function imageEntry({ loc, title, caption }) {
  return [
    '    <image:image>',
    `      <image:loc>${escapeXml(loc)}</image:loc>`,
    title ? `      <image:title>${escapeXml(title)}</image:title>` : null,
    caption
      ? `      <image:caption>${escapeXml(caption)}</image:caption>`
      : null,
    '    </image:image>',
  ]
    .filter(Boolean)
    .join('\n');
}

function urlEntry({ loc, lastmod, changefreq, priority, images }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${images.map(imageEntry).join('\n')}
  </url>`;
}

// Local images referenced from a post: the frontmatter thumbnail plus every
// in-body markdown image. Remote embeds are skipped - a sitemap should only
// advertise images this site actually serves.
function postImages(post) {
  const seen = new Set();
  const images = [];

  const add = (src, alt) => {
    if (!src || !src.startsWith('/') || seen.has(src)) return;
    seen.add(src);
    images.push({
      loc: `${SITE_URL}${src}`,
      title: alt || post.title,
      caption: alt || undefined,
    });
  };

  add(post.thumbnail, post.title);
  for (const [, alt, src] of (post.content || '').matchAll(MARKDOWN_IMAGE)) {
    add(src, alt.trim());
  }

  return images;
}

export async function GET() {
  const currentDate = new Date().toISOString().split('T')[0];

  const photographyEntry = urlEntry({
    loc: `${SITE_URL}/photography`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.7',
    images: photos.map((photo) => ({
      loc: photo.src,
      title: photo.alt,
      caption: photo.alt,
    })),
  });

  const postEntries = getFeedEligiblePosts()
    .map((post) => ({ post, images: postImages(post) }))
    .filter(({ images }) => images.length > 0)
    .map(({ post, images }) =>
      urlEntry({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: post.date
          ? new Date(post.date).toISOString().split('T')[0]
          : currentDate,
        changefreq: 'monthly',
        priority: '0.8',
        images,
      })
    );

  const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[photographyEntry, ...postEntries].join('\n')}
</urlset>`;

  return new Response(imageSitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}
