import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMetadata } from '../src/lib/metadata.js';
import {
  OG_IMAGE_URL,
  SITE_URL,
  TWITTER_HANDLE,
} from '../src/lib/constants.js';

test('buildMetadata derives canonical and OG url from path', () => {
  const meta = buildMetadata({
    title: 'Projects',
    description: 'Things I built',
    path: '/projects',
  });

  assert.equal(meta.alternates.canonical, `${SITE_URL}/projects`);
  assert.equal(meta.openGraph.url, `${SITE_URL}/projects`);
});

test('buildMetadata defaults OG/twitter title and description to the page ones', () => {
  const meta = buildMetadata({ title: 'Home', description: 'Landing' });

  assert.equal(meta.openGraph.title, 'Home');
  assert.equal(meta.openGraph.description, 'Landing');
  assert.equal(meta.twitter.title, 'Home');
  assert.equal(meta.twitter.description, 'Landing');
  assert.equal(meta.twitter.creator, TWITTER_HANDLE);
  assert.equal(meta.twitter.card, 'summary_large_image');
});

test('buildMetadata falls back to the generic OG image at 1200x630', () => {
  const meta = buildMetadata({ title: 'X', description: 'Y' });

  assert.equal(meta.openGraph.images[0].url, OG_IMAGE_URL);
  assert.equal(meta.openGraph.images[0].width, 1200);
  assert.equal(meta.openGraph.images[0].height, 630);
  assert.equal(meta.twitter.images[0], OG_IMAGE_URL);
});

test('buildMetadata resolves a bare ogImage filename under /media', () => {
  const meta = buildMetadata({
    title: 'Blog',
    description: 'Posts',
    ogImage: 'blog-og.png',
  });

  assert.equal(meta.openGraph.images[0].url, `${SITE_URL}/media/blog-og.png`);
  assert.equal(meta.twitter.images[0], `${SITE_URL}/media/blog-og.png`);
});

test('buildMetadata keeps an absolute ogImage url as-is', () => {
  const abs = 'https://cdn.example.com/custom-og.png';
  const meta = buildMetadata({ title: 'X', description: 'Y', ogImage: abs });

  assert.equal(meta.openGraph.images[0].url, abs);
});

test('buildMetadata maps the robots preset', () => {
  const full = buildMetadata({ title: 'X', description: 'Y' });
  const hidden = buildMetadata({
    title: 'X',
    description: 'Y',
    robots: 'noindex',
  });

  assert.equal(full.robots.index, true);
  assert.equal(full.robots.follow, true);
  assert.equal(hidden.robots.index, false);
  assert.equal(hidden.robots.follow, false);
});

test('buildMetadata adds the RSS alternate only when rss is true', () => {
  const withRss = buildMetadata({ title: 'Blog', description: 'Y', rss: true });
  const withoutRss = buildMetadata({ title: 'Blog', description: 'Y' });

  assert.equal(
    withRss.alternates.types['application/rss+xml'],
    `${SITE_URL}/rss.xml`
  );
  assert.equal(withoutRss.alternates.types, undefined);
});

test('buildMetadata passes extra top-level fields through via rest', () => {
  const meta = buildMetadata({
    title: 'X',
    description: 'Y',
    keywords: ['a', 'b'],
    authors: [{ name: 'Pradumna Saraf' }],
  });

  assert.deepEqual(meta.keywords, ['a', 'b']);
  assert.deepEqual(meta.authors, [{ name: 'Pradumna Saraf' }]);
});
