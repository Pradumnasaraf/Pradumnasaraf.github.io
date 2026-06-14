import { OG_IMAGE_URL, SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Contact | Pradumna Saraf',
  description:
    'Contact Pradumna Saraf - Developer Advocate, Docker Captain, and Microsoft MVP.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Contact | Pradumna Saraf',
    description:
      'Contact Pradumna Saraf - Developer Advocate, Docker Captain, and Microsoft MVP.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Contact',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Pradumna Saraf',
    description:
      'Contact Pradumna Saraf - Developer Advocate, Docker Captain, and Microsoft MVP.',
    creator: TWITTER_HANDLE,
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};
