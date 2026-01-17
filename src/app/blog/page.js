import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import './style.css';
import { metadata } from './metadata';
import BlogSearch from '@/components/BlogSearch';

export { metadata };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-container">
      <BlogSearch posts={posts} />
      <Link
        href="/"
        className="blog-listing-back-button"
        aria-label="Back to Home"
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

      <header className="blog-header">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">
          Technical articles, tutorials, and insights about Docker, Kubernetes,
          DevOps, and Cloud Native technologies
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="blog-posts">
          {posts.map((post) => (
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
                      {format(new Date(post.date), 'MMMM dd, yyyy')}
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
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
