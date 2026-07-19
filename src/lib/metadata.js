import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from './constants';

const ROBOTS = {
  full: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  simple: { index: true, follow: true },
  noindex: { index: false, follow: false },
};

// Shared builder for per-route metadata. Pass only the fields that differ;
// ogTitle/ogDescription default to title/description, ogImage defaults to the
// generic site image and accepts a bare filename under /media, robots is
// 'full' | 'simple' | 'noindex'. Extra top-level fields (authors, creator,
// publisher, metadataBase) pass through via ...rest.
export function buildMetadata({
  title,
  description,
  path = '',
  keywords,
  ogTitle = title,
  ogDescription = description,
  ogImage,
  imageAlt,
  robots = 'full',
  twitterCreator = TWITTER_HANDLE,
  rss = false,
  alternates,
  ...rest
}) {
  const url = `${SITE_URL}${path}`;
  const image = !ogImage
    ? OG_IMAGE_URL
    : ogImage.startsWith('http')
      ? ogImage
      : `${SITE_URL}/media/${ogImage}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...rest,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(twitterCreator ? { creator: twitterCreator } : {}),
      images: [image],
    },
    robots: ROBOTS[robots],
    alternates: {
      canonical: url,
      ...(rss
        ? { types: { 'application/rss+xml': `${SITE_URL}/rss.xml` } }
        : {}),
      ...alternates,
    },
  };
}
