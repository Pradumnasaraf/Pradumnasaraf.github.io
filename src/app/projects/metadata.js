import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: "Pradumna's Projects",
  description:
    'A curated list of my projects with star counts, tech stack, and quick links.',
  keywords: [
    'Pradumna Saraf projects',
    'GitHub repositories',
    'Open source projects',
    'Developer portfolio',
    'Project showcase',
  ],
  openGraph: {
    title: "Pradumna's Projects",
    description:
      'A curated list of my projects with star counts, tech stack, and quick links.',
    url: `${SITE_URL}/projects`,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pradumna's Projects",
    description:
      'A curated list of my projects with star counts, tech stack, and quick links.',
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
    canonical: `${SITE_URL}/projects`,
  },
};
