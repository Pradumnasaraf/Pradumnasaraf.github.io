import { notFound } from 'next/navigation';
// eslint-disable-next-line no-unused-vars
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { format } from 'date-fns';
import '../style.css';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Pradumna Saraf Blog`,
    description: post.excerpt || post.title,
    keywords: post.tags ? post.tags.join(', ') : '',
    authors: [{ name: post.author || 'Pradumna Saraf' }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: `https://pradumnasaraf.dev/blog/${slug}`,
      siteName: 'Pradumna Saraf',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Pradumna Saraf'],
      tags: post.tags || [],
      images: [
        {
          url:
            post.image ||
            'https://pradumnasaraf.dev/media/pradumna-saraf-og.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      creator: '@pradumna_saraf',
      images: [
        post.image || 'https://pradumnasaraf.dev/media/pradumna-saraf-og.png',
      ],
    },
    alternates: {
      canonical: `https://pradumnasaraf.dev/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="blog-post-container">
      <Link href="/blog" className="back-button">
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
        Back to Blog
      </Link>

      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <time className="blog-post-date">
              {post.date ? format(new Date(post.date), 'MMMM dd, yyyy') : ''}
            </time>
            {post.category && (
              <span className="blog-post-category">{post.category}</span>
            )}
            {post.author && (
              <span className="blog-post-author">By {post.author}</span>
            )}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
          {post.tags && post.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}
