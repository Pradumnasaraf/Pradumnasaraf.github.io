import { SITE_URL, TWITTER_HANDLE } from '@/lib/constants';

export const metadata = {
  title: 'Pradumna Saraf | CV',
  description:
    'My CV and work experience in open source, content creation, and community building.',
  keywords:
    'Pradumna Saraf CV, Professional Experience, Open Source Developer, Technical Content Creator, Community Builder',
  openGraph: {
    title: "Pradumna's CV",
    description:
      'My CV and work experience in open source, content creation, and community building.',
    url: `${SITE_URL}/cv`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/media/cv-og.png`,
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - CV',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pradumna's CV",
    description:
      'My CV and work experience in open source, content creation, and community building.',
    creator: TWITTER_HANDLE,
    images: [`${SITE_URL}/media/cv-og.png`],
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
    canonical: `${SITE_URL}/cv`,
  },
};
