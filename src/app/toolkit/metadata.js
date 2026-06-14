import { SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Pradumna Saraf | Toolkit',
  description:
    'Tools, software, and gear I use daily for development and productivity.',
  keywords:
    'Pradumna Saraf Tools, Developer Tools, Docker Captain Tools, Development Setup, Productivity Tools, Software Stack, Hardware Setup',
  openGraph: {
    title: "Pradumna's Toolkit",
    description:
      'Tools, software, and gear I use daily for development and productivity.',
    url: `${SITE_URL}/toolkit`,
    images: [
      {
        url: `${SITE_URL}/media/toolkit-og.png`,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Tools & Gear',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pradumna's Toolkit",
    description:
      'Tools, software, and gear I use daily for development and productivity.',
    creator: TWITTER_HANDLE,
    images: [`${SITE_URL}/media/toolkit-og.png`],
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
    canonical: `${SITE_URL}/toolkit`,
  },
};
