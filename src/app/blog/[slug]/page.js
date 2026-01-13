import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { getThumbnailUrl } from '@/lib/blog-utils';
import { format } from 'date-fns';
import BlogShareButtons from '@/components/BlogShareButtons';
import CodeBlockCopy from '@/components/CodeBlockCopy';
import ReadingProgress from '@/components/ReadingProgress';
import BlogBackButton from '@/components/BlogBackButton';
import '../style.css';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
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

  const thumbnailUrl = getThumbnailUrl(post.thumbnail);

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
          url: thumbnailUrl,
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
      images: [thumbnailUrl],
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

  const postUrl = `https://pradumnasaraf.dev/blog/${slug}`;
  const thumbnailUrl = getThumbnailUrl(post.thumbnail);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: thumbnailUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Pradumna Saraf',
      url: 'https://pradumnasaraf.dev',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pradumna Saraf',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pradumnasaraf.dev/media/pradumna-saraf-og.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <div className="blog-post-container">
      <ReadingProgress />
      <BlogBackButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="blog-post">
        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <time className="blog-post-date" dateTime={post.date || ''}>
              {post.date ? format(new Date(post.date), 'MMMM dd, yyyy') : ''}
            </time>
            {post.readingTime && (
              <span className="blog-post-reading-time">
                {post.readingTime} min read
              </span>
            )}
            {post.wordCount && (
              <span className="blog-post-word-count">
                {post.wordCount.toLocaleString()} words
              </span>
            )}
          </div>
        </header>

        {post.thumbnail && (
          <div className="blog-post-featured-image">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={1200}
              height={630}
              className="blog-featured-image"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 800px"
            />
          </div>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <CodeBlockCopy />

        <footer className="blog-post-footer">
          <div className="blog-post-footer-content">
            <BlogShareButtons url={postUrl} title={post.title} />
            <Link href="/blog" className="blog-post-back-link">
              ← Back to Blog
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
