import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: "Pradumna's Speaking",
  description:
    "My speaking engagements - conferences, meetups, and webinars I've been part of.",
  path: '/speaking',
  keywords: [
    'Pradumna Saraf',
    'Speaking',
    'Conferences',
    'Meetups',
    'Webinars',
    'Docker Captain',
    'CNCF',
    'DevRel',
    'Kubernetes',
    'DevOps',
    'Open Source',
    'Community Building',
  ],
  ogImage: 'speaking-og.png',
  imageAlt: 'Pradumna Saraf - Speaking & Events',
});
