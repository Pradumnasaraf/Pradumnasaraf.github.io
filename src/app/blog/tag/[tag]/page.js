import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { toPostSummary, tagLabel } from '@/lib/blog-utils';
import { SITE_URL } from '@/lib/constants';
import { buildMetadata } from '@/lib/metadata';
import BlogPostExplorer from '@/components/BlogPostExplorer';
import BlogThemeToggle from '@/components/BlogThemeToggle';
import '../../style.css';
import BackArrowIcon from '@/components/BackArrowIcon';

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) {
    return { title: 'Tag Not Found' };
  }

  const label = tagLabel(tag);
  return buildMetadata({
    title: `${label} articles | Pradumna Saraf Blog`,
    description: `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} on ${label} by Pradumna Saraf: hands-on guides, tutorials and talks on ${label} and related tools.`,
    path: `/blog/tag/${tag}`,
    keywords: label,
    robots: 'simple',
  });
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
      <div className="blog-topbar">
        <div className="blog-topbar-inner">
          <Link
            href="/blog"
            className="blog-listing-back-button"
            aria-label="Back to Blog"
            title="Back to Blog"
          >
            <BackArrowIcon />
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
          <h1 className="blog-title">{tagLabel(tag)}</h1>
          <p className="blog-subtitle">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} tagged
            with <strong>{tagLabel(tag)}</strong>.{' '}
            <Link href="/blog">Browse all posts →</Link>
          </p>
        </header>

        <BlogPostExplorer posts={posts.map(toPostSummary)} hideTopicChips />
      </div>
    </>
  );
}
