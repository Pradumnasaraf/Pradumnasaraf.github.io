import { OG_SIZE, renderOg } from '@/lib/og';

export const alt = 'Pradumna Saraf: Sitemap';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return renderOg({
    title: 'Sitemap',
    subtitle: 'Every page and article on pradumnasaraf.dev',
  });
}
