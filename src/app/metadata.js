import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Pradumna Saraf',
  description:
    'Developer Advocate, Docker Captain, and Microsoft MVP. I work with cloud-native tech, DevOps, and open source.',
  keywords:
    'Pradumna Saraf, Developer Advocate, Docker Captain, Microsoft MVP, Open Source, Cloud Native, DevOps, Software Development',
  authors: [{ name: 'Pradumna Saraf' }],
  creator: 'Pradumna Saraf',
  publisher: 'Pradumna Saraf',
  openGraph: {
    title: 'Pradumna Saraf',
    description:
      'Developer Advocate, Docker Captain, and Microsoft MVP. I work with cloud-native tech, DevOps, and open source.',
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Developer Advocate, Docker Captain & Microsoft MVP',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pradumna Saraf',
    description:
      'Developer Advocate, Docker Captain, and Microsoft MVP. I work with cloud-native tech, DevOps, and open source.',
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
    canonical: SITE_URL,
  },
};
