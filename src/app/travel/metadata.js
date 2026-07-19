import { SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: "Pradumna's Travel",
  description: "Places I've travelled to, shown on an interactive globe.",
  keywords: ['Pradumna Saraf', 'Travel', 'Places', 'Cities', 'Trips'],
  openGraph: {
    title: "Pradumna's Travel",
    description: "Places I've travelled to, shown on an interactive globe.",
    url: `${SITE_URL}/travel`,
    images: [
      {
        url: `${SITE_URL}/media/travel-og.png`,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Travel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pradumna's Travel",
    description: "Places I've travelled to, shown on an interactive globe.",
    creator: TWITTER_HANDLE,
    images: [`${SITE_URL}/media/travel-og.png`],
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
    canonical: `${SITE_URL}/travel`,
  },
};
