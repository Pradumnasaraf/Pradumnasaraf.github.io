import { SITE_URL } from '@/lib/constants';

export const metadata = {
  title: 'Connect with Pradumna',
  description:
    'Find all my links in one place - website, blog, and social media.',
  openGraph: {
    title: 'Connect with Pradumna',
    description:
      'Find all my links in one place - website, blog, and social media.',
    url: `${SITE_URL}/links`,
    images: [
      {
        url: `${SITE_URL}/media/links-og.png`,
        width: 1200,
        height: 630,
        alt: 'Connect with Pradumna',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with Pradumna',
    description:
      'Find all my links in one place - website, blog, and social media.',
    images: [`${SITE_URL}/media/links-og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/links`,
  },
};
