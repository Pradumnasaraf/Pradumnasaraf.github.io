import test from 'node:test';
import assert from 'node:assert/strict';
import { GET as getRss } from '../src/app/rss.xml/route.js';
import { GET as getSitemap } from '../src/app/sitemap.xml/route.js';
import { GET as getSitemapIndex } from '../src/app/sitemap-index.xml/route.js';

test('rss.xml route responds with RSS XML', async () => {
  const response = await getRss();
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.ok(
    (response.headers.get('content-type') || '').includes('application/rss+xml')
  );
  assert.ok(body.includes('<rss'));
  assert.ok(body.includes('<channel>'));
});

test('sitemap.xml route responds with sitemap XML', async () => {
  const response = await getSitemap();
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.ok(
    (response.headers.get('content-type') || '').includes('application/xml')
  );
  assert.ok(body.includes('<urlset'));
  assert.ok(body.includes('https://pradumnasaraf.dev/blog/'));
});

test('sitemap-index.xml route responds with sitemap index XML', async () => {
  const response = await getSitemapIndex();
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.ok(
    (response.headers.get('content-type') || '').includes('application/xml')
  );
  assert.ok(body.includes('<sitemapindex'));
  assert.ok(body.includes('/sitemap.xml'));
});
