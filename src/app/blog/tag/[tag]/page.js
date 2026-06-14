import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';
import BlogPostExplorer from '@/components/BlogPostExplorer';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import '../../style.css';

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) {
    return { title: 'Tag Not Found' };
  }

  const title = `Posts tagged "${tag}" | Pradumna Saraf Blog`;
  const description = `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} tagged "${tag}" — technical writing on Docker, Kubernetes, DevOps, and Cloud Native by Pradumna Saraf.`;
  const url = `${SITE_URL}/blog/tag/${tag}`;

  return {
    title,
    description,
    keywords: tag,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: TWITTER_HANDLE,
      images: [OG_IMAGE_URL],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  const tagUrl = `${SITE_URL}/blog/tag/${tag}`;

  // CollectionPage JSON-LD describing the tag archive.
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Posts tagged "${tag}"`,
    url: tagUrl,
    isPartOf: {
      '@type': 'Blog',
      name: 'Pradumna Saraf Blog',
      url: `${SITE_URL}/blog`,
    },
    hasPart: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
    inLanguage: 'en',
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Tag: ${tag}`,
        item: tagUrl,
      },
    ],
  };

  return (
    <>
      <div className="blog-topbar" role="banner">
        <div className="blog-topbar-inner">
          <Link
            href="/blog"
            className="blog-listing-back-button"
            aria-label="Back to Blog"
            title="Back to Blog"
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
          <BlogThemeToggle />
        </div>
      </div>

      <div className="blog-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <header className="blog-header">
          <h1 className="blog-title">{tag}</h1>
          <p className="blog-subtitle">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged
            with <strong>{tag}</strong>.{' '}
            <Link href="/blog">Browse all posts →</Link>
          </p>
        </header>

        <BlogPostExplorer posts={posts} hideTopicChips />
      </div>
    </>
  );
}
