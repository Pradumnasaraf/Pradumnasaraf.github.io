import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllPosts,
  getAllPostSlugs,
  getPostBySlug,
  getFeedEligiblePosts,
  processMarkdown,
} from '../src/lib/blog.js';
import { getThumbnailUrl } from '../src/lib/blog-utils.js';
import { OG_IMAGE_URL, SITE_URL } from '../src/lib/constants.js';

test('getAllPosts returns sorted, non-empty blog post list', () => {
  const posts = getAllPosts();

  assert.ok(Array.isArray(posts));
  assert.ok(posts.length > 0);
  assert.equal(
    posts.some((post) => post?.draft),
    false
  );

  const dates = posts
    .map((post) => post?.date)
    .filter(Boolean)
    .map((date) => new Date(date).getTime());

  for (let i = 1; i < dates.length; i += 1) {
    assert.ok(dates[i - 1] >= dates[i]);
  }
});

test('getAllPostSlugs returns known slug', () => {
  const slugs = getAllPostSlugs();

  assert.ok(Array.isArray(slugs));
  assert.ok(slugs.includes('github-profile'));
});

test('getPostBySlug renders markdown to HTML and computes reading stats', async () => {
  const post = await getPostBySlug('github-profile');

  assert.ok(post);
  assert.equal(post.slug, 'github-profile');
  assert.ok(
    typeof post.contentHtml === 'string' && post.contentHtml.length > 0
  );
  assert.ok(post.contentHtml.includes('<'));
  assert.ok(Number.isInteger(post.wordCount) && post.wordCount > 0);
  assert.ok(Number.isInteger(post.readingTime) && post.readingTime > 0);
});

test('getFeedEligiblePosts keeps original and self-canonical posts, drops cross-posts', () => {
  const posts = [
    { slug: 'no-canonical' },
    { slug: 'self-canonical', canonical: `${SITE_URL}/blog/self-canonical` },
    { slug: 'cross-posted', canonical: 'https://dev.to/x/cross-posted' },
    { slug: 'hashnode', canonical: 'https://blog.example.com/hashnode' },
  ];

  const eligible = getFeedEligiblePosts(posts).map((post) => post.slug);

  assert.deepEqual(eligible, ['no-canonical', 'self-canonical']);
});

test('getFeedEligiblePosts on real content excludes any cross-posted articles', () => {
  const eligible = getFeedEligiblePosts();

  // Every post that survives must be one the site is the canonical home for.
  for (const post of eligible) {
    if (post.canonical) {
      assert.ok(
        post.canonical.startsWith(SITE_URL),
        `${post.slug} leaked into feeds with off-site canonical ${post.canonical}`
      );
    }
  }
});

test('getThumbnailUrl falls back to the generic OG image when unset', () => {
  assert.equal(getThumbnailUrl(), OG_IMAGE_URL);
  assert.equal(getThumbnailUrl(''), OG_IMAGE_URL);
});

test('getThumbnailUrl returns absolute URLs unchanged', () => {
  const abs = 'https://cdn.example.com/a.png';
  assert.equal(getThumbnailUrl(abs), abs);
  assert.equal(
    getThumbnailUrl('http://example.com/b.png'),
    'http://example.com/b.png'
  );
});

test('getThumbnailUrl makes relative paths absolute against SITE_URL', () => {
  // Leading-slash and bare paths both resolve to a single-slash absolute URL.
  assert.equal(
    getThumbnailUrl('/blog-images/x/thumbnail.png'),
    `${SITE_URL}/blog-images/x/thumbnail.png`
  );
  assert.equal(
    getThumbnailUrl('blog-images/x/thumbnail.png'),
    `${SITE_URL}/blog-images/x/thumbnail.png`
  );
});

test('processMarkdown sanitizes unsafe HTML while preserving safe HTML', async () => {
  const html = await processMarkdown(
    [
      'Safe link: <a href="https://example.com" target="blank">Example</a>',
      '',
      '<img src="x" onerror="alert(\'xss\')" />',
      "<script>alert('xss')</script>",
    ].join('\n')
  );

  assert.ok(html.includes('href="https://example.com"'));
  assert.ok(!html.includes('<script'));
  assert.ok(!html.includes('onerror='));
});

test('processMarkdown preserves highlight.js classes on fenced code blocks', async () => {
  const html = await processMarkdown('```js\nconst x = 1;\n```');

  // rehype-highlight tokenizes the code; the sanitize allowlist must let the
  // language-* and hljs-* class names through, or syntax highlighting breaks.
  assert.ok(html.includes('class="language-js"'));
  assert.ok(html.includes('hljs-keyword'));
  assert.ok(html.includes('hljs-number'));
});

test('processMarkdown strips class names that are not hljs/language', async () => {
  const html = await processMarkdown('<code class="totally-evil">x</code>');

  // The className allowlist is a restriction, not just an addition: an
  // arbitrary class on <code> must be dropped even though the tag is allowed.
  assert.ok(!html.includes('totally-evil'));
  assert.ok(html.includes('<code'));
});

test('processMarkdown keeps rehype-slug heading ids without a clobber prefix', async () => {
  const html = await processMarkdown('# Hello World Section');

  // clobberPrefix: '' means anchors match rehype-slug ids exactly, with no
  // user-content- prefix leaking into the URL fragments.
  assert.ok(html.includes('id="hello-world-section"'));
  assert.ok(!html.includes('user-content-'));
});

test('processMarkdown preserves allowed link and image attributes', async () => {
  const html = await processMarkdown(
    [
      '<a href="https://x.com" target="_blank" rel="noopener">x</a>',
      '',
      '<img src="/a.png" loading="lazy" decoding="async" width="10" height="10" alt="a" />',
    ].join('\n')
  );

  assert.ok(html.includes('target="_blank"'));
  assert.ok(html.includes('rel="noopener"'));
  assert.ok(html.includes('loading="lazy"'));
  assert.ok(html.includes('decoding="async"'));
  assert.ok(html.includes('width="10"'));
  assert.ok(html.includes('height="10"'));
});

test('processMarkdown drops javascript: URLs and disallowed tags', async () => {
  const html = await processMarkdown(
    [
      '[click](javascript:alert(1))',
      '',
      '<iframe src="https://evil.com"></iframe>',
    ].join('\n')
  );

  // Anchor text survives, but the javascript: protocol href is removed.
  assert.ok(html.includes('click'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(!/href=/.test(html));
  assert.ok(!html.includes('<iframe'));
});
