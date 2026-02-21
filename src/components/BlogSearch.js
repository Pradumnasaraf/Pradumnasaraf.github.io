'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './BlogSearch.css';

// Use inline SVG icons so Safari renders them exactly like the back button SVG
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function BlogSearch({ posts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return posts.filter((post) => {
      const titleMatch = post.title?.toLowerCase().includes(query);
      const descriptionMatch = post.description?.toLowerCase().includes(query);
      const excerptMatch = post.excerpt?.toLowerCase().includes(query);
      const tagsMatch = post.tags?.some((tag) =>
        tag?.toLowerCase().includes(query)
      );

      return titleMatch || descriptionMatch || excerptMatch || tagsMatch;
    });
  }, [searchQuery, posts]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll - works on both desktop and mobile
      // Using position: fixed prevents all scrolling (touch, wheel, etc.)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';

      return () => {
        // Restore scroll position and unlock body
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <div className="blog-search-trigger">
        {/* Search Icon Button */}
        <button
          className="blog-search-button"
          onClick={handleSearchClick}
          aria-label="Search blog posts"
          title="Search blog posts"
          type="button"
        >
          <SearchIcon />
        </button>

        {/* Close Button - Shows when modal is open */}
        {isOpen && (
          <button
            className="blog-search-close-button"
            onClick={handleClose}
            aria-label="Close search"
            type="button"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Search Modal */}
      {isOpen && (
        <div className="blog-search-modal" onClick={handleClose}>
          <div
            className="blog-search-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="blog-search-header">
              <div className="blog-search-input-wrapper">
                <span className="blog-search-input-icon" aria-hidden="true">
                  <SearchIcon />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="blog-search-input"
                />
                {searchQuery && (
                  <button
                    className="blog-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    title="Clear search"
                    type="button"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="blog-search-results">
              {searchQuery.trim() ? (
                filteredPosts.length > 0 ? (
                  <>
                    <div className="blog-search-results-count">
                      Found {filteredPosts.length}{' '}
                      {filteredPosts.length === 1 ? 'post' : 'posts'}
                    </div>
                    <ul className="blog-search-results-list">
                      {filteredPosts.map((post) => (
                        <li key={post.slug} className="blog-search-result-item">
                          <Link
                            href={`/blog/${post.slug}`}
                            onClick={handleClose}
                            className="blog-search-result-link"
                          >
                            {post.thumbnail && (
                              <div className="blog-search-result-thumbnail">
                                <Image
                                  src={post.thumbnail}
                                  alt={post.title}
                                  width={120}
                                  height={90}
                                  className="blog-search-thumbnail-image"
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <div className="blog-search-result-content">
                              <h3 className="blog-search-result-title">
                                {post.title}
                              </h3>
                              {post.excerpt && (
                                <p className="blog-search-result-excerpt">
                                  {post.excerpt}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="blog-search-no-results">
                    <p>No posts found matching &quot;{searchQuery}&quot;</p>
                    <p className="blog-search-no-results-hint">
                      Try different keywords or check spelling
                    </p>
                  </div>
                )
              ) : (
                <div className="blog-search-empty">
                  <p>Start typing to search blog posts</p>
                  <p className="blog-search-empty-hint">
                    Search by title, excerpt, or tags
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
