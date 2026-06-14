import { SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Pradumna Saraf | Timeline',
  description: 'My professional journey - from early career to now.',
  keywords:
    'Pradumna Saraf Timeline, Professional Journey, Career Timeline, Developer Advocate Journey, Docker Captain Journey, Career Milestones',
  openGraph: {
    title: "Pradumna's Professional Timeline",
    description: 'My professional journey - from early career to now.',
    url: `${SITE_URL}/timeline`,
    images: [
      {
        url: `${SITE_URL}/media/timeline-og.png`,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Professional Timeline',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pradumna's Professional Timeline",
    description: 'My professional journey - from early career to now.',
    creator: TWITTER_HANDLE,
    images: [`${SITE_URL}/media/timeline-og.png`],
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
    canonical: `${SITE_URL}/timeline`,
  },
};
