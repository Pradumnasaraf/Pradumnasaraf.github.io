import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Site Map | Pradumna Saraf',
  description:
    'Navigate through all pages and resources on pradumnasaraf.dev. Find CV, timeline, speaking engagements, toolkit, photography, and more.',
  keywords: [
    'sitemap',
    'navigation',
    'pradumna saraf',
    'developer advocate',
    'docker captain',
    'open source',
    'portfolio',
    'cv',
    'timeline',
    'speaking',
    'toolkit',
    'photography',
  ],
  openGraph: {
    title: 'Site Map | Pradumna Saraf',
    description:
      'Navigate through all pages and resources on pradumnasaraf.dev',
    url: `${SITE_URL}/sitemap`,
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Site Map',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Map | Pradumna Saraf',
    description:
      'Navigate through all pages and resources on pradumnasaraf.dev',
    creator: TWITTER_HANDLE,
    images: [OG_IMAGE_URL],
  },
  robots: {
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
  alternates: {
    canonical: `${SITE_URL}/sitemap`,
  },
};
