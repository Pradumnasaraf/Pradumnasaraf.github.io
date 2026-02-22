import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import './style.css';
import { metadata } from './metadata';
import BlogSearch from '@/components/BlogSearch';
import BlogPostExplorer from '@/components/BlogPostExplorer';

export { metadata };

export default function BlogPage() {
  const posts = getAllPosts();
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
      <div className="blog-topbar" role="banner">
        <div className="blog-topbar-inner">
          <Link
            href="/"
            className="blog-listing-back-button"
            aria-label="Back to Home"
            title="Home"
          >
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
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>

          <BlogSearch posts={searchPosts} />
        </div>
      </div>

      <div className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">
            Technical articles, tutorials, and insights about Docker,
            Kubernetes, DevOps, and Cloud Native technologies
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <p>No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <BlogPostExplorer posts={posts} />
        )}
      </div>
    </>
  );
}
