import test from 'node:test';
import assert from 'node:assert/strict';
import { proxy } from '../src/proxy.js';

function makeRequest(url, host) {
  return {
    url,
    nextUrl: {
      clone: () => new URL(url),
    },
    headers: {
      get: (name) => (name.toLowerCase() === 'host' ? host : null),
    },
  };
}

test('redirects blog subdomain root to /blog', () => {
  const response = proxy(
    makeRequest('https://blog.pradumnasaraf.dev/', 'blog.pradumnasaraf.dev')
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get('location'),
    'https://pradumnasaraf.dev/blog'
  );
});

test('redirects known series pages to /blog', () => {
  const response = proxy(
    makeRequest(
      'https://blog.pradumnasaraf.dev/series/open-source',
      'blog.pradumnasaraf.dev'
    )
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get('location'),
    'https://pradumnasaraf.dev/blog'
  );
});

test('rewrites hashnode @username paths and preserves query string', () => {
  const response = proxy(
    makeRequest(
      'https://blog.pradumnasaraf.dev/@pradumnasaraf/my-post?ref=x',
      'blog.pradumnasaraf.dev'
    )
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get('location'),
    'https://pradumnasaraf.dev/blog/my-post?ref=x'
  );
});

test('normalizes trailing slash and redirects to main blog domain', () => {
  const response = proxy(
    makeRequest(
      'https://blog.pradumnasaraf.dev/some-post/',
      'blog.pradumnasaraf.dev'
    )
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get('location'),
    'https://pradumnasaraf.dev/blog/some-post'
  );
});

test('returns next response for non-blog host', () => {
  const response = proxy(
    makeRequest('https://pradumnasaraf.dev/blog', 'pradumnasaraf.dev')
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('x-middleware-next'), '1');
});
