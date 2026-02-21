import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllPosts,
  getAllPostSlugs,
  getPostBySlug,
} from '../src/lib/blog.js';

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
