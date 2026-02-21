import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
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

test('getPostBySlug sanitizes unsafe HTML while preserving safe HTML', async () => {
  const tempSlug = `__sanitization-test-${Date.now()}`;
  const tempPath = path.join(
    process.cwd(),
    'src/content/blog',
    `${tempSlug}.md`
  );

  const fixture = `---
title: 'Sanitization Test'
excerpt: 'Sanitization behavior'
date: '2026-01-01'
author: 'Test'
category: 'test'
tags: ['security']
draft: false
---

Safe link: <a href="https://example.com" target="blank">Example</a>

<img src="x" onerror="alert('xss')" />
<script>alert('xss')</script>
`;

  try {
    fs.writeFileSync(tempPath, fixture);
    const post = await getPostBySlug(tempSlug);

    assert.ok(post);
    assert.ok(post.contentHtml.includes('href="https://example.com"'));
    assert.ok(!post.contentHtml.includes('<script'));
    assert.ok(!post.contentHtml.includes('onerror='));
  } finally {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
});
