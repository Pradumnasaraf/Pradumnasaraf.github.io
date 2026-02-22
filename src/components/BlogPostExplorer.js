'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

const INITIAL_VISIBLE_POSTS = 9;
const LOAD_MORE_COUNT = 6;

function getDateValue(date) {
  if (!date) return 0;
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function byLatest(a, b) {
  return getDateValue(b.date) - getDateValue(a.date);
}

function byOldest(a, b) {
  return getDateValue(a.date) - getDateValue(b.date);
}

function byShortest(a, b) {
  return (a.readingTime || 0) - (b.readingTime || 0);
}

function byLongest(a, b) {
  return (b.readingTime || 0) - (a.readingTime || 0);
}

function normalizePost(post) {
  return {
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : [],
  };
}

function formatPostDate(date) {
  if (!date) return '';

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return format(parsed, 'MMMM dd, yyyy');
}

export default function BlogPostExplorer({ posts }) {
  const [activeTag, setActiveTag] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);

  const normalizedPosts = useMemo(() => posts.map(normalizePost), [posts]);

  const topTags = useMemo(() => {
    const counts = new Map();

    normalizedPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!tag) return;
        counts.set(tag, (counts.get(tag) || 0) + 1);
      });
    });

    return Array.from(counts.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      })
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [normalizedPosts]);

  const filteredPosts = useMemo(() => {
    const filtered = normalizedPosts.filter((post) => {
      const tagMatch = activeTag === 'all' || post.tags.includes(activeTag);

      return tagMatch;
    });

    const sorted = [...filtered];
    if (sortBy === 'latest') sorted.sort(byLatest);
    if (sortBy === 'oldest') sorted.sort(byOldest);
    if (sortBy === 'shortest') sorted.sort(byShortest);
    if (sortBy === 'longest') sorted.sort(byLongest);
    return sorted;
  }, [normalizedPosts, activeTag, sortBy]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;
  const hasActiveFilters = activeTag !== 'all';

  return (
    <section className="blog-explorer" aria-label="Browse blog posts">
      <div className="blog-explorer-toolbar">
        <div className="blog-explorer-status" aria-live="polite">
          Showing {filteredPosts.length} of {posts.length} posts
        </div>

        <div className="blog-explorer-controls">
          <label className="blog-explorer-control">
            <span className="blog-explorer-control-label">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setVisibleCount(INITIAL_VISIBLE_POSTS);
              }}
              className="blog-explorer-select"
            >
              <option value="latest">Latest first</option>
              <option value="oldest">Oldest first</option>
              <option value="shortest">Shortest read</option>
              <option value="longest">Longest read</option>
            </select>
          </label>
        </div>
      </div>

      {topTags.length > 0 && (
        <div
          className="blog-explorer-tags"
          role="group"
          aria-label="Filter by topic"
        >
          <button
            type="button"
            className={`blog-topic-chip ${activeTag === 'all' ? 'blog-topic-chip-active' : ''}`}
            onClick={() => {
              setActiveTag('all');
              setVisibleCount(INITIAL_VISIBLE_POSTS);
            }}
            aria-pressed={activeTag === 'all'}
          >
            All topics
          </button>
          {topTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`blog-topic-chip ${activeTag === tag ? 'blog-topic-chip-active' : ''}`}
              onClick={() => {
                setActiveTag(tag);
                setVisibleCount(INITIAL_VISIBLE_POSTS);
              }}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <button
          type="button"
          className="blog-explorer-clear"
          onClick={() => {
            setActiveTag('all');
            setVisibleCount(INITIAL_VISIBLE_POSTS);
          }}
        >
          Clear filters
        </button>
      )}

      {visiblePosts.length > 0 ? (
        <>
          <div className="blog-posts">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="blog-post-card">
                {post.thumbnail && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-post-thumbnail"
                  >
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={1200}
                      height={900}
                      className="blog-thumbnail-image"
                      priority={false}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </Link>
                )}
                <div className="blog-post-content-wrapper">
                  <div className="blog-post-meta">
                    {post.date && (
                      <time className="blog-post-date" dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                    )}
                    {post.readingTime && (
                      <span className="blog-post-reading-time">
                        {post.readingTime} min read
                      </span>
                    )}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="blog-post-link">
                    <h2 className="blog-post-title">{post.title}</h2>
                    {post.excerpt && (
                      <p className="blog-post-excerpt">{post.excerpt}</p>
                    )}
                  </Link>

                  {post.tags.length > 0 && (
                    <div className="blog-post-tags" aria-label="Post topics">
                      {post.tags.slice(0, 3).map((tag) => (
                        <button
                          key={`${post.slug}-${tag}`}
                          type="button"
                          className="blog-post-tag-button"
                          onClick={() => {
                            setActiveTag(tag);
                            setVisibleCount(INITIAL_VISIBLE_POSTS);
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-post-read-more"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="blog-explorer-load-more-wrap">
              <button
                type="button"
                className="blog-explorer-load-more"
                onClick={() =>
                  setVisibleCount((current) => current + LOAD_MORE_COUNT)
                }
              >
                Load more posts
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="blog-empty">
          <p>No posts match these filters.</p>
        </div>
      )}
    </section>
  );
}
