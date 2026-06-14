import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Page Not Found | Pradumna Saraf',
  description:
    "The page you're looking for doesn't exist. Please check the URL or return to the homepage.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Page Not Found | Pradumna Saraf',
    description:
      "The page you're looking for doesn't exist. Please check the URL or return to the homepage.",
    url: `${SITE_URL}/404`,
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Developer Advocate & Docker Captain',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found | Pradumna Saraf',
    description:
      "The page you're looking for doesn't exist. Please check the URL or return to the homepage.",
    creator: TWITTER_HANDLE,
    images: [OG_IMAGE_URL],
  },
};
