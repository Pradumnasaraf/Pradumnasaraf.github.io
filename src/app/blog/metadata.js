import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Pradumna's Blog",
  description:
    'Technical articles and tutorials about Docker, Kubernetes, DevOps, and cloud-native tech.',
  path: '/blog',
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
  ogImage: 'blog-og.png',
  imageAlt: 'Pradumna Saraf - Blog',
  rss: true,
});
