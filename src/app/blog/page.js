import { getAllPosts } from '@/lib/blog';
import { toPostSummary } from '@/lib/blog-utils';
import Link from 'next/link';
import './style.css';
import { metadata } from './metadata';
import BlogSearch from '@/components/BlogSearch';
import BlogPostExplorer from '@/components/BlogPostExplorer';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import BackToTopButton from '@/components/BackToTopButton';
import BackArrowIcon from '@/components/BackArrowIcon';

export { metadata };

export default function BlogPage() {
  const posts = getAllPosts();
  const listingPosts = posts.map(toPostSummary);
  const searchPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description || post.excerpt,
    excerpt: post.excerpt,
    thumbnail: post.thumbnail,
    tags: post.tags || [],
  }));

  return (
    <>
      <div className="blog-topbar">
        <div className="blog-topbar-inner">
          <Link
            href="/"
            className="blog-listing-back-button"
            aria-label="Back to Home"
            title="Home"
          >
            <BackArrowIcon />
          </Link>

          <BlogThemeToggle />
          <BlogSearch posts={searchPosts} />
        </div>
      </div>

      <div className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Hands-on guides on Docker, Kubernetes, DevOps and AI tooling.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <p>No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <BlogPostExplorer posts={listingPosts} />
        )}
      </div>

      <BackToTopButton />
    </>
  );
}
