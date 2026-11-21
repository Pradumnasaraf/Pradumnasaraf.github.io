import { SITE_URL } from '@/lib/constants';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  metadataBase: new URL(SITE_URL),
  title: 'Pradumna Saraf',
  description:
    'Open Source Developer, Docker Captain and Microsoft MVP. I write and speak about Docker, Kubernetes, DevOps and AI tooling, and run rebase media.',
  path: '',
  keywords:
    'Pradumna Saraf, Open Source Developer, Docker Captain, Microsoft MVP, Open Source, Cloud Native, DevOps, Software Development',
  authors: [{ name: 'Pradumna Saraf' }],
  creator: 'Pradumna Saraf',
  publisher: 'Pradumna Saraf',
});
