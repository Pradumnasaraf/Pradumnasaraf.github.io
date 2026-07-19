import { SITE_URL } from '@/lib/constants';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  metadataBase: new URL(SITE_URL),
  title: 'Pradumna Saraf',
  description:
    'Developer Advocate, Docker Captain, and Microsoft MVP. I work with cloud-native tech, DevOps, and open source.',
  path: '',
  keywords:
    'Pradumna Saraf, Developer Advocate, Docker Captain, Microsoft MVP, Open Source, Cloud Native, DevOps, Software Development',
  imageAlt:
    'Pradumna Saraf - Developer Advocate, Docker Captain & Microsoft MVP',
  authors: [{ name: 'Pradumna Saraf' }],
  creator: 'Pradumna Saraf',
  publisher: 'Pradumna Saraf',
});
