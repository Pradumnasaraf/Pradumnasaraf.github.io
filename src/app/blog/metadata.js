export const metadata = {
  title: "Pradumna's Blog",
  description:
    'Technical articles and tutorials about Docker, Kubernetes, DevOps, and cloud-native tech.',
  keywords: [
    'Pradumna Saraf Blog',
    'Docker Blog',
    'Kubernetes Blog',
    'DevOps Blog',
    'Cloud Native',
    'Open Source',
    'Developer Advocate',
    'Technical Articles',
    'Tutorials',
    'Container Technology',
    'CI/CD',
    'Microservices',
  ],
  openGraph: {
    title: "Pradumna's Blog",
    description:
      'Technical articles and tutorials about Docker, Kubernetes, DevOps, and cloud-native tech.',
    url: 'https://pradumnasaraf.dev/blog',
    images: [
      {
        url: 'https://pradumnasaraf.dev/media/blog-og.png',
        width: 1200,
        height: 630,
        alt: 'Pradumna Saraf - Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pradumna's Blog",
    description:
      'Technical articles and tutorials about Docker, Kubernetes, DevOps, and cloud-native tech.',
    creator: '@pradumna_saraf',
    images: ['https://pradumnasaraf.dev/media/blog-og.png'],
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
    canonical: 'https://pradumnasaraf.dev/blog',
    types: {
      'application/rss+xml': 'https://pradumnasaraf.dev/rss.xml',
    },
  },
};
